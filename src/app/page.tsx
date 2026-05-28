"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BarChart3, MessageCircle, AlertTriangle, Lightbulb,
  ArrowRight, Sparkles, Check, Star, ChevronDown,
  TrendingUp, Shield, Users, Zap,
} from "lucide-react";

/* ── Scroll Reveal Hook ── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Glass Card ── */
function GlassCard({ children, className = "", ...props }: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-[18px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-white/[0.07] hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── Floating Glows ── */
function FloatingGlows() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent-violet-deep/20 blur-[120px] animate-pulse" style={{ animationDuration: "6s" }} />
      <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] rounded-full bg-accent-lime/10 blur-[100px] animate-pulse" style={{ animationDuration: "8s", animationDelay: "1s" }} />
      <div className="absolute -bottom-40 left-1/2 w-[600px] h-[600px] rounded-full bg-accent-violet/15 blur-[140px] animate-pulse" style={{ animationDuration: "7s", animationDelay: "2s" }} />
    </div>
  );
}

/* ── Stats Counter ── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useScrollReveal();

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ── DATA ── */
const features = [
  { icon: BarChart3, title: "Brand Health Score", desc: "Pantau kesehatan brand secara real-time dengan metrik akurat dan AI-driven insights." },
  { icon: MessageCircle, title: "AI Sentiment Engine", desc: "Analisis sentimen otomatis dari Twitter, Instagram, TikTok, Facebook & LinkedIn." },
  { icon: AlertTriangle, title: "Early Warning System", desc: "Deteksi dini lonjakan sentimen negatif sebelum menjadi krisis yang meluas." },
  { icon: Lightbulb, title: "Strategy Optimizer", desc: "Rekomendasi konten berbasis data untuk engagement maksimal di setiap platform." },
];

const steps = [
  { num: "01", title: "Connect Sources", desc: "Hubungkan seluruh akun sosial media & brand mention Anda dalam satu dashboard." },
  { num: "02", title: "AI Analysis", desc: "Machine learning menganalisis sentimen, emosi, dan brand association secara otomatis." },
  { num: "03", title: "Actionable Insights", desc: "Dapatkan rekomendasi strategi konten, crisis alert, dan competitor benchmarking." },
];

const stats = [
  { label: "Mentions Analyzed", target: 12450000, suffix: "+" },
  { label: "Brands Protected", target: 8400, suffix: "+" },
  { label: "Crisis Detected", target: 5230, suffix: "+" },
  { label: "Avg Response Time", target: 2, suffix: "m" },
];

const testimonials = [
  { quote: "Sentri saved us from a major PR crisis. The early warning system detected a negative spike 3 hours before it went viral.", name: "Rina Aditya", role: "Head of Marketing, FintechCo" },
  { quote: "Dashboard-nya incredibly intuitive. Kami bisa lihat brand health score real-time dan langsung ambil tindakan.", name: "Budi Santoso", role: "Brand Manager, RetailPlus" },
  { quote: "Competitor benchmarking feature is a game changer. Kami bisa compare performance dengan kompetitor secara langsung.", name: "Sarah Chen", role: "CMO, TechGrowth" },
];

/* ── PAGE ── */
export default function SentriLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-canvas-dark text-on-primary font-sans overflow-x-hidden">
      <FloatingGlows />

      {/* ─── GLASS NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-night/70 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-lime to-accent-lime/60 flex items-center justify-center">
              <Sparkles size={18} className="text-ink-deep" />
            </div>
            <span className="text-accent-lime font-bold text-xl tracking-tight">SENTRI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Features", "How It Works", "Testimonials"].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                className="text-[15px] text-on-dark-muted/80 hover:text-on-primary transition-colors font-medium"
              >{l}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/auth/login"
              className="hidden sm:inline-flex text-[14px] text-on-dark-muted hover:text-on-primary transition-colors font-medium"
            >Masuk</Link>
            <Link href="/auth/register"
              className="bg-accent-lime text-ink-deep font-bold uppercase tracking-[0.2px] text-[13px] rounded-lg px-5 py-2.5 hover:opacity-90 transition-all inline-flex items-center gap-1.5"
            >Daftar <ArrowRight size={14} /></Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-on-dark-muted">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-surface-night/90 backdrop-blur-xl border-t border-white/[0.06] px-6 py-4 space-y-3">
            {["Features", "How It Works", "Testimonials"].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                className="block text-[15px] text-on-dark-muted hover:text-on-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >{l}</a>
            ))}
            <Link href="/auth/login" className="block text-[15px] text-on-dark-muted">Masuk</Link>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-accent-lime/10 backdrop-blur-md border border-accent-lime/20 rounded-full px-4 py-1.5 text-[13px] text-accent-lime font-medium animate-fade-slide-right">
              <Sparkles size={14} />
              AI-Powered Brand Intelligence
            </div>

            <h1 className="text-[48px] md:text-[64px] font-medium leading-[1.05] tracking-tight">
              Pantau & Lindungi{' '}
              <span className="bg-gradient-to-r from-accent-lime via-accent-lime/80 to-accent-pink bg-clip-text text-transparent">
                Reputasi Brand
              </span>{' '}
              Anda Secara Real-Time
            </h1>

            <p className="text-[18px] md:text-[20px] text-on-dark-muted/80 leading-[1.6] max-w-lg">
              Sentri menggunakan AI untuk menganalisis sentimen dari seluruh platform sosial, mendeteksi krisis sebelum meluas, dan memberikan rekomendasi strategi konten yang tepat sasaran.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/auth/register"
                className="bg-gradient-to-r from-accent-lime to-accent-lime/80 text-ink-deep font-bold uppercase tracking-[0.2px] text-[14px] rounded-xl px-8 py-4 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 shadow-[0_0_30px_rgba(194,239,78,0.2)]"
              >
                Mulai Sekarang <ArrowRight size={18} />
              </Link>
              <a href="#features"
                className="bg-white/[0.05] backdrop-blur-md border border-white/[0.1] text-on-primary font-medium text-[14px] rounded-xl px-8 py-4 hover:bg-white/[0.1] transition-all inline-flex items-center gap-2"
              >
                Lihat Fitur <ChevronDown size={16} />
              </a>
            </div>

            <div className="flex items-center gap-4 text-[14px] text-on-dark-muted/60">
              <div className="flex -space-x-2">
                {["#c2ef4e", "#fa7faa", "#6a5fc1", "#79628c"].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-surface-canvas-dark" style={{ background: c }} />
                ))}
              </div>
              <span>Dipercaya oleh <strong className="text-on-primary">8.400+</strong> brand</span>
            </div>
          </div>

          {/* Hero Right - Glass Cards */}
          <div className="hidden lg:flex flex-col gap-4">
            <div className="flex gap-4">
              <GlassCard className="flex-1 p-6 space-y-3 animate-fade-slide-right" style={{ animationDelay: "100ms" }}>
                <div className="flex items-center gap-2 text-accent-lime">
                  <TrendingUp size={20} />
                  <span className="text-[13px] font-semibold uppercase tracking-[0.2px]">Brand Health</span>
                </div>
                <div className="text-[40px] font-semibold tracking-tight">
                  <AnimatedCounter target={84} suffix="%" />
                </div>
                <div className="flex items-center gap-1.5 text-[13px] text-sentiment-positive">
                  <TrendingUp size={14} />
                  <span>+3.2% this week</span>
                </div>
              </GlassCard>
              <GlassCard className="flex-1 p-6 space-y-3 animate-fade-slide-right" style={{ animationDelay: "200ms" }}>
                <div className="flex items-center gap-2 text-accent-pink">
                  <MessageCircle size={20} />
                  <span className="text-[13px] font-semibold uppercase tracking-[0.2px]">Mentions</span>
                </div>
                <div className="text-[40px] font-semibold tracking-tight">
                  <AnimatedCounter target={12450} />
                </div>
                <div className="flex items-center gap-1.5 text-[13px] text-sentiment-positive">
                  <TrendingUp size={14} />
                  <span>+12.5% today</span>
                </div>
              </GlassCard>
            </div>
            <div className="flex gap-4">
              <GlassCard className="flex-1 p-6 space-y-3 animate-fade-slide-right" style={{ animationDelay: "300ms" }}>
                <div className="flex items-center gap-2 text-accent-violet">
                  <Shield size={20} />
                  <span className="text-[13px] font-semibold uppercase tracking-[0.2px]">Sentiment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-[40px] font-semibold tracking-tight">72%</div>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-sentiment-positive" />
                    <div className="w-2 h-3 rounded-full bg-sentiment-neutral" />
                    <div className="w-1.5 h-3 rounded-full bg-sentiment-negative" />
                  </div>
                </div>
                <div className="text-[13px] text-on-dark-muted/60">Positif · Netral · Negatif</div>
              </GlassCard>
              <GlassCard className="flex-1 p-6 space-y-3 animate-fade-slide-right" style={{ animationDelay: "400ms" }}>
                <div className="flex items-center gap-2 text-accent-lime">
                  <AlertTriangle size={20} />
                  <span className="text-[13px] font-semibold uppercase tracking-[0.2px]">Alerts</span>
                </div>
                <div className="text-[40px] font-semibold tracking-tight">2</div>
                <div className="flex items-center gap-1.5 text-[13px] text-severity-critical">
                  <span className="w-2 h-2 rounded-full bg-severity-critical animate-pulse-dot" />
                  <span>Active alerts</span>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-on-dark-muted/40" />
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto space-y-16">
          <RevealSection className="text-center space-y-4">
            <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.3px] text-accent-lime bg-accent-lime/10 px-4 py-1.5 rounded-full border border-accent-lime/20">
              Features
            </span>
            <h2 className="text-[36px] md:text-[44px] font-medium leading-[1.15]">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-accent-lime to-accent-pink bg-clip-text text-transparent">
                Protect Your Brand
              </span>
            </h2>
            <p className="text-[18px] text-on-dark-muted/70 max-w-xl mx-auto">
              Dari real-time monitoring sampai crisis prevention — satu platform untuk seluruh kebutuhan brand intelligence.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <RevealSection key={f.title}>
                <GlassCard className="p-8 h-full space-y-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-lime/20 to-accent-lime/5 border border-accent-lime/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <f.icon size={26} className="text-accent-lime" />
                  </div>
                  <h3 className="text-[20px] font-semibold leading-[1.25]">{f.title}</h3>
                  <p className="text-[15px] text-on-dark-muted/70 leading-[1.6]">{f.desc}</p>
                </GlassCard>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto space-y-16">
          <RevealSection className="text-center space-y-4">
            <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.3px] text-accent-pink bg-accent-pink/10 px-4 py-1.5 rounded-full border border-accent-pink/20">
              How It Works
            </span>
            <h2 className="text-[36px] md:text-[44px] font-medium leading-[1.15]">
              Three Steps to{' '}
              <span className="bg-gradient-to-r from-accent-pink to-accent-violet bg-clip-text text-transparent">
                Brand Mastery
              </span>
            </h2>
          </RevealSection>

          <div className="relative grid md:grid-cols-3 gap-8">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-20 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-accent-lime/40 via-accent-pink/40 to-accent-violet/40" />

            {steps.map((s) => (
              <RevealSection key={s.num}>
                <GlassCard className="p-8 text-center space-y-5 relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-lime/20 to-accent-lime/5 border border-accent-lime/20 flex items-center justify-center mx-auto">
                    <span className="text-[24px] font-bold text-accent-lime">{s.num}</span>
                  </div>
                  <h3 className="text-[22px] font-semibold">{s.title}</h3>
                  <p className="text-[15px] text-on-dark-muted/70 leading-[1.6]">{s.desc}</p>
                </GlassCard>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <GlassCard className="p-12 md:p-16 bg-gradient-to-br from-accent-violet-deep/20 via-primary to-accent-lime/5 border-accent-lime/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((s) => (
                <RevealSection key={s.label} className="text-center space-y-2">
                  <div className="text-[40px] md:text-[48px] font-semibold bg-gradient-to-b from-on-primary to-on-primary/60 bg-clip-text text-transparent">
                    <AnimatedCounter target={s.target} suffix={s.suffix} />
                  </div>
                  <p className="text-[15px] text-on-dark-muted/60">{s.label}</p>
                </RevealSection>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonials" className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto space-y-16">
          <RevealSection className="text-center space-y-4">
            <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.3px] text-accent-violet bg-accent-violet/10 px-4 py-1.5 rounded-full border border-accent-violet/20">
              Testimonials
            </span>
            <h2 className="text-[36px] md:text-[44px] font-medium leading-[1.15]">
              Trusted by{' '}
              <span className="bg-gradient-to-r from-accent-violet to-accent-lime bg-clip-text text-transparent">
                Industry Leaders
              </span>
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <RevealSection key={i}>
                <GlassCard className="p-8 space-y-6 h-full flex flex-col">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => <Star key={j} size={16} className="text-accent-lime fill-accent-lime" />)}
                  </div>
                  <p className="text-[16px] text-on-dark-muted/80 leading-[1.7] flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-lime/30 to-accent-violet/30 flex items-center justify-center font-bold text-[16px]">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold">{t.name}</p>
                      <p className="text-[13px] text-on-dark-muted/60">{t.role}</p>
                    </div>
                  </div>
                </GlassCard>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <GlassCard className="p-12 md:p-20 text-center space-y-8 bg-gradient-to-br from-accent-violet-deep/30 via-surface-night to-accent-lime/5 border-accent-lime/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(194,239,78,0.06)_0%,_transparent_60%)]" />
              <div className="relative space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-lime/30 to-accent-lime/5 border border-accent-lime/20 flex items-center justify-center mx-auto">
                  <Zap size={30} className="text-accent-lime" />
                </div>
                <h2 className="text-[36px] md:text-[44px] font-medium leading-[1.15]">
                  Siap Memantau{' '}
                  <span className="bg-gradient-to-r from-accent-lime to-accent-lime/60 bg-clip-text text-transparent">
                    Brand Anda?
                  </span>
                </h2>
                <p className="text-[18px] text-on-dark-muted/70 max-w-lg mx-auto leading-[1.7]">
                  Bergabung dengan ribuan brand yang sudah menggunakan Sentri. Gratis selama 14 hari, tanpa kartu kredit.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link href="/auth/register"
                    className="bg-gradient-to-r from-accent-lime to-accent-lime/80 text-ink-deep font-bold uppercase tracking-[0.2px] text-[14px] rounded-xl px-8 py-4 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 shadow-[0_0_40px_rgba(194,239,78,0.15)] animate-pulse"
                    style={{ animationDuration: "3s" }}
                  >
                    Mulai Trial Gratis <ArrowRight size={18} />
                  </Link>
                  <Link href="/auth/login"
                    className="bg-white/[0.05] backdrop-blur-md border border-white/[0.1] text-on-primary font-medium text-[14px] rounded-xl px-8 py-4 hover:bg-white/[0.1] transition-all inline-flex items-center gap-2"
                  >
                    <Users size={16} /> Sudah Punya Akun?
                  </Link>
                </div>
                <div className="flex items-center justify-center gap-6 text-[13px] text-on-dark-muted/60">
                  <span className="flex items-center gap-1.5"><Check size={14} className="text-accent-lime" /> No credit card</span>
                  <span className="flex items-center gap-1.5"><Check size={14} className="text-accent-lime" /> 14-day free trial</span>
                  <span className="flex items-center gap-1.5"><Check size={14} className="text-accent-lime" /> Cancel anytime</span>
                </div>
              </div>
            </GlassCard>
          </RevealSection>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative px-6 py-12 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent-lime to-accent-lime/60 flex items-center justify-center">
              <Sparkles size={12} className="text-ink-deep" />
            </div>
            <span className="text-accent-lime font-bold text-lg tracking-tight">SENTRI</span>
          </div>
          <div className="flex items-center gap-6 text-[13px] text-on-dark-muted/50">
            <span>&copy; 2026 Sentri. All rights reserved.</span>
            <Link href="/auth/login" className="hover:text-on-dark-muted transition-colors">Masuk</Link>
            <Link href="/auth/register" className="hover:text-on-dark-muted transition-colors">Daftar</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
