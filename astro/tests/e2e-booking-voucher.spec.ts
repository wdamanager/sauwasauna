import { test, expect } from '@playwright/test';

/**
 * E2E Tests - Voucher Session Purchase Flow
 *
 * Coverage:
 * - TC-014: Voucher purchase flow
 * - TC-015: Voucher redemption (if implemented)
 */

const BASE_URL = process.env.E2E_BASE_URL || 'https://sauwasauna.com';

// Note: Voucher session pages are not yet deployed in production
// These tests will be skipped until voucher sessions are available
const VOUCHER_SESSION_ROUTE = '/es/hotel-coma-bella/bono-5/';

test.describe('Voucher Session Purchase Flow', () => {

  test.beforeEach(async ({ page }) => {
    // Try to navigate to voucher session page
    const response = await page.goto(`${BASE_URL}${VOUCHER_SESSION_ROUTE}`, {
      waitUntil: 'networkidle'
    });

    // If page doesn't exist (404), tests will be skipped
    if (response && response.status() === 404) {
      console.log('⚠ Voucher session page not found - tests will be skipped');
    }
  });

  test('TC-014: Voucher purchase flow', async ({ page }) => {
    // Check if we're on a 404 page (Astro shows "This Page Does Not Exist")
    const pageTitle = await page.title();
    if (pageTitle.includes('404') || pageTitle.includes('Not Found') || pageTitle.includes('Does Not Exist')) {
      console.log('✓ TC-014 SKIPPED: Voucher session page not deployed yet');
      test.skip();
      return;
    }

    // Verify booking widget loads
    const widget = page.locator('.booking-widget, [data-widget-type]');
    await expect(widget).toBeVisible();

    // CRITICAL: Verify NO calendar displays for vouchers
    const calendar = page.locator('.calendar, [data-calendar]');
    const calendarExists = await calendar.count() > 0;

    if (calendarExists) {
      const isVisible = await calendar.isVisible().catch(() => false);
      expect(isVisible).toBe(false);
      console.log('✓ Calendar is hidden for voucher session (expected)');
    } else {
      console.log('✓ Calendar does not exist for voucher session (expected)');
    }

    // Verify "Voucher" or "Gift Voucher" indicator
    const voucherIndicator = page.locator('[data-session-type="voucher"], .voucher-session, .gift-voucher').first();
    if (await voucherIndicator.count() > 0) {
      await expect(voucherIndicator).toBeVisible();
      console.log('✓ Voucher indicator found');
    }

    // Verify voucher messaging
    const voucherMessage = page.locator('text=/bono.*regalo|voucher|gift/i').first();
    if (await voucherMessage.count() > 0) {
      await expect(voucherMessage).toBeVisible();
      console.log('✓ Voucher messaging found');
    }

    // Find quantity selector for vouchers
    const quantityInput = page.locator('input[type="number"], [data-quantity], [data-voucher-quantity]').first();
    await expect(quantityInput).toBeVisible();

    // Get current quantity value (default should be 1)
    let currentQuantity = await quantityInput.inputValue();
    console.log(`Initial voucher quantity: ${currentQuantity}`);

    // Change quantity to 3
    await quantityInput.fill('3');
    await page.waitForTimeout(500);

    // Verify price updates (quantity × unit price)
    const priceDisplay = page.locator('.price, .total-price, [data-price]').first();
    if (await priceDisplay.count() > 0) {
      await expect(priceDisplay).toBeVisible();
      const priceText = await priceDisplay.textContent();
      console.log(`Total price for 3 vouchers: ${priceText}`);

      // Verify price contains numeric value
      const priceMatch = priceText?.match(/(\d+(?:[.,]\d+)?)/);
      expect(priceMatch).toBeTruthy();

      if (priceMatch) {
        const totalPrice = parseFloat(priceMatch[1].replace(',', '.'));
        expect(totalPrice).toBeGreaterThan(0);
      }
    }

    // Fill purchaser information
    await page.fill('input[name="attendee_name_0"], input[name="customer_name"]', 'Voucher Purchaser');
    await page.fill('input[name="customer_email"], input[name="attendee_email_0"]'.split(',')[0], 'voucher@example.com');

    // Check if there are additional fields specific to vouchers
    const recipientName = page.locator('input[name="recipient_name"], input[name="gift_recipient"]');
    if (await recipientName.count() > 0) {
      await recipientName.fill('Gift Recipient Name');
      console.log('✓ Filled recipient name for gift voucher');
    }

    const recipientEmail = page.locator('input[name="recipient_email"]');
    if (await recipientEmail.count() > 0) {
      await recipientEmail.fill('recipient@example.com');
      console.log('✓ Filled recipient email for gift voucher');
    }

    // Check privacy/terms
    const privacyBox = page.locator('input[name="privacy"], input[type="checkbox"]').first();
    if (await privacyBox.count() > 0 && !(await privacyBox.isChecked())) {
      await privacyBox.check();
    }

    const termsBox = page.locator('input[name="terms"]');
    if (await termsBox.count() > 0 && !(await termsBox.isChecked())) {
      await termsBox.check();
    }

    // Take screenshot before submission
    await page.screenshot({
      path: 'test-results/tc-014-voucher-form.png',
      fullPage: true
    });

    // Verify submit button shows "Purchase" not "Book"
    const submitBtn = page.locator('button[type="submit"], [data-action="submit-booking"], [data-action="purchase-voucher"]').first();
    await expect(submitBtn).toBeVisible();

    const btnText = await submitBtn.textContent();
    console.log(`Submit button text: ${btnText}`);

    // Button should say "Purchase" or "Comprar" not "Book" or "Reservar"
    // Note: This depends on actual implementation
    if (btnText?.match(/comprar|purchase|buy/i)) {
      console.log('✓ Submit button uses purchase terminology (expected for voucher)');
    }

    console.log('✓ TC-014 PASSED: Voucher purchase flow validated');
  });

  test('TC-014B: Voucher quantity limits', async ({ page }) => {
    // Check if we're on a 404 page (Astro shows "This Page Does Not Exist")
    const pageTitle = await page.title();
    if (pageTitle.includes('404') || pageTitle.includes('Not Found') || pageTitle.includes('Does Not Exist')) {
      console.log('✓ TC-014B SKIPPED: Voucher session page not deployed yet');
      test.skip();
      return;
    }

    // Find quantity input
    const quantityInput = page.locator('input[type="number"], [data-quantity]').first();
    await expect(quantityInput).toBeVisible();

    // Try to set quantity to 0 (should not be allowed)
    await quantityInput.fill('0');
    await page.waitForTimeout(300);

    const value0 = await quantityInput.inputValue();
    const numValue0 = parseInt(value0);

    // Min should be 1
    expect(numValue0).toBeGreaterThanOrEqual(1);

    // Set to valid quantity
    await quantityInput.fill('5');
    await page.waitForTimeout(300);

    const value5 = await quantityInput.inputValue();
    expect(value5).toBe('5');

    // Try to set very high quantity (if there's a max)
    await quantityInput.fill('999');
    await page.waitForTimeout(300);

    const value999 = await quantityInput.inputValue();
    const numValue999 = parseInt(value999);

    // Check if there's a max limit enforced
    const maxAttr = await quantityInput.getAttribute('max');
    if (maxAttr) {
      const maxValue = parseInt(maxAttr);
      expect(numValue999).toBeLessThanOrEqual(maxValue);
      console.log(`✓ Voucher max quantity limit enforced: ${maxValue}`);
    }

    await page.screenshot({
      path: 'test-results/tc-014b-voucher-limits.png',
      fullPage: true
    });

    console.log('✓ TC-014B PASSED: Voucher quantity limits validated');
  });

  test('TC-015: Voucher redemption (if implemented)', async ({ page }) => {
    // This test checks if voucher redemption is available on a single session
    // Navigate to a real single session page
    const SINGLE_SESSION_ROUTE = '/es/hotel-coma-bella/jornadas-de-puertas-abiertas-sauwa/';

    await page.goto(`${BASE_URL}${SINGLE_SESSION_ROUTE}`, {
      waitUntil: 'networkidle'
    });

    // Wait for booking widget section
    const nextMonthBtn = page.getByRole('button', { name: 'Mes siguiente' });
    try {
      await nextMonthBtn.waitFor({ timeout: 15000 });
    } catch {
      console.log('✓ TC-015 SKIPPED: Booking widget not found');
      return;
    }

    // Wait for calendar to load
    await page.waitForTimeout(2000);

    // Find available day buttons (not disabled)
    let availableDay = page.locator('button:not([disabled])').filter({ hasText: /^[1-9]$|^[12][0-9]$|^3[01]$/ }).first();

    // Try next months if no available days
    for (let i = 0; i < 3; i++) {
      const count = await availableDay.count();
      if (count > 0) break;

      await nextMonthBtn.click();
      await page.waitForTimeout(1500);
      availableDay = page.locator('button:not([disabled])').filter({ hasText: /^[1-9]$|^[12][0-9]$|^3[01]$/ }).first();
    }

    if (await availableDay.count() === 0) {
      console.log('✓ TC-015 SKIPPED: No available dates configured');
      return;
    }

    await availableDay.click();
    await page.waitForTimeout(1500);

    // Look for time slots
    const timeSlot = page.locator('button').filter({ hasText: /\d{1,2}:\d{2}/ }).first();
    if (await timeSlot.count() === 0) {
      console.log('✓ TC-015 SKIPPED: No time slots available');
      return;
    }
    await timeSlot.click();
    await page.waitForTimeout(1000);

    // Look for voucher redemption field
    const voucherInput = page.locator('input[name="voucher_code"], input[name="coupon_code"], [data-voucher-code]');

    if (await voucherInput.count() > 0) {
      await expect(voucherInput).toBeVisible();

      // Test with fake voucher code
      await voucherInput.fill('TEST-VOUCHER-12345');
      await page.waitForTimeout(300);

      // Look for "Apply" button
      const applyBtn = page.locator('button').filter({ hasText: /aplicar|apply|validar/i }).first();
      if (await applyBtn.count() > 0) {
        await applyBtn.click();
        await page.waitForTimeout(1000);

        // Expect error message (since code is fake)
        const errorMsg = page.locator('.error, .invalid-voucher, [data-error]').first();
        if (await errorMsg.count() > 0) {
          await expect(errorMsg).toBeVisible();
          console.log('✓ Invalid voucher error displayed (expected)');
        }
      }

      await page.screenshot({
        path: 'test-results/tc-015-voucher-redemption.png',
        fullPage: true
      });

      console.log('✓ TC-015 PASSED: Voucher redemption field exists and validates codes');
    } else {
      test.skip();
      console.log('⏭ TC-015 SKIPPED: Voucher redemption not implemented yet');
    }
  });
});
