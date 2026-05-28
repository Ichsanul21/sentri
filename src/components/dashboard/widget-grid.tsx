"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { WidgetDefinition, WidgetType } from "@/types/dashboard";

interface WidgetGridProps {
  widgets: WidgetDefinition[];
  editMode: boolean;
  onToggleWidget: (id: string) => void;
  onAddWidget: (type: WidgetType, title: string) => void;
  children: React.ReactNode;
}

const WIDGET_TYPES: { type: WidgetType; title: string; desc: string }[] = [
  { type: "brand_health_gauge", title: "Brand Health Score", desc: "Composite brand health gauge" },
  { type: "volume_chart", title: "Volume Trend", desc: "Time-series mention volume" },
  { type: "sentiment_donut", title: "Sentiment Distribution", desc: "Pos/Neu/Neg breakdown" },
  { type: "emotion_bar", title: "Emotion Distribution", desc: "Secondary emotion analysis" },
  { type: "competitor_matrix", title: "Competitor Benchmarking", desc: "Brand vs competitor metrics" },
  { type: "keyword_cloud", title: "Keyword Trending", desc: "Top mentioned keywords" },
  { type: "top_mentions", title: "Top Mentions", desc: "Highest engagement mentions" },
  { type: "alert_status", title: "Alert Status", desc: "Active crisis alerts" },
];

export function WidgetGrid({ widgets,   editMode,
  onAddWidget, children }: WidgetGridProps) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div>
      {editMode && (
        <div className="flex items-center justify-between mb-4 p-2 rounded bg-surface-night border border-hairline-violet">
          <span className="text-[14px] text-accent-lime font-medium">Edit mode — drag to rearrange</span>
          <button
            onClick={() => setPickerOpen(true)}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-on-dark-faint text-on-primary text-[14px] font-medium leading-[1.29] uppercase tracking-[0.2px] hover:bg-on-dark-muted transition-all"
          >
            <Plus size={14} /> Add Widget
          </button>
        </div>
      )}

      <div className="space-y-4">{children}</div>

      {pickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setPickerOpen(false)} />
          <div className="relative bg-surface-night border border-hairline-violet rounded-xl p-6 max-w-lg w-full mx-4">
            <h3 className="text-[20px] font-semibold leading-[1.25] mb-4">Add Widget</h3>
            <div className="grid grid-cols-1 gap-2">
              {WIDGET_TYPES.map((w) => {
                const exists = widgets.some((x) => x.type === w.type && x.visible);
                return (
                  <button
                    key={w.type}
                    onClick={() => {
                      if (!exists) onAddWidget(w.type, w.title);
                      setPickerOpen(false);
                    }}
                    disabled={exists}
                    className={`flex items-center gap-3 p-3 rounded text-left transition-colors ${
                      exists ? "opacity-40 cursor-not-allowed" : "hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex-1">
                      <span className="text-[16px] font-semibold leading-[1.5]">{w.title}</span>
                      <p className="text-[14px] leading-[1.43] text-on-dark-muted">{w.desc}</p>
                    </div>
                    {exists && <span className="text-[12px] text-on-dark-muted">Added</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
