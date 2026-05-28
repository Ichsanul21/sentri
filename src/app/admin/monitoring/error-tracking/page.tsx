"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, XCircle, AlertCircle, RefreshCw } from "lucide-react";

interface ErrorEntry {
  type: string;
  message: string;
  count: number;
  lastOccurred: string;
  status: "new" | "investigating" | "resolved" | "ignored";
  service: string;
  severity: "critical" | "high" | "medium" | "low";
}

const errors: ErrorEntry[] = [
  { type: "MemoryLimitError", message: "NLP worker exceeded 512MB memory limit processing batch", count: 47, lastOccurred: "2026-05-28 09:30:45", status: "investigating", service: "NLP Processor", severity: "critical" },
  { type: "ConnectionTimeout", message: "EWS API connection timeout after 30s", count: 23, lastOccurred: "2026-05-28 07:15:00", status: "new", service: "EWS Connector", severity: "high" },
  { type: "RateLimitExceeded", message: "Client ip 198.51.100.33 exceeded 1000 req/h limit", count: 156, lastOccurred: "2026-05-27 22:00:00", status: "new", service: "API Gateway", severity: "medium" },
  { type: "QueueOverflow", message: "Message queue depth exceeded 10000 threshold", count: 8, lastOccurred: "2026-05-28 02:00:00", status: "resolved", service: "Message Queue", severity: "high" },
  { type: "NullPointerException", message: "Null brand config reference in report generator", count: 3, lastOccurred: "2026-05-27 14:22:10", status: "resolved", service: "Reporter Agent", severity: "medium" },
  { type: "AuthenticationFailure", message: "Invalid API key presented for endpoint /api/v1/sentiment", count: 89, lastOccurred: "2026-05-28 10:00:00", status: "ignored", service: "API Gateway", severity: "low" },
  { type: "DiskFullError", message: "Elasticsearch node es-data-01 disk usage at 94%", count: 1, lastOccurred: "2026-05-26 18:30:00", status: "resolved", service: "Elasticsearch", severity: "critical" },
  { type: "TimeoutError", message: "Report generation timed out after 60s for tenant acme-corp", count: 12, lastOccurred: "2026-05-28 08:45:00", status: "investigating", service: "Reporter Agent", severity: "medium" },
];

const severityColor = { critical: "sentiment-negative", high: "warning", medium: "default", low: "sentiment-positive" } as const;
const statusColor = { new: "sentiment-negative", investigating: "warning", resolved: "sentiment-positive", ignored: "default" } as const;

export default function ErrorTrackingPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Monitoring", href: "/admin/monitoring" }, { label: "Error Tracking" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Error Tracking</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Aggregated error monitoring and diagnostics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm"><RefreshCw size={14} /> Refresh</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <WidgetCard>
          <div className="text-center py-2">
            <XCircle size={24} className="text-sentiment-negative mx-auto mb-2" />
            <p className="text-[28px] font-semibold">6</p>
            <p className="text-[14px] text-on-dark-muted">Active Errors</p>
          </div>
        </WidgetCard>
        <WidgetCard>
          <div className="text-center py-2">
            <AlertTriangle size={24} className="text-warning mx-auto mb-2" />
            <p className="text-[28px] font-semibold">339</p>
            <p className="text-[14px] text-on-dark-muted">Total Occurrences (24h)</p>
          </div>
        </WidgetCard>
        <WidgetCard>
          <div className="text-center py-2">
            <AlertCircle size={24} className="text-accent-lime mx-auto mb-2" />
            <p className="text-[28px] font-semibold">4</p>
            <p className="text-[14px] text-on-dark-muted">Resolved (24h)</p>
          </div>
        </WidgetCard>
        <WidgetCard>
          <div className="text-center py-2">
            <AlertTriangle size={24} className="text-accent-pink mx-auto mb-2" />
            <p className="text-[28px] font-semibold">2</p>
            <p className="text-[14px] text-on-dark-muted">Critical</p>
          </div>
        </WidgetCard>
      </div>

      <WidgetCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-hairline-violet/50">
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Error Type</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Message</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Service</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Severity</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Count</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Last Occurred</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {errors.map((err, i) => (
                <tr key={i} className="border-b border-hairline-violet/30 hover:bg-accent-lime/4 transition-colors">
                  <td className="py-3"><span className="font-mono text-[13px] bg-accent-violet-mid/30 px-2 py-0.5 rounded">{err.type}</span></td>
                  <td className="py-3 text-[14px] max-w-md truncate">{err.message}</td>
                  <td className="py-3 text-[14px] text-on-dark-muted">{err.service}</td>
                  <td className="py-3"><Badge variant={severityColor[err.severity]}>{err.severity}</Badge></td>
                  <td className="py-3 text-[16px] font-semibold">{err.count.toLocaleString()}</td>
                  <td className="py-3 text-[14px] text-on-dark-muted">{err.lastOccurred}</td>
                  <td className="py-3"><Badge variant={statusColor[err.status]}>{err.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WidgetCard>
    </div>
  );
}
