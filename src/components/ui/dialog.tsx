"use client";

import { useEffect, useRef } from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ open, onClose, children, className = "" }: DialogProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={onClose} />
      <div
        ref={ref}
        className={`relative bg-surface-night border border-hairline-violet rounded-xl p-8 shadow-[rgba(0,0,0,0.1)_0_10px_15px_-3px,rgba(0,0,0,0.1)_0_4px_6px_-4px] max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto animate-scale-in ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function DialogFooter({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mt-6 flex items-center justify-end gap-3 ${className}`}>{children}</div>;
}
