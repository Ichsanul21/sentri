"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Key, Clock, Save } from "lucide-react";

export default function SecuritySettingsPage() {
  const [mfaRequired, setMfaRequired] = useState(true);
  const [passwordPolicy, setPasswordPolicy] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [lockoutEnabled, setLockoutEnabled] = useState(true);
  const [minPasswordLength, setMinPasswordLength] = useState("12");
  const [sessionTimeoutMin, setSessionTimeoutMin] = useState("60");

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Security" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Security Settings</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Configure security policies for all tenants</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WidgetCard title={<><Shield size={18} className="text-accent-lime" /> Authentication</>}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[16px] font-medium">Require MFA</p>
                <p className="text-[14px] text-on-dark-muted">Enforce multi-factor authentication for all users</p>
              </div>
              <button
                onClick={() => setMfaRequired(!mfaRequired)}
                className={`w-12 h-6 rounded-full transition-colors ${mfaRequired ? "bg-accent-lime" : "bg-hairline-violet"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${mfaRequired ? "translate-x-6.5" : "translate-x-0.5"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[16px] font-medium">Account Lockout</p>
                <p className="text-[14px] text-on-dark-muted">Lock after 5 failed attempts (15 min cooldown)</p>
              </div>
              <button
                onClick={() => setLockoutEnabled(!lockoutEnabled)}
                className={`w-12 h-6 rounded-full transition-colors ${lockoutEnabled ? "bg-accent-lime" : "bg-hairline-violet"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${lockoutEnabled ? "translate-x-6.5" : "translate-x-0.5"}`} />
              </button>
            </div>
          </div>
        </WidgetCard>

        <WidgetCard title={<><Key size={18} className="text-accent-pink" /> Password Policy</>}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[16px] font-medium">Enforce Strong Password</p>
                <p className="text-[14px] text-on-dark-muted">Require mixed case, numbers, and symbols</p>
              </div>
              <button
                onClick={() => setPasswordPolicy(!passwordPolicy)}
                className={`w-12 h-6 rounded-full transition-colors ${passwordPolicy ? "bg-accent-lime" : "bg-hairline-violet"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${passwordPolicy ? "translate-x-6.5" : "translate-x-0.5"}`} />
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] text-on-dark-muted">Minimum Password Length</label>
              <input
                type="number"
                value={minPasswordLength}
                onChange={(e) => setMinPasswordLength(e.target.value)}
                className="bg-accent-violet-mid/30 text-on-primary text-[16px] rounded-md px-3 py-2 border border-hairline-violet outline-none focus:ring-2 focus:ring-ring-focus max-w-[120px]"
              />
            </div>
          </div>
        </WidgetCard>

        <WidgetCard title={<><Clock size={18} className="text-accent-violet" /> Session & Timeout</>}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[16px] font-medium">Session Timeout</p>
                <p className="text-[14px] text-on-dark-muted">Auto-logout idle sessions</p>
              </div>
              <button
                onClick={() => setSessionTimeout(!sessionTimeout)}
                className={`w-12 h-6 rounded-full transition-colors ${sessionTimeout ? "bg-accent-lime" : "bg-hairline-violet"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${sessionTimeout ? "translate-x-6.5" : "translate-x-0.5"}`} />
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] text-on-dark-muted">Timeout Duration (minutes)</label>
              <input
                type="number"
                value={sessionTimeoutMin}
                onChange={(e) => setSessionTimeoutMin(e.target.value)}
                className="bg-accent-violet-mid/30 text-on-primary text-[16px] rounded-md px-3 py-2 border border-hairline-violet outline-none focus:ring-2 focus:ring-ring-focus max-w-[120px]"
              />
            </div>
          </div>
        </WidgetCard>

        <WidgetCard title={<><Shield size={18} className="text-accent-lime" /> Current Security Posture</>}>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-on-dark-muted">MFA Enforcement</span>
              <Badge variant="sentiment-positive">Active</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-on-dark-muted">Password Policy</span>
              <Badge variant="sentiment-positive">Active</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-on-dark-muted">Session Timeout</span>
              <Badge variant="default">60 min</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-on-dark-muted">Last Audit</span>
              <span className="text-[14px]">May 27, 2026</span>
            </div>
          </div>
        </WidgetCard>
      </div>

      <div className="flex justify-end">
        <Button variant="primary"><Save size={16} /> Save Security Settings</Button>
      </div>
    </div>
  );
}
