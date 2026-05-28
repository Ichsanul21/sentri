"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-surface-canvas-light rounded-[12px] border border-hairline-cloud shadow-[rgba(0,0,0,0.1)_0_10px_15px_-3px,rgba(0,0,0,0.1)_0_4px_6px_-4px] p-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-[30px] font-medium leading-[1.2] text-ink-deep">Lupa Kata Sandi</h1>
        <p className="text-[16px] text-ink-deep/60">
          Masukkan email Anda dan kami akan mengirimkan tautan reset
        </p>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-4"
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-[16px] font-medium leading-[1.5] text-ink-deep">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@perusahaan.com"
            className="bg-surface-canvas-light text-ink-deep text-[16px] font-medium leading-[1.5] px-3 py-2 rounded-[6px] border border-hairline-cool outline-none transition-all focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] focus:ring-2 focus:ring-ring-focus"
          />
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Kirim Tautan Reset
        </Button>
      </form>

      <p className="text-center text-[14px] text-ink-deep/60">
        <Link href="/auth/login" className="text-accent-violet underline underline-offset-2 font-medium">
          Kembali ke Masuk
        </Link>
      </p>
    </div>
  );
}
