"use client";

import { useState, useMemo } from "react";
import type { SentimentLabel } from "@/types";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MentionCard } from "@/components/sentiment/mention-card";
import { SentimentBadge } from "@/components/ui/sentiment-badge";
import { mentions } from "@/data/mock";
import { useLoading } from "@/hooks/use-loading";
import { RefreshCw, RotateCcw } from "lucide-react";

type SentimentFilter = "all" | SentimentLabel;

const sentiments: { value: SentimentFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "positive", label: "Positive" },
  { value: "neutral", label: "Neutral" },
  { value: "negative", label: "Negative" },
];

const pillStyles: Record<string, string> = {
  all: "",
  positive: "border border-sentiment-positive/40",
  neutral: "border border-sentiment-neutral/40",
  negative: "border border-sentiment-negative/40",
};

export default function BySentimentPage() {
  const [activeSentiment, setActiveSentiment] = useState<SentimentFilter>("all");
  const [retryCount, setRetryCount] = useState(0);
  const { loading, error, data } = useLoading(mentions, 700);

  const filtered = useMemo(() => {
    let list = [...data];
    if (activeSentiment !== "all") {
      list = list.filter((m) => m.sentiment === activeSentiment);
    }
    return list;
  }, [data, activeSentiment, retryCount]);

  function handleRetry() {
    setRetryCount((c) => c + 1);
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Live Feed", href: "/dashboard/live-feed" }, { label: "By Sentiment" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Mentions by Sentiment</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Browse mentions grouped by sentiment polarity</p>
        </div>
        <Button variant="ghost" size="sm"><RefreshCw size={16} /> Refresh</Button>
      </div>

      <WidgetCard>
        <div className="flex gap-2 mb-3 pb-3 border-b border-hairline-violet/50 overflow-x-auto">
          {sentiments.map((s) => (
            <button
              key={s.value}
              onClick={() => setActiveSentiment(s.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[14px] font-medium uppercase tracking-[0.2px] transition-all whitespace-nowrap ${
                activeSentiment === s.value
                  ? "bg-accent-lime text-ink-deep"
                  : `bg-accent-violet-mid/30 text-on-dark-muted hover:text-on-primary ${pillStyles[s.value]}`
              }`}
            >
              {s.value !== "all" ? (
                <SentimentBadge sentiment={s.value as SentimentLabel} />
              ) : (
                s.label
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3 p-4">
                <Skeleton variant="avatar" />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="text" className="w-1/3" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" className="w-2/3" />
                  <Skeleton variant="text" className="w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-[16px] text-severity-critical mb-2">Failed to load mentions</p>
            <p className="text-[14px] text-on-dark-muted mb-4">{error}</p>
            <Button variant="ghost" size="sm" onClick={handleRetry}>
              <RotateCcw size={14} /> Retry
            </Button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-[16px] text-on-dark-muted mb-2">No {activeSentiment} mentions found</p>
            <Button variant="ghost" size="sm" onClick={() => setActiveSentiment("all")}>
              <RotateCcw size={14} /> Show All
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-hairline-violet/30 -mx-4">
            {filtered.map((m, i) => (
              <MentionCard key={i} {...m} />
            ))}
          </div>
        )}
      </WidgetCard>
    </div>
  );
}
