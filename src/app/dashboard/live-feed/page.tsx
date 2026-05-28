"use client";

import { useState, useMemo } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MentionCard } from "@/components/sentiment/mention-card";
import { mentions } from "@/data/mock";
import { useLoading } from "@/hooks/use-loading";
import { RefreshCw, RotateCcw } from "lucide-react";

type PlatformFilter = "all" | "Twitter" | "Instagram" | "TikTok" | "Facebook" | "Google Reviews" | "News";
type SortMode = "newest" | "oldest" | "most engaged";

const platformFilters: PlatformFilter[] = ["all", "Twitter", "Instagram", "TikTok", "Facebook", "Google Reviews", "News"];
const sortOptions: { value: SortMode; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "most engaged", label: "Most Engaged" },
];

export default function LiveFeedPage() {
  const [activePlatform, setActivePlatform] = useState<PlatformFilter>("all");
  const [sortBy, setSortBy] = useState<SortMode>("newest");
  const [retryCount, setRetryCount] = useState(0);
  const { loading, error, data } = useLoading(mentions, 700);

  const filtered = useMemo(() => {
    let list = [...data];
    if (activePlatform !== "all") {
      list = list.filter((m) => m.platform === activePlatform);
    }
    if (sortBy === "newest") {
      return list;
    } else if (sortBy === "oldest") {
      return list.reverse();
    } else {
      return list.sort((a, b) => (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares));
    }
  }, [data, activePlatform, sortBy, retryCount]);

  function handleRetry() {
    setRetryCount((c) => c + 1);
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Live Feed" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Live Mention Feed</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Real-time cross-platform mention stream</p>
        </div>
        <Button variant="ghost" size="sm"><RefreshCw size={16} /> Refresh</Button>
      </div>

      <WidgetCard>
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-hairline-violet/50">
          <div className="flex gap-2 overflow-x-auto">
            {platformFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActivePlatform(f)}
                className={`px-3 py-1.5 rounded-xl text-[14px] font-medium uppercase tracking-[0.2px] transition-all whitespace-nowrap ${
                  activePlatform === f ? "bg-accent-lime text-ink-deep" : "bg-accent-violet-mid/30 text-on-dark-muted hover:text-on-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortMode)}
            className="bg-accent-violet-mid/30 text-on-primary text-[14px] rounded-xl px-3 py-1.5 border border-hairline-violet/30 outline-none"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value} className="bg-ink-deep">{o.label}</option>
            ))}
          </select>
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
            <p className="text-[16px] text-on-dark-muted mb-2">No mentions matching your filter</p>
            <Button variant="ghost" size="sm" onClick={() => setActivePlatform("all")}>
              <RotateCcw size={14} /> Reset Filters
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
