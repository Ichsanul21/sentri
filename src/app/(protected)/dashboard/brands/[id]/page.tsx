"use client";

import { ArrowLeft, Building2, Globe, Users, Hash, Target } from "lucide-react";
import Link from "next/link";
import { WidgetCard } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { BrandHealthGauge } from "@/components/dashboard/brand-health-gauge";
import { SentimentDonut } from "@/components/dashboard/sentiment-donut";
import { useBrand } from "@/hooks/use-brand";

export default function BrandDetailPage() {
  const { brand, competitors, keywords } = useBrand();

  if (!brand) {
    return (
      <div className="space-y-6">
        <Link href="/dashboard/brands" className="flex items-center gap-2 text-[14px] text-on-dark-muted hover:text-on-primary transition-colors">
          <ArrowLeft size={16} /> Back to Brands
        </Link>
        
        <Breadcrumbs items={[{ label: "Brand", href: "/dashboard/brands" }, { label: "Not Found" }]} />
        
        <WidgetCard className="py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-severity-critical/10 flex items-center justify-center mx-auto mb-4">
            <Building2 size={32} className="text-severity-critical" />
          </div>
          <h3 className="text-[20px] font-semibold mb-2">Brand Not Found</h3>
          <p className="text-on-dark-muted mb-6">The brand you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/dashboard/brands"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-lime text-ink-deep text-[14px] font-semibold hover:opacity-90 transition-opacity"
          >
            View All Brands
          </Link>
        </WidgetCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/brands" className="flex items-center gap-2 text-[14px] text-on-dark-muted hover:text-on-primary transition-colors">
        <ArrowLeft size={16} /> Back to Brands
      </Link>

      <Breadcrumbs items={[{ label: "Brand", href: "/dashboard/brands" }, { label: brand.brandName }]} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WidgetCard>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-accent-violet-deep flex items-center justify-center">
                <Building2 size={28} className="text-accent-lime" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-[27px] font-medium leading-[1.25]">{brand.brandName}</h1>
                  <div className="w-4 h-4 rounded-full border border-hairline-violet" style={{ backgroundColor: brand.colors.primary }} />
                </div>
                {brand.tagline && <p className="text-[16px] font-medium leading-[1.5] text-on-dark-muted mt-1">{brand.tagline}</p>}
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="lime">{brand.industry}</Badge>
                  {brand.brandPersonality?.map((trait) => (
                    <Badge key={trait} variant="default">{trait}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </WidgetCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <WidgetCard title="Target Audience">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[14px] leading-[1.43]">
                  <Users size={14} className="text-on-dark-muted" />
                  <span className="text-on-dark-muted">Age:</span> {brand.targetDemographic.ageRange}
                </div>
                <div className="flex items-center gap-2 text-[14px] leading-[1.43]">
                  <Globe size={14} className="text-on-dark-muted" />
                  <span className="text-on-dark-muted">Location:</span> {brand.targetDemographic.location}
                </div>
                <div className="flex items-start gap-2 text-[14px] leading-[1.43]">
                  <Target size={14} className="text-on-dark-muted mt-0.5" />
                  <div>
                    <span className="text-on-dark-muted">Interests:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {brand.targetDemographic.interests.map((i) => (
                        <Badge key={i} variant="default" className="text-[11px]">{i}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </WidgetCard>

            <WidgetCard title="Keywords & Hashtags">
              <div className="space-y-3">
                <div>
                  <span className="text-[14px] font-medium text-on-dark-muted flex items-center gap-1"><Hash size={14} /> Keywords</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                  {keywords?.keywords.map((kw) => (
                    <Badge key={kw} variant="lime" className="text-[11px]">{kw}</Badge>
                  ))}
                </div>
                </div>
                <div>
                  <span className="text-[14px] font-medium text-on-dark-muted flex items-center gap-1"><Hash size={14} /> Hashtags</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                  {keywords?.hashtags.map((ht) => (
                    <Badge key={ht} variant="default" className="text-[11px]">{ht}</Badge>
                  ))}
                </div>
                </div>
              </div>
            </WidgetCard>
          </div>

          <WidgetCard title="Competitors">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {competitors.map((comp) => (
                <div key={comp.id} className="flex items-center gap-3 p-3 rounded bg-ink-deep border border-hairline-violet">
                  <div className="w-10 h-10 rounded-full bg-accent-violet-mid/30 flex items-center justify-center text-[16px] font-bold">
                    {comp.name[0]}
                  </div>
                  <div>
                    <span className="text-[16px] font-semibold leading-[1.5]">{comp.name}</span>
                    <div className="text-[14px] leading-[1.43] text-on-dark-muted">
                      {Object.entries(comp.handles).map(([p, h]) => `${p}: ${h}`).join(", ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </WidgetCard>
        </div>

        <div className="space-y-6">
          <WidgetCard title="Brand Health">
            <BrandHealthGauge score={84} />
          </WidgetCard>
          <WidgetCard title="Sentiment Overview">
            <SentimentDonut positive={72} neutral={20} negative={8} />
          </WidgetCard>
        </div>
      </div>
    </div>
  );
}
