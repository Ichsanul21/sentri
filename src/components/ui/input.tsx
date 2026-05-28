import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-[16px] font-medium leading-[1.5] text-on-primary/80">{label}</label>
        )}
        <input
          ref={ref}
          className={`bg-surface-canvas-light text-ink-deep text-[16px] font-medium leading-[1.5] px-3 py-2 rounded-[6px] border border-hairline-cool outline-none transition-all focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] focus:ring-2 focus:ring-ring-focus ${error ? "border-sentiment-negative" : ""} ${className}`}
          {...props}
        />
        {error && (
          <span className="text-sentiment-negative text-[14px] leading-[1.43]">{error}</span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-[16px] font-medium leading-[1.5] text-on-primary/80">{label}</label>
        )}
        <textarea
          ref={ref}
          className={`bg-surface-night text-on-primary text-[16px] font-medium leading-[1.5] rounded-md border border-hairline-violet p-4 outline-none transition-all focus:ring-2 focus:ring-ring-focus resize-none min-h-[120px] ${className}`}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
