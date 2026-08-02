// src/app/(public)/terms/page.tsx — Terms of Service

import type { Metadata } from 'next';
import Link from 'next/link';
import { PageContainer } from '@/shared/components/page-container';
import { routes } from '@/shared/config/routes';
import { siteConfig } from '@/shared/config/site-config';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms and conditions for using Migunani — browser-first productivity tools.',
  alternates: { canonical: `${siteConfig.url}/terms` },
};

export default function TermsPage() {
  return (
    <main className="flex-1 animate-page-enter">
      <PageContainer className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <li><Link href={routes.home} className="hover:text-foreground">Home</Link></li>
              <li aria-hidden>›</li>
              <li className="text-foreground">Terms of Service</li>
            </ol>
          </nav>

          <h1 className="text-4xl font-bold tracking-tight text-balance">Terms of Service</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: June 30, 2026</p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
            <section><h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2><p className="mt-3 text-pretty">By accessing or using Migunani ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p></section>
            <section><h2 className="text-lg font-semibold text-foreground">2. Description of Service</h2><p className="mt-3 text-pretty">Migunani provides browser-based productivity tools that run locally in your browser. The Service includes 5 tools in the image category.</p></section>
            <section><h2 className="text-lg font-semibold text-foreground">3. Use of the Service</h2><p className="mt-3 text-pretty">You agree to:</p><ul className="mt-2 space-y-1.5 pl-4"><li>• Use the Service only for lawful purposes</li><li>• Not attempt to reverse engineer the Service</li><li>• Not use automated scripts that may strain the Service</li></ul></section>
            <section><h2 className="text-lg font-semibold text-foreground">4. Accounts</h2><p className="mt-3 text-pretty">Account creation is optional. All tools work without an account. If you create an account, you are responsible for maintaining its security.</p></section>
            <section><h2 className="text-lg font-semibold text-foreground">5. Intellectual Property</h2><p className="mt-3 text-pretty">The Service is owned by Migunani and protected by intellectual property laws. You retain all rights to content you process using the tools.</p></section>
            <section><h2 className="text-lg font-semibold text-foreground">6. Privacy</h2><p className="mt-3 text-pretty">Your use is also governed by our <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.</p></section>
            <section><h2 className="text-lg font-semibold text-foreground">7. Disclaimer of Warranties</h2><p className="mt-3 text-pretty">The Service is provided "as is" without warranties of any kind. You use the Service at your own risk.</p></section>
            <section><h2 className="text-lg font-semibold text-foreground">8. Limitation of Liability</h2><p className="mt-3 text-pretty">In no event shall Migunani be liable for any indirect, incidental, special, or punitive damages.</p></section>
            <section><h2 className="text-lg font-semibold text-foreground">9. Contact</h2><p className="mt-3 text-pretty">Questions? Contact <a href="mailto:legal@migunani.app" className="text-accent hover:underline">legal@migunani.app</a>.</p></section>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
