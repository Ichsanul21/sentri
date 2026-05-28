"use client";

import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";

interface VolumeChartProps {
  data: { time: string; mentions: number }[];
}

export function VolumeChart({ data }: VolumeChartProps) {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-48 text-on-dark-muted text-[14px] leading-[1.43]">
        No mentions in this period
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorMentions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#c2ef4e" stopOpacity={0.12} />
            <stop offset="95%" stopColor="#c2ef4e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          stroke="rgba(255,255,255,0.25)"
          tick={{ fontSize: 10, fill: "rgba(255,255,255,0.25)" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="rgba(255,255,255,0.25)"
          tick={{ fontSize: 10, fill: "rgba(255,255,255,0.25)" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "#150f23",
            border: "1px solid #362d59",
            borderRadius: 6,
            color: "#ffffff",
            fontSize: 14,
          }}
        />
        <Area type="monotone" dataKey="mentions" stroke="#c2ef4e" strokeWidth={2} fill="url(#colorMentions)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
