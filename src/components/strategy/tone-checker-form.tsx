"use client";

import { useState } from "react";

interface ToneCheckerFormProps {
  onSubmit: (text: string, platform: string) => void;
}

const platforms = ["twitter", "instagram", "tiktok", "linkedin", "facebook"];

export function ToneCheckerForm({ onSubmit }: ToneCheckerFormProps) {
  const [text, setText] = useState("");
  const [platform, setPlatform] = useState("instagram");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <label className="text-[14px] font-medium text-on-dark-muted block">Content Draft</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          placeholder="Paste your content draft here..."
          className="w-full bg-surface-night text-on-primary text-[16px] font-medium leading-[1.5] rounded-md px-4 py-3 border border-hairline-violet outline-none focus:border-accent-violet resize-none"
        />
        <div className="flex items-center justify-between">
          <span className="text-[14px] leading-[1.43] text-on-dark-muted">{text.length} characters</span>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[14px] font-medium text-on-dark-muted block">Target Platform</label>
        <div className="flex flex-wrap gap-2">
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`px-4 py-1.5 rounded-full text-[14px] font-medium leading-[1.29] uppercase tracking-[0.2px] transition-all ${
                platform === p ? "bg-accent-lime text-ink-deep" : "bg-accent-violet-mid/50 text-on-dark-muted hover:text-on-primary/80"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="bg-ink-deep border border-hairline-violet rounded-lg p-6 text-center">
          <p className="text-[16px] leading-[1.5] text-on-dark-muted">Analysis results appear here</p>
        </div>

        <button
          onClick={() => onSubmit(text, platform)}
          disabled={!text.trim()}
          className="w-full px-4 py-2 rounded-md bg-on-primary text-ink-deep text-[14px] font-bold leading-[1.14] uppercase tracking-[0.2px] transition-all hover:bg-surface-press-light disabled:opacity-40"
        >
          Analyze Tone
        </button>
      </div>
    </div>
  );
}
