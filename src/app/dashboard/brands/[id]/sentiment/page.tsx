"use client";

import { WidgetCard } from "@/components/ui/card";
import { SentimentTimeline } from "@/components/dashboard/sentiment-timeline";
import { SentimentDonut } from "@/components/dashboard/sentiment-donut";

export default function BrandSentimentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold leading-[1.3]">Brand — Sentiment</h1>
        <p className="text-[14px] text-on-dark-muted mt-1">Real-time sentiment analysis and trends.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <WidgetCard title="Sentiment Distribution" className="lg:col-span-1">
          <SentimentDonut positive={68} neutral={22} negative={10} />
        </WidgetCard>
        <WidgetCard title="Trend Over Time" className="lg:col-span-2">
          <SentimentTimeline />
        </WidgetCard>
      </div>

      <WidgetCard title="Top Mentions">
        <div className="space-y-3">
          {[
            { text: "Absolutely love the new product drop! 🔥", sentiment: "positive", platform: "Twitter", date: "2h ago" },
            { text: "Customer support was incredibly helpful.", sentiment: "positive", platform: "Instagram", date: "5h ago" },
            { text: "The app keeps crashing on the latest update.", sentiment: "negative", platform: "Reddit", date: "1d ago" },
            { text: "Decent quality for the price point.", sentiment: "neutral", platform: "Facebook", date: "2d ago" },
          ].map((mention, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-hairline-violet bg-ink-deep/30">
              <span className={`w-2 h-2 mt-2 rounded-full shrink-0 ${
                mention.sentiment === "positive" ? "bg-accent-lime" :
                mention.sentiment === "negative" ? "bg-red-400" : "bg-yellow-400"
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] leading-[1.5]">{mention.text}</p>
                <p className="text-[12px] text-on-dark-muted mt-1">{mention.platform} · {mention.date}</p>
              </div>
            </div>
          ))}
        </div>
      </WidgetCard>
    </div>
  );
}
