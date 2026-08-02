// src/shared/config/categories.ts — Category metadata (LOCK-04, DGA-04).

import type { ToolCategoryConfig } from '@packages/types';

export const categories: ToolCategoryConfig[] = [
  {
    slug: 'image',
    name: 'Image Tools',
    description: 'Resize, compress, crop, rotate, and convert images directly in your browser.',
    icon: 'image',
    order: 1,
  },
];

export function getCategory(slug: string): ToolCategoryConfig | undefined {
  return categories.find((c) => c.slug === slug);
}
