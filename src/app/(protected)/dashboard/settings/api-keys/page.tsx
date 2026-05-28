"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApiKeyManager } from "@/components/admin/api-key-manager";
import { useLoading } from "@/hooks/use-loading";
import type { ApiKey } from "@/types/admin";

const mockKeys: ApiKey[] = [
  {
    id: "key-1",
    tenantId: "tenant-1",
    name: "Production",
    keyPrefix: "sk_prod_",
    environment: "production",
    createdAt: new Date("2025-01-15"),
    lastUsedAt: new Date("2026-05-27"),
    status: "active",
  },
  {
    id: "key-2",
    tenantId: "tenant-1",
    name: "Testing",
    keyPrefix: "sk_test_",
    environment: "testing",
    createdAt: new Date("2025-03-20"),
    lastUsedAt: new Date("2026-04-10"),
    status: "active",
  },
  {
    id: "key-3",
    tenantId: "tenant-1",
    name: "Staging",
    keyPrefix: "sk_stag_",
    environment: "testing",
    createdAt: new Date("2025-06-01"),
    lastUsedAt: new Date("2026-02-18"),
    status: "revoked",
  },
];

const webhookEndpoints = [
  { id: "wh-1", url: "https://api.example.com/webhooks/sentri", events: ["mention.created", "mention.updated"], status: "active" as const, lastTriggered: "2026-05-28T10:30:00Z" },
  { id: "wh-2", url: "https://hooks.slack.com/services/xxx", events: ["crisis.detected"], status: "active" as const, lastTriggered: "2026-05-27T22:15:00Z" },
];

const tiers = [
  { name: "Free", requests: "100/jam", features: ["Basic API", "1 key"] },
  { name: "Pro", requests: "1.000/jam", features: ["Full API", "10 keys", "Webhooks"] },
  { name: "Enterprise", requests: "Custom", features: ["Unlimited keys", "Dedicated support", "SLA"] },
] as const;

export default function ApiKeysPage() {
  const { loading } = useLoading(mockKeys, 600);
  const [keys, setKeys] = useState<ApiKey[]>(mockKeys);

  const handleGenerate = (name: string, env: "production" | "testing") => {
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      tenantId: "tenant-1",
      name,
      keyPrefix: `sk_${env === "production" ? "prod" : "test"}_`,
      environment: env,
      createdAt: new Date(),
      status: "active",
    };
    setKeys((prev) => [...prev, newKey]);
  };

  const handleRevoke = (id: string) => {
    setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, status: "revoked" as const } : k)));
  };

  const handleRotate = (id: string) => {
    setKeys((prev) =>
      prev.map((k) =>
        k.id === id ? { ...k, keyPrefix: `${k.keyPrefix.slice(0, -1)}${Math.random().toString(36).slice(2, 4)}_` } : k
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Breadcrumbs items={[{ label: "Settings", href: "/dashboard/settings" }, { label: "API Keys" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">API Keys</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Manage your API access keys</p>
      </div>

      <WidgetCard title="API Access Keys">
        {loading ? (
          <div className="flex items-center justify-center h-32 text-on-dark-muted text-[16px]">Loading keys...</div>
        ) : (
          <ApiKeyManager keys={keys} onGenerate={handleGenerate} onRevoke={handleRevoke} onRotate={handleRotate} />
        )}
      </WidgetCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WidgetCard title="Webhook Endpoints">
          <div className="space-y-3">
            {webhookEndpoints.map((wh) => (
              <div key={wh.id} className="bg-ink-deep border border-hairline-violet rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[14px] font-mono text-on-dark-muted truncate flex-1">{wh.url}</span>
                  <Badge variant={wh.status === "active" ? "sentiment-positive" : "sentiment-negative"}>
                    {wh.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[12px] text-on-dark-muted">Events:</span>
                  {wh.events.map((ev) => (
                    <Badge key={ev} variant="default">{ev}</Badge>
                  ))}
                </div>
                <p className="text-[12px] text-on-dark-muted mt-1">
                  Last triggered: {new Date(wh.lastTriggered).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </WidgetCard>

        <WidgetCard title="Rate Limits">
          <div className="space-y-3">
            {tiers.map((tier) => (
              <div key={tier.name} className="bg-ink-deep border border-hairline-violet rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[16px] font-semibold">{tier.name}</span>
                  <Badge variant={tier.name === "Free" ? "sentiment-neutral" : tier.name === "Pro" ? "sentiment-positive" : "lime"}>
                    {tier.requests}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tier.features.map((f) => (
                    <Badge key={f} variant="default">{f}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
