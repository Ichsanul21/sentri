"use client";

import { useState } from "react";
import { Copy, Eye, EyeOff, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ApiKey } from "@/types/admin";

interface ApiKeyManagerProps {
  keys: ApiKey[];
  onGenerate: (name: string, env: "production" | "testing") => void;
  onRevoke: (id: string) => void;
  onRotate: (id: string) => void;
}

export function ApiKeyManager({ keys, onGenerate, onRevoke, onRotate }: ApiKeyManagerProps) {
  const [showKey, setShowKey] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [env, setEnv] = useState<"production" | "testing">("testing");

  const maskKey = (prefix: string) => `${prefix}${"\u2022".repeat(32)}`;

  return (
    <div className="space-y-4">
      <div className="bg-ink-deep border border-hairline-violet rounded-lg p-4">
        <h4 className="text-[16px] font-semibold leading-[1.5] mb-3">Generate New Key</h4>
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label className="text-[14px] font-medium text-on-dark-muted mb-1 block">Key Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Development"
              className="w-full bg-surface-night text-on-primary text-[16px] font-medium leading-[1.5] rounded-sm px-3 py-1.5 border border-hairline-violet outline-none"
            />
          </div>
          <div>
            <label className="text-[14px] font-medium text-on-dark-muted mb-1 block">Environment</label>
            <select
              value={env}
              onChange={(e) => setEnv(e.target.value as "production" | "testing")}
              className="bg-surface-night text-on-primary text-[16px] font-medium leading-[1.5] rounded-sm px-3 py-1.5 border border-hairline-violet outline-none"
            >
              <option value="testing">Testing</option>
              <option value="production">Production</option>
            </select>
          </div>
          <Button onClick={() => { if (name.trim()) { onGenerate(name.trim(), env); setName(""); } }}>
            Generate
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {keys.map((key) => (
          <div key={key.id} className="flex items-center justify-between bg-ink-deep border border-hairline-violet rounded-lg p-3 group">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-semibold leading-[1.5]">{key.name}</span>
                <span className={`text-[10px] font-semibold leading-[1.8] px-1.5 rounded-full ${
                  key.environment === "production" ? "bg-severity-critical/20 text-severity-critical" : "bg-severity-medium/20 text-severity-medium"
                }`}>
                  {key.environment}
                </span>
                <span className={`text-[10px] font-semibold leading-[1.8] px-1.5 rounded-full ${
                  key.status === "active" ? "bg-sentiment-positive/15 text-sentiment-positive" : "bg-sentiment-negative/15 text-sentiment-negative"
                }`}>
                  {key.status}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-mono text-[14px] text-on-dark-muted">
                  {showKey === key.id ? `${key.keyPrefix}${"\u2022".repeat(8)}` : maskKey(key.keyPrefix)}
                </span>
                <button onClick={() => setShowKey(showKey === key.id ? null : key.id)} className="text-on-dark-muted hover:text-on-primary">
                  {showKey === key.id ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button onClick={() => navigator.clipboard.writeText(key.keyPrefix)} className="text-on-dark-muted hover:text-on-primary">
                  <Copy size={14} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => onRotate(key.id)} className="p-1.5 rounded text-on-dark-muted hover:text-accent-lime"><RotateCcw size={14} /></button>
              <button onClick={() => onRevoke(key.id)} className="p-1.5 rounded text-on-dark-muted hover:text-sentiment-negative"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
