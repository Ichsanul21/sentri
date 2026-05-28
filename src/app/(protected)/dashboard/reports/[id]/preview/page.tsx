"use client";

import { useParams } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KpiMetric } from "@/components/dashboard/kpi-metric";
import { Download } from "lucide-react";

const mockKpis = [
  { label: "Total Mentions", value: "12,847", delta: { value: "8.2%", positive: true } },
  { label: "Positive Sentiment", value: "64%", delta: { value: "3.1%", positive: true } },
  { label: "Negative Sentiment", value: "12%", delta: { value: "1.4%", positive: false } },
  { label: "Engagement Rate", value: "4.7%", delta: { value: "0.9%", positive: true } },
];

const sentimentTrend = [
  { date: "May 22", positive: 62, neutral: 26, negative: 12 },
  { date: "May 23", positive: 65, neutral: 22, negative: 13 },
  { date: "May 24", positive: 58, neutral: 30, negative: 12 },
  { date: "May 25", positive: 64, neutral: 25, negative: 11 },
  { date: "May 26", positive: 67, neutral: 22, negative: 11 },
  { date: "May 27", positive: 63, neutral: 24, negative: 13 },
  { date: "May 28", positive: 64, neutral: 24, negative: 12 },
];

const topMentions = [
  { source: "Twitter", content: "Absolutely love the new update! Game changer for our team.", sentiment: "Positive", engagement: 1247 },
  { source: "Reddit", content: "Customer support took 3 days to respond. Very disappointing.", sentiment: "Negative", engagement: 892 },
  { source: "LinkedIn", content: "Interesting approach to solving the authentication issue.", sentiment: "Neutral", engagement: 654 },
  { source: "Twitter", content: "The latest feature rollout has been smooth. Great job team!", sentiment: "Positive", engagement: 523 },
  { source: "News", content: "Company announces strategic partnership with leading analytics firm.", sentiment: "Positive", engagement: 345 },
];

const sentimentColor: Record<string, string> = {
  Positive: "text-sentiment-positive",
  Negative: "text-sentiment-negative",
  Neutral: "text-sentiment-neutral",
};

const barColor: Record<string, string> = {
  positive: "bg-sentiment-positive",
  neutral: "bg-sentiment-neutral",
  negative: "bg-sentiment-negative",
};

export default function ReportPreviewPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Reports", href: "/dashboard/reports" }, { label: "Preview" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Report Preview</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Report ID: {id}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm"><Download size={16} /> PDF</Button>
          <Button variant="ghost" size="sm"><Download size={16} /> PPT</Button>
          <Button variant="ghost" size="sm"><Download size={16} /> Excel</Button>
        </div>
      </div>

      <WidgetCard title="Executive Summary">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mockKpis.map((kpi) => (
            <KpiMetric key={kpi.label} label={kpi.label} value={kpi.value} delta={kpi.delta} />
          ))}
        </div>
      </WidgetCard>

      <WidgetCard title="Sentiment Trend (Last 7 Days)">
        <div className="space-y-2">
          <div className="flex items-center gap-4 text-[12px] text-on-dark-muted uppercase tracking-wider font-medium">
            <span className="w-24">Date</span>
            <span className="flex-1">Distribution</span>
          </div>
          {sentimentTrend.map((day) => {
            const total = day.positive + day.neutral + day.negative;
            return (
              <div key={day.date} className="flex items-center gap-4">
                <span className="w-24 text-[14px] font-medium">{day.date}</span>
                <div className="flex-1 flex items-center h-6 rounded overflow-hidden">
                  <div
                    className={`${barColor.positive} h-full`}
                    style={{ width: `${(day.positive / total) * 100}%` }}
                  />
                  <div
                    className={`${barColor.neutral} h-full`}
                    style={{ width: `${(day.neutral / total) * 100}%` }}
                  />
                  <div
                    className={`${barColor.negative} h-full`}
                    style={{ width: `${(day.negative / total) * 100}%` }}
                  />
                </div>
                <div className="flex items-center gap-3 text-[12px]">
                  <span className="text-sentiment-positive">{day.positive}%</span>
                  <span className="text-sentiment-neutral">{day.neutral}%</span>
                  <span className="text-sentiment-negative">{day.negative}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </WidgetCard>

      <WidgetCard title="Top Mentions">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[12px] text-on-dark-muted uppercase tracking-wider border-b border-hairline-violet/50">
                <th className="pb-2 font-medium">Source</th>
                <th className="pb-2 font-medium">Content</th>
                <th className="pb-2 font-medium">Sentiment</th>
                <th className="pb-2 font-medium text-right">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {topMentions.map((mention, i) => (
                <tr key={i} className="border-b border-hairline-violet/30">
                  <td className="py-3 pr-4 text-[14px]">{mention.source}</td>
                  <td className="py-3 pr-4 text-[14px] text-on-dark-muted max-w-md truncate">{mention.content}</td>
                  <td className={`py-3 pr-4 text-[14px] font-medium ${sentimentColor[mention.sentiment]}`}>{mention.sentiment}</td>
                  <td className="py-3 text-[14px] text-right">{mention.engagement.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WidgetCard>
    </div>
  );
}
