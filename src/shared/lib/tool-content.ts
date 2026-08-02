// src/shared/lib/tool-content.ts — Structured content model for each tool.
// Sprint 14 Phase 1 — Every tool becomes a knowledge hub.
// This data is used to render rich SEO content on tool pages.

export interface ToolExample {
  input: string;
  output: string;
  explanation: string;
}

export interface ToolContent {
  slug: string;
  introduction: string;
  whatItDoes: string;
  whyUseIt: string;
  features: string[];
  benefits: string[];
  useCases: string[];
  stepByStep: string[];
  examples: ToolExample[];
  bestPractices: string[];
  commonMistakes: string[];
  limitations: string[];
  privacyStatement: string;
}

// Image-category content is authored per tool as the image toolset is polished
// for production. Entries for retired categories were removed.
export const toolContent: Record<string, ToolContent> = {};


/**
 * Get content for a specific tool. Returns null if not found.
 */
export function getToolContent(slug: string): ToolContent | null {
  return toolContent[slug] ?? null;
}

/**
 * Get all tool slugs that have content.
 */
export function getToolsWithContent(): string[] {
  return Object.keys(toolContent);
}
