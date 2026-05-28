# Sentiment Platform — Technical Documentation

> **Enterprise Brand Sentiment & Social Listening Platform**
> _Versi: 1.0 | Status: Draft Perencanaan_

---

## Daftar Isi

1. [Ringkasan Proyek](#1-ringkasan-proyek)
2. [Arsitektur Sistem](#2-arsitektur-sistem)
3. [Alur & Business Flow](#3-alur--business-flow)
4. [Modul 1 — Brand Identity & Profiling](#4-modul-1--brand-identity--profiling)
5. [Modul 2 — AI & Sentiment Engine](#5-modul-2--ai--sentiment-engine)
6. [Modul 3 — Early Warning System & Crisis Control](#6-modul-3--early-warning-system--crisis-control)
7. [Modul 4 — Strategy & Recommendation Engine](#7-modul-4--strategy--recommendation-engine)
8. [Modul 5 — Command Center & Dashboard](#8-modul-5--command-center--dashboard)
9. [Modul 6 — User & System Administration](#9-modul-6--user--system-administration)
10. [Struktur Project](#10-struktur-project)
11. [Database Schema](#11-database-schema)
12. [API Design](#12-api-design)
13. [Tech Stack Detail](#13-tech-stack-detail)
14. [Security & Compliance](#14-security--compliance)
15. [Deployment & DevOps](#15-deployment--devops)
16. [Risk Register & Mitigasi](#16-risk-register--mitigasi)
17. [Cost Estimation](#17-cost-estimation)
18. [Testing Strategy](#18-testing-strategy)
19. [Monitoring & Observability](#19-monitoring--observability)
20. [Error Handling Strategy](#20-error-handling-strategy)
21. [SLA & Support Escalation](#21-sla--support-escalation)
22. [Analytics & Product Telemetry](#22-analytics--product-telemetry)
23. [Localization & i18n](#23-localization--i18n)
24. [Database Migration Strategy](#24-database-migration-strategy)
25. [Compliance Detail](#25-compliance-detail)
26. [Frontend Design System](#26-frontend-design-system)
27. [Data Retention & Archival](#27-data-retention--archival)
28. [Performance Budget](#28-performance-budget)
29. [Disaster Recovery Plan](#29-disaster-recovery-plan)
30. [Third-Party Vendor Assessment](#30-third-party-vendor-assessment)
31. [Data Source Strategy — Legal vs Workaround](#31-data-source-strategy--legal-vs-workaround)
32. [Webhook Security & Signature Verification](#32-webhook-security--signature-verification)
33. [Rate Limiting Strategy](#33-rate-limiting-strategy)
34. [Feature Flags & A/B Testing](#34-feature-flags--ab-testing)
35. [Accessibility (WCAG) Compliance](#35-accessibility-wcag-compliance)
36. [Dependency Management & Security Scanning](#36-dependency-management--security-scanning)
37. [API Documentation & SDK Strategy](#37-api-documentation--sdk-strategy)
38. [Content Security Policy & Security Headers Detail](#38-content-security-policy--security-headers-detail)
39. [Cookie Consent & CORS/CSRF Policy](#39-cookie-consent--corscsrf-policy)
40. [Mobile Strategy — PWA Roadmap](#40-mobile-strategy--pwa-roadmap)
41. [Agent Architecture & Orchestration](#41-agent-architecture--orchestration)
42. [Screen Flow & Information Architecture](#42-screen-flow--information-architecture)
43. [UI/UX Design Specifications](#43-uiux-design-specifications)

### Appendices
- [A. Performance Targets](#a-performance-targets)
- [B. Glossary](#b-glossary)
- [C. Decision Log](#c-decision-log)
- [D. File Change Log](#d-file-change-log)

---

## 1. Ringkasan Proyek

### 1.1 Apa Itu Sentiment Platform?

Platform **enterprise SaaS** berbasis AI yang memungkinkan brand/perusahaan untuk:

- **Memantau** percakapan publik tentang merek mereka secara **real-time** di berbagai platform (Instagram, X/Twitter, TikTok, Facebook, Google Reviews, portal berita)
- **Menganalisis** sentimen audiens dengan NLP/LLM canggih (positif, negatif, netral + emosi sekunder)
- **Mendeteksi** dini potensi krisis PR sebelum meluas
- **Mendapatkan** rekomendasi strategi konten berbasis data
- **Melaporkan** insights melalui dashboard interaktif dan report otomatis

### 1.2 Target Pengguna

| Role | Deskripsi | Akses Utama |
|------|-----------|-------------|
| **Super Admin** | Admin platform — kelola semua tenant, billing, sistem | Semua fitur + System Admin |
| **Manager** | Brand manager — pantau brand, ambil keputusan strategis | Dashboard, Strategy, EWS |
| **Analyst** | Social media analyst — sehari-hari monitor percakapan | Sentiment Engine, Report |
| **Viewer** | Client/C-level — lihat hasil ringkasan | Dashboard (read-only) |

### 1.3 Model Bisnis: Multi-Tenant SaaS

- **Free Tier**: 1 brand, 50 mentions/bulan, dashboard dasar
- **Pro Tier**: 3 brand, 5.000 mentions/bulan, +AI analytics, EWS
- **Enterprise**: Unlimited brand, unlimited mentions, custom API, dedicated support

---

## 2. Arsitektur Sistem

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │  Web App  │  │ Mobile   │  │ 3rd Party│  │  Browser Extension│  │
│  │ (Next.js) │  │ (PWA)    │  │   API    │  │                   │  │
│  └─────┬─────┘  └────┬─────┘  └────┬─────┘  └───────────────────┘  │
└────────┼──────────────┼─────────────┼──────────────────────────────┘
         │              │             │
┌────────┼──────────────┼─────────────┼──────────────────────────────┐
│        ▼              ▼             ▼                              │
│  ┌──────────────────────────────────────────────────────┐          │
│  │              API GATEWAY (Next.js API Routes)         │          │
│  │     Load Balancer → Rate Limiter → Auth Middleware    │          │
│  └──────────────────────┬───────────────────────────────┘          │
│                         │                                          │
│  ┌──────────────────────▼───────────────────────────────────────┐  │
│  │                   APPLICATION LAYER                           │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐  │  │
│  │  │ Brand    │ │Sentiment│ │  EWS     │ │ Strategy       │  │  │
│  │  │ Module   │ │ Module  │ │ Module   │ │ Module         │  │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └────────────────┘  │  │
│  │  ┌──────────┐ ┌──────────┐ ┌─────────────────────────────┐  │  │
│  │  │Dashboard │ │  Admin   │ │  Report Generator           │  │  │
│  │  │ Module   │ │  Module  │ │  (PDF/PPT/Excel)            │  │  │
│  │  └──────────┘ └──────────┘ └─────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                         │                                          │
│  ┌──────────────────────▼───────────────────────────────────────┐  │
│  │                   SERVICE LAYER                               │  │
│  │  ┌──────────┐ ┌──────────────┐ ┌──────────┐ ┌────────────┐  │  │
│  │  │ Auth     │ │  Queue        │ │  Cache   │ │  File      │  │  │
│  │  │ Service  │ │  (Bull/Redis) │ │  (Redis) │ │  Storage   │  │  │
│  │  └──────────┘ └──────────────┘ └──────────┘ └────────────┘  │  │
│  │  ┌──────────────────────┐ ┌─────────────────────────────┐   │  │
│  │  │  AI/ML Pipeline      │ │  Real-Time WebSocket        │   │  │
│  │  │  (OpenAI + Custom)   │ │  (Socket.io)                │   │  │
│  │  └──────────────────────┘ └─────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                         │                                          │
└─────────────────────────┼──────────────────────────────────────────┘
                          │
┌─────────────────────────▼──────────────────────────────────────────┐
│                     DATA LAYER                                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  │
│  │ PostgreSQL │  │  Redis     │  │ Elasticsearch│ │   S3/R2    │  │
│  │ (Primary)  │  │ (Cache/Qs) │  │ (Search)   │  │ (Assets)   │  │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow Utama

#### Flow Social Listening (End-to-End)

```
Social Media Platforms (Twitter, IG, TikTok, dll)
        │
        ▼
┌──────────────────┐
│  Crawler Service  │  ← Queue-based, rate-limited, multi-threaded
│  (Puppeteer/API)  │
└────────┬─────────┘
         │ Raw mentions
         ▼
┌──────────────────┐
│  Pre-Processor   │  ← Clean HTML, deduplicate, extract metadata
│  Pipeline        │
└────────┬─────────┘
         │ Cleaned data
         ▼
┌──────────────────────────────────────┐
│         NLP Pipeline (AI Engine)      │
│  ┌─────────┐  ┌──────────┐  ┌─────┐ │
│  │Sentiment│  │  Brand    │  │Visual│ │
│  │Analyzer │  │Association│  │Score │ │
│  └─────────┘  └──────────┘  └─────┘ │
│  ┌────────────────────────────┐      │
│  │  Emotion Detection (NLP)   │      │
│  └────────────────────────────┘      │
└────────┬─────────────────────────────┘
         │ Enriched mentions
         ▼
┌──────────────────┐
│  Indexer         │  ← Store ke PostgreSQL + Elasticsearch
│  Service         │
└────────┬─────────┘
         │
         ├───────────────────────► Dashboard (WebSocket real-time update)
         ├───────────────────────► EWS (Anomaly detection check)
         └───────────────────────► Strategy Engine (Campaign optimizer)
```

#### Flow Crisis Alert

```
NLP Pipeline outputs sentiment data
        │
        ▼
┌──────────────────────────┐
│  Anomaly Spike Detector   │  ← Rolling window: bandingkan volume mentah
│  (Statistical: Z-score,   │     dengan rata-rata historical
│   moving average)         │
└────────┬─────────────────┘
         │ Threshold exceeded? (mis: >20% negatif dalam 1 jam)
         │
    ┌────┴────┐
    │  YES    │  NO → Normal flow
    ▼
┌──────────────────────────┐
│  Crisis Alert Dispatcher  │
│  ┌──────────────────┐   │
│  │  WhatsApp Alert   │   │  ← Twilio API
│  ├──────────────────┤   │
│  │  Email Alert      │   │  ← SendGrid/Mailgun
│  ├──────────────────┤   │
│  │  Push Notification│   │  ← Web Push API
│  ├──────────────────┤   │
│  │  Dashboard Banner │   │  ← WebSocket event
│  └──────────────────┘   │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Triage & Source Tracing  │  ← Lacak mention pertama yg memicu lonjakan
│  + Auto-Response Draft   │     + Generate draf respons via LLM
└──────────────────────────┘
```

---

## 3. Alur & Business Flow

### 3.1 User Onboarding Flow

```
Start
  │
  ▼
Register Account ───→ Email Verification
  │
  ▼
Pilih Tier (Free/Pro/Enterprise)
  │
  ▼
Setup Brand DNA:
  ├── Nama Brand
  ├── Logo (upload)
  ├── Tagline
  ├── Palet Warna Utama
  ├── Target Demografis (usia, lokasi, gender, minat)
  └── Industri/Kategori
  │
  ▼
Setup Tone & Voice Matrix:
  ├── Formal / Kasual / Berwibawa / Enerjik / Humoris
  ├── Kata-kata yang harus dihindari (blacklist)
  └── Kata-kata yang harus diprioritaskan (whitelist)
  │
  ▼
Setup Competitor Radar:
  ├── Tambah 3-5 kompetitor
  └── Platform mana yang mau dilacak
  │
  ▼
Setup Keyword & Hashtag Tracker:
  ├── Nama brand (otomatis)
  ├── Nama produk
  ├── Nama kompetitor
  ├── Hashtag kampanye
  └── Kata kunci industri
  │
  ▼
Active Dashboard ───→ Social Listening starts (24/7)
```

### 3.2 Daily Operations Flow (Untuk Analyst)

```
Morning Login
  │
  ▼
Cek Executive Dashboard:
  ├── Brand Health Score (harian/mingguan)
  ├── Volume Percakapan (24j terakhir)
  ├── Sentimen Dominan
  └── Anomali/Crisis Alert (jika ada)
  │
  ▼
Review Mentions Terbaru:
  ├── Filter: Negatif → Prioritaskan respons
  ├── Filter: Viral potential → Laporkan ke manager
  └── Filter: Positive UGC → Amplify
  │
  ▼
Cek Competitor Activity:
  ├── Share of Voice (brand vs competitor)
  ├── Sentimen per competitor
  └── Top mentions competitor
  │
  ▼
Gunakan Content Tone Checker:
  ├── Masukkan draf konten hari ini
  ├── AI cek kesesuaian dengan Brand DNA
  └── Dapatkan feedback + rekomendasi
  │
  ▼
Export Daily Report (PDF/PPT/Excel)
  │
  ▼
End of Day
```

### 3.3 Crisis Management Flow

```
Anomaly Detected (Spike negatif > threshold)
  │
  ▼
Alert dikirim ke semua channel (WA, Email, Dashboard)
  │
  ▼
Manager Login → Dashboard Crisis Mode (UI berubah merah/kuning)
  │
  ▼
Source Tracing:
  ├── Lihat timeline percakapan
  ├── Temukan mention pertama yang viral
  └── Lihat platform asal, author, engagement metrics
  │
  ▼
AI Auto-Generate Response Draft:
  ├── Opsi A: Press Release (formal)
  ├── Opsi B: Comment Reply (casual/sopan)
  └── Opsi C: DM Template (personal)
  │
  ▼
Review + Edit → Publish via platform masing-masing
  │
  ▼
Monitor: Apakah sentimen membaik dalam 2-4 jam?
  ├── YES → Resolusi tercatat, simpan sebagai case study
  └── NO → Eskalasi ke tim PR/hukum
```

---

## 4. Modul 1: Brand Identity & Profiling

### 4.1 Deskripsi

Modul **foundation** tempat klien mendefinisikan "siapa" mereka. Semua modul lain bergantung pada data di sini.

### 4.2 Fitur Detail

#### 4.2.1 Brand DNA Setup

| Field | Tipe | Validasi | Notes |
|-------|------|----------|-------|
| `brandName` | String (3-100 chars) | Required, unique per tenant | |
| `logo` | File (Image) | Max 5MB, PNG/JPG/WebP | Upload ke S3/R2 |
| `tagline` | String (max 200 chars) | Optional | |
| `primaryColor` | Hex Color | Required | #RRGGBB |
| `secondaryColor` | Hex Color | Optional | |
| `accentColor` | Hex Color | Optional | |
| `industry` | Enum | Required | Tech, F&B, Fashion, dll |
| `targetDemographic` | JSON | Required | {ageRange, location, gender, interests[]} |
| `brandPersonality` | String[] | Optional | "Inovatif", "Terpercaya", "Muda" |

**Business Logic:**
- 1 akun Free Tier = max 1 brand
- 1 akun Pro Tier = max 3 brand
- Enterprise = unlimited
- Semua warna digunakan untuk theming dashboard dan report

#### 4.2.2 Tone & Voice Matrix

| Field | Tipe | Validasi | Notes |
|-------|------|----------|-------|
| `communicationStyle` | Enum (formal, casual, authoritative, energetic, humorous) | Required | Bisa multi-pick dengan priority |
| `bannedWords` | String[] | Optional | Kata yang tidak boleh dipakai |
| `preferredWords` | String[] | Optional | Kata yang diprioritaskan |
| `toneRules` | JSON | Optional | Aturan custom {maxEmoji, minSentenceLength, dll} |

**Business Logic:**
- Digunakan oleh Content Tone Checker (Modul 4) untuk validasi
- Digunakan oleh Auto-Response (Modul 3) untuk generate respons krisis
- Pengaturan bisa berbeda per platform (misal: Twitter lebih kasual, LinkedIn lebih formal)

#### 4.2.3 Competitor Radar Setup

| Field | Tipe | Validasi | Notes |
|-------|------|----------|-------|
| `competitorName` | String | Required | |
| `competitorSocialHandles` | JSON | Required | {twitter, instagram, tiktok, facebook} |
| `competitorWebsite` | URL | Optional | |

**Business Logic:**
- Min 1, max 5 kompetitor per brand
- Data kompetitor di-crawl bersamaan dengan brand utama
- Digunakan di Competitor Benchmarking Matrix (Modul 5)

#### 4.2.4 Keyword & Hashtag Tracker

| Field | Tipe | Validasi | Notes |
|-------|------|----------|-------|
| `keywords` | String[] | Required, min 1 | Otomatis include nama brand |
| `hashtags` | String[] | Optional | Tanpa # di DB, ditambahkan saat crawling |
| `productNames` | String[] | Optional | Nama produk spesifik |
| `campaignHashtags` | String[] | Optional | Per kampanye |

**Business Logic:**
- Keywords ini menjadi filter untuk crawler (Modul 2)
- Quota terbatas per tier: Free=10 keywords, Pro=50, Enterprise=unlimited

### 4.3 UI Components

- `BrandDnaForm` — Multi-step wizard form
- `ColorPalettePicker` — Color picker dengan eyedropper + palette suggestions
- `CompetitorList` — Drag-and-drop reorder, CRUD cards
- `KeywordManager` — Tag/chips input, bulk import, suggested keywords (AI)

---

## 5. Modul 2: AI & Sentiment Engine

### 5.1 Deskripsi

**Otak sistem** — memproses data mentah dari internet menjadi insights yang actionable.

### 5.2 Arsitektur Pipeline

```
┌─────────────────────────────────────────────────────────┐
│                   CRAWLER LAYER                          │
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │Twitter   │ │Instagram │ │ TikTok   │ │Google    │ │
│  │Crawler   │ │Crawler   │ │Crawler   │ │Reviews   │ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ │
│       │            │            │            │         │
│  ┌────▼────────────▼────────────▼────────────▼─────┐  │
│  │              Queue Manager (Bull/Redis)          │  │
│  │  + Rate Limiter + Proxy Rotator + Retry Logic   │  │
│  └────────────────────┬───────────────────────────┘  │
└───────────────────────┼───────────────────────────────┘
                        │
┌───────────────────────▼───────────────────────────────┐
│                   NLP LAYER                            │
│                                                       │
│  ┌────────────────────────────────────────────────┐   │
│  │         Pre-processing Pipeline                │   │
│  │  Language Detection → Tokenization → Cleaning  │   │
│  └────────────────────┬───────────────────────────┘   │
│                       │                                │
│  ┌────────────────────▼───────────────────────────┐   │
│  │         Sentiment Analyzer                      │   │
│  │  ┌────────────────┐ ┌──────────────────────┐   │   │
│  │  │ Primary Emotion│ │ Secondary Emotion    │   │   │
│  │  │ (Pos/Neu/Neg)  │ │ (Angry/Happy/Disap-  │   │   │
│  │  │                │ │  pointment/Enthusiast)│   │   │
│  │  └────────────────┘ └──────────────────────┘   │   │
│  └────────────────────┬───────────────────────────┘   │
│                       │                                │
│  ┌────────────────────▼───────────────────────────┐   │
│  │         Brand Association Extractor             │   │
│  │  Extract: adjective → frequency → brand_name   │   │
│  └────────────────────┬───────────────────────────┘   │
│                       │                                │
│  ┌────────────────────▼───────────────────────────┐   │
│  │         Visual & Aesthetic Scorer               │   │
│  │  Input: Image URL → Output: Score (0-100)      │   │
│  │  Compare: image colors vs brand palette         │   │
│  └────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

### 5.3 Detail Komponen

#### 5.3.1 Real-Time Social Listening

**Crawler Strategy per Platform:**

| Platform | Method | Rate Limit | Complexity |
|----------|--------|------------|------------|
| **X/Twitter** | Official API v2 | 300 req/15min | Medium |
| **Instagram** | Graph API + scraping fallback | 200 req/hour | High |
| **TikTok** | Research API + scraping | 100 req/day | Very High |
| **Facebook** | Graph API | 200 req/hour | Medium |
| **Google Reviews** | Places API + scraping | 100 req/day | Low |
| **Portal Berita** | RSS + Google News scraping | Unlimited | Medium |

**Queue System Design:**
```typescript
interface CrawlJob {
  id: string;
  brandId: string;
  platform: 'twitter' | 'instagram' | 'tiktok' | 'facebook' | 'google_reviews' | 'news';
  keywords: string[];
  competitors?: string[];
  interval: 'realtime' | 'hourly' | 'daily';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  retryCount: number;
  lastRunAt: Date;
}
```

**Business Logic:**
- Free Tier: 1 platform (pilih salah satu), crawl daily
- Pro Tier: 3 platform, crawl hourly
- Enterprise: All platforms, real-time streaming
- Fallback scraping hanya jika API rate limit exceeded

#### 5.3.2 NLP Sentiment Analyzer

**Model Pipeline:**

```
Raw Text
   │
   ├── Language Detection (fastText / CLD3)
   │   └── Bahasa Indonesia + English (primary)
   │
   ├── Text Cleaning
   │   ├── Remove HTML tags
   │   ├── Normalize slang (e.g., "gmn" → "bagaimana")
   │   ├── Handle emoji → text
   │   └── Handle typos
   │
   ├── Primary Sentiment (LLM-based)
   │   ├── Positif    (score: 0.7 - 1.0)
   │   ├── Netral     (score: 0.3 - 0.7)
   │   └── Negatif    (score: 0.0 - 0.3)
   │
   ├── Secondary Emotion (LLM-based)
   │   ├── Anger (Marah)
   │   ├── Joy (Senang)
   │   ├── Disappointment (Kecewa)
   │   ├── Enthusiasm (Antusias)
   │   ├── Fear (Takut)
   │   ├── Trust (Percaya)
   │   ├── Anticipation (Pengharapan)
   │   └── Surprise (Terkejut)
   │
   └── Confidence Score (0.0 - 1.0)
```

**Implementation Strategy:**
- **Primary** (cost-effective): OpenAI GPT-4o-mini / Claude 3 Haiku via API
- **Secondary**: Fine-tuned model untuk Bahasa Indonesia + English
- **Batch Processing**: Kumpulkan mentions per 5 menit, kirim batch ke LLM
- **Caching**: Cache hasil untuk mention yang sama (hash-based)

#### 5.3.3 Brand Association Extractor

**Logic:**
```typescript
interface BrandAssociation {
  brandId: string;
  adjective: string;         // e.g., "mahal", "awet", "kreatif"
  frequency: number;          // Berapa kali disebut
  sentimentContext: string;   // Positif/Negatif/Netral terkait kata ini
  lastMentionedAt: Date;
  trending: boolean;          // Naik signifikan dalam 7 hari?
}
```

**Proses:**
1. Parse mention text dengan dependency parser
2. Ekstrak adjective yang merujuk ke brand name (atau pronoun brand)
3. Hitung frekuensi per periode waktu
4. Kategorikan: Positif Association vs Negative Association
5. Trending detection: bandingkan frequency 7 hari terakhir vs 30 hari

#### 5.3.4 Visual & Aesthetic Scoring

**Proses:**
1. Extract dominant colors dari image (k-means clustering)
2. Bandingkan dengan brand color palette (CIEDE2000 color difference)
3. Hitung aesthetic score: `100 - (avg_color_deviation * 100)`
4. Return score + feedback ("Your image uses colors that are 85% aligned with your brand identity")

**Tools:** Sharp (image processing), Color-Thief (dominant colors), or CLIP model

### 5.4 Output Data Structure

```typescript
interface EnrichedMention {
  id: string;
  brandId: string;
  
  // Raw data
  platform: string;
  platformPostId: string;
  author: { username: string; displayName: string; followerCount: number };
  content: string;              // Original text
  mediaUrls: string[];          // Gambar/video
  postUrl: string;
  postedAt: Date;
  engagement: { likes: number; comments: number; shares: number; views: number };
  location?: { city: string; region: string; country: string };
  
  // AI-enriched
  sentiment: {
    primary: 'positive' | 'neutral' | 'negative';
    primaryScore: number;       // 0.0 - 1.0
    secondary: string;          // Emotion label
    confidence: number;         // 0.0 - 1.0
  };
  brandAssociations: Array<{ adjective: string; sentiment: string }>;
  visualScore?: number;         // 0 - 100
  
  // Metadata
  crawlJobId: string;
  isCrisis: boolean;
  crisisId?: string;
  createdAt: Date;
}
```

---

## 6. Modul 3: Early Warning System & Crisis Control

### 6.1 Deskripsi

Sistem keamanan merek yang bertindak sebagai **alarm dini** untuk mencegah krisis PR.

### 6.2 Anomaly Spike Detection

**Logic Detail:**

```typescript
interface AnomalyDetectionConfig {
  brandId: string;
  
  // Volume-based
  volumeWindowMinutes: number;    // Default: 60
  volumeThresholdMultiplier: number; // Default: 2.5 (standard deviations)
  
  // Sentiment-based
  negativeSentimentThreshold: number; // Default: 0.2 (>20% negatif)
  sentimentWindowMinutes: number;     // Default: 60
  
  // Velocity
  mentionVelocityThreshold: number;   // Default: 50 mentions/minute
  velocityWindowMinutes: number;      // Default: 5
}

interface AnomalyEvent {
  id: string;
  brandId: string;
  type: 'volume_spike' | 'sentiment_shift' | 'velocity_surge';
  severity: 'low' | 'medium' | 'high' | 'critical';
  triggeredAt: Date;
  metrics: {
    currentValue: number;
    baselineValue: number;
    deviation: number;           // Standard deviations from mean
  };
  affectedMentionIds: string[];
  status: 'new' | 'acknowledged' | 'investigating' | 'resolved';
}
```

**Detection Algorithms:**

1. **Volume Spike Detection** (Z-score):
   ```
   z = (current_mentions - mean_historical) / std_historical
   if z > threshold → anomaly
   ```

2. **Sentiment Shift Detection** (Moving Average):
   ```
   short_ma = avg sentiment in last 15 min
   long_ma = avg sentiment in last 24h
   if (long_ma - short_ma) > threshold → anomaly
   if short_ma < negative_threshold → crisis
   ```

3. **Velocity Surge Detection**:
   ```
   if mentions_per_minute > threshold → potential viral
   ```

### 6.3 Real-Time Crisis Alerts

**Channel Integration:**

| Channel | Priority | Latency | Implementation |
|---------|----------|---------|----------------|
| Dashboard Banner | Critical | < 1s | WebSocket event |
| Push Notification | High | < 5s | Web Push API / Service Worker |
| WhatsApp Message | High | < 30s | Twilio WhatsApp API / WhatsApp Cloud API |
| Email | Medium | < 2min | SendGrid / Resend |

**Alert Template:**
```typescript
interface CrisisAlert {
  brandName: string;
  severity: string;
  summary: string;              // "Lonjakan sentimen negatif 340% pada brand Anda"
  metrics: {
    negativeMentions: number;
    totalMentions: number;
    negativePercentage: number;
    topSource: string;          // Platform asal lonjakan
  };
  topMentions: Array<{
    content: string;
    platform: string;
    engagement: number;
    url: string;
  }>;
  generatedAt: Date;
  actionUrl: string;            // Link ke halaman crisis dashboard
}
```

### 6.4 Triage & Source Tracing

**Proses Tracing:**

1. Ambil semua mentions dalam window anomaly
2. Urutkan berdasarkan `postedAt` ascending
3. Find the **first mention** with high engagement (viral seed)
4. Buat timeline visual:
   ```
   🕐 08:45 — Mention pertama (0 likes)
   🕐 08:52 — Share pertama (10 shares)
   🕐 09:10 — Viral: 5.000 mentions/jam
   🕐 09:30 — Crisis alert triggered 🔴
   ```

### 6.5 Auto-Response Suggestions

**LLM Prompt Template:**
```
You are a crisis communication advisor for {brandName}.
Brand tone: {toneStyle}
Brand values: {brandValues}
Crisis summary: {crisisSummary}

Generate 3 response options:
1. Press Release (formal, untuk media)
2. Social Media Reply (sesuai platform tone)
3. Direct Message (personal, untuk individu terkait)

Each option should:
- Use calming language
- Acknowledge the issue
- State what action is being taken
- Stay within brand voice
```

---

## 7. Modul 4: Strategy & Recommendation Engine

### 7.1 Deskripsi

Sistem tidak hanya baca data, tapi memberikan **action plan** konkret.

### 7.2 Content Tone Checker

**Flow:**
```
User inputs draft text + select target platform
        │
        ▼
AI Analyze:
  ├── Compare with Brand Tone Matrix (Modul 1)
  ├── Check banned words
  ├── Check brand voice alignment (score 0-100)
  └── Check platform appropriateness
        │
        ▼
Output:
  ├── Tone Score: 85/100 (Aligned ✅)
  ├── Issues: "2 kata yang masuk blacklist ditemukan"
  ├── Suggestions: "Ganti 'murah' dengan 'terjangkau' "
  └── Overall: "✓ Cocok untuk Instagram, ✗ Terlalu formal untuk TikTok"
```

**API:**
```typescript
interface ToneCheckRequest {
  brandId: string;
  text: string;
  targetPlatform: 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'facebook';
}

interface ToneCheckResponse {
  toneScore: number;              // 0-100
  isAligned: boolean;
  issues: Array<{
    type: 'banned_word' | 'tone_mismatch' | 'platform_mismatch';
    severity: 'low' | 'medium' | 'high';
    message: string;
    suggestion: string;
  }>;
  suggestions: string[];          // Improved version suggestions
  platformFit: Record<string, boolean>;  // Per platform fit check
}
```

### 7.3 Campaign Optimizer

**Logic:**
```typescript
interface CampaignRecommendation {
  recommendedContentTypes: Array<{
    type: 'educational' | 'entertainment' | 'promotional' | 'behind_the_scenes';
    reason: string;               // "Minggu lalu konten edukasi punya engagement rate 5.2%"
    expectedEngagement: string;
  }>;
  bestPostingTimes: Array<{
    day: string;
    time: string;
    platform: string;
  }>;
  hashtagSuggestions: string[];   // Top performing hashtags
  contentGaps: string[];           // "Tidak ada konten video dalam 2 minggu"
}
```

**Algorithm:**
1. Analisis historical engagement data (30 hari)
2. Kelompokkan konten berdasarkan tipe (via AI classification)
3. Hitung avg engagement per tipe konten
4. Identifikasi pola waktu posting terbaik
5. Cari gaps (tipe konten yang belum diposting dalam X hari)
6. Rekomendasi konten untuk minggu depan

### 7.4 Audience Persona Matcher

**Logic:**
```typescript
interface PersonaMatchResult {
  actualAudience: {
    ageDistribution: Record<string, number>;     // "18-24": 45%
    genderSplit: { male: number; female: number; other: number };
    topLocations: Array<{ city: string; percentage: number }>;
    topInterests: Array<{ interest: string; percentage: number }>;
  };
  targetAudience: TargetDemographic;  // Dari Brand DNA Setup
  alignmentScore: number;              // 0-100
  gaps: Array<{
    dimension: string;                 // "age", "location", "interest"
    expected: string;
    actual: string;
    actionItem: string;               // "Perlu konten yang menjangkau demografis 35-44"
  }>;
}
```

---

## 8. Modul 5: Command Center & Dashboard

### 8.1 Executive Summary Dashboard

**Widgets yang tersedia:**

| Widget | Tipe | Deskripsi | Auto-Refresh |
|--------|------|-----------|--------------|
| **Brand Health Score** | Gauge (0-100) | Composite score dari sentiment + volume + engagement | Realtime |
| **Volume Trend** | Line chart | Mentions per hour/day/week | 5 menit |
| **Sentiment Pie** | Donut chart | Positif/Netral/Negatif breakdown | 5 menit |
| **Emotion Distribution** | Bar chart | Anger, Joy, Disappointment, Enthusiasm | 15 menit |
| **Top Mentions** | Table | Mentions with highest engagement | Realtime |
| **Keywords Trending** | Tag cloud | Top keywords muncul | 1 jam |
| **Alert Status** | Status bar | Active crisis alerts count | Realtime |

**Drag-and-Drop Layout:**
- Menggunakan `react-grid-layout` atau `@dnd-kit/sortable`
- Layout disimpan per user per brand
- Resize, reorder, add/remove widgets

### 8.2 Competitor Benchmarking Matrix

**Metrik Perbandingan:**

| Metrik | Brand A (Client) | Competitor 1 | Competitor 2 | Competitor 3 |
|--------|-----------------|--------------|--------------|--------------|
| **Share of Voice** | 35% | 28% | 22% | 15% |
| **Sentimen Positif** | 72% | 65% | 58% | 80% |
| **Sentimen Negatif** | 8% | 12% | 15% | 5% |
| **Avg Engagement** | 245 | 189 | 312 | 156 |
| **Mention Volume** | 12.450 | 9.820 | 7.650 | 5.230 |

**Visualization:** Grouped bar chart atau radar chart.

### 8.3 Geospatial Brand Heatmap

**Data Flow:**
```
Mentions with location data (city/region level)
        │
        ▼
Aggregate per region: { city, positive_count, negative_count, total }
        │
        ▼
Render map dengan gradasi warna:
  ├── Hijau → Sentimen positif dominan
  ├── Merah → Sentimen negatif dominan
  └── Abu-abu → Volume rendah / tidak ada data
        │
        ▼
Interactivity:
  ├── Hover → Lihat detail (city, sentiment breakdown)
  ├── Click → Filter all dashboard by region
  └── Zoom → Regional / city / provincial level
```

**Teknologi:** Mapbox GL JS atau Leaflet.js

### 8.4 Automated Report Generator

**Supported Formats:**

| Format | Library | Fitur |
|--------|---------|-------|
| **PDF** | Puppeteer + HTML template | Full branding, charts, tables |
| **PPT** | PptxGenJS | Editable slides, template-based |
| **Excel** | ExcelJS | Raw data, pivot tables, charts |

**Report Content:**
- Cover page with brand logo & date range
- Executive Summary (key metrics)
- Sentiment Trend (line chart)
- Competitor Comparison (bar chart)
- Top Mentions (table)
- Keyword Analysis (tag cloud)
- Recommendations (AI-generated)
- Appendix: Raw data

---

## 9. Modul 6: User & System Administration

### 9.1 Role-Based Access Control (RBAC)

**Permission Matrix:**

| Feature | Super Admin | Manager | Analyst | Viewer |
|---------|:-----------:|:-------:|:-------:|:------:|
| Manage Users | ✅ | ❌ | ❌ | ❌ |
| Manage Billing | ✅ | ❌ | ❌ | ❌ |
| System Config | ✅ | ❌ | ❌ | ❌ |
| All Brands | ✅ | Own Brand | Own Brand | Own Brand |
| Brand DNA Setup | ✅ | ✅ | ❌ | ❌ |
| Social Listening Config | ✅ | ✅ | ❌ | ❌ |
| View Dashboard | ✅ | ✅ | ✅ | ✅ (read-only) |
| View Mentions | ✅ | ✅ | ✅ | ❌ |
| Export Reports | ✅ | ✅ | ✅ | ✅ |
| Crisis Management | ✅ | ✅ | ❌ | ❌ |
| API Keys | ✅ | ✅ | ❌ | ❌ |
| Content Tone Checker | ✅ | ✅ | ✅ | ❌ |

**Implementation:**
```typescript
enum Role {
  SUPER_ADMIN = 'super_admin',
  MANAGER = 'manager',
  ANALYST = 'analyst',
  VIEWER = 'viewer',
}

interface Permission {
  action: string;        // e.g., 'brand:create', 'mention:read', 'report:export'
  resource: string;      // e.g., 'brand', 'mention', 'report'
  conditions?: string[]; // e.g., ['own_brand_only']
}
```

### 9.2 API & Integration Hub

**Features:**
- **API Key Management:** Generate, revoke, rotate API keys
- **Rate Limiting:** Per-tier limits (Free: 100/jam, Pro: 1000/jam, Enterprise: Custom)
- **Webhooks:** Event-based notifications (mention.created, crisis.detected)
- **OAuth2:** Integrasi dengan platform sosial media

**API Key Structure:**
```
[STRIPE_PRODUCTION_KEY_PLACEHOLDER]  (Production)
[STRIPE_TEST_KEY_PLACEHOLDER]  (Testing)
```

### 9.3 Subscription & Billing Management

**Tier Structure:**

| Feature | Free | Pro ($99/mo) | Enterprise (Custom) |
|---------|:----:|:------------:|:-------------------:|
| Brands | 1 | 3 | Unlimited |
| Monthly Mentions | 50 | 5,000 | Unlimited |
| Platforms | 1 | 3 | All |
| Data History | 7 hari | 1 tahun | Unlimited |
| AI Analytics | Basic | Advanced | Full Suite |
| EWS | ❌ | ✅ | ✅ |
| Export Reports | CSV only | PDF/PPT/Excel | All Formats |
| API Access | ❌ | ✅ | ✅ + Webhooks |
| Support | Email | Priority | Dedicated |

**Implementation:**
- Stripe untuk payment processing
- Subscription lifecycle: active, past_due, canceled, expired
- Webhook Stripe → update user quota
- Quota enforcement middleware

---

## 10. Struktur Project

```
sentiment/
├── public/
│   ├── uploads/            # Temporary uploads
│   └── logo.svg           # Default logo
│
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # Root layout (Theme, Auth provider)
│   │   ├── page.tsx        # Landing page / Login redirect
│   │   ├── globals.css     # Tailwind global styles
│   │   │
│   │   ├── auth/           # Authentication pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   │
│   │   ├── dashboard/      # Modul 5: Command Center
│   │   │   ├── page.tsx        # Executive Summary
│   │   │   ├── competitor-benchmarking/
│   │   │   ├── geospatial/
│   │   │   └── reports/
│   │   │
│   │   ├── brand/          # Modul 1: Brand Identity
│   │   │   ├── page.tsx        # Brand list
│   │   │   ├── [id]/
│   │   │   ├── setup/          # Multi-step wizard
│   │   │   ├── tone-matrix/
│   │   │   ├── competitors/
│   │   │   └── keywords/
│   │   │
│   │   ├── sentiment/      # Modul 2: AI Sentiment
│   │   │   ├── page.tsx        # Live feed
│   │   │   ├── mentions/
│   │   │   ├── analysis/
│   │   │   └── associations/
│   │   │
│   │   ├── crisis/         # Modul 3: EWS
│   │   │   ├── page.tsx        # Crisis dashboard
│   │   │   ├── alerts/
│   │   │   ├── triage/
│   │   │   └── auto-response/
│   │   │
│   │   ├── strategy/       # Modul 4: Strategy
│   │   │   ├── page.tsx        # Strategy hub
│   │   │   ├── tone-checker/
│   │   │   ├── campaign-optimizer/
│   │   │   └── persona-matcher/
│   │   │
│   │   ├── admin/          # Modul 6: Admin
│   │   │   ├── page.tsx        # Overview
│   │   │   ├── users/
│   │   │   ├── billing/
│   │   │   ├── api-keys/
│   │   │   └── settings/
│   │   │
│   │   └── api/            # API Routes
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       ├── brand/
│   │       ├── sentiment/
│   │       ├── crisis/
│   │       ├── strategy/
│   │       ├── dashboard/
│   │       ├── admin/
│   │       ├── upload/
│   │       └── webhooks/
│   │           ├── stripe/
│   │           └── social/
│   │
│   ├── components/
│   │   ├── ui/                 # Shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/
│   │   │   ├── sidebar.tsx
│   │   │   ├── navbar.tsx
│   │   │   ├── theme-toggle.tsx
│   │   │   └── breadcrumbs.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── brand-health-gauge.tsx
│   │   │   ├── sentiment-chart.tsx
│   │   │   ├── mentions-table.tsx
│   │   │   ├── widget-grid.tsx
│   │   │   └── competitor-matrix.tsx
│   │   │
│   │   ├── brand/
│   │   │   ├── brand-dna-form.tsx
│   │   │   ├── color-palette-picker.tsx
│   │   │   ├── tone-matrix-editor.tsx
│   │   │   ├── competitor-card.tsx
│   │   │   └── keyword-manager.tsx
│   │   │
│   │   ├── sentiment/
│   │   │   ├── mention-card.tsx
│   │   │   ├── sentiment-badge.tsx
│   │   │   ├── sentiment-timeline.tsx
│   │   │   ├── emotion-bar.tsx
│   │   │   └── association-cloud.tsx
│   │   │
│   │   ├── crisis/
│   │   │   ├── alert-card.tsx
│   │   │   ├── source-timeline.tsx
│   │   │   ├── auto-response-panel.tsx
│   │   │   └── crisis-banner.tsx
│   │   │
│   │   ├── strategy/
│   │   │   ├── tone-checker-form.tsx
│   │   │   ├── campaign-calendar.tsx
│   │   │   └── persona-card.tsx
│   │   │
│   │   └── admin/
│   │       ├── user-table.tsx
│   │       ├── billing-card.tsx
│   │       ├── api-key-manager.tsx
│   │       └── subscription-form.tsx
│   │
│   ├── hooks/
│   │   ├── use-brand.ts
│   │   ├── use-sentiment.ts
│   │   ├── use-crisis.ts
│   │   ├── use-dashboard.ts
│   │   ├── use-websocket.ts
│   │   └── use-debounce.ts
│   │
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── auth.ts            # NextAuth config
│   │   ├── api.ts             # tRPC / Axios instance
│   │   ├── utils.ts           # Helper functions
│   │   ├── validations.ts     # Zod schemas
│   │   └── constants.ts       # App constants
│   │
│   ├── server/
│   │   ├── services/
│   │   │   ├── brand-service.ts
│   │   │   ├── sentiment-service.ts
│   │   │   ├── crisis-service.ts
│   │   │   ├── strategy-service.ts
│   │   │   ├── dashboard-service.ts
│   │   │   └── admin-service.ts
│   │   │
│   │   ├── ai/
│   │   │   ├── sentiment-analyzer.ts
│   │   │   ├── brand-associations.ts
│   │   │   ├── tone-checker.ts
│   │   │   ├── visual-scorer.ts
│   │   │   ├── response-generator.ts
│   │   │   └── campaign-optimizer.ts
│   │   │
│   │   ├── crawlers/
│   │   │   ├── base-crawler.ts
│   │   │   ├── twitter-crawler.ts
│   │   │   ├── instagram-crawler.ts
│   │   │   ├── tiktok-crawler.ts
│   │   │   ├── facebook-crawler.ts
│   │   │   ├── google-reviews.ts
│   │   │   └── news-crawler.ts
│   │   │
│   │   └── queue/
│   │       ├── queue-manager.ts
│   │       ├── crawl-queue.ts
│   │       └── nlp-queue.ts
│   │
│   └── types/
│       ├── index.ts
│       ├── brand.ts
│       ├── sentiment.ts
│       ├── crisis.ts
│       ├── strategy.ts
│       ├── dashboard.ts
│       ├── admin.ts
│       └── api.ts
│
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── migrations/
│   └── seed.ts           # Seed data
│
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── nginx.conf
│   └── .dockerignore
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
│
├── test/
│   ├── unit/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── api/
│   ├── integration/
│   │   ├── flows/
│   │   └── api-integration/
│   └── fixtures/
│       ├── mentions.json
│       ├── brands.json
│       └── users.json
├── e2e/
│   ├── specs/
│   │   ├── brand-setup.spec.ts
│   │   ├── dashboard.spec.ts
│   │   ├── sentiment-feed.spec.ts
│   │   ├── crisis-alert.spec.ts
│   │   └── auth-flow.spec.ts
│   ├── fixtures/
│   │   └── test-users.json
│   └── playwright.config.ts
├── storybook/
│   ├── stories/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── brand/
│   │   ├── sentiment/
│   │   └── dashboard/
│   └── .storybook/
│       ├── main.ts
│       └── preview.ts
├── scripts/
│   ├── seed.ts                      # Database seeding
│   ├── seed-demo.ts                 # Demo data generator
│   ├── migrate-schema.ts            # Custom migrations
│   ├── backup.sh                    # DB backup script
│   ├── restore.sh                   # DB restore script
│   └── benchmark.ts                 # Performance benchmark
├── docs/
│   ├── api/
│   │   ├── authentication.md
│   │   ├── brand.md
│   │   ├── sentiment.md
│   │   ├── crisis.md
│   │   └── webhooks.md
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── data-flow.md
│   │   └── scaling.md
│   ├── deployment/
│   │   ├── docker.md
│   │   ├── kubernetes.md
│   │   └── ci-cd.md
│   ├── guides/
│   │   ├── getting-started.md
│   │   ├── brand-setup.md
│   │   └── api-integration.md
│   └── development/
│       ├── setup.md
│       ├── contributing.md
│       └── testing.md
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── package.json
└── README.md
```

---

## 11. Database Schema

### 11.1 Entity Relationship Diagram (Textual)

```
Tenants ──1:N── Users
Users   ──1:N── Brands
Brands  ──1:N── Mentions
Mentions ──N:1── CrawlJobs
Brands  ──1:N── Competitors
Brands  ──1:1── ToneMatrix
Brands  ──1:N── Keywords
Brands  ──1:N── BrandAssociations
Brands  ──1:N── AnomalyEvents (EWS)
AnomalyEvents ──1:N── CrisisAlerts
Mentions ──N:N── AnomalyEvents (affected mentions)
Users   ──1:1── Subscriptions
Mentions ──N:1── Campaigns
Brands  ──1:N── Campaigns
Users   ──N:N── Roles
Mentions ──1:1── VisualScores
Mentions ──N:N── Tags
```

### 11.2 Complete Prisma Schema

```prisma
// ==========================================
// TENANT & USER MANAGEMENT
// ==========================================

model Tenant {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  users  User[]
  brands Brand[]
}

model User {
  id             String   @id @default(cuid())
  email          String   @unique
  passwordHash   String
  name           String
  avatarUrl      String?
  role           Role     @default(ANALYST)
  isActive       Boolean  @default(true)
  emailVerified  DateTime?
  twoFactorEnabled Boolean @default(false)
  lastLoginAt    DateTime?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  tenantId    String
  tenant      Tenant   @relation(fields: [tenantId], references: [id])

  // Relations
  apiKeys       ApiKey[]
  subscription  Subscription?
  sessions      Session[]
  accounts      Account[]
}

enum Role {
  SUPER_ADMIN
  MANAGER
  ANALYST
  VIEWER
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  expires      DateTime
  createdAt    DateTime @default(now())
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  user              User    @relation(fields: [userId], references: [id])
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  @@unique([provider, providerAccountId])
}

// ==========================================
// MODUL 1: BRAND IDENTITY & PROFILING
// ==========================================

model Brand {
  id        String   @id @default(cuid())
  name      String
  slug      String
  logoUrl   String?
  tagline   String?
  industry  String
  website   String?
  
  // Brand Identity
  primaryColor   String   @default("#000000")
  secondaryColor String?
  accentColor    String?
  brandPersonality String[] // Array of personality traits
  
  // Target Demographic (JSON)
  targetDemographic Json?  // { ageRange, location, gender, interests[] }
  
  // Status
  isActive   Boolean  @default(true)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  // Relations
  tenantId   String
  tenant     Tenant      @relation(fields: [tenantId], references: [id])
  
  toneMatrix         ToneMatrix?
  competitors        Competitor[]
  keywords           Keyword[]
  mentions           Mention[]
  brandAssociations  BrandAssociation[]
  anomalyEvents      AnomalyEvent[]
  campaigns          Campaign[]
  crawlJobs          CrawlJob[]

  @@unique([tenantId, slug])
}

model ToneMatrix {
  id        String   @id @default(cuid())
  brandId   String   @unique
  brand     Brand    @relation(fields: [brandId], references: [id], onDelete: Cascade)

  // Main tone settings
  communicationStyle Json   // { primary: "formal", secondary: "casual", priority: 1 }
  bannedWords        String[] // Words to avoid
  preferredWords     String[] // Words to prioritize
  
  // Platform-specific tones
  platformTones      Json?   // { twitter: "casual", linkedin: "formal" }
  customRules        Json?   // { maxEmojiPerPost: 3, minSentenceLength: 10 }
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Competitor {
  id        String   @id @default(cuid())
  brandId   String
  brand     Brand    @relation(fields: [brandId], references: [id], onDelete: Cascade)
  
  name                String
  website             String?
  socialMediaHandles  Json  // { twitter, instagram, tiktok, facebook }
  logoUrl             String?
  
  isActive   Boolean  @default(true)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Keyword {
  id        String   @id @default(cuid())
  brandId   String
  brand     Brand    @relation(fields: [brandId], references: [id], onDelete: Cascade)
  
  text      String       // Keyword text
  type      KeywordType  // BRAND_NAME, PRODUCT, HASHTAG, CAMPAIGN, INDUSTRY
  campaign  String?      // Campaign name if type = CAMPAIGN
  
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())

  @@unique([brandId, text])
}

enum KeywordType {
  BRAND_NAME
  PRODUCT
  HASHTAG
  CAMPAIGN
  INDUSTRY
}

// ==========================================
// MODUL 2: AI & SENTIMENT ENGINE
// ==========================================

model Mention {
  id        String   @id @default(cuid())
  brandId   String
  brand     Brand    @relation(fields: [brandId], references: [id], onDelete: Cascade)

  // Source
  platform    String  // twitter, instagram, tiktok, facebook, google_reviews, news
  platformPostId String?
  postUrl     String?
  
  // Author
  authorUsername  String
  authorDisplayName String?
  authorFollowers  Int?
  authorAvatarUrl  String?
  
  // Content
  content       String   @db.Text
  contentClean  String?  @db.Text  // Cleaned version for NLP
  language      String?  // Detected language
  
  // Media
  mediaUrls     String[] // Images/videos attached
  mediaType     String?  // image, video, carousel
  
  // Engagement
  likeCount    Int      @default(0)
  commentCount Int      @default(0)
  shareCount   Int      @default(0)
  viewCount    Int      @default(0)
  
  // Location
  locationCity    String?
  locationRegion  String?
  locationCountry String?
  coordinates     Json?    // { lat, lng }
  
  // AI Enrichment
  sentimentPrimary   SentimentPrimary?   // POSITIVE, NEGATIVE, NEUTRAL
  sentimentScore     Float?              // 0.0 - 1.0
  emotionSecondary   String?             // ANGER, JOY, DISAPPOINTMENT, ENTHUSIASM, etc
  sentimentConfidence Float?             // 0.0 - 1.0
  aiProcessedAt      DateTime?
  
  // Visual scoring
  visualScore        Float?  // 0-100
  visualScoreData    Json?   // { dominantColors[], deviationScore }
  
  // Metadata
  postedAt   DateTime
  fetchedAt  DateTime  @default(now())
  
  // Crisis relation
  isCrisis     Boolean    @default(false)
  anomalyEvent AnomalyEventMention[]
  
  // Relations
  crawlJobId  String?
  crawlJob    CrawlJob?    @relation(fields: [crawlJobId], references: [id])
  campaignId  String?
  campaign    Campaign?    @relation(fields: [campaignId], references: [id])
  tags        MentionTag[]
  brandAssociations MentionAssociation[]

  @@index([brandId, postedAt])
  @@index([platform, postedAt])
  @@index([sentimentPrimary])
  @@index([isCrisis])
}

enum SentimentPrimary {
  POSITIVE
  NEUTRAL
  NEGATIVE
}

model MentionTag {
  mentionId String
  mention   Mention @relation(fields: [mentionId], references: [id], onDelete: Cascade)
  tag       String

  @@id([mentionId, tag])
}

model BrandAssociation {
  id        String   @id @default(cuid())
  brandId   String
  brand     Brand    @relation(fields: [brandId], references: [id], onDelete: Cascade)
  
  adjective      String
  frequency      Int       @default(1)
  sentimentContext String?  // POSITIVE, NEGATIVE, NEUTRAL terkait kata ini
  isTrending     Boolean   @default(false)
  
  lastMentionedAt DateTime
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@unique([brandId, adjective])
}

model MentionAssociation {
  mentionId          String
  mention            Mention         @relation(fields: [mentionId], references: [id], onDelete: Cascade)
  brandAssociationId String
  brandAssociation   BrandAssociation @relation(fields: [brandAssociationId], references: [id], onDelete: Cascade)

  @@id([mentionId, brandAssociationId])
}

// ==========================================
// CRAWLER MANAGEMENT
// ==========================================

model CrawlJob {
  id        String   @id @default(cuid())
  brandId   String
  brand     Brand    @relation(fields: [brandId], references: [id], onDelete: Cascade)
  
  platform    CrawlPlatform
  keywords    String[]      // Keywords used for this crawl
  status      CrawlStatus   @default(PENDING)
  interval    CrawlInterval @default(DAILY)
  
  retryCount     Int      @default(0)
  maxRetries     Int      @default(3)
  lastRunAt      DateTime?
  nextRunAt      DateTime?
  completedAt    DateTime?
  
  errorMessage   String?  @db.Text
  mentionsCount  Int      @default(0)
  
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  mentions Mention[]
}

enum CrawlPlatform {
  TWITTER
  INSTAGRAM
  TIKTOK
  FACEBOOK
  GOOGLE_REVIEWS
  NEWS
}

enum CrawlStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  CANCELLED
}

enum CrawlInterval {
  REALTIME
  HOURLY
  DAILY
}

// ==========================================
// MODUL 3: EARLY WARNING SYSTEM
// ==========================================

model AnomalyEvent {
  id        String   @id @default(cuid())
  brandId   String
  brand     Brand    @relation(fields: [brandId], references: [id], onDelete: Cascade)
  
  type        AnomalyType
  severity    AnomalySeverity @default(MEDIUM)
  status      AnomalyStatus   @default(NEW)
  
  // Metrics
  currentValue  Float
  baselineValue Float
  deviation     Float     // Standard deviations from mean
  threshold     Float
  
  // Time window
  windowStart DateTime
  windowEnd   DateTime
  
  acknowledgedAt  DateTime?
  acknowledgedBy  String?
  resolvedAt      DateTime?
  resolvedBy      String?
  resolutionNotes String?  @db.Text
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  mentions     AnomalyEventMention[]
  crisisAlerts CrisisAlert[]
}

enum AnomalyType {
  VOLUME_SPIKE
  SENTIMENT_SHIFT
  VELOCITY_SURGE
}

enum AnomalySeverity {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum AnomalyStatus {
  NEW
  ACKNOWLEDGED
  INVESTIGATING
  RESOLVED
}

model AnomalyEventMention {
  anomalyEventId String
  anomalyEvent   AnomalyEvent @relation(fields: [anomalyEventId], references: [id], onDelete: Cascade)
  mentionId      String
  mention        Mention      @relation(fields: [mentionId], references: [id], onDelete: Cascade)

  @@id([anomalyEventId, mentionId])
}

model CrisisAlert {
  id        String   @id @default(cuid())
  anomalyEventId String  anomalyEvent AnomalyEvent @relation(fields: [anomalyEventId], references: [id], onDelete: Cascade)
  
  channel AlertChannel
  sentAt  DateTime  @default(now())
  deliveredAt DateTime?
  readAt      DateTime?
  
  messageContent String @db.Text
  errorMessage   String?
  status         AlertStatus @default(PENDING)
  
  createdAt DateTime @default(now())
}

enum AlertChannel {
  DASHBOARD
  PUSH_NOTIFICATION
  WHATSAPP
  EMAIL
}

enum AlertStatus {
  PENDING
  SENT
  DELIVERED
  FAILED
  READ
}

// ==========================================
// MODUL 4: STRATEGY & RECOMMENDATION
// ==========================================

model Campaign {
  id        String   @id @default(cuid())
  brandId   String
  brand     Brand    @relation(fields: [brandId], references: [id], onDelete: Cascade)
  
  name        String
  description String?  @db.Text
  hashtags    String[]
  platforms   String[] // target platforms
  startDate   DateTime
  endDate     DateTime?
  
  // Goals
  goals Json? // { targetEngagementRate, targetReach, targetSentiment }
  
  // AI Recommendations
  aiRecommendations Json?  // { recommendedContentTypes[], bestPostingTimes[], hashtagSuggestions[] }
  
  // Metrics
  totalMentions    Int      @default(0)
  totalEngagement  Int      @default(0)
  avgSentiment     Float?
  reach            Int      @default(0)
  
  status    CampaignStatus @default(DRAFT)
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt

  mentions Mention[]
}

enum CampaignStatus {
  DRAFT
  ACTIVE
  PAUSED
  COMPLETED
  ARCHIVED
}

// ==========================================
// MODUL 5: DASHBOARD CONFIGURATION
// ==========================================

model DashboardWidget {
  id        String   @id @default(cuid())
  userId    String
  
  userId    String
  user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  widgetType  String   // brand_health, volume_trend, sentiment_pie, etc
  position    Int      // Order in layout
  size        Json     // { w, h, minW, minH }
  config      Json?    // Widget-specific settings (timeRange, chartType, etc)
  
  isVisible Boolean @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// ==========================================
// MODUL 6: ADMIN & BILLING
// ==========================================

model ApiKey {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  name        String
  key         String   @unique  // Hashed key
  keyPrefix   String   // First 8 chars for identification
  keyType     ApiKeyType @default(PRODUCTION)
  
  permissions String[] // Array of allowed actions
  allowedIps  String[] // IP whitelist (optional)
  
  lastUsedAt  DateTime?
  expiresAt   DateTime?
  isActive    Boolean   @default(true)
  
  rateLimitPerHour Int @default(100)
  requestsThisHour Int @default(0)
  rateLimitResetAt DateTime?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum ApiKeyType {
  PRODUCTION
  TESTING
}

model Subscription {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  plan          SubscriptionPlan @default(FREE)
  status        SubscriptionStatus @default(ACTIVE)
  
  stripeSubscriptionId String?  @unique
  stripeCustomerId     String?  @unique
  stripePriceId        String?
  
  // Quota
  maxBrands    Int   @default(1)
  maxMentions  Int   @default(50)
  maxKeywords  Int   @default(10)
  maxPlatforms Int   @default(1)
  
  mentionsUsedThisMonth Int @default(0)
  quotaResetAt          DateTime?
  
  currentPeriodStart DateTime?
  currentPeriodEnd   DateTime?
  canceledAt         DateTime?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum SubscriptionPlan {
  FREE
  PRO
  ENTERPRISE
}

enum SubscriptionStatus {
  ACTIVE
  PAST_DUE
  CANCELED
  EXPIRED
  TRIALING
}

model Invoice {
  id        String   @id @default(cuid())
  userId    String
  
  stripeInvoiceId  String?  @unique
  amount           Int      // In cents
  currency         String   @default("USD")
  status           String   // paid, open, uncollectible, void
  invoicePdf       String?
  
  periodStart DateTime
  periodEnd   DateTime
  paidAt      DateTime?
  
  createdAt DateTime @default(now())
}

// ==========================================
// SYSTEM AUDIT LOG
// ==========================================

model AuditLog {
  id        String   @id @default(cuid())
  tenantId  String
  tenant    Tenant  @relation(fields: [tenantId], references: [id])
  userId    String?
  
  action      String   // brand.create, mention.view, report.export, crisis.resolve
  resource    String   // brand, mention, report, apikey, user
  resourceId  String?
  
  details     Json?    // Additional context
  ipAddress   String?
  userAgent   String?
  
  createdAt DateTime @default(now())

  @@index([tenantId, createdAt])
  @@index([action])
}
```

---

## 12. API Design

### 12.1 REST API Endpoints

#### Authentication (`/api/auth`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/logout` | Logout | Yes |
| POST | `/api/auth/forgot-password` | Send reset email | No |
| POST | `/api/auth/reset-password` | Reset password | Token |

#### Brand Module (`/api/brand`)
| Method | Endpoint | Deskripsi | Role |
|--------|----------|-----------|------|
| GET | `/api/brand` | List brands | All |
| POST | `/api/brand` | Create brand | Manager+ |
| GET | `/api/brand/:id` | Get brand detail | All (own) |
| PATCH | `/api/brand/:id` | Update brand | Manager+ |
| DELETE | `/api/brand/:id` | Delete brand | Manager+ |
| POST | `/api/brand/:id/logo` | Upload logo | Manager+ |

| Method | Endpoint | Deskripsi | Role |
|--------|----------|-----------|------|
| GET | `/api/brand/:id/tone-matrix` | Get tone matrix | All |
| PATCH | `/api/brand/:id/tone-matrix` | Update tone matrix | Manager+ |
| GET | `/api/brand/:id/competitors` | List competitors | All |
| POST | `/api/brand/:id/competitors` | Add competitor | Manager+ |
| DELETE | `/api/brand/:id/competitors/:compId` | Remove competitor | Manager+ |
| GET | `/api/brand/:id/keywords` | List keywords | All |
| POST | `/api/brand/:id/keywords` | Add keyword | Manager+ |
| DELETE | `/api/brand/:id/keywords/:kwId` | Remove keyword | Manager+ |

#### Sentiment Module (`/api/sentiment`)
| Method | Endpoint | Deskripsi | Role |
|--------|----------|-----------|------|
| GET | `/api/sentiment/mentions` | List mentions (paginated) | Analyst+ |
| GET | `/api/sentiment/mentions/:id` | Get mention detail | Analyst+ |
| GET | `/api/sentiment/mentions/:id/similar` | Find similar mentions | Analyst+ |
| GET | `/api/sentiment/analysis` | Sentiment stats | All |
| GET | `/api/sentiment/analysis/timeline` | Sentiment over time | All |
| GET | `/api/sentiment/associations` | Brand associations | Analyst+ |
| GET | `/api/sentiment/emotions` | Emotion distribution | All |
| GET | `/api/sentiment/activity-log` | Crawl activity log | Manager+ |
| POST | `/api/sentiment/mentions/:id/flag` | Flag mention | Analyst+ |

#### EWS / Crisis Module (`/api/crisis`)
| Method | Endpoint | Deskripsi | Role |
|--------|----------|-----------|------|
| GET | `/api/crisis/alerts` | List alerts | Manager+ |
| GET | `/api/crisis/alerts/:id` | Alert detail | Manager+ |
| PATCH | `/api/crisis/alerts/:id/acknowledge` | Acknowledge alert | Manager+ |
| PATCH | `/api/crisis/alerts/:id/resolve` | Resolve alert | Manager+ |
| GET | `/api/crisis/triage/:eventId` | Source tracing | Manager+ |
| POST | `/api/crisis/generate-response` | Generate auto-response | Manager+ |
| GET | `/api/crisis/history` | Crisis history | All |
| PATCH | `/api/crisis/config` | Update EWS thresholds | Manager+ |

#### Strategy Module (`/api/strategy`)
| Method | Endpoint | Deskripsi | Role |
|--------|----------|-----------|------|
| POST | `/api/strategy/tone-check` | Check content tone | Analyst+ |
| GET | `/api/strategy/recommendations` | Campaign recommendations | Manager+ |
| POST | `/api/strategy/persona-match` | Audience persona check | Analyst+ |
| GET | `/api/strategy/campaigns` | List campaigns | All |
| POST | `/api/strategy/campaigns` | Create campaign | Manager+ |
| GET | `/api/strategy/campaigns/:id` | Campaign detail | All |
| PATCH | `/api/strategy/campaigns/:id` | Update campaign | Manager+ |

#### Dashboard Module (`/api/dashboard`)
| Method | Endpoint | Deskripsi | Role |
|--------|----------|-----------|------|
| GET | `/api/dashboard/summary` | Executive summary metrics | All |
| GET | `/api/dashboard/competitor-benchmark` | Competitor comparison | All |
| GET | `/api/dashboard/geospatial` | Geospatial heatmap data | All |
| GET | `/api/dashboard/recommendations` | AI recommendations | Manager+ |
| POST | `/api/dashboard/export` | Generate report (PDF/PPT/Excel) | Analyst+ |
| GET | `/api/dashboard/widgets` | Get widget layout | All |
| PATCH | `/api/dashboard/widgets` | Update widget layout | User |

#### Admin Module (`/api/admin`)
| Method | Endpoint | Deskripsi | Role |
|--------|----------|-----------|------|
| GET | `/api/admin/users` | List users | Super Admin |
| POST | `/api/admin/users` | Invite user | Super Admin |
| PATCH | `/api/admin/users/:id` | Update user role | Super Admin |
| DELETE | `/api/admin/users/:id` | Deactivate user | Super Admin |
| GET | `/api/admin/api-keys` | List API keys | Manager+ |
| POST | `/api/admin/api-keys` | Generate API key | Manager+ |
| DELETE | `/api/admin/api-keys/:id` | Revoke API key | Manager+ |
| GET | `/api/admin/billing/subscription` | Get subscription | All |
| PATCH | `/api/admin/billing/subscription` | Change plan | Manager+ |
| GET | `/api/admin/billing/invoices` | Invoice history | Manager+ |
| GET | `/api/admin/audit-log` | System audit log | Super Admin |

### 12.2 WebSocket Events

```typescript
// Client → Server
interface ClientEvents {
  'subscribe:brand': (brandId: string) => void;
  'unsubscribe:brand': (brandId: string) => void;
  'subscribe:dashboard': (brandId: string) => void;
  'subscribe:crisis': (brandId: string) => void;
}

// Server → Client
interface ServerEvents {
  'mention:new': (mention: EnrichedMention) => void;
  'sentiment:update': (data: SentimentSnapshot) => void;
  'dashboard:refresh': (metrics: DashboardMetrics) => void;
  'crisis:alert': (alert: CrisisAlertPayload) => void;
  'crisis:update': (eventId: string, status: string) => void;
  'crawl:status': (jobId: string, status: CrawlStatus) => void;
}
```

### 12.3 Webhooks (Outgoing)

```typescript
interface WebhookPayload {
  event: 'mention.created' | 'crisis.detected' | 'crisis.resolved' | 'report.generated';
  timestamp: string;
  data: Record<string, unknown>;
  signature: string;  // HMAC-SHA256 for verification
}
```

---

## 13. Tech Stack Detail

### 13.1 Frontend

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Next.js** | 15.x | App Router, React Server Components, SSR |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Utility-first styling |
| **Shadcn/ui** | Latest | UI component library (accessible, customizable) |
| **Recharts** | 2.x | Charts & graphs |
| **React Grid Layout** | Latest | Drag-and-drop dashboard |
| **Mapbox GL JS** | 3.x | Geospatial heatmap |
| **React Hook Form** | 7.x | Form handling |
| **Zod** | 3.x | Schema validation |
| **Socket.io Client** | 4.x | Real-time WebSocket |
| **TanStack Query** | 5.x | Server state management |
| **NextAuth.js** | 5.x | Authentication |
| **date-fns** | 3.x | Date formatting |

### 13.2 Backend

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Next.js API Routes** | 15.x | REST API endpoints |
| **Prisma** | 6.x | ORM + type-safe database queries |
| **NextAuth.js** | 5.x | Auth + session management |
| **Bull** | 4.x | Queue management (Redis-based) |
| **Socket.io** | 4.x | WebSocket server |
| **Zod** | 3.x | Request validation |

### 13.3 AI/ML

| Teknologi | Fungsi |
|-----------|--------|
| **OpenAI API (GPT-4o / GPT-4o-mini)** | Sentiment analysis, emotion detection, response generation, tone checking |
| **Anthropic Claude API** | Alternative/cost-comparison for LLM tasks |
| **HuggingFace Transformers** | Fine-tuned model untuk Bahasa Indonesia |
| **Sharp + Color-Thief** | Image processing untuk visual scoring |
| **CLIP (Alternative)** | Visual-aesthetic alignment |

### 13.4 Infrastructure

| Teknologi | Fungsi |
|-----------|--------|
| **PostgreSQL 16** | Primary database |
| **Redis 7** | Cache + Queue + Session store |
| **Elasticsearch 8** | Full-text search + mention indexing |
| **Docker + Docker Compose** | Containerization |
| **AWS S3 / Cloudflare R2** | File storage (logos, uploads) |

---

## 14. Security & Compliance

### 14.1 Authentication & Authorization

- **Password**: bcrypt hashing, minimum 8 karakter, kombinasi huruf+angka
- **2FA**: OTP-based (TOTP) menggunakan authenticator app
- **Session**: JWT with httpOnly cookies, CSRF protection
- **Rate Limiting**: Per endpoint, per user, per IP
- **RBAC**: Middleware-based permission checking di setiap API route

### 14.2 Data Security

- **Encryption at Rest**: Encrypt sensitive data (API keys, tokens)
- **Encryption in Transit**: HTTPS everywhere, WSS for WebSocket
- **API Key Storage**: Hashed with bcrypt, only prefix stored in plaintext
- **File Upload**: Virus scanning, file type validation, max size enforcement

### 14.3 Compliance

- **GDPR**: Data deletion on request, data export, cookie consent
- **Data Retention**: Auto-delete mentions older than tier limit *(Lihat Section 27 untuk detail retention policy)*
- **Audit Log**: Track all CRUD operations for compliance
- **Backup**: Daily automated backup, 30-day retention *(Lihat Section 29 untuk detail disaster recovery)*

> **Detail lebih lanjut**: Lihat [Section 25 — Compliance Detail](#25-compliance-detail) untuk cakupan regulasi lengkap (UU PDP, GDPR, UU ITE), data classification, user rights fulfillment, consent management, dan breach notification procedure.

### 14.4 Security Headers

```typescript
// next.config.ts
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; ..." },
];
```

---

## 15. Deployment & DevOps

### 15.1 Container Architecture

```
┌─────────────────────────────────────────────────┐
│                   Docker Compose                  │
│                                                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐ │
│  │ Next.js    │  │  Redis     │  │ PostgreSQL │ │
│  │ App        │  │  Server    │  │ Server     │ │
│  └────────────┘  └────────────┘  └────────────┘ │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐ │
│  │ Elastic    │  │ Nginx      │  │ Queue      │ │
│  │ search     │  │ (Reverse   │  │ Worker     │ │
│  │            │  │  Proxy)    │  │ (Bull)     │ │
│  └────────────┘  └────────────┘  └────────────┘ │
└─────────────────────────────────────────────────┘
```

### 15.2 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml
steps:
  - Lint (ESLint + Prettier)
  - Type check (tsc --noEmit)
  - Unit tests (Vitest)
  - Build (next build)
  - Docker build & push
  - Deploy to staging (Vercel / Railway / AWS ECS)
```

### 15.3 Environment Variables

```bash
# .env.example
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/sentiment
REDIS_URL=redis://localhost:6379

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# AI
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-...

# Storage
S3_ENDPOINT=http://localhost:9000
S3_BUCKET=sentiment-uploads
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin

# Notifications
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
WHATSAPP_FROM=+1412345678

SENDGRID_API_KEY=...
EMAIL_FROM=noreply@sentiment.ai

# Payment
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Search
ELASTICSEARCH_URL=http://localhost:9200
```

### 15.4 Scaling Strategy

| Komponen | Scaling Strategy | Notes |
|----------|-----------------|-------|
| **Next.js** | Horizontal (multiple instances) | Stateless, session di Redis |
| **PostgreSQL** | Read replicas + connection pooling | PgBouncer untuk pool |
| **Redis** | Cluster mode | Cache + Queue persistence |
| **Elasticsearch** | Sharded cluster | Search index scaling |
| **Crawlers** | Worker pool (vertical scaling) | Resource-intensive |

---

## 16. Risk Register & Mitigasi

### 16.1 Risk Matrix

| ID | Risk | Probability | Impact | L-Score (1-5) | C-Score (1-5) | Risk Score (L×C) | Risk Level | Risk Owner | Mitigation Strategy | Contingency Plan |
|----|------|:-----------:|:------:|:-------------:|:-------------:|:----------------:|:----------:|:-----------:|---------------------|------------------|
| R01 | Platform rate limit API | High | High | 4 | 4 | 16 | **Critical** | Crawler Lead Engineer | Queue system; rotating API keys; multi-account pool; rate limiting | Fallback to official API tier upgrade or aggregator partner |
| R02 | LLM API cost overrun | Medium | High | 3 | 4 | 12 | **High** | AI/ML Lead | Batch processing; caching NLP results (hash-based dedup); GPT-4o-mini for scale | Switch to Anthropic Claude or self-hosted model |
| R03 | Data privacy breach | Low | Critical | 1 | 5 | 5 | **Critical** | CISO / Security Lead | Encryption at rest; field-level PII encryption; strict RBAC; audit logging | Incident response plan; mandatory breach notification within 72h (UU PDP) |
| R04 | Single point of failure | Medium | High | 3 | 4 | 12 | **High** | Infrastructure Lead | Read replicas; Redis cluster Sentinel; automated failover; connection pooling | Graceful degradation — dashboard uses last cached data; database queue fallback |
| R05 | Crawler detection & blocking | Medium | High | 3 | 4 | 12 | **High** | Crawler Lead Engineer | Rotating residential proxies; human-like request patterns; rate limiting per IP; official API priority | Manual data upload option via CSV/Excel |
| R06 | LLM hallucination | Medium | Medium | 3 | 3 | 9 | **Medium** | AI/ML Lead | Confidence score threshold (>0.85); human review for borderline cases; A/B testing models | Manual sentiment override in dashboard; flag & retrain pipeline |
| R07 | Storage overflow | Medium | Low | 3 | 1 | 3 | **Low** | Infrastructure Lead | Auto-compress images; lifecycle policy (move to cold storage); max file size enforcement | S3 lifecycle rules; archival to Glacier after retention period |
| R08 | Dependency vulnerability | Low | High | 1 | 4 | 4 | **Medium** | Engineering Lead | Automated scanning (Dependabot + Snyk); weekly update schedule; SBOM generation | Hotfix deployment pipeline; temporary feature flag for affected module |
| R09 | Data inconsistency | Low | Medium | 1 | 3 | 3 | **Low** | Backend Lead | Idempotent job processing; optimistic locking (Prisma); transaction isolation | Manual reconciliation script; periodic data integrity check |
| R10 | User adoption failure | Medium | Medium | 3 | 3 | 9 | **Medium** | Product Manager | Progressive onboarding wizard; contextual tooltips; template/default configs; analytics tracking | User feedback loop; analytics-driven UX improvement; white-glove onboarding |

> **ISO 31000 Scoring Note:** Risk Score = Likelihood Score (L) × Consequence Score (C). Scale: 1 (Low) to 5 (Very High). Namun, berdasarkan ISO 31000 exception rule, setiap risiko dengan **Impact = Critical** otomatis diklasifikasikan sebagai **Critical Risk** terlepas dari skor L×C, karena dampaknya terhadap kelangsungan bisnis tidak dapat diterima. R03 (Data Privacy Breach) adalah contoh penerapan aturan ini — meskipun L=1 menghasilkan skor 5, risk level tetap Critical.

### 16.2 Business Continuity

| Scenario | RTO (Recovery Time) | RPO (Recovery Point) | Strategy |
|----------|:-------------------:|:--------------------:|----------|
| Database corruption | 4 hours | 15 minutes | Point-in-time recovery via WAL archives |
| Full region outage | 8 hours | 1 hour | Multi-region standby (passive); DNS failover |
| LLM API unavailable | 5 minutes | 0 (no data loss) | Fallback to simpler model (text-davinci) or rule-based analyzer |
| Crawler service down | 1 hour | 1 hour | Crawl queue backlog; auto-restart on health check failure |
| Security incident | 1 hour to contain | Continuous | Automated isolation; credential rotation; forensic snapshot |

---

## 17. Cost Estimation

### 17.1 Monthly Infrastructure Cost (Base)

| Resource | Spec | Free Tier (shared) | Pro Tier (per 100 tenant) | Enterprise (dedicated) |
|----------|------|:------------------:|:-------------------------:|:----------------------:|
| **Compute (Next.js)** | 2 vCPU, 4GB RAM | $0 (included) | $150/100 req | $500 (dedicated) |
| **PostgreSQL** | 4 vCPU, 16GB RAM, 500GB SSD | $50 (shared) | $200 (dedicated) | $800 (HA cluster) |
| **Redis** | 2GB cache | $15 (shared) | $50 (dedicated) | $200 (cluster) |
| **Elasticsearch** | 4 vCPU, 16GB RAM, 2TB storage | $0 (Free tier excluded) | $300 | $800 (sharded) |
| **Object Storage** | Per GB | $5 (10GB) | $25 (100GB) | $100 (500GB+) |
| **CDN** | Per GB transfer | $10 | $50 | $200 |
| **Queue Worker** | 2 vCPU, 4GB RAM | $0 (included) | $100 | $400 |
| **Total Base Infra** | | **~$80/bulan** | **~$875/bulan** | **~$3,000/bulan** |

### 17.2 AI/LLM Cost Estimates

**Cost per mention (batch processing):**

| Pipeline Component | Model | Cost per 1K mentions | Notes |
|--------------------|-------|:--------------------:|-------|
| Language Detection | CLD3 (open source) | $0.00 | Free, runs locally |
| Text Cleaning | Custom regex | $0.00 | Free |
| Sentiment + Emotion | GPT-4o-mini (batch) | $0.38 | Cache hit rate 20% reduces to $0.30 |
| Brand Association | GPT-4o-mini | $0.15 | Only for mentions containing brand name |
| Visual Scoring | Sharp (local) | $0.00 | Free, compute only |
| **Total per mention** | | **$0.00053** | At GPT-4o-mini batch pricing |

**Monthly AI Cost Projections:**

| Tier | Monthly Mentions | AI Cost/month | Revenue/month | AI Cost % of Revenue |
|------|:----------------:|:-------------:|:-------------:|:--------------------:|
| Free | 50 | $0.03 | $0 | N/A (acquisition cost) |
| Pro | 5,000 | $2.65 | $99 | 2.7% |
| Enterprise (10 brands) | 50,000 | $26.50 | $999+ | 2.7% |
| Enterprise (50 brands) | 500,000 | $265 | $4,999+ | 5.3% |
| Enterprise (200 brands) | 2,000,000 | $1,060 | custom | Variable |

### 17.3 Additional Cost Components

| Item | Cost | Notes |
|------|:----:|-------|
| **Twilio WhatsApp** | $0.005/message outbound | Only for crisis alerts |
| **SendGrid Email** | $15/mo for 50K emails | Transactional + alert emails |
| **Mapbox GL** | $200/mo (Pay-as-you-go) | Geospatial maps — Free tier for first 50K loads |
| **Domain & SSL** | $150/year | Multiple subdomains |
| **Monitoring (Sentry)** | $26/month/10K events | Error tracking + performance monitoring |
| **CI/CD Pipeline** | $0 (GitHub Actions free) | 2,000 min/month free |
| **VPN/Security** | $25/month | Zero Trust Access (Cloudflare) |

**Total Estimated Monthly Cost (100 Pro tenants):** ~$1,250–$1,500/month
**Revenue (100 Pro tenants @ $99):** $9,900/month
**Gross Margin:** ~85%

---

## 18. Testing Strategy

### 18.1 Test Pyramid

```
        ╱╲
       ╱ E2E ╲             ← 5% of tests — Critical user journeys
      ╱───────╲
     ╱Integration╲          ← 15% of tests — API + DB + AI integration
    ╱─────────────╲
   ╱   Unit Tests   ╲       ← 60% of tests — Services, utils, validators
  ╱───────────────────╲
 ╱   Static Analysis    ╲    ← 20% — TypeScript strict mode, ESLint, Zod runtime
╱─────────────────────────╲
```

### 18.2 Testing Framework & Tools

| Type | Tool | Target Coverage | CI Stage |
|------|------|:---------------:|:--------:|
| Static analysis | TypeScript strict + ESLint + Prettier | 100% files | Pre-commit + CI |
| Unit tests | Vitest + React Testing Library | >85% lines | CI (parallel) |
| API integration | Supertest + Vitest | >90% endpoints | CI (sequential) |
| Database | Prisma integration tests (test DB) | All queries | CI (sequential) |
| AI accuracy | Custom evaluation suite (sentiment F1) | >85% F1 score | Nightly |
| E2E | Playwright | Critical user paths | CI (nightly) |
| Visual regressions | Percy / Chromatic | Dashboard components | CI (on PR) |
| Load testing | k6 / Artillery | API under 10K req/min | Pre-release |
| Security | OWASP ZAP + npm audit | Critical vulnerabilities | CI (weekly) |

### 18.3 Unit Test Scenarios per Modul

| Modul | Key Scenarios | 
|-------|---------------|
| **Brand** | Create brand (valid/invalid/duplicate); upload logo (size/type validation); update tone matrix; CRUD competitors; keyword quota enforcement per tier |
| **Sentiment** | NLP pipeline end-to-end (mock LLM); deduplication logic; batch processing timing; cache hit/miss behavior; empty/invalid input handling |
| **Crisis** | Anomaly detection math (Z-score, moving average); threshold configuration; alert channel fallback (if WhatsApp fails → email); response generation templates |
| **Strategy** | Tone checker comparison logic; campaign optimizer algorithm (aggregate → recommend); persona match scoring |
| **Dashboard** | Widget layout persistence; real-time data refresh via WebSocket mocks; report generation with different formats; geospatial data aggregation |
| **Admin** | RBAC permission enforcement for each endpoint; API key generation & hashing; quota enforcement middleware; Stripe webhook handling |

### 18.4 AI/ML Evaluation Suite

```typescript
interface SentimentEvalResult {
  modelVersion: string;
  testDate: Date;
  
  // Accuracy metrics
  accuracy: number;          // % correct predictions
  precision: number;         // true_pos / (true_pos + false_pos)
  recall: number;            // true_pos / (true_pos + false_neg)
  f1Score: number;           // 2 * (precision * recall) / (precision + recall)
  
  // Per-class metrics
  perClass: {
    positive: { precision: number; recall: number; f1: number };
    negative: { precision: number; recall: number; f1: number };
    neutral:  { precision: number; recall: number; f1: number };
  };
  
  // Confusion matrix
  confusionMatrix: [[number, number, number], [number, number, number], [number, number, number]];
  
  // Test data
  totalSamples: number;
  labeledByHuman: number;    // Human-verified labels
  
  // Pass/fail
  passThreshold: number;     // Minimum F1 to pass (default: 0.85)
  passed: boolean;
}
```

**Test Dataset Requirements:**
- Minimum 1,000 labeled mentions per language (ID + EN)
- Balance: 40% positive, 30% negative, 30% neutral
- Include: slang, typos, mixed language (Indo-English), emoji-only, very short ("> 3 words")
- Crisis scenarios: 100 samples of high-velocity negative mentions
- Regular re-labeling sprint setiap 3 bulan untuk maintain accuracy

---

## 19. Monitoring & Observability

### 19.1 Three Pillars of Observability

```
┌─────────────────────────────────────────────────┐
│                   OBSERVABILITY                   │
│                                                   │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────┐ │
│  │   METRICS    │ │     LOGS     │ │  TRACES  │ │
│  │  (Prometheus)│ │   (ELK)     │ │ (OpenTele│ │
│  │             │ │             │ │  metry)  │ │
│  │ - Request    │ │ - API logs   │ │ - Request│ │
│  │   rate       │ │ - Crawler    │ │   trace  │ │
│  │ - Latency    │ │   activity   │ │ - Queue  │ │
│  │ - Error rate │ │ - Errors &   │ │   flow   │ │
│  │ - Saturation │ │   crashes    │ │ - DB     │ │
│  │ - Queue size │ │ - Audit logs │ │   query  │ │
│  └──────────────┘ └──────────────┘ └──────────┘ │
└─────────────────────────────────────────────────┘
```

### 19.2 Key Metrics & Alerts

| Metric | Type | Warning Threshold | Critical Threshold | Dashboard |
|--------|:----:|:-----------------:|:------------------:|:---------:|
| **API p95 latency** | Histogram | > 500ms | > 2s | Grafana |
| **API error rate** | Counter | > 1% | > 5% | Grafana |
| **Queue depth (crawl)** | Gauge | > 1,000 | > 5,000 | Grafana |
| **NLP pipeline latency** | Histogram | > 10s per batch | > 30s per batch | Grafana |
| **Database connections** | Gauge | > 80% pool | > 95% pool | Grafana |
| **Redis memory usage** | Gauge | > 70% | > 85% | Grafana |
| **Elasticsearch health** | Gauge | Yellow status | Red status | Grafana |
| **LLM API cost/day** | Counter | > $50 | > $100 | Grafana + Billing |
| **Active WebSocket conns** | Gauge | > 5,000 | > 8,000 | Grafana |
| **Crawl success rate** | Gauge | < 95% | < 85% | Grafana |

### 19.3 Logging Strategy

```typescript
// Log levels
enum LogLevel {
  DEBUG   = 0,  // Development only, never in production
  INFO    = 1,  // Normal operations: user action, cron run
  WARN    = 2,  // Abnormal but handled: retry attempt, rate limit approaching
  ERROR   = 3,  // Functionality broken: API call failed, DB timeout
  FATAL   = 4,  // System crash: unable to recover, send immediate alert
}

// Structured log format
interface StructuredLog {
  timestamp: string;       // ISO 8601
  level: LogLevel;
  service: string;         // 'api' | 'crawler' | 'nlp' | 'ews' | 'websocket'
  traceId: string;         // OpenTelemetry trace ID
  spanId: string;
  userId?: string;
  tenantId?: string;
  message: string;
  metadata?: Record<string, unknown>;
  duration?: number;       // ms
  error?: {
    type: string;
    stack: string;
    context: Record<string, unknown>;
  };
}
```

### 19.4 Alert Routing

| Severity | Response Time | Channel | Example |
|----------|:-------------:|---------|---------|
| **P0 (Critical)** | < 5 minutes | Phone call + Slack + SMS + Email | Database down, LLM API unreachable, security breach |
| **P1 (High)** | < 15 minutes | Slack + Email + Push | API error rate > 5%, crawl queue stuck, high latency |
| **P2 (Medium)** | < 1 hour | Slack + Email | Error rate > 1%, single crawler failing, disk > 80% |
| **P3 (Low)** | < 24 hours | Email (digest) | Certificate expiring in 7 days, deprecated API version usage |

### 19.5 Tool Stack

| Tool | Function | Cost |
|------|----------|:----:|
| **Grafana** | Metrics visualization (dashboards + alerts) | Free (OSS) |
| **Prometheus** | Metrics collection & storage | Free (OSS) |
| **Grafana Loki** | Log aggregation | Free (OSS) |
| **OpenTelemetry** | Distributed tracing | Free (OSS) |
| **Sentry** | Error tracking & performance monitoring | $26/mo (Team plan) |
| **Better Stack / Checkly** | Uptime monitoring | $30/mo |
| **Health checks** | Custom `/api/health` endpoint | Free |

---

## 20. Error Handling Strategy

### 20.1 Standardized Error Response Format

```typescript
// All API errors follow this structure
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;            // e.g., 'BRAND_NOT_FOUND', 'QUOTA_EXCEEDED'
    message: string;         // User-friendly message in locale
    details?: string;        // Technical details (visible to admin only)
    validationErrors?: Array<{
      field: string;
      message: string;
      code: string;          // 'required' | 'invalid_format' | 'too_long' | etc
    }>;
    requestId: string;       // For tracing in logs
    timestamp: string;
  };
}

// HTTP Status Code Mapping
const ErrorHttpStatusMap = {
  // 4xx Client Errors
  'VALIDATION_ERROR': 400,
  'UNAUTHORIZED': 401,
  'FORBIDDEN': 403,
  'NOT_FOUND': 404,
  'CONFLICT': 409,           // Duplicate resource
  'QUOTA_EXCEEDED': 429,
  'RATE_LIMITED': 429,
  
  // 5xx Server Errors
  'INTERNAL_ERROR': 500,
  'UPSTREAM_ERROR': 502,     // e.g., LLM API failed
  'SERVICE_UNAVAILABLE': 503, // e.g., Database down, queue full
  'GATEWAY_TIMEOUT': 504,    // e.g., Crawler timeout
} as const;
```

### 20.2 Error Catalog per Modul

| Error Code | HTTP Status | Trigger | User Message | Resolution |
|------------|:-----------:|---------|-------------|------------|
| `BRAND_NOT_FOUND` | 404 | Invalid brand ID in request | "Brand not found" | Check URL/ID |
| `BRAND_LIMIT_REACHED` | 429 | Max brands for tier exceeded | "Please upgrade to add more brands" | Upgrade plan |
| `INVALID_COLOR_FORMAT` | 400 | Non-hex color value | "Color must be in #RRGGBB format" | Fix input format |
| `MENTION_NOT_FOUND` | 404 | Invalid mention ID | "Mention not found or deleted" | Refresh data |
| `NLP_PIPELINE_BUSY` | 503 | Pipeline at capacity | "Analysis pipeline is busy, retry in 30s" | Retry after delay |
| `CRISIS_CONFIG_INVALID` | 400 | Invalid threshold values | "Sentiment threshold must be 0-100" | Correct threshold |
| `QUOTA_MENTIONS_EXCEEDED` | 429 | Monthly mention limit hit | "Monthly mention quota exceeded" | Upgrade or wait |
| `API_KEY_EXPIRED` | 401 | Expired or revoked key | "API key has expired" | Generate new key |
| `UPLOAD_TOO_LARGE` | 413 | File > 10MB | "File exceeds maximum size of 10MB" | Compress image |
| `INVALID_FILE_TYPE` | 400 | Non-image upload to logo | "Only PNG, JPG, WebP are allowed" | Upload correct format |
| `STRIPE_WEBHOOK_FAILED` | 502 | Stripe webhook processing error | "Payment update failed, contact support" | Contact support |
| `RATE_LIMITED` | 429 | Request throttle | "Too many requests. Try again later" | Reduce request frequency |

### 20.3 Retry & Circuit Breaker Strategy

| Component | Max Retries | Backoff Strategy | Fallback |
|-----------|:-----------:|------------------|----------|
| **Crawler (API failure)** | 3 | Exponential (1s → 2s → 4s) | Fallback to scraping, then skip + log |
| **LLM API (timeout/429)** | 2 | Exponential with jitter (2s → 4s) | Queue for retry later, use cached result if available |
| **Database (deadlock)** | 3 | Immediate retry with random delay | Return 503, trigger DB health check |
| **WebSocket reconnect** | Unlimited | Exponential (1s → 2s → 4s → max 30s) | HTTP polling fallback every 30s |
| **Email delivery** | 3 | Linear (5min → 10min → 30min) | Log failure, retry on next cron |
| **Stripe webhook** | 5 | Exponential | Manual reconciliation if persistent failures |

### 20.4 Graceful Degradation

| Service Failure | System Behavior | User Experience |
|----------------|-----------------|-----------------|
| **Database unreachable** | Use Redis cache for reads; queue writes | Dashboard shows stale cached data with warning banner |
| **Redis down** | Disable caching, direct DB reads | Slightly slower page loads; real-time updates paused |
| **LLM API down** | Queue mentions for batch processing | "Analysis pending" badge on mentions; no AI features until restored |
| **Crawler offline** | Mark crawl jobs as failed; retry on next schedule | "Last updated X hours ago" timestamp; manual refresh button |
| **Elasticsearch down** | Fallback to PostgreSQL text search (LIKE/ILIKE) | Search slower but functional; exact matching only |
| **Auth provider down** | Extend existing session TTL; block new logins | Existing users stay logged in; login page shows "Service temporarily unavailable" |

---

## 21. SLA & Support Escalation

### 21.1 Service Level Agreement per Tier

| Metrik | Free | Pro | Enterprise |
|--------|:----:|:---:|:----------:|
| **Uptime guarantee** | Best effort | 99.5% | 99.95% |
| **API response time (p95)** | < 2s | < 1s | < 500ms |
| **Dashboard load time** | < 5s | < 3s | < 1.5s |
| **Crisis alert delivery** | N/A | < 5min | < 30s |
| **Data freshness (crawl)** | Every 24h | Every 1h | Real-time streaming |
| **Data retention** | 7 days | 1 year | Unlimited |
| **Export format** | CSV only | CSV + PDF + Excel | All formats (PDF/PPT/Excel) |
| **API rate limit** | 100 req/hour | 1,000 req/hour | Custom |
| **Monthly maintenance window** | Up to 4h | Up to 2h | < 30min (announced 2 weeks prior) |

### 21.2 Support Response Times

| Priority | Free | Pro | Enterprise |
|----------|:----:|:---:|:----------:|
| **Critical (P0)** — System down, data loss | N/A | < 2h (working hours) | < 30min (24/7) |
| **High (P1)** — Feature broken, major bug | N/A | < 8h (working hours) | < 2h (24/7) |
| **Medium (P2)** — Non-critical bug, UX issue | < 48h | < 24h | < 8h |
| **Low (P3)** — Feature request, question | Best effort | < 72h | < 24h |
| **Support channel** | Email only | Email + In-app chat | Email + Chat + Slack/Teams + Phone |
| **Dedicated account manager** | ❌ | ❌ | ✅ |

### 21.3 Support Escalation Flow

```
User reports issue via channel (email/chat/Slack)
        │
        ▼
┌────────────────────────────┐
│  L1: AI Chatbot (24/7)      │  ← Auto-resolve FAQs (password reset, how-to, quota)
│  Resolution target: < 5min  │
│  Coverage: ~80% of tickets  │
└────────┬───────────────────┘
         │ Unresolved
         ▼
┌────────────────────────────┐
│  L2: Technical Support      │  ← Human agent (business hours or 24/7 for Enterprise)
│  Resolution target: < 4h    │
│  Coverage: ~15% of tickets  │
└────────┬───────────────────┘
         │ Complex/engineering issue
         ▼
┌────────────────────────────┐
│  L3: Engineering Team       │  ← Bug fix, feature request, infrastructure issue
│  Resolution target: < 24h   │
│  Coverage: ~5% of tickets   │
└────────┬───────────────────┘
         │
         ▼
┌────────────────────────────┐
│  L4: Post-mortem            │  ← Root cause analysis, prevention plan
│  Resolution target: < 72h   │
│  For P0/P1 only             │
└────────────────────────────┘
```

### 21.4 Service Credit & Penalty Policy

#### 21.4.1 Service Credit Calculation

| Tier | Monthly Uptime | Credit Amount | Conditions |
|------|:--------------:|:-------------:|------------|
| **Pro** | < 99.9% but ≥ 99.0% | 5% of monthly fee | Request within 30 days of incident |
| | < 99.0% but ≥ 95.0% | 10% of monthly fee | Max credit = 30% of monthly fee |
| | < 95.0% | 25% of monthly fee | Max credit = 100% of monthly fee |
| **Enterprise** | < 99.95% but ≥ 99.0% | 5% of monthly fee | Custom SLA contract terms apply |
| | < 99.0% but ≥ 95.0% | 15% of monthly fee | Includes dedicated account manager |
| | < 95.0% | 30% of monthly fee | May include penalty termination clause |
| **Free** | No SLA guarantee | N/A | Best-effort only — no credits |

#### 21.4.2 Exclusions (Not Eligible for Credits)

- Scheduled maintenance (notified ≥ 48 hours in advance)
- Force majeure events (natural disasters, war, terrorism)
- Third-party API downtime (OpenAI, Twitter, Instagram, etc.)
- User-caused outages (misconfiguration, exceeding rate limits)
- Beta/preview features explicitly labeled as such

#### 21.4.3 Maintenance Window Policy

| Type | Frequency | Duration | Notice Period | Impact |
|------|:---------:|:--------:|:-------------:|--------|
| **Standard** | Monthly | 2 hours (02:00-04:00 WIB) | 48 hours | Minor API latency increase |
| **Critical Patch** | As needed | Variable | 4 hours (emergency) | Possible brief downtime |
| **Infrastructure** | Quarterly | 4 hours | 1 week (calendar published) | Dashboard may be unavailable |
| **Database** | Bi-annually | 1 hour | 2 weeks | Read-only mode during migration |

#### 21.4.4 SLA Reporting

- **Real-time status page:** status.sentiment.ai (third-party: Better Uptime / Statuspage)
- **Monthly SLA report:** Auto-generated and emailed to Enterprise contacts
- **Incident post-mortem:** Published within 5 business days for P1 incidents
- **Uptime calculation:** Excludes planned maintenance windows

---

## 22. Analytics & Product Telemetry

### 22.1 What We Track

```typescript
interface ProductEvent {
  eventName: string;              // e.g., 'user.login', 'brand.created', 'crisis.alert.viewed'
  userId: string;
  tenantId: string;
  sessionId: string;
  timestamp: string;
  properties: {
    // Standard
    page?: string;                // Current page path
    feature?: string;             // Feature name
    duration?: number;            // Time spent (ms)
    
    // Event-specific
    brandId?: string;
    plan?: SubscriptionPlan;
    errorCode?: string;
    [key: string]: unknown;
  };
}
```

**Categories:**

| Category | Events | Purpose |
|----------|--------|---------|
| **Engagement** | Page views, feature usage, session duration, time-on-page | Measure adoption of each module |
| **Acquisition** | Signup source, referral code, conversion funnel | Optimize onboarding flow |
| **Retention** | DAU/MAU, returning visits, feature stickiness | Identify churn risk |
| **Performance** | Page load, API latency, render time (Real User Monitoring) | Identify UI bottlenecks |
| **Business** | Tier upgrade/downgrade, report exports, crisis events | Revenue attribution |
| **Error** | API errors, UI crashes, failed crawls | Proactive bug detection |

### 22.2 Metrics Dashboard (Internal)

| Metric | Description | Target |
|--------|-------------|:------:|
| **DAU/MAU** | Daily and Monthly Active Users | MAU growth >10% MoM |
| **Feature Adoption Rate** | % users who used each module within 7 days of signup | >60% for Brand DNA, >30% for Tone Checker |
| **Time-to-Value** | Time from signup to first dashboard view with insights | < 15 minutes |
| **NPS-like Score** | In-app survey: "How likely to recommend?" 1-10 | > 40 (Good) |
| **Churn Rate** | Monthly subscription cancellation rate | < 5% |
| **Crisis Detection Rate** | % crises detected before manual report | > 85% |
| **Sentiment Accuracy** | F1 score of sentiment analysis vs human labels | > 0.85 |

### 22.3 Privacy & Consent

- **Opt-in by default**: No tracking until user accepts cookie/analytics consent
- **Anonymous by design**: Events tagged with session ID not PII
- **Data retention**: Raw events deleted after 90 days; aggregated forever
- **GDPR compliance**: User can request export/deletion of their analytics data
- **Tool**: PostHog (self-hosted) or Plausible (privacy-first) — bukan Google Analytics

---

## 23. Localization & i18n

### 23.1 Locale Support Strategy

| Locale | Priority | Script | RTL | Launch Phase |
|--------|:--------:|:------:|:---:|:------------:|
| `id-ID` (Indonesia) | P0 | Latin | No | Phase 1 (MVP) |
| `en-US` (English US) | P0 | Latin | No | Phase 1 (MVP) |
| `ms-MY` (Malaysia) | P1 | Latin | No | Phase 3 |
| `th-TH` (Thailand) | P2 | Thai | No | Phase 4 |
| `vi-VN` (Vietnam) | P2 | Latin | No | Phase 4 |
| `zh-CN` (Chinese Simplified) | P3 | Han | No | Phase 5 |
| `ar-SA` (Arabic) | P3 | Arabic | Yes | Phase 5 |

### 23.2 Implementation

```typescript
// i18n configuration
const i18nConfig = {
  defaultLocale: 'id-ID',
  locales: ['id-ID', 'en-US'],
  detection: {
    // Priority: 1. URL path, 2. Cookie, 3. Accept-Language header, 4. Browser, 5. Default
    order: ['path', 'cookie', 'acceptLanguage', 'browser'],
    cookieName: 'NEXT_LOCALE',
  },
} as const;

// Translation keys structure
// /messages/{locale}/{namespace}.json
// e.g., /messages/id-ID/common.json
// {
//   "brand.dna.title": "Setup Brand DNA",
//   "sentiment.positive": "Positif",
//   "error.notFound": "Data tidak ditemukan"
// }
```

**Requirements:**
- **Library**: next-intl (built for Next.js App Router)
- **ICU MessageFormat** for plurals, gender, choices
- **Namespace splitting**: common.json, brand.json, sentiment.json, crisis.json, dashboard.json, admin.json, errors.json
- **RTL support**: Tailwind RTL variants (`rtl:` prefix) for Arabic
- **Date/number formatting**: Use `Intl.DateTimeFormat` and `Intl.NumberFormat`
- **Number localization**: `1,234.56` → English, `1.234,56` → Indonesian

### 23.3 Content Localization Requirements

| Element | Action Required |
|---------|----------------|
| UI text (buttons, labels, menus) | Translate all via message files |
| Error messages | Translate with locale-specific format |
| AI-generated content | LLM prompt includes target language |
| Dates & times | Format based on locale (dd/MM/yyyy vs MM/dd/yyyy) |
| Currencies | Format with locale symbol ($1,234 vs Rp 1.234) |
| Reports (PDF/PPT) | Template with locale-aware text |
| Email templates | Separate templates per locale |
| Numbers (thousands sep) | Locale-aware formatting |
| Search indexing | Locale-aware stemmer (elasticsearch analysis) |

---

## 24. Database Migration Strategy

### 24.1 Migration Principles

```
┌─────────────────────────────────────────────────────────────────┐
│                    ZERO-DOWNTIME MIGRATION                        │
│                                                                   │
│  1. Expand (add new column/table)                                 │
│     → Old code still works (nullable/default)                     │
│                                                                   │
│  2. Migrate (backfill data)                                       │
│     → Batch update in background (no lock)                        │
│                                                                   │
│  3. Deploy new code (uses new schema)                             │
│     → Separate deploy from migration                              │
│                                                                   │
│  4. Contract (remove old column/table)                            │
│     → Only after confirming no rollback needed (>1 week)          │
└─────────────────────────────────────────────────────────────────┘
```

### 24.2 Migration Types & Strategies

| Migration Type | Strategy | Lock Required? | Rollback Plan |
|----------------|----------|:--------------:|---------------|
| **New table** | Simple CREATE TABLE | No | DROP TABLE |
| **New column (nullable)** | ALTER TABLE ADD COLUMN | No | DROP COLUMN |
| **New column (NOT NULL)** | 1. Add nullable → 2. Backfill → 3. ALTER SET NOT NULL | No | DROP COLUMN |
| **Rename column** | 1. Add new column → 2. Dual-write → 3. Backfill → 4. Deploy code → 5. Drop old | No | Restore old code + re-dual-write |
| **Rename table** | 1. Create new table → 2. Dual-write (trigger) → 3. Migrate data → 4. Deploy → 5. Drop old | No | Point to old table |
| **Add index** | CONCURRENTLY (PostgreSQL) | No (CONCURRENTLY) | DROP INDEX |
| **Drop column** | Deferred 1+ week after no rollback | No | Re-add + backfill |
| **Data type change** | 1. Add new column with new type → 2. Backfill with conversion → 3. Deploy → 4. Drop old | No | Restore old column |

### 24.3 Prisma Migration Workflow

```bash
# Development
npx prisma migrate dev --name add_brand_personality

# Staging (test migration safety)
npx prisma migrate deploy

# Production
npx prisma migrate deploy --create-only  # Generate SQL
# Manual review of generated migration SQL
# Run migration (preferably during low traffic)
npx prisma migrate deploy

# If rollback needed:
npx prisma migrate resolve --rolled-back <migration_name>
# Manual revert via SQL
```

### 24.4 Data Seeding Strategy

```typescript
// prisma/seed.ts
async function seed() {
  // 1. Create demo tenant
  const tenant = await prisma.tenant.create({ data: { name: 'Demo Corp', slug: 'demo' } });
  
  // 2. Create admin user
  const admin = await prisma.user.create({
    data: { email: 'admin@sentiment.ai', name: 'Admin', role: 'SUPER_ADMIN', tenantId: tenant.id }
  });
  
  // 3. Create demo brand with full profile
  const brand = await prisma.brand.create({ ... });
  
  // 4. Create tone matrix
  await prisma.toneMatrix.create({ ... });
  
  // 5. Seed sample mentions (for testing dashboard)
  await seedSampleMentions(brand.id, 200);
  
  // 6. Create competitors
  await prisma.competitor.createMany({ data: competitorData });
}
```

### 24.5 Backup & Restore

| Backup Type | Frequency | Retention | Storage | RPO |
|-------------|:---------:|:---------:|:-------:|:---:|
| Full backup | Daily (02:00 UTC) | 30 days | S3/R2 | 24h |
| WAL archival | Continuous | 7 days | S3/R2 | 5 min |
| Logical dump | Weekly | 3 months | S3/R2 + Cold storage | 1 week |
| Pre-migration snapshot | On migration | Until migration validated | S3/R2 | N/A |

---

## 25. Compliance Detail

### 25.1 Regulatory Framework

| Regulation | Jurisdiction | Applicability | Key Requirements |
|------------|:------------:|:-------------:|------------------|
| **UU PDP (UU No. 27/2022)** | Indonesia | Wajib untuk semua pengguna Indonesia | Persetujuan eksplisit, batas waktu penyimpanan data, hak hapus data, denda administratif |
| **GDPR** | European Union | Jika ada user dari EU | Data deletion on request, data portability, 72h breach notification, DPO appointment |
| **UU ITE (UU No. 11/2008)** | Indonesia | Wajib untuk platform dengan konten publik | Moderasi konten, pelaporan konten ilegal, identitas user valid |
| **CCPA** | California, USA | Jika ada user dari California | Opt-out data selling, disclosure of data collection, deletion rights |
| **PCI-DSS** | Global | Hanya jika store kartu kredit (Stripe handles this) | N/A — Stripe adalah PCI-DSS compliant Level 1 |

### 25.2 Data Classification

| Classification | Examples | Storage Requirements | Access Control |
|:--------------:|----------|:--------------------:|:---------------:|
| **Public** | Brand name, industry, widget layout | No encryption needed | All users (read) |
| **Internal** | Mention text (aggregated), sentiment trends | Encryption at rest | All authenticated users |
| **Confidential** | Raw mention text with author info, competitor data | Encryption at rest + field-level encryption for PII | Analyst+ (need-to-know) |
| **Restricted** | User credentials, API keys, payment records | Encryption at rest + transit, hashed secrets | Super Admin only |
| **PII** | Email, name, IP address, location | Encryption at rest + field-level encryption | Limited to authorized services |

### 25.3 Data Processing Register

```typescript
// Required for UU PDP / GDPR compliance
interface DataProcessingActivity {
  id: string;
  purpose: string;              // e.g., 'Sentiment analysis', 'Crisis monitoring'
  dataCategories: string[];     // e.g., ['Mention text', 'Author username', 'IP']
  dataSubjects: string[];       // e.g., ['Social media users', 'Brand customers']
  legalBasis: string;           // e.g., 'Legitimate interest', 'Consent'
  retentionPeriod: string;      // e.g., '1 year after account termination'
  thirdPartyProcessors: Array<{ name: string; purpose: string; dataShared: string[] }>;
  securityMeasures: string[];   // e.g., ['Encryption at rest', 'Access logging']
  automatedDecisionMaking: boolean;  // Apakah ada keputusan otomatis? (YA — crisis alerts)
  dataTransferOutsideCountry: boolean;
  dpiaRequired: boolean;        // Data Protection Impact Assessment
}
```

### 25.4 User Rights Fulfillment

| Right | UU PDP | GDPR | Implementation |
|-------|:------:|:----:|----------------|
| **Right to be informed** | ✅ | ✅ | Privacy policy, data processing notice at signup |
| **Right of access** | ✅ | ✅ | Data download endpoint (`/api/user/data`) |
| **Right to rectification** | ✅ | ✅ | Profile edit, brand DNA edit |
| **Right to erasure** | ✅ | ✅ | Account deletion → cascade delete all data within 30 days |
| **Right to restrict processing** | ✅ | ✅ | Pause social listening processing (toggle in settings) |
| **Right to data portability** | ❌ | ✅ | Export all data as JSON/CSV |
| **Right to object** | ✅ | ✅ | Opt-out of AI analytics, opt-out of data sharing |
| **Automated decision opt-out** | ❌ | ✅ | Manual override for crisis alerts, human review option |

### 25.5 Consent Management

```typescript
interface ConsentRecord {
  userId: string;
  consentType: 'analytics' | 'data_processing' | 'marketing_email' | 'third_party_sharing';
  granted: boolean;
  grantedAt: DateTime;
  revokedAt?: DateTime;
  ipAddress: string;
  userAgent: string;
  version: string;           // Version of privacy policy at time of consent
}
```

### 25.6 Breach Notification Procedure

```
Security breach detected
        │
        ▼
1. Isolate affected system (1h)
2. Identify scope & impacted data (2h)
3. Contain & patch vulnerability (4h)
4. Notify compliance officer (immediately)
5. Notify affected tenant (within 72h for UU PDP/GDPR)
   ├── Include: nature of breach, data affected, mitigation steps, contact person
6. Notify regulatory authority (if required)
7. Post-mortem & prevention plan (within 1 week)
```

---

## 26. Frontend Design System

### 26.1 Design Tokens

```typescript
// tailwind.config.ts — Extended theme
const designTokens = {
  colors: {
    // Brand health indicators
    'sentiment-positive': '#22C55E',
    'sentiment-neutral': '#6B7280',
    'sentiment-negative': '#EF4444',
    'crisis-critical': '#DC2626',
    'crisis-high': '#F97316',
    'crisis-medium': '#EAB308',
    'crisis-low': '#6B7280',
    
    // Platform colors
    'platform-twitter': '#1DA1F2',
    'platform-instagram': '#E4405F',
    'platform-tiktok': '#000000',
    'platform-facebook': '#1877F2',
    'platform-google': '#4285F4',
    'platform-news': '#6B7280',
  },
  spacing: {
    'widget-sm': '280px',
    'widget-md': '360px',
    'widget-lg': '480px',
    'sidebar': '280px',
  },
  animation: {
    'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    'slide-in-right': 'slideInRight 0.3s ease-out',
    'fade-in': 'fadeIn 0.2s ease-in',
    'gauge-fill': 'gaugeFill 1.5s ease-out forwards',
  },
  boxShadow: {
    'widget': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    'widget-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    'crisis-banner': '0 0 20px rgb(220 38 38 / 0.3)',
  },
};
```

### 26.2 Component Architecture

```
┌──────────────────────────────────────────────────────────┐
│                  ATOMIC DESIGN SYSTEM                      │
│                                                           │
│  ATOMS (Shadcn/ui + custom)                               │
│  ┌─────────┐ ┌──────────┐ ┌────────┐ ┌───────────────┐ │
│  │ Button  │ │  Input   │ │ Badge  │ │ SentimentIcon │ │
│  └─────────┘ └──────────┘ └────────┘ └───────────────┘ │
│                                                           │
│  MOLECULES                                                │
│  ┌────────────────┐ ┌────────────────┐ ┌──────────────┐ │
│  │  SearchBar     │ │  MentionCard   │ │  MetricWidget│ │
│  └────────────────┘ └────────────────┘ └──────────────┘ │
│                                                           │
│  ORGANISMS                                                │
│  ┌────────────────────────┐ ┌────────────────────────┐   │
│  │  DashboardWidgetGrid   │ │  CompetitorMatrixTable │   │
│  └────────────────────────┘ └────────────────────────┘   │
│                                                           │
│  TEMPLATES                                                │
│  ┌──────────────────────────┐                             │
│  │  DashboardLayout         │  ← sidebar + navbar + main│
│  └──────────────────────────┘                             │
│                                                           │
│  PAGES                                                    │
│  ┌───────────┐ ┌─────────────┐ ┌────────────┐           │
│  │ BrandPage │ │ Sentiment   │ │ CrisisPage │           │
│  │           │ │ LivePage    │ │            │           │
│  └───────────┘ └─────────────┘ └────────────┘           │
└──────────────────────────────────────────────────────────┘
```

### 26.3 Accessibility Standards

| Standard | Target | WCAG Level | Implementation |
|----------|:------:|:----------:|----------------|
| Color contrast | 4.5:1 (normal text), 3:1 (large text) | AA minimum | Use contrast-checking in design tokens |
| Keyboard navigation | All interactive elements reachable via Tab | A | Focus ring visible, logical tab order |
| Screen reader | Proper aria-labels, role attributes | A | React ARIA via Shadcn/ui components |
| Motion reduction | Respect `prefers-reduced-motion` | AAA | Reduce animations, no parallax |
| Text scaling | Up to 200% without breaking layout | AA | Use rem/em units, not px |
| Error identification | Errors announced by screen reader | A | `aria-describedby` on form fields |

### 26.4 Loading & Empty States

| State | Visual | Behavior |
|-------|--------|----------|
| **Loading (initial)** | Skeleton screens (Shadcn Skeleton) per widget shape | No spinner, pulse animation matching content layout |
| **Loading (refresh)** | Subtle shimmer overlay on widget | Data stays visible during refresh |
| **Empty (no data yet)** | Illustration + CTA: "Add your first keyword to start monitoring" | Actionable guidance, not blank page |
| **Empty (no results)** | "No mentions matching your filter" + reset filter button | Quick way to clear filters |
| **Error** | Toast notification + inline error state | "Unable to load data. [Retry]" — never show raw error |
| **Partially loaded** | Working widgets show data, failed widgets show error state | Other widgets unaffected |
| **Rate limited** | Cooldown indicator: "Updating in 30s..." | Auto-retry with countdown |

---

## 27. Data Retention & Archival

### 27.1 Retention Policy per Data Type

| Data Type | Free Tier | Pro Tier | Enterprise | Final Disposition |
|-----------|:---------:|:--------:|:----------:|-------------------|
| Raw mention content | 7 days | 1 year | Unlimited (or custom) | Hard delete or archive |
| Enriched mention (AI-processed) | 30 days | 2 years | Unlimited | Archive to cold storage |
| Sentiment analytics (aggregated) | Forever | Forever | Forever | Retain (de-identified) |
| Brand configuration | Until account deletion | Until account deletion | Until account deletion | Delete with account |
| User data (PII) | Until account deletion | Until account deletion | Until account deletion | Delete within 30 days |
| Audit logs | 90 days | 1 year | 3 years | Archive, then hard delete |
| Media files (images) | 7 days | 6 months | 1 year | Delete from hot storage, cold archive optional |
| API keys | Until revoked | Until revoked | Until revoked | Revoke + hash retained for 30 days |
| Invoices | 5 years (tax requirement) | 5 years | 5 years | Retain in cold storage |
| Analytics telemetry | 90 days | 90 days | 90 days | Delete (aggregated only retained) |

### 27.2 Archival Pipeline

```
┌────────────────┐     ┌─────────────────┐     ┌────────────────────┐
│ PostgreSQL      │────▶│ Archival Worker  │────▶│ Cold Storage (S3/  │
│ (hot storage)   │     │ (cron: daily)   │     │ Glacier / R2)      │
└────────────────┘     │                 │     └────────────────────┘
                        │ 1. Select data   │
                        │    older than    │     ┌────────────────────┐
                        │    retention     │────▶│ Compressed JSON    │
                        │ 2. Compress      │     │ + Metadata index   │
                        │ 3. Upload        │     └────────────────────┘
                        │ 4. Delete from   │
                        │    hot storage   │     ┌────────────────────┐
                        │ 5. Log archival  │────▶│ Audit trail        │
                        └─────────────────┘     └────────────────────┘
```

### 27.3 Account Deletion Procedure

```
User requests account deletion
        │
        ▼
1. Send confirmation email + warning about data loss
2. Immediate: Soft-delete (disable login, mark account as deleted_at)
3. Within 24h: Revoke all API keys, clear sessions
4. Within 7 days: Queue deletion of user data
5. Within 30 days: Hard delete from database
   ├── Exceptions: Invoices (retained 5 years), aggregated analytics (de-identified)
6. Confirmation email sent
```

---

## 28. Performance Budget

### 28.1 Core Web Vitals Targets

| Metric | Target | Measurement |
|--------|:------:|:-----------:|
| **LCP (Largest Contentful Paint)** | < 2.0s | Time to render main content |
| **FID (First Input Delay)** | < 100ms | Time to respond to first interaction |
| **CLS (Cumulative Layout Shift)** | < 0.1 | Visual stability during load |
| **INP (Interaction to Next Paint)** | < 200ms | Overall responsiveness |
| **TTFB (Time to First Byte)** | < 500ms | Server response time |
| **FCP (First Contentful Paint)** | < 1.5s | First visual element |

### 28.2 Page-Specific Budgets

| Page | JS Bundle (gzip) | API Calls | Render Time | Static Data | Dynamic Data |
|------|:----------------:|:---------:|:-----------:|:-----------:|:------------:|
| Login/Register | < 100KB | 1-2 | < 1.5s | N/A | N/A |
| Executive Dashboard | < 200KB | 5-8 | < 2s | Widget layout | Real-time metrics via WebSocket |
| Brand Setup Wizard | < 150KB | 3-5 | < 2s | Steps config | Brand list |
| Sentiment Live Feed | < 180KB | Infinite scroll | < 1.5s per batch | Filter config | Mention stream via WebSocket |
| Crisis Dashboard | < 160KB | 3-5 | < 1.5s | Alert config | Crisis data + timeline |
| Tone Checker | < 120KB | 1 | < 2s | Brand tone matrix | AI response |
| Geospatial Map | < 300KB (map lib) | 1-2 | < 3s (map load) | Bounds config | Region-aggregated data |
| Report Export | < 100KB | 1 | < 1s (trigger), < 60s (generation) | Report templates | Export data |
| Admin Panel | < 150KB | 3-5 | < 2s | Table columns | User/subscription data |

### 28.3 Optimization Strategies

| Strategy | Implementation | Impact |
|----------|----------------|:------:|
| **Server Components** | Maximize use of React Server Components for data fetching | -70% JS shipped |
| **Streaming SSR** | Suspense boundaries for slow data fetching | -40% TTFB perceived |
| **Route prefetch** | Next.js Link prefetch for adjacent pages | -50% navigation latency |
| **Image optimization** | next/image with WebP, lazy loading, blur placeholder | -60% image bytes |
| **Code splitting** | Dynamic imports for heavy libraries (Mapbox, charts) | -40% initial bundle |
| **Pagination** | Infinite scroll with Intersection Observer for feeds | -90% initial data |
| **Debouncing** | Debounce search/filter inputs (300ms) | -80% unnecessary API calls |
| **Bundle analysis** | `@next/bundle-analyzer` in CI — fail if bundle exceeds budget | Prevents regression |
| **CDN caching** | Cache static assets, API responses (with tags for invalidation) | -90% origin load |
| **Redis caching** | Cache API responses with 5-60s TTL depending on endpoint | -80% DB load |

### 28.4 Performance Testing in CI

```yaml
# .github/workflows/performance.yml
name: Performance Budget Check
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000/dashboard
            http://localhost:3000/sentiment
            http://localhost:3000/brand/setup
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true
```

> **Catatan**: Lihat [Appendix A — Performance Targets](#a-performance-targets) untuk ringkasan target performa per metrik (dashboard load, API response, NLP processing). Section ini memberikan detail implementasi dan strategi optimasi.

---

## 29. Disaster Recovery Plan

### 29.1 Disaster Scenarios

| Scenario | Detection Method | RTO | RPO | Recovery Procedure |
|----------|-----------------|:---:|:---:|-------------------|
| **Single instance failure** | Health check (10s interval) | 30s | 0 | Kubernetes auto-restart; load balancer routes to other instances |
| **Database corruption** | Monitoring alert + automated integrity check | 4h | 15min | 1. Stop app → 2. Failover to read replica → 3. Restore from WAL → 4. Validate → 5. Promote replica |
| **Full database loss** | Monitoring alert + failed health check | 8h | 1h | 1. Provision new DB from snapshot → 2. Replay WAL → 3. Point DNS → 4. Validate data |
| **Region outage (cloud)** | Uptime monitoring + manual check | 8h | 1h | 1. Activate passive standby in other region → 2. Update DNS → 3. Validate system |
| **Crypto/ransomware attack** | Alert + abnormal file change detection | 4h | 24h | 1. Isolate system → 2. Restore from clean backup → 3. Rotate credentials → 4. Forensics |
| **DDoS attack** | Traffic anomaly + CDN monitoring | 1h | 0 | 1. Enable DDoS protection (Cloudflare) → 2. Rate-limit edges → 3. Block malicious IPs |
| **Third-party API outage** (LLM/Stripe/Twilio) | Monitoring alert + API health check | 30min | 0 | 1. Enable circuit breaker → 2. Switch to fallback/cached mode → 3. Monitor for recovery |

### 29.2 Backup Verification Schedule

| Test | Frequency | Procedure | Success Criteria |
|------|:---------:|-----------|:----------------:|
| Database restore test | Monthly | Restore latest backup to test environment | All tables intact, data count matches |
| WAL replay test | Bi-weekly | Replay WAL from point-in-time to fresh DB | Zero data loss from test window |
| Full DR drill | Quarterly | Simulate region outage, failover to standby | Full system functional within RTO |
| Integrity check | Daily | `pg_amcheck` on all tables | Zero corruption errors |
| Backup file validation | Weekly | Check backup size, checksum, and metadata | Size within expected range, checksum matches |

### 29.3 Disaster Recovery Runbook

```bash
# ============================================
# DR RUNBOOK: Database Corruption
# ============================================

# Step 1: Assess damage
pg_amcheck -d sentiment_production

# Step 2: Stop application to prevent further writes
kubectl scale deployment sentiment-app --replicas=0

# Step 3: Failover to read replica
# Promote replica to primary
psql -h replica-host -c "SELECT pg_promote();"

# Step 4: Update connection string
export DATABASE_URL="postgresql://user:pass@new-primary:5432/sentiment"

# Step 5: Validate data integrity
pg_amcheck -d sentiment_production

# Step 6: Restart application
kubectl scale deployment sentiment-app --replicas=3

# Step 7: Notify affected users via system banner

# Step 8: Post-mortem
# - Root cause analysis within 24h
# - Implement prevention measure
# - Update runbook if needed
```

### 29.4 Disaster Recovery Team Roster

| Role | Name/Position | Primary Contact | Backup Contact | Responsibilities |
|------|:------------:|:---------------:|:--------------:|------------------|
| **DR Coordinator** | CTO / Engineering Director | Phone + WhatsApp | VP Engineering | Declares disaster, coordinates response, approves DR activation |
| **Infrastructure Lead** | DevOps Lead | Phone + Slack | SRE Engineer | Executes infrastructure failover, DNS changes, Kubernetes cluster management |
| **Database Lead** | DBA / Backend Lead | Phone + Slack | Senior Backend | Database restore, WAL replay, data integrity verification |
| **Application Lead** | Tech Lead | Phone + Slack | Senior Developer | Application restart, feature flag evaluation, hotfix deployment |
| **Communications Lead** | Product Manager | Phone + Email | CEO | Customer comms, status page updates, stakeholder reporting |
| **Security Lead** | CISO (external/consultant) | Phone + Encrypted channel | CTO | Security assessment post-restore, breach investigation if applicable |
| **QA Lead** | QA Engineer | Slack + Phone | Test Engineer | Smoke test after recovery, verify data integrity |

#### 29.4.1 DR Activation Criteria

| Severity | Definition | Response Time | DR Activation |
|:--------:|-----------|:-------------:|:-------------:|
| **P1 - Critical** | Complete service outage, data loss, security breach | < 15 min | Automatic DR activation |
| **P2 - High** | Significant degradation, partial outage | < 30 min | DR Coordinator decision |
| **P3 - Medium** | Minor degradation, single feature down | < 1 hour | No DR — standard incident response |
| **P4 - Low** | Cosmetic issues, non-critical bugs | < 4 hours | Normal bug tracking |

#### 29.4.2 DR Test Schedule

| Test Type | Frequency | Scope | Success Criteria | Participants |
|-----------|:---------:|-------|:----------------:|-------------|
| **Tabletop Exercise** | Quarterly | Walk through DR plan step-by-step | All roles understand their responsibilities | All DR team members |
| **Database Restore** | Monthly | Restore from latest backup to staging | RTO < 4h, RPO < 15min, data integrity 100% | DBA + DevOps Lead |
| **Full Failover** | Bi-annually | Complete failover to DR region | RTO < 2h, RPO < 15min, automated DNS switch | Full DR team + external observers |
| **Chaos Engineering** | Annually | Inject failures (node kill, network partition) | System self-heals within SLA limits | Infrastructure + SRE team |

#### 29.4.3 Post-DR Checklist

After every DR activation or drill:

- [ ] DR report documented within 24 hours
- [ ] Root cause analysis (RCA) completed within 5 business days
- [ ] Action items created in project management system
- [ ] Runbook updated with lessons learned
- [ ] DR test results reviewed with engineering team
- [ ] Customer impact summary prepared for Comms Lead
- [ ] SLA credit eligibility evaluated

### 29.5 Communication Tree

```
flowchart TD
    A[Monitoring Alert / User Report] --> B{Severity?}
    B -->|P1| C[On-Call Engineer Respond < 5 min]
    B -->|P2| C
    B -->|P3/P4| D[Standard Incident Queue Respond < 1 hour]
    C --> E{Can resolve in < 30 min?}
    E -->|Yes| F[Resolve & Document]
    E -->|No| G[Escalate to DR Coordinator]
    G --> H[DR Coordinator Assess & Declare Disaster]
    H --> I[Activate DR Team Via PagerDuty / WhatsApp Group]
    I --> J[Infrastructure Lead Execute failover]
    I --> K[Database Lead Restore data]
    I --> L[Communications Lead Update stakeholders]
    I --> M[Application Lead Verify app health]
    J & K & L & M --> N{DR Successful?}
    N -->|Yes| O[Switch traffic to DR site, QA smoke test, Declare all clear]
    N -->|No| P[Escalate to Engineering Director, Consider vendor escalation]
    O --> Q[Post-mortem within 24h]
    P --> Q
```

**Communication Channels (Priority Order):**
1. **PagerDuty** — Automated alerting (P1/P2)
2. **WhatsApp Emergency Group** — DR team communication
3. **Slack #incident channel** — Status updates + coordination
4. **Email** — Formal notifications + post-mortem documentation
5. **Phone call** — If no response within 5 minutes of alert

**External Communication Timeline:**
| Time Elapsed | Action | Channel |
|:------------:|--------|---------|
| < 5 min | Internal alert acknowledged | PagerDuty |
| < 15 min | DR team assembled | WhatsApp group |
| < 30 min | Status page updated | status.sentiment.ai |
| < 1 hour | Customer notification (Enterprise) | Email + Dashboard banner |
| < 2 hours | Customer notification (Pro) | Email |
| < 4 hours | Public incident report published | status.sentiment.ai |
| < 24 hours | Post-mortem published | Email + Blog |

---

## 30. Third-Party Vendor Assessment

### 30.1 Vendor Evaluation Matrix

| Vendor | Service | Dependency | Cost/Month | Alternative | Single Point of Failure? | Exit Strategy |
|--------|---------|:----------:|:----------:|-------------|:------------------------:|---------------|
| **OpenAI** | LLM (sentiment, tone, generation) | **Critical** | $50-$2,000+ | Anthropic Claude, self-hosted Mistral/Llama | Yes (50%) — fallback to Anthropic | Migration script untuk swap prompt format; abstract via NLPService interface |
| **Stripe** | Payment processing + subscription | **Critical** | 2.9% + $0.30/transaction | Lemon Squeezy, Midtrans (local) | Yes (70%) — payment critical path | Eventual consistency; maintain local subscription state as source of truth |
| **Twilio** | WhatsApp notifications | High | $0.005/message | WhatsApp Cloud API (direct), Telegram bot | No — fallback to email | Abstract notification channel; multi-provider support |
| **SendGrid** | Email (transactional + marketing) | High | $15-$90 | Resend, Mailgun, SES | No — multiple email providers | SMTP abstraction layer |
| **Mapbox** | Geospatial maps | Medium | $200 | Leaflet.js (free), Google Maps | No — leaflet.js is free fallback | Map component renders both; config-driven provider selection |
| **Cloudflare R2** | Object storage | Medium | $0.015/GB | AWS S3, MinIO (self-hosted) | No — S3-compatible API | S3 API abstraction; multi-region sync |
| **Elasticsearch** | Full-text search | Medium | $300-$800 | Meilisearch, Typesense, PostgreSQL FTS | No — PostgreSQL FTS as fallback | Abstract search layer; index both ES and PG for transitional period |
| **Redis** | Cache + Queue + Session | **Critical** | $15-$200 | Dragonfly, KeyDB, Self-hosted | Yes (40%) — can degrade to in-memory | Deployed as cluster; persistent storage enabled |
| **Vercel/Railway** | Hosting (Compute) | High | $50-$500 | AWS ECS, Fly.io, Self-hosted K8s | No — containerized, portable | Docker images; Kubernetes manifests ready for migration |
| **PostHog** | Product analytics | Low | $0 (self-host) | Plausible, Matomo, Amplitude | No — can run without analytics | Feature-flag wrapped; zero impact on core functionality |

### 30.2 Vendor Risk Scoring

```typescript
interface VendorRiskScore {
  vendor: string;
  criticality: 'low' | 'medium' | 'high' | 'critical';
  
  // Risk factors (1-5, 5 = highest risk)
  availabilityRisk: 1 | 2 | 3 | 4 | 5;   // How likely is outage?
  costRisk: 1 | 2 | 3 | 4 | 5;            // Price increase risk
  lockInRisk: 1 | 2 | 3 | 4 | 5;          // Migration difficulty
  securityRisk: 1 | 2 | 3 | 4 | 5;        // Data breach potential
  complianceRisk: 1 | 2 | 3 | 4 | 5;      // Regulatory compliance
  
  // Overall score
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  
  // Mitigation
  fallbackAvailable: boolean;
  slaExists: boolean;
  lastReviewed: Date;
  reviewFrequencyDays: number;             // How often to re-assess
}

// Example
const openaiRisk: VendorRiskScore = {
  vendor: 'OpenAI',
  criticality: 'critical',
  availabilityRisk: 3,   // Recent incidents but improving
  costRisk: 4,           // Pricing changes frequently
  lockInRisk: 2,         // API format is standard; Anthropic similar
  securityRisk: 3,       // Data sent to OpenAI; strict privacy policy
  complianceRisk: 2,     // SOC 2 compliant; GDPR DPA available
  overallRisk: 'medium',
  fallbackAvailable: true,
  slaExists: true,
  lastReviewed: new Date('2026-05-26'),
  reviewFrequencyDays: 90,
};
```

### 30.3 Vendor Review Cadence

| Vendor | Review Frequency | Review Focus | Owner |
|--------|:----------------:|--------------|-------|
| OpenAI | Monthly | Pricing changes, model deprecation, new model releases | AI Lead |
| Stripe | Quarterly | Fee changes, new features (Tax, Invoicing), security updates | Finance/CTO |
| Twilio | Quarterly | Rate changes, WhatsApp API deprecation, alternative evaluation | Engineering |
| Elasticsearch | Bi-annual | License changes, version upgrade, cost optimization | Data Lead |
| Mapbox | Bi-annual | Pricing tier changes, feature sunset, open-source alternatives | Frontend Lead |
| Vercel/Railway | Bi-annual | Pricing, regions, new features | DevOps Lead |
| Cloudflare R2 | Annual | Pricing, feature parity with S3 | DevOps Lead |



## 31. Data Source Strategy — Legal vs Workaround

### 31.1 Overview

Modul 2 (AI & Sentiment Engine) bergantung pada data dari berbagai platform sosial media. Setiap platform punya **tingkat akses yang berbeda** — ada yang menyediakan API resmi murah, ada yang mahal, ada yang tidak punya API publik sama sekali.

Section ini mendokumentasikan **semua opsi** untuk mendapatkan data dari setiap platform, mulai dari yang **legal/compliant** hingga **workaround/grey-area**, lengkap dengan biaya, risiko, dan rekomendasi.

### 31.2 Per Platform Deep Dive

#### 31.2.1 X / Twitter

| Aspek | Official API | Scraping | 3rd Party Aggregator |
|-------|-------------|----------|---------------------|
| **Method** | X API v2 (Basic/Pro/Enterprise) | Puppeteer + proxy | Brandwatch, Talkwalker, Sprout Social |
| **Biaya** | Free (1.500 posts/mo) → Basic $100/mo (10K) → Pro $5.000/mo (100K) → Enterprise $42K+/mo | $200-500/mo (proxies + CAPTCHA) | $1.000-$5.000+/mo |
| **Rate Limit** | Free: 150 req/15min; Basic: 15K/15min | Highly variable — IP ban risk | Varies by contract |
| **Reliability** | ★★★★★ (Enterprise) / ★★★ (Free/Basic) | ★★ — often broken | ★★★★ |
| **Risiko Hukum** | ✅ Legal | ❌ High: X actively sues scrapers | ✅ Legal (API agreement) |
| **Data Quality** | Full metadata, structured JSON | Limited (public only) | Rich dataset, historical |

**Recommendation:** Free Tier → API Basic. Pro/Enterprise → API Pro/Enterprise. Scraping: NOT RECOMMENDED.

---

#### 31.2.2 Instagram

| Aspek | Official API | Scraping | 3rd Party Aggregator |
|-------|-------------|----------|---------------------|
| **Method** | Graph API (Meta App Review) | Puppeteer + residential proxies | Sprout Social, Hootsuite, Brandwatch |
| **Biaya** | Free (limited, rigorous review) | $300-500/mo (premium proxies) | $500-3.000/mo |
| **Reliability** | ★★★ — App Review strict, often rejected | ★ — Rapid bans | ★★★★ |
| **Risiko Hukum** | ✅ Legal if approved | ❌ High: Meta enforces aggressively | ✅ Legal |

**Recommendation:** Aggregator for reliable access. Scraping: NOT RECOMMENDED.

---

#### 31.2.3 TikTok

| Aspek | Official API | Scraping | 3rd Party Aggregator |
|-------|-------------|----------|---------------------|
| **Method** | Research API (invite-only) + Business API | Playwright + premium proxies | Brandwatch, Talkwalker |
| **Biaya** | Free (restricted) | $500-1.000/mo | $2.000-10.000+/mo |
| **Reliability** | ★★ — experimental, can change | ★ — most aggressive anti-scraping | ★★★★ |
| **Risiko Hukum** | ✅ Legal only with Research API | ❌ Extremely High | ✅ Legal |

**Recommendation:** Enterprise only via aggregator. TikTok is the hardest platform to access.

---

#### 31.2.4 Facebook

| Aspek | Official API | Scraping | 3rd Party Aggregator |
|-------|-------------|----------|---------------------|
| **Method** | Graph API (v19+) | Playwright + proxies | Meltwater |
| **Biaya** | Free (limited) | $200-400/mo | $1.000-5.000/mo |
| **Risiko Hukum** | ✅ Legal with approved app | ❌ High — Cambridge Analytica | ✅ Legal |

**Recommendation:** Graph API for public pages. Aggregator for comprehensive data.

---

#### 31.2.5 Google Reviews / Maps

| Aspek | Official API | Scraping |
|-------|-------------|----------|
| **Method** | Places API + Reviews API | Puppeteer + proxies |
| **Biaya** | $3-17/1K requests (PAYG) | $100-200/mo |
| **Reliability** | ★★★★★ | ★★★ |
| **Risiko Hukum** | ✅ Legal | 🟡 Grey area |

**Recommendation:** ✅ OFFICIAL API ONLY — cheap, reliable, legal.

---

#### 31.2.6 News / Portal Berita Indonesia

| Aspek | News API | RSS Feeds | Scraping |
|-------|----------|-----------|----------|
| **Method** | newsapi.org, GDELT Project | RSS per portal (Kompas, Detik, Tempo, CNN Indonesia) | Puppeteer |
| **Biaya** | Free (100 req/day) → $449/mo | Free | $50-100/mo |
| **Reliability** | ★★★★ | ★★★ | ★★ |
| **Risiko Hukum** | ✅ Legal | ✅ Legal | 🟡 Low enforcement |
| **Cakupan** | Kompas, Detik, Tempo, CNN Indonesia included | Direct from each portal | Full |

**Recommendation:** Primary → RSS feeds (free, legal). Secondary → News API. Scraping only for portals without RSS.

---

#### 31.2.7 YouTube, LinkedIn, Reddit, E-commerce, Telegram

| Platform | Primary Source | Secondary | Risk Level | Recommendation |
|----------|---------------|-----------|:----------:|----------------|
| YouTube | Data API v3 | N/A | 🟢 Low | ✅ API only — free tier sufficient |
| LinkedIn | 3rd Party Aggregator | N/A | 🔴 Very High | ❌ DO NOT SCRAPE. Aggregator only. |
| Reddit | Reddit API (free) | N/A | 🟢 Low | ✅ API only — free tier sufficient |
| Tokopedia/Shopee | NOT AVAILABLE | N/A | 🔴 High | ❌ Not recommended. Negotiate partnership. |
| Telegram | Bot API (public groups) | N/A | 🟢 Low | ✅ API only — free and legal |

### 31.3 Data Sourcing Cost Projection

| Phase | Platforms Covered | Monthly Cost | Strategy |
|-------|------------------|:------------:|----------|
| MVP | Twitter + News + Google Reviews + YouTube | $103-117/mo | All official APIs |
| Phase 2 | + Facebook + Instagram + Reddit + Telegram | $500-1.000/mo | Hybrid API + aggregator |
| Phase 3 | + TikTok + LinkedIn + Full scale | $5.000-15.000+/mo | Enterprise aggregator contracts |

### 31.4 Proxy & Anti-Detection Tools (For Limited Scraping Workaround)

| Tool | Function | Cost | Notes |
|------|----------|:----:|-------|
| BrightData | Residential proxy network | $15/GB + $0.60/IP | Best Indonesia coverage |
| ScrapingBee | Headless browser API | $50/mo (50K credits) | Built-in proxy + CAPTCHA |
| Playwright + crawlee | Browser automation | Free | Stealth mode, fingerprint randomization |
| puppeteer-extra | Anti-detection | Free | Stealth plugin |

> **Key Principle:** Official API > Aggregator > Scraping. Scraping is last resort only after legal review. Cost of being blocked far exceeds API subscription cost.

---

## 32. Webhook Security & Signature Verification

### 32.1 Webhook Architecture

```typescript
interface WebhookRegistration {
  url: string;                        // HTTPS only
  secret: string;                     // HMAC signing key (per webhook)
  events: WebhookEvent[];             // Subscribed events
  retryConfig: {
    maxRetries: number;               // Default: 3
    backoffStrategy: 'exponential' | 'linear' | 'fixed';
    retryInterval: number;            // seconds
  };
  rateLimitPerMinute: number;         // Default: 60
  status: 'active' | 'paused' | 'failed';
  lastDeliveryAt?: DateTime;
  consecutiveFailures: number;        // Auto-pause after 10 failures
}
```

### 32.2 Signature Verification

```typescript
// Generating signature (sender)
function generateSignature(payload: string, secret: string): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const signedPayload = `${timestamp}.${payload}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');
  return `t=${timestamp},s=${signature}`;
}

// Verifying signature (receiver)
function verifySignature(
  payload: string,
  signatureHeader: string,
  secret: string,
  toleranceSeconds: number = 300  // 5 min tolerance
): boolean {
  const [timestampStr, signature] = signatureHeader
    .split(',')
    .map(s => s.split('=')[1]);
  const timestamp = parseInt(timestampStr);
  
  // Replay attack protection
  if (Math.abs(Date.now() / 1000 - timestamp) > toleranceSeconds) {
    return false;  // Too old — possible replay attack
  }
  
  const signedPayload = `${timestamp}.${payload}`;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}
```

### 32.3 Idempotency & Retry

```typescript
// Idempotency key (sender)
interface WebhookDelivery {
  id: string;                          // Unique delivery ID
  eventId: string;                     // Unique event ID (for idempotency)
  event: WebhookEvent;
  payload: object;
  createdAt: DateTime;
}

// Receiver must deduplicate by eventId
// Store processed eventIds in Redis with TTL (7 days)
```

**Retry Policy:**
| Attempt | Delay | Notes |
|:-------:|:-----:|-------|
| 1 | 0s | Initial delivery |
| 2 | 10s | Network issue recovery |
| 3 | 60s | Temporary outage |
| 4 | 5min | Service degradation |
| 5 | 30min | Major incident |

**After 5 failures:** Webhook auto-paused, admin notified via dashboard.

### 32.4 Network & Security Requirements

- **HTTPS only** — webhook URLs must be HTTPS
- **IP whitelist** — provide static IP range for webhook sender
- **Timeout** — receiver must respond within 10 seconds
- **Status codes** — 2xx = success, 4xx/5xx = retry
- **Rate limit** — max 60 webhooks/minute per endpoint (configurable for Enterprise)

---

## 33. Rate Limiting Strategy

### 33.1 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    RATE LIMIT LAYER                          │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │  Global IP   │  │  Per-User    │  │  Per-Endpoint    │ │
│  │  (Redis +    │  │  (Redis +    │  │  (Application   │ │
│  │   Nginx)     │  │   DB)        │  │   Middleware)    │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
│         │                │                    │              │
│         ▼                ▼                    ▼              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                REDIS SLIDING WINDOW                    │  │
│  │  ┌─────────────────────────────────────────────┐     │  │
│  │  │  Key: rate_limit:{type}:{identifier}:{epoch} │     │  │
│  │  │  Value: request_count (TTL: window_seconds)  │     │  │
│  │  └─────────────────────────────────────────────┘     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 33.2 Rate Limit Tiers

| Tier | Global (IP) | Per-User (Auth) | Per-Endpoint | Burst | Window |
|------|:-----------:|:----------------:|:------------:|:----:|:------:|
| Free | 100 req/min | 100 req/hour | 30 req/min | 10 req | Sliding window |
| Pro | 500 req/min | 1.000 req/hour | 100 req/min | 50 req | Sliding window |
| Enterprise | 2.000 req/min | Custom | 500 req/min | 200 req | Sliding window |
| Internal/Admin | 10.000 req/min | Unlimited | 1.000 req/min | 1.000 req | Sliding window |

### 33.3 Rate Limit Response

```typescript
// Headers returned on every request
interface RateLimitHeaders {
  'X-RateLimit-Limit': number;          // Max requests in window
  'X-RateLimit-Remaining': number;      // Remaining in window
  'X-RateLimit-Reset': number;          // Unix timestamp when window resets
  'Retry-After': number;                // Seconds to wait (when limited)
}

// 429 Response
{
  "success": false,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Please retry after {retryAfter} seconds.",
    "retryAfter": 30,
    "limit": 100,
    "remaining": 0,
    "resetAt": "2026-05-26T12:00:00Z"
  }
}
```

### 33.4 Per-Endpoint Rate Limits

| Endpoint Group | Free | Pro | Enterprise | Reason |
|----------------|:----:|:---:|:----------:|--------|
| `/api/brand/*` | 30/min | 100/min | 500/min | CRUD operations |
| `/api/sentiment/*` | 20/min | 50/min | 200/min | Data-heavy queries |
| `/api/crisis/*` | 10/min | 30/min | 100/min | Critical operations |
| `/api/dashboard/*` | 60/min | 200/min | 1.000/min | Frequent polling |
| `/api/admin/*` | 5/min | 20/min | 100/min | Admin operations |
| `/api/auth/*` | 10/min | 30/min | 60/min | Security-sensitive |
| `/api/strategy/*` | 20/min | 50/min | 200/min | AI-powered endpoints |

### 33.5 Crawler-Specific Rate Limiting

For internal crawler workers (not user-facing):

| Platform | Requests/Min | Notes |
|----------|:------------:|-------|
| Twitter API | 300/15min | Uses official API tier |
| Instagram | 200/hour | Per user token |
| TikTok | 100/day | Research API quota |
| News RSS | 60/min | Polite rate for RSS |
| Google Places | 100/day | Free tier |

**Implementation:** Token bucket algorithm — each platform has a Redis-based token pool. Crawlers consume tokens before making requests.

---

## 34. Feature Flags & A/B Testing

### 34.1 Architecture

```typescript
interface FeatureFlag {
  key: string;                          // e.g., 'new-sentiment-pipeline'
  name: string;                         // Human-readable name
  description: string;
  owner: string;                        // Team or individual
  
  // Targeting
  enabled: boolean;                     // Global kill switch
  rolloutPercentage: number;            // 0-100
  targetingRules: Array<{
    type: 'tenant' | 'user' | 'plan' | 'region';
    values: string[];
  }>;
  
  // A/B Test Configuration
  isExperiment: boolean;
  experimentConfig?: {
    variants: Array<{ name: string; weight: number }>;
    metric: string;                     // Success metric
    minimumSampleSize: number;
    durationDays: number;
  };
  
  // Audit
  createdBy: string;
  createdAt: DateTime;
  lastModifiedAt: DateTime;
}
```

### 34.2 Feature Flag Categories

| Category | Example | TTL | Rollback Strategy |
|----------|---------|:---:|-------------------|
| **Release Toggle** | New NLP pipeline v2 | Until full rollout | Disable flag → old code path |
| **Experiment Toggle** | A/B test: GPT-4o vs Claude 3.5 | Duration of experiment | Stop experiment → control variant |
| **Ops Toggle** | Disable crawler during maintenance | Minutes to hours | Automatic re-enable after TTL |
| **Permission Toggle** | Early access for Enterprise users | Permanent | N/A |
| **Kill Switch** | Emergency disable of AI features | Until bug fixed | Immediate revert |

### 34.3 Implementation

**Tool:** PostHog (self-hosted) — already in tech stack for analytics, includes feature flags.

```typescript
// Usage example
import { PostHog } from 'posthog-node';

const client = new PostHog(process.env.POSTHOG_API_KEY);

// Check feature flag
const isEnabled = await client.isFeatureEnabled(
  'new-sentiment-pipeline',
  user.distinctId,
  {
    groups: {
      tenant: tenant.id,
      plan: subscription.plan,
    }
  }
);

if (isEnabled) {
  // New pipeline
} else {
  // Old pipeline
}
```

### 34.4 A/B Testing Framework

| Phase | Steps | Duration | Minimum Sample |
|-------|-------|:--------:|:--------------:|
| **Discovery** | Identify hypothesis, define success metric | 1 week | N/A |
| **Design** | Create variants, configure in PostHog | 2-3 days | N/A |
| **Run** | Split traffic, collect data | 2-4 weeks | 1.000 users/variant |
| **Analysis** | Statistical significance (p < 0.05) | 1 week | N/A |
| **Rollout** | Winner gets 100% rollout or iterate | 1-2 weeks | N/A |

---

## 35. Accessibility (WCAG) Compliance

### 35.1 Target Level

**WCAG 2.1 Level AA** — Minimum for government/enterprise contracts in most jurisdictions (US Section 508, EU EN 301 549).

### 35.2 WCAG 2.1 AA Requirements Checklist

| Principle | Guideline | Requirement | Implementation |
|-----------|-----------|-------------|----------------|
| **Perceivable** | 1.1.1 Non-text Content | All images have alt text | `alt` attribute on all `<img>`, decorative images use `alt=""` |
| | 1.2.2 Captions (Prerecorded) | Video content has captions | Use HTML5 `<track>` element |
| | 1.3.1 Info and Relationships | Semantic HTML, proper heading hierarchy | `<h1>-<h6>`, `<nav>`, `<main>`, `<aside>` landmarks |
| | 1.4.1 Use of Color | Don't rely solely on color | Sentiment indicators use icon + text + color |
| | 1.4.3 Contrast (Minimum) | Text contrast ratio ≥ 4.5:1 | Tailwind theme enforces contrast; use `text-*` tokens |
| | 1.4.4 Resize Text | Text can zoom 200% without loss | Use relative units (rem, em) not px for text |
| **Operable** | 2.1.1 Keyboard | All functionality via keyboard | Tabindex management, custom focus styles |
| | 2.4.3 Focus Order | Logical tab order | DOM order matches visual order |
| | 2.4.7 Focus Visible | Visible focus indicator | Custom `:focus-visible` styles (not just removing outline) |
| | 2.5.1 Pointer Gestures | Touch targets ≥ 44x44px | All buttons, links have min 44px touch area |
| **Understandable** | 3.1.1 Language of Page | `lang` attribute on `<html>` | Dynamic lang based on locale |
| | 3.2.2 On Input | No unexpected context changes | Form submit doesn't navigate unexpectedly |
| | 3.3.2 Labels or Instructions | All form inputs have labels | `Label` component with `htmlFor` |
| **Robust** | 4.1.2 Name, Role, Value | ARIA attributes on custom components | Shadcn/ui components are ARIA-compliant by default |

### 35.3 Accessibility Testing Tools

| Tool | Phase | Frequency |
|------|-------|:---------:|
| axe-core (a11y audit) | Development | Every PR |
| Lighthouse Accessibility | CI | Every PR |
| Screen reader testing (NVDA/VoiceOver) | QA | Every release |
| Manual checklist | QA | Every release |
| User testing with disabilities | Quarterly | Quarterly |

### 35.4 Shadcn/ui Accessibility

Shadcn/ui components (used throughout the app) are built on Radix UI primitives, which:
- Follow WAI-ARIA design patterns
- Support keyboard navigation
- Announce changes via live regions
- Manage focus management

No additional accessibility work needed for basic UI components — but custom components (dashboard widgets, geospatial maps) need manual implementation.

### 35.5 Special Considerations for Dashboard

- **Sentiment charts:** Provide data table alternative for screen readers (`role="img"` + `aria-label` with summary stats)
- **Geospatial map:** Keyboard navigation for zoom/pan, list of regions with data as text alternative
- **Crisis alerts:** `role="alert"` on alert banners, `aria-live="polite"` for real-time updates
- **Drag-and-drop widgets:** Keyboard reorder via arrow keys (accessible drag-and-drop library)

---

## 36. Dependency Management & Security Scanning

### 36.1 Dependency Management Strategy

| Tool | Function | Integration | Schedule |
|------|----------|-------------|:--------:|
| **Dependabot** | Automated dependency PRs | GitHub native | Weekly |
| **Renovate** | Alternative to Dependabot (more configurable) | GitHub App | Weekly |
| **npm audit** | Vulnerability scanning | npm built-in | On every install |
| **Snyk** | Advanced vulnerability + license scanning | GitHub + CLI | CI (every PR) |
| **Socket.dev** | Supply chain attack detection | GitHub App | CI (every PR) |
| **SBOM generation** | Software Bill of Materials | CI (weekly) | Weekly |

### 36.2 Lockfile & Versioning Policy

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
      - "automated"
    reviewers:
      - "engineering-team"
    # Version strategy
    versioning-strategy: increase
    # Only security updates auto-merge
    allow:
      - dependency-type: "direct"
    ignore:
      - dependency-name: "*"
        update-types: ["version-update:semver-major"]
```

### 36.3 Dependency Update Cadence

| Dependency Type | Critical Security Patch | Minor Update | Major Update | Notes |
|----------------|:----------------------:|:------------:|:------------:|-------|
| **Framework** (Next.js, Prisma) | < 24h | 1-2 weeks | 1-3 months | Needs thorough testing |
| **UI Library** (Shadcn, Tailwind) | < 1 week | 2-4 weeks | 1-3 months | Visual regression check |
| **Utility** (Zod, date-fns) | < 1 week | 2-4 weeks | 1-3 months | Usually safe |
| **AI/API** (OpenAI, Stripe SDK) | < 24h | 1 week | 2 weeks | Breaking changes common |
| **Dev dependency** (ESLint, Vitest) | < 1 week | 2-4 weeks | 1-3 months | Low risk |

### 36.4 SBOM (Software Bill of Materials)

Generated via `npm sbom` or CycloneDX tool:

```bash
# Generate SBOM in CI
npx @cyclonedx/npm-cli --output-file sbom.json
# Store in artifact repository
# Required for: SOC 2, ISO 27001, enterprise compliance
```

---

## 37. API Documentation & SDK Strategy

### 37.1 API Documentation Strategy

| Tool | Function | Stage |
|------|----------|-------|
| **OpenAPI 3.1** | API specification format | Design |
| **Swagger UI** | Interactive API docs | Staging + Production |
| **Stoplight** | API design + documentation platform | Design + Review |
| **Scalar** | Modern API documentation UI (alternative to Swagger) | Production |

### 37.2 OpenAPI Spec Generation

```typescript
// Using Zod-to-OpenAPI to generate from existing schemas
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

const registry = new OpenAPIRegistry();

const BrandSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(3).max(100),
  tagline: z.string().max(200).optional(),
});

registry.registerPath({
  method: 'get',
  path: '/api/brand/{id}',
  summary: 'Get brand by ID',
  tags: ['Brand'],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: 'Brand object',
      content: {
        'application/json': {
          schema: BrandSchema,
        },
      },
    },
  },
});
```

### 37.3 API Client SDK

For third-party developers integrating with Sentiment Platform:

| SDK | Language | Status |
|-----|----------|--------|
| `sentiment-js` | TypeScript/JavaScript | Generate from OpenAPI |
| `sentiment-py` | Python | Generate from OpenAPI |
| `sentiment-go` | Go | Generate from OpenAPI |

**Generation tool:** OpenAPI Generator or Speakeasy.

---

## 38. Content Security Policy & Security Headers Detail

### 38.1 Complete CSP Configuration

```typescript
// next.config.ts
const cspConfig = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-eval'",       // Next.js dynamic imports (remove in production if possible)
    "'unsafe-inline'",     // For inline scripts (Next.js requires this)
    'https://*.posthog.com',
    'https://js.stripe.com',
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'",     // Tailwind/Shadcn uses inline styles
  ],
  'img-src': [
    "'self'",
    'data:',               // Inline data URLs for small images
    'blob:',               // Blob URLs for user uploads preview
    'https://*.cloudflarestorage.com',
    'https://*.amazonaws.com',
    'https://*.googleusercontent.com',  // Google profile pics
    'https://*.fbcdn.net',              // Facebook/Instagram images
    'https://pbs.twimg.com',            // Twitter images
    'https://*.tiktokcdn.com',          // TikTok images
  ],
  'connect-src': [
    "'self'",
    'ws://localhost:*',                  // WebSocket dev
    'wss://*.vercel.app',               // WebSocket production
    'https://api.openai.com',
    'https://api.stripe.com',
    'https://api.sendgrid.com',
    'https://api.twilio.com',
    'https://*.posthog.com',
    'https://maps.googleapis.com',       // Geospatial maps
    'https://api.mapbox.com',
  ],
  'frame-src': [
    "'self'",
    'https://js.stripe.com',             // Stripe Elements
  ],
  'font-src': [
    "'self'",
    'data:',                              // Inline font loading
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],         // X-Frame-Options equivalent
  'upgrade-insecure-requests': [],
};
```

### 38.2 Additional Security Headers

| Header | Value | Purpose |
|--------|-------|---------|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | HTTPS enforcement (2 years) |
| `X-Content-Type-Options` | `nosniff` | MIME type sniffing prevention |
| `X-Frame-Options` | `DENY` | Clickjacking prevention |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Referrer header control |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()...` | API permissions control |
| `Cross-Origin-Embedder-Policy` | `require-corp` | Cross-origin resource isolation |
| `Cross-Origin-Opener-Policy` | `same-origin` | Cross-origin window isolation |

### 38.3 Permissions-Policy

```typescript
const permissionsPolicy = [
  'camera=()',             // Block camera access
  'microphone=()',         // Block microphone
  'geolocation=()',        // Block geolocation
  'interest-cohort=()',    // FLoC opt-out
  'payment=()',            // Block Payment Request API (use Stripe)
  'usb=()',                // Block USB access
  'magnetometer=()',       // Block sensors
  'accelerometer=()',      // Block sensors
  'gyroscope=()',          // Block sensors
  'fullscreen=(self)',     // Allow fullscreen only for same-origin
].join(', ');
```

---

## 39. Cookie Consent & CORS/CSRF Policy

### 39.1 Cookie Consent Management

**Requirements (UU PDP + GDPR):**
1. **Explicit consent** before non-essential cookies
2. **Granular control** — essential vs analytics vs marketing
3. **Withdraw consent** as easy as give it
4. **Record consent** for audit compliance

```typescript
// Cookie categories
interface CookieCategories {
  essential: string[];    // Session, CSRF, auth tokens — no consent needed
  functional: string[];   // Locale preference, theme, widget layout
  analytics: string[];    // PostHog page views, feature usage — consent required
  marketing: string[];    // None initially — not used
}

// Consent UI: Banner at bottom → modal on click
// CookieYes or custom implementation via react-cookie-consent
```

**Consent Flow:**
```
User visits site
  │
  ▼
[Cookie Banner] → "We use essential + analytics cookies"
  ├── "Accept All" → All cookies approved
  ├── "Customize"  → Cookie preferences modal
  └── "Reject All" → Only essential cookies
        │
        ▼
  Consent stored in:
    ├── Cookie: `consent_${version}` (encrypted, 6 months TTL)
    └── Database: `ConsentRecord` (for audit trail)
          │
          ▼
  PostHog tracking only if analytics consent given
```

### 39.2 CORS Policy

```typescript
// next.config.ts
const corsConfig = {
  allowedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL,       // Primary web app
    'https://app.sentiment.ai',            // Production
    'https://staging.sentiment.ai',        // Staging
    /\.sentiment\.api$/,                   // API subdomain wildcard
  ],
  allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-API-Key',
    'X-Idempotency-Key',                  // For webhook idempotency
    'X-Request-ID',                       // Trace ID
  ],
  exposedHeaders: [
    'X-RateLimit-Limit',
    'X-RateLimit-Remaining',
    'X-RateLimit-Reset',
    'X-Request-ID',
  ],
  credentials: true,                       // Cookie/session auth
  maxAge: 86400,                           // Preflight cache: 24h
};
```

### 39.3 CSRF Protection

```typescript
// Double Submit Cookie Pattern (simpler than synchronizer token)
// 1. Server sets csrf cookie (httpOnly: false, secure: true, sameSite: strict)
// 2. Client reads cookie, sends as X-CSRF-Token header
// 3. Server compares cookie value vs header value

// Next.js implementation:
import { cookies } from 'next/headers';

export async function csrfProtection(request: Request) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return;  // Safe methods
  }
  
  const cookie = cookies().get('csrf-token')?.value;
  const header = request.headers.get('X-CSRF-Token');
  
  if (!cookie || !header || cookie !== header) {
    return Response.json(
      { success: false, error: { code: 'CSRF_INVALID', message: 'Invalid CSRF token' } },
      { status: 403 }
    );
  }
}
```

**Additional CSRF controls:**
- `SameSite: Lax` on session cookies (default in modern browsers)
- `SameSite: Strict` on CSRF cookie
- CSRF check for all POST/PUT/PATCH/DELETE requests
- WebSocket connections validated with session token

---

## 40. Mobile Strategy — PWA Roadmap

### 40.1 Why PWA First (Not Native)

| Factor | PWA | React Native | Native (Swift/Kotlin) |
|--------|:---:|:------------:|:---------------------:|
| Development cost | 1x (shared codebase) | 1.5x | 3x |
| Time to market | 1 week | 1-2 months | 3-4 months |
| Push notifications | ✅ (Web Push) | ✅ | ✅ |
| Offline support | ✅ (Service Worker) | ✅ | ✅ |
| Camera/file access | ✅ | ✅ | ✅ (full) |
| App Store distribution | ❌ (but installable) | ✅ | ✅ |
| Native performance | ★★★ | ★★★★ | ★★★★★ |
| Access to device APIs | ★★★ | ★★★★ | ★★★★★ |
| Update frequency | Instant | App Store review | App Store review |

### 40.2 PWA Implementation Checklist

| Feature | Implementation | Status |
|---------|---------------|:------:|
| Service Worker | `next-pwa` or Workbox for caching | Phase 1 |
| Manifest.json | Icons (192/512px), theme_color, display: standalone | Phase 1 |
| Offline fallback | Cache dashboard last-viewed data | Phase 1 |
| Push notifications | Web Push API + Notification API | Phase 2 |
| Background sync | Sync pending report requests | Phase 2 |
| Install prompt | Custom install button (beforeinstallprompt event) | Phase 1 |
| Splash screen | Generated from manifest icons | Phase 1 |
| iOS compatibility | Meta tags for Safari, apple-touch-icon | Phase 1 |

### 40.3 PWA Manifest

```json
{
  "name": "Sentiment Platform",
  "short_name": "Sentiment",
  "description": "AI-powered Brand Sentiment & Social Listening",
  "start_url": "/dashboard",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#1E40AF",
  "orientation": "portrait-primary",
  "categories": ["business", "social"],
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ]
}
```

### 40.4 Native App Decision Criteria

**Build native app if:**
- MAU > 10.000 users
- Users spend > 30 min/day in app
- Push notification open rate < 30% via PWA
- Customer requests for native experience > 20% of feedback
- Need background data collection (crawler scheduling from device)

**Platform Priority:** Android first (80% market share in Indonesia) → iOS later.

---

## 41. Agent Architecture & Orchestration

### 41.1 Agent Model & Typology

Sistem agent terdistribusi yang mengelola seluruh operasi otomatis platform. Setiap agent adalah **proses independen** dengan tanggung jawab spesifik, siklus hidup terkelola, dan komunikasi event-driven.

```
+------------------------------------------------------------------+
|                    AGENT ORCHESTRATOR                             |
|  +----------+ +----------+ +----------+ +------------------+    |
|  |Registry  | | Health   | |Scheduler | | Conflict         |    |
|  |& Config  | | Monitor  | |& Queue   | | Resolver         |    |
|  +----+-----+ +----+-----+ +----+-----+ +--------+---------+    |
|       |            |            |                |              |
|  +----v------------v------------v----------------v----------+   |
|  |                    AGENT POOL                              |   |
|  |  +---------+ +----------+ +--------+ +--------------+    |   |
|  |  |Crawler  | |   NLP    | |  EWS   | | Notification |    |   |
|  |  | Agent   | |  Agent   | |  Agent  | |    Agent     |    |   |
|  |  +---------+ +----------+ +--------+ +--------------+    |   |
|  |  |  Report | |   Sync   | |Archival| |  Strategy    |    |   |
|  |  |  Agent  | |  Agent   | |  Agent  | |   Agent      |    |   |
|  |  +---------+ +----------+ +--------+ +--------------+    |   |
|  +----------------------------------------------------------+   |
+------------------------------------------------------------------+
```

**Agent Types:**

| Agent Type | Responsibility | Concurrency | Resource Profile | Stateful? |
|------------|---------------|:-----------:|-----------------|:---------:|
| **Crawler Agent** | Multi-platform social listening (X, IG, TikTok, FB, Google Reviews, News) | 1 per platform per tenant | CPU-intensive (HTTP), memory-moderate | Yes (cursor/pagination state) |
| **NLP Agent** | Sentiment analysis, emotion detection, language detection, brand association | Pool-based (auto-scale) | GPU/CPU-intensive, memory-high | No |
| **EWS Agent** | Anomaly detection, threshold monitoring, crisis escalation | 1 per tenant group | CPU-moderate, memory-low | Yes (baseline state) |
| **Notification Agent** | Multi-channel delivery (Push, WA, Email, In-app) | Pool-based (2-5) | I/O-bound, memory-low | Yes (delivery receipts) |
| **Report Agent** | Scheduled report generation (PDF, PPT, Excel) | 1-2 concurrent | CPU-moderate, memory-high | Yes (generation progress) |
| **Sync Agent** | Data synchronization (competitor refresh, webhook relay, cache warming) | 1 per schedule type | I/O-bound, memory-low | Yes (sync cursor) |
| **Archival Agent** | Data retention enforcement, archival to cold storage, purging | 1 (scheduled) | I/O-intensive, memory-low | Yes (archival progress) |
| **Strategy Agent** | Campaign optimization, content tone validation, persona matching | On-demand | LLM API-call intensive, memory-moderate | No |

### 41.2 Agent Lifecycle

Setiap agent mengikuti **state machine** yang terdefinisi:

**Lifecycle States:**

| State | Description | Transition |
|-------|-------------|------------|
| REGISTERED | Agent tercatat di Registry, konfigurasi valid | REGISTERED -> IDLE |
| IDLE | Agent siap, no active task | IDLE -> ACTIVE (on task assignment) |
| ACTIVE | Agent memproses tugas | ACTIVE -> IDLE (on completion) or ACTIVE -> DEGRADED (on error threshold) |
| DEGRADED | Agent berjalan sub-optimal (>3 errors in 5min) | DEGRADED -> RESTART (auto) |
| RESTARTING | Restart in progress | RESTARTING -> IDLE (success) or DECOMMISSIONED (3 failed restarts) |
| SCALING | Agent instance count changing | SCALING -> IDLE (complete) |
| DECOMMISSIONED | Agent dihentikan permanen | Terminal state |

### 41.3 Agent Database Schema

```prisma
model AgentRegistry {
  id            String   @id @default(cuid())
  agentType     AgentType
  agentName     String
  tenantId      String
  tenant        Tenant   @relation(fields: [tenantId], references: [id])
  version       String
  status        AgentStatus @default(REGISTERED)
  config        Json?
  tags          Json?
  cpuLimit      Int      @default(1)
  memoryLimit   Int      @default(512)
  concurrency   Int      @default(1)
  lastHeartbeat DateTime?
  healthStatus  AgentHealth @default(UNKNOWN)
  errorCount    Int      @default(0)
  restartCount  Int      @default(0)
  minInstances  Int      @default(1)
  maxInstances  Int      @default(3)
  currentInstances Int   @default(1)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  @@unique([agentName, tenantId])
  @@index([tenantId, agentType])
  @@index([status])
  @@index([healthStatus])
}

enum AgentType { CRAWLER NLP EWS NOTIFICATION REPORT SYNC ARCHIVAL STRATEGY }
enum AgentStatus { REGISTERED IDLE ACTIVE DEGRADED RESTARTING SCALING DECOMMISSIONED }
enum AgentHealth { UNKNOWN HEALTHY DEGRADED CRITICAL DOWN }

model AgentTask {
  id            String   @id @default(cuid())
  agentId       String
  agent         AgentRegistry @relation(fields: [agentId], references: [id])
  taskType      String
  payload       Json
  status        TaskStatus @default(PENDING)
  priority      Int      @default(0)
  retryCount    Int      @default(0)
  maxRetries    Int      @default(3)
  assignedTo    String?
  startedAt     DateTime?
  completedAt   DateTime?
  errorMessage  String?
  result        Json?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  @@index([agentId, status])
  @@index([status, priority])
  @@index([assignedTo])
}

enum TaskStatus { PENDING ASSIGNED RUNNING COMPLETED FAILED CANCELLED RETRYING }

model AgentEvent {
  id            String   @id @default(cuid())
  agentId       String
  agent         AgentRegistry @relation(fields: [agentId], references: [id])
  eventType     String
  severity      EventSeverity @default(INFO)
  message       String
  metadata      Json?
  createdAt     DateTime @default(now())
  @@index([agentId, createdAt])
  @@index([severity])
  @@index([createdAt])
}

enum EventSeverity { DEBUG INFO WARNING ERROR CRITICAL }
```

### 41.4 Agent Configuration Registry

Setiap agent memiliki konfigurasi spesifik yang disimpan di AgentRegistry.config (JSON):

```json
{
  "crawler": {
    "rateLimitPerMinute": 60,
    "proxyPool": ["proxy1.sentiment.ai", "proxy2.sentiment.ai"],
    "userAgentRotation": true,
    "maxRetries": 3,
    "timeoutMs": 30000,
    "respectRobotsTxt": true
  },
  "nlp": {
    "model": "gpt-4o-mini",
    "batchSize": 50,
    "maxTokensPerMention": 500,
    "languageDetectionConfidence": 0.85,
    "cachingEnabled": true,
    "cacheTtlHours": 24
  },
  "ews": {
    "zScoreThreshold": 2.5,
    "sentimentShiftWindow": 60,
    "velocitySurgeThreshold": 5.0,
    "evaluationIntervalMinutes": 5,
    "cooldownMinutes": 30
  },
  "notification": {
    "channels": ["push", "email", "whatsapp"],
    "maxBatchSize": 100,
    "throttlePerChannelMs": 1000,
    "retryIntervalMinutes": [5, 15, 30, 60]
  }
}
```

### 41.5 Agent Health Monitoring

Setiap agent wajib mengirim **heartbeat** setiap N detik. Orchestrator memonitor:

| Metric | Threshold | Action |
|--------|:---------:|--------|
| Heartbeat missed | > 30s | Mark DEGRADED, log warning |
| Heartbeat missed | > 60s | Mark CRITICAL, attempt restart |
| Heartbeat missed | > 120s | Mark DOWN, alert on-call engineer |
| Error rate | > 5% in 5min | Auto-restart agent |
| Memory usage | > 85% | Scale up (add instance) |
| Task queue depth | > 1000 | Scale up (add instance) |
| Processing latency (p95) | > 10s | Investigate bottleneck |
| Restart frequency | > 3 in 1h | Auto-decommission, alert DevOps |

**Health Check API (internal):**
```
GET /agent/health
-> { status: "healthy" | "degraded" | "critical", uptime: 12345s,
    memoryUsage: 45%, cpuUsage: 30%, taskQueueDepth: 12,
    lastProcessedTask: "2026-05-26T10:30:00Z" }
```

### 41.6 Agent Orchestration & Coordination

**Queue-based task distribution:**

Crawler Agent -> NLP Queue (Bull/Redis) -> NLP Agent Pool (3-5) -> EWS Queue (Bull/Redis) -> EWS Agent (1 per tenant) -> Notification Queue (Bull/Redis) -> Notification Agent Pool

**Coordination Rules:**
1. **Crawler -> NLP**: Setiap mention yang berhasil di-crawl otomatis masuk ke NLP queue
2. **NLP -> EWS**: Hasil sentiment analysis dipublish ke event bus; EWS agent consume untuk anomaly detection
3. **NLP -> Notification**: Hanya mention dengan sentiment negatif ekstrem atau viral velocity yang trigger notifikasi
4. **EWS -> Notification**: Crisis alerts langsung masuk ke high-priority notification queue
5. **Sync Agent -> Cache**: Data kompetitor dan referensi periodik di-refresh dan warming cache
6. **Archival Agent**: Berjalan scheduled (midnight UTC) -- memindahkan data lama ke cold storage

**Conflict Resolution:**
- Jika 2 agent mengklaim task yang sama -> timestamp-based resolution (latest wins)
- Dead letter queue untuk task yang gagal > 3x -> manual review by engineer
- Agent starvation prevention: setiap queue punya priority level + fair scheduling

### 41.7 Agent API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|:----:|
| GET | /api/admin/agents | List all registered agents | Super Admin |
| POST | /api/admin/agents/register | Register new agent | Super Admin |
| GET | /api/admin/agents/:id | Get agent details | Super Admin |
| PATCH | /api/admin/agents/:id | Update agent config | Super Admin |
| POST | /api/admin/agents/:id/restart | Restart agent | Super Admin |
| POST | /api/admin/agents/:id/scale | Scale agent (instances) | Super Admin |
| DELETE | /api/admin/agents/:id | Decommission agent | Super Admin |
| GET | /api/admin/agents/:id/health | Get agent health status | Super Admin |
| GET | /api/admin/agents/:id/tasks | List agent tasks | Super Admin |
| GET | /api/admin/agents/metrics | Aggregate agent metrics | Super Admin |

### 41.8 Agent Communication Protocol

**Internal Event Bus (Redis Pub/Sub):**

| Event | Publisher | Subscribers | Payload |
|-------|:---------:|:-----------:|---------|
| mention:crawled | Crawler Agent | NLP Agent, EWS Agent | { mentionId, platform, text, metadata } |
| mention:analyzed | NLP Agent | EWS Agent, Strategy Agent | { mentionId, sentiment, emotions, brandAssociations } |
| anomaly:detected | EWS Agent | Notification Agent | { anomalyType, severity, mentionIds[], timeline } |
| crisis:escalated | EWS Agent | Notification Agent, Dashboard | { crisisId, level, actionRequired, autoResponse } |
| task:completed | Any Agent | Orchestrator | { agentId, taskId, duration, result } |
| agent:status | Any Agent | Orchestrator, Monitoring | { agentId, status, health, metrics } |
| sync:required | Sync Agent | Crawler Agent | { platform, brandIds[] } |
| cache:invalidate | Any Agent | All Agents | { cacheKey, pattern } |

### 41.9 Agent Scaling Strategy

| Agent Type | Scaling Trigger | Scale Up | Scale Down | Cooldown |
|------------|----------------|:--------:|:----------:|:--------:|
| Crawler Agent | Queue depth > 100 | +1 instance per 50 queued | -1 when queue < 20 | 2 min |
| NLP Agent | Queue depth > 200 | +1 per 100 queued | -1 when queue < 50 | 3 min |
| EWS Agent | Tenant count > 100 per instance | +1 per 50 tenants | -1 per 30 tenant reduction | 5 min |
| Notification Agent | Queue depth > 50 | +1 per 25 queued | -1 when queue < 10 | 1 min |
| Report Agent | Scheduled time | Pre-scaled 5 min before schedule | Scale to 1 after completion | N/A |
| Archival Agent | Manual trigger only | N/A | N/A | N/A |

**Auto-scaling boundaries:**
- Min/max instances per agent type (defined in AgentRegistry)
- Global agent cap: 50 instances total
- Scale up cooldown: 60s (prevent thrashing)
- Scale down cooldown: 120s

---

## 42. Screen Flow & Information Architecture

### 42.1 Full Sitemap

```
sentiment.ai/
|
+-- / (Landing Page / Login Redirect)
|   +-- /login
|   +-- /register
|   +-- /forgot-password
|   +-- /verify-email
|
+-- /dashboard/*                    [All authenticated roles - RBAC filtered]
|   +-- /dashboard/executive-summary
|   |   +-- brand-health-gauge
|   |   +-- volume-trend-chart
|   |   +-- sentiment-pie-chart
|   |   +-- emotion-distribution
|   |   +-- top-mentions-table
|   |   +-- trending-keywords-cloud
|   |   +-- alert-status-bar
|   |
|   +-- /dashboard/brands
|   |   +-- list                    [Brand cards with quick metrics]
|   |   +-- :id/setup              [Brand DNA wizard - multi-step]
|   |   +-- :id/overview           [Single brand dashboard]
|   |   +-- :id/sentiment          [Sentiment trend + emotion breakdown]
|   |   +-- :id/mentions           [Live mention feed with filters]
|   |   +-- :id/competitors        [Competitor matrix + benchmarking]
|   |   +-- :id/crisis             [Crisis dashboard - conditional]
|   |   +-- :id/settings           [Brand config: keywords, tone, handles]
|   |
|   +-- /dashboard/live-feed
|   |   +-- all                    [Cross-platform mention stream]
|   |   +-- by-platform            [Platform-filtered feed]
|   |   +-- by-sentiment           [Sentiment-filtered feed]
|   |   +-- saved-searches         [Saved filter presets]
|   |
|   +-- /dashboard/crisis          [Global crisis overview]
|   |   +-- active                 [Active crises - sorted by severity]
|   |   +-- :id/triage             [Single crisis: source trace, timeline, response]
|   |   +-- history                [Resolved crises archive]
|   |
|   +-- /dashboard/strategy
|   |   +-- tone-checker            [Content validation tool]
|   |   +-- campaign-optimizer      [Engagement recommendations]
|   |   +-- persona-matcher         [Audience alignment]
|   |   +-- recommendations         [AI-generated strategy suggestions]
|   |
|   +-- /dashboard/reports
|   |   +-- scheduled               [Scheduled report list]
|   |   +-- :id/preview             [Report preview + download]
|   |   +-- builder                 [Custom report builder - drag-drop]
|   |
|   +-- /dashboard/settings
|       +-- profile                 [User profile & preferences]
|       +-- notifications           [Alert channel config per brand]
|       +-- api-keys                [API key management]
|       +-- webhooks                [Webhook configuration]
|       +-- billing                 [Subscription & payment history]
|
+-- /admin/*                        [Super Admin only]
|   +-- /admin/users
|   |   +-- list                    [User table with roles]
|   |   +-- :id                     [User detail + activity log]
|   |   +-- invite                  [Invite new user form]
|   |
|   +-- /admin/tenants
|   |   +-- list                    [Tenant table with usage]
|   |   +-- :id                     [Tenant detail + config]
|   |   +-- audit-log              [Tenant activity audit trail]
|   |
|   +-- /admin/agents               [Agent management]
|   |   +-- list                    [Agent registry table + health status]
|   |   +-- :id                     [Agent detail: config, tasks, logs]
|   |   +-- metrics                 [Global agent dashboard]
|   |
|   +-- /admin/monitoring
|   |   +-- system-health           [Infrastructure dashboard]
|   |   +-- api-logs                [API request/response log]
|   |   +-- error-tracking          [Error aggregation]
|   |   +-- rate-limiting           [Rate limit usage per tier]
|   |
|   +-- /admin/billing
|   |   +-- subscriptions           [All subscription overview]
|   |   +-- invoices                [Invoice history]
|   |   +-- plans                   [Plan/tier management]
|   |   +-- usage-report            [Per-tenant usage report]
|   |
|   +-- /admin/settings
|       +-- general                 [System-wide settings]
|       +-- security                [Security policy: MFA, password, session]
|       +-- email                   [SMTP config, email templates]
|       +-- maintenance-mode        [System maintenance toggle]
|
+-- /docs                           [Public API docs]
    +-- /docs/api                   [OpenAPI/Swagger UI]
    +-- /docs/webhooks              [Webhook event reference]
    +-- /docs/sdks                  [SDK documentation]
```

### 42.2 Page Transition Flow Diagram

Login -> Auth Success -> Dashboard Executive Summary -> { Brand List -> Brand Dashboard (Overview) -> [Sentiment Trend, Mentions Feed, Competitor Benchmark Matrix] } | Live Feed | Crisis Overview -> Single Crisis Triage & Response

### 42.3 Per-Role Navigation Path

**Super Admin Flow:**
/ (Landing) -> Login -> Executive Summary
  +-- Admin: Users -> Tenants -> Agents -> Monitoring -> Billing -> Settings
  +-- All brand dashboards (read-only across all tenants)
  +-- System config & maintenance

**Manager Flow:**
/ (Landing) -> Login -> Executive Summary
  +-- Brand List -> Select Brand -> Overview -> Sentiment -> Mentions -> Competitors
  +-- Live Feed (cross-brand)
  +-- Crisis Overview -> Triage & Response
  +-- Strategy: Tone Checker -> Campaign Optimizer -> Persona Matcher
  +-- Reports: Scheduled -> Preview -> Download
  +-- Settings: Profile -> Notifications -> API Keys

**Analyst Flow:**
/ (Landing) -> Login -> Executive Summary
  +-- Brand List -> Select Brand -> Overview -> Sentiment -> Mentions (with write access)
  +-- Live Feed -> Filter -> Reply to mentions
  +-- Crisis Overview -> View details (read-only)
  +-- Strategy: Tone Checker -> Validate content
  +-- Reports -> Preview -> Download (cannot create)

**Viewer Flow:**
/ (Landing) -> Login -> Executive Summary (read-only)
  +-- Brand List -> Select Brand -> Overview (read-only)
  +-- Reports -> Preview (cannot download)

### 42.4 Navigation Structure (Sidebar)

Main navigation items in order:
1. Executive Summary (always visible)
2. Brands (expandable: list of brands + Add Brand button)
3. Live Feed (real-time mention stream)
4. Crisis Dashboard (badge count if active crises)
5. Strategy Hub (Tone Checker, Campaign Optimizer, Persona Matcher)
6. Reports (Scheduled Reports, Report Builder)
7. Settings (Profile, Notifications, API Keys, Webhooks, Billing)
8. Admin section (Super Admin only): Users & Tenants, Agents, Monitoring, Billing

### 42.5 URL Structure & Routing Convention

| Pattern | Example | Description |
|---------|---------|-------------|
| /dashboard/:section | /dashboard/executive-summary | Top-level dashboard sections |
| /dashboard/brands/:id/:subsection | /dashboard/brands/abc123/sentiment | Brand-specific pages |
| /dashboard/live-feed/:filter | /dashboard/live-feed/by-platform | Filtered feed views |
| /dashboard/crisis/:id/:action | /dashboard/crisis/456/triage | Crisis-specific operations |
| /admin/:module/:id/:action | /admin/users/789/edit | Admin CRUD operations |
| /docs/:resource | /docs/api | Documentation pages |

**Query parameter conventions:**
- ?brandId= -- Filter by brand (multi-select with comma)
- ?period= -- Time range: 24h, 7d, 30d, 90d, custom
- ?platform= -- Platform filter: twitter, instagram, tiktok, etc.
- ?sentiment= -- Sentiment filter: positive, negative, neutral
- ?page=&limit= -- Pagination (default page=1, limit=20)
- ?search= -- Full-text search within mentions
- ?from=&to= -- Custom date range (ISO 8601)

---

## 43. UI/UX Design Specifications

### 43.1 Page Layout Specifications

**Executive Summary Dashboard Layout:**
- Header: Brand Selector | Period Picker | User Menu
- Sidebar (Navigation) - 280px fixed width
- Main area:
  - Brand Health Score [Gauge: 78/100] with trend (hero: 480x320px)
  - Volume Trend [Line chart] | Sentiment Pie [Donut] (320x280px each)
  - Emotion Distribution [Bar chart] | Alert Status [Green/Yellow/Red] (320x280px each)
  - Top Mentions [Table: 5 rows] (full width x 400px)
  - Trending Keywords [Tag Cloud] (full width x 200px)
- Sidebar: 280px fixed, collapsible to 64px (icon-only mode)
- Widget grid: Auto-fill, min 320px per widget
- Gap: 16px, Padding outer: 24px

**Brand Sentiment Page:**
- Header: Brand Name | Period Picker | Compare [Competitor Select]
- Left: Sentiment Trend (7d) [Line chart with moving avg overlay]
- Right: Emotion Breakdown (Joy, Trust, Anger, Sad, Fear horizontal bars)
- Full width: Mention Feed [Virtual scroll - infinite]
  - Each mention card: Sentiment icon [@user] "Content" | Hearts Comments Shares time platform
- Interactions: Hover chart line -> tooltip; Click emotion bar -> filter feed by emotion; Mention card hover -> scale(1.01) + shadow elevation; Click mention -> expand inline

**Crisis Dashboard Layout:**
- Banner: "CRISIS MODE - Active", Alert description, [Resolve] [Escalate] buttons
- Crisis Timeline: Normal -> 1st Post (IG) -> Viral (X) -> Media Picked Up -> (Now)
- Left panel: Source Trace (Author, follower count, original post)
- Right panel: Auto-Response Draft with tone selector (Formal/Casual/Personal) + [Send] [Edit]
- Metrics bar: Volume: 12.5K (+890%) | Sentiment: 4% positive

**Crisis Mode Visual States:**
| Level | Header Color | Banner Effect | Widget Border | Animation |
|-------|:-----------:|:-------------:|:-------------:|:---------:|
| Critical | #DC2626 (red) | Pulse glow rgba(220,38,38,0.3) | Red 2px | Alert shake every 5s |
| High | #F97316 (orange) | Static glow | Orange 1.5px | Slow pulse |
| Medium | #EAB308 (yellow) | No glow | Yellow 1px | Static |
| Low | Transparent | None | Default | None |

**Admin Agent Management Page:**
- Header: Agent Management [+ Register New Agent] button
- Filters: [All Types v] [Status: Active v] [Search]
- Agent cards with: Status indicator, Agent name, instance count, queue depth, CPU%, Mem%, Uptime, [Configure]/[Restart] action

### 43.2 Interaction Design Specifications

| Element | Default | Hover | Active/Focus | Disabled | Transition |
|---------|---------|-------|--------------|----------|:----------:|
| Button (Primary) | bg-blue-600 | bg-blue-700 scale(1.02) | bg-blue-800 ring-2 | opacity-50 | 150ms |
| Button (Secondary) | border-gray-300 | border-gray-400 bg-gray-50 | bg-gray-100 | opacity-50 | 150ms |
| Button (Danger) | bg-red-600 | bg-red-700 | bg-red-800 ring-2 | opacity-50 | 150ms |
| Input Field | border-gray-300 | border-gray-400 | border-blue-500 ring-2 | bg-gray-100 | 200ms |
| Card/Widget | shadow-sm | shadow-md translateY(-2px) | shadow-lg | opacity-60 | 200ms |
| Table Row | bg-white | bg-gray-50 | bg-blue-50 | N/A | 100ms |
| Toast | Slide-in top-right | N/A | Swipe dismiss | N/A | 300ms |
| Modal | scale(0.95) opacity(0) | N/A | scale(1) opacity(1) | backdrop blur | 200ms |
| Mention Card | shadow-sm | shadow-md scale(1.01) | Expanded | N/A | 200ms |
| Drag Handle | cursor-grab | cursor-grabbing | shadow-lg | opacity-30 | 150ms |

**Drag & Drop Specs (Dashboard Widgets):**
- Grab handle: 6 dots icon at top-left of widget
- During drag: widget opacity 80%, dashed border on drop zone
- Drop zone highlight: blue border + scale(1.02)
- Animation: 200ms spring easing layout reflow
- Persist: Debounced save (500ms after last change)

### 43.3 Responsive Behavior

| Breakpoint | Width | Layout Behavior |
|:----------:|:-----:|-----------------|
| xs | < 640px | Single column, sidebar hidden (hamburger), widgets full width, tables horizontal scroll |
| sm | 640-767px | Single column, sidebar as slide-over, widgets full width |
| md | 768-1023px | 2-column grid, sidebar collapsed (icon mode), tables compact |
| lg | 1024-1279px | 3-column grid, sidebar expanded, tables normal |
| xl | 1280-1535px | 4-column grid, sidebar expanded, tables full |
| 2xl | 1536px+ | 4-column, sidebar expanded, container max 1600px centered |

**Responsive Component Adaptations:**

| Component | Desktop (>=1024px) | Tablet (768-1023px) | Mobile (<768px) |
|-----------|:-----------------:|:-------------------:|:---------------:|
| Sidebar | Fixed 280px | Icon mode 64px | Hidden, hamburger toggle |
| Navbar | Full with search | Compact with icons | Hamburger + title |
| Widget Grid | Multi-column auto-fill | 2-column | Single column |
| Mention Feed | Card grid (2 cols) | Card list | Single card stack |
| Charts | Full interactive | Compact | Simplified touch-friendly |
| Tables | Full columns | Hidden less-important columns | Horizontal scroll |
| Modals | Centered max 600px | Centered max 90vw | Full-screen slide-up |
| Date Picker | Inline calendar | Dropdown | Bottom sheet |
| Filter Bar | Horizontal row | Collapsible chips | Bottom sheet drawer |

### 43.4 Micro-interactions & Animation Specs

| Interaction | Animation | Duration | Easing |
|-------------|-----------|:--------:|:------:|
| Page transition | Fade in + slide up (8px) | 200ms | ease-out |
| Widget mount | Scale(0.97->1) + fade | 300ms | ease-out |
| Widget reorder | Spring layout reflow | 300ms | spring |
| Mention card appear | Slide in from right (20px) | 200ms | ease-out |
| Crisis alert banner | Slide down + glow pulse | 400ms | ease-out |
| Gauge fill | Arc draw 0 to value | 1.5s | ease-out |
| Number count up | Animated counter 0->value | 800ms | ease-out |
| Skeleton pulse | Opacity cycle 1->0.5->1 | 1.5s | ease-in-out |
| Toast enter | Slide from right + fade | 300ms | ease-out |
| Toast exit | Slide right + fade | 200ms | ease-in |
| Modal open | Scale(0.95->1) + backdrop fade | 200ms | ease-out |
| Modal close | Scale(1->0.95) + backdrop fade | 150ms | ease-in |
| Tooltip | Fade in | 150ms | ease-out |
| Error shake | TranslateX +/-5px 3x | 300ms | ease |
| Success checkmark | Circle draw + checkmark | 400ms | ease-out |

### 43.5 Component Props Documentation

**MentionCard:**
- mention: { id, platform, author: {username, displayName, avatarUrl?, followerCount}, content, media?, sentiment, sentimentScore, emotions[], engagement: {likes, comments, shares, views?}, timestamp, brandId, isCrisis? }
- variant: 'compact' | 'expanded' | 'minimal' (default: expanded)
- onReply, onAnalyze, onBookmark, onShare callbacks
- showAIInsights (default: true), showEngagement (default: true), expandable (default: true)
- className

**MetricWidget:**
- title, value (number|string), trend?: {direction, percentage}, icon?
- variant: 'default' | 'gauge' | 'donut' | 'stat'
- color: 'positive' | 'negative' | 'neutral' | 'warning' | 'info'
- size: 'sm' | 'md' | 'lg' (default: md)
- loading, onClick, tooltip, format, className

**BrandHealthGauge:**
- score (0-100), previousScore?, brandName
- size: 'sm' | 'md' | 'lg' (default: lg)
- animate (default: true), showThresholds (default: true)
- thresholds: { danger (default: 40), warning (default: 70) }
- onClick, className

**CrisisBanner:**
- crisis: { id, level, brandName, summary, volume: {current, increase}, startedAt, affectedPlatforms[], autoResponse? }
- onViewDetails, onResolve, onEscalate, onSendResponse callbacks
- compact (default: false), className

**DataTable:**
- data: T[], columns: { key, header, render?, sortable?, filterable?, width?, align? }[]
- variant: 'default' | 'compact' | 'striped'
- loading, emptyState (icon?, title, description?, action?)
- pagination: { page, totalPages, onPageChange, totalItems? }
- sortBy: { key, direction }, onSort, onRowClick, selectedRows[], onSelectionChange
- className

### 43.6 Accessibility Interaction Detail

| Interaction | Implementation | Keyboard | Screen Reader |
|-------------|---------------|:--------:|:-------------:|
| Drag & Drop | @dnd-kit/core + @dnd-kit/sortable | Tab -> Space grab -> Arrow move -> Space drop | "Widget: Brand Health Score. Press Space to start drag." |
| Tab Navigation | Natural tab order, skip links | Tab/Shift+Tab | Headings as landmarks |
| Modal | Focus trap, ESC to close | Tab cycles within modal | "Dialog: Crisis Detail. Press Escape to close." |
| Toast | role=alert + aria-live=polite | Focus to toast, Tab dismiss | "Alert: New crisis detected for Brand X." |
| Data Table | Virtual scroll with role=grid | Arrow keys navigate cells | Row and column headers announced |
| Chart (fallback) | Data table below chart | Skip to data table | "Sentiment trend chart. Skip to data table." |
| Autocomplete | Combobox with aria-activedescendant | Arrow keys suggestions, Enter select | "Search brands. 5 results available." |
| Infinite Scroll | aria-live=polite on new items | Focus stays on last item | "10 new mentions loaded automatically." |

## Appendices

### A. Performance Targets

| Metrik | Target |
|--------|--------|
| Dashboard page load | < 2s (TTFB + First Paint) |
| Real-time mention refresh | < 500ms (WebSocket) |
| Crisis alert delivery | < 30s (WA/Email) |
| NLP processing per mention | < 2s (batch processing) |
| API response time (p95) | < 500ms |
| API uptime | 99.9% |
| Max concurrent users | 10,000 |

### B. Glossary

| Istilah | Definisi |
|---------|----------|
| **Mention** | Satu percakapan/tulisan yang menyebut brand |
| **Sentimen** | Sikap emosional audiens terhadap brand |
| **Share of Voice** | Persentase percakapan brand vs total percakapan (termasuk kompetitor) |
| **Brand Health Score** | Composite metric: sentimen (60%) + volume (20%) + engagement (20%) |
| **Anomaly** | Penyimpangan signifikan dari pola normal percakapan |
| **Tenant** | Satu entitas klien (perusahaan/organisasi) yang menggunakan platform |

### C. Decision Log

| Date | Decision | Rationale | Alternatives Considered |
|------|----------|-----------|------------------------|
| 2026-05-26 | **Framework**: Next.js 15 (App Router) | Mature ecosystem, React Server Components, optimal untuk SSR dashboard + API dalam satu codebase | Remix, SvelteKit, Nuxt; Next.js menang karena ecosystem maturity + TypeScript first + Vercel deployment seamless |
| 2026-05-26 | **Architecture**: Modular Monolith | 6 modul perlu komunikasi cepat dan shared DB transactions. Microservices overkill untuk team size awal; split later jika diperlukan | Microservices (K8s), Serverless (AWS Lambda); monolith dipilih untuk time-to-market + operational simplicity |
| 2026-05-26 | **Database**: PostgreSQL + Prisma ORM | Relasi data kompleks, type-safe queries, migration management | MySQL, MongoDB, Drizzle; PostgreSQL menang untuk JSON support + ACID + maturity |
| 2026-05-26 | **LLM**: OpenAI (GPT-4o-mini batch, GPT-4o critical) | Faster time-to-market, token efficiency, Bahasa Indonesia support baik | Claude (comparable), self-hosted Llama (higher ops), Gemini (weaker Bahasa Indonesia) |
| 2026-05-26 | **Payment**: Stripe | Global coverage, webhook ecosystem, subscription management matang | Midtrans/Xendit (local but limited global); Lemon Squeezy (less flexible) |
| 2026-05-26 | **Queue**: Bull + Redis | Mature, persistent jobs, retry logic, rate limiting built-in | RabbitMQ (overkill), Kafka (too heavy), Inngest (vendor lock-in) |
| 2026-05-26 | **Caching + Session**: Redis | Multi-purpose (session, cache, queue backend), familiar | Memcached (no persistence), Dragonfly (less proven) |
| 2026-05-26 | **Search**: Elasticsearch | Full-text search untuk mention + source tracing; Indonesian language analyzer matang | Meilisearch (less powerful queries), Typesense (smaller ecosystem), PostgreSQL FTS (ok for MVP only) |
| 2026-05-26 | **Storage**: Cloudflare R2 | S3-compatible, no egress fees, edge caching | AWS S3 (higher egress), MinIO (more ops) |
| 2026-05-26 | **Real-Time**: WebSocket (Socket.io) | Bi-directional, auto-reconnect, fallback polling, room subscriptions | SSE (uni-directional), Supabase Realtime (vendor lock-in) |
| 2026-05-26 | **Auth**: NextAuth.js v5 | Built for Next.js, multi-provider, database session, TypeScript native | Clerk (expensive at scale), Auth0 ($2K+/mo), Supabase Auth (tight coupling) |
| 2026-05-26 | **State Mgmt**: TanStack Query + Zustand | TanStack for server cache/revalidation; Zustand (1KB) for UI state | Redux Toolkit (too boilerplate), Jotai (less ecosystem), Context API (re-render issues) |
| 2026-05-26 | **Charting**: Recharts | React-native, composable, good defaults | D3.js (steeper curve), Nivo (smaller community), Chart.js (less React-friendly) |
| 2026-05-26 | **CSS**: Tailwind 4.x + Shadcn/ui | Utility-first + accessible components; Tailwind v4 CSS-first config, faster builds | Styled Components (runtime cost), CSS Modules (no primitives), MUI (heavy) |
| 2026-05-26 | **Form**: React Hook Form + Zod | Performant (uncontrolled), TypeScript inference, shared validation | Formik (more re-renders), Native HTML (limited) |
| 2026-05-26 | **Testing**: Vitest + Playwright | Vitest fastest (ESM native); Playwright industry standard, auto-wait, multi-browser | Jest (slower), Cypress (slower, limited browser) |
| 2026-05-26 | **CI/CD**: GitHub Actions | GitHub integrated, free 2K min/mo, large marketplace | GitLab CI (needs GitLab), CircleCI (paid), Jenkins (heavy) |
| 2026-05-26 | **Observability**: OTel + Grafana + Sentry | OTel standard for traces, Grafana metrics/logs, Sentry errors — all OSS except Sentry | Datadog ($15/host/mo), New Relic (expensive), AWS X-Ray (vendor lock-in) |
| 2026-05-26 | **Maps**: Mapbox GL JS + Leaflet fallback | Mapbox best heatmap customization; Leaflet free fallback | Google Maps ($200/1K loads), Deck.gl (too complex for v1) |
| 2026-05-26 | **Image Optimization**: Next.js Image + Sharp | Built-in optimization; Sharp for local visual scoring | Cloudinary ($89+/mo, vendor lock-in), imgix ($99+/mo) |
| 2026-05-26 | **Analytics**: PostHog (self-hosted) | Privacy-first, data stays in Indonesia, feature flags built-in | Google Analytics (illegal under UU PDP), Amplitude (expensive), Mixpanel |
| 2026-05-26 | **Container**: Docker + K8s (prod) | Docker dev parity; K8s auto-scaling for crawler workers | Serverless (crawler + NLP need long-running processes), Nomad (less ecosystem) |
| 2026-05-26 | **Hosting**: Vercel (staging) + AWS ECS (prod) | Vercel preview deploys; ECS Fargate for worker isolation, more infra control | Railway (less mature), Fly.io (limited Asia regions) |
| 2026-05-26 | **Mobile**: PWA first | Covers 90% use cases; native app not justified until >10K users | React Native (2x maintenance), Flutter (double codebase) |
| 2026-05-26 | **Compliance**: UU PDP + GDPR framework | Indonesia primary market (UU PDP wajib), GDPR for future EU expansion | Single-regulation approach too risky; dual framework ensures broader compliance |
| 2026-05-26 | Agent Architecture: Bull/Redis + Orchestrator | Distributed agents with health monitoring, auto-scaling, conflict resolution | Monolithic worker vs Celery vs Temporal |
| 2026-05-26 | Screen Flow: Sitemap-based per-role navigation | Clear navigation ensures UX predictability; supports 4 user roles | Single-page app vs multi-page layout |
| 2026-05-26 | UI/UX: Atomic Design + Shadcn/ui | Reusable component hierarchy ensures consistency; WCAG AA built-in | Material UI vs Ant Design vs custom system |

### D. File Change Log

| Date | Section | Change | Author |
|------|---------|--------|--------|
| 2026-05-26 | All | Initial document creation | AI Assistant |
| 2026-05-26 | 16-30 | Added enterprise sections: Risk Register, Cost Estimation, Testing Strategy, Monitoring, Error Handling, SLA, Analytics, Localization, Migration Strategy, Compliance Detail, Design System, Data Retention, Performance Budget, Disaster Recovery, Vendor Assessment | AI Assistant |
| 2026-05-26 | 10 | Expanded Project Structure with test/e2e/storybook/scripts/docs folders | AI Assistant |
| 2026-05-26 | 31-40 | Added data sourcing (legal vs workaround), webhook security, rate limiting, feature flags, WCAG, dependency mgmt, API docs, CSP/headers, cookie/CORS, mobile/PWA | AI Assistant |
| 2026-05-26 | Appendix C | Expanded Decision Log from 8 to 25 entries with alternatives considered | AI Assistant |
| 2026-05-26 | 41-43 | Added Agent Architecture (agent model, lifecycle, orchestration), Screen Flow (sitemap, page specs, per-role flows), UI/UX Design (design tokens, interaction specs, responsive behavior) | AI Assistant |

---

> **Dokumen ini adalah blueprint lengkap untuk Sentiment Platform.**  
> Setiap modul, entity, flow, endpoint, risiko, biaya, test, monitoring, compliance, dan disaster recovery telah didefinisikan secara detail untuk memandu implementasi enterprise-grade.
>
> _Last Updated: 2026-05-26_

---

> **Catatan:** Dokumen ini adalah **living document** — akan diperbarui seiring perkembangan implementasi. Gunakan sebagai referensi utama untuk pengambilan keputusan teknis dan arsitektural.
