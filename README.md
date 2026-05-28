# Sentri — Brand Sentiment & Social Listening Platform

Enterprise-grade AI-powered platform for monitoring, analyzing, and responding to brand perception across social media and the web.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 6 |
| UI | React 19, Tailwind CSS v4 |
| Charts | Recharts |
| Icons | Lucide React |
| Drag & Drop | @dnd-kit |
| Linting | ESLint 9 |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── admin/            # Tenant management, billing, API keys, users
│   ├── auth/             # Login, register, password reset
│   ├── dashboard/        # Executive summary, sentiment, crisis, strategy, reports
│   ├── docs/             # API docs & webhooks
│   └── page.tsx          # Landing page
├── components/           # Shared UI components
│   ├── admin/            # Admin panel components
│   ├── brand/            # Brand identity & DNA forms
│   ├── crisis/           # Crisis alerts & controls
│   ├── dashboard/        # Widgets: charts, gauges, KPIs
│   ├── feed/             # Social mention feed
│   ├── layout/           # Navbar, sidebar, breadcrumbs
│   ├── maps/             # Geospatial heatmap
│   ├── sentiment/        # Sentiment analysis widgets
│   ├── strategy/         # Campaign & persona tools
│   ├── ui/               # Primitives: button, card, table, dialog, etc.
│   └── wizard/           # Onboarding flow
└── ...
```

## Key Features

- **Brand DNA** — Define tone, voice, keywords, competitors, and visual identity
- **AI Sentiment Engine** — Real-time NLP sentiment analysis (positive/negative/neutral + emotions)
- **Social Listening** — Monitor Instagram, X, TikTok, Facebook, Google Reviews, news
- **Crisis Detection** — Anomaly spike alerts with auto-response drafts
- **Strategy Engine** — Content tone checker, campaign optimizer, audience matching
- **Command Center** — Drag-and-drop dashboard with KPI widgets, charts, and geo heatmaps
- **Admin Panel** — RBAC, tenant management, API keys, subscription & billing
