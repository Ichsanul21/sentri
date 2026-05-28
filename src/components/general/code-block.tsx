"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language, className = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-surface-night text-on-primary rounded-md border border-hairline-violet overflow-hidden ${className}`}>
      {language && (
        <div className="flex items-center justify-between px-4 py-1.5 bg-ink-deep border-b border-hairline-violet">
          <span className="text-[12px] font-medium uppercase tracking-[0.2px] text-on-dark-muted">{language}</span>
          <button onClick={copy} className="text-on-dark-muted hover:text-on-primary transition-colors">
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      )}
      <pre className="px-4 py-3 overflow-x-auto">
        <code className="font-mono text-[16px] leading-[1.5] whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}
