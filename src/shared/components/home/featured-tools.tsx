// src/shared/components/home/featured-tools.tsx — Featured tools section.

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageContainer } from '@/shared/components/page-container';
import { SectionHeading } from '@/shared/components/section-heading';
import { allManifests } from '@/generated/registry';
import { routes } from '@/shared/config/routes';

const FEATURED_SLUGS = [
  'image-resize',
  'image-compress',
  'image-format-convert',
  'image-crop',
  'image-rotate',
];

export function FeaturedTools() {
  const featured = FEATURED_SLUGS.map((slug) => allManifests.find((m) => m.slug === slug)).filter(
    Boolean,
  ).slice(0, 6);

  return (
    <section aria-labelledby="featured-heading" className="border-b border-border bg-background">
      <PageContainer className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Featured"
          title="Most-used tools"
          description="Quick access to the tools our community reaches for every day."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tool) => (
            <li key={tool!.slug}>
              <Link
                href={routes.tool(tool!.category, tool!.slug)}
                className="group block h-full"
              >
                <Card className="card-interactive h-full">
                  <CardContent className="flex flex-col gap-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{tool!.title}</h3>
                        <Badge variant="outline" className="mt-1.5 text-xs capitalize">
                          {tool!.category}
                        </Badge>
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </div>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {tool!.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
