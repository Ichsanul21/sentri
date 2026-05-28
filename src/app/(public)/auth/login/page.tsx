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
      const redirectTo = (result as any).redirectTo || "/dashboard/executive-summary";
      router.push(redirectTo);
    } else {
      setError(result.error || "Login failed");
    }
  };

  return (
    <div className="bg-surface-night rounded-[12px] border border-hairline-violet shadow-[rgba(0,0,0,0.1)_0_10px_15px_-3px,rgba(0,0,0,0.1)_0_4px_6px_-4px] p-8 space-y-6 animate-scale-in">
      <div className="text-center space-y-2 animate-fade-in-down">
        <h1 className="text-[30px] font-medium leading-[1.2]">Masuk</h1>
        <p className="text-[16px] text-on-dark-muted">Selamat datang kembali di Sentri</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-up">
        {error && (
          <div className="p-3 rounded bg-severity-critical/10 border border-severity-critical/20 text-[14px] text-sentiment-negative">
            {error}
          </div>
        )}

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

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[16px] font-medium leading-[1.5] text-on-primary">Kata Sandi</label>
            <Link href="/auth/forgot-password" className="text-[14px] text-accent-lime underline underline-offset-2">
              Lupa kata sandi?
            </Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-surface-canvas-dark text-on-primary text-[16px] font-medium leading-[1.5] px-3 py-2 rounded-[6px] border border-hairline-violet outline-none transition-all focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] focus:ring-2 focus:ring-ring-focus"
          />
        </div>

        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
          {loading ? <Loader2 size={18} className="animate-spin" /> : null}
          {loading ? "Memproses..." : "Masuk"}
        </Button>
      </form>

      <p className="text-center text-[14px] text-on-dark-muted">
        Belum punya akun?{" "}
        <Link href="/auth/register" className="text-accent-lime underline underline-offset-2 font-medium">
          Daftar
        </Link>
      </p>

      <div className="pt-2 border-t border-hairline-violet/30 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <p className="text-[12px] text-on-dark-muted/40 text-center mb-2">Demo Accounts (password: password)</p>
        <div className="flex flex-col gap-1 text-[12px] text-on-dark-muted/50">
          <button onClick={() => { setEmail("admin@sentri.com"); setPassword("password"); }} className="hover:text-on-primary transition-all duration-200 hover:translate-x-1 text-left">
            admin@sentri.com (Super Admin - Full Access)
          </button>
          <button onClick={() => { setEmail("manager@sentri.com"); setPassword("password"); }} className="hover:text-on-primary transition-all duration-200 hover:translate-x-1 text-left">
            manager@sentri.com (Manager - Brand Management)
          </button>
          <button onClick={() => { setEmail("analyst@sentri.com"); setPassword("password"); }} className="hover:text-on-primary transition-all duration-200 hover:translate-x-1 text-left">
            analyst@sentri.com (Analyst - Limited Write)
          </button>
          <button onClick={() => { setEmail("viewer@client.com"); setPassword("password"); }} className="hover:text-on-primary transition-all duration-200 hover:translate-x-1 text-left">
            viewer@client.com (Viewer - Read Only)
          </button>
        </div>
      </div>
    </div>
  );
}
