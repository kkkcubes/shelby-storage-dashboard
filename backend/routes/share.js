const express = require("express");
const Share = require("../models/Share");

const router = express.Router();

/**
 * POST /share
 * Create a new share record
 */
router.post("/", async (req, res) => {
  try {
    const { owner, sharedWith, cid } = req.body;

    // Basic validation
    if (!owner || !sharedWith || !cid) {
      return res.status(400).json({
        success: false,
        message: "owner, sharedWith, and cid are required",
      });
    }

    const share = await Share.create({
      owner,
      sharedWith,
      cid,
    });

    return res.json({
      success: true,
      share,
    });
  } catch (error) {
    console.error("Error creating share:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while creating share",
      error: error.message,
    });
  }
});

/**
 * GET /share/:wallet
 * Get all files shared with a wallet
 */
router.get("/:wallet", async (req, res) => {
  try {
    const { wallet } = req.params;

    if (!wallet) {
      return res.status(400).json({
        success: false,
        message: "Wallet address is required",
      });
    }

    const shares = await Share.find({
      sharedWith: wallet,
    }).sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      shares,
    });
  } catch (error) {
    console.error("Error fetching shares:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching shares",
      error: error.message,
    });
  }
});

module.exports = router;