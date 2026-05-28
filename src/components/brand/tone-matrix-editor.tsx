"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { CommunicationStyle } from "@/types";

interface ToneMatrixEditorProps {
  initialStyles?: CommunicationStyle[];
  initialBanned?: string[];
  initialPreferred?: string[];
  onSave: (data: { styles: CommunicationStyle[]; banned: string[]; preferred: string[] }) => void;
}

const allStyles: { value: CommunicationStyle; label: string }[] = [
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
  { value: "authoritative", label: "Authoritative" },
  { value: "energetic", label: "Energetic" },
  { value: "humorous", label: "Humorous" },
];

export function ToneMatrixEditor({ initialStyles = [], initialBanned = [], initialPreferred = [], onSave }: ToneMatrixEditorProps) {
  const [styles, setStyles] = useState<CommunicationStyle[]>(initialStyles);
  const [banned, setBanned] = useState(initialBanned);
  const [preferred, setPreferred] = useState(initialPreferred);
  const [bannedInput, setBannedInput] = useState("");
  const [preferredInput, setPreferredInput] = useState("");

  const toggleStyle = (s: CommunicationStyle) => {
    setStyles((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="text-[14px] font-medium text-on-dark-muted mb-2 block">Communication Style</label>
        <div className="flex flex-wrap gap-2">
          {allStyles.map((s) => (
            <button
              key={s.value}
              onClick={() => toggleStyle(s.value)}
              className={`px-4 py-1.5 rounded-full text-[14px] font-medium leading-[1.29] uppercase tracking-[0.2px] transition-all ${
                styles.includes(s.value) ? "bg-accent-lime text-ink-deep" : "bg-accent-violet-mid/50 text-on-dark-muted hover:text-on-primary/80"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[14px] font-medium text-on-dark-muted mb-2 block">Banned Words</label>
        <div className="flex items-center gap-2 mb-2">
          <input value={bannedInput} onChange={(e) => setBannedInput(e.target.value)} onKeyDown={(e) => {
            if (e.key === "Enter" && bannedInput.trim()) {
              setBanned((p) => [...p, bannedInput.trim()]); setBannedInput("");
            }
          }} placeholder="Add banned word..." className="flex-1 bg-ink-deep text-on-primary text-[16px] font-medium leading-[1.5] rounded-sm px-3 py-1.5 border border-hairline-violet outline-none" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {banned.map((w) => (
            <span key={w} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sentiment-negative/15 text-sentiment-negative text-[12px]">
              {w}
              <button onClick={() => setBanned((p) => p.filter((x) => x !== w))} className="hover:text-on-primary"><X size={12} /></button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[14px] font-medium text-on-dark-muted mb-2 block">Preferred Words</label>
        <div className="flex items-center gap-2 mb-2">
          <input value={preferredInput} onChange={(e) => setPreferredInput(e.target.value)} onKeyDown={(e) => {
            if (e.key === "Enter" && preferredInput.trim()) {
              setPreferred((p) => [...p, preferredInput.trim()]); setPreferredInput("");
            }
          }} placeholder="Add preferred word..." className="flex-1 bg-ink-deep text-on-primary text-[16px] font-medium leading-[1.5] rounded-sm px-3 py-1.5 border border-hairline-violet outline-none" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {preferred.map((w) => (
            <span key={w} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sentiment-positive/15 text-sentiment-positive text-[12px]">
              {w}
              <button onClick={() => setPreferred((p) => p.filter((x) => x !== w))} className="hover:text-on-primary"><X size={12} /></button>
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => onSave({ styles, banned, preferred })}
        className="px-4 py-1.5 rounded-md bg-on-primary text-ink-deep text-[14px] font-bold leading-[1.14] uppercase tracking-[0.2px] transition-all hover:bg-surface-press-light"
      >
        Save Tone Matrix
      </button>
    </div>
  );
}
