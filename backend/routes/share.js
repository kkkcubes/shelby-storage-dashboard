const express =
  require("express");

const {
  createShare,
} = require("../services/shareService");

const router = express.Router();

router.post("/", (req, res) => {
  const {
    owner,
    targetUser,
    fileCid,
  } = req.body;

  createShare(
    owner,
    targetUser,
    fileCid
  );

  res.json({
    success: true,
  });
});

module.exports = router;