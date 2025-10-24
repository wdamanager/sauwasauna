/**
 * Visual Inspection Script - Benefits + Blog Section
 *
 * This script opens the page and allows manual inspection
 */

import { test } from '@playwright/test';

test('Visual inspection of Benefits + Blog section', async ({ page }) => {
  // Navigate to page
  await page.goto('http://localhost:4325/es');

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  // Scroll to section
  await page.locator('#beneficios-blog').scrollIntoViewIfNeeded();

  // Wait for animations
  await page.waitForTimeout(2000);

  // Keep browser open for inspection
  await page.pause();
});
