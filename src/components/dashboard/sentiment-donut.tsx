"use client";

interface DonutProps {
  positive: number;
  neutral: number;
  negative: number;
}

export function SentimentDonut({ positive, neutral, negative }: DonutProps) {
  const total = positive + neutral + negative;
  const pPos = (positive / total) * 100;
  const pNeu = (neutral / total) * 100;
  const pNeg = (negative / total) * 100;

  const segments = [
    { value: pPos, color: "#c2ef4e", label: "Positive" },
    { value: pNeu, color: "#8b8b9e", label: "Neutral" },
    { value: pNeg, color: "#e8594c", label: "Negative" },
  ];

  const dominant = segments.reduce((a, b) => (a.value > b.value ? a : b));
  const radius = 60;
  const strokeWidth = 20;
  const r = radius - strokeWidth / 2;
  const circ = 2 * Math.PI * r;

  let cumulative = 0;
  const paths = segments.map((seg) => {
    const length = (seg.value / 100) * circ;
    const startOffset = circ - cumulative - length;
    const path = (
      <circle
        key={seg.label}
        cx={radius}
        cy={radius}
        r={r}
        fill="none"
        stroke={seg.color}
        strokeWidth={strokeWidth}
        strokeDasharray={`${length} ${circ}`}
        strokeDashoffset={startOffset}
        className="transition-all duration-700"
        transform="rotate(-90, 60, 60)"
      />
    );
    cumulative += length;
    return path;
  });

  return (
    <div className="flex flex-col items-center justify-center w-full py-2">
      <div className="relative">
        <svg width={radius * 2} height={radius * 2}>
          {paths}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[28px] font-bold leading-[1.25]">{Math.round(dominant.value)}%</span>
          <span className="text-[13px] leading-[1.43] text-on-dark-muted/80">{dominant.label}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-3">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-[13px] leading-[1.43] text-on-dark-muted/80">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
