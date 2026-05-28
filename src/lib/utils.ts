export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function formatPercentage(p: number): string {
  return `${p.toFixed(1)}%`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function getSentimentColor(
  sentiment: "positive" | "neutral" | "negative",
): string {
  switch (sentiment) {
    case "positive": return "text-sentiment-positive";
    case "neutral": return "text-sentiment-neutral";
    case "negative": return "text-sentiment-negative";
  }
}

export function getSentimentBg(
  sentiment: "positive" | "neutral" | "negative",
): string {
  switch (sentiment) {
    case "positive": return "bg-sentiment-positive/15";
    case "neutral": return "bg-sentiment-neutral/15";
    case "negative": return "bg-sentiment-negative/15";
  }
}

export function getSeverityColor(severity: "low" | "medium" | "high" | "critical"): string {
  switch (severity) {
    case "critical": return "text-severity-critical";
    case "high": return "text-severity-high";
    case "medium": return "text-severity-medium";
    case "low": return "text-severity-low";
  }
}

export function getSeverityBg(severity: "low" | "medium" | "high" | "critical"): string {
  switch (severity) {
    case "critical": return "bg-severity-critical/20";
    case "high": return "bg-severity-high/20";
    case "medium": return "bg-severity-medium/20";
    case "low": return "bg-severity-low/20";
  }
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString();
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 1) + "\u2026";
}
