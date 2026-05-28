"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MentionCard } from "@/components/sentiment/mention-card";
import { mentions } from "@/data/mock";
import { useLoading } from "@/hooks/use-loading";
import { RefreshCw, RotateCcw } from "lucide-react";

const platforms = ["All", "Twitter", "Instagram", "TikTok", "Facebook", "Google Reviews", "News"];

export default function ByPlatformPage() {
  return (
    <Suspense fallback={<div className="p-4 text-on-dark-muted">Loading platform filter...</div>}>
      <ByPlatformPageContent />
    </Suspense>
  );
}

function ByPlatformPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initial = searchParams.get("platform") || "All";
  const [activePlatform, setActivePlatform] = useState(
    platforms.includes(initial) ? initial : "All"
  );
  const [retryCount, setRetryCount] = useState(0);
  const { loading, error, data } = useLoading(mentions, 700);

  const filtered = useMemo(() => {
    let list = [...data];
    if (activePlatform !== "All") {
      list = list.filter((m) => m.platform === activePlatform);
    }
    return list;
  }, [data, activePlatform, retryCount]);

  function handlePlatformChange(p: string) {
    setActivePlatform(p);
    const params = new URLSearchParams(searchParams.toString());
    if (p === "All") {
      params.delete("platform");
    } else {
      params.set("platform", p);
    }
    router.replace(`/dashboard/live-feed/by-platform?${params.toString()}`);
  }

  function handleRetry() {
    setRetryCount((c) => c + 1);
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Live Feed", href: "/dashboard/live-feed" }, { label: "By Platform" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Mentions by Platform</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Filter cross-platform mentions by source</p>
        </div>
        <Button variant="ghost" size="sm"><RefreshCw size={16} /> Refresh</Button>
      </div>

      <WidgetCard>
        <div className="flex gap-2 mb-3 pb-3 border-b border-hairline-violet/50 overflow-x-auto">
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => handlePlatformChange(p)}
              className={`px-3 py-1.5 rounded-xl text-[14px] font-medium uppercase tracking-[0.2px] transition-all whitespace-nowrap ${
                activePlatform === p ? "bg-accent-lime text-ink-deep" : "bg-accent-violet-mid/30 text-on-dark-muted hover:text-on-primary"
              }`}
            >
              {p}
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
            <p className="text-[16px] text-on-dark-muted mb-2">No mentions found for {activePlatform}</p>
            <Button variant="ghost" size="sm" onClick={() => handlePlatformChange("All")}>
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
