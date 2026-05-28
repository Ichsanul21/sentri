"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="bg-surface-canvas-light rounded-[12px] border border-hairline-cloud shadow-[rgba(0,0,0,0.1)_0_10px_15px_-3px,rgba(0,0,0,0.1)_0_4px_6px_-4px] p-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-[30px] font-medium leading-[1.2] text-ink-deep">Reset Kata Sandi</h1>
        <p className="text-[16px] text-ink-deep/60">Buat kata sandi baru untuk akun Anda</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[16px] font-medium leading-[1.5] text-ink-deep">Kata Sandi Baru</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 karakter"
            className="bg-surface-canvas-light text-ink-deep text-[16px] font-medium leading-[1.5] px-3 py-2 rounded-[6px] border border-hairline-cool outline-none transition-all focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] focus:ring-2 focus:ring-ring-focus"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[16px] font-medium leading-[1.5] text-ink-deep">Konfirmasi Kata Sandi</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-surface-canvas-light text-ink-deep text-[16px] font-medium leading-[1.5] px-3 py-2 rounded-[6px] border border-hairline-cool outline-none transition-all focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] focus:ring-2 focus:ring-ring-focus"
          />
        </div>

        <Button type="submit" variant="primary" className="w-full bg-primary text-white">
          Reset Kata Sandi
        </Button>
      </form>

      <p className="text-center text-[14px] text-ink-deep/60">
        <Link href="/auth/login" className="text-ink-deep underline underline-offset-2 font-medium">
          Kembali ke Masuk
        </Link>
      </p>
    </div>
  );
}
