"use client";

import { useState, useCallback } from "react";
import type { SentimentLabel, Platform } from "@/types";
import type { MentionFilter } from "@/types/sentiment";
import { mentions as mockMentions } from "@/data/mock";
import type { MentionItem } from "@/data/mock";

export function useSentiment() {
  const [mentions] = useState<MentionItem[]>(mockMentions);
  const [filters, setFilters] = useState<MentionFilter>({});
  const [loading] = useState(false);

  const filteredMentions = mentions.filter((m) => {
    if (filters.sentiment?.length && !filters.sentiment.includes(m.sentiment)) return false;
    if (filters.platforms?.length && !filters.platforms.includes(m.platform.toLowerCase() as Platform)) return false;
    return true;
  });

  const setSentimentFilter = useCallback((sentiment?: SentimentLabel[]) => {
    setFilters((f) => ({ ...f, sentiment }));
  }, []);

  const setPlatformFilter = useCallback((platforms?: Platform[]) => {
    setFilters((f) => ({ ...f, platforms }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    mentions: filteredMentions,
    allMentions: mentions,
    filters,
    loading,
    setSentimentFilter,
    setPlatformFilter,
    clearFilters,
  };
}
