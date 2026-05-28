"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import type { BrandDnaFormData } from "@/types/brand";

interface BrandDnaFormProps {
  onSubmit: (data: BrandDnaFormData) => void;
  initial?: Partial<BrandDnaFormData>;
}

export function BrandDnaForm({ onSubmit, initial }: BrandDnaFormProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<BrandDnaFormData>({
    brandName: initial?.brandName || "",
    tagline: initial?.tagline || "",
    primaryColor: initial?.primaryColor || "#150f23",
    industry: initial?.industry || "",
    targetDemographic: initial?.targetDemographic || {
      ageRange: "", location: "", gender: "all", interests: [],
    },
    brandPersonality: initial?.brandPersonality || [],
  });

  const update = <K extends keyof BrandDnaFormData>(key: K, value: BrandDnaFormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const steps = [
    {
      title: "Brand Identity",
      fields: (
        <div className="space-y-4">
          <div>
            <label className="text-[14px] font-medium text-on-dark-muted mb-1 block">Brand Name</label>
            <Input value={form.brandName} onChange={(e) => update("brandName", e.target.value)} placeholder="e.g., Sentri" />
          </div>
          <div>
            <label className="text-[14px] font-medium text-on-dark-muted mb-1 block">Tagline</label>
            <Input value={form.tagline || ""} onChange={(e) => update("tagline", e.target.value)} placeholder="Your brand tagline" />
          </div>
          <div>
            <label className="text-[14px] font-medium text-on-dark-muted mb-1 block">Industry</label>
            <Input value={form.industry} onChange={(e) => update("industry", e.target.value)} placeholder="e.g., Technology" />
          </div>
          <div>
            <label className="text-[14px] font-medium text-on-dark-muted mb-1 block">Primary Color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={form.primaryColor} onChange={(e) => update("primaryColor", e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
              <span className="text-[14px] text-on-dark-muted">{form.primaryColor}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Target Audience",
      fields: (
        <div className="space-y-4">
          <div>
            <label className="text-[14px] font-medium text-on-dark-muted mb-1 block">Age Range</label>
            <Input value={form.targetDemographic.ageRange} onChange={(e) => update("targetDemographic", { ...form.targetDemographic, ageRange: e.target.value })} placeholder="e.g., 25-45" />
          </div>
          <div>
            <label className="text-[14px] font-medium text-on-dark-muted mb-1 block">Location</label>
            <Input value={form.targetDemographic.location} onChange={(e) => update("targetDemographic", { ...form.targetDemographic, location: e.target.value })} placeholder="e.g., Indonesia" />
          </div>
          <div>
            <label className="text-[14px] font-medium text-on-dark-muted mb-1 block">Interests (comma-separated)</label>
            <Input value={form.targetDemographic.interests.join(", ")} onChange={(e) => update("targetDemographic", { ...form.targetDemographic, interests: e.target.value.split(",").map((s) => s.trim()) })} placeholder="tech, marketing, social media" />
          </div>
        </div>
      ),
    },
    {
      title: "Brand Personality",
      fields: (
        <div className="space-y-4">
          <label className="text-[14px] font-medium text-on-dark-muted mb-2 block">Select traits:</label>
          <div className="flex flex-wrap gap-2">
            {["Inovatif", "Terpercaya", "Muda", "Professional", "Ramah", "Berani", "Elegan", "Santai"].map((trait) => {
              const selected = form.brandPersonality?.includes(trait);
              return (
                <button
                  key={trait}
                  onClick={() => {
                    const current = form.brandPersonality || [];
                    update("brandPersonality", selected ? current.filter((t) => t !== trait) : [...current, trait]);
                  }}
                  className={`px-4 py-1.5 rounded-full text-[14px] font-medium leading-[1.29] uppercase tracking-[0.2px] transition-all ${
                    selected ? "bg-accent-lime text-ink-deep" : "bg-accent-violet-mid/50 text-on-dark-muted hover:text-on-primary/80"
                  }`}
                >
                  {trait}
                </button>
              );
            })}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-colors ${
              i < step ? "bg-accent-lime text-ink-deep" : i === step ? "border-2 border-accent-lime text-on-primary" : "border-2 border-hairline-violet text-on-dark-muted"
            }`}>
              {i < step ? "\u2713" : i + 1}
            </div>
            <span className="text-[14px] leading-[1.43] text-on-dark-muted hidden sm:inline">{s.title}</span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-hairline-violet mx-1" />}
          </div>
        ))}
      </div>

      {steps[step].fields}

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-4 py-1.5 rounded-full bg-on-dark-faint text-on-primary text-[14px] font-bold leading-[1.14] uppercase tracking-[0.2px] transition-all hover:bg-on-dark-muted disabled:opacity-40"
        >
          Back
        </button>
        <div className="flex items-center gap-3">
          <button className="text-[14px] leading-[1.43] text-on-dark-muted hover:text-on-primary">Skip</button>
          <button
            onClick={() => {
              if (step < steps.length - 1) setStep(step + 1);
              else onSubmit(form);
            }}
            className="px-4 py-1.5 rounded-md bg-on-primary text-ink-deep text-[14px] font-bold leading-[1.14] uppercase tracking-[0.2px] transition-all hover:bg-surface-press-light shadow-[rgb(21,15,35)_0_0_8px_6px]"
          >
            {step < steps.length - 1 ? "Next" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
