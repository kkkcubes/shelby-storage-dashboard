const express =
  require("express");

const multer =
  require("multer");

const {
  saveChunk,
  mergeChunks,
} = require(
  "../services/chunkService"
);

const router =
  express.Router();

const upload =
  multer();

router.post(
  "/chunk",
  upload.single(
    "chunk"
  ),
  async (req, res) => {
    try {
      const {
        fileId,
        chunkIndex,
        totalChunks,
        fileName,
        wallet,
      } = req.body;

      await saveChunk(
        fileId,
        chunkIndex,
        req.file.buffer
      );

      if (
        Number(chunkIndex) +
          1 ===
        Number(totalChunks)
      ) {
        const finalPath =
          await mergeChunks(
            fileId,
            totalChunks,
            fileName
          );

        return res.json({
          success: true,
          path: finalPath,
        });
      }

      res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error:
          error.message,
      });
    }
  }
);

module.exports = router;