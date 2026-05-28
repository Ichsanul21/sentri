"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BrandHealthGauge } from "@/components/dashboard/brand-health-gauge";
import { Lightbulb, Calendar, Users, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function StrategyPage() {
  const [draft, setDraft] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [platform, setPlatform] = useState("instagram");

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Strategy" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Strategy & Recommendation Engine</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">AI-powered content optimization and campaign insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WidgetCard title="Content Tone Checker" className="lg:row-span-2">
          <p className="text-[14px] text-on-dark-muted mb-3">Paste your draft content to check brand voice alignment</p>
          <Textarea
            placeholder="Masukkan draf konten di sini..."
            value={draft}
            onChange={(e) => { setDraft(e.target.value); setAnalyzed(false); }}
            className="min-h-[150px]"
          />
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {["instagram", "twitter", "tiktok", "linkedin", "facebook"].map((p) => (
              <button key={p}
                onClick={() => setPlatform(p)}
                className={`px-3 py-1.5 rounded-xl text-[14px] font-medium uppercase tracking-[0.2px] transition-all whitespace-nowrap ${
                  platform === p ? "bg-accent-lime text-ink-deep" : "bg-accent-violet-mid/30 text-on-dark-muted"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <Button variant="primary" className="mt-3 w-full" onClick={() => setAnalyzed(true)}>
            Check Tone Alignment
          </Button>

          {analyzed && (
            <div className="mt-4 space-y-4 animate-fade-slide-right">
              <div className="flex items-center justify-center">
                <BrandHealthGauge score={78} size="compact" label="Tone Score" />
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2 p-2 rounded bg-severity-high/10">
                  <Badge variant="severity-high">HIGH</Badge>
                  <div>
                    <p className="text-[16px]">2 banned words found</p>
                    <p className="text-[14px] text-accent-lime">{'Suggestion: Replace \u201Cmurah\u201D with \u201Cterjangkau\u201D'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-2 rounded bg-accent-lime/10">
                  <Badge variant="sentiment-positive">OK</Badge>
                  <div>
                    <p className="text-[16px]">Tone matches brand voice</p>
                    <p className="text-[14px] text-on-dark-muted">Formal tone detected — suitable for LinkedIn</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[16px] font-semibold">
                <CheckCircle size={18} className="text-sentiment-positive" />
                Fit for LinkedIn
              </div>
            </div>
          )}
        </WidgetCard>

        <WidgetCard title="Campaign Optimizer">
          <Lightbulb size={24} className="text-accent-lime mb-2" />
          <p className="text-[16px] text-on-dark-muted mb-3">{'AI recommendations for next week\u2019s content strategy'}</p>
          <div className="space-y-3">
            {[
              { type: "Educational", reason: "Minggu lalu engagement rate 5.2%", expected: "High" },
              { type: "Behind the Scenes", reason: "No BTS content in 2 weeks — content gap", expected: "Medium" },
              { type: "Entertainment", reason: "Top performer last month", expected: "Very High" },
            ].map((rec) => (
              <div key={rec.type} className="flex items-start gap-3 p-3 rounded bg-ink-deep border border-hairline-violet">
                <div className="w-8 h-8 rounded-full bg-accent-lime/10 flex items-center justify-center shrink-0">
                  <Calendar size={16} className="text-accent-lime" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-semibold">{rec.type}</span>
                    <Badge variant={rec.expected === "Very High" ? "sentiment-positive" : "sentiment-neutral"}>{rec.expected}</Badge>
                  </div>
                  <p className="text-[14px] text-on-dark-muted">{rec.reason}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="violet-token" className="mt-3 w-full">Generate Full Report</Button>
        </WidgetCard>

        <WidgetCard title="Audience Persona Matcher">
          <Users size={24} className="text-accent-pink mb-2" />
          <p className="text-[16px] text-on-dark-muted mb-3">How well does your audience match your target demographic?</p>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                <circle cx="60" cy="60" r="52" fill="none" stroke="#c2ef4e" strokeWidth="8"
                  strokeDasharray={`${(82/100) * 327} 327`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[30px] font-semibold text-accent-lime">82%</div>
                  <div className="text-[12px] text-on-dark-muted">Alignment</div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { dim: "Age", expected: "25-45", actual: "28-42", action: "On target" },
              { dim: "Location", expected: "Indonesia", actual: "78% Indonesia", action: "Good reach" },
              { dim: "Interest", expected: "Technology", actual: "SaaS + Marketing", action: "Needs lifestyle content" },
            ].map((g) => (
              <div key={g.dim} className="flex items-center justify-between p-2 rounded bg-ink-deep text-[14px]">
                <span className="font-semibold">{g.dim}</span>
                <span className="text-on-dark-muted">{g.actual}</span>
                <span className="text-accent-lime">{g.action}</span>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
