// src/shared/components/home/tool-collections.tsx — Tool collections section.

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageContainer } from '@/shared/components/page-container';
import { SectionHeading } from '@/shared/components/section-heading';
import { allManifests } from '@/generated/registry';
import { routes } from '@/shared/config/routes';

const COLLECTIONS = [
  {
    title: 'Resize & Compress',
    description: 'Shrink dimensions and file size without leaving your browser.',
    slugs: ['image-resize', 'image-compress'],
    accent: 'from-blue-500/10 to-blue-600/5',
  },
  {
    title: 'Crop & Rotate',
    description: 'Frame the shot and fix orientation in a couple of clicks.',
    slugs: ['image-crop', 'image-rotate'],
    accent: 'from-purple-500/10 to-purple-600/5',
  },
  {
    title: 'Format Conversion',
    description: 'Convert between PNG, JPEG, and WebP with full quality control.',
    slugs: ['image-format-convert'],
    accent: 'from-green-500/10 to-green-600/5',
  },
];

export function ToolCollections() {
  return (
    <section aria-labelledby="collections-heading" className="border-b border-border bg-background">
      <PageContainer className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Collections"
          title="Curated tool bundles"
          description="Grouped by use case. Solve a complete workflow without leaving the platform."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {COLLECTIONS.map((collection) => {
            const tools = collection.slugs
              .map((slug) => allManifests.find((m) => m.slug === slug))
              .filter(Boolean);
            const firstTool = tools[0];
            if (!firstTool) return null;

            return (
              <Card key={collection.title} className="card-interactive overflow-hidden">
                <div className={`bg-gradient-to-br ${collection.accent} p-6`}>
                  <h3 className="text-lg font-semibold">{collection.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{collection.description}</p>
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <Link key={tool!.slug} href={routes.tool(tool!.category, tool!.slug)}>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary-foreground/10">
                          {tool!.title}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={routes.tool(firstTool.category, firstTool.slug)}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                  >
                    Start with {firstTool.title}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
