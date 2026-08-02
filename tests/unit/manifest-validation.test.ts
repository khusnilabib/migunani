import { describe, it, expect } from 'vitest';
import { toolCategorySchema, featureLifecycleSchema, toolLimitsSchema } from '@packages/tool-engine';

describe('Manifest Validation', () => {
  it('validates tool category', () => {
    expect(toolCategorySchema.safeParse('image').success).toBe(true);
    expect(toolCategorySchema.safeParse('pdf').success).toBe(false);
    expect(toolCategorySchema.safeParse('developer').success).toBe(false);
    expect(toolCategorySchema.safeParse('invalid').success).toBe(false);
  });

  it('validates lifecycle', () => {
    expect(featureLifecycleSchema.safeParse('stable').success).toBe(true);
    expect(featureLifecycleSchema.safeParse('beta').success).toBe(true);
    expect(featureLifecycleSchema.safeParse('development').success).toBe(true);
    expect(featureLifecycleSchema.safeParse('invalid').success).toBe(false);
  });

  it('validates limits', () => {
    const validLimits = {
      maxInputSize: 10485760,
      maxOutputSize: 10485760,
      maxProcessingTime: 30000,
      requiresAuth: false,
      premiumOnly: false,
    };
    expect(toolLimitsSchema.safeParse(validLimits).success).toBe(true);
  });

  it('rejects negative limits', () => {
    const invalidLimits = {
      maxInputSize: -1,
      maxOutputSize: 10485760,
      maxProcessingTime: 30000,
      requiresAuth: false,
      premiumOnly: false,
    };
    expect(toolLimitsSchema.safeParse(invalidLimits).success).toBe(false);
  });
});
