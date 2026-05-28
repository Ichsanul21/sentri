"use client";

import { useParams, useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SourceTimeline } from "@/components/crisis/source-timeline";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/components/ui/toast";
import { timelineEvents } from "@/data/mock";

export default function CrisisIdTriagePage() {
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
          <p className="text-on-dark-muted">Crisis not found</p>
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

  const handleDismiss = () => {
    toast("Alert dismissed", "info");
    router.push("/dashboard/crisis");
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: "Crisis", href: "/dashboard/crisis" },
        { label: crisis.title, href: `/dashboard/crisis/${id}` },
        { label: "Triage" },
      ]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Source Tracing — {crisis.title}</h1>
          <p className="text-[16px] font-medium leading-[1.5] text-on-dark-muted mt-1">
            Timeline of mentions that triggered the crisis alert
          </p>
        </div>
        <Badge variant="severity-critical">Crisis Active</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-ink-deep border border-hairline-violet rounded-lg p-4">
            <h3 className="text-[20px] font-semibold leading-[1.25] mb-1">Event Timeline</h3>
            <p className="text-[16px] font-medium leading-[1.5] text-on-dark-muted mb-4">
              Tracing the viral seed from first mention to crisis alert
            </p>
            <SourceTimeline events={timelineEvents} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-ink-deep border border-hairline-violet rounded-lg p-4">
            <h3 className="text-[16px] font-semibold leading-[1.5] mb-3">Crisis Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[14px] leading-[1.43] text-on-dark-muted">Total Mentions</span>
                <span className="text-[16px] font-semibold">3,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] leading-[1.43] text-on-dark-muted">Negative %</span>
                <span className="text-[16px] font-semibold text-sentiment-negative">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] leading-[1.43] text-on-dark-muted">Top Source</span>
                <span className="text-[16px] font-semibold">Twitter</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] leading-[1.43] text-on-dark-muted">Viral Seed</span>
                <span className="text-[16px] font-semibold text-severity-critical">@viral</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] leading-[1.43] text-on-dark-muted">Started</span>
                <span className="text-[16px] font-semibold">{crisis.started}</span>
              </div>
            </div>
          </div>

          <div className="bg-ink-deep border border-hairline-violet rounded-lg p-4">
            <h3 className="text-[16px] font-semibold leading-[1.5] mb-3">Actions</h3>
            <div className="space-y-2">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => router.push("/dashboard/crisis/auto-response")}
              >
                View Auto-Response
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={handleAcknowledge}
              >
                Acknowledge Alert
              </Button>
              <button
                onClick={handleDismiss}
                className="w-full text-center text-[14px] leading-[1.43] text-on-dark-muted hover:text-on-primary transition-colors pt-1"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
