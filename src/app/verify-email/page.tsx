import Link from "next/link";
import { Mail, CheckCircle } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-surface-canvas-light text-ink-deep flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-surface-canvas-light rounded-[12px] border border-hairline-cloud shadow-[rgba(0,0,0,0.1)_0_10px_15px_-3px,rgba(0,0,0,0.1)_0_4px_6px_-4px] p-8 space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-accent-lime/20 flex items-center justify-center mx-auto">
          <Mail size={32} className="text-accent-lime" />
        </div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Cek Email Anda</h1>
        <p className="text-[16px] text-ink-deep/60">
          Kami telah mengirim tautan verifikasi ke email Anda. Klik tautan tersebut untuk mengaktifkan akun.
        </p>
        <div className="flex items-center justify-center gap-2 text-[14px] text-sentiment-positive">
          <CheckCircle size={16} />
          <span>Email terkirim</span>
        </div>
        <p className="text-[14px] text-ink-deep/60">
          Tidak menerima email?{" "}
          <button className="text-ink-deep underline underline-offset-2 font-medium">Kirim ulang</button>
        </p>
        <Link href="/auth/login"
          className="inline-block bg-primary text-on-primary font-bold uppercase tracking-[0.2px] text-[14px] rounded-md px-6 py-3 hover:opacity-90 transition-all w-full text-center"
        >
          Kembali ke Masuk
        </Link>
      </div>
    </div>
  );
}
