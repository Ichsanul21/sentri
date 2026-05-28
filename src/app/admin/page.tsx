"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KpiMetric } from "@/components/dashboard/kpi-metric";
import Link from "next/link";
import { Users, CreditCard, Key, Settings } from "lucide-react";

const recentUsers = [
  { name: "Alice Manager", email: "alice@company.com", role: "Manager", status: "active" as const },
  { name: "Bob Analyst", email: "bob@company.com", role: "Analyst", status: "active" as const },
  { name: "Charlie Viewer", email: "charlie@client.com", role: "Viewer", status: "active" as const },
  { name: "Diana Admin", email: "diana@sentri.com", role: "Super Admin", status: "active" as const },
];

const adminCards = [
  { href: "/admin/users", icon: Users, label: "User Management", desc: "Manage roles and permissions", color: "text-accent-lime" },
  { href: "/admin/billing", icon: CreditCard, label: "Subscription & Billing", desc: "Tier plans and invoices", color: "text-accent-pink" },
  { href: "/admin/api-keys", icon: Key, label: "API Keys", desc: "Manage API access", color: "text-accent-violet" },
  { href: "/admin/settings", icon: Settings, label: "System Settings", desc: "Configure platform", color: "text-on-dark-muted" },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">System Administration</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Manage users, billing, API keys, and system configuration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <WidgetCard><KpiMetric label="Total Users" value="24" delta={{ value: "3 new", positive: true }} /></WidgetCard>
        <WidgetCard><KpiMetric label="Active Brands" value="12" /></WidgetCard>
        <WidgetCard><KpiMetric label="API Calls (24h)" value="48.2K" delta={{ value: "12.5%", positive: true }} /></WidgetCard>
        <WidgetCard><KpiMetric label="Revenue (MRR)" value="$4,950" delta={{ value: "8%", positive: true }} /></WidgetCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminCards.map((card) => (
          <Link key={card.href} href={card.href}>
            <WidgetCard className="hover:border-accent-lime/30 transition-colors cursor-pointer h-full">
              <div className="flex flex-col items-center text-center py-4">
                <card.icon size={32} className={`${card.color} mb-3`} />
                <h3 className="text-[16px] font-semibold">{card.label}</h3>
                <p className="text-[14px] text-on-dark-muted mt-1">{card.desc}</p>
              </div>
            </WidgetCard>
          </Link>
        ))}
      </div>

      <WidgetCard title="Recent Users">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-hairline-violet/50">
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Name</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Email</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Role</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u) => (
                <tr key={u.email} className="border-b border-hairline-violet/30 hover:bg-accent-lime/4 transition-colors">
                  <td className="py-3 text-[16px]">{u.name}</td>
                  <td className="py-3 text-[14px] text-on-dark-muted">{u.email}</td>
                  <td className="py-3"><Badge variant="default">{u.role}</Badge></td>
                  <td className="py-3"><Badge variant="sentiment-positive">{u.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WidgetCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <WidgetCard title="Subscription Overview">
          <div className="space-y-3">
            {[
              { tier: "Enterprise", count: 2, revenue: "$2,500", color: "text-accent-lime" },
              { tier: "Pro", count: 5, revenue: "$2,475", color: "text-accent-pink" },
              { tier: "Free", count: 5, revenue: "$0", color: "text-on-dark-muted" },
            ].map((t) => (
              <div key={t.tier} className="flex items-center justify-between p-3 rounded bg-ink-deep">
                <div>
                  <span className={`font-semibold ${t.color}`}>{t.tier}</span>
                  <span className="text-on-dark-muted ml-2">({t.count} tenants)</span>
                </div>
                <span className="font-semibold">{t.revenue}</span>
              </div>
            ))}
          </div>
        </WidgetCard>
        <WidgetCard title="Recent API Activity">
          <div className="space-y-2">
            {["GET /api/sentiment", "POST /api/brand", "GET /api/dashboard", "POST /api/crisis"].map((api) => (
              <div key={api} className="flex items-center justify-between text-[14px] py-1">
                <span className="text-on-dark-muted font-mono text-[13px]">{api}</span>
                <span className="text-accent-lime">200</span>
              </div>
            ))}
          </div>
        </WidgetCard>
        <WidgetCard title="Billing Alerts">
          <div className="space-y-2">
            <div className="p-2 rounded bg-severity-medium/10 text-[14px]">
              <span className="font-semibold">3 invoices past due</span>
              <p className="text-on-dark-muted">Total: $750</p>
            </div>
            <div className="p-2 rounded bg-accent-lime/10 text-[14px]">
              <span className="font-semibold">2 trials ending soon</span>
              <p className="text-on-dark-muted">In 3 days</p>
            </div>
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
