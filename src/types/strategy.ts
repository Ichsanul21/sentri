import type { Platform, SeverityLevel, ContentType } from ".";
import type { TargetDemographic } from "./brand";

export interface ToneCheckRequest {
  brandId: string;
  text: string;
  targetPlatform: Platform;
}

export interface ToneCheckResult {
  toneScore: number;
  isAligned: boolean;
  issues: ToneIssue[];
  suggestions: string[];
  platformFit: Partial<Record<Platform, boolean>>;
}

export interface ToneIssue {
  type: "banned_word" | "tone_mismatch" | "platform_mismatch";
  severity: SeverityLevel;
  message: string;
  suggestion: string;
}

export interface CampaignRecommendation {
  recommendedContentTypes: ContentTypeRecommendation[];
  bestPostingTimes: PostingTime[];
  hashtagSuggestions: string[];
  contentGaps: string[];
}

export interface ContentTypeRecommendation {
  type: ContentType;
  reason: string;
  expectedEngagement: string;
}

export interface PostingTime {
  day: string;
  time: string;
  platform: Platform;
}

export interface PersonaMatchResult {
  actualAudience: AudienceData;
  targetAudience: TargetDemographic;
  alignmentScore: number;
  gaps: PersonaGap[];
}

export interface AudienceData {
  ageDistribution: Record<string, number>;
  genderSplit: { male: number; female: number; other: number };
  topLocations: { city: string; percentage: number }[];
  topInterests: { interest: string; percentage: number }[];
}

export interface PersonaGap {
  dimension: string;
  expected: string;
  actual: string;
  actionItem: string;
}
