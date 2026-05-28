"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-surface-night rounded-[12px] border border-hairline-violet p-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-[30px] font-medium leading-[1.2]">Lupa Kata Sandi</h1>
        <p className="text-[16px] text-on-dark-muted">
          Masukkan email Anda dan kami akan mengirimkan tautan reset
        </p>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-4"
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-[16px] font-medium leading-[1.5] text-on-primary">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@perusahaan.com"
            className="bg-surface-canvas-dark text-on-primary text-[16px] font-medium leading-[1.5] px-3 py-2 rounded-[6px] border border-hairline-violet outline-none transition-all focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] focus:ring-2 focus:ring-ring-focus"
          />
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Kirim Tautan Reset
        </Button>
      </form>

      <p className="text-center text-[14px] text-on-dark-muted">
        <Link href="/auth/login" className="text-accent-lime underline underline-offset-2 font-medium">
          Kembali ke Masuk
        </Link>
      </p>
    </div>
  );
}
