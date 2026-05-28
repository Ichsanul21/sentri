"use client";

import { Calendar, Clock, TrendingUp } from "lucide-react";

interface Recommendation {
  type: string;
  reason: string;
  expectedEngagement: string;
}

interface PostingTime {
  day: string;
  time: string;
  platform: string;
}

interface CampaignCalendarProps {
  recommendations: Recommendation[];
  postingTimes: PostingTime[];
  hashtags: string[];
  contentGaps: string[];
}

export function CampaignCalendar({ recommendations, postingTimes, hashtags, contentGaps }: CampaignCalendarProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-ink-deep border border-hairline-violet rounded-lg p-4">
        <h4 className="flex items-center gap-2 text-[16px] font-semibold leading-[1.5] mb-3">
          <TrendingUp size={18} className="text-accent-lime" />
          Content Recommendations
        </h4>
        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <div key={i} className="p-3 rounded bg-surface-night">
              <span className="text-[12px] font-semibold uppercase tracking-[0.25px] text-accent-lime">{rec.type.replace(/_/g, " ")}</span>
              <p className="text-[14px] leading-[1.43] mt-1">{rec.reason}</p>
              <span className="text-[12px] text-on-dark-muted mt-1 block">Expected: {rec.expectedEngagement}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-ink-deep border border-hairline-violet rounded-lg p-4">
        <h4 className="flex items-center gap-2 text-[16px] font-semibold leading-[1.5] mb-3">
          <Clock size={18} className="text-accent-lime" />
          Best Posting Times
        </h4>
        <div className="space-y-2">
          {postingTimes.map((pt, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-white/[0.04] transition-colors">
              <span className="text-[14px] leading-[1.43] capitalize">{pt.day}</span>
              <span className="text-[14px] font-medium text-accent-lime">{pt.time}</span>
              <span className="text-[12px] text-on-dark-muted capitalize">{pt.platform}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-ink-deep border border-hairline-violet rounded-lg p-4">
          <h4 className="flex items-center gap-2 text-[16px] font-semibold leading-[1.5] mb-3">
            <Calendar size={18} className="text-accent-lime" />
            Hashtag Suggestions
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {hashtags.map((h, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-accent-violet-mid/30 text-on-primary text-[12px]">#{h}</span>
            ))}
          </div>
        </div>

        <div className="bg-ink-deep border border-hairline-violet rounded-lg p-4">
          <h4 className="text-[16px] font-semibold leading-[1.5] mb-3">Content Gaps</h4>
          <div className="space-y-2">
            {contentGaps.map((gap, i) => (
              <div key={i} className="flex items-center gap-2 text-[14px] leading-[1.43]">
                <span className="w-1.5 h-1.5 rounded-full bg-severity-medium shrink-0" />
                {gap}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
