"use client";

import { useState } from "react";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/components/ui/toast";
import { Search, Filter, CheckCircle, Clock, AlertTriangle } from "lucide-react";

export default function CrisisHistoryPage() {
  const { crises } = useApp();
  const { toast } = useToast();
  const [search, setSearch] = useState("");

  const resolvedCrises = crises.filter((c) => c.status === "resolved");

  const filtered = resolvedCrises.filter((c) =>
    !search || c.title.toLowerCase().includes(search.toLowerCase())
  );

  const severityBadge = (severity: string) => {
    const map: Record<string, "severity-high" | "severity-medium" | "severity-low"> = {
      high: "severity-high", medium: "severity-medium", low: "severity-low", critical: "severity-high",
    };
    return map[severity] || "default";
  };

  const severityDot = (severity: string) => {
    if (severity === "high" || severity === "critical") return "bg-red-400";
    if (severity === "medium") return "bg-yellow-400";
    return "bg-blue-400";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold leading-[1.3]">Crisis History</h1>
        <p className="text-[14px] text-on-dark-muted mt-1">Past crisis events and resolution logs. {resolvedCrises.length} resolved.</p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search history..." className="w-full pl-9 pr-3 py-2 rounded-lg border border-hairline-violet bg-ink-deep text-on-primary text-[14px] outline-none focus:border-accent-lime/50" />
        </div>
      </div>

      <WidgetCard>
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-on-dark-muted">
            <CheckCircle size={40} className="mx-auto text-accent-lime mb-3" />
            <p className="text-[18px] font-medium">No resolved crises found</p>
          </div>
        ) : (
          <div className="divide-y divide-hairline-violet">
            {filtered.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-ink-deep/30 transition-colors">
                <span className={`w-2 h-2 rounded-full shrink-0 ${severityDot(item.severity)}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium">{item.title}</p>
                  <div className="flex items-center gap-3 mt-0.5 text-[12px] text-on-dark-muted">
                    <span className="flex items-center gap-1"><CheckCircle size={12} /> Resolved</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> Started {item.started}</span>
                    <span className="flex items-center gap-1"><AlertTriangle size={12} /> {item.mentions} mentions</span>
                  </div>
                </div>
                <Badge variant={severityBadge(item.severity) as any}>{item.severity}</Badge>
              </div>
            ))}
          </div>
        )}
      </WidgetCard>
    </div>
  );
}
