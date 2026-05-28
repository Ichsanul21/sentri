import type { HTMLAttributes } from "react";

type BadgeVariant = "sentiment-positive" | "sentiment-neutral" | "sentiment-negative"
  | "severity-critical" | "severity-high" | "severity-medium" | "severity-low"
  | "default" | "lime" | "warning";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  "sentiment-positive": "bg-sentiment-positive/15 text-sentiment-positive",
  "sentiment-neutral": "bg-sentiment-neutral/15 text-sentiment-neutral",
  "sentiment-negative": "bg-sentiment-negative/15 text-sentiment-negative",
  "severity-critical": "bg-severity-critical/20 text-severity-critical",
  "severity-high": "bg-severity-high/20 text-severity-high",
  "severity-medium": "bg-severity-medium/20 text-severity-medium",
  "severity-low": "bg-severity-low/20 text-severity-low",
  default: "bg-accent-violet-mid/30 text-on-dark-muted",
  lime: "bg-accent-lime text-ink-deep",
  warning: "bg-yellow-400/15 text-yellow-400",
};

export function Badge({ variant = "default", dot = false, className = "", children, ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold leading-[1.8] tracking-[0.25px] transition-all duration-200 hover:scale-105 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full currentColor" />}
      {children}
    </span>
  );
}
