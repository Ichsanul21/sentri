import type { UserRole } from ".";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  brandId?: string;
  status: "active" | "invited" | "disabled";
  lastLogin?: Date;
  createdAt: Date;
}

export interface InviteRequest {
  email: string;
  name: string;
  role: UserRole;
}

export interface BillingPlan {
  tier: "free" | "pro" | "enterprise";
  price: number;
  brands: number | "unlimited";
  monthlyMentions: number | "unlimited";
  platforms: number | "all";
  dataHistory: string;
  aiAnalytics: string;
  ews: boolean;
  exportFormats: string[];
  apiAccess: boolean;
  support: string;
}

export interface Subscription {
  id: string;
  tenantId: string;
  plan: BillingPlan["tier"];
  status: "active" | "past_due" | "canceled" | "expired";
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export interface ApiKey {
  id: string;
  tenantId: string;
  name: string;
  keyPrefix: string;
  environment: "production" | "testing";
  createdAt: Date;
  lastUsedAt?: Date;
  expiresAt?: Date;
  status: "active" | "revoked";
}

export interface SystemSetting {
  key: string;
  value: string;
  type: "string" | "number" | "boolean" | "json";
  description?: string;
}
