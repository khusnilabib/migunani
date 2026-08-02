// src/app/(public)/privacy/page.tsx — Privacy Policy

import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Lock } from 'lucide-react';
import { PageContainer } from '@/shared/components/page-container';
import { routes } from '@/shared/config/routes';
import { siteConfig } from '@/shared/config/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Migunani handles your data. Privacy-first by design — all core tools run in your browser.',
  alternates: { canonical: `${siteConfig.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 animate-page-enter">
      <PageContainer className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <li><Link href={routes.home} className="hover:text-foreground">Home</Link></li>
              <li aria-hidden>›</li>
              <li className="text-foreground">Privacy Policy</li>
            </ol>
          </nav>

          <h1 className="text-4xl font-bold tracking-tight text-balance">Privacy Policy</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: June 30, 2026</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Card className="bg-muted/30"><CardContent className="flex items-center gap-3 p-4"><Lock className="h-5 w-5 shrink-0 text-accent" aria-hidden /><div><p className="text-sm font-semibold">Browser-first</p><p className="text-xs text-muted-foreground">Tools run locally, data never leaves</p></div></CardContent></Card>
            <Card className="bg-muted/30"><CardContent className="flex items-center gap-3 p-4"><ShieldCheck className="h-5 w-5 shrink-0 text-accent" aria-hidden /><div><p className="text-sm font-semibold">No tracking on tools</p><p className="text-xs text-muted-foreground">We don't track tool input or output</p></div></CardContent></Card>
          </div>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
            <section><h2 className="text-lg font-semibold text-foreground">1. Our Privacy Philosophy</h2><p className="mt-3 text-pretty">Migunani is built on a simple principle: your data belongs to you. All our image tools run entirely in your browser. Your files, text, and data never leave your device unless you explicitly choose to create an account.</p></section>
            <section><h2 className="text-lg font-semibold text-foreground">2. Information We Collect</h2><p className="mt-3 font-medium text-foreground">When you use tools (no account):</p><ul className="mt-2 space-y-1.5 pl-4"><li>• Tool input and output: Processed entirely in your browser. Never transmitted.</li><li>• Analytics events: Anonymous, aggregated events for product improvement.</li><li>• Local storage: Your favorites, history, and preferences stored locally.</li></ul><p className="mt-4 font-medium text-foreground">When you create an account:</p><ul className="mt-2 space-y-1.5 pl-4"><li>• Email address: Used for authentication.</li><li>• Profile information: Display name, avatar (optional).</li><li>• Tool history and favorites: Synced for cross-device access.</li></ul></section>
            <section><h2 className="text-lg font-semibold text-foreground">3. How We Use Your Information</h2><ul className="mt-3 space-y-1.5 pl-4"><li>• To provide and improve our tools and services</li><li>• To authenticate your account and sync your data</li><li>• To understand which tools are most used (aggregated, anonymous)</li><li>• To send you service announcements (if you subscribe)</li></ul><p className="mt-3 text-pretty">We never use your data to build advertising profiles, sell to third parties, or train AI models.</p></section>
            <section><h2 className="text-lg font-semibold text-foreground">4. Cookies and Local Storage</h2><ul className="mt-3 space-y-1.5 pl-4"><li>• Authentication cookies: Required for login (if you create an account).</li><li>• Theme preference: Stores your light/dark mode choice.</li><li>• Local storage: Stores favorites, history, and preferences locally.</li></ul><p className="mt-3 text-pretty">We do not use third-party tracking cookies, advertising cookies, or social media pixels.</p></section>
            <section><h2 className="text-lg font-semibold text-foreground">5. Data Security</h2><ul className="mt-3 space-y-1.5 pl-4"><li>• HTTPS encryption for all communications</li><li>• Row-Level Security (RLS) on all database tables</li><li>• Content-Security-Policy (CSP) headers</li><li>• CSRF protection on all state-changing requests</li><li>• Rate limiting to prevent abuse</li></ul></section>
            <section><h2 className="text-lg font-semibold text-foreground">6. Your Rights</h2><ul className="mt-3 space-y-1.5 pl-4"><li>• Access your personal data</li><li>• Correct inaccurate data</li><li>• Delete your account and associated data</li><li>• Export your data</li><li>• Object to processing</li><li>• Withdraw consent at any time</li></ul><p className="mt-3 text-pretty">To exercise these rights, contact us at <a href="mailto:privacy@migunani.app" className="text-accent hover:underline">privacy@migunani.app</a>.</p></section>
            <section><h2 className="text-lg font-semibold text-foreground">7. Third-Party Services</h2><ul className="mt-3 space-y-1.5 pl-4"><li>• Supabase: Authentication and database (only when you create an account)</li><li>• Vercel: Hosting and analytics (aggregated, anonymous)</li><li>• Sentry: Error monitoring (no personal data sent)</li></ul></section>
            <section><h2 className="text-lg font-semibold text-foreground">8. Contact Us</h2><p className="mt-3 text-pretty">Email: <a href="mailto:privacy@migunani.app" className="text-accent hover:underline">privacy@migunani.app</a></p></section>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
