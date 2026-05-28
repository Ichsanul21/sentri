"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Server, Database, Activity, HardDrive, Search } from "lucide-react";

interface Service {
  name: string;
  status: "healthy" | "degraded" | "down";
  icon: React.ReactNode;
  uptime: string;
  responseTime: string;
  version: string;
}

const services: Service[] = [
  { name: "API Server", status: "healthy", icon: <Server size={20} />, uptime: "99.97%", responseTime: "45ms", version: "3.1.2" },
  { name: "PostgreSQL Database", status: "healthy", icon: <Database size={20} />, uptime: "99.99%", responseTime: "12ms", version: "15.4" },
  { name: "Redis Cache", status: "healthy", icon: <HardDrive size={20} />, uptime: "100%", responseTime: "2ms", version: "7.2" },
  { name: "Message Queue (RabbitMQ)", status: "degraded", icon: <Activity size={20} />, uptime: "99.85%", responseTime: "24ms", version: "3.12" },
  { name: "Elasticsearch", status: "healthy", icon: <Search size={20} />, uptime: "99.95%", responseTime: "18ms", version: "8.11" },
];

const statusDot = { healthy: "bg-accent-lime", degraded: "bg-warning", down: "bg-sentiment-negative" } as const;
const statusBadge = { healthy: "sentiment-positive" as const, degraded: "warning" as const, down: "sentiment-negative" as const };

export default function SystemHealthPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Monitoring", href: "/admin/monitoring" }, { label: "System Health" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">System Health</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Infrastructure status and service monitoring</p>
        </div>
        <Button variant="violet-token" size="sm"><RefreshCw size={14} /> Refresh All</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {services.map((svc) => (
          <WidgetCard key={svc.name}>
            <div className="flex flex-col items-center text-center py-4">
              <div className={`${statusDot[svc.status]} w-4 h-4 rounded-full mb-3`} />
              <div className="text-on-dark-muted mb-2">{svc.icon}</div>
              <h3 className="text-[16px] font-semibold mb-1">{svc.name}</h3>
              <Badge variant={statusBadge[svc.status]}>{svc.status}</Badge>
              <div className="mt-3 w-full space-y-1 text-[13px] text-on-dark-muted">
                <div className="flex justify-between"><span>Uptime</span><span className="text-on-primary">{svc.uptime}</span></div>
                <div className="flex justify-between"><span>Response</span><span className="text-on-primary">{svc.responseTime}</span></div>
                <div className="flex justify-between"><span>Version</span><span className="text-on-primary">{svc.version}</span></div>
              </div>
            </div>
          </WidgetCard>
        ))}
      </div>

      <WidgetCard title="Incident Timeline">
        <div className="space-y-3">
          {[
            { time: "2026-05-28 03:15", service: "Message Queue", event: "Queue backlog cleared,恢复正常", severity: "resolved" as const },
            { time: "2026-05-28 02:00", service: "Message Queue", event: "Queue backlog detected (12K messages)", severity: "warning" as const },
            { time: "2026-05-27 16:30", service: "Elasticsearch", event: "Cluster rebalancing completed", severity: "resolved" as const },
            { time: "2026-05-27 11:00", service: "API Server", event: "Deploy v3.1.2 rolled out successfully", severity: "info" as const },
          ].map((inc, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded bg-ink-deep border border-hairline-violet/30">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  inc.severity === "resolved" ? "bg-accent-lime" : inc.severity === "warning" ? "bg-warning" : "bg-accent-violet"
                }`} />
                <div>
                  <span className="text-[14px] font-medium">{inc.service}</span>
                  <span className="text-[14px] text-on-dark-muted ml-2">{inc.event}</span>
                </div>
              </div>
              <span className="text-[13px] text-on-dark-muted">{inc.time}</span>
            </div>
          ))}
        </div>
      </WidgetCard>
    </div>
  );
}
