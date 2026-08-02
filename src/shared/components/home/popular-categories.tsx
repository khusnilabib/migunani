// src/shared/components/home/popular-categories.tsx — Popular categories section.

import Link from 'next/link';
import { ArrowUpRight, ImageIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PageContainer } from '@/shared/components/page-container';
import { SectionHeading } from '@/shared/components/section-heading';
import { navigation } from '@/generated/navigation';
import { routes } from '@/shared/config/routes';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  image: ImageIcon,
};

export function PopularCategories() {
  const categories = navigation.slice(0, 4);

  return (
    <section aria-labelledby="categories-heading" className="bg-muted/30">
      <PageContainer className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Catalogue"
          title="Browse by category"
          description="A growing collection of focused tools. Each tool solves exactly one problem."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.category] ?? ArrowUpRight;
            return (
              <Link
                key={cat.category}
                href={routes.category(cat.category)}
                className="group block"
              >
                <Card className="card-interactive h-full">
                  <CardContent className="flex flex-col gap-4 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold capitalize">{cat.category} Tools</h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {cat.tools.length} tools
                      </p>
                    </div>
                    <ul className="mt-auto space-y-1">
                      {cat.tools.slice(0, 3).map((t) => (
                        <li key={t.slug} className="truncate text-xs text-muted-foreground">
                          {t.title}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
