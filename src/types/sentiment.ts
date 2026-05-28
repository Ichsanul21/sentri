import type { Platform, SentimentLabel, EmotionLabel, Author, Engagement, Location } from ".";

export interface SentimentMention {
  id: string;
  brandId: string;
  platform: Platform;
  platformPostId: string;
  author: Author;
  content: string;
  mediaUrls: string[];
  postUrl: string;
  postedAt: Date;
  engagement: Engagement;
  location?: Location;
  sentiment: SentimentAnalysis;
  brandAssociations: BrandAssociationRef[];
  visualScore?: number;
  isCrisis: boolean;
  crisisId?: string;
  createdAt: Date;
}

export interface SentimentAnalysis {
  primary: SentimentLabel;
  primaryScore: number;
  secondary: EmotionLabel;
  confidence: number;
}

export interface BrandAssociationRef {
  adjective: string;
  sentiment: SentimentLabel;
}

export interface VolumeDataPoint {
  time: string;
  mentions: number;
}

export interface EmotionDataPoint {
  emotion: EmotionLabel;
  count: number;
}

export interface SentimentDistribution {
  positive: number;
  neutral: number;
  negative: number;
}

export interface MentionFilter {
  sentiment?: SentimentLabel[];
  platforms?: Platform[];
  dateRange?: { from: Date; to: Date };
  keywords?: string[];
  sortBy?: "recent" | "engagement" | "sentiment";
}
