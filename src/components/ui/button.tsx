import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "inverted" | "ghost" | "violet-token" | "danger" | "warning";
type Size = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary font-bold uppercase tracking-[0.2px] text-[14px] leading-[1.14] rounded-md px-4 py-3 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
  inverted:
    "bg-on-primary text-ink-deep font-bold uppercase tracking-[0.2px] text-[14px] leading-[1.14] rounded-md px-4 py-3 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
  ghost:
    "bg-on-dark-faint text-on-primary font-medium uppercase tracking-[0.2px] text-[14px] leading-[1.29] rounded-xl px-3 py-2 hover:opacity-80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
  "violet-token":
    "bg-accent-violet-mid text-on-primary font-medium uppercase tracking-[0.2px] text-[14px] leading-[1.29] rounded-xl px-4 py-2 border border-accent-violet-deep/30 hover:opacity-80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
  danger:
    "bg-severity-critical text-on-primary font-bold uppercase tracking-[0.2px] text-[14px] leading-[1.14] rounded-md px-4 py-3 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
  warning:
    "bg-severity-medium/20 text-severity-medium font-bold uppercase tracking-[0.2px] text-[14px] leading-[1.14] rounded-md px-4 py-3 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
};

const sizeClasses: Record<Size, string> = {
  default: "h-10",
  sm: "h-8 text-xs px-3",
  lg: "h-12 px-6",
  icon: "h-10 w-10 p-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "default", className = "", children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-2 font-sans cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
