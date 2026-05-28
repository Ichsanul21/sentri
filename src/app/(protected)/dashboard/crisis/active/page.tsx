"use client";

import { useState } from "react";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/components/ui/toast";
import { Dialog } from "@/components/ui/dialog";
import { AlertTriangle, Clock, CheckCircle, ArrowRight, X, Plus } from "lucide-react";

export default function ActiveCrisisPage() {
  const { crises, addCrisis, updateCrisis } = useApp();
  const { toast } = useToast();
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSeverity, setNewSeverity] = useState<"low" | "medium" | "high" | "critical">("high");

  const activeCrises = crises.filter((c) => c.status !== "resolved");

  const handleNewAlert = () => {
    if (!newTitle.trim()) return;
    addCrisis({
      title: newTitle,
      severity: newSeverity,
      platform: "Manual",
      mentions: 0,
      started: "just now",
      status: "new",
      summary: "",
      timestamp: new Date().toISOString(),
    });
    setShowNew(false);
    setNewTitle("");
    toast("Crisis alert created", "warning");
  };

  const handleResolve = (id: string) => {
    updateCrisis(id, { status: "resolved" });
    toast("Crisis resolved", "success");
  };

  const criticalCount = activeCrises.filter((c) => c.severity === "critical").length;
  const investigatingCount = activeCrises.filter((c) => c.status === "investigating").length;
  const resolvedToday = crises.filter((c) => c.status === "resolved").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold leading-[1.3]">Active Crises</h1>
          <p className="text-[14px] text-on-dark-muted mt-1">Currently active and investigating crisis events.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowNew(true)}>
          <Plus size={16} /> New Alert
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <WidgetCard>
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} className="text-red-400" />
            <div>
              <p className="text-[12px] text-on-dark-muted">Critical</p>
              <p className="text-[24px] font-bold">{criticalCount}</p>
            </div>
          </div>
        </WidgetCard>
        <WidgetCard>
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-yellow-400" />
            <div>
              <p className="text-[12px] text-on-dark-muted">Investigating</p>
              <p className="text-[24px] font-bold">{investigatingCount}</p>
            </div>
          </div>
        </WidgetCard>
        <WidgetCard>
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-accent-lime" />
            <div>
              <p className="text-[12px] text-on-dark-muted">Resolved Today</p>
              <p className="text-[24px] font-bold">{resolvedToday}</p>
            </div>
          </div>
        </WidgetCard>
      </div>

      <div className="space-y-4">
        {activeCrises.length === 0 ? (
          <WidgetCard className="text-center py-12">
            <CheckCircle size={40} className="mx-auto text-accent-lime mb-3" />
            <p className="text-[18px] font-medium">No active crises</p>
            <p className="text-[14px] text-on-dark-muted mt-1">All clear! No crisis events at this time.</p>
          </WidgetCard>
        ) : (
          activeCrises.map((crisis) => (
            <div key={crisis.id} className="p-4 rounded-xl border border-hairline-violet bg-ink-deep/20 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <span className={`w-2.5 h-2.5 mt-1.5 rounded-full shrink-0 ${
                    crisis.severity === "critical" ? "bg-red-400 animate-pulse" : "bg-yellow-400"
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[16px] font-semibold">{crisis.title}</h3>
                      <Badge variant={crisis.severity === "critical" ? "severity-critical" : "severity-high"}>
                        {crisis.severity}
                      </Badge>
                      <Badge variant={crisis.status === "investigating" ? "warning" : "sentiment-neutral"}>
                        {crisis.status}
                      </Badge>
                    </div>
                    <p className="text-[14px] text-on-dark-muted mt-1">{crisis.platform} · {crisis.mentions.toLocaleString()} mentions · started {crisis.started}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button className="flex items-center gap-1 text-[13px] text-accent-lime hover:underline">
                        View triage <ArrowRight size={14} />
                      </button>
                      <button
                        onClick={() => handleResolve(crisis.id)}
                        className="flex items-center gap-1 text-[13px] text-on-dark-muted hover:text-sentiment-positive transition-colors"
                      >
                        <CheckCircle size={14} /> Resolve
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowNew(false)}>
          <div className="bg-surface-night border border-hairline-violet rounded-xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-semibold">New Crisis Alert</h3>
              <button onClick={() => setShowNew(false)} className="text-on-dark-muted hover:text-on-primary">
                <X size={18} />
              </button>
            </div>
      <div className="space-y-4 animate-stagger">
              <div>
                <label className="block text-[14px] font-medium text-on-dark-muted mb-1">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Negative sentiment spike"
                  className="w-full bg-ink-deep border border-hairline-violet rounded-lg px-3 py-2 text-[14px] text-on-primary outline-none focus:border-accent-lime"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-on-dark-muted mb-1">Severity</label>
                <select
                  value={newSeverity}
                  onChange={(e) => setNewSeverity(e.target.value as typeof newSeverity)}
                  className="w-full bg-ink-deep border border-hairline-violet rounded-lg px-3 py-2 text-[14px] text-on-primary outline-none focus:border-accent-lime"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <Button variant="ghost" onClick={() => setShowNew(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleNewAlert}>Create Alert</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
