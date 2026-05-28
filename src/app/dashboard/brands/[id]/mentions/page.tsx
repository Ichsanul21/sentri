"use client";

import { useState } from "react";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MentionFeed } from "@/components/feed/mention-feed";
import { Search, Filter } from "lucide-react";

export default function BrandMentionsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold leading-[1.3]">Brand — Mentions</h1>
        <p className="text-[14px] text-on-dark-muted mt-1">Monitor all brand mentions across platforms.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted" />
          <input
            type="text"
            placeholder="Search mentions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-hairline-violet bg-ink-deep text-on-primary text-[14px] outline-none focus:border-accent-lime/50 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-hairline-violet text-on-dark-muted hover:text-on-primary hover:border-accent-lime/30 transition-colors text-[14px]">
          <Filter size={16} /> Filters
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="lime">All Platforms</Badge>
        <Badge variant="default">Twitter/X</Badge>
        <Badge variant="default">Instagram</Badge>
        <Badge variant="default">Reddit</Badge>
        <Badge variant="default">Facebook</Badge>
        <Badge variant="default">News</Badge>
      </div>

      <WidgetCard>
        <MentionFeed searchQuery={search} />
      </WidgetCard>
    </div>
  );
}
