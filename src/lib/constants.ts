export const APP_NAME = "Sentri";
export const APP_TAGLINE = "Enterprise Brand Sentiment & Social Listening";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  VERIFY_EMAIL: "/verify-email",
  DASHBOARD: "/",
  BRAND: "/brand",
  BRAND_SETUP: "/brand/setup",
  BRAND_COMPETITORS: "/brand/competitors",
  BRAND_KEYWORDS: "/brand/keywords",
  BRAND_TONE_MATRIX: "/brand/tone-matrix",
  SENTIMENT: "/sentiment",
  SENTIMENT_ANALYSIS: "/sentiment/analysis",
  SENTIMENT_ASSOCIATIONS: "/sentiment/associations",
  SENTIMENT_MENTIONS: "/sentiment/mentions",
  CRISIS: "/crisis",
  CRISIS_ALERTS: "/crisis/alerts",
  CRISIS_TRIAGE: "/crisis/triage",
  CRISIS_AUTO_RESPONSE: "/crisis/auto-response",
  STRATEGY: "/strategy",
  STRATEGY_TONE_CHECKER: "/strategy/tone-checker",
  STRATEGY_CAMPAIGN_OPTIMIZER: "/strategy/campaign-optimizer",
  STRATEGY_PERSONA_MATCHER: "/strategy/persona-matcher",
  COMPETITOR_BENCHMARKING: "/dashboard/competitor-benchmarking",
  GEOSPATIAL: "/dashboard/geospatial",
  REPORTS: "/dashboard/reports",
  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_BILLING: "/admin/billing",
  ADMIN_API_KEYS: "/admin/api-keys",
  ADMIN_SETTINGS: "/admin/settings",
} as const;

export const PLATFORM_LABELS: Record<string, string> = {
  twitter: "X / Twitter",
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  google_reviews: "Google Reviews",
  news: "Portal Berita",
};

export const SENTIMENT_LABELS: Record<string, string> = {
  positive: "Positif",
  neutral: "Netral",
  negative: "Negatif",
};

export const TIER_LIMITS = {
  free: { brands: 1, mentions: 50, platforms: 1 },
  pro: { brands: 3, mentions: 5000, platforms: 3 },
  enterprise: { brands: Infinity, mentions: Infinity, platforms: Infinity },
} as const;

export const AUTO_REFRESH_INTERVALS = {
  realtime: 0,
  fast: 300_000,
  normal: 900_000,
  slow: 3_600_000,
} as const;
