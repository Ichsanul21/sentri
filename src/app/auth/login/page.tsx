"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields"); return; }
    setLoading(true);
    setError("");
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      router.push("/dashboard/executive-summary");
    } else {
      setError(result.error || "Login failed");
    }
  };

  return (
    <div className="bg-surface-canvas-light rounded-[12px] border border-hairline-cloud shadow-[rgba(0,0,0,0.1)_0_10px_15px_-3px,rgba(0,0,0,0.1)_0_4px_6px_-4px] p-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-[30px] font-medium leading-[1.2] text-ink-deep">Masuk</h1>
        <p className="text-[16px] text-ink-deep/60">Selamat datang kembali di Sentri</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded bg-severity-critical/10 border border-severity-critical/20 text-[14px] text-sentiment-negative">
            {error}
          </div>
        )}

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

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[16px] font-medium leading-[1.5] text-ink-deep">Kata Sandi</label>
            <Link href="/auth/forgot-password" className="text-[14px] text-ink-deep underline underline-offset-2">
              Lupa kata sandi?
            </Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-surface-canvas-light text-ink-deep text-[16px] font-medium leading-[1.5] px-3 py-2 rounded-[6px] border border-hairline-cool outline-none transition-all focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] focus:ring-2 focus:ring-ring-focus"
          />
        </div>

        <Button type="submit" variant="primary" className="w-full bg-primary text-white" disabled={loading}>
          {loading ? <Loader2 size={18} className="animate-spin" /> : null}
          {loading ? "Memproses..." : "Masuk"}
        </Button>
      </form>

      <p className="text-center text-[14px] text-ink-deep/60">
        Belum punya akun?{" "}
        <Link href="/auth/register" className="text-ink-deep underline underline-offset-2 font-medium">
          Daftar
        </Link>
      </p>

      <div className="pt-2 border-t border-hairline-cool/30">
        <p className="text-[12px] text-ink-deep/40 text-center mb-2">Demo Accounts</p>
        <div className="flex flex-col gap-1 text-[12px] text-ink-deep/50">
          <button onClick={() => { setEmail("admin@sentri.com"); setPassword("password"); }} className="hover:text-ink-deep transition-colors text-left">
            admin@sentri.com (Super Admin)
          </button>
          <button onClick={() => { setEmail("manager@sentri.com"); setPassword("password"); }} className="hover:text-ink-deep transition-colors text-left">
            manager@sentri.com (Manager)
          </button>
        </div>
      </div>
    </div>
  );
}
