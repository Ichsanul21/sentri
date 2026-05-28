"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import Link from "next/link";
import { Search, Trash2, Clock } from "lucide-react";

interface SavedSearch {
  id: string;
  name: string;
  filters: string;
  createdAt: string;
}

const savedSearches: SavedSearch[] = [];

export default function SavedSearchesPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Live Feed", href: "/dashboard/live-feed" }, { label: "Saved Searches" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Saved Searches</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Saved mention filters for quick access</p>
        </div>
      </div>

      {savedSearches.length === 0 ? (
        <WidgetCard>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-accent-violet-mid/30 flex items-center justify-center mb-4">
              <Search size={24} className="text-on-dark-muted" />
            </div>
            <p className="text-[18px] font-medium text-on-dark-muted mb-2">No saved searches yet</p>
            <p className="text-[14px] text-on-dark-muted/70 max-w-sm">
              Create your first saved search by applying filters on the live feed and saving them.
            </p>
            <Link
              href="/dashboard/live-feed"
              className="inline-flex items-center gap-2 bg-on-dark-faint text-on-primary font-medium uppercase tracking-[0.2px] text-[14px] leading-[1.29] rounded-xl px-3 py-2 hover:opacity-80 transition-all mt-6"
            >
              <Search size={14} /> Browse Live Feed
            </Link>
          </div>
        </WidgetCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedSearches.map((s) => (
            <WidgetCard key={s.id}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[18px] font-semibold">{s.name}</h3>
                <button className="text-on-dark-muted hover:text-severity-critical transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-[14px] text-on-dark-muted mb-3">{s.filters}</p>
              <div className="flex items-center gap-1.5 text-[12px] text-on-dark-muted/60">
                <Clock size={12} />
                <span>Saved {s.createdAt}</span>
              </div>
            </WidgetCard>
          ))}
        </div>
      )}
    </div>
  );
}
