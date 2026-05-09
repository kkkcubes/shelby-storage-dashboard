const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const {
  saveChunk,
  mergeChunks,
} = require("../services/chunkService");

const { emitProgress } = require("../socket");

const { createVersion } = require("../services/versionService");

const router = express.Router();

const upload = multer();

router.post("/chunk", upload.single("chunk"), async (req, res) => {
  try {
    const {
      fileId,
      chunkIndex,
      totalChunks,
      fileName,
    } = req.body;

    // Generate fileId if not provided
    const currentFileId = fileId || uuidv4();

    await saveChunk(
      currentFileId,
      chunkIndex,
      req.file.buffer
    );

    const progress =
      ((Number(chunkIndex) + 1) / Number(totalChunks)) * 100;

    emitProgress(progress);

    // Merge chunks when upload completes
    if (Number(chunkIndex) + 1 === Number(totalChunks)) {
      const version = createVersion(fileName);

      const finalPath = await mergeChunks(
        currentFileId,
        totalChunks,
        `v${version}-${fileName}`
      );

      return res.json({
        success: true,
        fileId: currentFileId,
        path: finalPath,
        url: `http://localhost:5000/storage/${finalPath}`,
        version,
      });
    }

    res.json({
      success: true,
      fileId: currentFileId,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;