"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const tabs = [
  { id: "overview", label: "Overview", href: "" },
  { id: "sentiment", label: "Sentiment", href: "/sentiment" },
  { id: "mentions", label: "Mentions", href: "/mentions" },
  { id: "competitors", label: "Competitors", href: "/competitors" },
  { id: "crisis", label: "Crisis", href: "/crisis" },
  { id: "settings", label: "Settings", href: "/settings" },
];

export default function BrandDetailLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const pathname = usePathname();
  const id = params.id as string;

  return (
    <div>
      <div className="flex border-b border-hairline-violet overflow-x-auto scrollbar-thin">
        {tabs.map((tab) => {
          const href = `/dashboard/brands/${id}${tab.href}`;
          const isActive = pathname === href;
          return (
            <Link
              key={tab.id}
              href={href}
              className={`flex items-center gap-2 px-4 py-2.5 text-[16px] font-medium leading-[1.5] transition-colors border-b-2 -mb-[1px] whitespace-nowrap ${
                isActive
                  ? "border-accent-lime text-on-primary"
                  : "border-transparent text-on-dark-muted hover:text-on-primary/80"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
      <div className="pt-4">{children}</div>
    </div>
  );
}
