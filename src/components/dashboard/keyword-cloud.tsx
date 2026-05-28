"use client";

interface KeywordCloudProps {
  keywords: { word: string; count: number }[];
}

const COLORS_DARK = ["#c2ef4e", "rgba(255,255,255,0.72)", "#6a5fc1"];

export function KeywordCloud({ keywords }: KeywordCloudProps) {
  if (!keywords.length) {
    return (
      <div className="flex items-center justify-center h-32 text-on-dark-muted text-[14px]">
        No keywords trending
      </div>
    );
  }
  const maxCount = Math.max(...keywords.map((k) => k.count));
  return (
    <div className="flex flex-wrap gap-2 p-2">
      {keywords.map((kw, idx) => {
        const size = 12 + (kw.count / maxCount) * 12;
        const color = COLORS_DARK[idx % COLORS_DARK.length];
        return (
          <span
            key={kw.word}
            className="inline-block cursor-pointer hover:opacity-80 transition-opacity"
            style={{ fontSize: size, color }}
            title={`${kw.count} mentions`}
          >
            {kw.word}
          </span>
        );
      })}
    </div>
  );
}
