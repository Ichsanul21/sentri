"use client";

import { useState, useCallback } from "react";
import type { Brand, BrandDnaFormData, Competitor, KeywordTracker } from "@/types/brand";
import { defaultCompetitors } from "@/data/mock";

export function useBrand() {
  const [brand, setBrand] = useState<Brand | null>({
    id: "brand-1",
    brandName: "Sentri",
    tagline: "Enterprise Brand Sentiment & Social Listening",
    colors: { primary: "#150f23", secondary: "#6a5fc1", accent: "#c2ef4e" },
    industry: "Technology",
    targetDemographic: { ageRange: "25-45", location: "Indonesia", gender: "all", interests: ["technology", "marketing", "social media"] },
    brandPersonality: ["Inovatif", "Terpercaya"],
  });

  const [competitors, setCompetitors] = useState<Competitor[]>(
    defaultCompetitors.map((c, i) => ({ id: `comp-${i}`, name: c.name, handles: c.handles })),
  );

  const [keywords] = useState<KeywordTracker>({
    id: "kt-1",
    keywords: ["Sentri", "sentiment", "analytics"],
    hashtags: ["#SentriApp", "#brandmonitoring"],
    productNames: ["Sentri Dashboard", "Sentri Analytics"],
    campaignHashtags: [],
  });

  const updateBrand = useCallback((data: Partial<BrandDnaFormData>) => {
    setBrand((prev) => {
      if (!prev) return prev;
      return { ...prev, ...data, logo: data.logo && typeof data.logo !== "string" ? undefined : data.logo };
    });
  }, []);

  const addCompetitor = useCallback((competitor: Competitor) => {
    setCompetitors((prev) => [...prev, competitor]);
  }, []);

  const removeCompetitor = useCallback((id: string) => {
    setCompetitors((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return { brand, competitors, keywords, updateBrand, addCompetitor, removeCompetitor };
}
