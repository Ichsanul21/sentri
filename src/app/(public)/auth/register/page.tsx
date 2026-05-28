"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) { setError("Please fill in all fields"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (password !== confirmPassword) { setError("Passwords do not match"); return; }
    setLoading(true);
    setError("");
    const result = await register(name, email, password);
    setLoading(false);
    if (result.success) {
      router.push("/dashboard/executive-summary");
    } else {
      setError(result.error || "Registration failed");
    }
  };

  return (
    <div className="bg-surface-canvas-light rounded-[12px] border border-hairline-cloud shadow-[rgba(0,0,0,0.1)_0_10px_15px_-3px,rgba(0,0,0,0.1)_0_4px_6px_-4px] p-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-[30px] font-medium leading-[1.2] text-ink-deep">Daftar</h1>
        <p className="text-[16px] text-ink-deep/60">Mulai pantau sentimen brand Anda</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded bg-severity-critical/10 border border-severity-critical/20 text-[14px] text-sentiment-negative">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-[16px] font-medium leading-[1.5] text-ink-deep">Nama Lengkap</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Budi Santoso"
            className="bg-surface-canvas-light text-ink-deep text-[16px] font-medium leading-[1.5] px-3 py-2 rounded-[6px] border border-hairline-cool outline-none transition-all focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] focus:ring-2 focus:ring-ring-focus"
          />
        </div>

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
          <label className="text-[16px] font-medium leading-[1.5] text-ink-deep">Kata Sandi</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 6 karakter"
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

        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
          {loading ? <Loader2 size={18} className="animate-spin" /> : null}
          {loading ? "Memproses..." : "Daftar"}
        </Button>
      </form>

      <p className="text-center text-[14px] text-ink-deep/60">
        Sudah punya akun?{" "}
        <Link href="/auth/login" className="text-accent-violet underline underline-offset-2 font-medium">
          Masuk
        </Link>
      </p>
    </div>
  );
}
