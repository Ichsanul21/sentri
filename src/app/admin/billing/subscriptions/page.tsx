"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Subscription {
  tenant: string;
  plan: string;
  status: "active" | "past_due" | "canceled" | "trial";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  amount: string;
}

const subscriptions: Subscription[] = [
  { tenant: "Acme Corporation", plan: "Enterprise", status: "active", currentPeriodStart: "May 1, 2026", currentPeriodEnd: "May 31, 2026", amount: "$2,500/mo" },
  { tenant: "GlobalTech Industries", plan: "Pro", status: "active", currentPeriodStart: "May 1, 2026", currentPeriodEnd: "May 31, 2026", amount: "$99/mo" },
  { tenant: "MegaBrand Corp", plan: "Enterprise", status: "past_due", currentPeriodStart: "May 1, 2026", currentPeriodEnd: "May 31, 2026", amount: "$2,500/mo" },
  { tenant: "Startup Labs", plan: "Free", status: "trial", currentPeriodStart: "Apr 10, 2026", currentPeriodEnd: "Jun 10, 2026", amount: "$0/mo" },
  { tenant: "DataStream Analytics", plan: "Pro", status: "active", currentPeriodStart: "May 1, 2026", currentPeriodEnd: "May 31, 2026", amount: "$99/mo" },
  { tenant: "RetailMax Inc", plan: "Enterprise", status: "canceled", currentPeriodStart: "Apr 1, 2026", currentPeriodEnd: "Apr 30, 2026", amount: "$2,500/mo" },
];

const statusVariant = { active: "sentiment-positive" as const, past_due: "sentiment-negative" as const, canceled: "default" as const, trial: "warning" as const };

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Billing", href: "/admin/billing" }, { label: "Subscriptions" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Subscription Overview</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">View and manage all tenant subscriptions</p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted" />
          <input className="w-full bg-surface-night text-on-primary text-[14px] pl-9 pr-3 py-2 rounded-md border border-hairline-violet outline-none focus:ring-1 focus:ring-accent-lime/30" placeholder="Search subscriptions..." />
        </div>
        <select className="bg-accent-violet-mid/30 text-on-primary text-[14px] rounded-md px-3 py-2 border border-hairline-violet outline-none">
          <option>All Status</option>
          <option>Active</option>
          <option>Past Due</option>
          <option>Trial</option>
          <option>Canceled</option>
        </select>
      </div>

      <WidgetCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-hairline-violet/50">
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Tenant</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Plan</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Status</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Period Start</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Period End</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Amount</th>
                <th className="text-right py-2 text-[14px] font-medium text-on-dark-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, i) => (
                <tr key={i} className="border-b border-hairline-violet/30 hover:bg-accent-lime/4 transition-colors">
                  <td className="py-3">
                    <Link href={`/admin/tenants/${sub.tenant.toLowerCase().replace(/\s+/g, "-")}`} className="text-[16px] text-accent-lime hover:underline flex items-center gap-1">
                      {sub.tenant} <ExternalLink size={12} />
                    </Link>
                  </td>
                  <td className="py-3"><Badge variant="default">{sub.plan}</Badge></td>
                  <td className="py-3"><Badge variant={statusVariant[sub.status]}>{sub.status.replace("_", " ")}</Badge></td>
                  <td className="py-3 text-[14px] text-on-dark-muted">{sub.currentPeriodStart}</td>
                  <td className="py-3 text-[14px] text-on-dark-muted">{sub.currentPeriodEnd}</td>
                  <td className="py-3 text-[16px] font-semibold">{sub.amount}</td>
                  <td className="py-3 text-right">
                    <Button variant="ghost" size="sm">Manage</Button>
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
