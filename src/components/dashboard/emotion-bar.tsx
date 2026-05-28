"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";

const COLORS = ["#c2ef4e", "#fa7faa", "#6a5fc1", "#e8594c", "#d97706", "#ea580c"];

interface EmotionBarProps {
  data: { emotion: string; count: number }[];
}

export function EmotionBarChart({ data }: EmotionBarProps) {
  if (!data.length) {
    return <div className="flex items-center justify-center h-40 text-on-dark-muted text-[14px]">No emotion data</div>;
  }
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ left: 80, top: 10, bottom: 10 }}>
        <XAxis type="number" hide />
        <YAxis
          dataKey="emotion"
          type="category"
          stroke="rgba(255,255,255,0.25)"
          tick={{ fontSize: 13, fill: "rgba(255,255,255,0.7)" }}
          tickLine={false}
          axisLine={false}
          width={75}
        />
        <Tooltip
          contentStyle={{
            background: "#150f23",
            border: "1px solid #362d59",
            borderRadius: 6,
            color: "#ffffff",
            fontSize: 13,
          }}
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={18}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
