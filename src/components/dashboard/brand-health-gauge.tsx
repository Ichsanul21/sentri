"use client";

interface GaugeProps {
  score: number;
  size?: "default" | "compact";
  label?: string;
}

export function BrandHealthGauge({ score, size = "default", label = "Brand Health" }: GaugeProps) {
  const radius = size === "compact" ? 50 : 80;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * Math.PI;
  const progress = Math.min(Math.max(score, 0), 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const color = progress >= 70 ? "#c2ef4e" : progress >= 40 ? "#8b8b9e" : "#e8594c";

  return (
    <div className={`flex flex-col items-center ${size === "compact" ? "gap-1" : "gap-2"}`}>
      <svg width={radius * 2} height={radius + 20} className="transform -rotate-90">
        <path
          d={`M ${strokeWidth / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth / 2} ${radius}`}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d={`M ${strokeWidth / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth / 2} ${radius}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className={`absolute flex flex-col items-center justify-center ${size === "compact" ? "mt-4" : "mt-6"}`}
        style={{ width: radius * 2, height: radius }}
      >
        <span className={`font-bold leading-[1.1] ${size === "compact" ? "text-[30px]" : "text-[60px]"}`}
          style={{ color }}
        >
          {progress}
        </span>
        <span className="text-[14px] leading-[1.43] text-on-dark-muted">{label}</span>
      </div>
    </div>
  );
}
