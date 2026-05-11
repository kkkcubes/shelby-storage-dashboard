const express = require("express");
const File = require("../models/File");

const router = express.Router();

/**
 * GET /:wallet
 * Fetch all uploaded files for a wallet
 */
router.get("/:wallet", async (req, res) => {
  try {
    const { wallet } = req.params;

    // Validate wallet
    if (!wallet) {
      return res.status(400).json({
        success: false,
        message: "Wallet address is required",
      });
    }

    // Fetch files from database
    const files = await File.find({
      wallet: wallet,
    }).sort({
      uploadedAt: -1,
    });

    return res.json({
      success: true,
      files,
    });
  } catch (error) {
    console.error("Error fetching files:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching files",
      error: error.message,
    });
  }
});

/**
 * GET /search/:wallet?q=filename
 * Search files by wallet + fileName (regex search)
 */
router.get("/search/:wallet", async (req, res) => {
  try {
    const { wallet } = req.params;
    const { q } = req.query;

    if (!wallet) {
      return res.status(400).json({
        success: false,
        message: "Wallet address is required",
      });
    }

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query (q) is required",
      });
    }

    const files = await File.find({
      wallet: wallet,
      fileName: {
        $regex: q,
        $options: "i", // case-insensitive search
      },
    }).sort({
      uploadedAt: -1,
    });

    return res.json({
      success: true,
      files,
    });
  } catch (error) {
    console.error("Error searching files:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while searching files",
      error: error.message,
    });
  }
});

module.exports = router;