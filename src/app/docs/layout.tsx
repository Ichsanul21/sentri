"use client";

import Link from "next/link";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-canvas-light text-ink-deep">
      <nav className="border-b border-hairline-cloud bg-white">
        <div className="mx-auto max-w-5xl flex items-center gap-6 px-6 py-4">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-accent-violet hover:text-accent-violet-deep transition-colors"
          >
            &larr; Dashboard
          </Link>
          <span className="text-sm font-semibold text-ink-deep">Developer Docs</span>
        </div>
      </nav>
      <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
    </div>
  );
}
