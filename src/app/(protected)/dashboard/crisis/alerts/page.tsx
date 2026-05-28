"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCard } from "@/components/crisis/alert-card";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/components/ui/toast";
import { AlertTriangle, CheckCircle, Archive } from "lucide-react";

export default function CrisisAlertsPage() {
  const { crises, updateCrisis } = useApp();
  const { toast } = useToast();
  const [filter, setFilter] = useState("All Alerts");

  const filteredCrises = filter === "All Alerts" ? crises : crises.filter((c) => {
    if (filter === "Critical") return c.severity === "critical";
    if (filter === "High") return c.severity === "high";
    if (filter === "Medium") return c.severity === "medium";
    if (filter === "Low") return c.severity === "low";
    if (filter === "Acknowledged") return c.status === "acknowledged";
    if (filter === "Resolved") return c.status === "resolved";
    return true;
  });

  const acknowledgeAll = () => {
    crises.forEach((c) => updateCrisis(c.id, { status: "acknowledged" }));
    toast("All alerts acknowledged", "success");
  };

  const total = crises.length;
  const criticalCount = crises.filter((c) => c.severity === "critical").length;
  const acknowledgedCount = crises.filter((c) => c.status === "acknowledged").length;
  const resolvedCount = crises.filter((c) => c.status === "resolved").length;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Crisis", href: "/dashboard/crisis" }, { label: "Alerts" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Crisis Alerts</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">All alerts and notifications from the Early Warning System</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={acknowledgeAll}><CheckCircle size={14} /> Acknowledge All</Button>
          <Button variant="ghost" size="sm"><Archive size={14} /> Archive</Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {["All Alerts", "Critical", "High", "Medium", "Low", "Acknowledged", "Resolved"].map((tab) => (
          <button key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-xl text-[14px] font-medium uppercase tracking-[0.2px] transition-all whitespace-nowrap ${
              filter === tab ? "bg-accent-lime text-ink-deep" : "bg-accent-violet-mid/30 text-on-dark-muted hover:text-on-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredCrises.map((alert) => (
          <AlertCard key={alert.id}
            severity={alert.severity}
            title={alert.title}
            summary={alert.summary}
            timestamp={alert.started}
            negativeCount={alert.mentions}
            totalCount={alert.mentions}
            negativePct={0}
            status={alert.status}
          />
        ))}
        {filteredCrises.length === 0 && (
          <div className="lg:col-span-2 text-center py-12 text-on-dark-muted">
            <CheckCircle size={40} className="mx-auto text-accent-lime mb-3" />
            <p className="text-[18px] font-medium">No {filter.toLowerCase()} alerts</p>
          </div>
        )}
      </div>

      <WidgetCard title="Alert Statistics">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Today", value: String(total), icon: AlertTriangle, color: "text-severity-critical" },
            { label: "Critical", value: String(criticalCount), icon: AlertTriangle, color: "text-severity-critical" },
            { label: "Acknowledged", value: String(acknowledgedCount), icon: CheckCircle, color: "text-sentiment-neutral" },
            { label: "Resolved", value: String(resolvedCount), icon: Archive, color: "text-sentiment-positive" },
          ].map((s) => (
            <div key={s.label} className="text-center p-4 rounded-xl bg-ink-deep border border-hairline-violet">
              <s.icon size={24} className={`mx-auto mb-2 ${s.color}`} />
              <div className="text-[28px] font-semibold">{s.value}</div>
              <p className="text-[14px] text-on-dark-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </WidgetCard>
    </div>
  );
}
