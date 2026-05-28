"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, MessageSquare, Send, RefreshCw } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export default function CrisisTriagePage() {
  const { crises } = useApp();
  const activeCrises = crises.filter((c) => c.status !== "resolved");

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Crisis", href: "/dashboard/crisis" }, { label: "Triage" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Crisis Triage</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Review and prioritize active crises for immediate response</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeCrises.map((crisis) => (
          <WidgetCard key={crisis.id} className={`border-l-4 ${
            crisis.severity === "critical" ? "border-l-severity-critical" :
            crisis.severity === "high" ? "border-l-severity-high" :
            crisis.severity === "medium" ? "border-l-severity-medium" :
            "border-l-severity-low"
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle size={20} className={
                  crisis.severity === "critical" ? "text-severity-critical" :
                  crisis.severity === "high" ? "text-severity-high" :
                  crisis.severity === "medium" ? "text-severity-medium" :
                  "text-severity-low"
                } />
                <span className="text-[16px] font-semibold">{crisis.title}</span>
              </div>
              <Badge variant={`severity-${crisis.severity}`}>{crisis.severity}</Badge>
            </div>
            
            <p className="text-[14px] text-on-dark-muted mb-4">{crisis.summary}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-on-dark-muted">Platform</span>
                <span className="font-medium">{crisis.platform}</span>
              </div>
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-on-dark-muted">Mentions</span>
                <span className="font-medium">{crisis.mentions.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-on-dark-muted">Started</span>
                <span className="font-medium">{crisis.started}</span>
              </div>
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-on-dark-muted">Status</span>
                <Badge variant={`sentiment-${crisis.status === "new" ? "negative" : crisis.status === "acknowledged" ? "neutral" : "positive"}`}>
                  {crisis.status}
                </Badge>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-accent-lime text-ink-deep text-[13px] font-semibold hover:opacity-90 transition-opacity">
                <MessageSquare size={14} /> View Details
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-surface-night border border-hairline-violet text-on-primary text-[13px] hover:bg-accent-violet-mid/20 transition-colors">
                <Send size={14} /> Respond
              </button>
            </div>
          </WidgetCard>
        ))}
        
        {activeCrises.length === 0 && (
          <WidgetCard className="col-span-full py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-sentiment-positive/10 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} className="text-sentiment-positive" />
            </div>
            <h3 className="text-[20px] font-semibold mb-2">No Active Crises</h3>
            <p className="text-on-dark-muted">All systems operating normally. No immediate action required.</p>
          </WidgetCard>
        )}
      </div>
    </div>
  );
}
