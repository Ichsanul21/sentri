import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "widget-dark" | "widget-light" | "feature-dark" | "spotlight";
}

export function Card({ variant = "widget-dark", className = "", children, ...props }: CardProps) {
  const base = "rounded-lg p-4";
  const variants: Record<string, string> = {
    "widget-dark": "bg-widget-surface-dark border border-hairline-violet",
    "widget-light": "bg-widget-surface-light border border-hairline-cloud shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]",
    "feature-dark": "bg-ink-deep rounded-[18px] p-8",
    "spotlight": "bg-accent-violet-deep rounded-[18px] p-8",
  };
  return (
    <div className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function WidgetCard({ children, title, className = "", ...props }: Omit<CardProps, "title"> & { title?: ReactNode }) {
  return (
    <Card variant="widget-dark" className={`flex flex-col ${className}`} {...props}>
      {title && (
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-hairline-violet/50">
          <h3 className="text-[20px] font-semibold leading-[1.25]">{title}</h3>
          <button className="text-on-dark-muted hover:text-on-primary transition-colors text-lg leading-none">···</button>
        </div>
      )}
      {children}
    </Card>
  );
}
