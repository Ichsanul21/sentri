"use client";

import Link from "next/link";
import { Bell, Search, Settings, User } from "lucide-react";

interface NavBarProps {
  title?: string;
}

export function NavBar({ title }: NavBarProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-6 border-b border-hairline-violet bg-canvas-dark/80 backdrop-blur-md">
      <div className="flex items-center gap-4">
        {title && <h1 className="text-[18px] font-semibold leading-[1.3]">{title}</h1>}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="w-56 pl-9 pr-3 py-1.5 rounded-lg border border-hairline-violet bg-ink-deep text-on-primary text-[13px] outline-none focus:border-accent-lime/50 transition-colors"
          />
        </div>
        <button className="relative p-2 rounded-lg text-on-dark-muted hover:text-on-primary hover:bg-ink-deep transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full" />
        </button>
        <Link href="/dashboard/settings/profile" className="p-2 rounded-lg text-on-dark-muted hover:text-on-primary hover:bg-ink-deep transition-colors">
          <Settings size={18} />
        </Link>
        <Link href="/dashboard/settings/profile" className="w-8 h-8 rounded-full bg-accent-violet-mid/40 flex items-center justify-center hover:bg-accent-violet-mid/60 transition-colors">
          <User size={16} className="text-on-dark-muted" />
        </Link>
      </div>
    </header>
  );
}
