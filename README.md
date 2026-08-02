# Toolbox — Browser-First Productivity Ecosystem

> The largest browser-first online tools platform. Hundreds to thousands of practical tools, no software install, no account required.

[![Production Ready](https://img.shields.io/badge/status-PRODUCTION%20READY-brightgreen)]()
[![Version](https://img.shields.io/badge/version-1.0.0-blue)]()
[![Tests](https://img.shields.io/badge/tests-452%20passing-brightgreen)]()
[![Coverage](https://img.shields.io/badge/coverage-domain%20%E2%89%A590%25-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()

## Quick Start

### Prerequisites

- Node.js 20+ or Bun 1.3+
- pnpm or bun (recommended)
- Supabase project (optional — guest-first tools work without it)

### Installation

```bash
# Clone and install
git clone <repo-url>
cd toolbox
bun install

# Copy environment template
cp .env.example .env.local

# Generate tool registry + tests
bun run gen:registry
bun run gen:tests

# Start development server
bun run dev
```

Open http://localhost:3000 in your browser.

### Production Build

```bash
bun run build
bun run start
```

### Verification

```bash
# All checks in one command
bun run verify

# Or individually
bun run lint          # ESLint (0 errors)
bun run type-check    # TypeScript strict (0 errors)
bun run test          # Vitest (452 tests passing)
bun run gen:registry  # Regenerate tool registry
```

## Architecture

### Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Database | Supabase (Postgres/Auth/Storage) |
| ORM | Drizzle ORM |
| Validation | Zod (all IO boundaries) |
| Auth | Supabase Auth (email/password + Google OAuth) |
| Hosting | Vercel (Edge + Serverless) |
| Package Manager | pnpm / bun |

### Six-Layer Governance

1. **Architecture Locks** (LOCK-01 to LOCK-12) — Immutable architectural constraints
2. **Engineering Constitution** (EC-01 to EC-12) — Engineering standards
3. **Product Constitution** (PC-01 to PC-10) — Product principles
4. **Data & Growth Architecture** (DGA-01 to DGA-10) — Data and analytics
5. **Platform Ops Constitution** (POC-01 to POC-10) — Operations
6. **Execution Contract** (#52) — Immutable contract

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (admin)/admin/     # 11 admin modules
│   ├── (auth)/            # Login, register, dashboard
│   ├── (public)/tools/    # Dynamic tool routes
│   └── api/               # API routes (health, web-vitals)
├── components/ui/         # shadcn/ui components (30+)
├── generated/             # Auto-generated artifacts (8 files)
├── identity/              # Auth + user data (Supabase)
├── shared/                # Shared infrastructure
│   ├── components/        # Tool runtime, layout, SEO
│   ├── config/            # Site, env, categories, routes
│   ├── hooks/             # 15+ React hooks
│   └── lib/               # 12+ service libraries
└── tools/                 # 23 tool implementations
    ├── image/             # 5 tools
    ├── pdf/               # 7 tools
    ├── developer/         # 6 tools
    └── text/              # 5 tools

packages/
├── tool-engine/           # ToolEngine<TInput, TOutput> 7-stage lifecycle
├── types/                 # Shared TypeScript types
├── analytics/             # Vendor-neutral analytics adapter
└── utils/                 # Shared utilities
```

## Tool Engine

Every tool follows a standardized 7-stage lifecycle (LOCK-03):

```
Input → Validation → Processing → Preview → Download → History → Share
```

Each tool has:
- `manifest.ts` — Zod-validated manifest (SEO, schemas, limits, lifecycle)
- `stages/input.ts` — Input collection
- `stages/validation.ts` — Zod schema validation
- `stages/processing.ts` — Core logic (browser-side)
- `stages/preview.tsx` — React preview component
- `stages/download.ts` — Output packaging
- `components/InputForm.tsx` — UI form

## Available Tools (23)

### Image (5)
- Image Resize, Compress, Crop, Rotate, Format Converter

### PDF (7)
- PDF Merge, Split, Compress, Rotate, Extract Pages, Protect, Unlock

### Developer (6)
- Base64 Encoder, URL Encoder, UUID Generator, JWT Decoder, JSON Formatter, Hash Generator

### Text (5)
- Case Converter, Word Counter, Remove Duplicate Lines, Sort Lines, Text Diff

## Testing

| Type | Count | Coverage Target |
|------|-------|----------------|
| Unit tests | 252 | Domain ≥90%, App ≥85%, Components ≥80% |
| Integration tests | 200 | All 23 tools have manifest + stages wiring tests |
| E2E (Playwright) | 35 | Homepage, 4 representative tools, all 23 routes reachable |
| Accessibility | 5 | WCAG 2.1 AA structural checks |
| Lighthouse CI | 5 pages | Performance ≥95, A11y/SEO/BP ≥100 |

```bash
bun run test              # Vitest (unit + integration)
bun run test:coverage     # With coverage report
bun run test:e2e          # Playwright E2E
bun run lighthouse        # Lighthouse CI
```

## Security

- **CSP** — Strict Content-Security-Policy with per-request nonce support
- **CSRF** — Origin/Referer header validation on state-changing requests
- **Rate Limiting** — In-memory sliding window (auth: 5/min, API: 100/min)
- **Bot Protection** — User-Agent filtering on auth + API mutation endpoints
- **RLS** — Row-Level Security on all Supabase tables (per-user isolation)
- **Secure Cookies** — HttpOnly, Secure, SameSite=Lax defaults
- **Input Sanitization** — HTML escape, filename sanitization, file scanning
- **Audit Logs** — Append-only, service-role writes, user-readable

## Monitoring

- **Sentry** — Error reporting, performance traces, session replays
- **Vercel Analytics** — Page views, Web Vitals
- **Web Vitals** — CLS, LCP, FCP, TTFB, INP collection via `/api/web-vitals`
- **Health Check** — `/api/health` returns status of Supabase, env, memory
- **Admin Dashboard** — `/admin/health` shows live health status

## SEO

- **Canonical URLs** — Every page has `<link rel="canonical">`
- **OpenGraph** — title, description, image, type
- **Twitter Card** — summary_large_image
- **JSON-LD** — Organization, WebSite, SoftwareApplication, BreadcrumbList, FAQPage, SearchAction
- **Sitemap** — Dynamic `/sitemap.xml` (all tools + static pages)
- **RSS Feed** — `/feed.xml` for new tools
- **robots.txt** — Dynamic with sitemap reference

## UX Polish

- **Command Palette** — Cmd+K / Ctrl+K opens fuzzy search across all tools
- **Keyboard Shortcuts** — `g h` (home), `g d` (dashboard), `/` (search), `?` (help)
- **Optimistic UI** — Instant updates with rollback on failure
- **Autosave** — Debounced localStorage persistence with optional cloud sync
- **Undo** — Cmd+Z / Ctrl+Z for destructive actions
- **Loading Skeletons** — Shimmer placeholders during async loads
- **Toast Notifications** — Semantic variants (success, error, warning, info)

## Admin Console

Available at `/admin` (11 modules):
1. Dashboard — KPI overview
2. Users — User management
3. Tools — Tool inventory
4. SEO — Per-tool SEO audit
5. Analytics — Funnel metrics
6. Audit Trail — Immutable action log
7. Feature Flags — Toggle and rollout
8. Monitoring — Sentry, Vercel Analytics status
9. Settings — Platform configuration
10. Content — Category management
11. System Health — Live health checks

## Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Set environment variables (see `.env.example`)
3. Deploy — Vercel auto-detects Next.js

### Environment Variables

```bash
# Required
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Supabase (optional — guest-first works without)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Monitoring (optional)
NEXT_PUBLIC_SENTRY_DSN=...
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=...

# Database (Prisma — optional)
DATABASE_URL=...
```

### Database Setup

```bash
# Apply Supabase schema (RLS, policies, triggers, storage buckets)
psql $DATABASE_URL -f db/schema.sql

# Seed feature flags + tool metadata
bun run db/seed.ts > db/seed.sql
psql $DATABASE_URL -f db/seed.sql
```

## Documentation

- [Architecture Documentation](docs/02_SAD.md)
- [Tech Stack](docs/04_TechStack.md)
- [Tool Manifest Specification](docs/12_ToolManifestSpecification.md)
- [Coding Standards](docs/08_CodingStandards.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Release Notes](RELEASE_NOTES.md)

## License

MIT — See [LICENSE](LICENSE) for details.
