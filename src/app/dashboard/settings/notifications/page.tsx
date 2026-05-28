"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ToggleState = Record<string, boolean>;

export default function NotificationsPage() {
  const [toggles, setToggles] = useState<ToggleState>({
    email: true,
    push: false,
    crisis: true,
    digest: true,
    weekly: false,
  });

  const toggle = (key: string) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const items = [
    { key: "email", label: "Email notifications", desc: "Receive alerts via email" },
    { key: "push", label: "Push notifications", desc: "Receive push notifications on your device" },
    { key: "crisis", label: "Crisis alerts", desc: "Immediate notifications for crisis events" },
    { key: "digest", label: "Daily digest", desc: "Daily summary of mentions and activity" },
    { key: "weekly", label: "Weekly report", desc: "Weekly performance report via email" },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Breadcrumbs items={[{ label: "Settings", href: "/dashboard/settings" }, { label: "Notifications" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Notification Preferences</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Control how and when you receive notifications</p>
      </div>

      <WidgetCard>
        <div className="space-y-1">
          {items.map(({ key, label, desc }) => (
            <div
              key={key}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-ink-deep transition-colors cursor-pointer"
              onClick={() => toggle(key)}
            >
              <div>
                <p className="text-[16px] font-semibold leading-[1.5]">{label}</p>
                <p className="text-[14px] text-on-dark-muted">{desc}</p>
              </div>
              <div
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  toggles[key] ? "bg-sentiment-positive" : "bg-surface-night border border-hairline-violet"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-on-primary shadow transition-transform ${
                    toggles[key] ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </WidgetCard>

      <WidgetCard title="Notification Summary">
        <div className="flex items-center gap-3">
          <Badge variant={toggles.email ? "sentiment-positive" : "sentiment-negative"}>
            {toggles.email ? "Email enabled" : "Email disabled"}
          </Badge>
          <Badge variant={toggles.crisis ? "severity-critical" : "sentiment-neutral"}>
            {toggles.crisis ? "Crisis alerts on" : "Crisis alerts off"}
          </Badge>
          <Badge variant={toggles.digest ? "sentiment-positive" : "sentiment-negative"}>
            {toggles.digest ? "Digest on" : "Digest off"}
          </Badge>
        </div>
      </WidgetCard>
    </div>
  );
}
