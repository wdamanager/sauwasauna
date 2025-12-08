import { test, expect } from '@playwright/test';

/**
 * E2E Tests - Multi-Locale Support
 *
 * Coverage:
 * - TC-016: Locale switching and translations
 * - TC-002: GraphQL integration for partner pages
 */

const BASE_URL = 'https://sauwasauna.com';
const LOCALES = ['es', 'ca', 'en', 'fr'];

test.describe('Multi-Locale Support', () => {

  LOCALES.forEach(locale => {
    test(`TC-016: ${locale.toUpperCase()} - Partner page loads with translations`, async ({ page }) => {
      // Navigate to partner page in specific locale
      await page.goto(`${BASE_URL}/${locale}/hotel-coma-bella/`, {
        waitUntil: 'networkidle'
      });

      // Verify URL contains locale
      await expect(page).toHaveURL(new RegExp(`/${locale}/hotel-coma-bella`));

      // Verify page loads
      const partnerHeading = page.locator('h1, h2').first();
      await expect(partnerHeading).toBeVisible();

      // Verify sessions list renders
      const sessionsList = page.locator('.session-card, [data-session-type]').first();
      await expect(sessionsList).toBeVisible({ timeout: 10000 });

      // Check for locale-specific content
      // Each locale should have different translations
      const pageContent = await page.textContent('body');

      switch (locale) {
        case 'es':
          // Spanish content check
          expect(pageContent).toMatch(/reserva|sesión|disponible/i);
          break;
        case 'ca':
          // Catalan content check
          expect(pageContent).toMatch(/reserva|sessió|disponible/i);
          break;
        case 'en':
          // English content check
          expect(pageContent).toMatch(/book|session|available/i);
          break;
        case 'fr':
          // French content check
          expect(pageContent).toMatch(/réserve|session|disponible/i);
          break;
      }

      // Take screenshot for each locale
      await page.screenshot({
        path: `test-results/tc-016-locale-${locale}.png`,
        fullPage: true
      });

      console.log(`✓ TC-016 PASSED: ${locale.toUpperCase()} locale works correctly`);
    });

    test(`TC-016B: ${locale.toUpperCase()} - Session detail page translations`, async ({ page }) => {
      // Navigate to session detail in specific locale
      await page.goto(`${BASE_URL}/${locale}/hotel-coma-bella/jornadas-de-puertas-abiertas/`, {
        waitUntil: 'networkidle'
      });

      // Verify booking widget loads
      const widget = page.locator('.booking-widget, [data-widget-type]');
      await expect(widget).toBeVisible({ timeout: 15000 });

      // Verify translations exist
      const translations = await widget.getAttribute('data-translations');

      if (translations) {
        const t = JSON.parse(translations);

        // All locales should have error translations
        expect(t.errorSlotFull).toBeDefined();
        expect(t.errorGeneric).toBeDefined();

        console.log(`✓ ${locale.toUpperCase()} translations loaded:`, {
          slotFull: t.errorSlotFull,
          generic: t.errorGeneric
        });
      }

      console.log(`✓ TC-016B PASSED: ${locale.toUpperCase()} session page has translations`);
    });
  });

  test('TC-016C: Locale switching persists across navigation', async ({ page }) => {
    // Start in Spanish
    await page.goto(`${BASE_URL}/es/hotel-coma-bella/`, {
      waitUntil: 'networkidle'
    });

    await expect(page).toHaveURL(/\/es\//);

    // Click on a session (should stay in Spanish)
    const firstSession = page.locator('.session-card a, a[href*="/es/"]').first();
    if (await firstSession.count() > 0) {
      await firstSession.click();
      await page.waitForLoadState('networkidle');

      // Verify still in Spanish locale
      await expect(page).toHaveURL(/\/es\//);
      console.log('✓ Locale persisted after navigation');
    }

    // Test locale switcher if present
    const localeSwitcher = page.locator('[data-locale-switcher], .language-selector').first();
    if (await localeSwitcher.count() > 0) {
      await expect(localeSwitcher).toBeVisible();

      // Try to switch to Catalan
      const catalanLink = page.locator('a[href*="/ca/"]').first();
      if (await catalanLink.count() > 0) {
        await catalanLink.click();
        await page.waitForLoadState('networkidle');

        // Verify switched to Catalan
        await expect(page).toHaveURL(/\/ca\//);
        console.log('✓ Locale switcher works');
      }
    }

    console.log('✓ TC-016C PASSED: Locale persistence validated');
  });
});

test.describe('GraphQL Integration', () => {

  test('TC-002: Partner sessions GraphQL query', async ({ page, request }) => {
    // Test GraphQL endpoint directly
    const response = await request.post('https://backend.sauwasauna.com/graphql', {
      data: {
        query: `
          query GetPartner($slug: String!) {
            partner(slug: $slug) {
              id
              name
              slug
              sessions {
                id
                title
                slug
                sessionType
                price
                capacity
              }
            }
          }
        `,
        variables: {
          slug: 'hotel-coma-bella'
        }
      }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.partner).toBeDefined();
    expect(body.data.partner.sessions).toBeDefined();

    const sessions = body.data.partner.sessions;
    expect(sessions.length).toBeGreaterThan(0);

    // Verify each session has required fields
    sessions.forEach((session: any) => {
      expect(session.id).toBeDefined();
      expect(session.title).toBeDefined();
      expect(session.slug).toBeDefined();
      expect(session.sessionType).toBeDefined();
      expect(['single', 'private', 'voucher']).toContain(session.sessionType);
    });

    console.log('✓ TC-002 PASSED: GraphQL returns partner sessions');
    console.log(`  Partner: ${body.data.partner.name}`);
    console.log(`  Sessions: ${sessions.length}`);
    console.log(`  Session types:`, sessions.map((s: any) => s.sessionType));
  });

  test('TC-002B: GraphQL data renders correctly on page', async ({ page }) => {
    // Navigate to partner page
    await page.goto(`${BASE_URL}/es/hotel-coma-bella/`, {
      waitUntil: 'networkidle'
    });

    // Wait for sessions to render
    const sessionCards = page.locator('.session-card, [data-session-type]');
    await expect(sessionCards.first()).toBeVisible({ timeout: 10000 });

    const sessionCount = await sessionCards.count();
    expect(sessionCount).toBeGreaterThan(0);

    // Verify each session card has required data
    for (let i = 0; i < Math.min(sessionCount, 5); i++) {
      const card = sessionCards.nth(i);

      // Should have title
      const title = card.locator('h2, h3, .session-title');
      await expect(title.first()).toBeVisible();

      // Should have session type indicator
      const typeIndicator = card.locator('[data-session-type], .session-type');
      if (await typeIndicator.count() > 0) {
        const type = await typeIndicator.getAttribute('data-session-type');
        expect(['single', 'private', 'voucher']).toContain(type);
      }

      // Should have price (if not free)
      const price = card.locator('.price, [data-price]');
      if (await price.count() > 0) {
        await expect(price.first()).toBeVisible();
      }
    }

    await page.screenshot({
      path: 'test-results/tc-002b-graphql-rendering.png',
      fullPage: true
    });

    console.log(`✓ TC-002B PASSED: GraphQL data rendered correctly (${sessionCount} sessions)`);
  });

  test('TC-002C: GraphQL handles errors gracefully', async ({ request }) => {
    // Test with invalid partner slug
    const response = await request.post('https://backend.sauwasauna.com/graphql', {
      data: {
        query: `
          query GetPartner($slug: String!) {
            partner(slug: $slug) {
              id
              name
            }
          }
        `,
        variables: {
          slug: 'non-existent-partner-xyz'
        }
      }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    // Should return null for non-existent partner
    expect(body.data.partner).toBeNull();

    console.log('✓ TC-002C PASSED: GraphQL handles invalid data gracefully');
  });
});

test.describe('Dynamic Routes', () => {

  test('TC-WDA-963: Dynamic partner route renders', async ({ page }) => {
    // Test dynamic route pattern: /[locale]/[partnerSlug]/
    const testRoutes = [
      '/es/hotel-coma-bella/',
      '/ca/hotel-coma-bella/',
      '/en/hotel-coma-bella/',
      '/fr/hotel-coma-bella/'
    ];

    for (const route of testRoutes) {
      await page.goto(`${BASE_URL}${route}`, {
        waitUntil: 'networkidle'
      });

      // Verify page loads without 404
      const notFound = page.locator('text=/404|not found|no encontrado/i');
      expect(await notFound.count()).toBe(0);

      // Verify partner content loads
      const content = page.locator('.session-card, [data-session-type]').first();
      await expect(content).toBeVisible({ timeout: 10000 });

      console.log(`✓ Route ${route} renders correctly`);
    }

    console.log('✓ TC-WDA-963 PASSED: All dynamic partner routes work');
  });

  test('TC-WDA-963B: Dynamic session route renders', async ({ page }) => {
    // Test dynamic route pattern: /[locale]/[partnerSlug]/[sessionSlug]/
    const testRoutes = [
      '/es/hotel-coma-bella/jornadas-de-puertas-abiertas/',
      '/ca/hotel-coma-bella/jornadas-de-puertas-abiertas/',
      '/en/hotel-coma-bella/jornadas-de-puertas-abiertas/'
    ];

    for (const route of testRoutes) {
      await page.goto(`${BASE_URL}${route}`, {
        waitUntil: 'networkidle'
      });

      // Verify page loads without 404
      const notFound = page.locator('text=/404|not found/i');
      expect(await notFound.count()).toBe(0);

      // Verify booking widget loads
      const widget = page.locator('.booking-widget, [data-widget-type]');
      await expect(widget).toBeVisible({ timeout: 15000 });

      console.log(`✓ Route ${route} renders correctly`);
    }

    console.log('✓ TC-WDA-963B PASSED: All dynamic session routes work');
  });
});
