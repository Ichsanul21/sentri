"use client";

import { useState, createContext, useContext, useCallback } from "react";
import { X } from "lucide-react";

type ToastVariant = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) return { toast: () => {} };
  return ctx;
}

function getToastStyles(variant: ToastVariant): string {
  switch (variant) {
    case "success": return "bg-sentiment-positive/15 border-l-4 border-sentiment-positive";
    case "error": return "bg-sentiment-negative/15 border-l-4 border-sentiment-negative";
    case "warning": return "bg-severity-medium/15 border-l-4 border-severity-medium";
    case "info": return "bg-accent-violet-mid/15 border-l-4 border-accent-violet-mid";
  }
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-md shadow-[rgb(21,15,35)_0_0_8px_6px] min-w-[300px] max-w-[420px] animate-slide-in-right ${getToastStyles(toast.variant)}`}
    >
      <span className="text-[16px] font-medium leading-[1.5] flex-1">{toast.message}</span>
      <button onClick={() => onDismiss(toast.id)} className="text-on-dark-muted hover:text-on-primary shrink-0">
        <X size={16} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, variant: ToastVariant = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev.slice(-2), { id, message, variant }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
