"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MentionCard } from "@/components/sentiment/mention-card";
import { SentimentDonut } from "@/components/dashboard/sentiment-donut";
import { EmotionBarChart } from "@/components/dashboard/emotion-bar";
import { VolumeChart } from "@/components/dashboard/volume-chart";
import { KeywordCloud } from "@/components/dashboard/keyword-cloud";
import { KpiMetric } from "@/components/dashboard/kpi-metric";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { mentions, emotionData, volumeData, keywords } from "@/data/mock";

export default function SentimentPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all" ? mentions
    : mentions.filter((m) => m.sentiment === activeFilter);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Sentiment" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">AI Sentiment Engine</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Real-time sentiment analysis across all platforms</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="lime" className="px-3 py-1 animate-pulse">LIVE</Badge>
          <Button variant="ghost" size="sm"><RefreshCw size={16} /> Refresh</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <WidgetCard><KpiMetric label="Total Mentions" value="12,450" delta={{ value: "12.5%", positive: true }} /></WidgetCard>
        <WidgetCard><KpiMetric label="Positive" value="72%" delta={{ value: "5.2%", positive: true }} /></WidgetCard>
        <WidgetCard><KpiMetric label="Negative" value="8%" delta={{ value: "2.1%", positive: false }} /></WidgetCard>
        <WidgetCard><KpiMetric label="Avg Confidence" value="89%" delta={{ value: "1.3%", positive: true }} /></WidgetCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <WidgetCard title="Sentiment Distribution">
          <SentimentDonut positive={72} neutral={20} negative={8} />
        </WidgetCard>
        <WidgetCard title="Volume Trend">
          <VolumeChart data={volumeData} />
        </WidgetCard>
        <WidgetCard title="Emotion Breakdown">
          <EmotionBarChart data={emotionData} />
        </WidgetCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <WidgetCard title="Live Mention Feed">
            <div className="flex gap-2 mb-3 pb-3 border-b border-hairline-violet/50 overflow-x-auto">
              {["all", "positive", "neutral", "negative"].map((f) => (
                <button key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 rounded-xl text-[14px] font-medium uppercase tracking-[0.2px] transition-all whitespace-nowrap ${
                    activeFilter === f ? "bg-accent-lime text-ink-deep" : "bg-accent-violet-mid/30 text-on-dark-muted hover:text-on-primary"
                  }`}
                >
                  {f === "all" ? "All" : f}
                </button>
              ))}
            </div>
            <div className="divide-y divide-hairline-violet/30 -mx-4">
              {filtered.map((m, i) => (
                <MentionCard key={i} {...m} />
              ))}
            </div>
          </WidgetCard>
        </div>
        <div>
          <WidgetCard title="Top Associations">
            <div className="space-y-3">
              {[
                { word: "inovatif", count: 145, sentiment: "positive" as const },
                { word: "mahal", count: 89, sentiment: "negative" as const },
                { word: "cepat", count: 72, sentiment: "positive" as const },
                { word: "andal", count: 65, sentiment: "positive" as const },
                { word: "rumit", count: 34, sentiment: "negative" as const },
              ].map((a) => (
                <div key={a.word} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${a.sentiment === "positive" ? "bg-sentiment-positive" : "bg-sentiment-negative"}`} />
                    <span className="text-[16px]">{a.word}</span>
                  </div>
                  <span className="text-[14px] text-on-dark-muted">{a.count}x</span>
                </div>
              ))}
            </div>
          </WidgetCard>
          <WidgetCard title="Keyword Cloud" className="mt-4">
            <KeywordCloud keywords={keywords} />
          </WidgetCard>
        </div>
      </div>
    </div>
  );
}
