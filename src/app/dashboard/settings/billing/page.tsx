"use client";

import { useState } from "react";
import { ArrowDownToLine } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BillingCard } from "@/components/admin/billing-card";
import { Table, THead, TBody, THeadRow, TBodyRow, Th, Td } from "@/components/ui/table";
import type { BillingPlan } from "@/types/admin";

const plans: BillingPlan[] = [
  { tier: "free", price: 0, brands: 1, monthlyMentions: 5000, platforms: 3, dataHistory: "7 days", aiAnalytics: "Basic", ews: false, exportFormats: ["CSV"], apiAccess: false, support: "Community" },
  { tier: "pro", price: 99, brands: 10, monthlyMentions: 100000, platforms: 10, dataHistory: "12 months", aiAnalytics: "Advanced", ews: true, exportFormats: ["CSV", "PDF", "Excel"], apiAccess: true, support: "Priority email" },
  { tier: "enterprise", price: 499, brands: 10, monthlyMentions: 100000, platforms: 10, dataHistory: "24 months", aiAnalytics: "Full", ews: true, exportFormats: ["CSV", "PDF", "Excel"], apiAccess: true, support: "Dedicated" },
];

const billingHistory = [
  { date: "01 May 2026", plan: "Pro", amount: "$99.00", status: "paid" as const, invoice: "#INV-001" },
  { date: "01 Apr 2026", plan: "Pro", amount: "$99.00", status: "paid" as const, invoice: "#INV-002" },
  { date: "01 Mar 2026", plan: "Pro", amount: "$99.00", status: "paid" as const, invoice: "#INV-003" },
  { date: "01 Feb 2026", plan: "Free", amount: "$0.00", status: "paid" as const, invoice: "#INV-004" },
  { date: "15 Jan 2026", plan: "Free", amount: "$0.00", status: "past_due" as const, invoice: "-" },
];

const statusVariant = { paid: "sentiment-positive" as const, past_due: "severity-high" as const, pending: "sentiment-neutral" as const };

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState<BillingPlan["tier"]>("pro");

  const handleSelect = (tier: BillingPlan["tier"]) => {
    setCurrentPlan(tier);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Breadcrumbs items={[{ label: "Settings", href: "/dashboard/settings" }, { label: "Billing" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Subscription & Billing</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Manage your subscription plan and billing history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <BillingCard
            key={plan.tier}
            plan={plan}
            featured={plan.tier === "pro"}
            current={plan.tier === currentPlan}
            onSelect={() => handleSelect(plan.tier)}
          />
        ))}
      </div>

      <WidgetCard title="Billing History">
        <Table>
          <THead>
            <THeadRow>
              <Th>Date</Th>
              <Th>Plan</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Invoice</Th>
            </THeadRow>
          </THead>
          <TBody>
            {billingHistory.map((row, i) => (
              <TBodyRow key={i}>
                <Td>{row.date}</Td>
                <Td>{row.plan}</Td>
                <Td>{row.amount}</Td>
                <Td>
                  <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
                </Td>
                <Td>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ArrowDownToLine size={14} />
                    {row.invoice}
                  </Button>
                </Td>
              </TBodyRow>
            ))}
          </TBody>
        </Table>
      </WidgetCard>
    </div>
  );
}
