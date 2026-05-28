"use client";

import { useToast } from "@/components/ui/toast";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { AutoResponsePanel } from "@/components/crisis/auto-response-panel";
import { CrisisBanner } from "@/components/crisis/crisis-banner";
import { useState } from "react";

const initialDrafts = [
  {
    id: "draft-1",
    type: "press_release" as const,
    content: "Kami menyadari adanya lonjakan sentimen negatif terkait [isu]. Kami menyampaikan permintaan maaf yang tulus dan berkomitmen untuk menyelesaikan masalah ini secara transparan. Tim kami sedang menyelidiki akar masalah dan akan merilis pernyataan resmi dalam 24 jam ke depan. Kami menghargai kesabaran dan kepercayaan Anda.",
    aiConfidence: 87,
    regenerations: 1,
    maxRegenerations: 3,
  },
  {
    id: "draft-2",
    type: "social_reply" as const,
    content: "Hai @user, kami mohon maaf atas pengalaman Anda. Tim kami sudah menangani masalah ini dan sedang bekerja untuk memperbaikinya. Bisa DM kami detail tambahan? Terima kasih atas pengertiannya \uD83D\uDE4F",
    aiConfidence: 92,
    regenerations: 1,
    maxRegenerations: 3,
  },
  {
    id: "draft-3",
    type: "dm_template" as const,
    content: "Halo, kami dari tim Sentri. Melihat mention Anda mengenai [topik], kami ingin menyelesaikannya secara personal. Bisa hubungi kami di support@sentry.ai atau melalui dashboard? Kami akan prioritaskan laporan Anda.",
    aiConfidence: 78,
    regenerations: 1,
    maxRegenerations: 3,
  },
];

export default function CrisisAutoResponsePage() {
  const { toast } = useToast();
  const [drafts, setDrafts] = useState(initialDrafts);

  const handleRegenerate = (type: string) => {
    setDrafts((prev) =>
      prev.map((d) =>
        d.type === type && d.regenerations < d.maxRegenerations
          ? { ...d, regenerations: d.regenerations + 1 }
          : d,
      ),
    );
    toast("Response regenerated", "success");
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast("Copied to clipboard", "success");
  };

  const handleFeedback = (id: string, feedback: "up" | "down") => {
    setDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, feedback } : d)),
    );
    toast(feedback === "up" ? "Thanks for feedback!" : "We'll improve", "info");
  };

  return (
    <div className="space-y-6">
      <CrisisBanner />

      <Breadcrumbs items={[{ label: "Crisis", href: "/crisis" }, { label: "Auto-Response" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">AI Auto-Response</h1>
          <p className="text-[16px] font-medium leading-[1.5] text-on-dark-muted mt-1">
            AI-generated response drafts for the active crisis
          </p>
        </div>
        <Badge variant="severity-critical">Crisis Active</Badge>
      </div>

      <AutoResponsePanel
        drafts={drafts}
        onRegenerate={handleRegenerate}
        onCopy={handleCopy}
        onFeedback={handleFeedback}
      />
    </div>
  );
}
