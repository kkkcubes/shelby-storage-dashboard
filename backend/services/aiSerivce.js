const axios = require("axios");

async function summarizeLocal(text) {
  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "llama3",
      prompt: `Summarize this: ${text}`,
      stream: false,
    }
  );

  return response.data.response;
}

module.exports = {
  summarizeLocal,
};