"use client";

import { ReactNode } from "react";

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface WizardStepProps {
  steps: Step[];
  currentStep: number;
  children: ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export function WizardStep({ steps, currentStep, children, onNext, onBack, isFirst, isLast }: WizardStepProps) {
  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-semibold transition-colors ${
              i <= currentStep ? "bg-accent-lime text-ink-deep" : "bg-ink-deep border border-hairline-violet text-on-dark-muted"
            }`}>
              {i + 1}
            </div>
            <div className={i <= currentStep ? "text-on-primary" : "text-on-dark-muted"}>
              <p className="text-[14px] font-medium leading-[1.3]">{step.label}</p>
              {step.description && <p className="text-[12px] leading-[1.3]">{step.description}</p>}
            </div>
            {i < steps.length - 1 && <div className={`w-8 h-[2px] ${i < currentStep ? "bg-accent-lime" : "bg-hairline-violet"}`} />}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 rounded-xl border border-hairline-violet bg-ink-deep/30">{children}</div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={isFirst}
          className="px-4 py-2 rounded-lg border border-hairline-violet text-[14px] text-on-dark-muted hover:text-on-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 rounded-lg bg-accent-lime text-ink-deep font-semibold text-[14px] hover:bg-accent-lime/90 transition-colors"
        >
          {isLast ? "Complete" : "Continue"}
        </button>
      </div>
    </div>
  );
}
