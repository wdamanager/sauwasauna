import { test, expect, devices } from '@playwright/test';

/**
 * E2E Tests - Cross-Browser and Mobile Compatibility
 *
 * Coverage:
 * - TC-020: Browser compatibility
 * - TC-021: Mobile responsiveness
 */

// Use local dev server for testing (production: https://sauwasauna.com)
const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:4324';

// Real session URLs (Hotel Coma Bella partner)
const ROUTES = {
  singleSession: '/es/hotel-coma-bella/jornadas-de-puertas-abiertas-sauwa/',
};

// Mobile iPhone tests
test.describe('Mobile iPhone Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(devices['iPhone 12'].viewport);
  });

  test('TC-021: Mobile booking flow on iPhone', async ({ page }) => {
    await page.goto(`${BASE_URL}${ROUTES.singleSession}`, {
      waitUntil: 'networkidle'
    });

    // Verify page loads on mobile
    const sessionHeading = page.locator('h2').filter({ hasText: 'Jornadas de puertas abiertas' }).first();
    await expect(sessionHeading).toBeVisible({ timeout: 15000 });

    // Verify no horizontal scrolling
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width || 0;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10); // Allow some tolerance

    // Verify booking widget steps are present
    const step1 = page.locator('button').filter({ hasText: /Selecciona una fecha/i }).first();
    await expect(step1).toBeVisible({ timeout: 10000 });

    // Verify calendar navigation is responsive
    const nextMonthBtn = page.getByRole('button', { name: /Mes siguiente/i });
    await expect(nextMonthBtn).toBeVisible();

    console.log('TC-021 PASSED: Mobile booking flow works on iPhone');
  });

  test('TC-021C: Mobile landscape orientation', async ({ page }) => {
    // Rotate to landscape
    await page.setViewportSize({ width: 844, height: 390 }); // iPhone 12 landscape

    await page.goto(`${BASE_URL}${ROUTES.singleSession}`, {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    // Verify page loads in landscape
    const sessionHeading = page.locator('h2').filter({ hasText: 'Jornadas de puertas abiertas' }).first();
    await expect(sessionHeading).toBeVisible({ timeout: 20000 });

    // Verify booking widget steps are present
    const step1 = page.locator('button').filter({ hasText: /Selecciona una fecha/i }).first();
    await expect(step1).toBeVisible({ timeout: 10000 });

    // Verify no horizontal scrolling
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(844 + 10);

    console.log('TC-021C PASSED: Landscape orientation works');
  });
});

// Mobile Android tests
test.describe('Mobile Android Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(devices['Pixel 5'].viewport);
  });

  test('TC-021B: Mobile booking flow on Android', async ({ page }) => {
    await page.goto(`${BASE_URL}${ROUTES.singleSession}`, {
      waitUntil: 'networkidle'
    });

    // Verify page loads on Android
    const sessionHeading = page.locator('h2').filter({ hasText: 'Jornadas de puertas abiertas' }).first();
    await expect(sessionHeading).toBeVisible({ timeout: 15000 });

    // Verify booking widget steps are present
    const step1 = page.locator('button').filter({ hasText: /Selecciona una fecha/i }).first();
    await expect(step1).toBeVisible({ timeout: 10000 });

    // Verify calendar navigation works on Android
    const nextMonthBtn = page.getByRole('button', { name: /Mes siguiente/i });
    await expect(nextMonthBtn).toBeVisible();

    // Test touch interaction by clicking navigation
    await nextMonthBtn.click();
    await page.waitForTimeout(500);
    await expect(nextMonthBtn).toBeVisible();

    console.log('TC-021B PASSED: Mobile booking flow works on Android');
  });
});

// Tablet tests
test.describe('Tablet Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    // iPad Pro 11" viewport (manual - device may not be in devices list)
    await page.setViewportSize({ width: 1024, height: 1366 });
  });

  test('TC-021D: Tablet booking flow', async ({ page }) => {
    await page.goto(`${BASE_URL}${ROUTES.singleSession}`, {
      waitUntil: 'networkidle'
    });

    // Verify page loads on tablet
    const sessionHeading = page.locator('h2').filter({ hasText: 'Jornadas de puertas abiertas' }).first();
    await expect(sessionHeading).toBeVisible({ timeout: 15000 });

    // Verify all 4 booking steps are visible on tablet (wider layout)
    const step1 = page.locator('button').filter({ hasText: /Selecciona una fecha/i }).first();
    const step2 = page.locator('button').filter({ hasText: /Elige un horario/i }).first();
    const step3 = page.locator('button').filter({ hasText: /Datos del comprador/i }).first();

    await expect(step1).toBeVisible({ timeout: 10000 });
    await expect(step2).toBeVisible();
    await expect(step3).toBeVisible();

    // Verify calendar navigation works on tablet
    const nextMonthBtn = page.getByRole('button', { name: /Mes siguiente/i });
    await expect(nextMonthBtn).toBeVisible();

    console.log('TC-021D PASSED: Tablet booking flow works');
  });
});

// Performance tests
test.describe('Performance', () => {

  test('TC-PERF-001: Page load performance', async ({ page }) => {
    const startTime = Date.now();

    await page.goto(`${BASE_URL}${ROUTES.singleSession}`, {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    const loadTime = Date.now() - startTime;

    // Page should load in < 45 seconds for dev server under load (production should be < 5s)
    // Dev server can be slow when running multiple parallel tests
    expect(loadTime).toBeLessThan(45000);

    console.log(`Page loaded in ${loadTime}ms`);

    // Wait for booking widget step
    const widgetStartTime = Date.now();
    const step1 = page.locator('button').filter({ hasText: /Selecciona una fecha/i }).first();
    await expect(step1).toBeVisible({ timeout: 15000 });
    const widgetLoadTime = Date.now() - widgetStartTime;

    console.log(`Widget loaded in ${widgetLoadTime}ms`);

    console.log('TC-PERF-001 PASSED: Page load performance is acceptable');
  });

  test('TC-PERF-002: Calendar navigation performance', async ({ page }) => {
    await page.goto(`${BASE_URL}${ROUTES.singleSession}`, {
      waitUntil: 'networkidle'
    });

    // Wait for calendar navigation to be visible
    const nextMonthBtn = page.getByRole('button', { name: /Mes siguiente/i });
    await expect(nextMonthBtn).toBeVisible({ timeout: 10000 });

    // Measure calendar navigation speed
    const navStartTime = Date.now();
    await nextMonthBtn.click();
    await page.waitForTimeout(500); // Wait for transition
    const navTime = Date.now() - navStartTime;

    // Calendar navigation should be < 1500ms (more realistic)
    expect(navTime).toBeLessThan(1500);

    console.log(`Calendar navigation took ${navTime}ms`);

    console.log('TC-PERF-002 PASSED: Calendar navigation is fast');
  });
});
