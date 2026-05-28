"use client";

import { useState } from "react";

interface TabsProps {
  tabs: { id: string; label: string; badge?: number }[];
  defaultTab?: string;
  onChange?: (id: string) => void;
  children: (activeTab: string) => React.ReactNode;
  className?: string;
}

export function Tabs({ tabs, defaultTab, onChange, children, className = "" }: TabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id || "");

  return (
    <div className={className}>
      <div className="flex border-b border-hairline-violet">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActive(tab.id);
              onChange?.(tab.id);
            }}
            className={`flex items-center gap-2 px-4 py-3 text-[16px] font-medium leading-[1.5] transition-colors border-b-2 -mb-[1px] ${
              active === tab.id
                ? "border-accent-lime text-on-primary"
                : "border-transparent text-on-dark-muted hover:text-on-primary/80"
            }`}
          >
            {tab.label}
            {tab.badge !== undefined && (
              <span className="bg-accent-violet-mid text-[10px] font-semibold leading-[1.8] px-1.5 rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="pt-4">{children(active)}</div>
    </div>
  );
}
