"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

interface PillProps {
  children: ReactNode;
  variant?: "default" | "lime" | "violet" | "red" | "yellow";
  size?: "sm" | "md";
  onRemove?: () => void;
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: "bg-ink-deep border border-hairline-violet text-on-primary",
  lime: "bg-accent-lime/10 border border-accent-lime/30 text-accent-lime",
  violet: "bg-accent-violet-mid/20 border border-accent-violet-mid/30 text-accent-violet-light",
  red: "bg-red-400/10 border border-red-400/30 text-red-400",
  yellow: "bg-yellow-400/10 border border-yellow-400/30 text-yellow-400",
};

const sizeStyles: Record<string, string> = {
  sm: "text-[11px] px-2 py-0.5",
  md: "text-[13px] px-3 py-1",
};

export function Pill({ children, variant = "default", size = "md", onRemove, className = "" }: PillProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium leading-none transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
      {onRemove && (
        <button onClick={onRemove} className="hover:opacity-70 transition-opacity ml-0.5">
          <X size={size === "sm" ? 10 : 12} />
        </button>
      )}
    </span>
  );
}
