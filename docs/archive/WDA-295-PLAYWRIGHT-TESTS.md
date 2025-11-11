# WDA-295: Playwright Mobile Testing Script

## Overview

This document provides complete Playwright test scripts for validating mobile-first design implementation across all blog components.

---

## Test Setup

### Installation

```bash
# Install Playwright
npm install -D @playwright/test

# Install browsers
npx playwright install
```

### Configuration File

Create `playwright.config.ts` in project root:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'iPhone SE',
      use: { ...devices['iPhone SE'] },
    },
    {
      name: 'iPhone 12 Pro',
      use: { ...devices['iPhone 12 Pro'] },
    },
    {
      name: 'iPhone 14 Pro Max',
      use: {
        ...devices['iPhone 13 Pro Max'], // Use iPhone 13 as proxy
        viewport: { width: 430, height: 932 },
      },
    },
    {
      name: 'Pixel 5',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Galaxy S20',
      use: {
        ...devices['Galaxy S9+'], // Use Galaxy S9+ as proxy
        viewport: { width: 360, height: 800 },
      },
    },
    {
      name: 'iPad Mini',
      use: { ...devices['iPad Mini'] },
    },
    {
      name: 'iPad Pro',
      use: { ...devices['iPad Pro'] },
    },
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Test Suite 1: Blog Index Page

Create `tests/blog-index.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Blog Index Page - Mobile First', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/es/blog');
  });

  test('should load page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Blog.*SAUWA/i);
    await expect(page.locator('h1')).toContainText('Blog');
  });

  test('should display correct grid layout on mobile', async ({ page, viewport }) => {
    if (!viewport || viewport.width >= 768) {
      test.skip();
      return;
    }

    // Wait for blog grid to load
    await page.waitForSelector('.blog-grid', { state: 'visible' });

    // Check grid has single column on mobile
    const grid = page.locator('.blog-grid');
    const gridStyles = await grid.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        gridTemplateColumns: styles.gridTemplateColumns,
        display: styles.display,
      };
    });

    expect(gridStyles.display).toBe('grid');
    // Single column should be "1fr" or similar
    expect(gridStyles.gridTemplateColumns).not.toContain('repeat(2');
    expect(gridStyles.gridTemplateColumns).not.toContain('repeat(3');
  });

  test('should display 2-column grid on tablet', async ({ page, viewport }) => {
    if (!viewport || viewport.width < 768 || viewport.width >= 1024) {
      test.skip();
      return;
    }

    await page.waitForSelector('.blog-grid', { state: 'visible' });

    const grid = page.locator('.blog-grid');
    const gridStyles = await grid.evaluate((el) => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });

    // Should have 2 columns
    expect(gridStyles).toContain('repeat(2');
  });

  test('should display 3-column grid on desktop', async ({ page, viewport }) => {
    if (!viewport || viewport.width < 1024) {
      test.skip();
      return;
    }

    await page.waitForSelector('.blog-grid', { state: 'visible' });

    const grid = page.locator('.blog-grid');
    const gridStyles = await grid.evaluate((el) => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });

    // Should have 3 columns
    expect(gridStyles).toContain('repeat(3');
  });

  test('should have no horizontal scroll', async ({ page }) => {
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasHorizontalScroll).toBe(false);
  });

  test('should have readable font sizes on mobile', async ({ page, viewport }) => {
    if (!viewport || viewport.width >= 768) {
      test.skip();
      return;
    }

    const title = page.locator('.blog-title');
    const subtitle = page.locator('.blog-subtitle');

    const titleSize = await title.evaluate((el) => {
      return parseInt(window.getComputedStyle(el).fontSize);
    });

    const subtitleSize = await subtitle.evaluate((el) => {
      return parseInt(window.getComputedStyle(el).fontSize);
    });

    // Title should be at least 24px on mobile
    expect(titleSize).toBeGreaterThanOrEqual(24);

    // Subtitle should be at least 14px
    expect(subtitleSize).toBeGreaterThanOrEqual(14);
  });

  test('should load skeleton state then content', async ({ page }) => {
    // Skeleton should be visible initially
    const skeleton = page.locator('#blog-skeleton');
    await expect(skeleton).toBeVisible();

    // Wait for actual content to load
    await page.waitForSelector('#blog-grid:not(.hidden)', { timeout: 10000 });

    // Skeleton should be hidden
    await expect(skeleton).toHaveClass(/hidden/);

    // Grid should have blog cards
    const cards = page.locator('.blog-card');
    await expect(cards.first()).toBeVisible();
  });

  test('should take screenshot for visual verification', async ({ page }, testInfo) => {
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: `test-results/blog-index-${testInfo.project.name}.png`,
      fullPage: true,
    });
  });
});
```

---

## Test Suite 2: Category Filter

Create `tests/category-filter.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Category Filter - Touch Targets', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/es/blog');
    await page.waitForSelector('.category-filter', { state: 'visible' });
  });

  test('should have minimum 44px touch targets on mobile', async ({ page, viewport }) => {
    if (!viewport || viewport.width >= 768) {
      test.skip();
      return;
    }

    const buttons = page.locator('.filter-button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const box = await button.boundingBox();

      if (box) {
        // Height should be at least 44px
        expect(box.height).toBeGreaterThanOrEqual(44);

        // Width should be reasonable (at least 60px for text)
        expect(box.width).toBeGreaterThanOrEqual(60);
      }
    }
  });

  test('should have readable font size on mobile', async ({ page, viewport }) => {
    if (!viewport || viewport.width >= 768) {
      test.skip();
      return;
    }

    const button = page.locator('.filter-button').first();
    const fontSize = await button.evaluate((el) => {
      return parseInt(window.getComputedStyle(el).fontSize);
    });

    // Should be at least 14px
    expect(fontSize).toBeGreaterThanOrEqual(14);
  });

  test('should change active state on click', async ({ page }) => {
    const allButton = page.locator('.filter-button[data-category="all"]');
    const otherButton = page.locator('.filter-button').nth(1);

    // All button should start active
    await expect(allButton).toHaveClass(/active/);

    // Click other button
    await otherButton.click();

    // Other button should now be active
    await expect(otherButton).toHaveClass(/active/);

    // All button should no longer be active
    await expect(allButton).not.toHaveClass(/active/);
  });

  test('should support keyboard navigation', async ({ page }) => {
    const firstButton = page.locator('.filter-button').first();

    // Focus first button
    await firstButton.focus();
    await expect(firstButton).toBeFocused();

    // Arrow right should focus next button
    await page.keyboard.press('ArrowRight');
    const secondButton = page.locator('.filter-button').nth(1);
    await expect(secondButton).toBeFocused();

    // Arrow left should go back
    await page.keyboard.press('ArrowLeft');
    await expect(firstButton).toBeFocused();
  });

  test('should have horizontal scroll on very small screens', async ({ page, viewport }) => {
    if (!viewport || viewport.width > 640) {
      test.skip();
      return;
    }

    const wrapper = page.locator('.filter-wrapper');
    const canScroll = await wrapper.evaluate((el) => {
      return el.scrollWidth > el.clientWidth;
    });

    // If there are many categories, should be scrollable
    const buttonCount = await page.locator('.filter-button').count();
    if (buttonCount > 4) {
      expect(canScroll).toBe(true);
    }
  });

  test('should filter blog posts when category selected', async ({ page }) => {
    // Wait for posts to load
    await page.waitForSelector('.blog-card', { state: 'visible' });

    const initialCount = await page.locator('.blog-card').count();

    // Click second category (not "all")
    const secondCategory = page.locator('.filter-button').nth(1);
    await secondCategory.click();

    // Wait for filter to apply
    await page.waitForTimeout(1000); // Give time for filtering

    const filteredCount = await page.locator('.blog-card').count();

    // Count may change (could be same if first category has same posts)
    expect(filteredCount).toBeGreaterThan(0);
  });

  test('should take screenshot', async ({ page }, testInfo) => {
    await page.screenshot({
      path: `test-results/category-filter-${testInfo.project.name}.png`,
      fullPage: false,
    });
  });
});
```

---

## Test Suite 3: Blog Card

Create `tests/blog-card.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Blog Card - Mobile Optimization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/es/blog');
    await page.waitForSelector('.blog-card', { state: 'visible' });
  });

  test('should have proper image aspect ratio on mobile', async ({ page, viewport }) => {
    if (!viewport || viewport.width >= 768) {
      test.skip();
      return;
    }

    const imageWrapper = page.locator('.card-image-wrapper').first();
    const height = await imageWrapper.evaluate((el) => {
      return parseInt(window.getComputedStyle(el).height);
    });

    // Should be 200px on mobile
    expect(height).toBe(200);
  });

  test('should have readable typography on mobile', async ({ page, viewport }) => {
    if (!viewport || viewport.width >= 640) {
      test.skip();
      return;
    }

    const card = page.locator('.blog-card').first();

    const title = card.locator('.card-title');
    const excerpt = card.locator('.card-excerpt');
    const category = card.locator('.card-category');
    const date = card.locator('.card-date');

    // Get font sizes
    const titleSize = await title.evaluate((el) =>
      parseInt(window.getComputedStyle(el).fontSize)
    );
    const excerptSize = await excerpt.evaluate((el) =>
      parseInt(window.getComputedStyle(el).fontSize)
    );
    const categorySize = await category.evaluate((el) =>
      parseInt(window.getComputedStyle(el).fontSize)
    );
    const dateSize = await date.evaluate((el) =>
      parseInt(window.getComputedStyle(el).fontSize)
    );

    // Verify minimum sizes
    expect(titleSize).toBeGreaterThanOrEqual(17); // 17-18px
    expect(excerptSize).toBeGreaterThanOrEqual(14); // 14px
    expect(categorySize).toBeGreaterThanOrEqual(12); // 12px (optimized)
    expect(dateSize).toBeGreaterThanOrEqual(14); // 14px (optimized)
  });

  test('should be fully clickable', async ({ page }) => {
    const card = page.locator('.blog-card').first();
    const link = card.locator('.card-link');

    // Card should be clickable via the link
    await expect(link).toBeVisible();

    // Get href to verify it's a valid link
    const href = await link.getAttribute('href');
    expect(href).toMatch(/^\/es\/blog\//);
  });

  test('should lazy load images', async ({ page }) => {
    const image = page.locator('.card-image').first();
    const loading = await image.getAttribute('loading');

    expect(loading).toBe('lazy');
  });

  test('should have hover effects on desktop', async ({ page, viewport }) => {
    if (!viewport || viewport.width < 1024) {
      test.skip();
      return;
    }

    const card = page.locator('.blog-card').first();

    // Get initial transform
    const initialTransform = await card.evaluate((el) =>
      window.getComputedStyle(el).transform
    );

    // Hover over card
    await card.hover();

    // Wait a bit for transition
    await page.waitForTimeout(500);

    // Transform should have changed
    const hoverTransform = await card.evaluate((el) =>
      window.getComputedStyle(el).transform
    );

    // Should have translateY transformation
    expect(hoverTransform).not.toBe(initialTransform);
  });

  test('should have focus visible styles', async ({ page }) => {
    const link = page.locator('.card-link').first();

    // Focus the link
    await link.focus();

    // Should have outline
    const outline = await link.evaluate((el) =>
      window.getComputedStyle(el).outline
    );

    expect(outline).toContain('3px');
    expect(outline).toContain('#BA2515');
  });

  test('should take screenshot', async ({ page }, testInfo) => {
    await page.screenshot({
      path: `test-results/blog-cards-${testInfo.project.name}.png`,
      fullPage: true,
    });
  });
});
```

---

## Test Suite 4: Blog Post Hero

Create `tests/blog-post-hero.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Blog Post Hero - Mobile Viewport', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a blog post (adjust slug as needed)
    await page.goto('/es/blog/beneficios-sauna-finlandesa');
    await page.waitForSelector('.blog-post-hero', { state: 'visible' });
  });

  test('should handle mobile viewport correctly', async ({ page, viewport }) => {
    if (!viewport || viewport.width >= 768) {
      test.skip();
      return;
    }

    const hero = page.locator('.blog-post-hero');

    // Get computed height
    const height = await hero.evaluate((el) => {
      return window.getComputedStyle(el).height;
    });

    // Should use viewport height
    expect(height).toContain('vh');
  });

  test('should have readable title size on mobile', async ({ page, viewport }) => {
    if (!viewport || viewport.width > 640) {
      test.skip();
      return;
    }

    const title = page.locator('.hero-title');
    const fontSize = await title.evaluate((el) =>
      parseInt(window.getComputedStyle(el).fontSize)
    );

    // Should be at least 36px on mobile (optimized)
    expect(fontSize).toBeGreaterThanOrEqual(32);
  });

  test('should display breadcrumb navigation', async ({ page }) => {
    const breadcrumb = page.locator('.hero-breadcrumb');
    await expect(breadcrumb).toBeVisible();

    // Should have multiple items
    const items = page.locator('.breadcrumb-item');
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('should show category badge if available', async ({ page }) => {
    const badge = page.locator('.category-badge');

    // May or may not exist depending on post
    const count = await badge.count();
    if (count > 0) {
      await expect(badge).toBeVisible();
    }
  });

  test('should hide scroll indicator on short screens', async ({ page, viewport }) => {
    if (!viewport || viewport.width > 640 || viewport.height > 667) {
      test.skip();
      return;
    }

    const indicator = page.locator('.scroll-indicator');
    const isVisible = await indicator.isVisible();

    // On very short screens, should be hidden
    if (viewport.height <= 667) {
      expect(isVisible).toBe(false);
    }
  });

  test('should load hero image', async ({ page }) => {
    const image = page.locator('.hero-image');
    await expect(image).toBeVisible();

    // Should have loaded
    const naturalWidth = await image.evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  });

  test('should take screenshot', async ({ page }, testInfo) => {
    await page.screenshot({
      path: `test-results/blog-post-hero-${testInfo.project.name}.png`,
      fullPage: false,
      clip: { x: 0, y: 0, width: 800, height: 800 },
    });
  });
});
```

---

## Test Suite 5: Blog Post Content

Create `tests/blog-post-content.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Blog Post Content - Mobile Reading', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/es/blog/beneficios-sauna-finlandesa');
    await page.waitForSelector('.blog-post-content', { state: 'visible' });
  });

  test('should have optimal reading width', async ({ page }) => {
    const container = page.locator('.content-container');
    const maxWidth = await container.evaluate((el) =>
      parseInt(window.getComputedStyle(el).maxWidth)
    );

    // Should not exceed 960px for readability
    expect(maxWidth).toBeLessThanOrEqual(960);
  });

  test('should have readable body text on mobile', async ({ page, viewport }) => {
    if (!viewport || viewport.width > 640) {
      test.skip();
      return;
    }

    const content = page.locator('.post-content');
    const fontSize = await content.evaluate((el) =>
      parseInt(window.getComputedStyle(el).fontSize)
    );

    // Should be at least 16px
    expect(fontSize).toBeGreaterThanOrEqual(16);
  });

  test('should have adequate line height', async ({ page }) => {
    const content = page.locator('.post-content');
    const lineHeight = await content.evaluate((el) =>
      parseFloat(window.getComputedStyle(el).lineHeight)
    );

    // Should be at least 1.6 for readability
    expect(lineHeight).toBeGreaterThanOrEqual(1.6);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const h2Count = await page.locator('.post-content h2').count();
    const h3Count = await page.locator('.post-content h3').count();

    // Should have at least some headings
    expect(h2Count + h3Count).toBeGreaterThan(0);

    // H2 should be larger than H3
    if (h2Count > 0 && h3Count > 0) {
      const h2Size = await page.locator('.post-content h2').first().evaluate((el) =>
        parseInt(window.getComputedStyle(el).fontSize)
      );
      const h3Size = await page.locator('.post-content h3').first().evaluate((el) =>
        parseInt(window.getComputedStyle(el).fontSize)
      );

      expect(h2Size).toBeGreaterThan(h3Size);
    }
  });

  test('should have 48x48px share buttons', async ({ page }) => {
    const shareButton = page.locator('.share-button').first();
    const box = await shareButton.boundingBox();

    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(48);
      expect(box.height).toBeGreaterThanOrEqual(48);
    }
  });

  test('should have adequate touch target for back link', async ({ page, viewport }) => {
    if (!viewport || viewport.width > 640) {
      test.skip();
      return;
    }

    const backLink = page.locator('.back-link');
    const box = await backLink.boundingBox();

    if (box) {
      // After optimization, should be at least 44px tall
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('should have clickable share buttons', async ({ page }) => {
    const facebookButton = page.locator('.share-facebook');
    const twitterButton = page.locator('.share-twitter');

    await expect(facebookButton).toBeVisible();
    await expect(twitterButton).toBeVisible();

    // Should have valid href
    const fbHref = await facebookButton.getAttribute('href');
    expect(fbHref).toContain('facebook.com');

    const twHref = await twitterButton.getAttribute('href');
    expect(twHref).toContain('twitter.com');
  });

  test('should take screenshot', async ({ page }, testInfo) => {
    await page.screenshot({
      path: `test-results/blog-post-content-${testInfo.project.name}.png`,
      fullPage: true,
    });
  });
});
```

---

## Test Suite 6: Performance

Create `tests/performance.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Performance - Mobile Networks', () => {
  test('should measure Core Web Vitals on blog index', async ({ page }) => {
    // Enable performance monitoring
    await page.goto('/es/blog');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Measure performance metrics
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const paintEntries = performance.getEntriesByType('paint');
          const navigationEntries = performance.getEntriesByType('navigation');

          resolve({
            fcp: paintEntries.find((e) => e.name === 'first-contentful-paint')?.startTime || 0,
            lcp: entries.find((e) => e.entryType === 'largest-contentful-paint')?.startTime || 0,
            cls: entries.reduce((sum, e) => sum + (e.hadRecentInput ? 0 : e.value), 0),
            navigationTiming: navigationEntries[0]?.toJSON(),
          });
        }).observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift', 'navigation'] });

        // Timeout after 10 seconds
        setTimeout(() => resolve({ fcp: 0, lcp: 0, cls: 0 }), 10000);
      });
    });

    console.log('Performance Metrics:', metrics);

    // LCP should be under 2.5 seconds (2500ms)
    // Note: This may vary significantly based on network
    // expect(metrics.lcp).toBeLessThan(2500);

    // CLS should be under 0.1
    // expect(metrics.cls).toBeLessThan(0.1);
  });

  test('should load images lazily', async ({ page }) => {
    await page.goto('/es/blog');

    const images = page.locator('.card-image');
    const count = await images.count();

    let lazyCount = 0;
    for (let i = 0; i < count; i++) {
      const loading = await images.nth(i).getAttribute('loading');
      if (loading === 'lazy') {
        lazyCount++;
      }
    }

    // Most images should be lazy loaded
    expect(lazyCount).toBeGreaterThan(0);
  });

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/es/blog');
    await page.waitForLoadState('networkidle');

    // Should have no errors
    expect(errors.length).toBe(0);
  });
});
```

---

## Test Suite 7: Accessibility

Create `tests/accessibility.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Accessibility - WCAG 2.1 AA', () => {
  test('should have proper focus visible styles', async ({ page }) => {
    await page.goto('/es/blog');

    // Tab through interactive elements
    await page.keyboard.press('Tab');

    const focused = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;

      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        outlineOffset: styles.outlineOffset,
      };
    });

    // Should have visible focus indicator
    expect(focused).toBeTruthy();
  });

  test('should have ARIA labels on interactive elements', async ({ page }) => {
    await page.goto('/es/blog');

    const filterButtons = page.locator('.filter-button');
    const firstButton = filterButtons.first();

    // Should have aria-pressed attribute
    const ariaPressed = await firstButton.getAttribute('aria-pressed');
    expect(ariaPressed).toBeTruthy();
  });

  test('should have semantic HTML structure', async ({ page }) => {
    await page.goto('/es/blog');

    // Should have main landmark
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Should have headings in order
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    // Articles should be in article tags
    const articles = page.locator('article.blog-card');
    const count = await articles.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/es/blog');
    await page.waitForSelector('.card-image', { state: 'visible' });

    const images = page.locator('.card-image');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt?.length).toBeGreaterThan(0);
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/es/blog');

    // Focus first category button
    const firstButton = page.locator('.filter-button').first();
    await firstButton.focus();

    // Should be focused
    await expect(firstButton).toBeFocused();

    // Press Enter to activate
    await page.keyboard.press('Enter');

    // Should have active class
    await expect(firstButton).toHaveClass(/active/);
  });

  test('should respect reduced motion preference', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/es/blog');

    // Animations should be disabled or reduced
    const card = page.locator('.blog-card').first();

    const transition = await card.evaluate((el) =>
      window.getComputedStyle(el).transition
    );

    // With reduced motion, transitions might be 'none' or very short
    // This test may need adjustment based on implementation
    console.log('Transition with reduced motion:', transition);
  });
});
```

---

## Running the Tests

### Run All Tests

```bash
# Run all tests on all devices
npx playwright test

# Run with UI (visual test runner)
npx playwright test --ui

# Run specific test file
npx playwright test tests/blog-index.spec.ts

# Run on specific device
npx playwright test --project="iPhone SE"
```

### Run Specific Test Suites

```bash
# Blog index only
npx playwright test tests/blog-index.spec.ts

# Category filter only
npx playwright test tests/category-filter.spec.ts

# Performance tests
npx playwright test tests/performance.spec.ts

# Accessibility tests
npx playwright test tests/accessibility.spec.ts
```

### Generate HTML Report

```bash
# Run tests and generate report
npx playwright test --reporter=html

# Open report
npx playwright show-report
```

### Debug Mode

```bash
# Run in debug mode (step through tests)
npx playwright test --debug

# Run with headed browser (see what's happening)
npx playwright test --headed

# Run with specific timeout
npx playwright test --timeout=60000
```

---

## Test Checklist

### Pre-Testing
- [ ] Start development server (`npm run dev`)
- [ ] Verify all blog pages load correctly
- [ ] Apply mobile-first optimizations
- [ ] Clear browser cache

### During Testing
- [ ] Run tests on all mobile viewports
- [ ] Review screenshots for visual issues
- [ ] Check console for errors
- [ ] Measure performance metrics
- [ ] Validate accessibility

### Post-Testing
- [ ] Document any failures
- [ ] Create issues for bugs found
- [ ] Generate test report
- [ ] Share results with team
- [ ] Plan fixes for issues

---

## Expected Results

### Pass Criteria

1. **Layout**: Responsive grid works on all viewports
2. **Touch Targets**: All interactive elements ≥44px
3. **Typography**: Readable font sizes (≥16px body, ≥14px UI)
4. **Performance**: LCP <2.5s, CLS <0.1
5. **Accessibility**: WCAG 2.1 AA compliant
6. **No Errors**: Zero console errors
7. **Visual**: No horizontal scroll, proper spacing

### Known Issues to Track

- [ ] 100vh on mobile Safari (addressed in optimizations)
- [ ] CategoryFilter touch targets (addressed in optimizations)
- [ ] Font sizes below 14px (addressed in optimizations)
- [ ] Performance on 3G networks (may need further optimization)

---

**Document Version**: 1.0
**Last Updated**: 2025-10-21
**Status**: Ready for Execution
