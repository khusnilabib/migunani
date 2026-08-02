// src/shared/components/home/category-explorer.tsx — Interactive category explorer.

import Link from 'next/link';
import { ArrowUpRight, ImageIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageContainer } from '@/shared/components/page-container';
import { SectionHeading } from '@/shared/components/section-heading';
import { navigation } from '@/generated/navigation';
import { routes } from '@/shared/config/routes';

const CATEGORY_META: Record<string, {
  icon: React.ElementType;
  gradient: string;
  description: string;
}> = {
  image: {
    icon: ImageIcon,
    gradient: 'from-blue-500/10 to-blue-600/5',
    description: 'Resize, compress, crop, rotate, and convert images — all in your browser.',
  },
};

export function CategoryExplorer() {
  return (
    <section aria-labelledby="explorer-heading" className="border-b border-border bg-background">
      <PageContainer className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Explore"
          title="Category explorer"
          description="Dive deep into each category. Every tool is one click away."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {navigation.slice(0, 4).map((cat) => {
            const meta = CATEGORY_META[cat.category];
            const Icon = meta?.icon ?? ArrowUpRight;
            return (
              <Card key={cat.category} className="card-interactive overflow-hidden">
                <div className={`bg-gradient-to-br ${meta?.gradient ?? ''} p-6`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold capitalize">{cat.category} Tools</h3>
                        <p className="text-xs text-muted-foreground">{cat.tools.length} tools available</p>
                      </div>
                    </div>
                    <Link
                      href={routes.category(cat.category)}
                      className="rounded-md p-2 transition-colors hover:bg-background/50"
                      aria-label={`Browse all ${cat.category} tools`}
                    >
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{meta?.description}</p>
                </div>
                <CardContent className="p-6">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {cat.tools.map((tool) => (
                      <li key={tool.slug}>
                        <Link
                          href={routes.tool(tool.category, tool.slug)}
                          className="group flex items-center justify-between gap-2 rounded-md p-2 transition-colors hover:bg-muted"
                        >
                          <span className="truncate text-sm text-foreground">{tool.title}</span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-foreground"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
