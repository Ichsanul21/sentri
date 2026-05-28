"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { KpiMetric } from "@/components/dashboard/kpi-metric";
import { Activity, Cpu, Clock, AlertTriangle, CheckCircle } from "lucide-react";

export default function AgentMetricsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Agents", href: "/admin/agents" }, { label: "Metrics" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Agent Metrics Dashboard</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Global aggregate metrics across all agents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <WidgetCard><KpiMetric label="Total Agents" value="15" /></WidgetCard>
        <WidgetCard><KpiMetric label="Active" value="12" delta={{ value: "80%", positive: true }} /></WidgetCard>
        <WidgetCard><KpiMetric label="Idle" value="2" delta={{ value: "13.3%", positive: false }} /></WidgetCard>
        <WidgetCard><KpiMetric label="Failed" value="1" delta={{ value: "6.7%", positive: false }} /></WidgetCard>
        <WidgetCard><KpiMetric label="Avg Queue Depth" value="31" delta={{ value: "8%", positive: false }} /></WidgetCard>
        <WidgetCard><KpiMetric label="Avg Response Time" value="245ms" delta={{ value: "12%", positive: true }} /></WidgetCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WidgetCard title={<><Activity size={16} className="text-accent-lime" /> Agent Health Distribution</>}>
          <div className="space-y-3">
            {[
              { label: "Crawler Agent", active: 4, idle: 0, failed: 0, total: 4 },
              { label: "NLP Processor", active: 4, idle: 1, failed: 1, total: 6 },
              { label: "EWS Connector", active: 1, idle: 1, failed: 0, total: 2 },
              { label: "Reporter Agent", active: 3, idle: 0, failed: 0, total: 3 },
            ].map((agent) => (
              <div key={agent.label} className="p-3 rounded bg-ink-deep border border-hairline-violet/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[16px] font-semibold">{agent.label}</span>
                  <span className="text-[14px] text-on-dark-muted">{agent.total} instances</span>
                </div>
                <div className="flex gap-2 text-[13px]">
                  <span className="flex items-center gap-1"><CheckCircle size={12} className="text-accent-lime" /> {agent.active} active</span>
                  <span className="flex items-center gap-1"><Clock size={12} className="text-warning" /> {agent.idle} idle</span>
                  <span className="flex items-center gap-1"><AlertTriangle size={12} className="text-sentiment-negative" /> {agent.failed} failed</span>
                </div>
                <div className="w-full bg-hairline-violet/30 rounded-full h-1.5 mt-2">
                  <div className="flex h-1.5 rounded-full overflow-hidden">
                    <div className="bg-accent-lime h-full" style={{ width: `${(agent.active / agent.total) * 100}%` }} />
                    <div className="bg-warning h-full" style={{ width: `${(agent.idle / agent.total) * 100}%` }} />
                    <div className="bg-sentiment-negative h-full" style={{ width: `${(agent.failed / agent.total) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>

        <WidgetCard title={<><Cpu size={16} className="text-accent-pink" /> Resource Utilization</>}>
          <div className="space-y-4">
            {[
              { label: "CPU", used: 47, total: 100, color: "bg-accent-lime" },
              { label: "Memory", used: 56, total: 100, color: "bg-accent-pink" },
              { label: "Disk I/O", used: 32, total: 100, color: "bg-accent-violet" },
              { label: "Network", used: 68, total: 100, color: "bg-accent-lime" },
            ].map((res) => (
              <div key={res.label}>
                <div className="flex justify-between text-[14px] mb-1">
                  <span className="text-on-dark-muted">{res.label}</span>
                  <span>{res.used}%</span>
                </div>
                <div className="w-full bg-hairline-violet/30 rounded-full h-2">
                  <div className={`${res.color} h-2 rounded-full`} style={{ width: `${res.used}%` }} />
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>

        <WidgetCard title="Recent Alerts" className="lg:col-span-2">
          <div className="space-y-2">
            {[
              { time: "2 min ago", msg: "NLP Processor queue depth exceeded 50", severity: "warning" as const },
              { time: "15 min ago", msg: "Crawler Agent instance crawler-03 restarted", severity: "info" as const },
              { time: "1 hour ago", msg: "Reporter Agent task T-4780 failed: timeout", severity: "error" as const },
              { time: "3 hours ago", msg: "EWS Connector heartbeat missed for 30s", severity: "warning" as const },
            ].map((alert, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded bg-ink-deep border border-hairline-violet/30">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.severity === "error" ? "bg-sentiment-negative" : alert.severity === "warning" ? "bg-warning" : "bg-accent-lime"
                  }`} />
                  <span className="text-[14px]">{alert.msg}</span>
                </div>
                <span className="text-[13px] text-on-dark-muted">{alert.time}</span>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
