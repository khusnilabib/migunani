// src/shared/hooks/use-recent-tools.ts — Track recently used tools in localStorage.
//
// Stores the last 5 tools a visitor used (slug + category + title + timestamp).
// SSR-safe: returns an empty list on the server and hydrates on mount.

'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'migunani:recent-tools';
const MAX_ITEMS = 5;

export interface RecentTool {
  slug: string;
  category: string;
  title: string;
  timestamp: number;
}

export interface UseRecentToolsResult {
  recentTools: RecentTool[];
  addRecent: (tool: Omit<RecentTool, 'timestamp'>) => void;
  clearRecent: () => void;
  hydrated: boolean;
}

function read(): RecentTool[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (t): t is RecentTool =>
        t &&
        typeof t.slug === 'string' &&
        typeof t.category === 'string' &&
        typeof t.title === 'string' &&
        typeof t.timestamp === 'number',
    );
  } catch {
    return [];
  }
}

function write(items: RecentTool[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore quota errors */
  }
}

export function useRecentTools(): UseRecentToolsResult {
  const [recentTools, setRecentTools] = useState<RecentTool[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hydrate from localStorage after mount to avoid SSR mismatch.
    queueMicrotask(() => {
      setRecentTools(read());
      setHydrated(true);
    });
  }, []);

  const addRecent = useCallback((tool: Omit<RecentTool, 'timestamp'>) => {
    setRecentTools((prev) => {
      // De-duplicate by slug, bump to the front, cap at MAX_ITEMS.
      const next: RecentTool[] = [
        { ...tool, timestamp: Date.now() },
        ...prev.filter((t) => t.slug !== tool.slug),
      ].slice(0, MAX_ITEMS);
      write(next);
      return next;
    });
  }, []);

  const clearRecent = useCallback(() => {
    write([]);
    setRecentTools([]);
  }, []);

  return { recentTools, addRecent, clearRecent, hydrated };
}
