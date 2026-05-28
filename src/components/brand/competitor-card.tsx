"use client";

import { X } from "lucide-react";
import type { Competitor } from "@/types/brand";

interface CompetitorCardProps {
  competitor: Competitor;
  onRemove?: (id: string) => void;
}

export function CompetitorCard({ competitor, onRemove }: CompetitorCardProps) {
  return (
    <div className="bg-ink-deep border border-hairline-violet rounded-lg p-4 group">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-[16px] font-semibold leading-[1.5]">{competitor.name}</h4>
          <div className="mt-1 space-y-0.5">
            {Object.entries(competitor.handles).map(([platform, handle]) => (
              <p key={platform} className="text-[14px] leading-[1.43] text-on-dark-muted">
                <span className="capitalize">{platform}: </span>
                <span className="text-on-primary/80">{handle}</span>
              </p>
            ))}
          </div>
        </div>
        {onRemove && (
          <button
            onClick={() => onRemove(competitor.id)}
            className="text-on-dark-muted hover:text-sentiment-negative transition-colors opacity-0 group-hover:opacity-100"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
