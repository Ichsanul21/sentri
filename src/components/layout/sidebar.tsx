"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, BarChart3, MessageCircle, AlertTriangle,
  Lightbulb, Building2, Settings, ChevronLeft, ChevronRight,
  ChevronDown, Users, CreditCard, Key, Globe,
  FileText, Target, PenTool, UserCheck, AlertCircle,
  Radio, HelpCircle, BookOpen,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type SubItem = { href: string; label: string; icon?: React.ElementType; requiredRole?: string[] };

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  sub?: SubItem[];
  requiredRole?: string[];
}

const navItems: NavItem[] = [
  {
    href: "/dashboard/executive-summary", label: "Dashboard", icon: LayoutDashboard,
  },
  {
    href: "/dashboard/brands", label: "Brand", icon: Building2,
    sub: [
      { href: "/dashboard/brands/setup", label: "DNA Setup", icon: PenTool },
      { href: "/dashboard/brands/tone-matrix", label: "Tone Matrix", icon: Target },
      { href: "/dashboard/brands/competitors", label: "Competitors", icon: Globe },
      { href: "/dashboard/brands/keywords", label: "Keywords", icon: Key },
    ],
  },
  {
    href: "/dashboard/sentiment", label: "Sentiment", icon: MessageCircle,
    sub: [
      { href: "/dashboard/sentiment/analysis", label: "Analysis", icon: BarChart3 },
      { href: "/dashboard/sentiment/associations", label: "Associations", icon: FileText },
      { href: "/dashboard/sentiment/mentions", label: "Mentions", icon: MessageCircle },
    ],
  },
  {
    href: "/dashboard/crisis", label: "Crisis", icon: AlertTriangle,
    sub: [
      { href: "/dashboard/crisis/alerts", label: "Alerts", icon: AlertCircle },
      { href: "/dashboard/crisis/active", label: "Active", icon: AlertTriangle },
      { href: "/dashboard/crisis/auto-response", label: "Auto Response", icon: Radio },
      { href: "/dashboard/crisis/triage", label: "Triage", icon: UserCheck },
    ],
  },
  {
    href: "/dashboard/strategy", label: "Strategy", icon: Lightbulb,
    sub: [
      { href: "/dashboard/strategy/tone-checker", label: "Tone Checker", icon: PenTool },
      { href: "/dashboard/strategy/campaign-optimizer", label: "Campaign Optimizer", icon: BarChart3 },
      { href: "/dashboard/strategy/persona-matcher", label: "Persona Matcher", icon: UserCheck },
      { href: "/dashboard/strategy/recommendations", label: "Recommendations", icon: Lightbulb },
    ],
  },
  {
    href: "/dashboard/live-feed", label: "Live Feed", icon: Radio,
    sub: [
      { href: "/dashboard/live-feed/all", label: "All Mentions", icon: MessageCircle },
      { href: "/dashboard/live-feed/by-platform", label: "By Platform", icon: Globe },
      { href: "/dashboard/live-feed/by-sentiment", label: "By Sentiment", icon: BarChart3 },
      { href: "/dashboard/live-feed/saved-searches", label: "Saved Searches", icon: BookOpen },
    ],
  },
  {
    href: "/dashboard/reports", label: "Reports", icon: FileText,
    sub: [
      { href: "/dashboard/reports/overview", label: "Overview", icon: FileText },
      { href: "/dashboard/reports/scheduled", label: "Scheduled", icon: HelpCircle },
      { href: "/dashboard/reports/builder", label: "Builder", icon: PenTool },
    ],
  },
  {
    href: "/dashboard/settings", label: "Settings", icon: Settings,
    sub: [
      { href: "/dashboard/settings/profile", label: "Profile", icon: UserCheck },
      { href: "/dashboard/settings/notifications", label: "Notifications", icon: AlertCircle },
      { href: "/dashboard/settings/api-keys", label: "API Keys", icon: Key },
      { href: "/dashboard/settings/webhooks", label: "Webhooks", icon: Radio },
      { href: "/dashboard/settings/billing", label: "Billing", icon: CreditCard },
    ],
  },
  {
    href: "/admin", label: "Admin", icon: Settings,
    requiredRole: ["super_admin"],
    sub: [
      { href: "/admin/users", label: "Users", icon: Users },
      { href: "/admin/tenants", label: "Tenants", icon: Building2 },
      { href: "/admin/agents", label: "Agents", icon: UserCheck },
      { href: "/admin/monitoring", label: "Monitoring", icon: BarChart3 },
      { href: "/admin/billing", label: "Billing", icon: CreditCard },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

const groupSections = [
  { start: 0, end: 1, label: "Overview" },
  { start: 1, end: 6, label: "Management" },
  { start: 6, end: 7, label: "Monitoring" },
  { start: 7, end: 8, label: "Analytics" },
  { start: 8, end: 9, label: "Account" },
  { start: 9, end: 10, label: "System" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [expanded, setExpanded] = useState<string[]>(() => {
    const item = navItems.find((n) => n.sub?.some((s) => pathname.startsWith(s.href)));
    return item ? [item.href] : [];
  });

  const filteredNavItems = navItems.filter((item) => {
    if (!item.requiredRole) return true;
    if (!user) return false;
    return item.requiredRole.includes(user.role);
  });

  const toggleExpand = (href: string) => {
    setExpanded((prev) =>
      prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href],
    );
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const renderNavItem = (item: NavItem) => {
    const active = isActive(item.href);
    const isExpanded = expanded.includes(item.href);
    const hasSub = item.sub && item.sub.length > 0;

    return (
      <div key={item.href}>
        <div
          className={`flex items-center min-h-[36px] px-4 mx-2 rounded transition-all ${
            active
              ? "bg-accent-lime/8 text-on-primary border-l-3 border-accent-lime ml-2 pl-3"
              : "text-on-dark-muted hover:text-on-primary/80"
          }`}
          title={collapsed ? item.label : undefined}
        >
          <Link
            href={item.href}
            className="flex items-center flex-1 min-w-0"
            onClick={(e) => {
              if (hasSub) {
                if (!expanded.includes(item.href)) {
                  setExpanded([...expanded, item.href]);
                }
              }
            }}
          >
            <item.icon size={18} className="shrink-0" />
            {!collapsed && (
              <span className="text-[14px] font-medium flex-1 truncate ml-3">{item.label}</span>
            )}
          </Link>
          {!collapsed && hasSub && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleExpand(item.href);
              }}
              className="shrink-0 p-1 rounded hover:bg-accent-violet-mid/20 transition-colors"
              type="button"
            >
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${isExpanded ? "rotate-0" : "-rotate-90"}`}
              />
            </button>
          )}
        </div>

        {!collapsed && hasSub && isExpanded && (
          <div className="ml-5 border-l border-hairline-violet/30 mt-0.5 mb-0.5 animate-fade-in-down">
            {item.sub!.map((sub) => {
              const subActive = pathname === sub.href;
              return (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={() => {
                    if (!expanded.includes(item.href)) {
                      setExpanded([...expanded, item.href]);
                    }
                  }}
                  className={`flex items-center gap-2 h-8 px-3 mx-1 rounded transition-all ${
                    subActive
                      ? "bg-accent-lime/8 text-accent-lime font-medium"
                      : "text-on-dark-muted/70 hover:text-on-primary/80"
                  }`}
                >
                  {sub.icon && <sub.icon size={13} className="shrink-0" />}
                  <span className="text-[13px] truncate">{sub.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`border-r border-hairline-violet flex flex-col transition-all duration-200 ease overflow-hidden ${
        collapsed ? "w-16" : "w-56"
      } bg-surface-night`}
    >
      <div className="flex items-center h-14 px-4 border-b border-hairline-violet/50">
        {collapsed ? (
          <span className="text-accent-lime font-bold text-xl mx-auto">S</span>
        ) : (
          <Link href="/dashboard/executive-summary" className="text-accent-lime font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
            SENTRI
          </Link>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-2">
        {groupSections.map((section) => (
          <div key={section.label} className="mb-1.5">
            {!collapsed && section.label && (
              <div className="px-4 py-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3px] text-on-dark-muted/40">
                  {section.label}
                </span>
              </div>
            )}
            {filteredNavItems.slice(section.start, section.end).map((item) => renderNavItem(item))}
          </div>
        ))}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-8 mx-2 mb-2 rounded-md hover:bg-accent-violet-mid/20 transition-all duration-200 hover:scale-105 active:scale-95 text-on-dark-muted"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
