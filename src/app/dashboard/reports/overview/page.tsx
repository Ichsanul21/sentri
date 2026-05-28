"use client";

import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Clock, Download, Plus } from "lucide-react";

const recentReports = [
  { id: "r1", title: "Weekly Sentiment Report", period: "May 21 - May 28", status: "ready", pages: 12 },
  { id: "r2", title: "Competitor Benchmarking Q2", period: "Apr 1 - Jun 30", status: "draft", pages: 8 },
  { id: "r3", title: "Crisis Analysis: Product Recall", period: "May 15 - May 22", status: "ready", pages: 6 },
];

export default function ReportsOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold leading-[1.3]">Reports Overview</h1>
          <p className="text-[14px] text-on-dark-muted mt-1">View and manage your brand reports.</p>
        </div>
        <Button variant="primary" size="sm"><Plus size={16} /> New Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <WidgetCard>
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-accent-lime" />
            <div>
              <p className="text-[12px] text-on-dark-muted">Total Reports</p>
              <p className="text-[24px] font-bold">12</p>
            </div>
          </div>
        </WidgetCard>
        <WidgetCard>
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-accent-lime" />
            <div>
              <p className="text-[12px] text-on-dark-muted">Scheduled</p>
              <p className="text-[24px] font-bold">3</p>
            </div>
          </div>
        </WidgetCard>
        <WidgetCard>
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-accent-lime" />
            <div>
              <p className="text-[12px] text-on-dark-muted">Generated This Week</p>
              <p className="text-[24px] font-bold">5</p>
            </div>
          </div>
        </WidgetCard>
      </div>

      <WidgetCard title="Recent Reports">
        <div className="divide-y divide-hairline-violet">
          {recentReports.map((r) => (
            <div key={r.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-[14px] font-medium">{r.title}</p>
                <p className="text-[12px] text-on-dark-muted">{r.period} · {r.pages} pages · {r.status}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded hover:bg-ink-deep text-on-dark-muted hover:text-on-primary transition-colors">
                  <Download size={16} />
                </button>
                <button className="p-2 rounded hover:bg-ink-deep text-on-dark-muted hover:text-on-primary transition-colors">
                  <FileText size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </WidgetCard>
    </div>
  );
}
