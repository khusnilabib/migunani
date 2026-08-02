// src/shared/components/feedback-widget.tsx — Post-execution feedback widget.
// Sprint 12 Phase 5 — Appears after successful tool execution.

'use client';

import { useState, useCallback } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAnalytics } from '@/shared/hooks/use-analytics';

interface FeedbackWidgetProps {
  toolSlug: string;
  toolCategory: string;
}

export function FeedbackWidget({ toolSlug, toolCategory }: FeedbackWidgetProps) {
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { trackStandard } = useAnalytics();

  const handleFeedback = useCallback(
    (type: 'helpful' | 'not-helpful') => {
      setFeedback(type);
      trackStandard('result_copied', { slug: toolSlug, feedback: type }, { tool: toolSlug, category: toolCategory });
      // Also track as custom event
      trackStandard(
        'tool_shared',
        { slug: toolSlug, feedback: type, action: 'feedback' },
        { tool: toolSlug, category: toolCategory },
      );
      if (type === 'not-helpful') {
        setShowComment(true);
      } else {
        setSubmitted(true);
      }
    },
    [toolSlug, toolCategory, trackStandard],
  );

  const handleSubmitComment = useCallback(() => {
    // Store locally as backup
    try {
      const existing = JSON.parse(localStorage.getItem('migunani:feedback') ?? '[]');
      existing.push({ slug: toolSlug, feedback, comment, timestamp: Date.now() });
      localStorage.setItem('migunani:feedback', JSON.stringify(existing));
    } catch {
      // localStorage might be unavailable
    }
    // Sync to server (fire-and-forget)
    import('@/identity/actions/newsletter-actions').then(({ submitFeedback }) => {
      void submitFeedback({
        toolSlug,
        rating: feedback === 'helpful' ? 'helpful' : 'not-helpful',
        comment: comment || undefined,
        browser: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 200) : undefined,
      });
    });
    setSubmitted(true);
    setShowComment(false);
  }, [toolSlug, feedback, comment]);

  if (submitted) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
        <ThumbsUp className="h-3 w-3 text-accent" aria-hidden />
        Thanks for your feedback!
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-muted/20 p-3">
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-foreground">Was this helpful?</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={() => handleFeedback('helpful')}
          aria-pressed={feedback === 'helpful'}
        >
          <ThumbsUp className="h-3 w-3" aria-hidden />
          Yes
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={() => handleFeedback('not-helpful')}
          aria-pressed={feedback === 'not-helpful'}
        >
          <ThumbsDown className="h-3 w-3" aria-hidden />
          No
        </Button>
      </div>
      {showComment ? (
        <div className="mt-2 space-y-2">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us what went wrong (optional)..."
            className="h-16 text-xs"
            aria-label="Feedback comment"
          />
          <div className="flex gap-2">
            <Button size="sm" className="h-7 text-xs" onClick={handleSubmitComment}>
              Submit
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setShowComment(false)}>
              <X className="h-3 w-3" aria-hidden />
              Skip
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
