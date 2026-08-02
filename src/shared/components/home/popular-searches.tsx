// src/shared/components/home/popular-searches.tsx — Popular searches section.

import Link from 'next/link';
import { TrendingUp, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PageContainer } from '@/shared/components/page-container';
import { SectionHeading } from '@/shared/components/section-heading';
import { allManifests } from '@/generated/registry';
import { routes } from '@/shared/config/routes';

const POPULAR_SEARCHES = [
  'resize image',
  'compress image',
  'convert to webp',
  'crop image',
  'rotate image',
  'png to jpg',
  'reduce image size',
  'jpg to webp',
];

export function PopularSearches() {
  // Flatten all keywords for the tag cloud
  const allKeywords = allManifests
    .flatMap((m) => m.seo.keywords)
    .filter((k, i, arr) => arr.indexOf(k) === i)
    .slice(0, 12);

  return (
    <section aria-labelledby="popular-searches-heading" className="border-b border-border bg-background">
      <PageContainer className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Discover"
          title="Popular searches"
          description="What the community is looking for right now."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {POPULAR_SEARCHES.map((term, idx) => (
            <Link key={term} href={`/?q=${encodeURIComponent(term)}`}>
              <Badge
                variant={idx < 3 ? 'default' : 'secondary'}
                className="cursor-pointer gap-1 px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {idx < 3 && <TrendingUp className="h-3 w-3" aria-hidden />}
                {term}
              </Badge>
            </Link>
          ))}
        </div>

        {/* Keyword tag cloud */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Search className="h-4 w-4" aria-hidden />
              Browse by keyword
            </div>
            <div className="flex flex-wrap gap-2">
              {allKeywords.map((kw) => (
                <Link key={kw} href={`/?q=${encodeURIComponent(kw)}`}>
                  <span className="cursor-pointer rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground transition-all hover:border-accent hover:bg-accent/10 hover:text-accent">
                    {kw}
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </PageContainer>
    </section>
  );
}
