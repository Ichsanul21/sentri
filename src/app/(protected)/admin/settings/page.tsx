"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Bell, Shield, Globe, Palette } from "lucide-react";

export default function AdminSettingsPage() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Settings" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Settings</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Manage account and system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WidgetCard title={<><Shield size={18} className="text-accent-lime" /> Security</>}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[16px] font-medium">Two-Factor Authentication</p>
                <p className="text-[14px] text-on-dark-muted">Add extra security to your account</p>
              </div>
              <button
                onClick={() => setTwoFactor(!twoFactor)}
                className={`w-12 h-6 rounded-full transition-colors ${twoFactor ? "bg-accent-lime" : "bg-hairline-violet"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${twoFactor ? "translate-x-6.5" : "translate-x-0.5"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[16px] font-medium">Password</p>
                <p className="text-[14px] text-on-dark-muted">Last changed 3 months ago</p>
              </div>
              <Button variant="violet-token" size="sm">Change</Button>
            </div>
          </div>
        </WidgetCard>

        <WidgetCard title={<><Bell size={18} className="text-accent-pink" /> Notifications</>}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[16px] font-medium">Email Notifications</p>
                <p className="text-[14px] text-on-dark-muted">Daily digest and alerts</p>
              </div>
              <button
                onClick={() => setEmailNotif(!emailNotif)}
                className={`w-12 h-6 rounded-full transition-colors ${emailNotif ? "bg-accent-lime" : "bg-hairline-violet"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${emailNotif ? "translate-x-6.5" : "translate-x-0.5"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[16px] font-medium">Push Notifications</p>
                <p className="text-[14px] text-on-dark-muted">Real-time crisis alerts</p>
              </div>
              <button
                onClick={() => setPushNotif(!pushNotif)}
                className={`w-12 h-6 rounded-full transition-colors ${pushNotif ? "bg-accent-lime" : "bg-hairline-violet"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${pushNotif ? "translate-x-6.5" : "translate-x-0.5"}`} />
              </button>
            </div>
          </div>
        </WidgetCard>

        <WidgetCard title={<><Globe size={18} className="text-accent-violet" /> Localization</>}>
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] text-on-dark-muted">Language</label>
              <select className="bg-accent-violet-mid/30 text-on-primary text-[16px] rounded-md px-3 py-2 border border-hairline-violet outline-none focus:ring-2 focus:ring-ring-focus">
                <option>Bahasa Indonesia</option>
                <option>English</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] text-on-dark-muted">Timezone</label>
              <select className="bg-accent-violet-mid/30 text-on-primary text-[16px] rounded-md px-3 py-2 border border-hairline-violet outline-none focus:ring-2 focus:ring-ring-focus">
                <option>Asia/Jakarta (WIB)</option>
                <option>Asia/Makassar (WITA)</option>
                <option>Asia/Jayapura (WIT)</option>
              </select>
            </div>
          </div>
        </WidgetCard>

        <WidgetCard title={<><Palette size={18} className="text-accent-lime" /> Appearance</>}>
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] text-on-dark-muted">Theme</label>
              <select className="bg-accent-violet-mid/30 text-on-primary text-[16px] rounded-md px-3 py-2 border border-hairline-violet outline-none focus:ring-2 focus:ring-ring-focus">
                <option>Dark (Default)</option>
                <option>Light</option>
              </select>
            </div>
          </div>
        </WidgetCard>
      </div>

      <div className="flex justify-end">
        <Button variant="primary"><Save size={16} /> Save Settings</Button>
      </div>
    </div>
  );
}
