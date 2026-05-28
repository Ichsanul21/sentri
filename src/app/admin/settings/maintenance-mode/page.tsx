"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Wrench } from "lucide-react";

export default function MaintenanceModePage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [message, setMessage] = useState("Scheduled maintenance in progress. The platform will be back shortly.");

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Maintenance Mode" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Maintenance Mode</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Enable or disable platform maintenance mode</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WidgetCard title={<><Wrench size={18} className="text-accent-lime" /> Status</>}>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded bg-ink-deep border border-hairline-violet">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${maintenanceMode ? "bg-warning" : "bg-accent-lime"}`} />
                <div>
                  <p className="text-[18px] font-semibold">{maintenanceMode ? "Maintenance Mode Active" : "System Operational"}</p>
                  <p className="text-[14px] text-on-dark-muted">
                    {maintenanceMode
                      ? "Users cannot access the platform. Only admins can log in."
                      : "All services operating normally."}
                  </p>
                </div>
              </div>
              <Badge variant={maintenanceMode ? "warning" : "sentiment-positive"}>
                {maintenanceMode ? "Active" : "Normal"}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[16px] font-medium">Enable Maintenance Mode</p>
                <p className="text-[14px] text-on-dark-muted">Block user access for scheduled maintenance</p>
              </div>
              <button
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`w-12 h-6 rounded-full transition-colors ${maintenanceMode ? "bg-warning" : "bg-hairline-violet"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${maintenanceMode ? "translate-x-6.5" : "translate-x-0.5"}`} />
              </button>
            </div>
          </div>
        </WidgetCard>

        <WidgetCard title={<><AlertTriangle size={18} className="text-warning" /> Custom Message</>}>
          <div className="space-y-4">
            <p className="text-[14px] text-on-dark-muted">
              This message will be shown to all users attempting to access the platform.
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              disabled={!maintenanceMode}
              className="w-full bg-accent-violet-mid/30 text-on-primary text-[16px] rounded-md px-3 py-2 border border-hairline-violet outline-none focus:ring-2 focus:ring-ring-focus resize-none disabled:opacity-50"
            />
            <div className="text-[13px] text-on-dark-muted">
              <p>Preview:</p>
              <div className="mt-1 p-3 rounded bg-ink-deep border border-hairline-violet text-center">
                <AlertTriangle size={24} className="text-warning mx-auto mb-2" />
                <p className="text-[16px] font-medium">{message || "Maintenance in progress"}</p>
              </div>
            </div>
          </div>
        </WidgetCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WidgetCard title="Schedule Maintenance">
          <div className="space-y-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] text-on-dark-muted">Start Time</label>
              <input type="datetime-local"
                className="w-full bg-accent-violet-mid/30 text-on-primary text-[16px] rounded-md px-3 py-2 border border-hairline-violet outline-none focus:ring-2 focus:ring-ring-focus" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] text-on-dark-muted">Expected Duration</label>
              <input type="text" placeholder="e.g. 2 hours"
                className="w-full bg-accent-violet-mid/30 text-on-primary text-[16px] rounded-md px-3 py-2 border border-hairline-violet outline-none focus:ring-2 focus:ring-ring-focus" />
            </div>
            <Button variant="violet-token" className="w-full">Schedule</Button>
          </div>
        </WidgetCard>

        <WidgetCard title="Maintenance History">
          <div className="space-y-2">
            {[
              { date: "May 25, 2026 02:00-04:00", desc: "Database migration v15.4", status: "completed" as const },
              { date: "May 18, 2026 01:00-01:30", desc: "Security patch deployment", status: "completed" as const },
              { date: "May 10, 2026 03:00-05:00", desc: "Elasticsearch cluster upgrade", status: "completed" as const },
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded bg-ink-deep border border-hairline-violet">
                <div>
                  <p className="text-[14px] font-medium">{m.desc}</p>
                  <p className="text-[13px] text-on-dark-muted">{m.date}</p>
                </div>
                <Badge variant="sentiment-positive">{m.status}</Badge>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button variant={maintenanceMode ? "warning" : "primary"}>
          <Shield size={16} /> {maintenanceMode ? "Disable Maintenance Mode" : "Enable Maintenance Mode"}
        </Button>
      </div>
    </div>
  );
}
