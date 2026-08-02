// src/shared/hooks/use-autosave.ts — Autosave preferences hook.
// Phase 3 Sprint 6 — UX Polish.
//
// Debounced save of user preferences to localStorage (and optionally Supabase
// when authenticated). Used for: theme, language, default tool settings,
// layout preferences, etc.

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface AutosaveOptions<T> {
  // Storage key (namespaced automatically)
  key: string;
  // Debounce delay in ms (default: 1000)
  debounceMs?: number;
  // Whether to also persist to Supabase (default: false)
  syncToCloud?: boolean;
  // Cloud sync function (called when syncToCloud is true)
  syncFn?: (data: T) => Promise<void>;
}

export interface AutosaveResult<T> {
  data: T | null;
  setData: (data: T) => void;
  isSaving: boolean;
  lastSavedAt: number | null;
  error: string | null;
}

const NAMESPACE = 'migunani-prefs';

export function useAutosave<T>(options: AutosaveOptions<T>): AutosaveResult<T> {
  const { key, debounceMs = 1000, syncToCloud = false, syncFn } = options;
  const [data, setDataState] = useState<T | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstLoad = useRef(true);

  const storageKey = `${NAMESPACE}:${key}`;

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as T;
        setDataState(parsed);
        setLastSavedAt(Date.now());
      }
    } catch {
      // localStorage might be unavailable
    }
    isFirstLoad.current = false;
  }, [storageKey]);

  // Debounced save
  const setData = useCallback(
    (newData: T) => {
      setDataState(newData);
      setError(null);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        setIsSaving(true);
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(newData));
          setLastSavedAt(Date.now());

          if (syncToCloud && syncFn) {
            void syncFn(newData).catch((err) => {
              setError(err instanceof Error ? err.message : 'Cloud sync failed');
            });
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to save');
        } finally {
          setIsSaving(false);
        }
      }, debounceMs);
    },
    [storageKey, debounceMs, syncToCloud, syncFn],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return { data, setData, isSaving, lastSavedAt, error };
}
