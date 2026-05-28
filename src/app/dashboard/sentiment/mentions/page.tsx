"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FilterBar } from "@/components/general/filter-bar";
import { MentionCard } from "@/components/sentiment/mention-card";
import { mentions as mockMentions } from "@/data/mock";
import type { SentimentLabel } from "@/types";

const SENTIMENT_OPTIONS: SentimentLabel[] = ["positive", "neutral", "negative"];

export default function MentionsPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const filtered = activeFilters.length === 0
    ? mockMentions
    : mockMentions.filter((m) => activeFilters.includes(m.sentiment));

  const paginated = filtered.slice(0, page * perPage);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Sentiment", href: "/sentiment" }, { label: "Mentions" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Mentions Feed</h1>
          <p className="text-[16px] font-medium leading-[1.5] text-on-dark-muted mt-1">
            {filtered.length} mentions found
          </p>
        </div>
      </div>

      <FilterBar
        options={SENTIMENT_OPTIONS.map((s) => ({
          id: s,
          label: s.charAt(0).toUpperCase() + s.slice(1),
          active: activeFilters.includes(s),
        }))}
        onToggle={toggleFilter}
        onClear={() => setActiveFilters([])}
      />

      <div className="space-y-3">
        {paginated.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[16px] font-medium leading-[1.5] text-on-dark-muted">No mentions yet</p>
          </div>
        ) : (
          paginated.map((mention, i) => (
            <MentionCard key={i} {...mention} />
          ))
        )}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-2 rounded-md bg-on-primary text-ink-deep text-[14px] font-bold leading-[1.14] uppercase tracking-[0.2px] transition-all hover:bg-surface-press-light"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
