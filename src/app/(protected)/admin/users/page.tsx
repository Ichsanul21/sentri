"use client";

import { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserTable } from "@/components/admin/user-table";
import { useAuth } from "@/contexts/AuthContext";
import { Search, Plus } from "lucide-react";
import type { AdminUser } from "@/types/admin";

export default function AdminUsersPage() {
  const { users: authUsers } = useAuth();
  const users: AdminUser[] = authUsers.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    status: "active" as const,
    createdAt: new Date(),
  }));

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Users" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">User Management</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Manage users, roles, and permissions</p>
        </div>
        <Link href="/admin/users/invite">
          <Button variant="primary"><Plus size={18} /> Invite User</Button>
        </Link>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted" />
          <input className="w-full bg-surface-night text-on-primary text-[14px] pl-9 pr-3 py-2 rounded-md border border-hairline-violet outline-none focus:ring-1 focus:ring-accent-lime/30" placeholder="Search users..." />
        </div>
        <select className="bg-accent-violet-mid/30 text-on-primary text-[14px] rounded-md px-3 py-2 border border-hairline-violet outline-none">
          <option>All Roles</option>
          <option>Super Admin</option>
          <option>Manager</option>
          <option>Analyst</option>
          <option>Viewer</option>
        </select>
      </div>

      <WidgetCard>
        <UserTable users={users} />
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-hairline-violet/50 text-[14px]">
          <span className="text-on-dark-muted">Showing 1-5 of 24 users</span>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm">Prev</Button>
            <Button variant="violet-token" size="sm">1</Button>
            <Button variant="ghost" size="sm">2</Button>
            <Button variant="ghost" size="sm">3</Button>
            <Button variant="ghost" size="sm">Next</Button>
          </div>
        </div>
      </WidgetCard>
    </div>
  );
}
