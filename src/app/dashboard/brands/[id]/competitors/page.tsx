"use client";

import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, TrendingDown, Minus } from "lucide-react";

const competitors = [
  { name: "Competitor A", share: 32, trend: "up" as const, sentiment: 62, mentions: 1240 },
  { name: "Competitor B", share: 28, trend: "down" as const, sentiment: 55, mentions: 980 },
  { name: "Competitor C", share: 18, trend: "up" as const, sentiment: 71, mentions: 620 },
  { name: "Competitor D", share: 12, trend: "stable" as const, sentiment: 68, mentions: 340 },
];

export default function BrandCompetitorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold leading-[1.3]">Brand — Competitors</h1>
        <p className="text-[14px] text-on-dark-muted mt-1">Competitive landscape analysis and benchmarking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WidgetCard title="Brand Position">Your brand holds <span className="text-accent-lime font-semibold">38%</span> voice share — leading the market.</WidgetCard>
        <WidgetCard title="Avg Industry Sentiment">Industry average: <span className="text-yellow-400 font-semibold">64%</span> positive. You are <span className="text-accent-lime font-semibold">+8% above</span> average.</WidgetCard>
      </div>

      <WidgetCard title="Competitor Analysis">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-hairline-violet text-on-dark-muted">
              <th className="text-left py-3 font-medium">Competitor</th>
              <th className="text-right py-3 font-medium">Voice Share</th>
              <th className="text-right py-3 font-medium">Trend</th>
              <th className="text-right py-3 font-medium">Sentiment</th>
              <th className="text-right py-3 font-medium">Mentions</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((comp, i) => (
              <tr key={i} className="border-b border-hairline-violet/50 hover:bg-ink-deep/30 transition-colors">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <Building2 size={16} className="text-on-dark-muted" />
                    <span className="font-medium">{comp.name}</span>
                  </div>
                </td>
                <td className="text-right py-3 font-semibold">{comp.share}%</td>
                <td className="text-right py-3">
                  {comp.trend === "up" ? <TrendingUp size={16} className="text-accent-lime inline" /> :
                   comp.trend === "down" ? <TrendingDown size={16} className="text-red-400 inline" /> :
                   <Minus size={16} className="text-yellow-400 inline" />}
                </td>
                <td className="text-right py-3">
                  <Badge variant={comp.sentiment >= 65 ? "lime" : "default"}>
                    {comp.sentiment}%
                  </Badge>
                </td>
                <td className="text-right py-3 text-on-dark-muted">{comp.mentions.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </WidgetCard>
    </div>
  );
}
