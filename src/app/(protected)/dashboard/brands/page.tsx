"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Building2, TrendingUp, MessageCircle, AlertTriangle } from "lucide-react";
import { WidgetCard } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/AppContext";

export default function BrandsPage() {
  const { brands, crises } = useApp();
  const [searchTerm] = useState("");

  const filteredBrands = brands.filter(b => 
    b.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Brand" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Brands</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Manage your brand profiles and monitor performance</p>
        </div>
        <Link 
          href="/dashboard/brands/setup"
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-accent-lime text-ink-deep text-[14px] font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> Add Brand
        </Link>
      </div>

      {filteredBrands.length === 0 ? (
        <WidgetCard className="py-16 text-center animate-fade-in-up">
          <div className="w-16 h-16 rounded-full bg-accent-lime/10 flex items-center justify-center mx-auto mb-4">
            <Building2 size={32} className="text-accent-lime" />
          </div>
          <h3 className="text-[20px] font-semibold mb-2">No Brands Yet</h3>
          <p className="text-on-dark-muted mb-6">Create your first brand profile to start monitoring sentiment</p>
          <Link 
            href="/dashboard/brands/setup"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-lime text-ink-deep text-[14px] font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={16} /> Create Your First Brand
          </Link>
        </WidgetCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-stagger">
          {filteredBrands.map((brand) => {
            const brandCrises = crises.filter(c => c.severity === "high" || c.severity === "critical");
            
            return (
              <Link key={brand.id} href={`/dashboard/brands/${brand.id}`}>
                <WidgetCard className="hover:border-accent-lime/30 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-[20px] font-bold text-white"
                        style={{ backgroundColor: brand.colors.primary }}
                      >
                        {brand.brandName[0]}
                      </div>
                      <div>
                        <h3 className="text-[18px] font-semibold">{brand.brandName}</h3>
                        {brand.tagline && (
                          <p className="text-[13px] text-on-dark-muted">{brand.tagline}</p>
                        )}
                      </div>
                    </div>
                    {brandCrises.length > 0 && (
                      <Badge variant="severity-critical">{brandCrises.length}</Badge>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-[14px]">
                      <span className="text-on-dark-muted">Industry</span>
                      <Badge variant="default">{brand.industry}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-[14px]">
                      <span className="text-on-dark-muted">Target</span>
                      <span className="font-medium">{brand.targetDemographic.ageRange}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-hairline-violet/50 grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-[18px] font-semibold text-sentiment-positive">
                        <TrendingUp size={16} /> 72%
                      </div>
                      <span className="text-[11px] text-on-dark-muted">Health</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-[18px] font-semibold">
                        <MessageCircle size={16} /> 12K
                      </div>
                      <span className="text-[11px] text-on-dark-muted">Mentions</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-[18px] font-semibold text-severity-critical">
                        <AlertTriangle size={16} /> {brandCrises.length}
                      </div>
                      <span className="text-[11px] text-on-dark-muted">Alerts</span>
                    </div>
                  </div>
                </WidgetCard>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
