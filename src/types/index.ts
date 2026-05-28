export type SentimentLabel = "positive" | "neutral" | "negative";
export type EmotionLabel =
  | "Joy" | "Enthusiasm" | "Trust" | "Anticipation"
  | "Fear" | "Disappointment" | "Anger" | "Surprise";
export type SeverityLevel = "low" | "medium" | "high" | "critical";
export type AlertStatus = "new" | "acknowledged" | "investigating" | "resolved";
export type Platform =
  | "twitter" | "instagram" | "tiktok" | "facebook" | "google_reviews" | "news";
export type UserRole = "super_admin" | "manager" | "analyst" | "viewer";
export type CommunicationStyle =
  | "formal" | "casual" | "authoritative" | "energetic" | "humorous";
export type ContentType =
  | "educational" | "entertainment" | "promotional" | "behind_the_scenes";

export interface Author {
  username: string;
  displayName: string;
  followerCount: number;
}

export interface Engagement {
  likes: number;
  comments: number;
  shares: number;
  views: number;
}

export interface Location {
  city: string;
  region: string;
  country: string;
}
