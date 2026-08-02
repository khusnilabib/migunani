// src/app/(admin)/admin/analytics/page.tsx — Product Intelligence Dashboard (Sprint 11).

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Download, Copy, Share2, Search, TrendingUp, Users, Zap } from 'lucide-react';

export const metadata = {
  title: 'Analytics — Admin',
  description: 'Product intelligence dashboard.',
  robots: { index: false, follow: false },
};

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Analytics Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Product intelligence — connect GA4 and analytics providers for live data.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <Zap className="h-4 w-4 text-accent" aria-hidden />
              </div>
              <Badge variant="outline" className="text-xs">WATE</Badge>
            </div>
            <div className="mt-3 text-2xl font-bold tabular-nums">—</div>
            <p className="mt-0.5 text-xs text-muted-foreground">Weekly Active Tool Executions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <Users className="h-4 w-4 text-blue-500" aria-hidden />
              </div>
              <Badge variant="outline" className="text-xs">DAU</Badge>
            </div>
            <div className="mt-3 text-2xl font-bold tabular-nums">—</div>
            <p className="mt-0.5 text-xs text-muted-foreground">Daily Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <BarChart3 className="h-4 w-4 text-purple-500" aria-hidden />
              </div>
              <Badge variant="outline" className="text-xs">Success</Badge>
            </div>
            <div className="mt-3 text-2xl font-bold tabular-nums">—</div>
            <p className="mt-0.5 text-xs text-muted-foreground">Execution Success Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <TrendingUp className="h-4 w-4 text-green-500" aria-hidden />
              </div>
              <Badge variant="outline" className="text-xs">Bounce</Badge>
            </div>
            <div className="mt-3 text-2xl font-bold tabular-nums">—</div>
            <p className="mt-0.5 text-xs text-muted-foreground">Bounce Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Tools + Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Tools (by executions)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {['Image Resizer', 'Image Compressor', 'Format Converter', 'Image Cropper', 'Image Rotator'].map((tool, i) => (
              <div key={tool} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{tool}</span>
                  <span className="tabular-nums text-muted-foreground">—</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-700"
                    style={{ width: `${90 - i * 15}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">User Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <Download className="h-4 w-4 text-accent" aria-hidden />
                <div>
                  <p className="text-lg font-bold tabular-nums">—</p>
                  <p className="text-xs text-muted-foreground">Downloads</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <Copy className="h-4 w-4 text-accent" aria-hidden />
                <div>
                  <p className="text-lg font-bold tabular-nums">—</p>
                  <p className="text-xs text-muted-foreground">Copies</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <Share2 className="h-4 w-4 text-accent" aria-hidden />
                <div>
                  <p className="text-lg font-bold tabular-nums">—</p>
                  <p className="text-xs text-muted-foreground">Shares</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <Search className="h-4 w-4 text-accent" aria-hidden />
                <div>
                  <p className="text-lg font-bold tabular-nums">—</p>
                  <p className="text-xs text-muted-foreground">Searches</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Intelligence */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Search Intelligence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-2xl font-bold tabular-nums">—</p>
              <p className="mt-1 text-xs text-muted-foreground">Total Searches</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-2xl font-bold tabular-nums text-yellow-600 dark:text-yellow-400">—</p>
              <p className="mt-1 text-xs text-muted-foreground">No-Result Searches</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-2xl font-bold tabular-nums">—</p>
              <p className="mt-1 text-xs text-muted-foreground">Search CTR</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Popular Keywords</p>
            <div className="flex flex-wrap gap-2">
              {['resize image', 'compress image', 'png to jpg', 'crop image', 'rotate image', 'convert to webp', 'reduce image size'].map((kw) => (
                <Badge key={kw} variant="secondary" className="text-xs">{kw}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Web Vitals */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Core Web Vitals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-5">
            {['LCP', 'CLS', 'INP', 'FCP', 'TTFB'].map((metric) => (
              <div key={metric} className="rounded-lg border border-border p-3 text-center">
                <p className="text-xs font-medium text-muted-foreground">{metric}</p>
                <p className="mt-1 text-lg font-bold tabular-nums">—</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Note:</span> Connect GA4
            (NEXT_PUBLIC_GA4_MEASUREMENT_ID), Plausible (NEXT_PUBLIC_PLAUSIBLE_DOMAIN),
            or Microsoft Clarity (NEXT_PUBLIC_CLARITY_ID) to populate live data.
            Analytics events are tracked via the vendor-neutral AnalyticsClient.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
