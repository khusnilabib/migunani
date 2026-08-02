// src/shared/components/admin/activity-timeline.tsx — Activity timeline for admin.

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, User, Wrench, Flag, Settings, Shield } from 'lucide-react';

interface TimelineEvent {
  icon: React.ElementType;
  action: string;
  user: string;
  timestamp: string;
  ip?: string;
  severity?: 'info' | 'warning' | 'critical';
}

const EVENTS: TimelineEvent[] = [
  { icon: User, action: 'User signed in', user: 'guest@example.com', timestamp: '2 min ago', ip: '192.168.1.1' },
  { icon: Wrench, action: 'Tool executed: PDF Merger', user: 'guest@example.com', timestamp: '5 min ago' },
  { icon: Flag, action: 'Feature flag toggled: beta-tools', user: 'admin@migunani', timestamp: '12 min ago', severity: 'warning' },
  { icon: User, action: 'New user registered', user: 'newuser@example.com', timestamp: '25 min ago' },
  { icon: Shield, action: 'Rate limit triggered on /api/auth', user: '203.0.113.5', timestamp: '1 hour ago', severity: 'critical' },
  { icon: Settings, action: 'Admin settings updated', user: 'admin@migunani', timestamp: '2 hours ago' },
  { icon: Wrench, action: 'Tool executed: Image Resizer', user: 'guest@example.com', timestamp: '3 hours ago' },
];

const severityColors: Record<string, string> = {
  info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  warning: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  critical: 'bg-red-500/10 text-red-600 dark:text-red-400',
};

export function ActivityTimeline() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Activity className="h-4 w-4 text-muted-foreground" aria-hidden />
          Activity timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ol className="relative space-y-0">
          {EVENTS.map((event, idx) => {
            const Icon = event.icon;
            const isLast = idx === EVENTS.length - 1;
            return (
              <li key={idx} className="relative flex gap-3 px-4 py-3">
                {!isLast && (
                  <div
                    className="absolute left-[26px] top-10 h-full w-px bg-border"
                    aria-hidden
                  />
                )}
                <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background ${
                  event.severity ? severityColors[event.severity] : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon className="h-4 w-4" aria-hidden />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">{event.action}</p>
                    <span className="shrink-0 text-xs text-muted-foreground">{event.timestamp}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{event.user}</span>
                    {event.ip && (
                      <Badge variant="outline" className="text-xs font-mono">
                        {event.ip}
                      </Badge>
                    )}
                    {event.severity && event.severity !== 'info' && (
                      <Badge
                        variant={event.severity === 'critical' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {event.severity}
                      </Badge>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
