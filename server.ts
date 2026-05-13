import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Quote Generation
  app.post("/api/generate-quote", async (req, res) => {
    try {
      const { category, style, mood, isIslamic } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: "Missing API Key" });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      let prompt = `Generate a very short, cinematic, and emotional quote. 
      Category: ${category}. 
      Mood: ${mood}. 
      Style: ${style}. 
      The quote should be minimal (max 10-15 words), profound, and suitable for a Pinterest/Instagram aesthetic poster. 
      Do not include any intro/outro text, just the quote itself.`;

      if (isIslamic) {
        prompt = `Generate a peaceful and spiritually healing Islamic reminder or Quran-inspired message. 
        Category: ${category}. 
        Mood: ${mood}.
        Focus on Sabr, Tawakkul, or Allah's mercy. 
        Must be respectful and elegant. 
        If it's a Quran verse, provide the reference. 
        Keep it concise and aesthetic. 
        Do not include intro/outro text.`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview", 
        contents: prompt,
      });

      res.json({ quote: response.text.replace(/['"]+/g, '').trim() }); // Remove quotes if model adds them
    } catch (error: any) {
      console.error("AI Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
