// src/shared/config/env.ts — Zod-validated environment variables (EC-08).

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  // Falls back to the Vercel-provided production URL so canonical/OG tags never
  // point at localhost if NEXT_PUBLIC_SITE_URL is missing in the environment.
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default(
      process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
        : 'http://localhost:3000',
    ),
  NEXT_PUBLIC_SITE_NAME: z.string().default('Migunani'),
  NEXT_PUBLIC_GA4_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_ANALYTICS_CONSENT_DEFAULT: z
    .string()
    .default('false')
    .transform((v) => v === 'true'),
  // Public (browser-safe) Supabase credentials.
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  // Server-only Supabase credentials (service role).
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
});

/**
 * A Supabase URL/value is considered "configured" when it is present and not a
 * placeholder. This lets the platform boot and render even when auth is not
 * wired up (guest-first principle).
 */
function looksConfigured(url?: string, key?: string): boolean {
  if (!url || !key) return false;
  if (!/^https?:\/\//.test(url)) return false;
  if (url.includes('placeholder') || url.includes('example')) return false;
  if (key.length < 20) return false;
  return true;
}

export type Env = z.infer<typeof envSchema>;

/**
 * Parse the environment once (cached). Throws if validation fails.
 */
export function parseEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');
    throw new Error(`Environment validation failed — ${issues}`);
  }
  return result.data;
}

let cached: Env | null = null;

/**
 * Get the parsed environment. Cached after first call.
 */
export function getEnv(): Env {
  if (cached) return cached;
  cached = parseEnv();
  return cached;
}

/**
 * Subset of the environment that is safe to expose to the browser
 * (must be prefixed with NEXT_PUBLIC_).
 */
export function getPublicEnv(): {
  siteUrl: string;
  siteName: string;
  ga4MeasurementId?: string;
  plausibleDomain?: string;
  analyticsConsentDefault: boolean;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  supabaseConfigured: boolean;
} {
  const env = getEnv();
  return {
    siteUrl: env.NEXT_PUBLIC_SITE_URL,
    siteName: env.NEXT_PUBLIC_SITE_NAME,
    ga4MeasurementId: env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
    plausibleDomain: env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    analyticsConsentDefault: env.NEXT_PUBLIC_ANALYTICS_CONSENT_DEFAULT,
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseConfigured: looksConfigured(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    ),
  };
}

/**
 * Whether Supabase auth is configured with non-placeholder credentials.
 * Safe to call on both server and client (reads NEXT_PUBLIC_ vars).
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return looksConfigured(url, key);
}
