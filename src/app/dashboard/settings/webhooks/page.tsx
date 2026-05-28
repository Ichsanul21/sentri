"use client";

import { useState } from "react";
import { RefreshCw, Plus, Trash2 } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Webhook {
  id: string;
  url: string;
  events: string[];
  status: "active" | "disabled" | "failing";
  lastTriggered: string | null;
}

const initialWebhooks: Webhook[] = [];

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState<Webhook[]>(initialWebhooks);

  const addWebhook = () => {
    const newWh: Webhook = {
      id: `wh-${Date.now()}`,
      url: `https://example.com/webhooks/new-${webhooks.length + 1}`,
      events: ["mention.created"],
      status: "active",
      lastTriggered: null,
    };
    setWebhooks((prev) => [...prev, newWh]);
  };

  const removeWebhook = (id: string) => {
    setWebhooks((prev) => prev.filter((wh) => wh.id !== id));
  };

  const statusBadge = (status: Webhook["status"]) => {
    const map: Record<Webhook["status"], { variant: "sentiment-positive" | "sentiment-negative" | "severity-high"; label: string }> = {
      active: { variant: "sentiment-positive", label: "Active" },
      disabled: { variant: "sentiment-negative", label: "Disabled" },
      failing: { variant: "severity-high", label: "Failing" },
    };
    const m = map[status];
    return <Badge variant={m.variant}>{m.label}</Badge>;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Breadcrumbs items={[{ label: "Settings", href: "/dashboard/settings" }, { label: "Webhooks" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Webhook Configuration</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Manage webhook endpoints for real-time event notifications</p>
      </div>

      <WidgetCard title="Webhook Endpoints">
        {webhooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-[20px] font-medium text-on-dark-muted mb-2">No webhooks configured</p>
            <p className="text-[14px] text-on-dark-muted/60 mb-6">Add a webhook to start receiving event notifications</p>
            <Button onClick={addWebhook}>
              <Plus size={16} />
              Add Webhook
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {webhooks.map((wh) => (
              <div key={wh.id} className="bg-ink-deep border border-hairline-violet rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[14px] text-on-primary truncate">{wh.url}</span>
                      {statusBadge(wh.status)}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[12px] text-on-dark-muted">Events:</span>
                      {wh.events.map((ev) => (
                        <Badge key={ev} variant="default">{ev}</Badge>
                      ))}
                    </div>
                    <p className="text-[12px] text-on-dark-muted mt-1">
                      {wh.lastTriggered ? `Last triggered: ${new Date(wh.lastTriggered).toLocaleString()}` : "Never triggered"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 ml-4 shrink-0">
                    <button className="p-1.5 rounded text-on-dark-muted hover:text-accent-lime transition-colors">
                      <RefreshCw size={14} />
                    </button>
                    <button
                      onClick={() => removeWebhook(wh.id)}
                      className="p-1.5 rounded text-on-dark-muted hover:text-sentiment-negative transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Button onClick={addWebhook}>
                <Plus size={16} />
                Add Webhook
              </Button>
            </div>
          </div>
        )}
      </WidgetCard>
    </div>
  );
}
