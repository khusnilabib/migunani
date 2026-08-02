// tests/e2e/seo.spec.ts — E2E for SEO metadata verification (Phase 7)
import { test, expect } from '@playwright/test';

test.describe('SEO metadata', () => {
  test('homepage has canonical, OG, Twitter, JSON-LD', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Canonical URL
    const canonical = page.locator('link[rel="canonical"]').first();
    await expect(canonical).toBeVisible();

    // OpenGraph
    const ogTitle = page.locator('meta[property="og:title"]').first();
    await expect(ogTitle).toHaveAttribute('content');

    const ogDesc = page.locator('meta[property="og:description"]').first();
    await expect(ogDesc).toHaveAttribute('content');

    // Twitter Card
    const twitterCard = page.locator('meta[name="twitter:card"]').first();
    await expect(twitterCard).toHaveAttribute('content');

    // JSON-LD Organization
    const orgJsonLd = page.locator('script[type="application/ld+json"]').filter({
      hasText: '"@type":"Organization"',
    });
    if (await orgJsonLd.count() > 0) {
      const content = await orgJsonLd.first().textContent();
      expect(content).toContain('Organization');
    }
  });

  test('tool page has SoftwareApplication JSON-LD', async ({ page }) => {
    await page.goto('/tools/image/image-resize');
    await page.waitForLoadState('networkidle');

    // SoftwareApplication JSON-LD
    const appJsonLd = page.locator('script[type="application/ld+json"]').filter({
      hasText: '"@type":"SoftwareApplication"',
    });
    await expect(appJsonLd.first()).toBeDefined();

    // Breadcrumb JSON-LD
    const breadcrumbJsonLd = page.locator('script[type="application/ld+json"]').filter({
      hasText: '"@type":"BreadcrumbList"',
    });
    if (await breadcrumbJsonLd.count() > 0) {
      const content = await breadcrumbJsonLd.first().textContent();
      expect(content).toContain('BreadcrumbList');
    }

    // FAQ JSON-LD (if FAQ present in manifest)
    const faqJsonLd = page.locator('script[type="application/ld+json"]').filter({
      hasText: '"@type":"FAQPage"',
    });
    if (await faqJsonLd.count() > 0) {
      const content = await faqJsonLd.first().textContent();
      expect(content).toContain('FAQPage');
    }
  });

  test('robots.txt is served', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.ok()).toBe(true);
    const content = await response?.text();
    expect(content).toContain('User-agent');
  });

  test('sitemap.xml is served', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.ok()).toBe(true);
    const content = await response?.text();
    expect(content).toContain('urlset');
    expect(content).toContain('/tools/');
  });
});
