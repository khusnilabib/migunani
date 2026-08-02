// src/app/(public)/roadmap/page.tsx — Public roadmap with voting.

import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Circle, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageContainer } from '@/shared/components/page-container';
import { routes } from '@/shared/config/routes';
import { siteConfig } from '@/shared/config/site-config';
import { RoadmapVoting } from './roadmap-voting';

export const metadata: Metadata = {
  title: 'Roadmap — Migunani',
  description: 'See what we are building next. Vote on features and shape the future of Migunani.',
  alternates: { canonical: `${siteConfig.url}/roadmap` },
};

const COMPLETED = [
  { title: '5 Browser-First Image Tools', desc: 'Resize, compress, crop, rotate, and convert — all running locally.' },
  { title: 'Premium UI & Dark Mode', desc: 'Clean, minimal, responsive design with full dark mode support.' },
  { title: 'Search & Command Palette', desc: 'Raycast-like search overlay with keyboard navigation.' },
  { title: 'SEO & Structured Data', desc: 'JSON-LD, sitemap, RSS feed, OpenGraph, Twitter Cards.' },
  { title: 'Analytics Infrastructure', desc: 'GA4, Clarity, Web Vitals, event tracking.' },
];

const IN_PROGRESS = [
  { title: 'Premium Tier', desc: 'Cloud sync, batch processing, API access, priority support.', votes: 142 },
  { title: 'More Image Tools', desc: 'Background remover, watermark adder, GIF maker, ICO converter.', votes: 98 },
  { title: 'More PDF Tools', desc: 'PDF to image, image to PDF, OCR text extraction, PDF metadata editor.', votes: 87 },
];

const PLANNED = [
  { title: 'API Access', desc: 'Programmatic access to all tools via REST API.', votes: 65 },
  { title: 'Browser Extension', desc: 'Quick access to tools from any page via extension.', votes: 52 },
  { title: 'Tool Collections', desc: 'Save and share custom tool workflows.', votes: 38 },
  { title: 'Multi-language Support', desc: 'Interface in 10+ languages.', votes: 29 },
];

export default function RoadmapPage() {
  return (
    <main className="flex-1 animate-page-enter">
      <PageContainer className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <li><Link href={routes.home} className="hover:text-foreground">Home</Link></li>
              <li aria-hidden>›</li>
              <li className="text-foreground">Roadmap</li>
            </ol>
          </nav>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Product Roadmap</h1>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">
            See what we are building next. Vote on features and help shape the future of Migunani.
          </p>

          {/* Completed */}
          <section className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" aria-hidden />
              Completed
            </h2>
            <div className="space-y-2">
              {COMPLETED.map((item) => (
                <Card key={item.title} className="bg-muted/20">
                  <CardContent className="flex items-start gap-3 p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" aria-hidden />
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* In Progress */}
          <section className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Sparkles className="h-5 w-5 text-accent" aria-hidden />
              In Progress
            </h2>
            <div className="space-y-3">
              {IN_PROGRESS.map((item) => (
                <RoadmapVoting key={item.title} title={item.title} desc={item.desc} initialVotes={item.votes} status="in-progress" />
              ))}
            </div>
          </section>

          {/* Planned */}
          <section className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Circle className="h-5 w-5 text-muted-foreground" aria-hidden />
              Planned
            </h2>
            <div className="space-y-3">
              {PLANNED.map((item) => (
                <RoadmapVoting key={item.title} title={item.title} desc={item.desc} initialVotes={item.votes} status="planned" />
              ))}
            </div>
          </section>

          <div className="mt-12 text-center">
            <Link
              href={routes.tools}
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Explore Tools
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
