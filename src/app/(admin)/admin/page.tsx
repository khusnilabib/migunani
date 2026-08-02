// src/app/(admin)/admin/page.tsx — Admin Dashboard (Phase 6 Sprint UI 2.0).
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { allManifests } from '@/generated/registry';
import { adminInventory } from '@/generated/admin-inventory';
import { navigation } from '@/generated/navigation';
import { RealtimeCounters } from '@/shared/components/admin/realtime-counters';
import { UsageChart } from '@/shared/components/admin/usage-chart';
import { ActivityTimeline } from '@/shared/components/admin/activity-timeline';

export const metadata = {
  title: 'Admin Dashboard — Migunani',
  description: 'Operational control center for the Migunani platform.',
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  const toolCount = allManifests.length;
  const categoryCount = navigation.length;
  const stableCount = adminInventory.filter((t) => t.lifecycle === 'stable').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Real-time operational overview of the Migunani platform.
        </p>
      </div>

      {/* Realtime counters */}
      <RealtimeCounters />

      {/* Charts + Timeline */}
      <div className="grid gap-6 lg:grid-cols-2">
        <UsageChart />
        <ActivityTimeline />
      </div>

      {/* Platform stats */}
      <div>
        <h2 className="mb-3 text-sm font-medium">Platform statistics</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{toolCount}</div>
              <p className="mt-1 text-xs text-muted-foreground">Total tools</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stableCount}</div>
              <p className="mt-1 text-xs text-muted-foreground">Stable tools</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{categoryCount}</div>
              <p className="mt-1 text-xs text-muted-foreground">Categories</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-3 text-sm font-medium">Quick actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/tools" className="block">
            <Card className="card-interactive h-full">
              <CardContent className="p-4">
                <div className="text-sm font-medium">Manage Tools</div>
                <p className="mt-1 text-xs text-muted-foreground">View, publish, deprecate</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/users" className="block">
            <Card className="card-interactive h-full">
              <CardContent className="p-4">
                <div className="text-sm font-medium">Manage Users</div>
                <p className="mt-1 text-xs text-muted-foreground">Profiles, sessions, history</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/flags" className="block">
            <Card className="card-interactive h-full">
              <CardContent className="p-4">
                <div className="text-sm font-medium">Feature Flags</div>
                <p className="mt-1 text-xs text-muted-foreground">Toggle and roll out</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/health" className="block">
            <Card className="card-interactive h-full">
              <CardContent className="p-4">
                <div className="text-sm font-medium">System Health</div>
                <p className="mt-1 text-xs text-muted-foreground">Live health checks</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
