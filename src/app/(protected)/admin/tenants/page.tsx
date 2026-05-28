"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink } from "lucide-react";

interface Tenant {
  id: string;
  name: string;
  slug: string;
  users: number;
  brands: number;
  status: "active" | "suspended" | "trial";
  plan: string;
  created: string;
}

const tenants: Tenant[] = [
  { id: "tenant-1", name: "Acme Corporation", slug: "acme-corp", users: 12, brands: 3, status: "active", plan: "Enterprise", created: "2025-11-01" },
  { id: "tenant-2", name: "GlobalTech Industries", slug: "globaltech", users: 8, brands: 2, status: "active", plan: "Pro", created: "2026-01-15" },
  { id: "tenant-3", name: "Startup Labs", slug: "startup-labs", users: 3, brands: 1, status: "trial", plan: "Free", created: "2026-04-10" },
  { id: "tenant-4", name: "MegaBrand Corp", slug: "megabrand", users: 25, brands: 5, status: "suspended", plan: "Enterprise", created: "2025-08-20" },
  { id: "tenant-5", name: "DataStream Analytics", slug: "datastream", users: 6, brands: 2, status: "active", plan: "Pro", created: "2026-02-28" },
];

export default function AdminTenantsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Tenants" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Tenant Management</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Manage multi-tenant organizations</p>
        </div>
        <Link href="/admin/tenants/audit-log">
          <Button variant="violet-token" size="sm">Audit Log</Button>
        </Link>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted" />
          <input className="w-full bg-surface-night text-on-primary text-[14px] pl-9 pr-3 py-2 rounded-md border border-hairline-violet outline-none focus:ring-1 focus:ring-accent-lime/30" placeholder="Search tenants..." />
        </div>
        <select className="bg-accent-violet-mid/30 text-on-primary text-[14px] rounded-md px-3 py-2 border border-hairline-violet outline-none">
          <option>All Status</option>
          <option>Active</option>
          <option>Trial</option>
          <option>Suspended</option>
        </select>
      </div>

      <WidgetCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-hairline-violet/50">
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Name</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Slug</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Users</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Brands</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Plan</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Status</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Created</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <tr key={t.id} className="border-b border-hairline-violet/30 hover:bg-accent-lime/4 transition-colors">
                  <td className="py-3">
                    <Link href={`/admin/tenants/${t.id}`} className="text-[16px] text-accent-lime hover:underline flex items-center gap-1">
                      {t.name} <ExternalLink size={12} />
                    </Link>
                  </td>
                  <td className="py-3 text-[14px] font-mono text-on-dark-muted">{t.slug}</td>
                  <td className="py-3 text-[16px]">{t.users}</td>
                  <td className="py-3 text-[16px]">{t.brands}</td>
                  <td className="py-3"><Badge variant="default">{t.plan}</Badge></td>
                  <td className="py-3">
                    <Badge variant={t.status === "active" ? "sentiment-positive" : t.status === "trial" ? "warning" : "sentiment-negative"}>
                      {t.status}
                    </Badge>
                  </td>
                  <td className="py-3 text-[14px] text-on-dark-muted">{t.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WidgetCard>
    </div>
  );
}
