// src/shared/hooks/use-favorites.ts — Manage favourite tools in localStorage.
//
// Stores a list of favourite tool slugs. SSR-safe: returns an empty list on
// the server and hydrates on mount.

'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'migunani:favorites';

export interface FavoriteTool {
  slug: string;
  category: string;
  title: string;
}

export interface UseFavoritesResult {
  favorites: FavoriteTool[];
  toggleFavorite: (tool: FavoriteTool) => void;
  isFavorite: (slug: string) => boolean;
  clearFavorites: () => void;
  hydrated: boolean;
}

function read(): FavoriteTool[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (t): t is FavoriteTool =>
        t &&
        typeof t.slug === 'string' &&
        typeof t.category === 'string' &&
        typeof t.title === 'string',
    );
  } catch {
    return [];
  }
}

function write(items: FavoriteTool[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore quota errors */
  }
}

export function useFavorites(): UseFavoritesResult {
  const [favorites, setFavorites] = useState<FavoriteTool[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hydrate from localStorage after mount to avoid SSR mismatch.
    queueMicrotask(() => {
      setFavorites(read());
      setHydrated(true);
    });
  }, []);

  const toggleFavorite = useCallback((tool: FavoriteTool) => {
    setFavorites((prev) => {
      const exists = prev.some((t) => t.slug === tool.slug);
      const next = exists
        ? prev.filter((t) => t.slug !== tool.slug)
        : [...prev, tool];
      write(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favorites.some((t) => t.slug === slug),
    [favorites],
  );

  const clearFavorites = useCallback(() => {
    write([]);
    setFavorites([]);
  }, []);

  return { favorites, toggleFavorite, isFavorite, clearFavorites, hydrated };
}
