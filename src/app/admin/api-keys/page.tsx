"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApiKeyManager } from "@/components/admin/api-key-manager";
import { Plus, RefreshCw } from "lucide-react";
import type { ApiKey } from "@/types/admin";

const defaultKeys: ApiKey[] = [
  { id: "key-1", tenantId: "tenant-1", name: "Production API Key", keyPrefix: "sk_live_2x8m9p4q5r", environment: "production", createdAt: new Date("2026-05-01"), lastUsedAt: new Date(), status: "active" },
  { id: "key-2", tenantId: "tenant-1", name: "Test API Key", keyPrefix: "sk_test_9v0w1x2y3z", environment: "testing", createdAt: new Date("2026-04-15"), lastUsedAt: new Date("2026-05-28"), status: "active" },
];

export default function ApiKeysPage() {
  const [keys, setKeys] = useState(defaultKeys);

  const handleGenerate = (name: string, env: "production" | "testing") => {
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      tenantId: "tenant-1",
      name,
      keyPrefix: `${env === "production" ? "sk_live_" : "sk_test_"}${Math.random().toString(36).slice(2, 14)}`,
      environment: env,
      createdAt: new Date(),
      status: "active",
    };
    setKeys((prev) => [...prev, newKey]);
  };

  const handleRevoke = (id: string) => {
    setKeys((prev) => prev.map((k) => k.id === id ? { ...k, status: "revoked" as const } : k));
  };

  const handleRotate = (id: string) => {
    setKeys((prev) => prev.map((k) => k.id === id ? { ...k, keyPrefix: `${k.keyPrefix.slice(0, 8)}${Math.random().toString(36).slice(2, 14)}` } : k));
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "API Keys" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">API & Integration Hub</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Manage API keys and webhook integrations</p>
        </div>
      </div>

      <ApiKeyManager
        keys={keys}
        onGenerate={handleGenerate}
        onRevoke={handleRevoke}
        onRotate={handleRotate}
      />

      <WidgetCard title="Webhook Endpoints">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded bg-ink-deep border border-hairline-violet">
            <div>
              <span className="text-[16px] font-semibold">Mention Created</span>
              <p className="text-[14px] text-on-dark-muted font-mono">https://api.company.com/webhooks/sentri</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="sentiment-positive">Active</Badge>
              <Button variant="ghost" size="sm">
                <RefreshCw size={14} />
              </Button>
            </div>
          </div>
          <Button variant="violet-token"><Plus size={16} /> Add Webhook</Button>
        </div>
      </WidgetCard>

      <WidgetCard title="Rate Limits">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>Free Tier</span>
            <span className="text-on-dark-muted">100 requests/hour</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Pro Tier</span>
            <span className="text-on-dark-muted">1,000 requests/hour</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Enterprise</span>
            <span className="text-accent-lime">Custom limits</span>
          </div>
        </div>
      </WidgetCard>
    </div>
  );
}
