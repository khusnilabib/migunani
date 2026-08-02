// @packages/tool-engine/src/manifest-schema.ts
// Zod schemas for manifest validation at build-time (12_ToolManifestSpecification §5.2).
// Implements: AD-03 (Manifest is Zod-Validated), AD-04 (Manifest is Versioned).

import { z } from 'zod';

// Single-category focus: only `image` tools ship right now.
export const toolCategorySchema = z.enum(['image']);

export const featureLifecycleSchema = z.enum([
  'concept',
  'planned',
  'design',
  'development',
  'testing',
  'beta',
  'stable',
  'deprecated',
  'archived',
]);

export const searchIntentSchema = z.enum(['informational', 'transactional', 'navigational']);
export const executionModeSchema = z.enum(['browser', 'server']);

export const faqItemSchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(5),
});

export const breadcrumbItemSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
});

export const validationRuleSchema = z.object({
  field: z.string(),
  type: z.enum(['required', 'maxSize', 'minSize', 'format', 'custom']),
  value: z.union([z.string(), z.number()]).optional(),
  message: z.string(),
});

export const failureStateSchema = z.object({
  kind: z.enum([
    'validation',
    'processing',
    'quota_exceeded',
    'auth_required',
    'server_unavailable',
  ]),
  cause: z.string(),
  userMessage: z.object({
    what: z.string(),
    why: z.string().optional(),
    howToFix: z.string(),
  }),
});

export const emptyStateSchema = z.object({
  scenario: z.string(),
  title: z.string(),
  description: z.string(),
  cta: z.object({ label: z.string(), action: z.string() }).optional(),
});

export const loadingStateSchema = z.object({
  scenario: z.string(),
  title: z.string(),
  description: z.string(),
  estimatedDuration: z.number().optional(),
});

export const seoConfigSchema = z.object({
  searchIntent: searchIntentSchema,
  title: z.string().min(10).max(60),
  description: z.string().min(50).max(160),
  keywords: z.array(z.string()).min(3).max(10),
  canonicalUrl: z.string().url(),
  openGraph: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().url(),
    type: z.literal('website'),
  }),
  twitterCard: z.object({
    card: z.literal('summary_large_image'),
    title: z.string(),
    description: z.string(),
    image: z.string().url(),
  }),
  structuredData: z.object({
    '@type': z.literal('SoftwareApplication'),
    name: z.string(),
    applicationCategory: z.string(),
    operatingSystem: z.literal('Web'),
    offers: z.object({
      '@type': z.literal('Offer'),
      price: z.literal('0'),
      priceCurrency: z.literal('USD'),
    }),
    aggregateRating: z
      .object({
        '@type': z.literal('AggregateRating'),
        ratingValue: z.string(),
        ratingCount: z.number(),
      })
      .optional(),
  }),
  faq: z.array(faqItemSchema).min(3),
  breadcrumb: z.array(breadcrumbItemSchema).min(2),
});

export const toolLimitsSchema = z.object({
  maxInputSize: z.number().positive(),
  maxOutputSize: z.number().positive(),
  maxProcessingTime: z.number().positive(),
  rateLimitPerUser: z.number().positive().optional(),
  requiresAuth: z.boolean(),
  premiumOnly: z.boolean(),
});

export const toolAnalyticsConfigSchema = z.object({
  events: z.array(
    z.object({
      name: z.string(),
      trigger: z.string(),
      payloadSchema: z.any().optional(),
    }),
  ),
  funnelSteps: z.array(z.string()).min(4),
});

export const pluginExtensionSchema = z.object({
  publisher: z.string(),
  signature: z.string(),
  sandboxedExecution: z.boolean(),
  supportedPlatformVersions: z.string(),
});

/**
 * The full ToolManifest validation schema (build-time).
 * Stages are intentionally `z.any()` since they are functions/components,
 * not serialisable values — we only check presence.
 */
export const toolManifestSchema = z.object({
  manifestVersion: z.string().regex(/^\d+\.\d+\.\d+$/),
  slug: z.string().regex(/^[a-z0-9-]+$/).min(3).max(50),
  category: toolCategorySchema,
  title: z.string().min(3).max(60),
  description: z.string().min(50).max(160),
  lifecycle: featureLifecycleSchema,
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  purpose: z.string().min(10).max(120),
  userProblem: z.string().min(20).max(300),
  inputSchema: z.any(),
  outputSchema: z.any(),
  validationRules: z.array(validationRuleSchema).min(1),
  successCriteria: z.string().min(10).max(200),
  failureStates: z.array(failureStateSchema).min(1),
  emptyStates: z.array(emptyStateSchema).min(1),
  loadingStates: z.array(loadingStateSchema).min(1),
  execution: executionModeSchema,
  stages: z.object({
    input: z.any(),
    validation: z.any(),
    processing: z.any(),
    preview: z.any(),
    download: z.any(),
    history: z.any().optional(),
    share: z.any().optional(),
  }),
  seo: seoConfigSchema,
  relatedTools: z.array(z.string()).min(3),
  suggestedWorkflows: z
    .array(
      z.object({
        name: z.string(),
        steps: z.array(z.string()).min(2),
        description: z.string(),
      }),
    )
    .optional(),
  analytics: toolAnalyticsConfigSchema,
  limits: toolLimitsSchema,
  plugin: pluginExtensionSchema.optional(),
});

/**
 * Validate a manifest against the schema. Throws on failure.
 */
export function validateManifest(manifest: unknown): void {
  const result = toolManifestSchema.safeParse(manifest);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('; ');
    throw new Error(`Manifest validation failed — ${issues}`);
  }
}

/**
 * Default values used when a tool manifest omits optional fields.
 */
export const manifestDefaults = {
  lifecycle: 'stable' as const,
  execution: 'browser' as const,
  requiresAuth: false,
  premiumOnly: false,
};

/**
 * Supported manifest versions (semver major buckets).
 */
export const MANIFEST_VERSIONS = ['1.0.0', '1.1.0'] as const;
export type ManifestVersion = (typeof MANIFEST_VERSIONS)[number];

export function isSupportedVersion(version: string): boolean {
  const major = version.split('.')[0];
  return MANIFEST_VERSIONS.some((v) => v.split('.')[0] === major);
}

export function needsMigration(fromVersion: string, toVersion: string): boolean {
  const fromMajor = fromVersion.split('.')[0];
  const toMajor = toVersion.split('.')[0];
  return fromMajor !== toMajor;
}
