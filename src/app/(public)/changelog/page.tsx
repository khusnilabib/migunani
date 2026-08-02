// src/app/(public)/changelog/page.tsx — Changelog with timeline.

import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PageContainer } from '@/shared/components/page-container';
import { routes } from '@/shared/config/routes';
import { siteConfig } from '@/shared/config/site-config';

export const metadata: Metadata = {
  title: 'Changelog — Migunani',
  description: 'Track every update to Migunani — new features, improvements, and bug fixes.',
  alternates: { canonical: `${siteConfig.url}/changelog` },
};

const ENTRIES = [
  {
    version: 'v1.1.0',
    date: 'July 2026',
    tag: 'Major',
    changes: [
      'Rebranded to Migunani',
      'Premium homepage redesign — reduced to 6 sections',
      'Universal action bar: Download, Copy Result, Share, Modify Input',
      'Quality slider and Run button visibility fixes (Tailwind v4)',
      'File input detection fix for z.array(z.instanceof(File)) schemas',
      'Union enum options fix for select dropdowns',
      'Feedback widget after tool execution',
      'Analytics: result_copied, result_shared, favorite_toggled events',
      'Microsoft Clarity integration',
      'Roadmap page with voting',
      'Changelog page',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'June 2026',
    tag: 'Release',
    changes: [
      '23 production-ready browser-first tools',
      'Tool Engine with 7-stage lifecycle',
      'Manifest-driven architecture with Zod validation',
      'Registry auto-discovery with 8 generated artifacts',
      'Premium design system (monochrome + blue accent)',
      'Dark mode with full parity',
      'Responsive 375px–1920px',
      'SEO: JSON-LD, sitemap, RSS, robots.txt, OpenGraph, Twitter Card',
      'Search overlay (Cmd+K) with Raycast-like UX',
      'Admin console with 11 modules',
      'Supabase auth, history, favorites, audit logs',
      'Security: CSP, CSRF, rate limiting, bot protection',
      'Monitoring: Sentry, Web Vitals, health endpoint',
      '452 passing tests',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="flex-1 animate-page-enter">
      <PageContainer className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <li><Link href={routes.home} className="hover:text-foreground">Home</Link></li>
              <li aria-hidden>›</li>
              <li className="text-foreground">Changelog</li>
            </ol>
          </nav>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Changelog</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Every update to Migunani — new features, improvements, and fixes.
          </p>

          {/* Timeline */}
          <div className="mt-10 space-y-8">
            {ENTRIES.map((entry, idx) => (
              <div key={entry.version} className="relative">
                {/* Timeline line */}
                {idx < ENTRIES.length - 1 ? (
                  <div className="absolute left-[15px] top-10 h-full w-px bg-border" aria-hidden />
                ) : null}

                <div className="flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                    entry.tag === 'Release'
                      ? 'border-green-500 bg-green-500/10 text-green-600 dark:text-green-400'
                      : 'border-accent bg-accent/10 text-accent'
                  }`}>
                    {idx === 0 ? <Circle className="h-3 w-3 fill-current" aria-hidden /> : <CheckCircle2 className="h-4 w-4" aria-hidden />}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold">{entry.version}</h2>
                      <Badge variant={entry.tag === 'Release' ? 'default' : 'secondary'} className="text-xs">
                        {entry.tag}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{entry.date}</span>
                    </div>
                    <Card className="mt-3">
                      <CardContent className="p-4">
                        <ul className="space-y-2">
                          {entry.changes.map((change, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                              {change}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
