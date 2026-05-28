"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KpiMetric } from "@/components/dashboard/kpi-metric";
import { SentimentDonut } from "@/components/dashboard/sentiment-donut";
import { EmotionBarChart } from "@/components/dashboard/emotion-bar";
import { VolumeChart } from "@/components/dashboard/volume-chart";
import { volumeData, emotionData } from "@/data/mock";
import { Select } from "@/components/ui/select";

export default function SentimentAnalysisPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Sentiment", href: "/sentiment" }, { label: "Analysis" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Sentiment Analysis</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Deep-dive sentiment analytics across all platforms</p>
        </div>
        <Select
          options={[
            { value: "24h", label: "Last 24 Hours" },
            { value: "7d", label: "Last 7 Days" },
            { value: "30d", label: "Last 30 Days" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <WidgetCard><KpiMetric label="Avg Sentiment" value="72%" delta={{ value: "3.2%", positive: true }} /></WidgetCard>
        <WidgetCard><KpiMetric label="Total Mentions" value="12,450" delta={{ value: "12.5%", positive: true }} /></WidgetCard>
        <WidgetCard><KpiMetric label="Positive" value="8,964" delta={{ value: "5.2%", positive: true }} /></WidgetCard>
        <WidgetCard><KpiMetric label="Negative" value="996" delta={{ value: "2.1%", positive: false }} /></WidgetCard>
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

      <WidgetCard title="Platform Breakdown">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { platform: "Twitter", mentions: 4230, sentiment: 68, change: "+8%" },
            { platform: "Instagram", mentions: 3120, sentiment: 78, change: "+15%" },
            { platform: "TikTok", mentions: 2450, sentiment: 82, change: "+32%" },
            { platform: "Facebook", mentions: 1890, sentiment: 65, change: "-3%" },
          ].map((p) => (
            <div key={p.platform} className="p-4 rounded-xl bg-ink-deep border border-hairline-violet space-y-3">
              <span className="text-[18px] font-semibold">{p.platform}</span>
              <div className="space-y-1">
                <div className="flex justify-between text-[14px]">
                  <span className="text-on-dark-muted">Mentions</span>
                  <span>{p.mentions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-on-dark-muted">Sentiment</span>
                  <Badge variant={p.sentiment >= 70 ? "sentiment-positive" : "sentiment-neutral"}>{p.sentiment}%</Badge>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-on-dark-muted">Change</span>
                  <span className={p.change.startsWith("+") ? "text-sentiment-positive" : "text-sentiment-negative"}>{p.change}</span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-hairline-violet/50 overflow-hidden">
                <div className="h-full rounded-full bg-accent-lime" style={{ width: `${p.sentiment}%` }} />
              </div>
            </div>
          ))}
        </div>
      </WidgetCard>
    </div>
  );
}
