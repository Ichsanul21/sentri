"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { CampaignCalendar } from "@/components/strategy/campaign-calendar";

const recommendations = [
  { type: "educational", reason: "Minggu lalu engagement rate 5.2%", expectedEngagement: "High" },
  { type: "behind_the_scenes", reason: "No BTS content in 2 weeks — content gap", expectedEngagement: "Medium" },
  { type: "entertainment", reason: "Top performer last month", expectedEngagement: "Very High" },
  { type: "promotional", reason: "UGC posts have 3x higher engagement", expectedEngagement: "Very High" },
  { type: "educational", reason: "New feature announcement next month", expectedEngagement: "High" },
];

const postingTimes = [
  { day: "Monday", time: "09:00", platform: "instagram" },
  { day: "Wednesday", time: "12:00", platform: "linkedin" },
  { day: "Thursday", time: "19:00", platform: "tiktok" },
  { day: "Friday", time: "10:00", platform: "twitter" },
  { day: "Saturday", time: "11:00", platform: "instagram" },
];

export default function CampaignOptimizerPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Strategy", href: "/strategy" }, { label: "Campaign Optimizer" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Campaign Optimizer</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">AI-powered content strategy recommendations</p>
        </div>
        <Button variant="ghost" size="sm"><Download size={16} /> Export</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Recommended Posts", value: "5", sub: "for next week" },
          { label: "Expected Engagement", value: "+24%", sub: "vs current avg" },
          { label: "Best Platform", value: "TikTok", sub: "highest potential" },
        ].map((s) => (
          <WidgetCard key={s.label} className="text-center">
            <div className="text-[30px] font-semibold text-accent-lime">{s.value}</div>
            <p className="text-[16px] font-medium mt-1">{s.label}</p>
            <p className="text-[14px] text-on-dark-muted">{s.sub}</p>
          </WidgetCard>
        ))}
      </div>

      <CampaignCalendar
        recommendations={recommendations}
        postingTimes={postingTimes}
        hashtags={["SentriApp", "brandmonitoring", "sociallistening", "AIanalytics", "sentimentanalysis"]}
        contentGaps={[
          "Tidak ada konten video dalam 2 minggu",
          "Tidak ada behind-the-scenes content",
          "Belum ada user-generated content campaign",
        ]}
      />
    </div>
  );
}
