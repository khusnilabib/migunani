// src/shared/components/search-overlay.tsx — Premium global search overlay.
// Phase 2 Sprint UI 2.0 — Raycast-like search experience.

'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  Clock,
  TrendingUp,
  X,
  Hash,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { searchIndex } from '@/generated/search-index';
import { navigation } from '@/generated/navigation';
import { routes } from '@/shared/config/routes';
import { useCommandPaletteStore } from '@/shared/hooks/use-command-palette-store';

interface SearchResult {
  type: 'tool' | 'category' | 'action';
  key: string;
  title: string;
  description: string;
  url: string;
  keywords?: string[];
  icon?: React.ElementType;
}

const RECENT_KEY = 'search-recent';
const MAX_RECENT = 8;

const POPULAR_SEARCHES = [
  'resize image',
  'compress image',
  'crop image',
  'rotate image',
  'convert to webp',
];

function loadRecent(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveRecent(query: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = loadRecent().filter((q) => q !== query);
    const next = [query, ...current].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

// Build all searchable items
function buildSearchResults(): SearchResult[] {
  const results: SearchResult[] = [];

  // Tools
  for (const entry of searchIndex) {
    results.push({
      type: 'tool',
      key: `${entry.category}/${entry.slug}`,
      title: entry.title,
      description: entry.description,
      url: entry.url,
      keywords: entry.keywords,
    });
  }

  // Categories
  for (const nav of navigation) {
    results.push({
      type: 'category',
      key: `category/${nav.category}`,
      title: `${nav.category} tools`,
      description: `${nav.tools.length} tools in this category`,
      url: routes.category(nav.category),
    });
  }

  // Actions
  results.push(
    {
      type: 'action',
      key: 'action/home',
      title: 'Go to homepage',
      description: 'Navigate to the main landing page',
      url: routes.home,
    },
    {
      type: 'action',
      key: 'action/dashboard',
      title: 'Open dashboard',
      description: 'View your dashboard and recent activity',
      url: routes.dashboard,
    },
    {
      type: 'action',
      key: 'action/login',
      title: 'Sign in',
      description: 'Sign in to your account',
      url: routes.login,
    },
    {
      type: 'action',
      key: 'action/register',
      title: 'Create account',
      description: 'Sign up for a free account',
      url: routes.register,
    },
  );

  return results;
}

const ALL_RESULTS = buildSearchResults();

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const q = query.toLowerCase();
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const idx = remaining.toLowerCase().indexOf(q);
    if (idx === -1) {
      parts.push(remaining);
      break;
    }
    if (idx > 0) {
      parts.push(remaining.slice(0, idx));
    }
    parts.push(
      <mark key={key++} className="rounded bg-accent/20 px-0.5 text-accent-foreground">
        {remaining.slice(idx, idx + q.length)}
      </mark>,
    );
    remaining = remaining.slice(idx + q.length);
  }

  return <>{parts}</>;
}

export function SearchOverlay() {
  const { open, setOpen } = useCommandPaletteStore();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Load recent searches when overlay opens
  useEffect(() => {
    if (open) {
      queueMicrotask(() => {
        setRecent(loadRecent());
        setQuery('');
        setActiveIndex(0);
      });
    }
  }, [open]);

  // Focus input when overlay opens
  useEffect(() => {
    if (open && inputRef.current) {
      queueMicrotask(() => inputRef.current?.focus());
    }
  }, [open]);

  // Filter results with typo tolerance
  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    // Simple typo tolerance: also match if query is a substring of any word
    // or if any word starts with the query (prefix matching)
    const matches = (text: string): boolean => {
      const lower = text.toLowerCase();
      if (lower.includes(q)) return true;
      // Prefix match on individual words
      const words = lower.split(/\s+/);
      return words.some((w) => w.startsWith(q));
    };

    return ALL_RESULTS.filter((r) => {
      return (
        matches(r.title) ||
        matches(r.description) ||
        matches(r.key) ||
        (r.keywords?.some((k) => matches(k)) ?? false)
      );
    }).slice(0, 20);
  }, [query]);

  // Group results
  const grouped = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    for (const r of filtered) {
      const arr = groups[r.type] ?? [];
      arr.push(r);
      groups[r.type] = arr;
    }
    return groups;
  }, [filtered]);

  // Flat list for keyboard navigation
  const flatList = useMemo(() => filtered, [filtered]);

  // Reset active index when query changes
  useEffect(() => {
    queueMicrotask(() => setActiveIndex(0));
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const activeEl = container.querySelector(`[data-idx="${activeIndex}"]`);
    if (activeEl instanceof HTMLElement) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  const go = useCallback(
    (result: SearchResult) => {
      if (query.trim()) saveRecent(query.trim());
      setOpen(false);
      router.push(result.url);
    },
    [query, router, setOpen],
  );

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatList.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const result = flatList[activeIndex];
      if (result) go(result);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  };

  if (!open) return null;

  const typeLabels: Record<string, string> = {
    tool: 'Tools',
    category: 'Categories',
    action: 'Actions',
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[10vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Global search"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* Search panel */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl animate-scale-in">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search tools, categories, or actions..."
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            aria-label="Search input"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close search"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2">
          {!query.trim() ? (
            /* Empty state: show recent + popular */
            <div className="space-y-4 p-2">
              {recent.length > 0 ? (
                <div>
                  <div className="mb-2 flex items-center gap-1.5 px-2 text-xs font-medium text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    Recent searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div>
                <div className="mb-2 flex items-center gap-1.5 px-2 text-xs font-medium text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                  Popular searches
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-dashed border-border p-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Type to search across all tools, categories, and quick actions.
                </p>
              </div>
            </div>
          ) : flatList.length === 0 ? (
            /* No results */
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Search className="h-6 w-6 text-muted-foreground" aria-hidden />
              </div>
              <p className="mt-4 text-sm font-medium">No results found</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try a different keyword or browse all tools.
              </p>
            </div>
          ) : (
            /* Grouped results */
            <div className="space-y-1">
              {Object.entries(grouped).map(([type, items]) => (
                <div key={type}>
                  <div className="mb-1 mt-2 flex items-center gap-1.5 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {type === 'tool' && <Hash className="h-3 w-3" aria-hidden />}
                    {typeLabels[type] ?? type}
                    <span className="text-muted-foreground/50">({items.length})</span>
                  </div>
                  {items.map((result) => {
                    const flatIdx = flatList.indexOf(result);
                    const isActive = flatIdx === activeIndex;
                    return (
                      <button
                        key={result.key}
                        data-idx={flatIdx}
                        type="button"
                        onClick={() => go(result)}
                        onMouseEnter={() => setActiveIndex(flatIdx)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                          isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted',
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {highlightMatch(result.title, query)}
                          </div>
                          <div className={cn('text-xs truncate', isActive ? 'text-accent-foreground/70' : 'text-muted-foreground')}>
                            {highlightMatch(result.description, query)}
                          </div>
                        </div>
                        {isActive ? (
                          <CornerDownLeft className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px] font-medium">
                <ArrowUp className="inline h-2.5 w-2.5" aria-hidden />
              </kbd>
              <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px] font-medium">
                <ArrowDown className="inline h-2.5 w-2.5" aria-hidden />
              </kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px] font-medium">
                <CornerDownEnter className="inline h-2.5 w-2.5" aria-hidden />
              </kbd>
              to open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px] font-medium">esc</kbd>
              to close
            </span>
          </div>
          <span>{flatList.length} results</span>
        </div>
      </div>
    </div>
  );
}

function CornerDownEnter({ className }: { className?: string }) {
  return <CornerDownLeft className={className} aria-hidden />;
}
