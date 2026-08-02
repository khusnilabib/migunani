// src/shared/components/home/comparison-table.tsx — Feature comparison table.

import { Check, X, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PageContainer } from '@/shared/components/page-container';
import { SectionHeading } from '@/shared/components/section-heading';

const FEATURES = [
  { feature: 'Runs in your browser', migunani: true, traditional: false, desktop: true },
  { feature: 'No account required', migunani: true, traditional: false, desktop: true },
  { feature: 'No file uploads', migunani: true, traditional: false, desktop: true },
  { feature: 'No tracking or analytics on data', migunani: true, traditional: false, desktop: true },
  { feature: 'Instant execution', migunani: true, traditional: false, desktop: true },
  { feature: 'Works offline', migunani: false, traditional: false, desktop: true },
  { feature: 'No installation needed', migunani: true, traditional: true, desktop: false },
  { feature: 'Cross-platform', migunani: true, traditional: true, desktop: false },
  { feature: 'Always up-to-date', migunani: true, traditional: true, desktop: false },
  { feature: 'Free with no limits', migunani: true, traditional: false, desktop: false },
];

function StatusIcon({ value }: { value: boolean | null }) {
  if (value === true) return <Check className="h-4 w-4 text-green-600 dark:text-green-400" aria-label="Yes" />;
  if (value === false) return <X className="h-4 w-4 text-muted-foreground" aria-label="No" />;
  return <Minus className="h-4 w-4 text-muted-foreground/50" aria-label="Partial" />;
}

export function ComparisonTable() {
  return (
    <section aria-labelledby="comparison-heading" className="bg-muted/30">
      <PageContainer className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Compare"
          title="Why Migunani?"
          description="See how we compare to traditional online tools and desktop apps."
        />

        <Card className="mt-10 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium text-muted-foreground">Feature</th>
                    <th className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <Badge variant="default">Migunani</Badge>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-medium text-muted-foreground">
                      Traditional online tools
                    </th>
                    <th className="px-6 py-4 text-center font-medium text-muted-foreground">
                      Desktop apps
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {FEATURES.map((row) => (
                    <tr key={row.feature} className="transition-colors hover:bg-muted/30">
                      <td className="px-6 py-3.5 text-foreground">{row.feature}</td>
                      <td className="px-6 py-3.5 text-center">
                        <div className="flex justify-center">
                          <StatusIcon value={row.migunani} />
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <div className="flex justify-center">
                          <StatusIcon value={row.traditional} />
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <div className="flex justify-center">
                          <StatusIcon value={row.desktop} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Comparison is illustrative. Traditional online tools vary; desktop apps vary.
        </p>
      </PageContainer>
    </section>
  );
}
