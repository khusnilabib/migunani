// src/shared/components/home/trending-tools.tsx — Trending tools section.

import Link from 'next/link';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageContainer } from '@/shared/components/page-container';
import { SectionHeading } from '@/shared/components/section-heading';
import { allManifests } from '@/generated/registry';
import { routes } from '@/shared/config/routes';

// Simulated trending scores (in production, these would come from analytics)
const TRENDING = [
  { slug: 'image-compress', score: 98, change: '+12%' },
  { slug: 'image-resize', score: 95, change: '+8%' },
  { slug: 'image-format-convert', score: 92, change: '+5%' },
  { slug: 'image-crop', score: 89, change: '+3%' },
  { slug: 'image-rotate', score: 87, change: '+2%' },
];

export function TrendingTools() {
  const tools = TRENDING.map((t) => ({
    ...t,
    manifest: allManifests.find((m) => m.slug === t.slug),
  })).filter((t) => t.manifest);

  return (
    <section aria-labelledby="trending-heading" className="bg-muted/30">
      <PageContainer className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Trending"
          title="Trending tools this week"
          description="The tools seeing the biggest surge in usage."
        />

        <Card className="mt-10 overflow-hidden">
          <CardContent className="p-0">
            <div className="divide-y border-border">
              {tools.map((tool, idx) => (
                <Link
                  key={tool.slug}
                  href={routes.tool(tool.manifest!.category, tool.manifest!.slug)}
                  className="group flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
                >
                  {/* Rank */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {idx + 1}
                  </div>

                  {/* Tool info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-sm font-semibold text-foreground">
                        {tool.manifest!.title}
                      </h3>
                      <Badge variant="outline" className="shrink-0 text-xs capitalize">
                        {tool.manifest!.category}
                      </Badge>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {tool.manifest!.description}
                    </p>
                  </div>

                  {/* Trend score */}
                  <div className="hidden shrink-0 items-center gap-2 sm:flex">
                    <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                      <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                      {tool.change}
                    </div>
                  </div>

                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </PageContainer>
    </section>
  );
}
