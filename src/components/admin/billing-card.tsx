"use client";

import { Check } from "lucide-react";
import type { BillingPlan } from "@/types/admin";

interface BillingCardProps {
  plan: BillingPlan;
  featured?: boolean;
  current?: boolean;
  onSelect?: () => void;
}

export function BillingCard({ plan, featured, current, onSelect }: BillingCardProps) {
  return (
    <div className={`rounded-xl p-8 flex flex-col ${
      featured
        ? "bg-surface-night text-on-primary border border-hairline-violet"
        : "bg-surface-canvas-light text-ink-deep border border-hairline-cloud"
    }`}>
      <h3 className="text-[24px] font-medium leading-[1.25] capitalize">{plan.tier}</h3>
      <div className="mt-2">
        <span className="text-[60px] font-medium leading-[1.1]">${plan.price}</span>
        <span className="text-[16px] text-on-dark-muted">/month</span>
      </div>
      <ul className="mt-6 space-y-3 flex-1">
        <FeatureRow text={typeof plan.brands === "number" ? plan.brands + " brands" : "Unlimited brands"} featured={featured} />
        <FeatureRow text={typeof plan.monthlyMentions === "number" ? plan.monthlyMentions.toLocaleString() + " mentions" : "Unlimited mentions"} featured={featured} />
        <FeatureRow text={`${typeof plan.platforms === "number" ? plan.platforms : "All"} platforms`} featured={featured} />
        <FeatureRow text={`${plan.dataHistory} data history`} featured={featured} />
        <FeatureRow text={`${plan.aiAnalytics} AI analytics`} featured={featured} />
        <FeatureRow text={plan.ews ? "Early Warning System" : "No EWS"} featured={featured} done={plan.ews} />
        <FeatureRow text={`Export: ${plan.exportFormats.join(", ")}`} featured={featured} />
        <FeatureRow text={plan.apiAccess ? "API Access" : "No API Access"} featured={featured} done={plan.apiAccess} />
        <FeatureRow text={`${plan.support} support`} featured={featured} />
      </ul>
      <button
        onClick={onSelect}
        disabled={current}
        className={`mt-6 px-4 py-2 rounded-md text-[14px] font-bold leading-[1.14] uppercase tracking-[0.2px] transition-all text-center ${
          current
            ? "bg-hairline-cloud text-on-dark-muted cursor-not-allowed"
            : featured
              ? "bg-on-primary text-ink-deep hover:bg-surface-press-light"
              : "bg-primary text-on-primary hover:bg-ink-deep"
        }`}
      >
        {current ? "Current Plan" : featured ? "Get Started" : "Choose Plan"}
      </button>
    </div>
  );
}

function FeatureRow({ text, featured, done }: { text: string; featured?: boolean; done?: boolean }) {
  return (
    <li className={`flex items-start gap-2 text-[16px] leading-[1.5] ${done === false ? (featured ? "text-on-dark-muted/50" : "text-on-dark-muted/50") : ""}`}>
      <Check size={16} className={`shrink-0 mt-0.5 ${featured ? "text-accent-lime" : "text-accent-violet"}`} />
      {text}
    </li>
  );
}
