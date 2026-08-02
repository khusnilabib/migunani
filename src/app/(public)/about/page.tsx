// src/app/(public)/about/page.tsx — About page

import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Zap, Globe, Accessibility, GitBranch, Heart } from 'lucide-react';
import { PageContainer } from '@/shared/components/page-container';
import { SectionHeading } from '@/shared/components/section-heading';
import { routes } from '@/shared/config/routes';
import { siteConfig } from '@/shared/config/site-config';
import { allManifests } from '@/generated/registry';

export const metadata: Metadata = {
  title: 'About',
  description: 'Migunani is a browser-first productivity platform. Learn about our mission and values.',
  alternates: { canonical: `${siteConfig.url}/about` },
};

const VALUES = [
  { icon: ShieldCheck, title: 'Privacy-first', description: 'Your data never leaves your device for core tools.' },
  { icon: Zap, title: 'Instant', description: 'Tools run in your browser. No server round-trip.' },
  { icon: Globe, title: 'Free', description: 'No account required. No paywalls on core tasks.' },
  { icon: Accessibility, title: 'Accessible', description: 'WCAG 2.1 AA compliant. Keyboard-first navigation.' },
  { icon: GitBranch, title: 'Open', description: 'Built on open standards. No vendor lock-in.' },
  { icon: Heart, title: 'Crafted', description: 'Every tool follows a standardized 7-stage lifecycle.' },
];

export default function AboutPage() {
  return (
    <main className="flex-1 animate-page-enter">
      <PageContainer className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <li><Link href={routes.home} className="hover:text-foreground">Home</Link></li>
              <li aria-hidden>›</li>
              <li className="text-foreground">About</li>
            </ol>
          </nav>

          <h1 className="text-4xl font-bold tracking-tight text-balance">About Migunani</h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            We're building the largest browser-first productivity platform — hundreds of practical tools that respect your privacy and run entirely in your browser.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <SectionHeading eyebrow="Mission" title="Privacy is not a feature. It's the foundation." />
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground text-pretty">
            <p>Most online tool sites upload your files to their servers. We believe there's a better way. Modern browsers can resize images, merge PDFs, format JSON — all without sending a single byte to a server.</p>
            <p>Migunani harnesses this power to give you tools that are faster, more private, and completely free. Your data never leaves your device.</p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <SectionHeading eyebrow="Values" title="What we stand for" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value) => (
              <Card key={value.title} className="card-interactive">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
                    <value.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Ready to try?</h2>
          <p className="mt-2 text-sm text-muted-foreground">Browse our {allManifests.length} tools and experience privacy-first productivity.</p>
          <Link href={routes.tools} className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.97]">
            Browse all tools
          </Link>
        </div>
      </PageContainer>
    </main>
  );
}
