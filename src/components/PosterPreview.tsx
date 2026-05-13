import React, { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PosterConfig } from "../types";
import { cn } from "../lib/utils";
import html2canvas from "html2canvas";
import { Download, Share2, Sparkles } from "lucide-react";

interface PosterPreviewProps {
  config: PosterConfig;
  onExport?: () => void;
}

export const PosterPreview: React.FC<PosterPreviewProps> = ({ config }) => {
  const posterRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!posterRef.current) return;
    try {
      const canvas = await html2canvas(posterRef.current, {
        scale: 3, // HD quality
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = `RUH-Beat-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Export error:", err);
    }
  };

  const getBackgroundStyle = () => {
    switch (config.style) {
      case "White Minimal":
        return "bg-stone-50 text-stone-900";
      case "Dark Grain":
        return "bg-zinc-950 text-zinc-100 cinematic-grain";
      case "Vintage Paper":
        return "bg-[#f4f1ea] text-[#2c2a26] sepia-[0.2]";
      case "Cinematic Black":
        return "bg-black text-white bg-gradient-to-b from-transparent to-zinc-900";
      case "Rain Mood":
        return "bg-slate-900 text-slate-100 bg-gradient-to-br from-slate-950 to-blue-950/50";
      case "Soft Light":
        return "bg-rose-50 text-rose-900 bg-radial from-rose-100 to-rose-200/20";
      case "Blur Aesthetic":
        return "bg-indigo-950 text-white bg-gradient-to-tr from-purple-900/40 via-blue-900 to-indigo-900";
      case "Neon Dark":
        return "bg-black text-cyan-400 border border-cyan-500/20 shadow-[inset_0_0_50px_rgba(6,182,212,0.1)]";
      case "Islamic Glow":
        return "bg-emerald-950 text-emerald-100 bg-gradient-to-b from-emerald-900 to-black";
      case "Golden Noor":
        return "bg-black text-amber-200 bg-radial from-amber-900/20 to-black";
      case "Soft Emerald":
        return "bg-[#064e3b] text-[#d1fae5] bg-gradient-to-br from-[#065f46] to-black";
      case "Black & Gold Quranic":
        return "bg-[#0a0a0a] text-[#d4af37] border-2 border-[#d4af37]/10";
      default:
        return "bg-black text-white";
    }
  };

  const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
      <div 
        ref={posterRef}
        id="poster-canvas"
        className={cn(
          "relative aspect-[9/16] w-full max-w-[320px] sm:max-w-none overflow-hidden rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 text-center transition-all duration-700",
          getBackgroundStyle()
        )}
      >
        {/* Subtle Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={config.quote}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10 w-full"
          >
            <p className={cn(
              "text-2xl sm:text-3xl font-luxury leading-relaxed tracking-tight",
              isArabic(config.quote || "") && "arabic-rtl text-4xl sm:text-5xl leading-loose",
              config.style === "White Minimal" ? "font-light" : "font-medium"
            )}>
              {config.quote || "Select options and tap generate"}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Watermark */}
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1 opacity-30 select-none">
          <span className="text-[10px] tracking-[0.3em] font-sans uppercase">RUH 🫀BeaT</span>
          <div className="w-8 h-[1px] bg-current" />
        </div>
      </div>

      {config.quote && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 w-full"
        >
          <button
            onClick={handleExport}
            className="flex-1 glass-surface h-14 rounded-full flex items-center justify-center gap-2 font-medium active:scale-95 transition-transform"
          >
            <Download size={20} />
            <span>Export HD</span>
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'RUH 🫀BeaT',
                  text: 'Check out this AI-generated poster!',
                  url: window.location.href,
                });
              }
            }}
            className="w-14 h-14 glass-surface rounded-full flex items-center justify-center active:scale-95 transition-transform"
          >
            <Share2 size={20} />
          </button>
        </motion.div>
      )}
    </div>
  );
};
