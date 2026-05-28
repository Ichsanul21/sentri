"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { BrandHealthGauge } from "@/components/dashboard/brand-health-gauge";
import { Badge } from "@/components/ui/badge";
import { ToneCheckerForm } from "@/components/strategy/tone-checker-form";
import { Loader2 } from "lucide-react";

const bannedWords = ["murah", "murahan", "males", "gratis", "promo"];
const preferredWords = ["premium", "terjangkau", "kualitas", "inovatif", "terpercaya"];

function analyzeTone(text: string) {
  const lower = text.toLowerCase();
  const foundBanned = bannedWords.filter((w) => lower.includes(w));
  const foundPreferred = preferredWords.filter((w) => lower.includes(w));
  const wordCount = text.split(/\s+/).length;
  const hasFormal = /dengan|untuk|kami|telah|akan|dapat/i.test(text);
  const hasCasual = /banget|sih|dong|kok|ya|nih/i.test(text);

  const toneScore = Math.min(100, Math.max(0,
    hasFormal ? 65 : 40 +
    (foundPreferred.length * 10) -
    (foundBanned.length * 20) +
    (wordCount > 10 ? 10 : 0)
  ));

  return {
    score: toneScore,
    banned: foundBanned,
    preferred: foundPreferred,
    hasFormal,
    hasCasual,
    wordCount,
  };
}

export default function ToneCheckerPage() {
  const [analyzed, setAnalyzed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof analyzeTone> | null>(null);

  const handleSubmit = (text: string, _platform: string) => {
    setAnalyzing(true);
    setTimeout(() => {
      const res = analyzeTone(text);
      setResult(res);
      setAnalyzed(true);
      setAnalyzing(false);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Breadcrumbs items={[{ label: "Strategy", href: "/dashboard/strategy" }, { label: "Tone Checker" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Content Tone Checker</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Validate your draft content against brand voice before posting</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WidgetCard title="Draft Content" className="h-full">
          <ToneCheckerForm onSubmit={handleSubmit} />
        </WidgetCard>

        <WidgetCard title="Analysis Results">
          {analyzing ? (
            <div className="flex items-center justify-center h-64 text-on-dark-muted text-[16px] gap-2">
              <Loader2 size={20} className="animate-spin" /> Analyzing...
            </div>
          ) : analyzed && result ? (
            <div className="space-y-4 animate-fade-slide-right">
              <div className="flex justify-center">
                <BrandHealthGauge score={result.score} size="compact" label="Tone Score" />
              </div>
              <div className="space-y-2">
                <div className={`flex items-start gap-2 p-3 rounded border ${
                  result.score >= 60
                    ? "bg-sentiment-positive/10 border-sentiment-positive/20"
                    : "bg-severity-high/10 border-severity-high/20"
                }`}>
                  <Badge variant={result.score >= 60 ? "sentiment-positive" : "severity-high"}>
                    {result.score >= 60 ? "OK" : "NEEDS WORK"}
                  </Badge>
                  <div>
                    <p className="text-[16px] font-semibold">Brand Voice Alignment: {result.score}%</p>
                    <p className="text-[14px] text-on-dark-muted">
                      {result.score >= 80 ? "Your content matches the brand tone guidelines well."
                        : result.score >= 60 ? "Your content is reasonably aligned."
                        : "Your content needs adjustment to match brand voice."}
                    </p>
                  </div>
                </div>
                {result.banned.length > 0 && (
                  <div className="flex items-start gap-2 p-3 rounded bg-severity-high/10 border border-severity-high/20">
                    <Badge variant="severity-high">{result.banned.length} ISSUE{result.banned.length > 1 ? 'S' : ''}</Badge>
                    <div>
                      <p className="text-[16px] font-semibold">Banned word{result.banned.length > 1 ? 's' : ''} detected</p>
                      <p className="text-[14px] text-on-dark-muted">{result.banned.join(", ")} in your banned words list</p>
                      <p className="text-[14px] text-accent-lime mt-1">Suggested: terjangkau, berkualitas, terpercaya</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2 p-3 rounded bg-ink-deep border border-hairline-violet">
                  <Badge variant="sentiment-neutral">INFO</Badge>
                  <div>
                    <p className="text-[16px] font-semibold">Content Stats</p>
                    <p className="text-[14px] text-on-dark-muted">{result.wordCount} words · {result.hasFormal ? "Formal tone" : result.hasCasual ? "Casual tone" : "Neutral tone"}</p>
                    {result.preferred.length > 0 && (
                      <p className="text-[14px] text-accent-lime mt-1">✓ {result.preferred.length} preferred word{result.preferred.length > 1 ? 's' : ''} used</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-on-dark-muted text-[16px]">
              Analysis results will appear here
            </div>
          )}
        </WidgetCard>
      </div>
    </div>
  );
}
