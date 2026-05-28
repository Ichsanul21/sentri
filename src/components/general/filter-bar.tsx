"use client";

import { X } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
  active: boolean;
}

interface FilterBarProps {
  options: FilterOption[];
  onToggle: (id: string) => void;
  onClear: () => void;
  className?: string;
}

export function FilterBar({ options, onToggle, onClear, className = "" }: FilterBarProps) {
  const hasActive = options.some((o) => o.active);

  return (
    <div className={`flex items-center gap-2 overflow-x-auto scrollbar-thin py-1 ${className}`}>
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onToggle(opt.id)}
          className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-[14px] font-medium leading-[1.29] uppercase tracking-[0.2px] transition-all whitespace-nowrap ${
            opt.active
              ? "bg-accent-lime text-ink-deep"
              : "bg-accent-violet-mid/50 text-on-dark-muted hover:text-on-primary/80"
          }`}
        >
          {opt.label}
          {opt.active && <X size={14} onClick={(e) => { e.stopPropagation(); onToggle(opt.id); }} />}
        </button>
      ))}
      {hasActive && (
        <button onClick={onClear} className="text-[14px] leading-[1.43] text-on-dark-muted hover:text-on-primary ml-1 whitespace-nowrap">
          Clear
        </button>
      )}
      <button className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-on-dark-faint text-on-primary text-[14px] font-medium leading-[1.29] uppercase tracking-[0.2px] transition-all hover:bg-on-dark-muted whitespace-nowrap">
        + Filter
      </button>
    </div>
  );
}
