// src/shared/components/home/home-hero.tsx — Premium hero section.

import Link from 'next/link';
import { ArrowRight, Search, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { routes } from '@/shared/config/routes';

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-gradient-hero"
    >
      <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden />
      <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex justify-center animate-fade-in">
            <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs">
              <Sparkles className="h-3 w-3" aria-hidden />
              5 image tools and growing
            </Badge>
          </div>

          <h1
            id="hero-title"
            className="animate-fade-in-up text-4xl font-bold tracking-tight text-balance sm:text-5xl sm:leading-[1.1] lg:text-6xl"
          >
            Browser-first tools.
            <br />
            <span className="text-gradient-accent">Private by default.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl animate-fade-in-up text-base text-muted-foreground text-pretty sm:text-lg lg:text-xl">
            Resize images, merge PDFs, format JSON, and dozens more — all running locally
            in your browser. No accounts, no uploads, no tracking.
          </p>

          <form
            className="mx-auto mt-8 flex max-w-md items-center gap-2 animate-fade-in-up"
            action={routes.home}
            method="get"
            role="search"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                type="search"
                name="q"
                placeholder="Search image tools..."
                className="h-11 pl-9"
                aria-label="Search tools"
              />
            </div>
            <Button type="submit" size="lg" className="h-11">
              Search
            </Button>
          </form>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 animate-fade-in-up sm:flex-row">
            <Button asChild size="lg" className="h-11 px-6">
              <Link href={routes.tools}>
                Browse all tools
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-11 px-6">
              <Link href="/tools/image/image-resize">
                Try a tool
              </Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-accent" aria-hidden />
              Runs in your browser
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden />
              Private by design
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-accent" aria-hidden />
              No sign-up required
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
