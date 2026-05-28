"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import Link from "next/link";
import { Activity, Bug, Ban, ScrollText } from "lucide-react";

const monitoringCards = [
  { href: "/admin/monitoring/system-health", icon: Activity, label: "System Health", desc: "Service status and uptime", color: "text-accent-lime" },
  { href: "/admin/monitoring/error-tracking", icon: Bug, label: "Error Tracking", desc: "Application errors and exceptions", color: "text-severity-critical" },
  { href: "/admin/monitoring/rate-limiting", icon: Ban, label: "Rate Limiting", desc: "API usage and throttling", color: "text-severity-high" },
  { href: "/admin/monitoring/api-logs", icon: ScrollText, label: "API Logs", desc: "Request and response logs", color: "text-accent-violet" },
];

export default function AdminMonitoringPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Monitoring" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">System Monitoring</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Monitor system health, errors, and API usage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {monitoringCards.map((card) => (
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
    </div>
  );
}
