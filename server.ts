import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Setup Gemini AI client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API Route: Ask Gemini Quantitative Tutor
  app.post('/api/gemini/explain', async (req, res) => {
    try {
      const { topic, context, question, language = 'en', mode = 'simple' } = req.body;

      if (!apiKey || !ai) {
        return res.status(503).json({
          error: 'Gemini API Key is not configured in environment variables.',
        });
      }

      let languageDirective = 'Respond in crisp, clear English with relatable Indian daily-life analogies.';
      if (language === 'hi') {
        languageDirective = 'Respond in conversational Hindi (Hinglish/Devanagari with standard bank exam math terminology like कार्य, दर, अनुपात).';
      } else if (language === 'te') {
        languageDirective = 'Respond in conversational Telugu with bank exam quantitative aptitude terminology (నిష్పత్తి, పని మరియు కాలం, సామర్థ్యం).';
      }

      let audiencePrompt = '';
      if (mode === 'simple') {
        audiencePrompt = 'Explain this concept like I am a complete beginner who gets confused with algebra.';
      } else if (mode === 'shortcut') {
        audiencePrompt = 'Focus strictly on the 10-second exam shortcut technique and how to avoid the common trap.';
      } else {
        audiencePrompt = 'Provide an intuitive visual mental model for this step.';
      }

      const prompt = `You are a legendary Indian bank exam (IBPS PO, SBI PO, RBI Grade B) Quantitative Aptitude faculty teacher at BankExam Visual Academy.
Topic: ${topic || 'Quantitative Aptitude'}
Context: ${context || ''}
Student Question: ${question || 'Please explain the intuition and step-by-step logic.'}

Directive:
- ${languageDirective}
- ${audiencePrompt}
- Highlight the exact intuition (e.g. why rates add, why the age difference is constant, or why we multiply by the LCM).
- Provide a memorable 1-line "Remember:" rule for the exam.
- Keep the explanation concise and punchy (under 160 words). No unnecessary boilerplate.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      return res.json({ explanation: response.text });
    } catch (err: any) {
      console.error('Error generating explanation:', err);
      return res.status(500).json({
        error: err.message || 'An error occurred while generating the explanation.',
      });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', hasGemini: Boolean(apiKey) });
  });

  // Dev server or static files
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BankExam Visual Academy server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
