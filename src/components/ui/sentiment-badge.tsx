import type { SentimentLabel } from "@/types";

interface SentimentBadgeProps {
  sentiment: SentimentLabel;
  confidence?: number;
  className?: string;
}

const styles: Record<SentimentLabel, { bg: string; text: string }> = {
  positive: { bg: "bg-sentiment-positive/15", text: "text-sentiment-positive" },
  neutral: { bg: "bg-sentiment-neutral/15", text: "text-sentiment-neutral" },
  negative: { bg: "bg-sentiment-negative/15", text: "text-sentiment-negative" },
};

const labels: Record<SentimentLabel, string> = {
  positive: "Positive",
  neutral: "Neutral",
  negative: "Negative",
};

export function SentimentBadge({ sentiment, confidence, className = "" }: SentimentBadgeProps) {
  const s = styles[sentiment];
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold leading-[1.8] ${s.bg} ${s.text} ${className}`}>
      {labels[sentiment]}
      {confidence !== undefined && (
        <span className="opacity-70 ml-0.5">({confidence}%)</span>
      )}
    </span>
  );
}
