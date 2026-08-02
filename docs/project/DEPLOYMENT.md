# Deployment Guide — Toolbox v1.0.0

## Overview

This guide covers deploying Toolbox to production on Vercel, with optional Supabase, Sentry, and Vercel Analytics integration.

## Prerequisites

- Vercel account (free tier works)
- Supabase project (optional — guest-first tools work without it)
- Sentry project (optional — for error monitoring)
- Domain name (optional — Vercel provides free subdomain)

## Step 1: Environment Variables

Set the following in your Vercel project settings (or `.env.local` for local dev):

### Required

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Supabase (Optional — enables auth, history, favorites)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # Server-only, never expose
```

### Monitoring (Optional)

```bash
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=...
SENTRY_AUTH_TOKEN=...  # For source map uploads
```

### Database (Optional — Prisma for local dev)

```bash
DATABASE_URL=file:./db/custom.db  # SQLite for local
# Or for production Postgres:
DATABASE_URL=postgresql://...
```

## Step 2: Database Setup (If using Supabase)

### Apply Schema

1. Open your Supabase project SQL editor
2. Run the contents of `db/schema.sql`

This creates:
- 10 tables (profiles, tool_history, favorites, recently_viewed, search_history, downloads, audit_logs, user_sessions, feature_flags, tool_metadata)
- Row Level Security policies on every table
- Triggers for auto-profile creation and updated_at maintenance
- Storage buckets (tool-outputs public, user-uploads private)
- Storage policies

### Seed Data

```bash
# Generate seed SQL
bun run db/seed.ts > db/seed.sql

# Apply via Supabase SQL editor or psql
psql $DATABASE_URL -f db/seed.sql
```

This seeds:
- 8 feature flags (admin-console, history-persistence, share-links, etc.)
- 23 tool metadata rows (one per production tool)

### Configure Auth Providers

In Supabase dashboard → Authentication → Providers:

1. **Email** — Enable, configure email templates
2. **Google** — Enable, add OAuth credentials
3. **URLs** — Set Site URL to your production URL, add redirect URLs

## Step 3: Deploy to Vercel

### Option A: Git Integration (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. In Vercel dashboard: New Project → Import your repo
3. Vercel auto-detects Next.js — defaults are correct
4. Add environment variables (from Step 1)
5. Deploy

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel link  # Link to existing project or create new
vercel env pull  # Pull env vars to .env.local
vercel deploy --prod
```

### Build Configuration

Vercel auto-detects these from `package.json`:
- **Build Command**: `next build` (run by `bun run build`)
- **Output Directory**: `.next` (Next.js default)
- **Install Command**: `bun install` (auto-detected)

## Step 4: Post-Deployment Verification

### Health Check

```bash
curl https://your-domain.com/api/health
```

Expected response (200 OK):
```json
{
  "status": "healthy",
  "timestamp": "2026-...",
  "uptime": 123.45,
  "version": "1.0.0",
  "checks": [
    { "name": "supabase", "status": "healthy", "latencyMs": 45 },
    { "name": "environment", "status": "healthy" },
    { "name": "memory", "status": "healthy" }
  ]
}
```

### SEO Verification

```bash
# Sitemap
curl https://your-domain.com/sitemap.xml

# Robots
curl https://your-domain.com/robots.txt

# RSS feed
curl https://your-domain.com/feed.xml
```

### Lighthouse Audit

```bash
npm i -g @lhci/cli
lhci autorun
```

Targets:
- Performance ≥ 95
- Accessibility = 100
- SEO = 100
- Best Practices = 100

## Step 5: Configure Monitoring

### Sentry

1. Create a Sentry project (Next.js)
2. Set `NEXT_PUBLIC_SENTRY_DSN` env var
3. (Optional) Set `SENTRY_AUTH_TOKEN` for source map uploads
4. Verify error reporting by triggering a test error

### Vercel Analytics

1. Enable Vercel Analytics in Vercel dashboard → Analytics tab
2. Set `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` if using custom config
3. Web Vitals auto-reported via `/api/web-vitals`

### Search Console

1. Add your property to Google Search Console
2. Verify ownership (HTML meta tag or DNS)
3. Submit sitemap: `https://your-domain.com/sitemap.xml`

### Bing Webmaster

1. Add site to Bing Webmaster Tools
2. Verify ownership
3. Submit sitemap

## Step 6: Domain Configuration

### Custom Domain

1. In Vercel dashboard → Domains → Add
2. Add your domain (e.g., `toolbox.com`)
3. Configure DNS:
   - A record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`
4. Wait for SSL certificate (automatic)

### Update Environment

Update `NEXT_PUBLIC_SITE_URL` to your custom domain.

Re-deploy to apply changes.

## Rollback

### Vercel Rollback

1. Vercel dashboard → Deployments
2. Find the last known good deployment
3. Click "..." → "Promote to Production"

### Database Rollback

Supabase does not support point-in-time recovery on free tier.
For production, enable PITR (Pro plan).

## Troubleshooting

### Build Fails

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
bun install

# Rebuild
bun run build
```

### Type Errors

```bash
bun run type-check
```

All errors must be resolved before deployment. The build will fail on type errors.

### Lint Errors

```bash
bun run lint
bun run lint --fix  # Auto-fix where possible
```

### Tests Failing

```bash
bun run test
```

452 tests must pass. Failing tests block deployment.

### Supabase Connection Issues

1. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
2. Check Supabase project is not paused (free tier auto-pauses after 1 week inactivity)
3. Verify RLS policies allow the operation
4. Check network connectivity from Vercel region to Supabase region

### Rate Limiting Issues

If legitimate users are being rate-limited:
1. Check `/admin/monitoring` for rate limit metrics
2. Adjust limits in `middleware.ts` (RATE_LIMITS constant)
3. Consider distributed store (Redis/Vercel KV) for multi-instance deployments

## Performance Optimization

### Bundle Analysis

```bash
ANALYZE=true bun run build
```

### Image Optimization

Next.js Image component auto-optimizes:
- AVIF + WebP formats
- Responsive sizes
- Lazy loading
- 30-day cache

### CDN

Vercel Edge Network provides:
- Global CDN (28+ regions)
- Image optimization
- Edge functions
- Automatic Gzip + Brotli compression

## Security Checklist

- [ ] HTTPS enforced (HSTS header set)
- [ ] CSP header configured (per-request nonce)
- [ ] CSRF protection active (Origin/Referer check)
- [ ] Rate limiting active (auth + API endpoints)
- [ ] Bot protection active (auth + API mutations)
- [ ] Secure cookies (HttpOnly, Secure, SameSite=Lax)
- [ ] RLS enabled on all Supabase tables
- [ ] Storage buckets configured with policies
- [ ] Audit logs being written
- [ ] Sentry error reporting active
- [ ] No secrets in client-side code

## Support

- Documentation: `/docs` folder
- Issues: GitHub Issues
- Health: `https://your-domain.com/api/health`
