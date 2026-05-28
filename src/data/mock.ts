export interface VolumePoint {
  time: string;
  mentions: number;
}

export interface EmotionPoint {
  emotion: string;
  count: number;
}

export interface KeywordItem {
  word: string;
  count: number;
}

export interface CompetitorRow {
  metric: string;
  values: { brand: string; value: string | number }[];
}

export interface MentionItem {
  author: { name: string; handle: string };
  platform: string;
  content: string;
  timestamp: string;
  sentiment: "positive" | "neutral" | "negative";
  confidence: number;
  likes: number;
  comments: number;
  shares: number;
  new?: boolean;
}

export const volumeData: VolumePoint[] = [
  { time: "00:00", mentions: 42 },
  { time: "04:00", mentions: 28 },
  { time: "08:00", mentions: 85 },
  { time: "10:00", mentions: 120 },
  { time: "12:00", mentions: 95 },
  { time: "14:00", mentions: 140 },
  { time: "16:00", mentions: 200 },
  { time: "18:00", mentions: 175 },
  { time: "20:00", mentions: 130 },
  { time: "22:00", mentions: 78 },
];

export const emotionData: EmotionPoint[] = [
  { emotion: "Joy", count: 245 },
  { emotion: "Enthusiasm", count: 180 },
  { emotion: "Trust", count: 120 },
  { emotion: "Anticipation", count: 75 },
  { emotion: "Fear", count: 32 },
  { emotion: "Disappointment", count: 28 },
  { emotion: "Anger", count: 15 },
  { emotion: "Surprise", count: 8 },
];

export const keywords: KeywordItem[] = [
  { word: "Sentri", count: 320 },
  { word: "analytics", count: 215 },
  { word: "dashboard", count: 180 },
  { word: "AI", count: 145 },
  { word: "real-time", count: 120 },
  { word: "crisis", count: 98 },
  { word: "sentiment", count: 85 },
  { word: "brand", count: 72 },
  { word: "monitoring", count: 65 },
  { word: "insights", count: 58 },
  { word: "report", count: 45 },
  { word: "alert", count: 40 },
];

export const competitorRows: CompetitorRow[] = [
  {
    metric: "Share of Voice",
    values: [
      { brand: "Sentri", value: "35%" },
      { brand: "BrandWatch", value: "28%" },
      { brand: "SocialPulse", value: "22%" },
      { brand: "TrendScope", value: "15%" },
    ],
  },
  {
    metric: "Sentiment Positif",
    values: [
      { brand: "Sentri", value: "72%" },
      { brand: "BrandWatch", value: "65%" },
      { brand: "SocialPulse", value: "58%" },
      { brand: "TrendScope", value: "80%" },
    ],
  },
  {
    metric: "Avg Engagement",
    values: [
      { brand: "Sentri", value: 245 },
      { brand: "BrandWatch", value: 189 },
      { brand: "SocialPulse", value: 312 },
      { brand: "TrendScope", value: 156 },
    ],
  },
  {
    metric: "Mention Volume",
    values: [
      { brand: "Sentri", value: "12.4K" },
      { brand: "BrandWatch", value: "9.8K" },
      { brand: "SocialPulse", value: "7.6K" },
      { brand: "TrendScope", value: "5.2K" },
    ],
  },
];

export const mentions: MentionItem[] = [
  {
    author: { name: "Alice", handle: "@alice" },
    platform: "Twitter",
    content: "Sentri dashboard is amazing! The real-time sentiment tracking is incredibly useful for our team.",
    timestamp: "2h ago",
    sentiment: "positive",
    confidence: 94,
    likes: 24,
    comments: 5,
    shares: 12,
  },
  {
    author: { name: "Bob", handle: "@bob" },
    platform: "Instagram",
    content: "Just tried Sentri analytics — the competitor benchmarking is a game changer 🔥",
    timestamp: "4h ago",
    sentiment: "positive",
    confidence: 91,
    likes: 56,
    comments: 8,
    shares: 23,
  },
  {
    author: { name: "Charlie", handle: "@charlie" },
    platform: "Twitter",
    content: "Why is Sentri down again? This is the third time this week. Really frustrating when you rely on it for daily reporting.",
    timestamp: "1h ago",
    sentiment: "negative",
    confidence: 98,
    likes: 12,
    comments: 3,
    shares: 8,
    new: true,
  },
  {
    author: { name: "Diana", handle: "@diana" },
    platform: "TikTok",
    content: "Check out this Sentri tutorial I made — learn how to track brand mentions in under 5 minutes!",
    timestamp: "6h ago",
    sentiment: "positive",
    confidence: 87,
    likes: 234,
    comments: 45,
    shares: 156,
  },
  {
    author: { name: "Eve", handle: "@eve" },
    platform: "Facebook",
    content: "Comparing Sentri vs BrandWatch — Sentri wins on UI but BrandWatch has better data sources. Depends on your needs.",
    timestamp: "8h ago",
    sentiment: "neutral",
    confidence: 76,
    likes: 18,
    comments: 7,
    shares: 5,
  },
];

export const crisisAlerts = [
  { severity: "critical" as const, title: "Sentimen Spike", summary: "Negatif 340% dalam 1 jam terakhir", timestamp: "2 min ago", negativeCount: 245, totalCount: 823, negativePct: 29.8, status: "new" as const },
  { severity: "high" as const, title: "Velocity Surge", summary: "120 mentions/minute — potential viral", timestamp: "15 min ago", negativeCount: 89, totalCount: 612, negativePct: 14.5, status: "new" as const },
  { severity: "medium" as const, title: "Keyword Anomaly", summary: "Kata 'mahal' muncul 300% lebih sering", timestamp: "1h ago", negativeCount: 45, totalCount: 234, negativePct: 19.2, status: "acknowledged" as const },
  { severity: "low" as const, title: "Competitor Activity", summary: "BrandWatch rilis fitur baru", timestamp: "3h ago", negativeCount: 12, totalCount: 89, negativePct: 13.5, status: "resolved" as const },
];

export const timelineEvents = [
  { time: "08:45", content: "@user1: Sentri is a complete disaster right now", engagement: 2, isSeed: false },
  { time: "08:52", content: "@user2: Anyone else experiencing Sentri downtime?", engagement: 45, isSeed: false },
  { time: "09:10", content: "@viral: Sentri DOWN again! Third time this week! Unacceptable.", engagement: 5230, isSeed: true },
  { time: "09:30", content: "Crisis alert triggered 🔴", engagement: 0, isSeed: false },
];

export const defaultCompetitors = [
  { name: "BrandWatch", handles: { twitter: "@brandwatch", instagram: "@brandwatch" } },
  { name: "SocialPulse", handles: { twitter: "@socialpulse", instagram: "@socialpulse" } },
];
