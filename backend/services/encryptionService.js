const CryptoJS = require("crypto-js");

const SECRET_KEY = "SHELBY_SECRET";

/**
 * Encrypt buffer using default secret key
 * @param {Buffer} buffer
 * @returns {string}
 */
function encryptBuffer(buffer) {
  return CryptoJS.AES.encrypt(
    buffer.toString("base64"),
    SECRET_KEY
  ).toString();
}

/**
 * Decrypt encrypted string using default secret key
 * @param {string} encrypted
 * @returns {Buffer}
 */
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

/**
 * Encrypt file/data using custom secret
 * @param {Buffer|string} data
 * @param {string} secret
 * @returns {string}
 */
const encryptFile = (data, secret) => {
  return CryptoJS.AES.encrypt(
    data.toString("base64"),
    secret
  ).toString();
};

module.exports = {
  encryptBuffer,
  decryptBuffer,
  encryptFile,
};