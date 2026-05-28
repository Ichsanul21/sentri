"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface PlanFeature {
  name: string;
  free: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

const plans = [
  { tier: "Free", price: "$0", color: "text-on-dark-muted", border: "border-hairline-violet" },
  { tier: "Pro", price: "$99/mo", color: "text-accent-pink", border: "border-accent-pink/30" },
  { tier: "Enterprise", price: "Custom", color: "text-accent-lime", border: "border-accent-lime/30" },
];

const features: PlanFeature[] = [
  { name: "Brands", free: "1 brand", pro: "3 brands", enterprise: "Unlimited" },
  { name: "Monthly Mentions", free: "50", pro: "5,000", enterprise: "Unlimited" },
  { name: "Platform Integrations", free: "1", pro: "3", enterprise: "All 4" },
  { name: "Data History", free: "7 days", pro: "1 year", enterprise: "Unlimited" },
  { name: "AI Analytics", free: "Basic", pro: "Advanced", enterprise: "Full Suite" },
  { name: "Early Warning System", free: false, pro: true, enterprise: true },
  { name: "Crisis Detection", free: false, pro: true, enterprise: true },
  { name: "Export Formats", free: "CSV", pro: "PDF, PPT, Excel", enterprise: "All Formats" },
  { name: "API Access", free: false, pro: true, enterprise: true },
  { name: "API Rate Limit", free: "100/hr", pro: "1,000/hr", enterprise: "5,000/hr" },
  { name: "Support", free: "Email", pro: "Priority", enterprise: "Dedicated" },
  { name: "Custom Branding", free: false, pro: false, enterprise: true },
  { name: "SLA Guarantee", free: false, pro: "99.5%", enterprise: "99.99%" },
  { name: "SSO/SAML", free: false, pro: false, enterprise: true },
];

export default function PlansPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Billing", href: "/admin/billing" }, { label: "Plans" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Plan & Tier Management</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Review and manage subscription plans</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <WidgetCard key={plan.tier} className={`border-2 ${plan.border}`}>
            <div className="text-center py-4">
              <h3 className={`text-[22px] font-semibold ${plan.color}`}>{plan.tier}</h3>
              <p className="text-[36px] font-bold mt-2">{plan.price}</p>
              {plan.tier === "Pro" && <Badge variant="lime" className="mt-2">Most Popular</Badge>}
            </div>
            <div className="mt-4 space-y-2">
              {features.slice(0, 5).map((f) => (
                <div key={f.name} className="flex justify-between text-[14px] py-1 border-b border-hairline-violet/10">
                  <span className="text-on-dark-muted">{f.name}</span>
                  <span>{typeof f[plan.tier.toLowerCase() as keyof PlanFeature] === "boolean"
                    ? (f[plan.tier.toLowerCase() as keyof PlanFeature] ? <Check size={16} className="text-accent-lime" /> : <X size={16} className="text-on-dark-muted" />)
                    : String(f[plan.tier.toLowerCase() as keyof PlanFeature])}
                  </span>
                </div>
              ))}
              <Button variant={plan.tier === "Free" ? "ghost" : "primary"} className="w-full mt-3" size="sm">
                {plan.tier === "Enterprise" ? "Contact Sales" : "Manage Plan"}
              </Button>
            </div>
          </WidgetCard>
        ))}
      </div>

      <WidgetCard title="Full Feature Comparison">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-hairline-violet/50">
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Feature</th>
                <th className="text-center py-2 text-[14px] font-medium text-on-dark-muted">Free</th>
                <th className="text-center py-2 text-[14px] font-medium text-accent-pink">Pro</th>
                <th className="text-center py-2 text-[14px] font-medium text-accent-lime">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f) => (
                <tr key={f.name} className="border-b border-hairline-violet/20 hover:bg-accent-lime/4 transition-colors">
                  <td className="py-3 text-[14px]">{f.name}</td>
                  <td className="py-3 text-center">{renderCellValue(f.free)}</td>
                  <td className="py-3 text-center">{renderCellValue(f.pro)}</td>
                  <td className="py-3 text-center">{renderCellValue(f.enterprise)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WidgetCard>
    </div>
  );
}

function renderCellValue(val: boolean | string) {
  if (typeof val === "boolean") {
    return val ? <Check size={16} className="text-accent-lime mx-auto" /> : <X size={16} className="text-on-dark-muted mx-auto" />;
  }
  return <span className="text-[14px]">{val}</span>;
}
