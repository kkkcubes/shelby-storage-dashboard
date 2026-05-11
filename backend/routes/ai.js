const express = require("express");
const OpenAI = require("openai");

const {
  analyzeText,
} = require("../services/aiService");

const router = express.Router();

// =========================
// OPENAI CLIENT
// =========================
const client = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY,
});

// =========================
// FILE SUMMARY ROUTE
// =========================
router.post(
  "/summary",
  async (req, res) => {
    try {
      const { text } =
        req.body;

      const completion =
        await client.chat.completions.create(
          {
            model:
              "gpt-4o-mini",

            messages: [
              {
                role: "user",
                content: `Summarize this file content: ${text}`,
              },
            ],
          }
        );

      res.json({
        summary:
          completion
            .choices[0]
            .message.content,
      });
    } catch (error) {
      res.status(500).json({
        error:
          error.message,
      });
    }
  }
);

// =========================
// FILE ANALYSIS ROUTE
// =========================
router.post(
  "/",
  async (req, res) => {
    try {
      const result =
        await analyzeText(
          req.body.text
        );

      res.json({
        result,
      });
    } catch (error) {
      res.status(500).json({
        error:
          error.message,
      });
    }
  }
);

module.exports = router;