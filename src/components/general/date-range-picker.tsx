"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { DatePreset } from "@/types/dashboard";

interface DateRangePickerProps {
  value: DatePreset;
  onChange: (preset: DatePreset) => void;
  className?: string;
}

const PRESETS: { id: DatePreset; label: string }[] = [
  { id: "24h", label: "24h" },
  { id: "7d", label: "7 Days" },
  { id: "30d", label: "30 Days" },
  { id: "90d", label: "90 Days" },
  { id: "1y", label: "1 Year" },
  { id: "custom", label: "Custom" },
];

export function DateRangePicker({ value, onChange, className = "" }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);

  const currentLabel = PRESETS.find((p) => p.id === value)?.label || "Select Range";

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-violet-mid/50 text-on-dark-muted hover:text-on-primary/80 text-[14px] font-medium leading-[1.29] uppercase tracking-[0.2px] transition-all"
      >
        {currentLabel}
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute top-full mt-2 right-0 bg-surface-night border border-hairline-violet rounded-md shadow-[rgba(0,0,0,0.1)_0_10px_15px_-3px,rgba(0,0,0,0.1)_0_4px_6px_-4px] min-w-[200px] z-20 p-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => { onChange(preset.id); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-[16px] font-medium leading-[1.5] rounded transition-colors ${
                value === preset.id
                  ? "bg-accent-lime/8 border-l-2 border-accent-lime pl-[10px]"
                  : "text-on-dark-muted hover:text-on-primary hover:bg-white/[0.04]"
              }`}
            >
              {preset.label}
            </button>
          ))}
          {value === "custom" && (
            <div className="border-t border-hairline-violet mt-2 pt-2 space-y-2 px-1">
              <input type="date" className="w-full bg-ink-deep text-on-primary text-[14px] rounded px-2 py-1 border border-hairline-violet outline-none" placeholder="From" />
              <input type="date" className="w-full bg-ink-deep text-on-primary text-[14px] rounded px-2 py-1 border border-hairline-violet outline-none" placeholder="To" />
              <button className="w-full bg-primary text-on-primary text-[14px] font-bold leading-[1.14] uppercase tracking-[0.2px] rounded-md px-3 py-1.5">Apply</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
