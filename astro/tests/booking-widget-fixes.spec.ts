import { test, expect } from '@playwright/test';

const BASE_URL = 'https://sauwasauna.com';

test.describe('BookingWidget Integration Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/es/puertas-abiertas`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.booking-widget', { timeout: 15000 });
  });

  test('WDA-911: Attendees cleanup on navigation back', async ({ page }) => {
    await page.screenshot({ path: 'tests/screenshots/wda-911-step1-initial.png', fullPage: true });
    
    let availableDay = page.locator('.calendar-day.available, .calendar-day.low-availability').first();
    if (await availableDay.count() === 0) {
      await page.click('.next-month');
      await page.waitForTimeout(1000);
      availableDay = page.locator('.calendar-day.available, .calendar-day.low-availability').first();
    }
    
    if (await availableDay.count() > 0) {
      await availableDay.click();
      await page.waitForTimeout(1500);
      
      const timeSlot = page.locator('.time-slot:not(.disabled)').first();
      if (await timeSlot.count() > 0) {
        await timeSlot.click();
        await page.waitForTimeout(1000);
        
        await page.screenshot({ path: 'tests/screenshots/wda-911-step2-form.png', fullPage: true });
        
        const addBtn = page.locator('[data-action="add-attendee"]');
        if (await addBtn.isVisible()) {
          await addBtn.click();
          await page.waitForTimeout(300);
          await addBtn.click();
          await page.waitForTimeout(300);
          
          const initialRows = await page.locator('.attendee-row').count();
          console.log('Initial attendee count:', initialRows);
          expect(initialRows).toBe(3);
          
          await page.screenshot({ path: 'tests/screenshots/wda-911-step3-attendees-added.png', fullPage: true });
          
          await page.click('[data-action="back-to-slots"]');
          await page.waitForTimeout(500);
          
          const anotherSlot = page.locator('.time-slot:not(.disabled)').nth(1);
          if (await anotherSlot.count() > 0) {
            await anotherSlot.click();
          } else {
            await page.locator('.time-slot:not(.disabled)').first().click();
          }
          await page.waitForTimeout(1000);
          
          const finalRows = await page.locator('.attendee-row').count();
          console.log('Final attendee count:', finalRows);
          
          await page.screenshot({ path: 'tests/screenshots/wda-911-step4-cleared.png', fullPage: true });
          
          expect(finalRows).toBe(1);
          const counter = await page.locator('.attendees-count').textContent();
          expect(counter).toMatch(/^1\//);
          
          console.log('WDA-911 PASSED');
        }
      }
    } else {
      test.skip();
    }
  });

  test('WDA-910: Optional email for additional attendees', async ({ page }) => {
    let availableDay = page.locator('.calendar-day.available, .calendar-day.low-availability').first();
    if (await availableDay.count() === 0) {
      await page.click('.next-month');
      await page.waitForTimeout(1000);
      availableDay = page.locator('.calendar-day.available, .calendar-day.low-availability').first();
    }
    
    if (await availableDay.count() > 0) {
      await availableDay.click();
      await page.waitForTimeout(1500);
      
      const timeSlot = page.locator('.time-slot:not(.disabled)').first();
      if (await timeSlot.count() > 0) {
        await timeSlot.click();
        await page.waitForTimeout(1000);
        
        const addBtn = page.locator('[data-action="add-attendee"]');
        if (await addBtn.isVisible()) {
          await addBtn.click();
          await page.waitForTimeout(500);
          
          await page.fill('input[name="attendee_name_0"]', 'Main Contact');
          await page.fill('input[name="customer_email"]', 'test@example.com');
          await page.fill('input[name="attendee_name_1"]', 'Additional Person');
          
          const privacyBox = page.locator('input[name="privacy"]');
          const termsBox = page.locator('input[name="terms"]');
          if (await privacyBox.isVisible()) await privacyBox.check();
          if (await termsBox.isVisible()) await termsBox.check();
          
          await page.screenshot({ path: 'tests/screenshots/wda-910-optional-email.png', fullPage: true });
          
          const emailField = page.locator('input[name="attendee_email_1"]');
          const required = await emailField.getAttribute('required');
          expect(required).toBeNull();
          
          console.log('WDA-910 PASSED');
        }
      }
    } else {
      test.skip();
    }
  });

  test('WDA-912: Error translations exist', async ({ page }) => {
    const widget = page.locator('.booking-widget');
    const translations = await widget.getAttribute('data-translations');
    
    if (translations) {
      const t = JSON.parse(translations);
      
      expect(t.errorSpotsLimit).toBeDefined();
      expect(t.errorSlotFull).toBeDefined();
      expect(t.errorSlotClosed).toBeDefined();
      expect(t.errorInvalidDate).toBeDefined();
      expect(t.errorSessionExpired).toBeDefined();
      expect(t.errorGeneric).toBeDefined();
      
      expect(t.errorSlotFull).toContain('completo');
      
      console.log('WDA-912 PASSED');
      console.log('Translations:', t.errorSlotFull, t.errorSpotsLimit);
      
      await page.screenshot({ path: 'tests/screenshots/wda-912-translations.png', fullPage: true });
    }
  });

  test('WDA-913: Attendee count structure', async ({ page }) => {
    let availableDay = page.locator('.calendar-day.available, .calendar-day.low-availability').first();
    if (await availableDay.count() === 0) {
      await page.click('.next-month');
      await page.waitForTimeout(1000);
      availableDay = page.locator('.calendar-day.available, .calendar-day.low-availability').first();
    }
    
    if (await availableDay.count() > 0) {
      await availableDay.click();
      await page.waitForTimeout(1500);
      
      const timeSlot = page.locator('.time-slot:not(.disabled)').first();
      if (await timeSlot.count() > 0) {
        await timeSlot.click();
        await page.waitForTimeout(1000);
        
        const addBtn = page.locator('[data-action="add-attendee"]');
        if (await addBtn.isVisible()) {
          await addBtn.click();
          await page.waitForTimeout(300);
          await addBtn.click();
          await page.waitForTimeout(300);
          
          const rowCount = await page.locator('.attendee-row').count();
          const counterText = await page.locator('.attendees-count').textContent();
          const displayedCount = parseInt(counterText?.split('/')[0] || '0');
          
          expect(displayedCount).toBe(rowCount);
          
          const confirmedEl = page.locator('.confirmed-attendees');
          expect(await confirmedEl.count()).toBe(1);
          
          console.log('WDA-913 PASSED');
          console.log('Counter:', displayedCount, 'Rows:', rowCount);
          
          await page.screenshot({ path: 'tests/screenshots/wda-913-count.png', fullPage: true });
        }
      }
    } else {
      test.skip();
    }
  });
});
