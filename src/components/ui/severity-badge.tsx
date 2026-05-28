import type { SeverityLevel } from "@/types";

interface SeverityBadgeProps {
  severity: SeverityLevel;
  className?: string;
}

const config: Record<SeverityLevel, { bg: string; text: string; dot: string; pulse?: boolean }> = {
  critical: { bg: "bg-severity-critical/20", text: "text-severity-critical", dot: "bg-severity-critical", pulse: true },
  high: { bg: "bg-severity-high/20", text: "text-severity-high", dot: "bg-severity-high" },
  medium: { bg: "bg-severity-medium/20", text: "text-severity-medium", dot: "bg-severity-medium" },
  low: { bg: "bg-severity-low/20", text: "text-severity-low", dot: "bg-severity-low" },
};

export function SeverityBadge({ severity, className = "" }: SeverityBadgeProps) {
  const c = config[severity];
  return (
    <span className={`inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-[1.8] tracking-[0.15px] ${c.bg} ${c.text} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} ${c.pulse ? "animate-pulse-dot" : ""}`} />
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
}
