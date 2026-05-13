import React from "react";
import { Mood } from "../types";
import { cn } from "../lib/utils";

interface MoodSelectorProps {
  selected: Mood;
  onSelect: (mood: Mood) => void;
}

const MOODS: Mood[] = ["Soft", "Emotional", "Deep", "Dark", "Savage", "Spiritual"];

export const MoodSelector: React.FC<MoodSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-sm font-semibold uppercase tracking-widest opacity-60">Mood Level</h3>
        <span className="text-[10px] opacity-40 font-mono uppercase">Vibe</span>
      </div>
      <div className="flex bg-white/5 p-1 rounded-2xl gap-1">
        {MOODS.map((mood) => (
          <button
            key={mood}
            onClick={() => onSelect(mood)}
            className={cn(
              "flex-1 py-3 rounded-xl text-xs font-medium transition-all duration-300",
              selected === mood 
                ? "bg-white text-black shadow-md" 
                : "text-white/40 hover:text-white/60"
            )}
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
};
