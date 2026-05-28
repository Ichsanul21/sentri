"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Gauge } from "lucide-react";

interface TierLimit {
  tier: string;
  limit: string;
  current: number;
  max: number;
  color: string;
  tenants: number;
}

const tiers: TierLimit[] = [
  { tier: "Free", limit: "100 req/hour", current: 72, max: 100, color: "bg-accent-violet", tenants: 5 },
  { tier: "Pro", limit: "1,000 req/hour", current: 843, max: 1000, color: "bg-accent-pink", tenants: 3 },
  { tier: "Enterprise", limit: "5,000 req/hour", current: 1240, max: 5000, color: "bg-accent-lime", tenants: 2 },
];

const recentBlocks = [
  { tenant: "Startup Labs", tier: "Free", ip: "198.51.100.33", endpoint: "/api/v1/sentiment/batch", timestamp: "2026-05-28 10:30:00", blocked: true },
  { tenant: "Unknown", tier: "N/A", ip: "51.15.200.100", endpoint: "/api/v1/auth/login", timestamp: "2026-05-28 09:15:00", blocked: true },
  { tenant: "GlobalTech", tier: "Pro", ip: "203.0.113.45", endpoint: "/api/v1/dashboard", timestamp: "2026-05-27 22:00:00", blocked: false },
];

export default function RateLimitingPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Monitoring", href: "/admin/monitoring" }, { label: "Rate Limiting" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Rate Limiting</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Monitor API rate limit usage across all tiers</p>
        </div>
        <Button variant="violet-token" size="sm"><RefreshCw size={14} /> Refresh</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <WidgetCard key={tier.tier}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-semibold">{tier.tier}</h3>
              <Badge variant="default">{tier.tenants} tenants</Badge>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Gauge size={16} className="text-on-dark-muted" />
              <span className="text-[14px] text-on-dark-muted">Limit: <span className="text-on-primary font-mono">{tier.limit}</span></span>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-[14px] mb-1">
                <span className="text-on-dark-muted">Current usage</span>
                <span className={tier.current / tier.max > 0.8 ? "text-warning" : "text-on-primary"}>{tier.current.toLocaleString()} / {tier.max.toLocaleString()}</span>
              </div>
              <div className="w-full bg-hairline-violet/30 rounded-full h-2.5">
                <div className={`${tier.color} h-2.5 rounded-full`} style={{ width: `${(tier.current / tier.max) * 100}%` }} />
              </div>
            </div>
            <div className="flex justify-between text-[13px] text-on-dark-muted">
              <span>Utilization</span>
              <span>{Math.round((tier.current / tier.max) * 100)}%</span>
            </div>
          </WidgetCard>
        ))}
      </div>

      <WidgetCard title="Recent Rate Limit Events">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-hairline-violet/50">
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Timestamp</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Tenant</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Tier</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">IP</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Endpoint</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentBlocks.map((evt, i) => (
                <tr key={i} className="border-b border-hairline-violet/30 hover:bg-accent-lime/4 transition-colors">
                  <td className="py-3 text-[14px] text-on-dark-muted">{evt.timestamp}</td>
                  <td className="py-3 text-[14px]">{evt.tenant}</td>
                  <td className="py-3"><Badge variant="default">{evt.tier}</Badge></td>
                  <td className="py-3 text-[14px] font-mono text-on-dark-muted">{evt.ip}</td>
                  <td className="py-3 text-[14px] font-mono">{evt.endpoint}</td>
                  <td className="py-3">
                    <Badge variant={evt.blocked ? "sentiment-negative" : "warning"}>{evt.blocked ? "Blocked" : "Warning"}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WidgetCard>
    </div>
  );
}
