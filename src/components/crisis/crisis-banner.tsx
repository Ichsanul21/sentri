"use client";

import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export function CrisisBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-severity-critical/12 border-b border-severity-critical/30 animate-slide-in-right">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <AlertTriangle size={20} className="text-severity-critical" />
          <span className="text-[16px] font-semibold leading-[1.5]">
            Crisis Mode Active — sentimen negatif melonjak 340%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/crisis">
            <Button variant="danger" size="sm">View Crisis Dashboard</Button>
          </Link>
          <button onClick={() => setDismissed(true)} className="text-on-dark-muted hover:text-on-primary transition-colors p-1">
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
