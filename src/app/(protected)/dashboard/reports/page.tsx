"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Download, Plus } from "lucide-react";
import Link from "next/link";

const reportTypes = [
  {
    title: "Scheduled Reports",
    description: "Automated reports delivered on a recurring schedule",
    icon: Calendar,
    href: "/dashboard/reports/scheduled",
    action: "View Schedule",
  },
  {
    title: "Report Builder",
    description: "Create custom reports with drag-and-drop",
    icon: FileText,
    href: "/dashboard/reports/builder",
    action: "Build Report",
  },
  {
    title: "Export Reports",
    description: "Export data in PDF, PPT, or Excel format",
    icon: Download,
    href: "/dashboard/reports/export",
    action: "Export Now",
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Reports" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Reports</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Generate and manage reports</p>
        </div>
        <Button variant="primary">
          <Plus size={16} /> New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reportTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Link key={type.href} href={type.href}>
              <WidgetCard className="hover:border-accent-lime/50 transition-colors cursor-pointer min-h-[180px]">
                <div className="flex flex-col gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-accent-violet-mid/30 flex items-center justify-center">
                    <Icon size={20} className="text-accent-lime" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[20px] font-semibold leading-[1.25]">{type.title}</h3>
                    <p className="text-[14px] text-on-dark-muted mt-1">{type.description}</p>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm" className="w-fit">
                      {type.action}
                    </Button>
                  </div>
                </div>
              </WidgetCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
