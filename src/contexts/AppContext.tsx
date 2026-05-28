"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { getItem, setItem, generateId } from "@/lib/storage";
import type { Brand, Competitor, KeywordTracker } from "@/types/brand";
import type { SentimentLabel, Platform } from "@/types";
import { defaultCompetitors, mentions as mockMentions } from "@/data/mock";
import type { MentionItem } from "@/data/mock";

export interface CrisisItem {
  id: string;
  title: string;
  severity: "low" | "medium" | "high" | "critical";
  platform: string;
  mentions: number;
  started: string;
  status: "new" | "acknowledged" | "investigating" | "resolved";
  summary: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "alert" | "info" | "success" | "warning";
  read: boolean;
  createdAt: string;
}

export interface ReportItem {
  id: string;
  name: string;
  sections: string[];
  format: string;
  brand: string;
  dateRange: { from: string; to: string };
  createdAt: string;
}

export interface ScheduledReport {
  id: string;
  name: string;
  frequency: "daily" | "weekly" | "monthly";
  format: string;
  recipients: string;
  nextRun: string;
  active: boolean;
}

interface AppContextValue {
  brands: Brand[];
  addBrand: (brand: Brand) => void;
  updateBrand: (id: string, data: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;

  competitors: Competitor[];
  addCompetitor: (comp: Competitor) => void;
  removeCompetitor: (id: string) => void;

  crises: CrisisItem[];
  addCrisis: (crisis: Omit<CrisisItem, "id">) => void;
  updateCrisis: (id: string, data: Partial<CrisisItem>) => void;
  resolveCrisis: (id: string) => void;

  notifications: NotificationItem[];
  addNotification: (n: Omit<NotificationItem, "id" | "read" | "createdAt">) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadCount: number;

  mentions: MentionItem[];
  addMention: (m: MentionItem) => void;

  reports: ReportItem[];
  addReport: (r: ReportItem) => void;

  scheduledReports: ScheduledReport[];
  addScheduledReport: (r: ScheduledReport) => void;
  toggleScheduledReport: (id: string) => void;
  deleteScheduledReport: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const BRANDS_KEY = "sentri_brands";
const COMPETITORS_KEY = "sentri_competitors";
const CRISES_KEY = "sentri_crises";
const NOTIFICATIONS_KEY = "sentri_notifications";
const MENTIONS_KEY = "sentri_mentions";
const REPORTS_KEY = "sentri_reports";
const SCHEDULED_REPORTS_KEY = "sentri_scheduled_reports";

const defaultBrand: Brand = {
  id: "brand-1",
  brandName: "Sentri",
  tagline: "Enterprise Brand Sentiment & Social Listening",
  colors: { primary: "#150f23", secondary: "#6a5fc1", accent: "#c2ef4e" },
  industry: "Technology",
  targetDemographic: { ageRange: "25-45", location: "Indonesia", gender: "all", interests: ["technology", "marketing", "social media"] },
  brandPersonality: ["Inovatif", "Terpercaya"],
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>(() => getItem(BRANDS_KEY, [defaultBrand]));
  const [competitors, setCompetitors] = useState<Competitor[]>(() =>
    getItem(COMPETITORS_KEY, defaultCompetitors.map((c, i) => ({ id: `comp-${i}`, name: c.name, handles: c.handles })))
  );
  const [crises, setCrises] = useState<CrisisItem[]>(() =>
    getItem(CRISES_KEY, [
      { id: "c1", title: "Negative sentiment spike on Twitter", severity: "high", platform: "Twitter", mentions: 1240, started: "2h ago", status: "investigating", summary: "Negatif 340% dalam 1 jam terakhir", timestamp: new Date().toISOString() },
      { id: "c2", title: "Product recall discussion on Reddit", severity: "critical", platform: "Reddit", mentions: 3400, started: "5h ago", status: "new", summary: "120 mentions/minute — potential viral", timestamp: new Date().toISOString() },
    ])
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => getItem(NOTIFICATIONS_KEY, []));
  const [mentions, setMentions] = useState<MentionItem[]>(() => getItem(MENTIONS_KEY, mockMentions));
  const [reports, setReports] = useState<ReportItem[]>(() => getItem(REPORTS_KEY, []));
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>(() => getItem(SCHEDULED_REPORTS_KEY, []));

  useEffect(() => { setItem(BRANDS_KEY, brands); }, [brands]);
  useEffect(() => { setItem(COMPETITORS_KEY, competitors); }, [competitors]);
  useEffect(() => { setItem(CRISES_KEY, crises); }, [crises]);
  useEffect(() => { setItem(NOTIFICATIONS_KEY, notifications); }, [notifications]);
  useEffect(() => { setItem(MENTIONS_KEY, mentions); }, [mentions]);
  useEffect(() => { setItem(REPORTS_KEY, reports); }, [reports]);
  useEffect(() => { setItem(SCHEDULED_REPORTS_KEY, scheduledReports); }, [scheduledReports]);

  const addBrand = useCallback((brand: Brand) => setBrands((prev) => [...prev, brand]), []);
  const updateBrand = useCallback((id: string, data: Partial<Brand>) => setBrands((prev) => prev.map((b) => b.id === id ? { ...b, ...data } : b)), []);
  const deleteBrand = useCallback((id: string) => setBrands((prev) => prev.filter((b) => b.id !== id)), []);

  const addCompetitor = useCallback((comp: Competitor) => setCompetitors((prev) => [...prev, comp]), []);
  const removeCompetitor = useCallback((id: string) => setCompetitors((prev) => prev.filter((c) => c.id !== id)), []);

  const addCrisis = useCallback((crisis: Omit<CrisisItem, "id">) => {
    const newCrisis: CrisisItem = { id: generateId(), ...crisis };
    setCrises((prev) => [newCrisis, ...prev]);
  }, []);
  const updateCrisis = useCallback((id: string, data: Partial<CrisisItem>) => setCrises((prev) => prev.map((c) => c.id === id ? { ...c, ...data } : c)), []);
  const resolveCrisis = useCallback((id: string) => setCrises((prev) => prev.map((c) => c.id === id ? { ...c, status: "resolved" as const } : c)), []);

  const addNotification = useCallback((n: Omit<NotificationItem, "id" | "read" | "createdAt">) => {
    const newN: NotificationItem = { id: generateId(), ...n, read: false, createdAt: new Date().toISOString() };
    setNotifications((prev) => [newN, ...prev]);
  }, []);
  const markNotificationRead = useCallback((id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n)), []);
  const markAllNotificationsRead = useCallback(() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))), []);

  const addMention = useCallback((m: MentionItem) => setMentions((prev) => [m, ...prev]), []);

  const addReport = useCallback((r: ReportItem) => setReports((prev) => [r, ...prev]), []);
  const addScheduledReport = useCallback((r: ScheduledReport) => setScheduledReports((prev) => [...prev, r]), []);
  const toggleScheduledReport = useCallback((id: string) => setScheduledReports((prev) => prev.map((r) => r.id === id ? { ...r, active: !r.active } : r)), []);
  const deleteScheduledReport = useCallback((id: string) => setScheduledReports((prev) => prev.filter((r) => r.id !== id)), []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider value={{
      brands, addBrand, updateBrand, deleteBrand,
      competitors, addCompetitor, removeCompetitor,
      crises, addCrisis, updateCrisis, resolveCrisis,
      notifications, addNotification, markNotificationRead, markAllNotificationsRead, unreadCount,
      mentions, addMention,
      reports, addReport,
      scheduledReports, addScheduledReport, toggleScheduledReport, deleteScheduledReport,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
