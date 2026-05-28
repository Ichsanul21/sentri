"use client";

import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Repeat2, MoreHorizontal } from "lucide-react";

interface MentionCardProps {
  author: { name: string; handle: string; avatar?: string };
  platform: string;
  content: string;
  timestamp: string;
  sentiment: "positive" | "neutral" | "negative";
  confidence?: number;
  likes: number;
  comments: number;
  shares: number;
  new?: boolean;
}

const sentimentConfig = {
  positive: { variant: "sentiment-positive" as const, label: "Positive" },
  neutral: { variant: "sentiment-neutral" as const, label: "Neutral" },
  negative: { variant: "sentiment-negative" as const, label: "Negative" },
};

export function MentionCard({ author, platform, content, timestamp, sentiment, confidence, likes, comments, shares, new: isNew }: MentionCardProps) {
  const cfg = sentimentConfig[sentiment];
  const dotColor = { positive: "bg-sentiment-positive", neutral: "bg-sentiment-neutral", negative: "bg-sentiment-negative" }[sentiment];

  return (
    <div className={`flex gap-3 p-4 rounded border-b border-hairline-violet/50 transition-all ${isNew ? "bg-chart-fill/30" : "hover:bg-accent-lime/4"}`}>
      <div className="w-1 shrink-0 rounded-full self-stretch" style={{ background: dotColor }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-accent-violet-mid/30 flex items-center justify-center text-[12px] font-bold shrink-0">
            {author.name[0]}
          </div>
          <div>
            <span className="text-[16px] font-semibold leading-[1.5]">{author.name}</span>
            <span className="text-[14px] text-on-dark-muted leading-[1.43] ml-2">· {platform}</span>
          </div>
          <span className="text-[14px] text-on-dark-muted ml-auto">{timestamp}</span>
          <button className="text-on-dark-muted hover:text-on-primary transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
        <p className="text-[16px] leading-[1.5] mb-2">{content}</p>
        <div className="flex items-center gap-4 text-[14px] text-on-dark-muted">
          <span className="flex items-center gap-1"><Heart size={14} /> {likes}</span>
          <span className="flex items-center gap-1"><MessageCircle size={14} /> {comments}</span>
          <span className="flex items-center gap-1"><Repeat2 size={14} /> {shares}</span>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant={cfg.variant}>{cfg.label}{confidence ? ` (${confidence}%)` : ""}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
