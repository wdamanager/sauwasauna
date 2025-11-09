/**
 * Isolated sticky test - verifies sticky positioning works correctly
 */

import { test, expect } from '@playwright/test';

test.describe('Isolated Sticky Test', () => {
  test('should verify sticky column works correctly', async ({ page }) => {
    await page.goto('http://localhost:4321/sticky-test.html');

    const stickyColumn = page.locator('.sticky-column');

    console.log('\n🧪 ISOLATED STICKY TEST\n');

    // Initial position
    const initialTop = await stickyColumn.evaluate((el) => el.getBoundingClientRect().top);
    console.log('1. Initial position:', initialTop);

    // Scroll to section
    await page.evaluate(() => window.scrollTo(0, window.innerHeight));
    await page.waitForTimeout(300);

    const afterFirstScroll = await stickyColumn.evaluate((el) => el.getBoundingClientRect().top);
    console.log('2. After scrolling to section:', afterFirstScroll);

    // Scroll more
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(300);

    const afterMoreScroll = await stickyColumn.evaluate((el) => el.getBoundingClientRect().top);
    console.log('3. After scrolling 500px more:', afterMoreScroll);

    // Scroll even more
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(300);

    const afterFinalScroll = await stickyColumn.evaluate((el) => el.getBoundingClientRect().top);
    console.log('4. After scrolling 800px more:', afterFinalScroll);

    console.log('\n✅ Sticky working?', afterFinalScroll === 0 || (afterFinalScroll >= -5 && afterFinalScroll <= 5));
    console.log('\n');

    // Assert
    expect(afterFinalScroll).toBeLessThanOrEqual(5);
    expect(afterFinalScroll).toBeGreaterThanOrEqual(-5);
  });
});
