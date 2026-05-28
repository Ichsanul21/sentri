"use client";

import type { BrandAssociation } from "@/types/brand";

interface AssociationCloudProps {
  associations: BrandAssociation[];
  max?: number;
}

export function AssociationCloud({ associations, max = 20 }: AssociationCloudProps) {
  const top = associations
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, max);

  const maxFreq = top[0]?.frequency || 1;

  return (
    <div className="flex flex-wrap gap-1.5">
      {top.map((a) => {
        const size = 12 + (a.frequency / maxFreq) * 12;
        return (
          <span
            key={a.adjective}
            className={`inline-block rounded px-1.5 py-0.5 text-[${Math.round(size)}px] transition-all hover:scale-110 cursor-default ${
              a.sentimentContext === "positive"
                ? "text-sentiment-positive bg-sentiment-positive/10"
                : a.sentimentContext === "negative"
                  ? "text-sentiment-negative bg-sentiment-negative/10"
                  : "text-on-dark-muted bg-white/[0.04]"
            }`}
            title={`${a.adjective}: ${a.frequency} mentions`}
          >
            {a.adjective}
          </span>
        );
      })}
    </div>
  );
}
