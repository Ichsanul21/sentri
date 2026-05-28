"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import { generateId } from "@/lib/storage";
import { getItem, setItem } from "@/lib/storage";
import { UserPlus, Mail, X } from "lucide-react";
import type { User } from "@/contexts/AuthContext";

export default function InviteUserPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("analyst");
  const [invited, setInvited] = useState<{ email: string; role: string }[]>([]);

  const handleInvite = () => {
    if (!email) { toast("Please enter an email", "error"); return; }
    const existing = getItem<User[]>("sentri_users", []);
    if (existing.some((u) => u.email === email)) {
      toast("User already exists", "error");
      return;
    }
    const newUser: User = {
      id: generateId(),
      name: email.split("@")[0],
      email,
      company: "",
      role: role as User["role"],
    };
    setItem("sentri_users", [...existing, newUser]);
    setInvited([...invited, { email, role }]);
    setEmail("");
    toast(`Invitation sent to ${email}`, "success");
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Users", href: "/admin/users" }, { label: "Invite" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Undang Pengguna Baru</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Kirim undangan ke anggota tim Anda</p>
      </div>

      <WidgetCard title="Detail Undangan">
        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[16px] font-medium leading-[1.5] text-on-primary/80">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@perusahaan.com"
              className="bg-surface-canvas-light text-ink-deep text-[16px] font-medium leading-[1.5] px-3 py-2 rounded-[6px] border border-hairline-cool outline-none transition-all focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] focus:ring-2 focus:ring-ring-focus"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[16px] font-medium leading-[1.5] text-on-primary/80">Role</label>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={[
                { value: "super_admin", label: "Super Admin" },
                { value: "manager", label: "Manager" },
                { value: "analyst", label: "Analyst" },
                { value: "viewer", label: "Viewer" },
              ]}
            />
          </div>

          <Button variant="primary" onClick={handleInvite} className="w-full">
            <UserPlus size={16} /> Kirim Undangan
          </Button>
        </div>
      </WidgetCard>

      {invited.length > 0 && (
        <WidgetCard title="Undangan Terkirim">
          <div className="divide-y divide-hairline-violet/30 -mx-4">
            {invited.map((inv, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-accent-lime" />
                  <span className="text-[16px]">{inv.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">{inv.role}</Badge>
                  <Badge variant="sentiment-positive">Pending</Badge>
                  <button className="text-on-dark-muted hover:text-sentiment-negative transition-colors">
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>
      )}
    </div>
  );
}
