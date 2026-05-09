const CryptoJS = require("crypto-js");

const SECRET_KEY = "SHELBY_SECRET";

function encryptBuffer(buffer) {
  return CryptoJS.AES.encrypt(
    buffer.toString("base64"),
    SECRET_KEY
  ).toString();
}

function decryptBuffer(encrypted) {
  const bytes = CryptoJS.AES.decrypt(
    encrypted,
    SECRET_KEY
  );

  return Buffer.from(
    bytes.toString(CryptoJS.enc.Utf8),
    "base64"
  );
}

module.exports = {
  encryptBuffer,
  decryptBuffer,
};