"use client";

import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

const alerts = [
  { id: "1", severity: "high" as const, title: "Negative sentiment spike detected", mentions: 340, time: "15m ago", status: "active" as const },
  { id: "2", severity: "medium" as const, title: "Unusual mention volume increase", mentions: 120, time: "2h ago", status: "investigating" as const },
  { id: "3", severity: "low" as const, title: "Competitor product launch buzz", mentions: 45, time: "1d ago", status: "resolved" as const },
];

export default function BrandCrisisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold leading-[1.3]">Brand — Crisis Monitoring</h1>
        <p className="text-[14px] text-on-dark-muted mt-1">Real-time crisis detection and alerts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <WidgetCard>
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} className="text-red-400" />
            <div>
              <p className="text-[12px] text-on-dark-muted">Active Crises</p>
              <p className="text-[24px] font-bold">1</p>
            </div>
          </div>
        </WidgetCard>
        <WidgetCard>
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-yellow-400" />
            <div>
              <p className="text-[12px] text-on-dark-muted">Investigating</p>
              <p className="text-[24px] font-bold">1</p>
            </div>
          </div>
        </WidgetCard>
        <WidgetCard>
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-accent-lime" />
            <div>
              <p className="text-[12px] text-on-dark-muted">Resolved (24h)</p>
              <p className="text-[24px] font-bold">3</p>
            </div>
          </div>
        </WidgetCard>
      </div>

      <WidgetCard title="Recent Alerts">
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border border-hairline-violet bg-ink-deep/30">
              <span className={`w-2 h-2 mt-2 rounded-full shrink-0 ${
                alert.severity === "high" ? "bg-red-400" :
                alert.severity === "medium" ? "bg-yellow-400" : "bg-blue-400"
              }`} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[14px]">{alert.title}</span>
                  <Badge variant={alert.status === "active" ? "lime" : "default"}>
                    {alert.status}
                  </Badge>
                </div>
                <p className="text-[12px] text-on-dark-muted mt-1">{alert.mentions} mentions · {alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </WidgetCard>
    </div>
  );
}
