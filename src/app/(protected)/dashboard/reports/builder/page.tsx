"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/components/ui/toast";
import { generateId } from "@/lib/storage";
import { Check, Loader2 } from "lucide-react";

const reportFormats = ["PDF", "PPT", "Excel"];

const sectionOptions = [
  { key: "executive_summary", label: "Executive Summary" },
  { key: "sentiment_trend", label: "Sentiment Trend" },
  { key: "competitor_comparison", label: "Competitor Comparison" },
  { key: "top_mentions", label: "Top Mentions" },
  { key: "keyword_analysis", label: "Keyword Analysis" },
  { key: "recommendations", label: "Recommendations" },
];

export default function ReportBuilderPage() {
  const router = useRouter();
  const { addReport } = useApp();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [format, setFormat] = useState("PDF");
  const [brand, setBrand] = useState("All Brands");
  const [fromDate, setFromDate] = useState("2026-05-01");
  const [toDate, setToDate] = useState("2026-05-28");
  const [selectedSections, setSelectedSections] = useState<string[]>(["executive_summary"]);
  const [generating, setGenerating] = useState(false);

  const toggleSection = (key: string) => {
    setSelectedSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleGenerate = () => {
    if (!name.trim()) { toast("Please enter a report name", "error"); return; }
    setGenerating(true);
    setTimeout(() => {
      addReport({
        id: generateId(),
        name,
        sections: selectedSections,
        format,
        brand,
        dateRange: { from: fromDate, to: toDate },
        createdAt: new Date().toISOString(),
      });
      setGenerating(false);
      toast("Report generated successfully!", "success");
      router.push("/dashboard/reports");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Reports", href: "/dashboard/reports" }, { label: "Builder" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Report Builder</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Create custom reports with drag-and-drop</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <WidgetCard title="Report Details">
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-on-dark-muted mb-1.5">Report Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Monthly Brand Performance"
                  className="w-full bg-ink-deep border border-hairline-violet rounded-lg px-3 py-2.5 text-[14px] text-on-primary placeholder:text-on-dark-muted/50 focus:outline-none focus:border-accent-lime transition-colors"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-on-dark-muted mb-1.5">Date Range</label>
                <div className="flex items-center gap-3">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="flex-1 bg-ink-deep border border-hairline-violet rounded-lg px-3 py-2.5 text-[14px] text-on-primary focus:outline-none focus:border-accent-lime transition-colors"
                  />
                  <span className="text-on-dark-muted">to</span>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="flex-1 bg-ink-deep border border-hairline-violet rounded-lg px-3 py-2.5 text-[14px] text-on-primary focus:outline-none focus:border-accent-lime transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-on-dark-muted mb-1.5">Format</label>
                <div className="flex items-center gap-2">
                  {reportFormats.map((f) => (
                    <Badge
                      key={f}
                      variant={format === f ? "lime" : "default"}
                      className="cursor-pointer"
                      onClick={() => setFormat(f)}
                    >
                      {format === f && <Check size={10} />} {f}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-on-dark-muted mb-1.5">Brand</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-ink-deep border border-hairline-violet rounded-lg px-3 py-2.5 text-[14px] text-on-primary focus:outline-none focus:border-accent-lime transition-colors"
                >
                  <option>All Brands</option>
                  <option>Brand A</option>
                  <option>Brand B</option>
                  <option>Brand C</option>
                </select>
              </div>
            </div>
          </WidgetCard>

          <WidgetCard title="Report Sections">
            <div className="space-y-2">
              {sectionOptions.map((section) => {
                const selected = selectedSections.includes(section.key);
                return (
                  <label
                    key={section.key}
                    onClick={() => toggleSection(section.key)}
                    className="flex items-center gap-3 p-2 rounded hover:bg-accent-violet-mid/10 cursor-pointer transition-colors"
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      selected ? "bg-accent-lime border-accent-lime" : "border-hairline-violet bg-ink-deep"
                    }`}>
                      {selected && <Check size={12} className="text-ink-deep" />}
                    </div>
                    <span className="text-[14px] font-medium">{section.label}</span>
                  </label>
                );
              })}
            </div>
          </WidgetCard>
        </div>

        <div className="space-y-4">
          <WidgetCard title="Summary">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-on-dark-muted">Sections</span>
                <span className="font-medium">{selectedSections.length}</span>
              </div>
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-on-dark-muted">Format</span>
                <span className="font-medium">{format}</span>
              </div>
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-on-dark-muted">Date Range</span>
                <span className="font-medium">{Math.ceil((new Date(toDate).getTime() - new Date(fromDate).getTime()) / 86400000)} days</span>
              </div>
              <div className="pt-3 border-t border-hairline-violet/50">
                <Button variant="primary" className="w-full" onClick={handleGenerate} disabled={generating}>
                  {generating ? <Loader2 size={16} className="animate-spin" /> : null}
                  {generating ? "Generating..." : "Generate Report"}
                </Button>
              </div>
            </div>
          </WidgetCard>
        </div>
      </div>
    </div>
  );
}
