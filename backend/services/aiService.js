const axios = require("axios");
const OpenAI = require("openai");

// =========================
// OPENAI SETUP
// =========================
const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY,
});

// =========================
// LOCAL LLM SUMMARY
// =========================
async function summarizeLocal(
  text
) {
  const response =
    await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3",
        prompt: `Summarize this: ${text}`,
        stream: false,
      }
    );

  return response.data.response;
}

// =========================
// OPENAI FILE ANALYSIS
// =========================
const analyzeText =
  async (text) => {
    const response =
      await openai.chat.completions.create(
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `Analyze this file:\n${text}`,
            },
          ],
        }
      );

    return response
      .choices[0]
      .message.content;
  };

module.exports = {
  summarizeLocal,
  analyzeText,
};