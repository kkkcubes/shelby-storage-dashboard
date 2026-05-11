const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

/**
 * Upload a file buffer to Shelby
 * @param {Buffer} fileBuffer
 * @param {string} fileName
 * @returns {Promise<{cid: string, url: string}>}
 */
const uploadToShelby = async (fileBuffer, fileName) => {
  try {
    const formData = new FormData();

    formData.append("file", fileBuffer, fileName);

    const response = await axios.post(
      "https://api.shelby.xyz/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.SHELBY_API_KEY}`,
          ...formData.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Shelby upload error:",
      error.response?.data || error.message
    );

    throw new Error("Shelby upload failed");
  }
};

/**
 * Upload a file from local path
 * @param {string} filePath
 * @returns {Promise<{cid: string, url: string}>}
 */
const uploadFileToShelby = async (filePath) => {
  try {
    const fileBuffer = fs.readFileSync(filePath);

    const fileName = filePath.split("/").pop();

    return await uploadToShelby(fileBuffer, fileName);
  } catch (error) {
    console.error("File upload failed:", error.message);
    throw error;
  }
};

module.exports = {
  uploadToShelby,
  uploadFileToShelby,
};