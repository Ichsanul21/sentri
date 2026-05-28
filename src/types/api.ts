export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: PaginationMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface ApiKeyCredentials {
  apiKey: string;
  environment: "production" | "testing";
}

export interface WebhookPayload {
  event: WebhookEvent;
  timestamp: string;
  signature: string;
  data: Record<string, unknown>;
}

export type WebhookEvent =
  | "mention.created"
  | "crisis.detected"
  | "crisis.resolved"
  | "report.generated"
  | "subscription.updated";
