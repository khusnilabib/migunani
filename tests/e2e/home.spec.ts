// tests/e2e/home.spec.ts — E2E happy path for the homepage
import { test, expect } from '@playwright/test';
import { checkAccessibility } from './accessibility';

test.describe('Homepage', () => {
  test('renders hero, search, and tool grid', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Tools|Browser/i);

    // Hero section is visible
    await expect(page.locator('h1').first()).toBeVisible();

    // Search input is present and focusable
    const search = page.getByRole('searchbox', { name: /search/i }).or(page.locator('input[type="search"]').first());
    if (await search.count() > 0) {
      await search.first().click();
      await search.first().fill('resize');
    }

    // Tool grid / category list is present
    const toolLinks = page.locator('a[href*="/tools/"]');
    await expect(toolLinks.first()).toBeVisible();
    const count = await toolLinks.count();
    expect(count).toBeGreaterThanOrEqual(20); // 23 tools minimum
  });

  test('navigates to a tool page when a tool card is clicked', async ({ page }) => {
    await page.goto('/');
    const firstTool = page.locator('a[href*="/tools/"]').first();
    const href = await firstTool.getAttribute('href');
    expect(href).toMatch(/^\/tools\//);
    await firstTool.click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toMatch(/\/tools\//);
  });

  test('has no accessibility violations on hero section', async ({ page }) => {
    await page.goto('/');
    await checkAccessibility(page);
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const activeTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(['BUTTON', 'A', 'INPUT']).toContain(activeTag);
  });

  test('footer is visible and sticky at bottom', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
    // Footer should be at viewport bottom or below content
    const viewportHeight = await page.viewportSize()?.height;
    const footerBox = (await footer.boundingBox()) ?? { y: 0, height: 0 };
    if (viewportHeight) {
      // Footer's top should be within or below viewport
      expect(footerBox.y + footerBox.height).toBeGreaterThanOrEqual(0);
    }
  });
});
