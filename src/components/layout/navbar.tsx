"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, User, LogOut, CheckCheck, Settings, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useApp } from "@/contexts/AppContext";
import { useTheme } from "@/contexts/ThemeContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useApp();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setShowUserMenu(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const severityColor = (type: string) => {
    switch (type) {
      case "alert": return "bg-severity-critical/10 border-severity-critical/30";
      case "warning": return "bg-severity-high/10 border-severity-high/30";
      case "success": return "bg-sentiment-positive/10 border-sentiment-positive/30";
      default: return "bg-accent-violet-mid/10 border-accent-violet-mid/30";
    }
  };

  return (
    <header className="h-14 border-b border-hairline-violet/50 flex items-center justify-between px-6 bg-surface-night transition-colors duration-300">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-surface-night text-on-primary text-[14px] leading-[1.43] pl-9 pr-3 py-1.5 rounded-md border border-hairline-violet/50 outline-none focus:ring-1 focus:ring-accent-lime/30 transition-all placeholder:text-on-dark-muted/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-accent-violet-mid/20 transition-all duration-200 hover:scale-110 active:scale-95 text-on-dark-muted hover:text-on-primary"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-md hover:bg-accent-violet-mid/20 transition-all duration-200 hover:scale-110 active:scale-95 text-on-dark-muted hover:text-on-primary"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-severity-critical text-[10px] font-bold text-white px-1">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-surface-night border border-hairline-violet rounded-xl shadow-2xl z-50 overflow-hidden animate-scale-in">
              <div className="flex items-center justify-between px-4 py-3 border-b border-hairline-violet/50">
                <span className="text-[14px] font-semibold">Notifications</span>
                <button onClick={markAllNotificationsRead} className="text-[12px] text-accent-lime hover:underline flex items-center gap-1">
                  <CheckCheck size={14} /> Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto scrollbar-thin animate-stagger">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-[14px] text-on-dark-muted">
                    No notifications yet
                  </div>
                ) : (
                  notifications.slice(0, 20).map((n, idx) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`px-4 py-3 border-b border-hairline-violet/20 cursor-pointer transition-all duration-200 hover:bg-accent-violet-mid/10 hover:translate-x-1 ${!n.read ? "bg-accent-lime/4" : ""}`}
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <div className={`p-2 rounded border ${severityColor(n.type)} mb-2`}>
                        <p className="text-[13px] font-medium">{n.title}</p>
                        <p className="text-[12px] text-on-dark-muted mt-0.5">{n.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div ref={userRef} className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-accent-violet-mid/20 transition-all duration-200 hover:scale-105 active:scale-95 text-on-dark-muted hover:text-on-primary"
          >
            <User size={18} />
            <span className="text-[14px] font-medium leading-[1.43] hidden sm:inline">
              {user?.name || "User"}
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-surface-night border border-hairline-violet rounded-xl shadow-2xl z-50 overflow-hidden animate-scale-in">
              <div className="px-4 py-3 border-b border-hairline-violet/50">
                <p className="text-[13px] font-medium truncate">{user?.name}</p>
                <p className="text-[11px] text-on-dark-muted truncate">{user?.email}</p>
              </div>
              <div className="py-1">
                <Link href="/dashboard/settings/profile" onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-4 py-2 text-[13px] hover:bg-accent-violet-mid/10 transition-colors">
                  <Settings size={14} /> Settings
                </Link>
                <button onClick={() => { setShowUserMenu(false); logout(); }}
                  className="flex items-center gap-2 px-4 py-2 text-[13px] hover:bg-accent-violet-mid/10 transition-colors w-full text-left text-sentiment-negative">
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
