// src/shared/components/dashboard/achievements.tsx — User achievements display.

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Zap, Star, Crown, Target, Flame } from 'lucide-react';

interface Achievement {
  icon: React.ElementType;
  title: string;
  description: string;
  unlocked: boolean;
}

const ACHIEVEMENTS: Achievement[] = [
  { icon: Zap, title: 'First Tool', description: 'Used your first tool', unlocked: true },
  { icon: Star, title: 'Collector', description: 'Favorited 5 tools', unlocked: true },
  { icon: Flame, title: 'On Fire', description: 'Used tools 7 days in a row', unlocked: true },
  { icon: Target, title: 'Power User', description: 'Executed 50 tools', unlocked: false },
  { icon: Crown, title: 'Explorer', description: 'Tried all categories', unlocked: false },
  { icon: Trophy, title: 'Champion', description: 'Used every image tool', unlocked: false },
];

export function Achievements() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Trophy className="h-4 w-4 text-muted-foreground" aria-hidden />
          Achievements
          <Badge variant="secondary" className="ml-auto text-xs">
            {ACHIEVEMENTS.filter((a) => a.unlocked).length}/{ACHIEVEMENTS.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {ACHIEVEMENTS.map((ach) => {
            const Icon = ach.icon;
            return (
              <div
                key={ach.title}
                className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-colors ${
                  ach.unlocked
                    ? 'border-accent/30 bg-accent/5'
                    : 'border-border opacity-50'
                }`}
                title={ach.description}
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  ach.unlocked ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon className="h-4 w-4" aria-hidden />
                </div>
                <span className="text-xs font-medium">{ach.title}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
