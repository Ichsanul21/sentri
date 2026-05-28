"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, RefreshCw } from "lucide-react";

interface ApiLogEntry {
  timestamp: string;
  method: string;
  endpoint: string;
  status: number;
  duration: string;
  ip: string;
  user: string;
}

const mockLogs: ApiLogEntry[] = [
  { timestamp: "2026-05-28 10:32:15", method: "GET", endpoint: "/api/v1/dashboard/summary", status: 200, duration: "145ms", ip: "192.168.1.100", user: "alice@acme.com" },
  { timestamp: "2026-05-28 10:31:42", method: "POST", endpoint: "/api/v1/sentiment/batch", status: 201, duration: "2.3s", ip: "203.0.113.45", user: "bob@globaltech.com" },
  { timestamp: "2026-05-28 10:30:00", method: "GET", endpoint: "/api/v1/brands", status: 200, duration: "32ms", ip: "198.51.100.22", user: "charlie@startup.io" },
  { timestamp: "2026-05-28 10:28:33", method: "POST", endpoint: "/api/v1/crisis/detect", status: 200, duration: "4.1s", ip: "10.0.0.50", user: "system" },
  { timestamp: "2026-05-28 10:25:18", method: "PUT", endpoint: "/api/v1/brand/42/config", status: 200, duration: "89ms", ip: "192.168.1.100", user: "alice@acme.com" },
  { timestamp: "2026-05-28 10:22:05", method: "DELETE", endpoint: "/api/v1/brand/17", status: 204, duration: "18ms", ip: "10.0.0.1", user: "diana@sentri.com" },
  { timestamp: "2026-05-28 10:20:44", method: "GET", endpoint: "/api/v1/mentions?page=3", status: 200, duration: "267ms", ip: "203.0.113.45", user: "bob@globaltech.com" },
  { timestamp: "2026-05-28 10:18:30", method: "POST", endpoint: "/api/v1/auth/login", status: 401, duration: "5ms", ip: "51.15.200.100", user: "unknown" },
  { timestamp: "2026-05-28 10:15:00", method: "GET", endpoint: "/api/v1/reports/generate", status: 500, duration: "12.5s", ip: "192.168.1.100", user: "alice@acme.com" },
  { timestamp: "2026-05-28 10:12:22", method: "GET", endpoint: "/api/v1/health", status: 200, duration: "4ms", ip: "10.0.0.1", user: "system" },
];

const methods = ["All", "GET", "POST", "PUT", "DELETE"];

export default function ApiLogsPage() {
  const [methodFilter, setMethodFilter] = useState("All");

  const filtered = methodFilter === "All" ? mockLogs : mockLogs.filter((l) => l.method === methodFilter);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Monitoring", href: "/admin/monitoring" }, { label: "API Logs" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">API Request Logs</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Monitor API request patterns and performance</p>
        </div>
        <Button variant="violet-token" size="sm"><RefreshCw size={14} /> Auto Refresh</Button>
      </div>

      <div className="flex gap-3 flex-wrap items-center">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted" />
          <input className="w-full bg-surface-night text-on-primary text-[14px] pl-9 pr-3 py-2 rounded-md border border-hairline-violet outline-none focus:ring-1 focus:ring-accent-lime/30" placeholder="Search endpoints..." />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-on-dark-muted" />
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="bg-accent-violet-mid/30 text-on-primary text-[14px] rounded-md px-3 py-2 border border-hairline-violet outline-none"
          >
            {methods.map((m) => (<option key={m} value={m}>{m}</option>))}
          </select>
        </div>
      </div>

      <WidgetCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-hairline-violet/50">
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Timestamp</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Method</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Endpoint</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Status</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Duration</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">IP</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">User</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => (
                <tr key={i} className="border-b border-hairline-violet/30 hover:bg-accent-lime/4 transition-colors">
                  <td className="py-3 text-[14px] text-on-dark-muted font-mono">{log.timestamp}</td>
                  <td className="py-3">
                    <Badge variant={log.method === "GET" ? "sentiment-positive" : log.method === "POST" ? "default" : log.method === "DELETE" ? "sentiment-negative" : "warning"}>
                      {log.method}
                    </Badge>
                  </td>
                  <td className="py-3 text-[14px] font-mono">{log.endpoint}</td>
                  <td className="py-3">
                    <span className={`font-mono text-[14px] ${log.status >= 500 ? "text-sentiment-negative" : log.status >= 400 ? "text-warning" : "text-accent-lime"}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 text-[14px] text-on-dark-muted">{log.duration}</td>
                  <td className="py-3 text-[14px] text-on-dark-muted font-mono">{log.ip}</td>
                  <td className="py-3 text-[14px] text-on-dark-muted">{log.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WidgetCard>
    </div>
  );
}
