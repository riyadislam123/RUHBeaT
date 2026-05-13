import React from "react";
import { Style } from "../types";
import { cn } from "../lib/utils";

interface StyleSelectorProps {
  selected: Style;
  onSelect: (style: Style) => void;
}

const STYLES: Style[] = [
  "White Minimal", "Dark Grain", "Vintage Paper", "Cinematic Black", 
  "Rain Mood", "Soft Light", "Blur Aesthetic", "Neon Dark", 
  "Islamic Glow", "Golden Noor", "Masjid Night", "Soft Emerald", 
  "Black & Gold Quranic", "Arabic Minimal", "Moonlight Islamic"
];

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-sm font-semibold uppercase tracking-widest opacity-60">Background Style</h3>
        <span className="text-[10px] opacity-40 font-mono uppercase">Premium</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {STYLES.map((style) => (
          <button
            key={style}
            onClick={() => onSelect(style)}
            className={cn(
              "relative aspect-square rounded-xl overflow-hidden group active:scale-95 transition-all duration-300",
              selected === style ? "ring-2 ring-white ring-offset-2 ring-offset-black" : "opacity-60"
            )}
          >
            <div className={cn(
              "absolute inset-0 flex items-center justify-center p-2 text-center",
              getPreviewClass(style)
            )}>
              <span className="text-[10px] font-bold leading-tight uppercase tracking-tighter">
                {style}
              </span>
            </div>
            {selected === style && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

function getPreviewClass(style: Style): string {
  switch (style) {
    case "White Minimal": return "bg-stone-50 text-stone-900";
    case "Dark Grain": return "bg-zinc-900 text-zinc-100 cinematic-grain";
    case "Vintage Paper": return "bg-[#d4cfc3] text-stone-800";
    case "Cinematic Black": return "bg-black text-white";
    case "Rain Mood": return "bg-slate-900 text-blue-200 bg-gradient-to-br from-slate-900 to-blue-900/50";
    case "Soft Light": return "bg-rose-100 text-rose-900";
    case "Blur Aesthetic": return "bg-indigo-600 text-white";
    case "Neon Dark": return "bg-black text-cyan-400 border border-cyan-400/30";
    case "Islamic Glow": return "bg-emerald-900 text-emerald-100";
    case "Golden Noor": return "bg-amber-900 text-amber-100";
    case "Masjid Night": return "bg-slate-950 text-slate-100";
    case "Soft Emerald": return "bg-emerald-800 text-emerald-50";
    case "Black & Gold Quranic": return "bg-black text-amber-500 border border-amber-500/20";
    case "Arabic Minimal": return "bg-stone-100 text-stone-800";
    case "Moonlight Islamic": return "bg-indigo-950 text-indigo-100";
    default: return "bg-zinc-800 text-white";
  }
}
