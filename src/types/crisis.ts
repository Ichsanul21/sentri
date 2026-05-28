import type { SeverityLevel, AlertStatus } from ".";

export interface CrisisAlert {
  id: string;
  brandId: string;
  severity: SeverityLevel;
  title: string;
  summary: string;
  timestamp: string;
  metrics: CrisisMetrics;
  topMentions: TopMention[];
  status: AlertStatus;
  generatedAt: Date;
  actionUrl: string;
}

export interface CrisisMetrics {
  negativeMentions: number;
  totalMentions: number;
  negativePercentage: number;
  topSource: string;
}

export interface TopMention {
  content: string;
  platform: string;
  engagement: number;
  url: string;
}

export interface AnomalyDetectionConfig {
  brandId: string;
  volumeWindowMinutes: number;
  volumeThresholdMultiplier: number;
  negativeSentimentThreshold: number;
  sentimentWindowMinutes: number;
  mentionVelocityThreshold: number;
  velocityWindowMinutes: number;
}

export interface AnomalyEvent {
  id: string;
  brandId: string;
  type: "volume_spike" | "sentiment_shift" | "velocity_surge";
  severity: SeverityLevel;
  triggeredAt: Date;
  metrics: AnomalyMetrics;
  affectedMentionIds: string[];
  status: AlertStatus;
}

export interface AnomalyMetrics {
  currentValue: number;
  baselineValue: number;
  deviation: number;
}

export interface TimelineEvent {
  time: string;
  content: string;
  engagement: number;
  isSeed: boolean;
}

export interface AutoResponseDraft {
  id: string;
  type: "press_release" | "social_reply" | "dm_template";
  content: string;
  aiConfidence: number;
  feedback?: "up" | "down";
  regenerations: number;
  maxRegenerations: number;
}
