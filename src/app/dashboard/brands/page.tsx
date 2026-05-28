"use client";

import { WidgetCard } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Plus, Settings, TrendingUp } from "lucide-react";
import { useLoading } from "@/hooks/use-loading";

interface BrandItem {
  name: string;
  tagline: string;
  industry: string;
  tone: string;
  score: number;
  status: "active" | "inactive";
}

const brands: BrandItem[] = [
  { name: "Sentri", tagline: "Monitor your brand", industry: "Technology", tone: "Formal, Inovatif", score: 84, status: "active" },
  { name: "Sentri Pro", tagline: "Enterprise analytics", industry: "Technology", tone: "Professional", score: 72, status: "active" },
];

export default function BrandPage() {
  const { loading, error } = useLoading(brands, 600);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton variant="text" className="h-8 w-48" />
            <Skeleton variant="text" className="h-4 w-64 mt-2" />
          </div>
          <Skeleton variant="text" className="h-9 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} variant="card" />)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: "Brand" }]} />
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 rounded-full bg-severity-critical/10 flex items-center justify-center mb-4">
            <Settings size={28} className="text-severity-critical" />
          </div>
          <h2 className="text-[22px] font-semibold mb-2">Failed to load brands</h2>
          <p className="text-[16px] text-on-dark-muted mb-4">{error}</p>
          <Button variant="violet-token" onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: "Brand" }]} />
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 rounded-full bg-accent-violet-mid/30 flex items-center justify-center mb-4">
            <Plus size={28} className="text-on-dark-muted" />
          </div>
          <h2 className="text-[22px] font-semibold mb-2">No brands yet</h2>
          <p className="text-[16px] text-on-dark-muted mb-4">Create your first brand profile to get started</p>
          <Link href="/dashboard/brands/setup">
            <Button variant="primary"><Plus size={18} /> New Brand</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Brand" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Brand Identity</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Manage your brand profiles and identity settings</p>
        </div>
        <Link href="/brand/setup">
          <Button variant="primary">
            <Plus size={18} />
            New Brand
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map((brand) => (
          <WidgetCard key={brand.name}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-lime/10 flex items-center justify-center text-accent-lime font-bold text-lg">
                  {brand.name[0]}
                </div>
                <div>
                  <h3 className="text-[20px] font-semibold leading-[1.25]">{brand.name}</h3>
                  <p className="text-[14px] text-on-dark-muted leading-[1.43]">{brand.tagline}</p>
                </div>
              </div>
              <Badge variant={brand.status === "active" ? "sentiment-positive" : "sentiment-neutral"}>
                {brand.status}
              </Badge>
            </div>
            <div className="space-y-2 text-[14px] leading-[1.43] text-on-dark-muted">
              <div className="flex justify-between">
                <span>Industry</span>
                <span className="text-on-primary">{brand.industry}</span>
              </div>
              <div className="flex justify-between">
                <span>Tone</span>
                <span className="text-on-primary">{brand.tone}</span>
              </div>
              <div className="flex justify-between">
                <span>Health Score</span>
                <span className="text-accent-lime font-semibold">{brand.score}/100</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-3 border-t border-hairline-violet/50">
              <Link href={`/dashboard/brands/setup`}>
                <Button variant="violet-token" size="sm">
                  <Settings size={14} />
                  Edit
                </Button>
              </Link>
              <Link href={`/dashboard/brands/tone-matrix`}>
                <Button variant="violet-token" size="sm">
                  <TrendingUp size={14} />
                  Tone
                </Button>
              </Link>
            </div>
          </WidgetCard>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/brands/setup" className="block">
          <WidgetCard className="hover:border-accent-lime/30 transition-colors cursor-pointer h-full">
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent-lime/10 flex items-center justify-center mb-3">
                <Plus size={24} className="text-accent-lime" />
              </div>
              <h3 className="text-[16px] font-semibold">Brand DNA Setup</h3>
              <p className="text-[14px] text-on-dark-muted mt-1">Configure name, logo, colors, and demographics</p>
            </div>
          </WidgetCard>
        </Link>
        <Link href="/dashboard/brands/tone-matrix" className="block">
          <WidgetCard className="hover:border-accent-lime/30 transition-colors cursor-pointer h-full">
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent-pink/10 flex items-center justify-center mb-3">
                <Settings size={24} className="text-accent-pink" />
              </div>
              <h3 className="text-[16px] font-semibold">Tone & Voice Matrix</h3>
              <p className="text-[14px] text-on-dark-muted mt-1">Define communication style and brand voice</p>
            </div>
          </WidgetCard>
        </Link>
        <Link href="/dashboard/brands/competitors" className="block">
          <WidgetCard className="hover:border-accent-lime/30 transition-colors cursor-pointer h-full">
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent-violet/10 flex items-center justify-center mb-3">
                <TrendingUp size={24} className="text-accent-violet" />
              </div>
              <h3 className="text-[16px] font-semibold">Competitor Radar</h3>
              <p className="text-[14px] text-on-dark-muted mt-1">Track and compare up to 5 competitors</p>
            </div>
          </WidgetCard>
        </Link>
      </div>
    </div>
  );
}
