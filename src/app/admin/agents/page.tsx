"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Settings, RotateCw, BarChart3 } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  status: "active" | "idle" | "error";
  instances: number;
  queueDepth: number;
  cpuPercent: number;
  memPercent: number;
  uptime: string;
  version: string;
}

const agents: Agent[] = [
  { id: "agent-crawler", name: "Crawler Agent", status: "active", instances: 4, queueDepth: 23, cpuPercent: 45, memPercent: 62, uptime: "14d 7h 32m", version: "2.1.0" },
  { id: "agent-nlp", name: "NLP Processor", status: "active", instances: 6, queueDepth: 58, cpuPercent: 72, memPercent: 81, uptime: "7d 3h 15m", version: "3.0.1" },
  { id: "agent-ews", name: "EWS Connector", status: "idle", instances: 2, queueDepth: 0, cpuPercent: 8, memPercent: 22, uptime: "30d 12h 0m", version: "1.8.2" },
  { id: "agent-reporter", name: "Reporter Agent", status: "active", instances: 3, queueDepth: 12, cpuPercent: 34, memPercent: 45, uptime: "21d 5h 48m", version: "2.0.3" },
];

const statusColor = { active: "sentiment-positive", idle: "warning", error: "sentiment-negative" } as const;

export default function AdminAgentsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Agents" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Agent Management</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Monitor and manage background service agents</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/agents/metrics">
            <Button variant="violet-token" size="sm"><BarChart3 size={14} /> Metrics</Button>
          </Link>
          <Button variant="primary" size="sm"><Plus size={14} /> Register New Agent</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <WidgetCard key={agent.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${agent.status === "active" ? "bg-accent-lime" : agent.status === "idle" ? "bg-warning" : "bg-sentiment-negative"}`} />
                <div>
                  <Link href={`/admin/agents/${agent.id}`} className="text-[18px] font-semibold text-accent-lime hover:underline">{agent.name}</Link>
                  <p className="text-[13px] text-on-dark-muted font-mono">v{agent.version}</p>
                </div>
              </div>
              <Badge variant={statusColor[agent.status]}>{agent.status}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-ink-deep rounded p-3">
                <p className="text-[13px] text-on-dark-muted">Instances</p>
                <p className="text-[22px] font-semibold">{agent.instances}</p>
              </div>
              <div className="bg-ink-deep rounded p-3">
                <p className="text-[13px] text-on-dark-muted">Queue Depth</p>
                <p className="text-[22px] font-semibold">{agent.queueDepth}</p>
              </div>
              <div className="bg-ink-deep rounded p-3">
                <p className="text-[13px] text-on-dark-muted">CPU</p>
                <p className="text-[22px] font-semibold">{agent.cpuPercent}%</p>
              </div>
              <div className="bg-ink-deep rounded p-3">
                <p className="text-[13px] text-on-dark-muted">Memory</p>
                <p className="text-[22px] font-semibold">{agent.memPercent}%</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[13px] text-on-dark-muted">Uptime: {agent.uptime}</span>
              <div className="flex gap-2">
                <Link href={`/admin/agents/${agent.id}`}>
                  <Button variant="ghost" size="sm"><Settings size={14} /> Configure</Button>
                </Link>
                <Button variant="ghost" size="sm"><RotateCw size={14} /> Restart</Button>
              </div>
            </div>
          </WidgetCard>
        ))}
      </div>
    </div>
  );
}
