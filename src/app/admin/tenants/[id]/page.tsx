"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Settings, Users, BarChart3, HardDrive, Activity } from "lucide-react";

const tenantData = {
  id: "tenant-1",
  name: "Acme Corporation",
  slug: "acme-corp",
  status: "active" as const,
  plan: "Enterprise",
  created: "2025-11-01",
  contactEmail: "admin@acme.com",
  userCount: 12,
  brandCount: 3,
  usageMetrics: {
    mentionsThisMonth: 4230,
    mentionQuota: 10000,
    apiCalls24h: 1250,
    storageUsed: "2.4 GB",
    storageQuota: "10 GB",
  },
  config: {
    mfaRequired: true,
    sessionTimeout: "60 minutes",
    maxBrands: 5,
    apiRateLimit: "5000/hour",
  },
};

export default function TenantDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Tenants", href: "/admin/tenants" }, { label: id }]} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/tenants" className="text-on-dark-muted hover:text-on-primary transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-[30px] font-medium leading-[1.2]">{tenantData.name}</h1>
            <p className="text-[16px] text-on-dark-muted mt-1">{tenantData.slug} · Created {tenantData.created}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="sentiment-positive" className="px-4 py-1">{tenantData.status}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <WidgetCard><div className="text-center py-2"><Users size={24} className="text-accent-lime mx-auto mb-2" /><p className="text-[28px] font-semibold">{tenantData.userCount}</p><p className="text-[14px] text-on-dark-muted">Users</p></div></WidgetCard>
        <WidgetCard><div className="text-center py-2"><BarChart3 size={24} className="text-accent-pink mx-auto mb-2" /><p className="text-[28px] font-semibold">{tenantData.brandCount}</p><p className="text-[14px] text-on-dark-muted">Brands</p></div></WidgetCard>
        <WidgetCard><div className="text-center py-2"><Activity size={24} className="text-accent-violet mx-auto mb-2" /><p className="text-[28px] font-semibold">{tenantData.usageMetrics.apiCalls24h.toLocaleString()}</p><p className="text-[14px] text-on-dark-muted">API Calls (24h)</p></div></WidgetCard>
        <WidgetCard><div className="text-center py-2"><HardDrive size={24} className="text-accent-lime mx-auto mb-2" /><p className="text-[28px] font-semibold">{tenantData.usageMetrics.storageUsed}</p><p className="text-[14px] text-on-dark-muted">Storage Used</p></div></WidgetCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WidgetCard title="Usage Metrics">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[14px] mb-1">
                <span className="text-on-dark-muted">Mentions This Month</span>
                <span>{tenantData.usageMetrics.mentionsThisMonth.toLocaleString()} / {tenantData.usageMetrics.mentionQuota.toLocaleString()}</span>
              </div>
              <div className="w-full bg-hairline-violet/30 rounded-full h-2">
                <div className="bg-accent-lime h-2 rounded-full" style={{ width: `${(tenantData.usageMetrics.mentionsThisMonth / tenantData.usageMetrics.mentionQuota) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[14px] mb-1">
                <span className="text-on-dark-muted">Storage</span>
                <span>{tenantData.usageMetrics.storageUsed} / {tenantData.usageMetrics.storageQuota}</span>
              </div>
              <div className="w-full bg-hairline-violet/30 rounded-full h-2">
                <div className="bg-accent-pink h-2 rounded-full" style={{ width: "24%" }} />
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-on-dark-muted">API Rate Limit</span>
              <span>{tenantData.config.apiRateLimit}</span>
            </div>
          </div>
        </WidgetCard>

        <WidgetCard title={<><Settings size={16} className="text-accent-lime" /> Tenant Configuration</>}>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-on-dark-muted text-[14px]">Plan</span>
              <Badge variant="default">{tenantData.plan}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-on-dark-muted text-[14px]">Contact Email</span>
              <span className="text-[16px]">{tenantData.contactEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-dark-muted text-[14px]">MFA Required</span>
              <Badge variant={tenantData.config.mfaRequired ? "sentiment-positive" : "sentiment-negative"}>{tenantData.config.mfaRequired ? "Enabled" : "Disabled"}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-on-dark-muted text-[14px]">Session Timeout</span>
              <span className="text-[16px]">{tenantData.config.sessionTimeout}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-dark-muted text-[14px]">Max Brands</span>
              <span className="text-[16px]">{tenantData.config.maxBrands}</span>
            </div>
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
