"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KpiMetric } from "@/components/dashboard/kpi-metric";
import { KeywordCloud } from "@/components/dashboard/keyword-cloud";
import { keywords } from "@/data/mock";
import { Hash, TrendingUp, TrendingDown } from "lucide-react";

const associations = [
  { word: "inovatif", count: 145, sentiment: "positive" as const, change: "+12%" },
  { word: "mahal", count: 89, sentiment: "negative" as const, change: "+45%" },
  { word: "cepat", count: 72, sentiment: "positive" as const, change: "+8%" },
  { word: "andal", count: 65, sentiment: "positive" as const, change: "+3%" },
  { word: "rumit", count: 34, sentiment: "negative" as const, change: "+22%" },
  { word: "modern", count: 28, sentiment: "positive" as const, change: "+18%" },
  { word: "responsif", count: 22, sentiment: "positive" as const, change: "+5%" },
  { word: "usang", count: 15, sentiment: "negative" as const, change: "-8%" },
];

export default function AssociationsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Sentiment", href: "/sentiment" }, { label: "Associations" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Brand Associations</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Words and phrases commonly associated with your brand</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <WidgetCard><KpiMetric label="Total Associations" value="42" delta={{ value: "8 new", positive: true }} /></WidgetCard>
        <WidgetCard><KpiMetric label="Positive" value="68%" delta={{ value: "5%", positive: true }} /></WidgetCard>
        <WidgetCard><KpiMetric label="Negative" value="32%" delta={{ value: "3%", positive: false }} /></WidgetCard>
        <WidgetCard><KpiMetric label="Top Association" value="inovatif" delta={{ value: "145x", positive: true }} /></WidgetCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WidgetCard title="Association List">
          <div className="divide-y divide-hairline-violet/30 -mx-4">
            {associations.map((a) => (
              <div key={a.word} className="flex items-center justify-between px-4 py-3 hover:bg-accent-lime/4 transition-colors">
                <div className="flex items-center gap-3">
                  <Hash size={16} className="text-on-dark-muted" />
                  <span className="text-[16px] font-medium">{a.word}</span>
                  <Badge variant={a.sentiment === "positive" ? "sentiment-positive" : "sentiment-negative"}>
                    {a.sentiment}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[14px] text-on-dark-muted">{a.count}x</span>
                  <span className={`flex items-center gap-1 text-[14px] ${a.change.startsWith("+") ? "text-sentiment-positive" : "text-sentiment-negative"}`}>
                    {a.change.startsWith("+") ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {a.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>

        <WidgetCard title="Association Cloud">
          <KeywordCloud keywords={keywords} />
        </WidgetCard>
      </div>
    </div>
  );
}
