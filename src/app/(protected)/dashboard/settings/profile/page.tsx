"use client";

import { useState } from "react";
import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/toast";
import { Save, User, Mail, Globe, Loader2 } from "lucide-react";

export default function ProfileSettingsPage() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [company, setCompany] = useState(user?.company || "");
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updateProfile({ name, email, company });
      setSaving(false);
      toast("Profile updated successfully", "success");
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold leading-[1.3]">Profile Settings</h1>
        <p className="text-[14px] text-on-dark-muted mt-1">Manage your account profile and preferences.</p>
      </div>

      <WidgetCard title="Personal Information">
        <div className="space-y-4 max-w-md">
          <div>
            <label className="text-[14px] font-medium text-on-dark-muted block mb-1">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-hairline-violet bg-ink-deep text-on-primary text-[14px] outline-none focus:border-accent-lime/50" />
            </div>
          </div>
          <div>
            <label className="text-[14px] font-medium text-on-dark-muted block mb-1">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-hairline-violet bg-ink-deep text-on-primary text-[14px] outline-none focus:border-accent-lime/50" />
            </div>
          </div>
          <div>
            <label className="text-[14px] font-medium text-on-dark-muted block mb-1">Company</label>
            <div className="relative">
              <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted" />
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-hairline-violet bg-ink-deep text-on-primary text-[14px] outline-none focus:border-accent-lime/50" />
            </div>
          </div>
          <div className="pt-2">
            <Button variant="primary" size="sm" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </WidgetCard>
    </div>
  );
}
