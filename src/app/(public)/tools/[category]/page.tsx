// src/app/(public)/tools/[category]/page.tsx — Premium category page.

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageContainer } from '@/shared/components/page-container';
import { SectionHeading } from '@/shared/components/section-heading';
import { CategoryView } from './category-view';
import { registry, allManifests } from '@/generated/registry';
import { navigation } from '@/generated/navigation';
import { categories } from '@/shared/config/categories';
import { routes } from '@/shared/config/routes';
import { siteConfig } from '@/shared/config/site-config';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return {};

  const tools = registry.byCategory(category);
  return {
    title: `${cat.name} — ${tools.length} tools`,
    description: `${cat.description} All tools run locally in your browser. No sign-up required.`,
    alternates: { canonical: `${siteConfig.url}/tools/${category}` },
    openGraph: {
      title: `${cat.name} — Migunani`,
      description: cat.description,
      url: `${siteConfig.url}/tools/${category}`,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const tools = registry.byCategory(category);
  const otherCategories = navigation.filter((n) => n.category !== category).slice(0, 4);

  return (
    <main className="flex-1 animate-page-enter">
      {/* Hero */}
      <section
        aria-labelledby="category-title"
        className="border-b border-border bg-gradient-mesh"
      >
        <PageContainer className="py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <li>
                <Link href={routes.home} className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li>
                <Link href={routes.tools} className="transition-colors hover:text-foreground">
                  Tools
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li className="capitalize text-foreground">{category}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-3 capitalize">
              {tools.length} tools
            </Badge>
            <h1 id="category-title" className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              {cat.name}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              {cat.description}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{tools.length}</div>
                <p className="mt-1 text-xs text-muted-foreground">Total tools</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {tools.filter((t) => t.lifecycle === 'stable').length}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Stable</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {tools.filter((t) => t.execution === 'browser').length}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Browser-based</p>
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </section>

      {/* Interactive tool browser */}
      <section aria-labelledby="tools-heading" className="bg-background">
        <PageContainer className="py-12 sm:py-16">
          <h2 id="tools-heading" className="sr-only">Browse {category} tools</h2>
          <CategoryView category={category} />
        </PageContainer>
      </section>

      {/* Related categories */}
      <section aria-labelledby="related-categories-heading" className="border-t border-border bg-muted/30">
        <PageContainer className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Discover"
            title="Other categories"
            description="Explore tools in different categories."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherCategories.map((cat) => (
              <Link
                key={cat.category}
                href={routes.category(cat.category)}
                className="group block"
              >
                <Card className="card-interactive h-full">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold capitalize">{cat.category}</h3>
                      <ArrowUpRight
                        className="h-4 w-4 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {cat.tools.length} tools
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>
    </main>
  );
}
