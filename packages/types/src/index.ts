// @packages/types — Canonical shared types for the platform.
// Implements: 12_ToolManifestSpecification §5.1, 16_EventSchemaSpecification.

// ─── Tool Categorisation ─────────────────────────────────────
// Narrowed to `image` while the platform focuses on shipping the image
// toolset to production. Add categories back here as they are re-introduced.
export type ToolCategory = 'image';

// ─── Feature Lifecycle (LOCK-12) ─────────────────────────────
export type FeatureLifecycle =
  | 'concept'
  | 'planned'
  | 'design'
  | 'development'
  | 'testing'
  | 'beta'
  | 'stable'
  | 'deprecated'
  | 'archived';

// ─── Search Intent (LOCK-08 / DGA-04) ────────────────────────
export type SearchIntent = 'informational' | 'transactional' | 'navigational';

// ─── Execution Mode (LOCK-02) ────────────────────────────────
export type ToolExecutionMode = 'browser' | 'server';

// ─── RBAC Roles (LOCK-11, EC-08) ─────────────────────────────
export type Role = 'guest' | 'user' | 'premium' | 'editor' | 'admin' | 'superadmin';

// ─── Tool Error Model (PC-08) ────────────────────────────────
export type ToolErrorKind =
  | 'validation'
  | 'processing'
  | 'quota_exceeded'
  | 'auth_required'
  | 'server_unavailable'
  | 'rate_limited'
  | 'not_found'
  | 'unexpected';

export interface ToolError {
  kind: ToolErrorKind;
  cause: string;
  userMessage: {
    what: string;
    why?: string;
    howToFix: string;
  };
  field?: string;
  raw?: unknown;
}

// ─── Events (16_EventSchemaSpecification, DGA-02) ────────────
export interface BaseEvent<TName extends string = string, TPayload = Record<string, unknown>> {
  id: string;
  name: TName;
  timestamp: number;
  payload: TPayload;
  context?: {
    tool?: string;
    category?: ToolCategory;
    sessionId?: string;
    userId?: string | null;
  };
}

// ─── SEO Manifest Sub-types (LOCK-08) ────────────────────────
export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface ToolSEOConfig {
  searchIntent: SearchIntent;
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    type: 'website';
  };
  twitterCard: {
    card: 'summary_large_image';
    title: string;
    description: string;
    image: string;
  };
  structuredData: {
    '@type': 'SoftwareApplication';
    name: string;
    applicationCategory: string;
    operatingSystem: 'Web';
    offers: { '@type': 'Offer'; price: '0'; priceCurrency: 'USD' };
    aggregateRating?: {
      '@type': 'AggregateRating';
      ratingValue: string;
      ratingCount: number;
    };
  };
  faq: FAQItem[];
  breadcrumb: BreadcrumbItem[];
}

// ─── Product Contract Sub-types (PC-02) ──────────────────────
export interface ValidationRule {
  field: string;
  type: 'required' | 'maxSize' | 'minSize' | 'format' | 'custom';
  value?: string | number;
  message: string;
}

export interface FailureState {
  kind: 'validation' | 'processing' | 'quota_exceeded' | 'auth_required' | 'server_unavailable';
  cause: string;
  userMessage: {
    what: string;
    why?: string;
    howToFix: string;
  };
}

export interface EmptyState {
  scenario: string;
  title: string;
  description: string;
  cta?: { label: string; action: string };
}

export interface LoadingState {
  scenario: string;
  title: string;
  description: string;
  estimatedDuration?: number;
}

export interface SuggestedWorkflow {
  name: string;
  steps: string[];
  description: string;
}

// ─── Analytics Config (PC-07, DGA-02) ────────────────────────
export interface AnalyticsEventConfig {
  name: string;
  trigger: string;
  payloadSchema?: unknown;
}

export interface ToolAnalyticsConfig {
  events: AnalyticsEventConfig[];
  funnelSteps: string[];
}

// ─── Tool Limits ─────────────────────────────────────────────
export interface ToolLimits {
  maxInputSize: number;
  maxOutputSize: number;
  maxProcessingTime: number;
  rateLimitPerUser?: number;
  requiresAuth: boolean;
  premiumOnly: boolean;
}

// ─── Plugin Extension (Phase 4, DGA-10) ──────────────────────
export interface PluginExtension {
  publisher: string;
  signature: string;
  sandboxedExecution: boolean;
  supportedPlatformVersions: string;
}

// ─── Tool Manifest (12_ToolManifestSpecification §5.1) ───────
// NOTE: `stages` is intentionally typed as `unknown` here so that this
// pure-types package stays free of React / Zod imports. The concrete
// stage typing lives in `@packages/tool-engine`.
export interface ToolManifest {
  manifestVersion: string;
  slug: string;
  category: ToolCategory;
  title: string;
  description: string;
  lifecycle: FeatureLifecycle;
  version: string;
  purpose: string;
  userProblem: string;
  inputSchema: unknown;
  outputSchema: unknown;
  validationRules: ValidationRule[];
  successCriteria: string;
  failureStates: FailureState[];
  emptyStates: EmptyState[];
  loadingStates: LoadingState[];
  execution: ToolExecutionMode;
  /** Stage implementations (imported, not serialised). Opaque here. */
  stages?: unknown;
  seo: ToolSEOConfig;
  relatedTools: string[];
  suggestedWorkflows?: SuggestedWorkflow[];
  analytics: ToolAnalyticsConfig;
  limits: ToolLimits;
  plugin?: PluginExtension;
}

// ─── Category Config ─────────────────────────────────────────
export interface ToolCategoryConfig {
  slug: ToolCategory;
  name: string;
  description: string;
  icon: string;
  order: number;
}

// ─── Registry-Derived Entry Types ────────────────────────────
export interface FeatureFlag {
  key: string;
  enabled: boolean;
  description?: string;
  rolloutPercentage?: number;
}

export interface RegistryEntry {
  slug: string;
  category: ToolCategory;
  title: string;
  description: string;
  lifecycle: FeatureLifecycle;
  execution: ToolExecutionMode;
  version: string;
  keywords: string[];
  relatedTools: string[];
}

export interface NavigationEntry {
  category: ToolCategory;
  tools: RegistryEntry[];
}

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface SearchIndexEntry {
  slug: string;
  category: ToolCategory;
  title: string;
  description: string;
  keywords: string[];
  url: string;
}

export interface AdminInventoryEntry {
  slug: string;
  category: ToolCategory;
  title: string;
  lifecycle: FeatureLifecycle;
  version: string;
  requiresAuth: boolean;
  premiumOnly: boolean;
  lastUpdated: string;
}

export interface AnalyticsConfigEntry {
  slug: string;
  funnelSteps: string[];
  customEvents: AnalyticsEventConfig[];
}
