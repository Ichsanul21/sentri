"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Send, Save, RefreshCw } from "lucide-react";

export default function EmailSettingsPage() {
  const [host, setHost] = useState("smtp.sendgrid.net");
  const [port, setPort] = useState("587");
  const [username, setUsername] = useState("apikey");
  const [password, setPassword] = useState("••••••••••••••••");
  const [fromAddress, setFromAddress] = useState("noreply@sentri.io");
  const [fromName, setFromName] = useState("Sentri Notification");
  const [tls, setTls] = useState(true);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Settings", href: "/admin/settings" }, { label: "Email" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Email Configuration</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Configure SMTP settings for system notifications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WidgetCard title={<><Mail size={18} className="text-accent-pink" /> SMTP Settings</>}>
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] text-on-dark-muted">SMTP Host</label>
              <input type="text" value={host} onChange={(e) => setHost(e.target.value)}
                className="bg-accent-violet-mid/30 text-on-primary text-[16px] rounded-md px-3 py-2 border border-hairline-violet outline-none focus:ring-2 focus:ring-ring-focus" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[14px] text-on-dark-muted">Port</label>
                <input type="number" value={port} onChange={(e) => setPort(e.target.value)}
                  className="bg-accent-violet-mid/30 text-on-primary text-[16px] rounded-md px-3 py-2 border border-hairline-violet outline-none focus:ring-2 focus:ring-ring-focus" />
              </div>
              <div className="flex items-end pb-2">
                <button
                  onClick={() => setTls(!tls)}
                  className={`w-12 h-6 rounded-full transition-colors ${tls ? "bg-accent-lime" : "bg-hairline-violet"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${tls ? "translate-x-6.5" : "translate-x-0.5"}"`} />
                </button>
                <span className="ml-2 text-[14px]">TLS</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] text-on-dark-muted">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                className="bg-accent-violet-mid/30 text-on-primary text-[16px] rounded-md px-3 py-2 border border-hairline-violet outline-none focus:ring-2 focus:ring-ring-focus" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] text-on-dark-muted">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="bg-accent-violet-mid/30 text-on-primary text-[16px] rounded-md px-3 py-2 border border-hairline-violet outline-none focus:ring-2 focus:ring-ring-focus" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] text-on-dark-muted">From Address</label>
              <input type="email" value={fromAddress} onChange={(e) => setFromAddress(e.target.value)}
                className="bg-accent-violet-mid/30 text-on-primary text-[16px] rounded-md px-3 py-2 border border-hairline-violet outline-none focus:ring-2 focus:ring-ring-focus" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] text-on-dark-muted">From Name</label>
              <input type="text" value={fromName} onChange={(e) => setFromName(e.target.value)}
                className="bg-accent-violet-mid/30 text-on-primary text-[16px] rounded-md px-3 py-2 border border-hairline-violet outline-none focus:ring-2 focus:ring-ring-focus" />
            </div>
          </div>
        </WidgetCard>

        <div className="space-y-4">
          <WidgetCard title="Connection Status">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-accent-lime" />
              <div>
                <p className="text-[16px] font-semibold">Connected</p>
                <p className="text-[14px] text-on-dark-muted">SMTP server last verified May 28, 2026 10:30 AM</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-[14px]">
              <div className="flex justify-between"><span className="text-on-dark-muted">Server</span><span>{host}:{port}</span></div>
              <div className="flex justify-between"><span className="text-on-dark-muted">Auth Method</span><span>LOGIN</span></div>
              <div className="flex justify-between"><span className="text-on-dark-muted">Encryption</span><span>{tls ? "STARTTLS" : "None"}</span></div>
            </div>
          </WidgetCard>

          <WidgetCard title="Test Email">
            <div className="space-y-3">
              <p className="text-[14px] text-on-dark-muted">Send a test email to verify configuration</p>
              <input type="email" placeholder="recipient@example.com"
                className="w-full bg-accent-violet-mid/30 text-on-primary text-[16px] rounded-md px-3 py-2 border border-hairline-violet outline-none focus:ring-2 focus:ring-ring-focus" />
              <Button variant="violet-token" className="w-full"><Send size={14} /> Send Test Email</Button>
            </div>
          </WidgetCard>

          <WidgetCard title="Email Templates">
            <div className="space-y-2 text-[14px]">
              {["Invitation Email", "Password Reset", "Crisis Alert", "Weekly Digest", "Invoice Notification"].map((tmpl) => (
                <div key={tmpl} className="flex items-center justify-between p-2 rounded hover:bg-accent-lime/4">
                  <span>{tmpl}</span>
                  <Badge variant="default">{tmpl === "Crisis Alert" ? "Custom" : "Default"}</Badge>
                </div>
              ))}
            </div>
          </WidgetCard>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="violet-token"><RefreshCw size={14} /> Test Connection</Button>
        <Button variant="primary"><Save size={16} /> Save Configuration</Button>
      </div>
    </div>
  );
}
