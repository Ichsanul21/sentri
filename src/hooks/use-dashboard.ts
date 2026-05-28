"use client";

import { useState, useCallback } from "react";
import type {
  WidgetDefinition,
  GridPosition,
  WidgetType,
  DatePreset,
} from "@/types/dashboard";

const DEFAULT_WIDGETS: WidgetDefinition[] = [
  { id: "health", type: "brand_health_gauge", title: "Brand Health Score", gridPosition: { x: 0, y: 0, w: 1, h: 1 }, visible: true },
  { id: "volume", type: "volume_chart", title: "Volume Trend", gridPosition: { x: 0, y: 1, w: 2, h: 1 }, visible: true },
  { id: "sentiment", type: "sentiment_donut", title: "Sentiment Distribution", gridPosition: { x: 1, y: 0, w: 1, h: 1 }, visible: true },
  { id: "emotion", type: "emotion_bar", title: "Emotion Distribution", gridPosition: { x: 2, y: 0, w: 1, h: 1 }, visible: true },
  { id: "competitor", type: "competitor_matrix", title: "Competitor Benchmarking", gridPosition: { x: 0, y: 2, w: 3, h: 1 }, visible: true },
  { id: "keywords", type: "keyword_cloud", title: "Keywords Trending", gridPosition: { x: 2, y: 1, w: 1, h: 1 }, visible: true },
  { id: "alerts", type: "alert_status", title: "Alert Status", gridPosition: { x: 0, y: 0, w: 1, h: 1 }, visible: true },
];

export function useDashboard() {
  const [widgets, setWidgets] = useState(DEFAULT_WIDGETS);
  const [editMode, setEditMode] = useState(false);
  const [dateRange, setDateRange] = useState<DatePreset>("7d");

  const toggleEditMode = useCallback(() => setEditMode((v) => !v), []);

  const toggleWidget = useCallback((id: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, visible: !w.visible } : w)),
    );
  }, []);

  const moveWidget = useCallback((id: string, position: Partial<GridPosition>) => {
    setWidgets((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, gridPosition: { ...w.gridPosition, ...position } } : w,
      ),
    );
  }, []);

  const addWidget = useCallback((type: WidgetType, title: string) => {
    const id = `widget-${Date.now()}`;
    setWidgets((prev) => [
      ...prev,
      { id, type, title, gridPosition: { x: 0, y: 99, w: 1, h: 1 }, visible: true },
    ]);
  }, []);

  return {
    widgets,
    editMode,
    dateRange,
    toggleEditMode,
    toggleWidget,
    moveWidget,
    addWidget,
    setDateRange,
  };
}
