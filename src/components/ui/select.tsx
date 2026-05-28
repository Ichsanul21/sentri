import { forwardRef, type SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  variant?: "default" | "violet";
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, variant = "default", className = "", ...props }, ref) => {
    const variantClass = variant === "violet"
      ? "bg-accent-violet-deep text-on-primary"
      : "bg-surface-canvas-light text-ink-deep";
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-[16px] font-medium leading-[1.5] text-on-primary/80">{label}</label>
        )}
        <select
          ref={ref}
          className={`${variantClass} text-[16px] font-medium leading-[1.5] px-3 py-2 rounded-md border border-hairline-cool outline-none transition-all focus:ring-2 focus:ring-ring-focus ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }
);
Select.displayName = "Select";
