"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import type { Brand, BrandDnaFormData, Competitor, KeywordTracker } from "@/types/brand";
import { defaultCompetitors } from "@/data/mock";
import { getItem, setItem } from "@/lib/storage";

const BRANDS_KEY = "sentri_brands";

export function useBrand() {
  const params = useParams();
  const brandId = params.id as string;
  
  const [brand, setBrand] = useState<Brand | null>(null);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [keywords, setKeywords] = useState<KeywordTracker | null>(null);

  // Load brand data when brandId changes
  useEffect(() => {
    if (!brandId) return;
    
    const allBrands = getItem<Brand[]>(BRANDS_KEY, []);
    const found = allBrands.find(b => b.id === brandId);
    
    if (found) {
      setBrand(found);
      setKeywords({
        id: `kt-${brandId}`,
        keywords: [found.brandName, "sentiment", "analytics"],
        hashtags: [`#${found.brandName.replace(/\s/g, '')}`],
        productNames: [],
        campaignHashtags: [],
      });
    } else {
      // Check for default brand
      const defaultBrand: Brand = {
        id: "brand-1",
        brandName: "Sentri",
        tagline: "Enterprise Brand Sentiment & Social Listening",
        colors: { primary: "#150f23", secondary: "#6a5fc1", accent: "#c2ef4e" },
        industry: "Technology",
        targetDemographic: { ageRange: "25-45", location: "Indonesia", gender: "all", interests: ["technology", "marketing", "social media"] },
        brandPersonality: ["Inovatif", "Terpercaya"],
      };
      
      if (brandId === "brand-1") {
        setBrand(defaultBrand);
        setKeywords({
          id: "kt-1",
          keywords: ["Sentri", "sentiment", "analytics"],
          hashtags: ["#SentriApp", "#brandmonitoring"],
          productNames: ["Sentri Dashboard", "Sentri Analytics"],
          campaignHashtags: [],
        });
      }
    }
  }, [brandId]);

  const [defaultCompetitorsList] = useState(
    defaultCompetitors.map((c, i) => ({ id: `comp-${i}`, name: c.name, handles: c.handles })),
  );

  useEffect(() => {
    setCompetitors(defaultCompetitorsList);
  }, [defaultCompetitorsList]);

  const updateBrand = useCallback((data: Partial<BrandDnaFormData>) => {
    setBrand((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data, logo: data.logo && typeof data.logo !== "string" ? undefined : data.logo };
      // Save to storage
      const allBrands = getItem<Brand[]>(BRANDS_KEY, []);
      const idx = allBrands.findIndex(b => b.id === prev.id);
      if (idx >= 0) {
        allBrands[idx] = updated;
        setItem(BRANDS_KEY, allBrands);
      }
      return updated;
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
