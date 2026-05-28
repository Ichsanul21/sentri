"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BillingCard } from "@/components/admin/billing-card";
import type { BillingPlan } from "@/types/admin";

const plans: BillingPlan[] = [
  {
    tier: "free", price: 0, brands: 1, monthlyMentions: 50, platforms: 1,
    dataHistory: "7 hari", aiAnalytics: "Basic", ews: false, exportFormats: ["CSV"],
    apiAccess: false, support: "Email",
  },
  {
    tier: "pro", price: 99, brands: 3, monthlyMentions: 5000, platforms: 3,
    dataHistory: "1 tahun", aiAnalytics: "Advanced", ews: true, exportFormats: ["PDF", "PPT", "Excel"],
    apiAccess: true, support: "Priority",
  },
  {
    tier: "enterprise", price: 0, brands: Infinity, monthlyMentions: Infinity, platforms: 4,
    dataHistory: "Unlimited", aiAnalytics: "Full Suite", ews: true, exportFormats: ["All Formats"],
    apiAccess: true, support: "Dedicated",
  },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Billing" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Subscription & Billing</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Manage your plan, usage, and billing history</p>
      </div>

      <WidgetCard title="Current Plan">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent-lime/10 flex items-center justify-center text-accent-lime font-bold text-lg">P</div>
            <div>
              <h3 className="text-[20px] font-semibold">Pro Plan — $99/month</h3>
              <p className="text-[14px] text-on-dark-muted">3 brands · 5,000 mentions/month · Next billing: June 15, 2026</p>
            </div>
          </div>
          <Badge variant="lime" className="px-4 py-1">Active</Badge>
        </div>
      </WidgetCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <BillingCard
            key={plan.tier}
            plan={plan}
            featured={plan.tier === "pro"}
            current={plan.tier === "pro"}
          />
        ))}
      </div>

      <WidgetCard title="Billing History">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-hairline-violet text-[14px] text-on-dark-muted">
                <th className="text-left py-2 font-medium">Date</th>
                <th className="text-left py-2 font-medium">Plan</th>
                <th className="text-left py-2 font-medium">Amount</th>
                <th className="text-left py-2 font-medium">Status</th>
                <th className="text-right py-2 font-medium">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "May 15, 2026", plan: "Pro", amount: "$99", status: "paid" as const },
                { date: "Apr 15, 2026", plan: "Pro", amount: "$99", status: "paid" as const },
                { date: "Mar 15, 2026", plan: "Free", amount: "$0", status: "paid" as const },
              ].map((inv) => (
                <tr key={inv.date} className="border-b border-hairline-violet/30 hover:bg-accent-lime/4 transition-colors">
                  <td className="py-3 text-[14px]">{inv.date}</td>
                  <td className="py-3 text-[14px]">{inv.plan}</td>
                  <td className="py-3 text-[14px]">{inv.amount}</td>
                  <td className="py-3"><Badge variant="sentiment-positive">{inv.status}</Badge></td>
                  <td className="py-3 text-right"><Button variant="ghost" size="sm">Download</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WidgetCard>
    </div>
  );
}
