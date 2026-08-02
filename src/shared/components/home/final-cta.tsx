// src/shared/components/home/final-cta.tsx — Optimized CTA + Newsletter (Sprint 16).
// Conversion-focused copy with specific value propositions.

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Mail, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { PageContainer } from '@/shared/components/page-container';
import { routes } from '@/shared/config/routes';

export function FinalCta() {
  return (
    <section aria-labelledby="cta-heading" className="bg-background">
      <PageContainer className="py-16 sm:py-20">
        <Card className="overflow-hidden border-border bg-gradient-mesh">
          <CardContent className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            {/* Left — CTA */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <Gift className="h-3.5 w-3.5" aria-hidden />
                Free forever
              </div>
              <h2 id="cta-heading" className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                Ready to work privately?
              </h2>
              <p className="text-sm text-muted-foreground text-pretty">
                Browse image tools that respect your privacy. No sign-up required.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild size="lg" className="h-12 px-6">
                  <Link href={routes.tools}>
                    Browse all tools
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-6">
                  <Link href="/about">
                    Learn more
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" aria-hidden />
                  No sign-up
                </span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" aria-hidden />
                  No tracking
                </span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" aria-hidden />
                  Free forever
                </span>
              </div>
            </div>

            {/* Right — Newsletter with optimized copy */}
            <div className="rounded-xl border border-border bg-background/50 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" aria-hidden />
                <h3 className="text-sm font-semibold">Get new browser tools every month</h3>
              </div>
              <p className="mb-4 text-xs text-muted-foreground text-pretty">
                Privacy-first productivity tips, early access to new features, and tool announcements.
                One email per month. No spam, ever.
              </p>
              <ul className="mb-4 space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-accent" aria-hidden />
                  New browser tools announced first
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-accent" aria-hidden />
                  Early access to new features
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-accent" aria-hidden />
                  We never share your email
                </li>
              </ul>
              <form className="flex flex-col gap-2">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="h-10"
                  aria-label="Email address"
                />
                <Button type="submit" size="sm" className="h-10">
                  Get new tools →
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </PageContainer>
    </section>
  );
}
