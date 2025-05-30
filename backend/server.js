// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const corsOptions = {
  origin: [
    "https://plain-talk.netlify.app",
    "http://localhost:5173",
    "http://192.168.18.9:5173",
  ],
  methods: "GET,POST",
  credentials: true,
};

dotenv.config();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.post("/api/explain", async (req, res) => {
  const { input, context } = req.body;

  const systemPrompt = `You are a thoughtful explainer of deep or complex statements. When someone gives you a confusing or profound sentence ${
    context !== "" ? `along with the ${context}` : ""
  }, your job is to make it easy to understand.

  First, explain the meaning like you're talking to a basic english speaker who is curious but confused.

  Then, simplify it even more as if you're explaining to a 10-year-old who needs things broken down gently.

  Your tone should be friendly, clear, and human — not robotic.
  `;

  const userPrompt = `Statement: "${input}"`;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "X-Title": "Simplifier",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324:free",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "OpenRouter request failed", details: error.message });
  }
});

app.get("/", (req, res) => {
  res.send(`Simplifier backend is running!`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
