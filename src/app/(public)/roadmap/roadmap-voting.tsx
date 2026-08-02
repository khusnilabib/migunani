// src/app/(public)/roadmap/roadmap-voting.tsx — Client-side voting component.

'use client';

import { useState, useEffect } from 'react';
import { ThumbsUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RoadmapVotingProps {
  title: string;
  desc: string;
  initialVotes: number;
  status: 'in-progress' | 'planned';
}

export function RoadmapVoting({ title, desc, initialVotes, status }: RoadmapVotingProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    try {
      const votedItems = JSON.parse(localStorage.getItem('migunani:roadmap-votes') ?? '[]');
      if (votedItems.includes(title)) {
        queueMicrotask(() => setVoted(true));
      }
    } catch {
      // localStorage unavailable
    }
  }, [title]);

  const handleVote = () => {
    if (voted) return;
    setVoted(true);
    setVotes((v) => v + 1);
    try {
      const votedItems = JSON.parse(localStorage.getItem('migunani:roadmap-votes') ?? '[]');
      votedItems.push(title);
      localStorage.setItem('migunani:roadmap-votes', JSON.stringify(votedItems));
    } catch {
      // ignore
    }
  };

  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-3 p-4">
        <div className="flex-1">
          <p className="text-sm font-medium">{title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Button
            variant={voted ? 'default' : 'outline'}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleVote}
            disabled={voted}
            aria-label={voted ? 'Voted' : 'Vote for this feature'}
          >
            <ThumbsUp className={`h-3.5 w-3.5 ${voted ? 'fill-current' : ''}`} aria-hidden />
          </Button>
          <span className="text-xs font-semibold tabular-nums">{votes}</span>
        </div>
      </CardContent>
    </Card>
  );
}
