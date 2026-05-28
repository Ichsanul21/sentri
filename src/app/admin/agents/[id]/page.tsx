"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCw, Play, Square } from "lucide-react";

const agentData = {
  id: "agent-nlp",
  name: "NLP Processor",
  version: "3.0.1",
  status: "active" as const,
  instances: 6,
  queueDepth: 58,
  cpuPercent: 72,
  memPercent: 81,
  uptime: "7d 3h 15m",
  host: "nlp-node-01.sentri.internal",
  port: 9090,
  startedAt: "2026-05-21 08:45:00",
  config: {
    maxWorkers: 8,
    batchSize: 100,
    language: "id,en",
    modelVersion: "v2.4.0",
    timeoutMs: 30000,
    retryAttempts: 3,
  },
};

const mockTasks = [
  { id: "T-4821", type: "Sentiment Analysis", status: "running" as const, started: "2026-05-28 10:30:00", duration: "2m 15s" },
  { id: "T-4820", type: "Entity Extraction", status: "completed" as const, started: "2026-05-28 10:15:00", duration: "1m 48s" },
  { id: "T-4819", type: "Topic Classification", status: "completed" as const, started: "2026-05-28 09:45:00", duration: "3m 02s" },
  { id: "T-4818", type: "Sentiment Analysis", status: "failed" as const, started: "2026-05-28 09:30:00", duration: "0m 45s" },
  { id: "T-4817", type: "Crisis Detection", status: "queued" as const, started: "2026-05-28 09:00:00", duration: "--" },
];

const mockLogs = [
  { timestamp: "10:32:15", level: "info" as const, message: "Task T-4821 started: Sentiment Analysis" },
  { timestamp: "10:30:45", level: "info" as const, message: "Worker pool at 75% capacity (6/8 workers)" },
  { timestamp: "10:28:00", level: "warn" as const, message: "Queue depth exceededing 50 items" },
  { timestamp: "10:15:30", level: "info" as const, message: "Task T-4820 completed successfully" },
  { timestamp: "09:45:12", level: "info" as const, message: "Model v2.4.0 loaded (512MB)" },
  { timestamp: "09:30:45", level: "error" as const, message: "Task T-4818 failed: Memory limit exceeded" },
  { timestamp: "09:00:00", level: "info" as const, message: "Agent started, registering with orchestrator" },
];

type Tab = "config" | "tasks" | "logs";

export default function AgentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [tab, setTab] = useState<Tab>("config");

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Agents", href: "/admin/agents" }, { label: id }]} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/agents" className="text-on-dark-muted hover:text-on-primary transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-accent-lime" />
              <h1 className="text-[30px] font-medium leading-[1.2]">{agentData.name}</h1>
              <Badge variant="sentiment-positive">{agentData.status}</Badge>
            </div>
            <p className="text-[16px] text-on-dark-muted mt-1">v{agentData.version} · {agentData.host}:{agentData.port} · Uptime: {agentData.uptime}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm"><RotateCw size={14} /> Restart</Button>
          <Button variant="ghost" size="sm"><Square size={14} /> Stop</Button>
          <Button variant="primary" size="sm"><Play size={14} /> Start</Button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-hairline-violet/50">
        {(["config", "tasks", "logs"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 text-[16px] font-medium capitalize border-b-2 transition-colors ${
              tab === t ? "border-accent-lime text-on-primary" : "border-transparent text-on-dark-muted hover:text-on-primary"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "config" && (
        <WidgetCard title="Agent Configuration">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(agentData.config).map(([key, val]) => (
                <div key={key} className="flex justify-between p-3 rounded bg-ink-deep">
                  <span className="text-on-dark-muted text-[14px] capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                  <span className="text-[16px] font-mono">{String(val)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="violet-token" size="sm">Edit Config</Button>
              <Button variant="primary" size="sm">Save Changes</Button>
            </div>
          </div>
        </WidgetCard>
      )}

      {tab === "tasks" && (
        <WidgetCard title="Recent Tasks">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-hairline-violet/50">
                  <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Task ID</th>
                  <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Type</th>
                  <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Status</th>
                  <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Started</th>
                  <th className="text-left py-2 text-[14px] font-medium text-on-dark-muted">Duration</th>
                </tr>
              </thead>
              <tbody>
                {mockTasks.map((task) => (
                  <tr key={task.id} className="border-b border-hairline-violet/30 hover:bg-accent-lime/4 transition-colors">
                    <td className="py-3 text-[14px] font-mono">{task.id}</td>
                    <td className="py-3 text-[16px]">{task.type}</td>
                    <td className="py-3">
                      <Badge variant={task.status === "running" ? "sentiment-positive" : task.status === "failed" ? "sentiment-negative" : task.status === "queued" ? "warning" : "sentiment-positive"}>
                        {task.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-[14px] text-on-dark-muted">{task.started}</td>
                    <td className="py-3 text-[14px] text-on-dark-muted">{task.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </WidgetCard>
      )}

      {tab === "logs" && (
        <WidgetCard title="Agent Logs">
          <div className="space-y-1">
            {mockLogs.map((log, i) => (
              <div key={i} className="flex gap-3 py-1.5 text-[14px] font-mono border-b border-hairline-violet/10">
                <span className="text-on-dark-muted w-16 shrink-0">{log.timestamp}</span>
                <span className={`w-12 shrink-0 ${
                  log.level === "error" ? "text-sentiment-negative" : log.level === "warn" ? "text-warning" : "text-accent-lime"
                }`}>
                  [{log.level}]
                </span>
                <span className="text-on-primary">{log.message}</span>
              </div>
            ))}
          </div>
        </WidgetCard>
      )}
    </div>
  );
}
