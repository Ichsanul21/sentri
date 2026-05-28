"use client";

import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Target, TrendingUp, MessageCircle, Calendar, ArrowRight } from "lucide-react";

const recommendations = [
  {
    id: "r1",
    title: "Increase engagement on Instagram Reels",
    description: "Your audience shows 3x higher engagement on short-form video content. Prioritize Reels with product demonstrations and behind-the-scenes content.",
    impact: "high",
    category: "content",
    effort: "low",
    timeline: "1-2 weeks",
  },
  {
    id: "r2",
    title: "Address negative sentiment around shipping",
    description: "15% of recent mentions cite shipping delays. Proactive communication about delivery times could recover ~40% of detractors.",
    impact: "high",
    category: "operations",
    effort: "medium",
    timeline: "1 week",
  },
  {
    id: "r3",
    title: "Launch Twitter/X community program",
    description: "Your top 50 advocates generate 60% of positive mentions. A structured ambassador program could amplify this 3x.",
    impact: "medium",
    category: "community",
    effort: "medium",
    timeline: "2-4 weeks",
  },
  {
    id: "r4",
    title: "Optimize posting schedule for Reddit",
    description: "Mentions spike 45% on Tuesday/Wednesday mornings. Align your posting schedule to match peak community activity.",
    impact: "medium",
    category: "content",
    effort: "low",
    timeline: "Immediate",
  },
  {
    id: "r5",
    title: "Competitor A is gaining share in 18-24 demo",
    description: "Competitor A has increased voice share by 12% in the 18-24 demographic. Consider targeted campaigns to recover this segment.",
    impact: "high",
    category: "competitive",
    effort: "high",
    timeline: "1-2 months",
  },
  {
    id: "r6",
    title: "Implement social listening for product feedback",
    description: "42% of neutral mentions contain product feedback. A structured feedback pipeline could convert neutrals to promoters.",
    impact: "medium",
    category: "product",
    effort: "medium",
    timeline: "3-4 weeks",
  },
];

const categoryIcons: Record<string, typeof Lightbulb> = {
  content: TrendingUp,
  operations: Target,
  community: MessageCircle,
  competitive: Target,
  product: Lightbulb,
};

export default function RecommendationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold leading-[1.3]">Strategy Recommendations</h1>
        <p className="text-[14px] text-on-dark-muted mt-1">AI-powered recommendations to improve your brand performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <WidgetCard>
          <div className="flex items-center gap-3">
            <Lightbulb size={20} className="text-accent-lime" />
            <div>
              <p className="text-[12px] text-on-dark-muted">Active Recommendations</p>
              <p className="text-[24px] font-bold">{recommendations.length}</p>
            </div>
          </div>
        </WidgetCard>
        <WidgetCard>
          <div className="flex items-center gap-3">
            <Target size={20} className="text-accent-lime" />
            <div>
              <p className="text-[12px] text-on-dark-muted">High Impact</p>
              <p className="text-[24px] font-bold">{recommendations.filter((r) => r.impact === "high").length}</p>
            </div>
          </div>
        </WidgetCard>
        <WidgetCard>
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-accent-lime" />
            <div>
              <p className="text-[12px] text-on-dark-muted">Avg Timeline</p>
              <p className="text-[24px] font-bold">2.4 weeks</p>
            </div>
          </div>
        </WidgetCard>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const Icon = categoryIcons[rec.category] || Lightbulb;
          return (
            <div key={rec.id} className="p-4 rounded-xl border border-hairline-violet bg-ink-deep/20 hover:bg-ink-deep/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent-violet-deep/40 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-accent-lime" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[16px] font-semibold leading-[1.4]">{rec.title}</h3>
                    <Badge variant={rec.impact === "high" ? "lime" : "default"}>
                      {rec.impact} impact
                    </Badge>
                    <Badge variant="default">{rec.effort} effort</Badge>
                  </div>
                  <p className="text-[14px] leading-[1.5] text-on-dark-muted mt-2">{rec.description}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-[12px] text-on-dark-muted flex items-center gap-1">
                      <Calendar size={12} /> {rec.timeline}
                    </span>
                    <button className="flex items-center gap-1 text-[12px] text-accent-lime hover:underline ml-auto">
                      View details <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
