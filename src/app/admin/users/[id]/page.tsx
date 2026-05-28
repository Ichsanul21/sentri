"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Ban, Trash2, Edit3 } from "lucide-react";

const mockUser = {
  id: "1",
  name: "Alice Manager",
  email: "alice@company.com",
  role: "Manager",
  status: "active" as const,
  lastLogin: new Date("2026-05-28T09:15:00"),
  createdAt: new Date("2026-01-15"),
  brandCount: 3,
  tenantName: "Acme Corp",
};

const mockActivity = [
  { timestamp: "2026-05-28 09:15", action: "Login", detail: "Successful login from 192.168.1.100", severity: "info" as const },
  { timestamp: "2026-05-28 08:30", action: "Create Report", detail: "Generated sentiment report for Brand A", severity: "info" as const },
  { timestamp: "2026-05-27 16:45", action: "Update Settings", detail: "Changed notification preferences", severity: "info" as const },
  { timestamp: "2026-05-27 14:20", action: "Export Data", detail: "Exported CSV of mentions", severity: "info" as const },
  { timestamp: "2026-05-26 11:00", action: "Password Change", detail: "Password changed successfully", severity: "warning" as const },
  { timestamp: "2026-05-25 09:30", action: "Failed Login", detail: "Failed login attempt from 10.0.0.55", severity: "error" as const },
  { timestamp: "2026-05-24 15:10", action: "API Call", detail: "POST /api/v1/sentiment/batch", severity: "info" as const },
];

export default function UserDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Users", href: "/admin/users" }, { label: id }]} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/users" className="text-on-dark-muted hover:text-on-primary transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-[30px] font-medium leading-[1.2]">{mockUser.name}</h1>
            <p className="text-[16px] text-on-dark-muted mt-1">User detail and activity</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="violet-token" size="sm"><Edit3 size={14} /> Edit Role</Button>
          <Button variant="ghost" size="sm"><Ban size={14} /> Disable User</Button>
          <Button variant="ghost" size="sm" className="text-sentiment-negative hover:text-sentiment-negative"><Trash2 size={14} /> Delete</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <WidgetCard title="User Information">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-on-dark-muted text-[14px]">Name</span>
              <span className="text-[16px]">{mockUser.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-dark-muted text-[14px]">Email</span>
              <span className="text-[16px]">{mockUser.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-dark-muted text-[14px]">Role</span>
              <Badge variant="default">{mockUser.role}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-on-dark-muted text-[14px]">Status</span>
              <Badge variant="sentiment-positive">{mockUser.status}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-on-dark-muted text-[14px]">Tenant</span>
              <span className="text-[16px]">{mockUser.tenantName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-dark-muted text-[14px]">Brands</span>
              <span className="text-[16px]">{mockUser.brandCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-dark-muted text-[14px]">Last Login</span>
              <span className="text-[16px]">{mockUser.lastLogin.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-dark-muted text-[14px]">Created</span>
              <span className="text-[16px]">{mockUser.createdAt.toLocaleDateString()}</span>
            </div>
          </div>
        </WidgetCard>

        <WidgetCard title="Role & Permissions" className="lg:col-span-2">
          <div className="space-y-3">
            <h3 className="text-[16px] font-semibold flex items-center gap-2"><Shield size={16} className="text-accent-lime" /> Current Permissions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Dashboard: View all", "Sentiment: View & Export", "Brands: Manage", "Reports: Create & Edit",
                "Crisis: Monitor & Escalate", "Users: View only", "API: Read access", "Settings: View only",
              ].map((perm) => (
                <div key={perm} className="flex items-center gap-2 text-[14px]">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                  <span>{perm}</span>
                </div>
              ))}
            </div>
          </div>
        </WidgetCard>
      </div>

      <WidgetCard title="Recent Activity Log">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-hairline-violet/50">
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Timestamp</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Action</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Detail</th>
                <th className="text-right py-2 text-[14px] font-medium text-on-dark-muted">Severity</th>
              </tr>
            </thead>
            <tbody>
              {mockActivity.map((act, i) => (
                <tr key={i} className="border-b border-hairline-violet/30 hover:bg-accent-lime/4 transition-colors">
                  <td className="py-3 text-[14px] text-on-dark-muted">{act.timestamp}</td>
                  <td className="py-3 text-[16px]">{act.action}</td>
                  <td className="py-3 text-[14px] text-on-dark-muted">{act.detail}</td>
                  <td className="py-3 text-right">
                    <Badge variant={act.severity === "error" ? "sentiment-negative" : act.severity === "warning" ? "warning" : "sentiment-positive"}>
                      {act.severity}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WidgetCard>
    </div>
  );
}
