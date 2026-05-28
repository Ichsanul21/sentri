"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";

interface KeywordManagerProps {
  title: string;
  keywords: string[];
  onAdd: (keyword: string) => void;
  onRemove: (keyword: string) => void;
  placeholder?: string;
}

export function KeywordManager({ title, keywords, onAdd, onRemove, placeholder = "Add keyword..." }: KeywordManagerProps) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      onAdd(trimmed);
      setInput("");
    }
  };

  return (
    <div>
      <label className="text-[14px] font-medium text-on-dark-muted mb-2 block">{title}</label>
      <div className="flex items-center gap-2 mb-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder={placeholder}
          className="flex-1 bg-ink-deep text-on-primary text-[16px] font-medium leading-[1.5] rounded-sm px-3 py-1.5 border border-hairline-violet outline-none focus:border-accent-violet"
        />
        <button
          onClick={handleAdd}
          className="p-1.5 rounded-md bg-accent-lime text-ink-deep hover:bg-accent-lime/80 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {keywords.map((kw) => (
          <span key={kw} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent-violet-mid/30 text-on-primary text-[12px]">
            {kw}
            <button onClick={() => onRemove(kw)} className="text-on-dark-muted hover:text-on-primary">
              <X size={12} />
            </button>
          </span>
        ))}
        {keywords.length === 0 && (
          <span className="text-[14px] leading-[1.43] text-on-dark-muted/50">No keywords added yet</span>
        )}
      </div>
    </div>
  );
}
