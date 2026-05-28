"use client";

import { useState } from "react";
import { WidgetCard } from "@/components/ui/card";
import { BrandHealthGauge } from "@/components/dashboard/brand-health-gauge";
import { SentimentDonut } from "@/components/dashboard/sentiment-donut";
import { VolumeChart } from "@/components/dashboard/volume-chart";
import { EmotionBarChart } from "@/components/dashboard/emotion-bar";
import { CompetitorMatrix } from "@/components/dashboard/competitor-matrix";
import { KpiMetric } from "@/components/dashboard/kpi-metric";
import { KeywordCloud } from "@/components/dashboard/keyword-cloud";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CrisisBanner } from "@/components/crisis/crisis-banner";
import { Skeleton } from "@/components/ui/skeleton";
import { useLoading } from "@/hooks/use-loading";
import { volumeData, emotionData, keywords, competitorRows } from "@/data/mock";

export default function DashboardPage() {
  const [crisisMode] = useState(false);
  const { loading } = useLoading(true, 600);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton variant="text" className="h-8 w-56" />
            <Skeleton variant="text" className="h-4 w-72 mt-2" />
          </div>
          <Skeleton variant="text" className="h-8 w-24" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} variant="card" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} variant="chart" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[1, 2].map((i) => <Skeleton key={i} variant="chart" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {crisisMode && <CrisisBanner />}
      <Breadcrumbs items={[{ label: "Dashboard" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Executive Dashboard</h1>
          <p className="text-[16px] font-medium leading-[1.5] text-on-dark-muted mt-1">
            Real-time brand health overview for Sentri
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="lime" className="px-3 py-1">LIVE</Badge>
          <select className="bg-accent-violet-mid/30 text-on-primary text-[14px] rounded-md px-3 py-1.5 border border-hairline-violet outline-none">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <WidgetCard>
          <KpiMetric label="Brand Health" value="84" delta={{ value: "3.2%", positive: true }} />
        </WidgetCard>
        <WidgetCard>
          <KpiMetric label="Total Mentions" value="12,450" delta={{ value: "12.5%", positive: true }} />
        </WidgetCard>
        <WidgetCard>
          <KpiMetric label="Avg Sentiment" value="72%" delta={{ value: "1.8%", positive: false }} />
        </WidgetCard>
        <WidgetCard>
          <KpiMetric label="Active Alerts" value="2" />
        </WidgetCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <WidgetCard title="Brand Health Score" className="lg:col-span-1">
          <div className="flex justify-center py-2">
            <BrandHealthGauge score={84} />
          </div>
        </WidgetCard>
        <WidgetCard title="Sentiment Distribution" className="lg:col-span-1">
          <SentimentDonut positive={72} neutral={20} negative={8} />
        </WidgetCard>
        <WidgetCard title="Emotion Distribution" className="lg:col-span-1">
          <EmotionBarChart data={emotionData} />
        </WidgetCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WidgetCard title="Volume Trend">
          <VolumeChart data={volumeData} />
        </WidgetCard>
        <WidgetCard title="Keyword Trending">
          <KeywordCloud keywords={keywords} />
        </WidgetCard>
      </div>

      <WidgetCard title="Competitor Benchmarking">
        <CompetitorMatrix rows={competitorRows} />
      </WidgetCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WidgetCard title="Top Mentions">
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3 p-2 rounded hover:bg-accent-lime/4 transition-colors">
                <div className="w-8 h-8 rounded-full bg-accent-violet-mid/30 flex items-center justify-center text-[12px] font-bold shrink-0">
                  U{i}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-semibold leading-[1.5]">User_{i}</span>
                    <span className="text-[14px] text-on-dark-muted leading-[1.43]">· Twitter</span>
                    <span className="text-[14px] text-on-dark-muted leading-[1.43]">· 2h ago</span>
                  </div>
                  <p className="text-[16px] leading-[1.5] truncate">
                    Sentri dashboard is amazing! The real-time sentiment tracking is incredibly useful for our team.
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-[14px] text-on-dark-muted">
                    <span>❤️ {12 * i}</span>
                    <span>💬 {5 * i}</span>
                    <span>🔄 {3 * i}</span>
                  </div>
                </div>
                <Badge variant="sentiment-positive">Positive</Badge>
              </div>
            ))}
          </div>
        </WidgetCard>
        <WidgetCard title="Alert Status">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded bg-severity-critical/10 border border-severity-critical/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-severity-critical animate-pulse-dot" />
                <div>
                  <span className="text-[16px] font-semibold leading-[1.5]">Sentimen Spike</span>
                  <p className="text-[14px] leading-[1.43] text-on-dark-muted">Negatif 340% dalam 1 jam</p>
                </div>
              </div>
              <Badge variant="severity-critical">Critical</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded bg-severity-high/10 border border-severity-high/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-severity-high" />
                <div>
                  <span className="text-[16px] font-semibold leading-[1.5]">Velocity Surge</span>
                  <p className="text-[14px] leading-[1.43] text-on-dark-muted">120 mentions/min</p>
                </div>
              </div>
              <Badge variant="severity-high">High</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded bg-accent-violet-mid/10 border border-hairline-violet">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-severity-low" />
                <div>
                  <span className="text-[16px] font-semibold leading-[1.5]">Competitor Launch</span>
                  <p className="text-[14px] leading-[1.43] text-on-dark-muted">BrandWatch baru rilis fitur</p>
                </div>
              </div>
              <Badge variant="severity-low">Low</Badge>
            </div>
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
