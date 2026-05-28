"use client";

import { useState } from "react";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Save, Plus, X, Hash, Globe } from "lucide-react";

export default function BrandSettingsPage() {
  const [keywords, setKeywords] = useState(["brand name", "product line", "campaign tag"]);
  const [newKeyword, setNewKeyword] = useState("");

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold leading-[1.3]">Brand — Settings</h1>
        <p className="text-[14px] text-on-dark-muted mt-1">Manage brand configuration and monitoring preferences.</p>
      </div>

      <WidgetCard title="Tracking Keywords">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {keywords.map((kw) => (
              <Badge key={kw} variant="lime" className="flex items-center gap-1 text-[12px]">
                <Hash size={12} /> {kw}
                <button onClick={() => removeKeyword(kw)} className="hover:text-red-400 transition-colors">
                  <X size={12} />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add keyword..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addKeyword()}
              className="flex-1 px-3 py-2 rounded-lg border border-hairline-violet bg-ink-deep text-on-primary text-[14px] outline-none focus:border-accent-lime/50"
            />
            <button onClick={addKeyword} className="flex items-center gap-1 px-3 py-2 rounded-lg bg-accent-violet-deep text-on-primary text-[14px] hover:bg-accent-violet-mid transition-colors">
              <Plus size={16} /> Add
            </button>
          </div>
        </div>
      </WidgetCard>

      <WidgetCard title="Platforms to Monitor">
        <div className="space-y-2">
          {["Twitter/X", "Instagram", "Reddit", "Facebook", "TikTok", "YouTube", "News"].map((platform) => (
            <label key={platform} className="flex items-center gap-3 p-2 rounded hover:bg-ink-deep/30 transition-colors cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-accent-lime w-4 h-4" />
              <Globe size={16} className="text-on-dark-muted" />
              <span className="text-[14px]">{platform}</span>
            </label>
          ))}
        </div>
      </WidgetCard>

      <WidgetCard title="Alert Preferences">
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded border border-hairline-violet">
            <div>
              <p className="text-[14px] font-medium">Sentiment threshold</p>
              <p className="text-[12px] text-on-dark-muted">Alert when positive sentiment drops below</p>
            </div>
            <select className="bg-ink-deep border border-hairline-violet rounded px-2 py-1 text-[14px] text-on-primary outline-none">
              <option>40%</option>
              <option>50%</option>
              <option selected>60%</option>
              <option>70%</option>
            </select>
          </label>
          <label className="flex items-center justify-between p-3 rounded border border-hairline-violet">
            <div>
              <p className="text-[14px] font-medium">Volume spike threshold</p>
              <p className="text-[12px] text-on-dark-muted">Alert when mention volume spikes by</p>
            </div>
            <select className="bg-ink-deep border border-hairline-violet rounded px-2 py-1 text-[14px] text-on-primary outline-none">
              <option>100%</option>
              <option selected>200%</option>
              <option>300%</option>
              <option>500%</option>
            </select>
          </label>
        </div>
      </WidgetCard>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-accent-lime text-ink-deep font-semibold text-[14px] hover:bg-accent-lime/90 transition-colors">
          <Save size={16} /> Save Settings
        </button>
      </div>
    </div>
  );
}
