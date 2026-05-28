"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download } from "lucide-react";

interface AuditEntry {
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  ipAddress: string;
  tenant: string;
}

const allEntries: AuditEntry[] = [
  { timestamp: "2026-05-28 10:32:15", user: "alice@acme.com", action: "user.login", resource: "User Session", ipAddress: "192.168.1.100", tenant: "Acme Corp" },
  { timestamp: "2026-05-28 10:15:42", user: "diana@sentri.com", action: "tenant.update", resource: "Tenant Config", ipAddress: "10.0.0.1", tenant: "Acme Corp" },
  { timestamp: "2026-05-28 09:58:03", user: "bob@globaltech.com", action: "brand.create", resource: "Brand: TechWatch", ipAddress: "203.0.113.45", tenant: "GlobalTech" },
  { timestamp: "2026-05-28 09:30:18", user: "admin@startup.io", action: "user.invite", resource: "User: eve@startup.io", ipAddress: "198.51.100.22", tenant: "Startup Labs" },
  { timestamp: "2026-05-28 08:45:00", user: "alice@acme.com", action: "report.export", resource: "Report: Q2 Mentions", ipAddress: "192.168.1.100", tenant: "Acme Corp" },
  { timestamp: "2026-05-27 23:12:34", user: "system", action: "backup.completed", resource: "Database Backup", ipAddress: "127.0.0.1", tenant: "System" },
  { timestamp: "2026-05-27 22:00:00", user: "diana@sentri.com", action: "api-key.rotate", resource: "API Key: Production", ipAddress: "10.0.0.1", tenant: "Acme Corp" },
  { timestamp: "2026-05-27 18:30:15", user: "charlie@megabrand.com", action: "crisis.escalate", resource: "Crisis Alert #482", ipAddress: "172.16.0.50", tenant: "MegaBrand" },
  { timestamp: "2026-05-27 16:20:45", user: "bob@globaltech.com", action: "user.login", resource: "User Session", ipAddress: "203.0.113.45", tenant: "GlobalTech" },
  { timestamp: "2026-05-27 14:05:22", user: "system", action: "rate-limit.exceeded", resource: "API Rate Limit", ipAddress: "198.51.100.33", tenant: "Startup Labs" },
];

const actionTypes = ["All", "user.login", "user.invite", "tenant.update", "brand.create", "report.export", "api-key.rotate", "crisis.escalate", "backup.completed", "rate-limit.exceeded"];

export default function AuditLogPage() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? allEntries : allEntries.filter((e) => e.action === filter);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Tenants", href: "/admin/tenants" }, { label: "Audit Log" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Tenant Activity Audit</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Track all cross-tenant administrative actions</p>
      </div>

      <div className="flex gap-3 flex-wrap items-center">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted" />
          <input className="w-full bg-surface-night text-on-primary text-[14px] pl-9 pr-3 py-2 rounded-md border border-hairline-violet outline-none focus:ring-1 focus:ring-accent-lime/30" placeholder="Search audit log..." />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-on-dark-muted" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-accent-violet-mid/30 text-on-primary text-[14px] rounded-md px-3 py-2 border border-hairline-violet outline-none"
          >
            {actionTypes.map((a) => (
              <option key={a} value={a}>{a === "All" ? "All Actions" : a}</option>
            ))}
          </select>
        </div>
        <Button variant="ghost" size="sm"><Download size={14} /> Export CSV</Button>
      </div>

      <WidgetCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-hairline-violet/50">
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Timestamp</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">User</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Action</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Resource</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Tenant</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry, i) => (
                <tr key={i} className="border-b border-hairline-violet/30 hover:bg-accent-lime/4 transition-colors">
                  <td className="py-3 text-[14px] text-on-dark-muted font-mono">{entry.timestamp}</td>
                  <td className="py-3 text-[14px]">{entry.user}</td>
                  <td className="py-3"><span className="font-mono text-[13px] bg-accent-violet-mid/30 px-2 py-0.5 rounded">{entry.action}</span></td>
                  <td className="py-3 text-[14px]">{entry.resource}</td>
                  <td className="py-3 text-[14px] text-on-dark-muted">{entry.tenant}</td>
                  <td className="py-3 text-[14px] text-on-dark-muted font-mono">{entry.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WidgetCard>
    </div>
  );
}
