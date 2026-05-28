"use client";

import { useState } from "react";
import { RefreshCw, Copy, ThumbsUp, ThumbsDown, Sparkles } from "lucide-react";
import type { AutoResponseDraft } from "@/types/crisis";

interface AutoResponsePanelProps {
  drafts: AutoResponseDraft[];
  onRegenerate: (type: string) => void;
  onCopy: (content: string) => void;
  onFeedback: (id: string, feedback: "up" | "down") => void;
}

const tabLabels: Record<string, string> = {
  press_release: "Press Release",
  social_reply: "Social Reply",
  dm_template: "DM Template",
};

export function AutoResponsePanel({ drafts, onRegenerate, onCopy, onFeedback }: AutoResponsePanelProps) {
  const [activeTab, setActiveTab] = useState(drafts[0]?.type || "press_release");
  const active = drafts.find((d) => d.type === activeTab);

  return (
    <div>
      <div className="flex border-b border-hairline-violet">
        {drafts.map((d) => (
          <button
            key={d.type}
            onClick={() => setActiveTab(d.type)}
            className={`px-4 py-2.5 text-[16px] font-medium leading-[1.5] transition-colors border-b-2 -mb-[1px] ${
              activeTab === d.type ? "border-accent-lime text-on-primary" : "border-transparent text-on-dark-muted"
            }`}
          >
            {tabLabels[d.type] || d.type}
          </button>
        ))}
      </div>

      <div className="mt-4 bg-ink-deep border border-hairline-violet rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-accent-lime" />
            <span className="text-[14px] leading-[1.43] text-on-dark-muted">
              AI Confidence: {active?.aiConfidence}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => active && onRegenerate(active.type)} className="flex items-center gap-1 text-[14px] text-accent-lime hover:underline">
              <RefreshCw size={14} /> Regenerate
            </button>
            <button onClick={() => active && onCopy(active.content)} className="px-3 py-1 rounded-full bg-on-dark-faint text-on-primary text-[14px] font-medium leading-[1.29] uppercase tracking-[0.2px] hover:bg-on-dark-muted transition-all">
              <Copy size={14} className="inline mr-1" /> Copy
            </button>
          </div>
        </div>

        <div className="p-4 rounded bg-surface-night text-[16px] font-medium leading-[1.5] whitespace-pre-wrap">
          {active?.content || "No response generated yet."}
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-[14px] leading-[1.43] text-on-dark-muted">Was this helpful?</span>
            <button onClick={() => active && onFeedback(active.id, "up")} className="text-on-dark-muted hover:text-accent-lime transition-colors">
              <ThumbsUp size={16} />
            </button>
            <button onClick={() => active && onFeedback(active.id, "down")} className="text-on-dark-muted hover:text-sentiment-negative transition-colors">
              <ThumbsDown size={16} />
            </button>
          </div>
          <span className="text-[12px] text-on-dark-muted">
            Regenerations: {active?.regenerations}/{active?.maxRegenerations}
          </span>
        </div>
      </div>
    </div>
  );
}
