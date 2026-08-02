# Architecture Documentation — Toolbox v1.0.0

## Table of Contents

1. [Overview](#overview)
2. [Governance](#governance)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Tool Engine](#tool-engine)
6. [Authentication](#authentication)
7. [Database](#database)
8. [Security](#security)
9. [Performance](#performance)
10. [Observability](#observability)
11. [SEO](#seo)
12. [Testing](#testing)

## Overview

Toolbox is a browser-first productivity ecosystem providing hundreds to thousands of practical tools without requiring software installation or account registration. The platform is built on six core principles:

1. **Privacy-first** — All core tool processing happens in the browser
2. **Speed** — Sub-second page loads, instant tool execution
3. **Simplicity** — Clean, distraction-free interface
4. **Accessibility** — WCAG 2.1 AA compliant
5. **Guest-first** — All tools work without registration
6. **Manifest-driven** — All tool metadata comes from Zod-validated manifests

## Governance

The platform follows a 6-layer governance system (priority high to low):

### 1. Architecture Locks (LOCK-01 to LOCK-12)

Immutable architectural constraints that cannot be changed without breaking the platform's core identity:
- LOCK-01: Browser-First Platform
- LOCK-02: Tools Run in Browser
- LOCK-03: Tool Engine Philosophy (7-stage lifecycle)
- LOCK-04: TypeScript Strict Mode
- LOCK-05: Zod Validation at All IO Boundaries
- LOCK-06: Database Optional
- LOCK-07: Guest-First
- LOCK-08: SEO from Manifest
- LOCK-09: Accessibility WCAG 2.1 AA
- LOCK-10: Performance Budget
- LOCK-11: Admin Console
- LOCK-12: Open Source

### 2. Engineering Constitution (EC-01 to EC-12)

Engineering standards for code quality, testing, and deployment.

### 3. Product Constitution (PC-01 to PC-10)

Product principles guiding feature decisions and UX.

### 4. Data & Growth Architecture (DGA-01 to DGA-10)

Data handling, analytics, and growth experiments.

### 5. Platform Ops Constitution (POC-01 to POC-10)

Operations, monitoring, and incident response.

### 6. Execution Contract (#52)

Immutable contract defining the relationship between code, tests, and deployment.

### ADRs

83 Architecture Decision Records (append-only) document every significant architectural choice.

## Technology Stack

### Core

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16+ |
| Language | TypeScript | 5 (strict) |
| Styling | Tailwind CSS | 4 |
| UI Components | shadcn/ui | New York |
| Icons | lucide-react | 0.525+ |
| Animation | framer-motion | 12+ |

### Data

| Layer | Technology |
|-------|-----------|
| Database | Supabase (Postgres) |
| ORM | Drizzle ORM |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Validation | Zod 4 |

### Infrastructure

| Layer | Technology |
|-------|-----------|
| Hosting | Vercel (Edge + Serverless) |
| CDN | Vercel Edge Network |
| Error Monitoring | Sentry |
| Analytics | Vercel Analytics |
| Package Manager | bun / pnpm |

### Testing

| Type | Tool |
|------|------|
| Unit/Integration | Vitest 4 |
| E2E | Playwright |
| Accessibility | @axe-core/playwright |
| Performance | Lighthouse CI |
| Coverage | v8 |

## Project Structure

```
toolbox/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (admin)/admin/           # 11 admin modules
│   │   ├── (auth)/                  # Login, register, dashboard
│   │   ├── (public)/tools/          # Dynamic tool routes
│   │   ├── api/                     # API routes
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Homepage
│   ├── components/ui/               # 30+ shadcn/ui components
│   ├── generated/                   # 8 auto-generated artifacts
│   ├── identity/                    # Auth + user data layer
│   │   ├── actions/                 # Server actions (auth, history, favorites, profiles, audit)
│   │   ├── hooks/                   # use-current-user
│   │   └── lib/                     # supabase-client, supabase-server
│   ├── shared/                      # Shared infrastructure
│   │   ├── components/              # Tool runtime, layout, SEO, command palette
│   │   ├── config/                  # site-config, env, categories, routes
│   │   ├── hooks/                   # 18+ React hooks
│   │   └── lib/                     # 16+ service libraries
│   └── tools/                       # 23 tool implementations
│       ├── image/                   # 5 tools + _shared/lib
│       ├── pdf/                     # 7 tools + _shared/lib
│       ├── developer/               # 6 tools + _shared/lib
│       └── text/                    # 5 tools + _shared/lib
├── packages/                        # Shared packages
│   ├── tool-engine/                 # ToolEngine<TInput, TOutput>
│   ├── types/                       # Shared TypeScript types
│   ├── analytics/                   # Vendor-neutral analytics adapter
│   └── utils/                       # Shared utilities
├── tests/                           # Test suites
│   ├── unit/                        # 252 unit tests
│   ├── integration/                 # 200 integration tests
│   ├── e2e/                         # 35 Playwright E2E tests
│   └── setup.ts                     # Vitest global setup
├── db/                              # Database
│   ├── schema.sql                   # Supabase schema (RLS, policies, triggers)
│   ├── schema.ts                    # Drizzle ORM schema
│   └── seed.ts                      # Seed script
├── docs/                            # 54 governance + architecture docs
├── scripts/                         # Code generation scripts
│   ├── generate-registry.ts         # Generates 8 artifacts from manifests
│   └── generate-tool-tests.ts       # Generates unit + integration tests
└── middleware.ts                    # Rate limiting, CSRF, bot protection
```

## Tool Engine

The Tool Engine (`packages/tool-engine/`) orchestrates a standardized 7-stage lifecycle for every tool:

### Stages

1. **Input** — Collect input from user (UI form)
2. **Validation** — Validate input against Zod schema
3. **Processing** — Execute core logic (browser-side)
4. **Preview** — Render output preview (React component)
5. **Download** — Package output for download
6. **History** — Persist to history (optional)
7. **Share** — Generate shareable representation (optional)

### ToolEngine Class

```typescript
class ToolEngine<TInput, TOutput> {
  constructor(stages: ToolStages<TInput, TOutput>, options?: ToolEngineOptions)
  execute(input: TInput): Promise<TOutput>
  download(output: TOutput): Promise<DownloadResult>
  saveHistory(slug: string, input: TInput, output: TOutput): Promise<HistoryEntry | null>
  share(output: TOutput): Promise<ShareResult | null>
  cancel(): void
  getState(): ToolEngineState<TOutput>
}
```

### Features

- **Retry support** — Configurable retries with exponential backoff
- **Middleware chain** — Interceptors around processing stage
- **Hooks** — `beforeStage`, `afterStage`, `onError`
- **Auto-analytics** — Emits standard events (tool_started, processing_completed, etc.)
- **Cancel support** — AbortController-based cancellation
- **Output validation** — Optional Zod schema for output

## Authentication

### Architecture

- **Provider**: Supabase Auth
- **Methods**: Email/password, Google OAuth
- **Session**: JWT in secure cookies (HttpOnly, Secure, SameSite=Lax)
- **Token refresh**: Automatic via middleware

### Guest-First (LOCK-07)

All 23 tools work without authentication. When Supabase is not configured or the user is not signed in:
- Tools execute normally
- History is stored locally (localStorage)
- Favorites are stored locally
- Cloud sync is unavailable

### Server Actions

Located in `src/identity/actions/`:
- `auth-actions.ts` — signIn, signUp, signOut, Google OAuth
- `history-actions.ts` — saveHistory, getRecentHistory, deleteHistory, clearAll
- `favorites-actions.ts` — toggleFavorite, getFavorites, isFavorited, trackToolView, recordSearch, recordDownload
- `profile-actions.ts` — getProfile, updateProfile
- `audit-actions.ts` — writeAuditLog, getRecentAuditLogs

## Database

### Schema

10 tables in Supabase Postgres:
- `profiles` — User profile (1:1 with auth.users)
- `tool_history` — Tool execution records
- `favorites` — User favorites
- `recently_viewed` — Recently viewed tools
- `search_history` — Search queries
- `downloads` — Download records
- `audit_logs` — Append-only audit trail
- `user_sessions` — Device tracking
- `feature_flags` — Server-side feature flags
- `tool_metadata` — Admin-managed tool config

### Row Level Security

Every table has RLS enabled with policies:
- Users can CRUD their own rows
- Service role bypasses RLS for admin operations
- Feature flags and tool metadata are publicly readable

### Triggers

- `handle_new_user` — Auto-creates profile on auth signup
- `touch_updated_at` — Auto-updates `updated_at` column

### Storage Buckets

- `tool-outputs` (public) — Tool output files
- `user-uploads` (private) — User-uploaded input files (per-user isolation)

## Security

### Headers

Configured in `next.config.ts`:
- `Content-Security-Policy` — Strict, with nonce support
- `Strict-Transport-Security` — HSTS (2 years, includeSubDomains, preload)
- `X-Frame-Options` — DENY
- `X-Content-Type-Options` — nosniff
- `Referrer-Policy` — strict-origin-when-cross-origin
- `Permissions-Policy` — camera, microphone, geolocation disabled
- `Cross-Origin-Opener-Policy` — same-origin
- `Cross-Origin-Resource-Policy` — same-origin
- `Cross-Origin-Embedder-Policy` — credentialless

### Middleware (`middleware.ts`)

- **Rate limiting** — Sliding window per-IP (auth: 5/min, API: 100/min)
- **CSRF protection** — Origin/Referer validation on POST/PUT/PATCH/DELETE
- **Bot protection** — User-Agent filtering on auth + API mutations
- **Session refresh** — Supabase token auto-refresh

### Rate Limiter (`src/shared/lib/rate-limiter.ts`)

In-memory sliding window with presets:
- strict (5/min) — auth endpoints
- moderate (30/min) — API endpoints
- lenient (100/min) — general API
- readOnly (200/min) — read-only endpoints
- toolExecution (20/min) — tool runs
- fileUpload (10/min) — file uploads

### Security Library (`src/shared/lib/security.ts`)

- `generateNonce()` — CSP nonce generation
- `escapeHtml()`, `stripHtml()` — Input sanitization
- `sanitizeFilename()` — Filename sanitization
- `scanFile()` — File scanning (size, MIME, extension, magic numbers)
- `setSecureCookie()`, `clearSecureCookie()` — Secure cookie helpers
- `constantTimeCompare()` — Timing-safe comparison
- `issueCsrfToken()`, `verifyCsrfToken()` — CSRF token management

## Performance

### Targets

- **Lighthouse Performance**: ≥ 95
- **LCP**: ≤ 2500ms
- **CLS**: ≤ 0.05
- **FCP**: ≤ 1800ms
- **TBT**: ≤ 200ms
- **TTI**: ≤ 3500ms

### Optimizations

#### Bundle Splitting (next.config.ts)

Custom webpack splitChunks configuration:
- `vendor-react` — React + ReactDOM
- `vendor-radix` — Radix UI primitives
- `vendor-pdf-lib` — PDF processing (async)
- `vendor-charts` — Chart libraries (async)
- `vendor-icons` — Icon libraries
- `vendor-common` — Other node_modules

#### Image Optimization

- AVIF + WebP formats
- 30-day cache TTL
- Lazy loading by default
- Responsive sizes
- `dangerouslyAllowSVG: false` (security)

#### Font Optimization

- `next/font` for automatic optimization
- Preload critical fonts
- `font-display: swap`

#### Caching

- Static assets: 1 year immutable
- Images: 30 days
- Sitemap/robots: 1 hour
- Service worker: no-cache

#### React Compiler

- Experimental React Compiler compatibility
- `optimizePackageImports` for tree-shaking large libraries

## Observability

### Sentry

- Error reporting with stack traces
- Performance traces (10% sample rate)
- Session replays (1% normal, 100% on errors)
- Breadcrumbs for navigation and web vitals
- Filtering for browser extension noise

### Vercel Analytics

- Page view tracking
- Web Vitals auto-collection
- Real User Monitoring (RUM)

### Web Vitals

Collected via `web-vitals` library:
- CLS (Cumulative Layout Shift)
- LCP (Largest Contentful Paint)
- FCP (First Contentful Paint)
- TTFB (Time to First Byte)
- INP (Interaction to Next Paint)

Posted to `/api/web-vitals` endpoint for logging.

### Health Check (`/api/health`)

Returns status of:
- Supabase connectivity
- Environment variables
- Memory usage

Status codes:
- 200 — healthy or degraded
- 503 — unhealthy

## SEO

### Metadata

Every page includes:
- `<title>` — Page-specific
- `<meta name="description">` — From manifest
- `<link rel="canonical">` — Absolute URL
- OpenGraph tags (title, description, image, type)
- Twitter Card tags
- `<meta name="robots">` — Index/follow directives

### JSON-LD Structured Data

- `Organization` — On homepage
- `WebSite` with `SearchAction` — On homepage
- `SoftwareApplication` — On every tool page
- `BreadcrumbList` — On every tool page
- `FAQPage` — On tool pages with FAQ

### Dynamic Routes

- `/sitemap.xml` — All tools + static pages
- `/robots.txt` — With sitemap reference
- `/feed.xml` — RSS feed of tools

### Manifest-Driven (LOCK-08)

All SEO metadata comes from the tool's `manifest.ts` file. The `generate-registry.ts` script extracts this metadata into `src/generated/seo-meta.ts` for runtime use.

## Testing

### Strategy

| Level | Tool | Count | Purpose |
|-------|------|-------|---------|
| Unit | Vitest | 252 | Test individual functions and modules |
| Integration | Vitest | 200 | Test tool manifest wiring and stages |
| E2E | Playwright | 35 | Test user flows in real browser |
| Accessibility | axe-core | 5 | WCAG 2.1 AA compliance |
| Performance | Lighthouse CI | 5 pages | Performance budgets |

### Coverage Targets

| Scope | Lines | Functions | Branches |
|-------|-------|-----------|----------|
| Domain (packages/) | ≥90% | ≥90% | ≥85% |
| Application (src/shared/lib) | ≥85% | ≥85% | ≥80% |
| Components (src/components) | ≥80% | ≥80% | ≥75% |
| Tool shared libs | ≥90% | ≥90% | ≥85% |

### Test Generation

`scripts/generate-tool-tests.ts` auto-generates:
- Unit tests for every tool's processing stage
- Integration tests for every tool's manifest + stages wiring

This ensures every new tool automatically gets test coverage.

### E2E Tests

Located in `tests/e2e/`:
- `home.spec.ts` — Homepage rendering, navigation, a11y
- `tool-happy-path.spec.ts` — 4 representative tools + all 23 routes reachable
- `auth.spec.ts` — Login/register form rendering
- `seo.spec.ts` — SEO metadata verification

### Continuous Integration

```bash
bun run verify  # lint + type-check + test + gen:registry
```

All checks must pass before deployment.
