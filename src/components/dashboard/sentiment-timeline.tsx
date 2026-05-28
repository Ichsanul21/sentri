"use client";

import { volumeData } from "@/data/mock";

export function SentimentTimeline() {
  const maxVal = Math.max(...volumeData.map((d) => d.mentions));
  const points = volumeData.map((d, i) => {
    const x = (i / (volumeData.length - 1)) * 100;
    const y = ((maxVal - d.mentions) / maxVal) * 100;
    return `${x},${y}`;
  });
  const polyline = points.join(" ");

  return (
    <div className="relative w-full h-[200px]">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id="timeline-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c2ef4e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#c2ef4e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          fill="url(#timeline-grad)"
          stroke="none"
          points={`0,100 ${polyline} 100,100`}
        />
        <polyline
          fill="none"
          stroke="#c2ef4e"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={polyline}
          className="drop-shadow-[0_0_4px_rgba(194,239,78,0.3)]"
        />
        {volumeData.filter((_, idx) => idx % Math.ceil(volumeData.length / 6) === 0).map((d) => {
          const x = (volumeData.indexOf(d) / (volumeData.length - 1)) * 100;
          return (
            <g key={d.time}>
              <line x1={x} y1="0" x2={x} y2="100" stroke="#2a2440" strokeWidth="0.3" />
              <text x={x} y="105" textAnchor="middle" fill="#8b8b9e" fontSize="3.5">
                {d.time}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="absolute top-0 right-0 flex items-center gap-1 text-[11px] text-on-dark-muted">
        <span className="w-2 h-2 rounded-full bg-accent-lime" /> Volume
      </div>
    </div>
  );
}
