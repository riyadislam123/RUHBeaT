import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart, Moon, ShieldCheck, Settings2, Download, Zap } from "lucide-react";
import { CategorySelector } from "./components/CategorySelector";
import { StyleSelector } from "./components/StyleSelector";
import { MoodSelector } from "./components/MoodSelector";
import { PosterPreview } from "./components/PosterPreview";
import { useQuoteGenerator } from "./hooks/useQuoteGenerator";
import { Category, Style, Mood, PosterConfig } from "./types";
import { cn } from "./lib/utils";
import confetti from "canvas-confetti";

export default function App() {
  const [config, setConfig] = useState<PosterConfig>({
    category: "Deep Reality",
    style: "Cinematic Black",
    mood: "Deep",
    isIslamic: false,
  });

  const { generateQuote, loading, error } = useQuoteGenerator();

  const ISLAMIC_CATEGORIES = useMemo(() => [
    "Islamic", "Quran Verses", "Allah Quotes", "Sabr", "Tawakkul", "Prayer", "Heart Healing"
  ], []);

  useEffect(() => {
    if (ISLAMIC_CATEGORIES.includes(config.category)) {
      setConfig(prev => ({ ...prev, isIslamic: true }));
    } else {
      setConfig(prev => ({ ...prev, isIslamic: false }));
    }
  }, [config.category, ISLAMIC_CATEGORIES]);

  const handleGenerate = async () => {
    const quote = await generateQuote(config);
    if (quote) {
      setConfig(prev => ({ ...prev, quote }));
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: config.isIslamic ? ['#064e3b', '#d4af37', '#ffffff'] : ['#f27d26', '#ffffff', '#000000']
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative px-4 pt-8 pb-24 overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={cn(
          "absolute -top-[10%] -left-[10%] w-[60%] h-[40%] blur-[120px] rounded-full transition-colors duration-1000",
          config.isIslamic ? "bg-emerald-900/20" : "bg-brand-accent/10"
        )} />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[30%] bg-purple-900/10 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between mb-8 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500 shadow-xl",
              config.isIslamic ? "bg-emerald-600 shadow-emerald-900/20" : "bg-white shadow-white/5"
            )}
          >
            <Heart className={cn("transition-colors", config.isIslamic ? "text-white fill-white" : "text-black fill-black")} size={22} />
          </motion.div>
          <div>
            <h1 className="text-xl font-black tracking-tight leading-none mb-1">RUH 🫀BeaT</h1>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-brand-accent animate-pulse" />
              <p className="text-[9px] uppercase tracking-[0.25em] font-bold opacity-40">AI Aesthetic Studio</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button 
             onClick={() => alert("Collections feature coming soon in v2.0! ✨")}
             className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center active:scale-95 transition-transform"
           >
             <Download size={18} className="opacity-40" />
           </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-8 z-10 pb-12">
        <PosterPreview config={config} />
        
        <div className="flex flex-col gap-10 mt-4">
          <CategorySelector 
            selected={config.category} 
            onSelect={(category) => setConfig({ ...config, category })} 
          />
          
          <StyleSelector 
            selected={config.style} 
            onSelect={(style) => setConfig({ ...config, style })} 
          />

          <MoodSelector 
            selected={config.mood} 
            onSelect={(mood) => setConfig({ ...config, mood })} 
          />
        </div>
      </main>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 glass-surface border-t-0 z-50 rounded-t-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center active:scale-95 transition-transform"
          >
            <Settings2 size={24} className="opacity-60" />
          </button>
          
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={cn(
              "flex-1 h-16 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg transition-all active:scale-[0.98] disabled:opacity-50",
              config.isIslamic 
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20" 
                : "bg-white text-black shadow-lg shadow-white/5"
            )}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={24} />
              </motion.div>
            ) : (
              <>
                <Sparkles size={24} />
                <span>GENERATE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="fixed bottom-24 left-4 right-4 bg-red-950/50 border border-red-500/30 p-4 rounded-xl text-red-400 text-xs text-center z-[100] backdrop-blur-md">
          {error}
        </div>
      )}
    </div>
  );
}
