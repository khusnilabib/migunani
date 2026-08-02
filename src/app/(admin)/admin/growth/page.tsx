// src/app/(admin)/admin/growth/page.tsx — Growth & Conversion Dashboard (Sprint 16).

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Repeat, Mail, Download, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Growth — Admin',
  description: 'Growth and conversion dashboard.',
  robots: { index: false, follow: false },
};

export default function AdminGrowthPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Growth Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acquisition, retention, engagement, and conversion metrics.
        </p>
      </div>

      {/* Acquisition */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Acquisition</h2>
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <Users className="h-4 w-4 text-blue-500" aria-hidden />
              </div>
              <div className="mt-3 text-2xl font-bold tabular-nums">—</div>
              <p className="mt-0.5 text-xs text-muted-foreground">New Users (Today)</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <TrendingUp className="h-4 w-4 text-green-500" aria-hidden />
              </div>
              <div className="mt-3 text-2xl font-bold tabular-nums">—</div>
              <p className="mt-0.5 text-xs text-muted-foreground">Organic Visitors</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <ArrowRight className="h-4 w-4 text-purple-500" aria-hidden />
              </div>
              <div className="mt-3 text-2xl font-bold tabular-nums">—</div>
              <p className="mt-0.5 text-xs text-muted-foreground">Direct Visitors</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <TrendingUp className="h-4 w-4 text-orange-500" aria-hidden />
              </div>
              <div className="mt-3 text-2xl font-bold tabular-nums">—</div>
              <p className="mt-0.5 text-xs text-muted-foreground">Bounce Rate</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Retention */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Retention</h2>
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <Repeat className="h-4 w-4 text-accent" aria-hidden />
              </div>
              <div className="mt-3 text-2xl font-bold tabular-nums">—</div>
              <p className="mt-0.5 text-xs text-muted-foreground">Returning Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <Repeat className="h-4 w-4 text-green-500" aria-hidden />
              </div>
              <div className="mt-3 text-2xl font-bold tabular-nums">—</div>
              <p className="mt-0.5 text-xs text-muted-foreground">DAU</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <Repeat className="h-4 w-4 text-purple-500" aria-hidden />
              </div>
              <div className="mt-3 text-2xl font-bold tabular-nums">—</div>
              <p className="mt-0.5 text-xs text-muted-foreground">WAU</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <Repeat className="h-4 w-4 text-orange-500" aria-hidden />
              </div>
              <div className="mt-3 text-2xl font-bold tabular-nums">—</div>
              <p className="mt-0.5 text-xs text-muted-foreground">MAU</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Engagement & Conversion */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border p-3 text-center">
                <p className="text-xs text-muted-foreground">Avg Session</p>
                <p className="mt-1 text-lg font-bold tabular-nums">— min</p>
              </div>
              <div className="rounded-lg border border-border p-3 text-center">
                <p className="text-xs text-muted-foreground">Tools/Session</p>
                <p className="mt-1 text-lg font-bold tabular-nums">—</p>
              </div>
              <div className="rounded-lg border border-border p-3 text-center">
                <p className="text-xs text-muted-foreground">Executions</p>
                <p className="mt-1 text-lg font-bold tabular-nums">—</p>
              </div>
              <div className="rounded-lg border border-border p-3 text-center">
                <p className="text-xs text-muted-foreground">Success Rate</p>
                <p className="mt-1 text-lg font-bold tabular-nums">—%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border p-3 text-center">
                <p className="text-xs text-muted-foreground">Visitor → Tool</p>
                <p className="mt-1 text-lg font-bold tabular-nums">—%</p>
              </div>
              <div className="rounded-lg border border-border p-3 text-center">
                <p className="text-xs text-muted-foreground">Tool → Execution</p>
                <p className="mt-1 text-lg font-bold tabular-nums">—%</p>
              </div>
              <div className="rounded-lg border border-border p-3 text-center">
                <p className="text-xs text-muted-foreground">Newsletter</p>
                <p className="mt-1 text-lg font-bold tabular-nums">—</p>
              </div>
              <div className="rounded-lg border border-border p-3 text-center">
                <p className="text-xs text-muted-foreground">Favorites</p>
                <p className="mt-1 text-lg font-bold tabular-nums">—</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Landing Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['/', '/tools/image/image-resize', '/tools/image/image-compress', '/tools/image/image-format-convert'].map((page) => (
                <div key={page} className="flex items-center justify-between rounded-md border border-border p-2 text-xs">
                  <span className="font-mono">{page}</span>
                  <span className="tabular-nums text-muted-foreground">— visits</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Exit Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['/tools/image/image-crop', '/tools/image/image-rotate', '/about', '/tools'].map((page) => (
                <div key={page} className="flex items-center justify-between rounded-md border border-border p-2 text-xs">
                  <span className="font-mono">{page}</span>
                  <span className="tabular-nums text-muted-foreground">— exits</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Note:</span> Connect GA4
            (NEXT_PUBLIC_GA4_MEASUREMENT_ID) to populate live growth data.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
