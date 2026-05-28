"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Download, BarChart3 } from "lucide-react";

interface UsageRow {
  tenant: string;
  plan: string;
  mentionsUsed: number;
  mentionQuota: number;
  apiCalls: number;
  storageUsed: string;
  storageQuota: string;
  status: "under" | "approaching" | "exceeded";
}

const usageData: UsageRow[] = [
  { tenant: "Acme Corporation", plan: "Enterprise", mentionsUsed: 4230, mentionQuota: 10000, apiCalls: 12500, storageUsed: "2.4 GB", storageQuota: "10 GB", status: "under" },
  { tenant: "GlobalTech Industries", plan: "Pro", mentionsUsed: 4840, mentionQuota: 5000, apiCalls: 8900, storageUsed: "1.8 GB", storageQuota: "5 GB", status: "approaching" },
  { tenant: "MegaBrand Corp", plan: "Enterprise", mentionsUsed: 9800, mentionQuota: 10000, apiCalls: 22100, storageUsed: "8.9 GB", storageQuota: "10 GB", status: "approaching" },
  { tenant: "DataStream Analytics", plan: "Pro", mentionsUsed: 3200, mentionQuota: 5000, apiCalls: 5400, storageUsed: "0.9 GB", storageQuota: "5 GB", status: "under" },
  { tenant: "Startup Labs", plan: "Free", mentionsUsed: 48, mentionQuota: 50, apiCalls: 320, storageUsed: "0.1 GB", storageQuota: "1 GB", status: "approaching" },
  { tenant: "RetailMax Inc", plan: "Enterprise", mentionsUsed: 0, mentionQuota: 10000, apiCalls: 0, storageUsed: "0 GB", storageQuota: "10 GB", status: "under" },
];

const statusVariant = { under: "sentiment-positive" as const, approaching: "warning" as const, exceeded: "sentiment-negative" as const };

export default function UsageReportPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Billing", href: "/admin/billing" }, { label: "Usage Report" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Usage Report</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Per-tenant resource usage and quota tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="violet-token" size="sm"><BarChart3 size={14} /> View Charts</Button>
          <Button variant="ghost" size="sm"><Download size={14} /> Export CSV</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <WidgetCard><div className="text-center py-2"><p className="text-[28px] font-semibold">22,118</p><p className="text-[14px] text-on-dark-muted">Total Mentions</p></div></WidgetCard>
        <WidgetCard><div className="text-center py-2"><p className="text-[28px] font-semibold">49,320</p><p className="text-[14px] text-on-dark-muted">Total API Calls</p></div></WidgetCard>
        <WidgetCard><div className="text-center py-2"><p className="text-[28px] font-semibold">14.1 GB</p><p className="text-[14px] text-on-dark-muted">Total Storage</p></div></WidgetCard>
        <WidgetCard><div className="text-center py-2"><p className="text-[28px] font-semibold">4</p><p className="text-[14px] text-on-dark-muted">Tenants Near Quota</p></div></WidgetCard>
      </div>

      <WidgetCard>
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted" />
            <input className="w-full bg-surface-night text-on-primary text-[14px] pl-9 pr-3 py-2 rounded-md border border-hairline-violet outline-none focus:ring-1 focus:ring-accent-lime/30" placeholder="Search tenants..." />
          </div>
          <select className="bg-accent-violet-mid/30 text-on-primary text-[14px] rounded-md px-3 py-2 border border-hairline-violet outline-none">
            <option>All Plans</option>
            <option>Free</option>
            <option>Pro</option>
            <option>Enterprise</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-hairline-violet/50">
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Tenant</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Plan</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Mentions Used</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Quota</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">API Calls</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Storage</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {usageData.map((row, i) => (
                <tr key={i} className="border-b border-hairline-violet/30 hover:bg-accent-lime/4 transition-colors">
                  <td className="py-3 text-[16px]">{row.tenant}</td>
                  <td className="py-3"><Badge variant="default">{row.plan}</Badge></td>
                  <td className="py-3 text-[16px]">{row.mentionsUsed.toLocaleString()}</td>
                  <td className="py-3 text-[14px] text-on-dark-muted">{row.mentionQuota.toLocaleString()}</td>
                  <td className="py-3 text-[16px]">{row.apiCalls.toLocaleString()}</td>
                  <td className="py-3 text-[14px]">{row.storageUsed} / {row.storageQuota}</td>
                  <td className="py-3"><Badge variant={statusVariant[row.status]}>{row.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WidgetCard>
    </div>
  );
}
