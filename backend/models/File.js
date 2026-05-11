const mongoose =
  require("mongoose");

const FileSchema =
  new mongoose.Schema(
    {
      wallet: {
        type: String,
      },

      fileName: {
        type: String,
      },

      cid: {
        type: String,
      },

      url: {
        type: String,
      },

      size: {
        type: Number,
      },

      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    }
  );

module.exports =
  mongoose.model(
    "File",
    FileSchema
  );