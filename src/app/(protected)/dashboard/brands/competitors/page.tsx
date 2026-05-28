"use client";

import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { WidgetCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/components/ui/toast";
import { generateId } from "@/lib/storage";
import { Plus, X, GripVertical, AtSign, Camera } from "lucide-react";

export default function CompetitorsPage() {
  const router = useRouter();
  const { competitors, addCompetitor, removeCompetitor } = useApp();
  const { toast } = useToast();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Breadcrumbs items={[{ label: "Brand", href: "/dashboard/brands" }, { label: "Competitors" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium leading-[1.2]">Competitor Radar</h1>
          <p className="text-[16px] text-on-dark-muted mt-1">Track up to 5 competitors for head-to-head comparison</p>
        </div>
        <Badge variant={competitors.length >= 5 ? "sentiment-negative" : "sentiment-positive"}>
          {competitors.length}/5 competitors
        </Badge>
      </div>

      <div className="space-y-3 animate-stagger">
        {competitors.map((c) => (
          <WidgetCard key={c.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5">
            <GripVertical size={18} className="text-on-dark-muted cursor-grab shrink-0" />
            <div className="flex-1 space-y-2 w-full">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-accent-violet-mid/30 flex items-center justify-center font-bold">{c.name[0]}</span>
                <span className="text-[20px] font-semibold leading-[1.25]">{c.name}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {c.handles.twitter && <Badge variant="default" className="gap-1"><AtSign size={12} />{c.handles.twitter}</Badge>}
                {c.handles.instagram && <Badge variant="default" className="gap-1"><Camera size={12} />{c.handles.instagram}</Badge>}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { removeCompetitor(c.id); toast("Competitor removed", "info"); }}>
              <X size={16} /> Remove
            </Button>
          </WidgetCard>
        ))}
      </div>

      {competitors.length < 5 && (
        <Button variant="violet-token" onClick={() => {
          const n = `Competitor ${competitors.length + 1}`;
          addCompetitor({ id: generateId(), name: n, handles: { twitter: `@${n.toLowerCase()}`, instagram: `@${n.toLowerCase()}` } });
          toast("Competitor added", "success");
        }}>
          <Plus size={16} /> Add Competitor
        </Button>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t border-hairline-violet/50">
        <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
        <Button variant="primary" onClick={() => toast("Competitors saved", "success")}>Save Competitors</Button>
      </div>
    </div>
  );
}
