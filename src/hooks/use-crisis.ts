"use client";

import { useState, useCallback } from "react";
import { crisisAlerts as mockAlerts, timelineEvents as mockTimeline } from "@/data/mock";

type AlertStatus = "new" | "acknowledged" | "investigating" | "resolved";

interface CrisisAlertItem {
  severity: string;
  title: string;
  summary: string;
  timestamp: string;
  negativeCount: number;
  totalCount: number;
  negativePct: number;
  status: AlertStatus;
}

interface TimelineEventItem {
  time: string;
  content: string;
  engagement: number;
  isSeed: boolean;
}

interface AutoResponseDraftItem {
  id: string;
  type: "press_release" | "social_reply" | "dm_template";
  content: string;
  aiConfidence: number;
  regenerations: number;
  maxRegenerations: number;
}

export function useCrisis() {
  const [alerts, setAlerts] = useState<CrisisAlertItem[]>(mockAlerts as CrisisAlertItem[]);
  const [timeline] = useState<TimelineEventItem[]>(mockTimeline);
  const [drafts] = useState<AutoResponseDraftItem[]>([
    {
      id: "draft-1",
      type: "press_release",
      content: "Kami menyadari adanya lonjakan sentimen negatif terkait [isu]. Kami ingin menyampaikan permintaan maaf yang tulus dan berkomitmen untuk menyelesaikan masalah ini secara transparan...",
      aiConfidence: 87,
      regenerations: 1,
      maxRegenerations: 3,
    },
    {
      id: "draft-2",
      type: "social_reply",
      content: "Hai @user, kami mohon maaf atas pengalaman Anda. Tim kami sudah menangani masalah ini. Bisa DM kami detailnya? 🙏",
      aiConfidence: 92,
      regenerations: 1,
      maxRegenerations: 3,
    },
    {
      id: "draft-3",
      type: "dm_template",
      content: "Halo, kami dari tim Sentri. Melihat mention Anda mengenai [topik], kami ingin menyelesaikannya secara personal. Bisa hubungi kami di [email/support]?",
      aiConfidence: 78,
      regenerations: 1,
      maxRegenerations: 3,
    },
  ]);

  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [crisisMode, setCrisisMode] = useState(false);

  const acknowledgeAlert = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.title === id ? { ...a, status: "acknowledged" as const } : a)),
    );
  }, []);

  const resolveAlert = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.title === id ? { ...a, status: "resolved" as const } : a)),
    );
  }, []);

  const toggleCrisisMode = useCallback(() => {
    setCrisisMode((v) => !v);
  }, []);

  return {
    alerts,
    timeline,
    drafts,
    selectedAlert,
    crisisMode,
    setSelectedAlert,
    acknowledgeAlert,
    resolveAlert,
    toggleCrisisMode,
  };
}
