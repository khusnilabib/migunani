// src/app/(public)/tools/page.tsx — All tools listing page.

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ImageIcon, Search as SearchIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageContainer } from '@/shared/components/page-container';
import { allManifests } from '@/generated/registry';
import { navigation } from '@/generated/navigation';
import { routes } from '@/shared/config/routes';
import { siteConfig } from '@/shared/config/site-config';

export const metadata: Metadata = {
  title: 'All Tools — Browser-First Image Tools',
  description: 'Browse every Migunani image tool — resize, compress, crop, rotate, and convert, all running locally in your browser.',
  alternates: { canonical: `${siteConfig.url}/tools` },
};

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  image: ImageIcon,
};

export default function AllToolsPage() {
  return (
    <main className="flex-1 animate-page-enter">
      {/* Hero — compact */}
      <section className="border-b border-border bg-gradient-mesh">
        <PageContainer className="py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <li><Link href={routes.home} className="hover:text-foreground">Home</Link></li>
              <li aria-hidden>›</li>
              <li className="text-foreground">All Tools</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">All Tools</h1>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">
            {allManifests.length} tools across {navigation.length} categories. All run locally in your browser.
          </p>
        </PageContainer>
      </section>

      {/* Tools grouped by category */}
      <PageContainer className="py-10 sm:py-14">
        <div className="space-y-12">
          {navigation.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.category] ?? SearchIcon;
            return (
              <div key={cat.category}>
                {/* Category header */}
                <div className="mb-4 flex items-center justify-between">
                  <Link href={routes.category(cat.category)} className="group flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="h-4 w-4" aria-hidden />
                    </div>
                    <h2 className="text-lg font-semibold capitalize">{cat.category} Tools</h2>
                    <Badge variant="secondary" className="text-xs">{cat.tools.length}</Badge>
                  </Link>
                </div>

                {/* Tool grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={routes.tool(tool.category, tool.slug)}
                      className="group"
                    >
                      <Card className="card-interactive h-full">
                        <CardContent className="flex flex-col gap-2 p-4">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-foreground text-sm">{tool.title}</h3>
                            <ArrowUpRight
                              className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden
                            />
                          </div>
                          <p className="line-clamp-2 text-xs text-muted-foreground">
                            {tool.description}
                          </p>
                          <Badge variant="outline" className="mt-auto w-fit text-[10px] capitalize">
                            {tool.lifecycle}
                          </Badge>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </PageContainer>
    </main>
  );
}
