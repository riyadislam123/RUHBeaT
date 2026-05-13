import React from "react";
import { Category } from "../types";
import { cn } from "../lib/utils";

interface CategorySelectorProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

const CATEGORIES: Category[] = [
  "Happiness", "Broken Heart", "Islamic", "Quran Verses", "Allah Quotes", 
  "Sabr", "Tawakkul", "Prayer", "Heart Healing", "Ego", "Loyalty", 
  "Motivation", "Sadness", "Love", "Silence", "Deep Reality", 
  "Self Respect", "Fake People", "Depression", "Peace", "Savage Mindset", "Success"
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-sm font-semibold uppercase tracking-widest opacity-60">Category</h3>
        <span className="text-[10px] text-brand-accent font-mono uppercase tracking-tighter">Required</span>
      </div>
      <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar -mx-4 px-4 scroll-smooth">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={cn(
              "px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300",
              selected === cat 
                ? "bg-white text-black shadow-lg shadow-white/10" 
                : "bg-white/5 text-white/50 border border-white/5 hover:bg-white/10"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
