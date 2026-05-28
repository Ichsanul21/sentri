"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("Asia/Jakarta");

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Breadcrumbs items={[{ label: "Settings" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Profile Settings</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Manage your account and preferences</p>
      </div>

      <WidgetCard title="Profile Information">
        <div className="space-y-4">
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Avatar URL"
            placeholder="https://example.com/avatar.jpg"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
          <Input
            label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <Input
            label="Timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          />
          <div className="pt-2">
            <Button>Save Changes</Button>
          </div>
        </div>
      </WidgetCard>
    </div>
  );
}
