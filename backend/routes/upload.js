const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// SERVICES
const { saveChunk, mergeChunks } = require("../services/chunkService");
const { emitProgress } = require("../socket");
const { createVersion } = require("../services/versionService");
const { uploadToShelby } = require("../services/shelbyService");
const { encryptFile } = require("../services/encryptionService");

// MODEL
const File = require("../models/File");

const router = express.Router();
const upload = multer();

router.post("/chunk", upload.single("chunk"), async (req, res) => {
  try {
    const {
      fileId,
      chunkIndex,
      totalChunks,
      fileName,
      wallet,
    } = req.body;

    // Generate fileId if not provided
    const currentFileId = fileId || uuidv4();

    // Save chunk
    await saveChunk(currentFileId, chunkIndex, req.file.buffer);

    // Calculate upload progress
    const progress =
      ((Number(chunkIndex) + 1) / Number(totalChunks)) * 100;

    // Emit socket progress
    emitProgress(progress);

    // When upload completes
    if (Number(chunkIndex) + 1 === Number(totalChunks)) {
      // Create version
      const version = createVersion(fileName);

      // Merge chunks
      const finalPath = await mergeChunks(
        currentFileId,
        totalChunks,
        `v${version}-${fileName}`
      );

      // Read merged file
      const finalBuffer = fs.readFileSync(finalPath);

      // Encrypt file
      const encrypted = encryptFile(
        finalBuffer,
        process.env.SECRET_KEY
      );

      // Upload to Shelby
      const shelbyResult = await uploadToShelby(
        Buffer.from(encrypted),
        fileName
      );

      // Save to MongoDB
      await File.create({
        wallet: req.body.wallet,
        fileName,
        cid: shelbyResult.cid,
        url: shelbyResult.url,
        size: finalBuffer.length,
      });

      // Response
      return res.json({
        success: true,
        cid: shelbyResult.cid,
        url: shelbyResult.url,
        version,
      });
    }

    // Chunk response
    res.json({
      success: true,
      fileId: currentFileId,
      progress,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;