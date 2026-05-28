"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { WidgetCard } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { X, Plus } from "lucide-react";
import { useState, useEffect } from "react";

const toneOptions = ["Formal", "Casual", "Authoritative", "Energetic", "Humorous"];

function loadArr(key: string, fallback: string[]): string[] {
  if (typeof window === "undefined") return fallback;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
}

function saveArr(key: string, arr: string[]) {
  if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(arr));
}

export default function ToneMatrixPage() {
  const { toast } = useToast();
  const [selected, setSelected] = useState(() => loadArr("sentri_tone_selected", ["Formal", "Inovatif"]));
  const [banned, setBanned] = useState(() => loadArr("sentri_tone_banned", ["murah", "murahan", "males"]));
  const [preferred, setPreferred] = useState(() => loadArr("sentri_tone_preferred", ["premium", "terjangkau", "kualitas"]));
  const [newWord, setNewWord] = useState("");

  useEffect(() => { saveArr("sentri_tone_selected", selected); }, [selected]);
  useEffect(() => { saveArr("sentri_tone_banned", banned); }, [banned]);
  useEffect(() => { saveArr("sentri_tone_preferred", preferred); }, [preferred]);

  const addWord = (list: string[], setter: (l: string[]) => void) => {
    if (newWord.trim()) { setter([...list, newWord.trim()]); setNewWord(""); }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Breadcrumbs items={[{ label: "Brand", href: "/brand" }, { label: "Tone & Voice Matrix" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Tone & Voice Matrix</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">Define how your brand communicates across platforms</p>
      </div>

      <WidgetCard title="Communication Style">
        <div className="flex flex-wrap gap-2">
          {toneOptions.map((t) => {
            const active = selected.includes(t);
            return (
              <button key={t}
                onClick={() => setSelected(active ? selected.filter((s) => s !== t) : [...selected, t])}
                className={`px-4 py-2 rounded-xl text-[14px] font-medium uppercase tracking-[0.2px] transition-all border ${
                  active ? "bg-accent-lime text-ink-deep border-accent-lime" : "bg-accent-violet-mid/30 text-on-dark-muted border-transparent"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
        <p className="text-[14px] text-on-dark-muted mt-2">Selected: <span className="text-on-primary">{selected.join(", ")}</span></p>
      </WidgetCard>

      <WidgetCard title="Banned Words">
        <p className="text-[14px] text-on-dark-muted mb-2">Words the brand should never use</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {banned.map((w) => (
            <Badge key={w} variant="sentiment-negative" className="gap-1 px-2 py-1">
              {w}
              <button onClick={() => { setBanned(banned.filter((b) => b !== w)); }} className="hover:text-on-primary">
                <X size={12} />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Add banned word..." value={newWord} onChange={(e) => setNewWord(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addWord(banned, setBanned)} />
          <Button variant="violet-token" size="icon" onClick={() => addWord(banned, setBanned)}>
            <Plus size={16} />
          </Button>
        </div>
      </WidgetCard>

      <WidgetCard title="Preferred Words">
        <p className="text-[14px] text-on-dark-muted mb-2">Words the brand should prioritize</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {preferred.map((w) => (
            <Badge key={w} variant="sentiment-positive" className="gap-1 px-2 py-1">
              {w}
              <button onClick={() => { setPreferred(preferred.filter((p) => p !== w)); }} className="hover:text-on-primary">
                <X size={12} />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Add preferred word..." value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (addWord(preferred, setPreferred), setNewWord(""))} />
          <Button variant="violet-token" size="icon" onClick={() => addWord(preferred, setPreferred)}>
            <Plus size={16} />
          </Button>
        </div>
      </WidgetCard>

      <div className="flex justify-end gap-3">
        <Button variant="ghost" onClick={() => { setSelected([]); setBanned([]); setPreferred([]); toast("Reset complete", "info"); }}>Reset</Button>
        <Button variant="primary" onClick={() => toast("Tone matrix saved", "success")}>Save Changes</Button>
      </div>
    </div>
  );
}
