"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Eye } from "lucide-react";

interface AlertCardProps {
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  summary: string;
  timestamp: string;
  negativeCount: number;
  totalCount: number;
  negativePct: number;
  status: "new" | "acknowledged" | "resolved" | "investigating";
}

const severityConfig = {
  critical: { badge: "severity-critical" as const, icon: AlertTriangle, pulse: true },
  high: { badge: "severity-high" as const, icon: AlertTriangle, pulse: false },
  medium: { badge: "severity-medium" as const, icon: AlertTriangle, pulse: false },
  low: { badge: "severity-low" as const, icon: Eye, pulse: false },
};

export function AlertCard({ severity, title, summary, timestamp, negativeCount, totalCount, negativePct, status }: AlertCardProps) {
  const cfg = severityConfig[severity];
  const Icon = cfg.icon;

  return (
    <div className={`p-6 rounded-lg border transition-all ${
      status === "resolved" ? "opacity-40" : status === "acknowledged" ? "opacity-70" : ""
    } ${
      severity === "critical" ? "border-severity-critical/30 bg-severity-critical/5" :
      severity === "high" ? "border-severity-high/20 bg-severity-high/5" :
      "border-hairline-violet bg-surface-night"
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {cfg.pulse ? (
            <div className="relative">
              <Icon size={20} className="text-severity-critical" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-severity-critical animate-pulse-dot" />
            </div>
          ) : <Icon size={20} className="text-severity-critical" />}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[20px] font-semibold leading-[1.25]">{title}</h3>
              <Badge variant={severityConfig[severity].badge}>{severity.toUpperCase()}</Badge>
              {status !== "new" && (
                <Badge variant="default">{status}</Badge>
              )}
            </div>
            <p className="text-[14px] text-on-dark-muted leading-[1.43]">{summary}</p>
          </div>
        </div>
        <span className="text-[14px] text-on-dark-muted whitespace-nowrap">{timestamp}</span>
      </div>

      <div className="flex items-center gap-6 mb-4">
        <div className="text-center">
          <div className="text-[24px] font-semibold leading-[1.25] text-sentiment-negative">{negativeCount}</div>
          <div className="text-[12px] text-on-dark-muted">Negative</div>
        </div>
        <div className="text-center">
          <div className="text-[24px] font-semibold leading-[1.25]">{totalCount}</div>
          <div className="text-[12px] text-on-dark-muted">Total</div>
        </div>
        <div className="text-center">
          <div className="text-[24px] font-semibold leading-[1.25] text-severity-critical">{negativePct}%</div>
          <div className="text-[12px] text-on-dark-muted">Negative %</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">View Source Timeline</Button>
        {status === "new" && (
          <Button variant="danger" size="sm"><CheckCircle size={14} /> Acknowledge</Button>
        )}
        <button className="text-[14px] leading-[1.43] text-on-dark-muted hover:text-on-primary ml-auto">Dismiss</button>
      </div>
    </div>
  );
}
