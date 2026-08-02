// src/shared/lib/sync-engine.ts — Offline-first sync engine.
// Sprint 13 Phase 4-5, 11 — Syncs favorites and history between localStorage and Supabase.
// Privacy first: only stores metadata (slug, category, timestamp), never input/output.

'use client';

import { getSupabaseBrowser } from '@/identity/lib/supabase-client';

export interface SyncableFavorite {
  slug: string;
  category: string;
  title: string;
}

export interface SyncableHistory {
  slug: string;
  category: string;
  status: 'success' | 'failed' | 'cancelled';
  durationMs: number;
  timestamp: number;
}

const FAV_QUEUE_KEY = 'migunani:sync:favorites';
const HIST_QUEUE_KEY = 'migunani:sync:history';

/**
 * Load pending sync queue from localStorage.
 */
function loadQueue<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '[]');
  } catch {
    return [];
  }
}

/**
 * Save sync queue to localStorage.
 */
function saveQueue<T>(key: string, items: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // localStorage might be full
  }
}

/**
 * Check if user is authenticated.
 */
async function getAuthenticatedUserId(): Promise<string | null> {
  const client = getSupabaseBrowser();
  if (!client) return null;
  try {
    const { data: { user } } = await client.auth.getUser();
    return user?.id ?? null;
  } catch {
    return null;
  }
}

/**
 * Sync favorites: merge local favorites with cloud.
 * Offline-first: local changes are queued and synced when online.
 */
export async function syncFavorites(localFavorites: SyncableFavorite[]): Promise<SyncableFavorite[]> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return localFavorites; // Offline/guest — keep local

  const client = getSupabaseBrowser()!;

  try {
    // 1. Push local favorites to cloud (upsert)
    if (localFavorites.length > 0) {
      const rows = localFavorites.map((f) => ({
        user_id: userId,
        tool_slug: f.slug,
        tool_category: f.category,
      }));
      await client.from('favorites').upsert(rows, { onConflict: 'user_id,tool_slug' }).select();
    }

    // 2. Pull cloud favorites
    const { data: cloudFavs, error } = await client
      .from('favorites')
      .select('tool_slug, tool_category')
      .eq('user_id', userId);

    if (error) return localFavorites;

    // 3. Merge: cloud is source of truth when online
    return (cloudFavs ?? []).map((f) => ({
      slug: f.tool_slug,
      category: f.tool_category,
      title: f.tool_slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    }));
  } catch {
    return localFavorites; // Network error — keep local
  }
}

/**
 * Sync history: push new history entries to cloud.
 * Only stores metadata (slug, status, duration) — never input/output.
 */
export async function syncHistory(entries: SyncableHistory[]): Promise<void> {
  const userId = await getAuthenticatedUserId();
  if (!userId) return; // Offline/guest — keep local only

  const client = getSupabaseBrowser()!;

  try {
    const rows = entries.map((e) => ({
      user_id: userId,
      tool_slug: e.slug,
      tool_category: e.category,
      input_summary: '', // Privacy: no input data
      output_summary: '', // Privacy: no output data
      status: e.status,
      duration_ms: e.durationMs,
    }));

    if (rows.length > 0) {
      await client.from('tool_history').insert(rows);
    }

    // Clear the queue after successful sync
    saveQueue(HIST_QUEUE_KEY, []);
  } catch {
    // Network error — keep in queue for next sync
    saveQueue(HIST_QUEUE_KEY, entries);
  }
}

/**
 * Process pending sync queues when coming online.
 */
export async function processSyncQueue(): Promise<void> {
  if (typeof window === 'undefined') return;
  if (!navigator.onLine) return;

  // Sync queued history
  const historyQueue = loadQueue<SyncableHistory>(HIST_QUEUE_KEY);
  if (historyQueue.length > 0) {
    await syncHistory(historyQueue);
  }
}

/**
 * Initialize sync engine — listens for online event.
 */
export function initSyncEngine(): void {
  if (typeof window === 'undefined') return;

  window.addEventListener('online', () => {
    void processSyncQueue();
  });

  // Also try sync on initial load if online
  if (navigator.onLine) {
    void processSyncQueue();
  }
}
