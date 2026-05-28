"use client";

import { useParams, useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WidgetCard } from "@/components/ui/card";
import { SourceTimeline } from "@/components/crisis/source-timeline";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/components/ui/toast";
import { AlertTriangle, CheckCircle, Radio, Activity } from "lucide-react";
import { timelineEvents } from "@/data/mock";

export default function CrisisDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { crises, updateCrisis } = useApp();
  const { toast } = useToast();
  const id = params.id as string;

  const crisis = crises.find((c) => c.id === id);

  if (!crisis) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <AlertTriangle size={48} className="mx-auto text-severity-critical" />
          <h2 className="text-[24px] font-semibold">Crisis Not Found</h2>
          <p className="text-on-dark-muted">Alert ID: {id}</p>
          <Button variant="ghost" onClick={() => router.push("/dashboard/crisis")}>
            Back to Crisis Center
          </Button>
        </div>
      </div>
    );
  }

  const handleAcknowledge = () => {
    updateCrisis(crisis.id, { status: "acknowledged" });
    toast("Alert acknowledged", "info");
  };

  const handleResolve = () => {
    updateCrisis(crisis.id, { status: "resolved" });
    toast("Alert resolved", "success");
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: "Crisis", href: "/dashboard/crisis" },
        { label: crisis.title },
      ]} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-[30px] font-medium leading-[1.2]">{crisis.title}</h1>
            <p className="text-[16px] text-on-dark-muted mt-1">{crisis.summary}</p>
          </div>
          <Badge variant={crisis.severity === "critical" ? "severity-critical" : "severity-high"}>
            {crisis.severity.toUpperCase()}
          </Badge>
          <Badge variant="default">{crisis.status}</Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="danger" size="sm" onClick={handleAcknowledge}>
            <CheckCircle size={14} /> Acknowledge
          </Button>
          <Button variant="ghost" size="sm" onClick={handleResolve}>
            Resolve
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <WidgetCard>
          <div className="text-center p-3">
            <Activity size={24} className="mx-auto mb-2 text-severity-critical" />
            <div className="text-[28px] font-semibold">{crisis.mentions}</div>
            <p className="text-[14px] text-on-dark-muted">Mentions</p>
          </div>
        </WidgetCard>
        <WidgetCard>
          <div className="text-center p-3">
            <AlertTriangle size={24} className="mx-auto mb-2 text-sentiment-negative" />
            <div className="text-[28px] font-semibold text-sentiment-negative">68%</div>
            <p className="text-[14px] text-on-dark-muted">Negative Sentiment</p>
          </div>
        </WidgetCard>
        <WidgetCard>
          <div className="text-center p-3">
            <Radio size={24} className="mx-auto mb-2 text-accent-lime" />
            <div className="text-[28px] font-semibold">Twitter</div>
            <p className="text-[14px] text-on-dark-muted">Top Source</p>
          </div>
        </WidgetCard>
        <WidgetCard>
          <div className="text-center p-3">
            <CheckCircle size={24} className="mx-auto mb-2 text-sentiment-neutral" />
            <div className="text-[28px] font-semibold">{crisis.started}</div>
            <p className="text-[14px] text-on-dark-muted">Started</p>
          </div>
        </WidgetCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WidgetCard title="Source Tracing Timeline">
          <SourceTimeline events={timelineEvents} />
        </WidgetCard>

        <WidgetCard title="Actions">
          <div className="space-y-3">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => router.push(`/dashboard/crisis/${id}/triage`)}
            >
              <Activity size={14} /> View Full Triage
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => router.push("/dashboard/crisis/auto-response")}
            >
              <Radio size={14} /> Auto-Response
            </Button>
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
