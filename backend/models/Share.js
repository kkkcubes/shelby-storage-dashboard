const mongoose =
  require("mongoose");

const ShareSchema =
  new mongoose.Schema({
    owner: String,

    sharedWith: String,

    cid: String,

    encryptedKey: String,

    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports =
  mongoose.model(
    "Share",
    ShareSchema
  );