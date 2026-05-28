"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Download, Filter } from "lucide-react";

interface Invoice {
  id: string;
  tenant: string;
  amount: string;
  status: "paid" | "pending" | "past_due" | "canceled";
  date: string;
  dueDate: string;
  plan: string;
}

const invoices: Invoice[] = [
  { id: "INV-2026-001", tenant: "Acme Corporation", amount: "$2,500.00", status: "paid", date: "May 1, 2026", dueDate: "May 15, 2026", plan: "Enterprise" },
  { id: "INV-2026-002", tenant: "GlobalTech Industries", amount: "$99.00", status: "paid", date: "May 1, 2026", dueDate: "May 15, 2026", plan: "Pro" },
  { id: "INV-2026-003", tenant: "MegaBrand Corp", amount: "$2,500.00", status: "past_due", date: "May 1, 2026", dueDate: "May 15, 2026", plan: "Enterprise" },
  { id: "INV-2026-004", tenant: "DataStream Analytics", amount: "$99.00", status: "pending", date: "May 1, 2026", dueDate: "May 20, 2026", plan: "Pro" },
  { id: "INV-2026-005", tenant: "Acme Corporation", amount: "$2,500.00", status: "paid", date: "Apr 1, 2026", dueDate: "Apr 15, 2026", plan: "Enterprise" },
  { id: "INV-2026-006", tenant: "RetailMax Inc", amount: "$2,500.00", status: "canceled", date: "Apr 1, 2026", dueDate: "Apr 15, 2026", plan: "Enterprise" },
  { id: "INV-2026-007", tenant: "GlobalTech Industries", amount: "$99.00", status: "paid", date: "Apr 1, 2026", dueDate: "Apr 15, 2026", plan: "Pro" },
];

const statusVariant = { paid: "sentiment-positive" as const, pending: "warning" as const, past_due: "sentiment-negative" as const, canceled: "default" as const };

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Billing", href: "/admin/billing" }, { label: "Invoices" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Invoice History</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">View and download tenant invoices</p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted" />
          <input className="w-full bg-surface-night text-on-primary text-[14px] pl-9 pr-3 py-2 rounded-md border border-hairline-violet outline-none focus:ring-1 focus:ring-accent-lime/30" placeholder="Search invoices..." />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-on-dark-muted" />
          <select className="bg-accent-violet-mid/30 text-on-primary text-[14px] rounded-md px-3 py-2 border border-hairline-violet outline-none">
            <option>All Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Past Due</option>
          </select>
        </div>
      </div>

      <WidgetCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-hairline-violet/50">
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Invoice ID</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Tenant</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Plan</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Amount</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Status</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Date</th>
                <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Due Date</th>
                <th className="text-right py-2 text-[14px] font-medium text-on-dark-muted">Download</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-hairline-violet/30 hover:bg-accent-lime/4 transition-colors">
                  <td className="py-3 text-[14px] font-mono">{inv.id}</td>
                  <td className="py-3 text-[14px]">{inv.tenant}</td>
                  <td className="py-3"><Badge variant="default">{inv.plan}</Badge></td>
                  <td className="py-3 text-[16px] font-semibold">{inv.amount}</td>
                  <td className="py-3"><Badge variant={statusVariant[inv.status]}>{inv.status.replace("_", " ")}</Badge></td>
                  <td className="py-3 text-[14px] text-on-dark-muted">{inv.date}</td>
                  <td className="py-3 text-[14px] text-on-dark-muted">{inv.dueDate}</td>
                  <td className="py-3 text-right">
                    <Button variant="ghost" size="sm"><Download size={14} /> PDF</Button>
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
