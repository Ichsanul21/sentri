"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KpiMetric } from "@/components/dashboard/kpi-metric";
import { AlertCard } from "@/components/crisis/alert-card";
import { CrisisBanner } from "@/components/crisis/crisis-banner";
import { SourceTimeline } from "@/components/crisis/source-timeline";
import { useApp } from "@/contexts/AppContext";
import { AlertTriangle } from "lucide-react";
import { timelineEvents } from "@/data/mock";

export default function CrisisPage() {
  const router = useRouter();
  const { crises } = useApp();
  const [activeTab, setActiveTab] = useState("Press Release");

  const activeAlerts = crises.filter((c) => c.status !== "resolved").length;

  return (
    <div className="space-y-6">
      <CrisisBanner />
      <Breadcrumbs items={[{ label: "Crisis Management" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Early Warning System</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Active crisis monitoring and response center</p>
        </div>
        <Badge variant={activeAlerts > 0 ? "severity-critical" : "sentiment-positive"} className="px-3 py-1 gap-2">
          <AlertTriangle size={14} />
          {activeAlerts > 0 ? `${activeAlerts} Active Alert${activeAlerts > 1 ? 's' : ''}` : "All Clear"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <WidgetCard><KpiMetric label="Active Alerts" value={String(activeAlerts)} /></WidgetCard>
        <WidgetCard><KpiMetric label="Total Mentions (24h)" value="12,450" /></WidgetCard>
        <WidgetCard><KpiMetric label="Negative %" value="29.8%" delta={{ value: "340%", positive: false }} /></WidgetCard>
        <WidgetCard><KpiMetric label="Response Time" value="2m" delta={{ value: "30s avg", positive: true }} /></WidgetCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {crises.slice(0, 4).map((alert) => (
          <AlertCard key={alert.id}
            severity={alert.severity}
            title={alert.title}
            summary={alert.summary}
            timestamp={alert.started}
            negativeCount={alert.mentions}
            totalCount={alert.mentions}
            negativePct={0}
            status={alert.status}
          />
        ))}
        {crises.length === 0 && (
          <div className="lg:col-span-2 text-center py-12 text-on-dark-muted">
            No alerts. System is clear.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WidgetCard title="Source Tracing Timeline">
          <SourceTimeline events={timelineEvents} />
        </WidgetCard>
        <WidgetCard title="Auto-Response Suggestions">
          <div className="space-y-4">
            <div className="flex gap-2 border-b border-hairline-violet/50 pb-2">
              {["Press Release", "Social Reply", "DM Template"].map((tab) => (
                <button key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-[14px] font-medium transition-all ${
                    tab === activeTab ? "text-accent-lime border-b-2 border-accent-lime" : "text-on-dark-muted"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-4 rounded-lg bg-ink-deep border border-hairline-violet">
              <button
                onClick={() => router.push("/dashboard/crisis/auto-response")}
                className="text-[16px] leading-[1.5] text-on-dark-muted hover:text-on-primary transition-colors text-left w-full"
              >
                We are aware of the recent service interruption affecting Sentri users. Our team is actively working to resolve the issue and restore full functionality. We apologize for the inconvenience and will provide updates as they become available.
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[14px] text-on-dark-muted">AI Confidence:</span>
                <span className="text-[14px] font-semibold text-accent-lime">87%</span>
                <button
                  onClick={() => router.push("/dashboard/crisis/auto-response")}
                  className="text-[14px] text-accent-lime hover:underline ml-2"
                >
                  Regenerate
                </button>
              </div>
              <div className="flex items-center gap-1 text-on-dark-muted">
                <button className="p-1 hover:text-accent-lime transition-colors">👍</button>
                <button className="p-1 hover:text-sentiment-negative transition-colors">👎</button>
              </div>
            </div>
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
