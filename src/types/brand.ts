export interface Brand {
  id: string;
  brandName: string;
  logo?: string;
  tagline?: string;
  colors: BrandColors;
  industry: string;
  targetDemographic: TargetDemographic;
  brandPersonality?: string[];
}

export interface BrandColors {
  primary: string;
  secondary?: string;
  accent?: string;
}

export interface TargetDemographic {
  ageRange: string;
  location: string;
  gender: string;
  interests: string[];
}

import type { CommunicationStyle, Platform, SentimentLabel } from ".";

export interface ToneVoiceMatrix {
  brandId: string;
  communicationStyle: CommunicationStyle[];
  bannedWords: string[];
  preferredWords: string[];
  toneRules?: ToneRule;
}

export interface ToneRule {
  maxEmoji?: number;
  minSentenceLength?: number;
}

export interface Competitor {
  id: string;
  name: string;
  handles: Partial<Record<Platform, string>>;
  website?: string;
}

export interface KeywordTracker {
  id: string;
  keywords: string[];
  hashtags: string[];
  productNames: string[];
  campaignHashtags: string[];
}

export interface BrandAssociation {
  brandId: string;
  adjective: string;
  frequency: number;
  sentimentContext: SentimentLabel;
  lastMentionedAt: Date;
  trending: boolean;
}

export interface BrandDnaFormData {
  brandName: string;
  logo?: File;
  tagline?: string;
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
  industry: string;
  targetDemographic: TargetDemographic;
  brandPersonality?: string[];
}
