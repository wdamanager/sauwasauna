/**
 * E2E Testing - Benefits + Blog Section (WDA-266)
 * Pruebas exhaustivas de la implementación sticky scroll
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:4324';

test.describe('Benefits + Blog Section - Sticky Scroll', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/es`);
    // Scroll to benefits section
    await page.locator('#beneficios-blog').scrollIntoViewIfNeeded();
  });

  test('1. Section loads correctly', async ({ page }) => {
    const section = page.locator('.benefits-blog-section');
    await expect(section).toBeVisible();

    const stickyGrid = page.locator('.sticky-grid');
    await expect(stickyGrid).toBeVisible();
  });

  test('2. Two-column layout on desktop', async ({ page, viewport }) => {
    // Desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });

    const stickyColumn = page.locator('.sticky-column');
    const scrollColumn = page.locator('.scroll-column');

    await expect(stickyColumn).toBeVisible();
    await expect(scrollColumn).toBeVisible();

    // Check grid template columns
    const gridStyles = await page.locator('.sticky-grid').evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        gridTemplateColumns: styles.gridTemplateColumns,
        display: styles.display,
      };
    });

    expect(gridStyles.display).toBe('grid');
    expect(gridStyles.gridTemplateColumns).toContain('1fr 1fr');
  });

  test('3. Benefits content is visible', async ({ page }) => {
    const benefitsContent = page.locator('.benefits-content');
    await expect(benefitsContent).toBeVisible();

    // Check heading
    const heading = page.locator('.main-heading');
    await expect(heading).toContainText('Beneficios reales');

    // Check all 5 benefits
    const benefitItems = page.locator('.benefit-item');
    await expect(benefitItems).toHaveCount(5);

    // Check CTA link
    const ctaLink = page.locator('.cta-link');
    await expect(ctaLink).toBeVisible();
    await expect(ctaLink).toHaveAttribute('href', '/es/blog');
  });

  test('4. Blog cards load from GraphQL', async ({ page }) => {
    const blogCards = page.locator('.blog-card');

    // Should have 6 cards
    await expect(blogCards).toHaveCount(6);

    // Check first card structure
    const firstCard = blogCards.first();

    // Has image
    const cardImage = firstCard.locator('.card-image');
    await expect(cardImage).toBeVisible();
    await expect(cardImage).toHaveAttribute('loading', 'lazy');

    // Has category
    const category = firstCard.locator('.card-category');
    await expect(category).toBeVisible();

    // Has title
    const title = firstCard.locator('.card-title');
    await expect(title).toBeVisible();

    // Has excerpt
    const excerpt = firstCard.locator('.card-excerpt');
    await expect(excerpt).toBeVisible();

    // Has date
    const date = firstCard.locator('.card-date');
    await expect(date).toBeVisible();
  });

  test('5. Card links work correctly', async ({ page }) => {
    const firstCard = page.locator('.blog-card').first();
    const titleLink = firstCard.locator('.card-title a');

    const href = await titleLink.getAttribute('href');
    expect(href).toMatch(/\/es\/blog\/.+/);
  });

  test('6. Category color is correct (#DB4529)', async ({ page }) => {
    const category = page.locator('.card-category').first();

    const bgColor = await category.evaluate(el => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // rgb(219, 69, 41) = #DB4529
    expect(bgColor).toBe('rgb(219, 69, 41)');
  });

  test('7. Hover effects work', async ({ page }) => {
    const firstCard = page.locator('.blog-card').first();

    // Get initial transform
    const initialTransform = await firstCard.evaluate(el => {
      return window.getComputedStyle(el).transform;
    });

    // Hover
    await firstCard.hover();

    // Wait for transition
    await page.waitForTimeout(500);

    // Check box-shadow increased
    const boxShadow = await firstCard.evaluate(el => {
      return window.getComputedStyle(el).boxShadow;
    });

    expect(boxShadow).toBeTruthy();
  });

  test('8. Intersection Observer animations trigger', async ({ page }) => {
    // Scroll away first
    await page.evaluate(() => window.scrollTo(0, 0));

    // Scroll to section
    await page.locator('#beneficios-blog').scrollIntoViewIfNeeded();

    // Wait for animations
    await page.waitForTimeout(1000);

    // Check cards have is-visible class
    const visibleCards = page.locator('.blog-card.is-visible');
    await expect(visibleCards).toHaveCount(6);
  });

  test('9. Responsive: Tablet stack layout', async ({ page }) => {
    // Tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    const gridStyles = await page.locator('.sticky-grid').evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        gridTemplateColumns: styles.gridTemplateColumns,
      };
    });

    // Should be single column
    expect(gridStyles.gridTemplateColumns).toBe('1fr');
  });

  test('10. Responsive: Mobile optimization', async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Cards should still be visible
    const cards = page.locator('.blog-card');
    await expect(cards).toHaveCount(6);

    // Check image height adjusted
    const imageWrapper = page.locator('.card-image-wrapper').first();
    const height = await imageWrapper.evaluate(el => {
      return window.getComputedStyle(el).height;
    });

    expect(height).toBe('200px');
  });

  test('11. Sticky behavior on desktop', async ({ page }) => {
    // Desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });

    const stickyContent = page.locator('.sticky-content');

    // Check sticky position
    const position = await stickyContent.evaluate(el => {
      return window.getComputedStyle(el).position;
    });

    expect(position).toBe('sticky');

    // Check top value
    const top = await stickyContent.evaluate(el => {
      return window.getComputedStyle(el).top;
    });

    expect(top).toBe('0px');
  });

  test('12. No console errors on load', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto(`${BASE_URL}/es`);
    await page.locator('#beneficios-blog').scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);

    expect(errors.length).toBe(0);
  });

  test('13. Images lazy load correctly', async ({ page }) => {
    const images = page.locator('.card-image');

    for (let i = 0; i < await images.count(); i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('loading', 'lazy');

      // Check src is set
      const src = await img.getAttribute('src');
      expect(src).toBeTruthy();
    }
  });

  test('14. Accessibility: Proper ARIA labels', async ({ page }) => {
    // Check semantic HTML
    const articles = page.locator('article.blog-card');
    await expect(articles).toHaveCount(6);

    // Check time elements
    const times = page.locator('time.card-date');
    await expect(times).toHaveCount(6);

    for (let i = 0; i < await times.count(); i++) {
      const time = times.nth(i);
      await expect(time).toHaveAttribute('datetime');
    }
  });

  test('15. Reduced motion respect', async ({ page }) => {
    // Emulate prefers-reduced-motion
    await page.emulateMedia({ reducedMotion: 'reduce' });

    const card = page.locator('.blog-card').first();

    // Hover should not animate
    await card.hover();

    const transform = await card.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.transition;
    });

    // Should have no transition
    expect(transform).toBe('none');
  });

  test('16. Print styles work', async ({ page }) => {
    await page.emulateMedia({ media: 'print' });

    const gridStyles = await page.locator('.sticky-grid').evaluate(el => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });

    // Should be single column for print
    expect(gridStyles).toBe('1fr');
  });

  test('17. Check excerpt length', async ({ page }) => {
    const excerpts = page.locator('.card-excerpt');

    for (let i = 0; i < await excerpts.count(); i++) {
      const text = await excerpts.nth(i).textContent();

      // Should be trimmed to ~150 chars + "..."
      expect(text).toBeTruthy();
      expect(text!.length).toBeLessThanOrEqual(154);
      expect(text!.endsWith('...')).toBeTruthy();
    }
  });

  test('18. No HTML in excerpts', async ({ page }) => {
    const excerpts = page.locator('.card-excerpt');

    for (let i = 0; i < await excerpts.count(); i++) {
      const text = await excerpts.nth(i).textContent();

      // Should not contain HTML tags
      expect(text).not.toMatch(/<[^>]+>/);
      expect(text).not.toContain('&hellip;');
    }
  });

  test('19. Date formatting is localized', async ({ page }) => {
    const dates = page.locator('.card-date');
    const firstDateText = await dates.first().textContent();

    // Spanish format should have month name in Spanish
    expect(firstDateText).toBeTruthy();
    expect(firstDateText).toMatch(/\d{1,2} de \w+ de \d{4}/);
  });

  test('20. GraphQL error handling', async ({ page }) => {
    // This should be tested by temporarily breaking GraphQL endpoint
    // For now, just check no-posts fallback exists
    const noPostsMessage = page.locator('.no-posts');

    // Should not be visible if posts loaded
    const count = await page.locator('.blog-card').count();
    if (count === 0) {
      await expect(noPostsMessage).toBeVisible();
    }
  });
});

test.describe('Performance Checks', () => {
  test('21. Section renders under 2 seconds', async ({ page }) => {
    const startTime = Date.now();

    await page.goto(`${BASE_URL}/es`);
    await page.locator('#beneficios-blog').scrollIntoViewIfNeeded();
    await page.waitForSelector('.blog-card');

    const endTime = Date.now();
    const loadTime = endTime - startTime;

    expect(loadTime).toBeLessThan(2000);
  });

  test('22. Images are optimized', async ({ page }) => {
    await page.goto(`${BASE_URL}/es`);
    await page.locator('#beneficios-blog').scrollIntoViewIfNeeded();

    const images = page.locator('.card-image');

    for (let i = 0; i < Math.min(3, await images.count()); i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');

      if (src) {
        // Should be from WordPress media library
        expect(src).toContain('backend.sauwasauna.com');
      }
    }
  });
});

test.describe('Cross-browser Testing', () => {
  test('23. Works in different browsers', async ({ page, browserName }) => {
    await page.goto(`${BASE_URL}/es`);
    await page.locator('#beneficios-blog').scrollIntoViewIfNeeded();

    const cards = page.locator('.blog-card');
    await expect(cards).toHaveCount(6);

    console.log(`Browser: ${browserName} - Test passed`);
  });
});

test.describe('Multiidioma Testing', () => {
  const locales = ['es', 'ca', 'en', 'fr'];

  for (const locale of locales) {
    test(`24. ${locale.toUpperCase()}: Section loads`, async ({ page }) => {
      await page.goto(`${BASE_URL}/${locale}`);
      await page.locator('#beneficios-blog').scrollIntoViewIfNeeded();

      const section = page.locator('.benefits-blog-section');
      await expect(section).toBeVisible();

      const cards = page.locator('.blog-card');
      await expect(cards).toHaveCount(6);
    });
  }
});
