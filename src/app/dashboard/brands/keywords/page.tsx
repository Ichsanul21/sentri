"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { Plus, X, Hash, Tag } from "lucide-react";

export default function KeywordsPage() {
  const { toast } = useToast();
  const [keywords, setKeywords] = useState<string[]>(() => {
    if (typeof window === "undefined") return ["Sentri", "brand monitoring", "sentiment analysis", "social listening"];
    const saved = localStorage.getItem("sentri_keywords");
    return saved ? JSON.parse(saved) : ["Sentri", "brand monitoring", "sentiment analysis", "social listening"];
  });
  const [hashtags, setHashtags] = useState<string[]>(() => {
    if (typeof window === "undefined") return ["#SentriApp", "#BrandHealth", "#SocialListening"];
    const saved = localStorage.getItem("sentri_hashtags");
    return saved ? JSON.parse(saved) : ["#SentriApp", "#BrandHealth", "#SocialListening"];
  });
  const [input, setInput] = useState("");

  const saveKeywords = (kws: string[]) => {
    setKeywords(kws);
    if (typeof window !== "undefined") localStorage.setItem("sentri_keywords", JSON.stringify(kws));
  };

  const saveHashtags = (hts: string[]) => {
    setHashtags(hts);
    if (typeof window !== "undefined") localStorage.setItem("sentri_hashtags", JSON.stringify(hts));
  };

  const addKeyword = () => {
    if (input.trim() && keywords.length < 50) {
      saveKeywords([...keywords, input.trim()]);
      setInput("");
    }
  };

  const addHashtag = () => {
    const tag = input.startsWith("#") ? input : `#${input}`;
    if (tag.length > 1) {
      saveHashtags([...hashtags, tag]);
      setInput("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Breadcrumbs items={[{ label: "Brand", href: "/brand" }, { label: "Keywords" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Keyword & Hashtag Tracker</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Manage keywords and hashtags for social listening crawlers</p>
      </div>

      <WidgetCard title="Keywords">
        <p className="text-[14px] text-on-dark-muted mb-2">Words the system crawls across platforms</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {keywords.map((kw) => (
            <Badge key={kw} variant="lime" className="gap-1 px-2 py-1">
              <Tag size={12} />
              {kw}
              <button onClick={() => saveKeywords(keywords.filter((k) => k !== kw))} className="hover:opacity-70">
                <X size={12} />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Add keyword..." value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addKeyword()} />
          <Button variant="violet-token" size="icon" onClick={addKeyword} disabled={keywords.length >= 50}>
            <Plus size={16} />
          </Button>
        </div>
        <p className="text-[12px] text-on-dark-muted mt-1">{keywords.length}/50 keywords used</p>
      </WidgetCard>

      <WidgetCard title="Hashtags">
        <p className="text-[14px] text-on-dark-muted mb-2">Campaign and brand hashtags</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {hashtags.map((h) => (
            <Badge key={h} variant="sentiment-positive" className="gap-1 px-2 py-1">
              <Hash size={12} />
              {h}
              <button onClick={() => saveHashtags(hashtags.filter((ht) => ht !== h))} className="hover:opacity-70">
                <X size={12} />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Add hashtag..." value={input}
            onChange={(e) => setInput(e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`)}
            onKeyDown={(e) => { if (e.key === "Enter") addHashtag(); }} />
          <Button variant="violet-token" size="icon" onClick={addHashtag}>
            <Plus size={16} />
          </Button>
        </div>
      </WidgetCard>

      <div className="flex justify-end gap-3">
        <Button variant="ghost" onClick={() => { saveKeywords([]); saveHashtags([]); toast("Reset complete", "info"); }}>Reset</Button>
        <Button variant="primary" onClick={() => toast("Keywords saved", "success")}>Save Keywords</Button>
      </div>
    </div>
  );
}
