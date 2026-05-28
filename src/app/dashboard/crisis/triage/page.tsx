"use client";

import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { SourceTimeline } from "@/components/crisis/source-timeline";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/components/ui/toast";
import { timelineEvents } from "@/data/mock";

export default function CrisisTriagePage() {
  const router = useRouter();
  const { crises, updateCrisis, addNotification } = useApp();
  const { toast } = useToast();

  const handleAcknowledge = () => {
    const first = crises.filter(c => c.status !== "resolved")[0];
    if (first) updateCrisis(first.id, { status: "acknowledged" });
    toast("Alert acknowledged", "info");
  };

  const handleDismiss = () => {
    toast("Alert dismissed", "info");
    router.push("/dashboard/crisis");
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Crisis", href: "/crisis" }, { label: "Triage" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Source Tracing</h1>
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
                <span className="text-[14px] leading-[1.43] text-on-dark-muted">First Mention</span>
                <span className="text-[16px] font-semibold">08:45</span>
              </div>
            </div>
          </div>

          <div className="bg-ink-deep border border-hairline-violet rounded-lg p-4">
            <h3 className="text-[16px] font-semibold leading-[1.5] mb-3">Recommended Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => router.push("/dashboard/crisis/auto-response")}
                className="w-full px-4 py-2 rounded-md bg-on-primary text-ink-deep text-[14px] font-bold leading-[1.14] uppercase tracking-[0.2px] transition-all hover:bg-surface-press-light"
              >
                View Auto-Response
              </button>
              <button
                onClick={handleAcknowledge}
                className="w-full px-4 py-2 rounded-full bg-on-dark-faint text-on-primary text-[14px] font-medium leading-[1.29] uppercase tracking-[0.2px] transition-all hover:bg-on-dark-muted"
              >
                Acknowledge Alert
              </button>
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
