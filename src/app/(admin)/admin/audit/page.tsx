// src/app/(admin)/admin/audit/page.tsx — Audit trail (Phase 8).
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Audit Trail — Admin',
  description: 'Immutable record of admin actions.',
  robots: { index: false, follow: false },
};

const SAMPLE_ACTIONS = [
  { action: 'admin.login', user: 'system', timestamp: '2026-06-29T05:00:00Z', ip: '127.0.0.1' },
  { action: 'tool.viewed', user: 'guest', timestamp: '2026-06-29T05:01:00Z', ip: '192.168.1.1' },
  { action: 'feature_flag.toggled', user: 'admin@migunani', timestamp: '2026-06-29T05:02:00Z', ip: '127.0.0.1' },
];

export default function AdminAuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Audit Trail</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Immutable record of platform actions. Entries are append-only.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {SAMPLE_ACTIONS.map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{entry.action}</Badge>
                  <div>
                    <div className="text-xs text-muted-foreground">User: {entry.user}</div>
                    <div className="text-xs text-muted-foreground">IP: {entry.ip}</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(entry.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            <Badge variant="outline" className="mr-2">Notice</Badge>
            Connect Supabase to populate audit entries from the <code>audit_logs</code> table.
            Entries are written via the service role and readable by users for their own actions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
