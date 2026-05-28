"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/components/ui/toast";
import { generateId } from "@/lib/storage";
import { Play, Pause, Edit3, Calendar, FileText, Plus, X } from "lucide-react";

export default function ScheduledReportsPage() {
  const { scheduledReports, addScheduledReport, toggleScheduledReport, deleteScheduledReport } = useApp();
  const { toast } = useToast();
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newFreq, setNewFreq] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [newFormat, setNewFormat] = useState("PDF");
  const [newRecipients, setNewRecipients] = useState("");

  const handleAdd = () => {
    if (!newName.trim()) { toast("Please enter a report name", "error"); return; }
    addScheduledReport({
      id: generateId(),
      name: newName,
      frequency: newFreq,
      format: newFormat,
      recipients: newRecipients || "you@company.com",
      nextRun: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      active: true,
    });
    setShowNew(false);
    setNewName("");
    toast("Scheduled report created", "success");
  };

  const handleToggle = (id: string) => {
    toggleScheduledReport(id);
    toast("Report schedule updated", "info");
  };

  const handleDelete = (id: string) => {
    deleteScheduledReport(id);
    toast("Scheduled report removed", "info");
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Reports", href: "/dashboard/reports" }, { label: "Scheduled" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Scheduled Reports</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Automated reports delivered on your schedule</p>
        </div>
        <Button variant="primary" onClick={() => setShowNew(true)}><Plus size={16} /> Schedule Report</Button>
      </div>

      {scheduledReports.length === 0 ? (
        <WidgetCard className="text-center py-12">
          <Calendar size={40} className="mx-auto text-on-dark-muted mb-3" />
          <p className="text-[18px] font-medium">No scheduled reports yet</p>
          <p className="text-[14px] text-on-dark-muted mt-1">Create your first scheduled report to automate deliveries</p>
        </WidgetCard>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {scheduledReports.map((report) => (
            <WidgetCard key={report.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[20px] font-semibold leading-[1.25]">{report.name}</h3>
                    <Badge variant={report.active ? "lime" : "default"}>{report.active ? "Active" : "Paused"}</Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-[14px] text-on-dark-muted">
                      <Calendar size={14} /> Every {report.frequency}
                    </span>
                    <span className="flex items-center gap-1.5 text-[14px] text-on-dark-muted">
                      <FileText size={14} /> {report.format}
                    </span>
                    <span className="text-[14px] text-on-dark-muted">Next: {report.nextRun}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleToggle(report.id)}>
                    {report.active ? <Pause size={14} /> : <Play size={14} />}
                    {report.active ? "Pause" : "Resume"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => { toast("Report generating...", "info"); }}>
                    <Play size={14} /> Run Now
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(report.id)} className="text-sentiment-negative">
                    <X size={14} />
                  </Button>
                </div>
              </div>
            </WidgetCard>
          ))}
        </div>
      )}

      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowNew(false)}>
          <div className="bg-surface-night border border-hairline-violet rounded-xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-semibold">New Scheduled Report</h3>
              <button onClick={() => setShowNew(false)} className="text-on-dark-muted hover:text-on-primary"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-on-dark-muted mb-1">Report Name</label>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Weekly Summary"
                  className="w-full bg-ink-deep border border-hairline-violet rounded-lg px-3 py-2 text-[14px] text-on-primary outline-none focus:border-accent-lime" />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-on-dark-muted mb-1">Frequency</label>
                <select value={newFreq} onChange={(e) => setNewFreq(e.target.value as typeof newFreq)}
                  className="w-full bg-ink-deep border border-hairline-violet rounded-lg px-3 py-2 text-[14px] text-on-primary outline-none focus:border-accent-lime">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-[14px] font-medium text-on-dark-muted mb-1">Format</label>
                <select value={newFormat} onChange={(e) => setNewFormat(e.target.value)}
                  className="w-full bg-ink-deep border border-hairline-violet rounded-lg px-3 py-2 text-[14px] text-on-primary outline-none focus:border-accent-lime">
                  <option value="PDF">PDF</option>
                  <option value="PPT">PPT</option>
                  <option value="Excel">Excel</option>
                </select>
              </div>
              <div>
                <label className="block text-[14px] font-medium text-on-dark-muted mb-1">Recipients (comma separated)</label>
                <input type="text" value={newRecipients} onChange={(e) => setNewRecipients(e.target.value)}
                  placeholder="email1@company.com, email2@company.com"
                  className="w-full bg-ink-deep border border-hairline-violet rounded-lg px-3 py-2 text-[14px] text-on-primary outline-none focus:border-accent-lime" />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <Button variant="ghost" onClick={() => setShowNew(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleAdd}>Create Schedule</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
