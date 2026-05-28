"use client";

import { Table, THead, TBody, THeadRow, Th, TBodyRow, Td } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { AdminUser } from "@/types/admin";

interface UserTableProps {
  users: AdminUser[];
  onRoleChange?: (id: string, role: string) => void;
  onStatusToggle?: (id: string) => void;
}

export function UserTable({ users, onRoleChange }: UserTableProps) {
  return (
    <Table>
      <THead>
        <THeadRow>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Role</Th>
          <Th>Status</Th>
          <Th>Last Login</Th>
          <Th>Actions</Th>
        </THeadRow>
      </THead>
      <TBody>
        {users.length === 0 ? (
          <TBodyRow>
            <Td colSpan={6} className="text-center text-on-dark-muted py-8">No users found</Td>
          </TBodyRow>
        ) : (
          users.map((user) => (
            <TBodyRow key={user.id}>
              <Td className="font-semibold">{user.name}</Td>
              <Td className="text-on-dark-muted">{user.email}</Td>
              <Td>
                {onRoleChange ? (
                  <select
                    value={user.role}
                    onChange={(e) => onRoleChange(user.id, e.target.value)}
                    className="bg-ink-deep text-on-primary text-[14px] rounded px-2 py-0.5 border border-hairline-violet outline-none"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="manager">Manager</option>
                    <option value="analyst">Analyst</option>
                    <option value="viewer">Viewer</option>
                  </select>
                ) : (
                  <span className="capitalize">{user.role.replace("_", " ")}</span>
                )}
              </Td>
              <Td>
                <Badge variant={user.status === "active" ? "sentiment-positive" : user.status === "invited" ? "severity-medium" : "severity-low"}>
                  {user.status}
                </Badge>
              </Td>
              <Td className="text-on-dark-muted">{user.lastLogin?.toLocaleDateString() || "—"}</Td>
              <Td>
                <button className="text-[14px] text-accent-lime hover:underline">Edit</button>
              </Td>
            </TBodyRow>
          ))
        )}
      </TBody>
    </Table>
  );
}
