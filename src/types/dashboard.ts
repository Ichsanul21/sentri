export interface WidgetDefinition {
  id: string;
  type: WidgetType;
  title: string;
  gridPosition: GridPosition;
  visible: boolean;
}

export type WidgetType =
  | "brand_health_gauge"
  | "volume_chart"
  | "sentiment_donut"
  | "emotion_bar"
  | "competitor_matrix"
  | "keyword_cloud"
  | "top_mentions"
  | "alert_status"
  | "kpi_metric";

export interface GridPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DashboardConfig {
  brandId: string;
  widgets: WidgetDefinition[];
  layout: GridPosition[];
  lastSaved?: Date;
}

export interface DateRange {
  from: Date;
  to: Date;
  preset?: DatePreset;
}

export type DatePreset = "24h" | "7d" | "30d" | "90d" | "1y" | "custom";

export interface KpiMetricData {
  label: string;
  value: string;
  delta?: {
    value: string;
    positive: boolean;
  };
}

export interface CompetitorBenchmarkRow {
  metric: string;
  values: { brand: string; value: string | number }[];
}

export interface GeospatialDataPoint {
  city: string;
  region: string;
  positiveCount: number;
  negativeCount: number;
  total: number;
  lat: number;
  lng: number;
}
