// src/shared/components/site-footer.tsx — Premium footer with multiple columns.

import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';
import { BrandLogo } from '@/shared/components/brand-logo';
import { PageContainer } from './page-container';
import { categories } from '@/shared/config/categories';
import { routes } from '@/shared/config/routes';
import { siteConfig } from '@/shared/config/site-config';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <PageContainer className="py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <BrandLogo size="md" asLink={false} />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground text-pretty">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={`https://twitter.com/${siteConfig.twitterHandle.replace('@', '')}`}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Twitter"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Twitter className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="https://github.com"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="GitHub"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="mailto:hello@migunani.app"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          {/* Categories column */}
          <nav aria-label="Footer categories">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Categories
            </h2>
            <ul className="mt-4 space-y-2">
              {categories.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={routes.category(c.slug)}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources column */}
          <nav aria-label="Footer resources">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Resources
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href={routes.tools} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  All tools
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href={routes.dashboard} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Sitemap
                </Link>
              </li>
              <li>
                <Link href="/feed.xml" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  RSS feed
                </Link>
              </li>
            </ul>
          </nav>

          {/* Platform column */}
          <nav aria-label="Footer platform">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Platform
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href={routes.admin} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Admin
                </Link>
              </li>
              <li>
                <Link href="/api/health" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Health check
                </Link>
              </li>
              <li>
                <Link href={routes.login} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href={routes.register} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Create account
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Privacy notice */}
        <div className="mt-12 rounded-lg bg-muted/50 p-4">
          <p className="text-xs text-muted-foreground text-pretty">
            <span className="font-medium text-foreground">Privacy-first.</span>{' '}
            All core tools run client-side. Your files never leave your browser unless explicitly required.
            No tracking, no analytics on tool input or output.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Tailwind CSS, and respect for your privacy.
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}
