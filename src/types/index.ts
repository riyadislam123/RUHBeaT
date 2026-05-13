export type Category = 
  | "Happiness" | "Broken Heart" | "Islamic" | "Quran Verses" | "Allah Quotes" 
  | "Sabr" | "Tawakkul" | "Prayer" | "Heart Healing" | "Ego" | "Loyalty" 
  | "Motivation" | "Sadness" | "Love" | "Silence" | "Deep Reality" 
  | "Self Respect" | "Fake People" | "Depression" | "Peace" | "Savage Mindset" | "Success";

export type Style = 
  | "White Minimal" | "Dark Grain" | "Vintage Paper" | "Cinematic Black" 
  | "Rain Mood" | "Soft Light" | "Blur Aesthetic" | "Neon Dark" 
  | "Islamic Glow" | "Golden Noor" | "Masjid Night" | "Soft Emerald" 
  | "Black & Gold Quranic" | "Arabic Minimal" | "Moonlight Islamic";

export type Mood = "Soft" | "Emotional" | "Deep" | "Dark" | "Savage" | "Spiritual";

export interface PosterConfig {
  category: Category;
  style: Style;
  mood: Mood;
  isIslamic: boolean;
  quote?: string;
}
