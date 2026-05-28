"use client";

import { WidgetCard } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface GeoPoint {
  lat: number;
  lng: number;
  label: string;
  count: number;
}

interface GeoMapProps {
  data?: GeoPoint[];
  title?: string;
}

const defaultData: GeoPoint[] = [
  { lat: 40.7128, lng: -74.006, label: "New York", count: 1240 },
  { lat: 34.0522, lng: -118.2437, label: "Los Angeles", count: 980 },
  { lat: 51.5074, lng: -0.1278, label: "London", count: 760 },
  { lat: 48.8566, lng: 2.3522, label: "Paris", count: 540 },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo", count: 420 },
  { lat: -33.8688, lng: 151.2093, label: "Sydney", count: 310 },
  { lat: 55.7558, lng: 37.6173, label: "Moscow", count: 280 },
  { lat: 19.076, lng: 72.8777, label: "Mumbai", count: 450 },
];

const gridCols = 20;
const gridRows = 10;
const grid: boolean[][] = Array.from({ length: gridRows }, () =>
  Array.from({ length: gridCols }, () => Math.random() > 0.7)
);

export function GeoMap({ data = defaultData, title = "Geographic Distribution" }: GeoMapProps) {
  return (
    <WidgetCard title={title}>
      <div className="relative w-full h-[300px] rounded-lg bg-gradient-to-br from-accent-violet-deep/20 to-accent-violet-mid/10 border border-hairline-violet flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-20 gap-[1px] opacity-30">
            {grid.flat().map((cell, i) => (
              <div key={i} className={`w-3 h-2 rounded-sm ${cell ? "bg-accent-lime" : "bg-transparent"}`} />
            ))}
          </div>
        </div>
        {data.map((point, i) => (
          <div
            key={i}
            className="absolute flex flex-col items-center gap-1 group cursor-pointer"
            style={{
              left: `${((point.lng + 180) / 360) * 100}%`,
              top: `${((90 - point.lat) / 180) * 100}%`,
            }}
          >
            <div className="w-2 h-2 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(194,239,78,0.6)] group-hover:scale-150 transition-transform" />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-ink-deep border border-hairline-violet px-2 py-1 rounded text-[11px] whitespace-nowrap z-10">
              <span className="font-medium">{point.label}</span>
              <span className="text-on-dark-muted ml-1">{point.count.toLocaleString()}</span>
            </div>
          </div>
        ))}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] text-on-dark-muted">
          <MapPin size={10} /> {data.length} regions
        </div>
      </div>
    </WidgetCard>
  );
}
