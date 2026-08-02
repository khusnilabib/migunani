// src/shared/lib/storage-service.ts — Pluggable storage service for tool artifacts.

export interface StorageAdapter {
  put(key: string, value: Blob | string): Promise<void>;
  get(key: string): Promise<Blob | string | null>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

/**
 * In-memory storage adapter — fallback when nothing else is available.
 */
export class MemoryStorageAdapter implements StorageAdapter {
  private store = new Map<string, Blob | string>();

  async put(key: string, value: Blob | string): Promise<void> {
    this.store.set(key, value);
  }

  async get(key: string): Promise<Blob | string | null> {
    return this.store.get(key) ?? null;
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }
}

/**
 * IndexedDB-backed storage adapter for browser environments.
 * Lazily initialised; falls back to memory if IndexedDB is unavailable.
 */
export class IndexedDbStorageAdapter implements StorageAdapter {
  private dbName: string;
  private storeName: string;
  private memoryFallback = new MemoryStorageAdapter();
  private dbPromise: Promise<IDBDatabase | null> | null = null;

  constructor(dbName = 'migunani-storage', storeName = 'blobs') {
    this.dbName = dbName;
    this.storeName = storeName;
  }

  private open(): Promise<IDBDatabase | null> {
    if (this.dbPromise) return this.dbPromise;
    this.dbPromise = new Promise((resolve) => {
      if (typeof indexedDB === 'undefined') {
        resolve(null);
        return;
      }
      try {
        const req = indexedDB.open(this.dbName, 1);
        req.onupgradeneeded = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName);
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
    return this.dbPromise;
  }

  async put(key: string, value: Blob | string): Promise<void> {
    const db = await this.open();
    if (!db) return this.memoryFallback.put(key, value);
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readwrite');
      tx.objectStore(this.storeName).put(value, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async get(key: string): Promise<Blob | string | null> {
    const db = await this.open();
    if (!db) return this.memoryFallback.get(key);
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readonly');
      const req = tx.objectStore(this.storeName).get(key);
      req.onsuccess = () => resolve((req.result as Blob | string | null) ?? null);
      req.onerror = () => reject(req.error);
    });
  }

  async delete(key: string): Promise<void> {
    const db = await this.open();
    if (!db) return this.memoryFallback.delete(key);
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readwrite');
      tx.objectStore(this.storeName).delete(key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async clear(): Promise<void> {
    const db = await this.open();
    if (!db) return this.memoryFallback.clear();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readwrite');
      tx.objectStore(this.storeName).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }
}

export class StorageService {
  constructor(private adapter: StorageAdapter = new MemoryStorageAdapter()) {}

  setAdapter(adapter: StorageAdapter): void {
    this.adapter = adapter;
  }

  put(key: string, value: Blob | string): Promise<void> {
    return this.adapter.put(key, value);
  }

  get(key: string): Promise<Blob | string | null> {
    return this.adapter.get(key);
  }

  delete(key: string): Promise<void> {
    return this.adapter.delete(key);
  }

  clear(): Promise<void> {
    return this.adapter.clear();
  }
}

let singleton: StorageService | null = null;

export function getStorageService(): StorageService {
  if (!singleton) {
    const adapter =
      typeof window !== 'undefined' && 'indexedDB' in window
        ? new IndexedDbStorageAdapter()
        : new MemoryStorageAdapter();
    singleton = new StorageService(adapter);
  }
  return singleton;
}
