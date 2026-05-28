"use client";

import { Users, MapPin, Target } from "lucide-react";
import type { AudienceData, PersonaGap } from "@/types/strategy";

interface PersonaCardProps {
  actual: AudienceData;
  alignmentScore: number;
  gaps: PersonaGap[];
}

export function PersonaCard({ actual, alignmentScore, gaps }: PersonaCardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-ink-deep border border-hairline-violet rounded-lg p-4 space-y-4">
        <h4 className="flex items-center gap-2 text-[16px] font-semibold leading-[1.5]">
          <Users size={18} className="text-accent-lime" />
          Audience Demographics
        </h4>
        <div>
          <p className="text-[14px] font-medium text-on-dark-muted mb-1">Age Distribution</p>
          <div className="space-y-1">
            {Object.entries(actual.ageDistribution).map(([age, pct]) => (
              <div key={age} className="flex items-center justify-between text-[14px] leading-[1.43]">
                <span>{age}</span>
                <span className="font-medium">{pct}%</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[14px] font-medium text-on-dark-muted mb-1">Gender Split</p>
          <div className="flex gap-3 text-[14px] leading-[1.43]">
            <span>Male: {actual.genderSplit.male}%</span>
            <span>Female: {actual.genderSplit.female}%</span>
          </div>
        </div>
      </div>

      <div className="bg-ink-deep border border-hairline-violet rounded-lg p-4 space-y-4">
        <h4 className="flex items-center gap-2 text-[16px] font-semibold leading-[1.5]">
          <MapPin size={18} className="text-accent-lime" />
          Top Locations
        </h4>
        <div className="space-y-2">
          {actual.topLocations.map((loc, i) => (
            <div key={i} className="flex items-center justify-between text-[14px] leading-[1.43]">
              <span>{loc.city}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                  <div className="h-full rounded-full bg-accent-lime" style={{ width: `${loc.percentage}%` }} />
                </div>
                <span className="font-medium w-8 text-right">{loc.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[14px] font-medium text-on-dark-muted mb-1">Top Interests</p>
          <div className="flex flex-wrap gap-1.5">
            {actual.topInterests.map((int, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-accent-violet-mid/30 text-on-primary text-[12px]">{int.interest} {int.percentage}%</span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-ink-deep border border-hairline-violet rounded-lg p-4 space-y-4">
        <h4 className="flex items-center gap-2 text-[16px] font-semibold leading-[1.5]">
          <Target size={18} className="text-accent-lime" />
          Alignment Score: {alignmentScore}/100
        </h4>
        <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
          <div className="h-full rounded-full bg-accent-lime transition-all" style={{ width: `${alignmentScore}%` }} />
        </div>
        <div className="space-y-3">
          {gaps.map((gap, i) => (
            <div key={i} className="p-2 rounded bg-surface-night">
              <span className="text-[12px] font-semibold uppercase tracking-[0.25px] text-severity-medium">{gap.dimension}</span>
              <p className="text-[14px] leading-[1.43] mt-0.5">
                Expected: {gap.expected} | Actual: {gap.actual}
              </p>
              <p className="text-[12px] text-accent-lime mt-0.5">{gap.actionItem}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
