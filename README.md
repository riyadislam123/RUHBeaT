# RUH 🫀BeaT — AI Aesthetic Quote Poster Generator

A premium, mobile-first AI-powered aesthetic quote poster generator built with Google Gemini 3 Flash.

## ✨ Features
- **AI Quote Engine**: Generates short, emotional, and cinematic quotes using Gemini API.
- **Cinematic Styles**: Premium backgrounds including grain, blur, neon, and vintage textures.
- **Islamic Mode**: Dedicated mode for spiritually healing reminders and Quran-inspired messages.
- **Typography Engine**: Automatically handles font selection and RTL Arabic rendering.
- **Export HD**: Download posters as high-quality PNGs directly from your phone.
- **PWA Support**: Install as a mobile app for an immersive experience.

## 🚀 Getting Started

### 1. Get a FREE Gemini API Key
- Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
- Create or copy your API Key.

### 2. Local Setup
- Create a `.env` file and add:
  `GEMINI_API_KEY=your_key_here`
- Run the following:
  ```bash
  npm install
  npm run dev
  ```

### 3. Vercel Deployment
- Push to GitHub.
- Import to Vercel.
- Add `GEMINI_API_KEY` to Environment Variables.
- Deploy!

## 🛠 Tech Stack
- **Frontend**: React 19, TailwindCSS 4, Framer Motion
- **Backend**: Node.js/Express
- **AI**: Google Generative AI (Gemini 3 Flash)
- **Rendering**: html2canvas
