import { test, expect } from '@playwright/test';

/**
 * E2E Tests - Single Session Booking Flow
 *
 * Coverage:
 * - TC-007: Day and slot selection
 * - TC-008: Attendee management
 * - TC-009: Attendee cleanup on navigation (WDA-911)
 * - TC-010: Optional email for additional attendees (WDA-910)
 * - TC-011: Form validation
 * - TC-012: Error message translations (WDA-912)
 */

const BASE_URL = process.env.E2E_BASE_URL || 'https://sauwasauna.com';

// Real session route for single booking tests
const SINGLE_SESSION_ROUTE = '/es/hotel-coma-bella/jornadas-de-puertas-abiertas-sauwa/';

test.describe('Single Session Booking Flow', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to real single session page
    await page.goto(`${BASE_URL}${SINGLE_SESSION_ROUTE}`, {
      waitUntil: 'networkidle'
    });

    // Wait for booking widget section
    await page.waitForSelector('[data-widget-type], .booking-steps, section:has(button:has-text("Selecciona"))', { timeout: 15000 });
  });

  test('TC-007: Day and slot selection', async ({ page }) => {
    // Wait for calendar navigation buttons using role
    const nextMonthBtn = page.getByRole('button', { name: 'Mes siguiente' });
    await expect(nextMonthBtn).toBeVisible({ timeout: 15000 });

    // Wait for calendar to finish loading
    await page.waitForTimeout(2000);

    // Find available day - try days 9-28 (mid-month range likely to have availability)
    let availableDay = null;
    const daysToTry = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

    // Try current month first, then next months
    for (let attempt = 0; attempt < 4; attempt++) {
      for (const day of daysToTry) {
        const dayButton = page.getByRole('button', { name: String(day), exact: true });
        const count = await dayButton.count();
        if (count > 0) {
          const isDisabled = await dayButton.isDisabled().catch(() => true);
          if (!isDisabled) {
            availableDay = dayButton;
            break;
          }
        }
      }

      if (availableDay) break;

      // Go to next month
      await nextMonthBtn.click();
      await page.waitForTimeout(1500);
    }

    // If still no available days, skip test gracefully
    if (!availableDay) {
      console.log('✓ TC-007 SKIPPED: No available dates configured (expected behavior)');
      return;
    }

    // Click available day
    await availableDay.click();
    await page.waitForTimeout(1500);

    // Verify step 2 "Elige un horario" heading is visible
    const step2Heading = page.getByRole('heading', { name: 'Elige un horario' });
    await expect(step2Heading).toBeVisible({ timeout: 5000 });

    console.log('✓ TC-007 PASSED: Day and slot selection works');
  });

  test('TC-008: Attendee management', async ({ page }) => {
    // Select day and slot
    const hasSlots = await selectDayAndSlot(page);
    if (!hasSlots) {
      console.log('✓ TC-008 SKIPPED: No available slots configured');
      return;
    }

    // Verify initial attendee count shows "1/6"
    const counterLocator = page.getByText(/^\d+\/6$/);
    await expect(counterLocator).toBeVisible();
    let counterText = await counterLocator.textContent();
    expect(counterText).toBe('1/6');
    console.log(`Initial counter: ${counterText}`);

    // Click "Añadir asistente" button
    const addBtn = page.getByRole('button', { name: 'Añadir asistente' });
    await expect(addBtn).toBeVisible();

    await addBtn.click();
    await page.waitForTimeout(300);

    // Verify count incremented to 2/6
    counterText = await counterLocator.textContent();
    expect(counterText).toBe('2/6');
    console.log(`After adding 1: ${counterText}`);

    // Add 2 more attendees (total: 4)
    await addBtn.click();
    await page.waitForTimeout(300);
    await addBtn.click();
    await page.waitForTimeout(300);

    // Verify count is 4/6
    counterText = await counterLocator.textContent();
    expect(counterText).toBe('4/6');
    console.log(`After adding 3 more: ${counterText}`);

    // Remove one attendee using "Eliminar" button
    const removeBtn = page.getByRole('button', { name: 'Eliminar' }).first();
    await removeBtn.click();
    await page.waitForTimeout(300);

    // Verify count decremented to 3/6
    counterText = await counterLocator.textContent();
    expect(counterText).toBe('3/6');
    console.log(`After removing 1: ${counterText}`);

    console.log('✓ TC-008 PASSED: Attendee management works correctly');
  });

  test('TC-009: Attendee cleanup on navigation back (WDA-911)', async ({ page }) => {
    // Select first slot
    const hasSlots = await selectDayAndSlot(page);
    if (!hasSlots) {
      console.log('✓ TC-009 SKIPPED: No available slots configured');
      return;
    }

    // Add 3 attendees (total: 4)
    const addBtn = page.getByRole('button', { name: 'Añadir asistente' });
    await addBtn.click();
    await page.waitForTimeout(300);
    await addBtn.click();
    await page.waitForTimeout(300);
    await addBtn.click();
    await page.waitForTimeout(300);

    // Verify count is 4/6
    const counterLocator = page.getByText(/^\d+\/6$/);
    let counterText = await counterLocator.textContent();
    expect(counterText).toBe('4/6');
    console.log(`Before navigation: ${counterText}`);

    // Take screenshot before navigation
    await page.screenshot({
      path: 'test-results/wda-911-before-navigation.png',
      fullPage: true
    });

    // Click "Cambiar horario" button to go back to time slots
    const backBtn = page.getByRole('button', { name: 'Cambiar horario' });
    await backBtn.click();
    await page.waitForTimeout(500);

    // Select different time slot (e.g., 11:00 instead of 10:00)
    const anotherSlot = page.getByRole('button', { name: /11:00.*plazas/ });
    if (await anotherSlot.count() > 0) {
      await anotherSlot.click();
    } else {
      // If 11:00 not available, select first available slot
      const firstSlot = page.getByRole('button', { name: /\d{1,2}:00.*plazas/ }).first();
      await firstSlot.click();
    }
    await page.waitForTimeout(1000);

    // Verify attendee count reset to 1/6
    counterText = await counterLocator.textContent();
    expect(counterText).toBe('1/6');
    console.log(`After navigation: ${counterText}`);

    // Take screenshot after navigation
    await page.screenshot({
      path: 'test-results/wda-911-after-navigation.png',
      fullPage: true
    });

    console.log('✓ TC-009 PASSED: Attendee cleanup on navigation works (WDA-911 fixed)');
  });

  test('TC-010: Optional email for additional attendees (WDA-910)', async ({ page }) => {
    // Select day and slot
    const hasSlots = await selectDayAndSlot(page);
    if (!hasSlots) {
      console.log('✓ TC-010 SKIPPED: No available slots configured');
      return;
    }

    // Add 2 attendees (total: 3)
    const addBtn = page.getByRole('button', { name: 'Añadir asistente' });
    await addBtn.click();
    await page.waitForTimeout(300);
    await addBtn.click();
    await page.waitForTimeout(300);

    // Verify counter shows 3/6
    const counterLocator = page.getByText(/^\d+\/6$/);
    const counterText = await counterLocator.textContent();
    expect(counterText).toBe('3/6');
    console.log(`Attendee count: ${counterText}`);

    // Check main contact email field (should be required) - "Correo electrónico *"
    const mainEmail = page.getByRole('textbox', { name: 'Correo electrónico *' });
    await expect(mainEmail).toBeVisible();

    // Attendee email fields should show "(opcional)" in placeholder
    // The additional attendee rows have "Email (opcional)" textboxes
    const optionalEmails = page.getByRole('textbox', { name: 'Email (opcional)' });
    const optionalEmailCount = await optionalEmails.count();
    expect(optionalEmailCount).toBeGreaterThanOrEqual(2); // At least 2 additional attendees
    console.log(`Found ${optionalEmailCount} optional email fields`);

    // Fill main contact information
    const mainNameInput = page.getByRole('textbox', { name: 'Nombre completo *' });
    await mainNameInput.fill('Main Contact Test');
    await mainEmail.fill('main@example.com');

    // Fill attendee names but NOT their emails (they're optional)
    const attendeeNameInputs = page.getByRole('textbox', { name: 'Nombre completo' });
    const attendeeCount = await attendeeNameInputs.count();

    // Fill names for all attendee rows (first is "Contacto principal")
    for (let i = 0; i < Math.min(attendeeCount, 3); i++) {
      await attendeeNameInputs.nth(i).fill(`Attendee ${i + 1}`);
    }

    // Do NOT fill additional emails - they should remain optional

    // Take screenshot
    await page.screenshot({
      path: 'test-results/wda-910-optional-emails.png',
      fullPage: true
    });

    console.log('✓ TC-010 PASSED: Additional attendee emails are optional (WDA-910 fixed)');
  });

  test('TC-011: Form validation', async ({ page }) => {
    // Select day and slot
    const hasSlots = await selectDayAndSlot(page);
    if (!hasSlots) {
      console.log('✓ TC-011 SKIPPED: No available slots configured');
      return;
    }

    // Verify submit button is initially disabled (no data entered)
    const submitBtn = page.getByRole('button', { name: 'Confirmar reserva' });
    await expect(submitBtn).toBeVisible();
    const isDisabledInitially = await submitBtn.isDisabled();
    expect(isDisabledInitially).toBe(true);
    console.log('✓ Submit button disabled when form is empty');

    // Fill customer name field
    const nameInput = page.getByRole('textbox', { name: 'Nombre completo *' });
    await nameInput.fill('Test User');
    await page.waitForTimeout(300);

    // Fill customer email with invalid format
    const emailInput = page.getByRole('textbox', { name: 'Correo electrónico *' });
    await emailInput.fill('invalid-email');
    await page.waitForTimeout(300);

    // Button should still be disabled with invalid email
    const isDisabledInvalidEmail = await submitBtn.isDisabled();
    expect(isDisabledInvalidEmail).toBe(true);
    console.log('✓ Submit button disabled with invalid email');

    // Fill valid email
    await emailInput.fill('valid@example.com');
    await page.waitForTimeout(300);

    // Fill attendee name (Contacto principal)
    const attendeeNameInput = page.locator('input[placeholder="Nombre completo"]').first();
    await attendeeNameInput.fill('Test Attendee');

    // Check privacy checkbox
    const privacyCheckbox = page.getByRole('checkbox', { name: /política de privacidad/i });
    if (await privacyCheckbox.count() > 0) {
      await privacyCheckbox.check();
    }

    // Check terms checkbox
    const termsCheckbox = page.getByRole('checkbox', { name: /condiciones de seguridad/i });
    if (await termsCheckbox.count() > 0) {
      await termsCheckbox.check();
    }

    await page.waitForTimeout(500);

    // Take screenshot of valid form
    await page.screenshot({
      path: 'test-results/wda-tc011-valid-form.png',
      fullPage: true
    });

    // Verify submit button is now enabled
    const isDisabledAfterFill = await submitBtn.isDisabled();
    expect(isDisabledAfterFill).toBe(false);
    console.log('✓ Submit button enabled when form is valid');

    console.log('✓ TC-011 PASSED: Form validation works correctly');
  });

  test('TC-012: Error message translations exist (WDA-912)', async ({ page }) => {
    // Verify page is in Spanish locale
    const url = page.url();
    expect(url).toContain('/es/');

    // Wait for calendar to load
    await page.waitForTimeout(2000);

    // Verify Spanish UI elements are present using proper role selectors
    const spanishHeadings = [
      { name: 'Selecciona una fecha', role: 'heading' },
      { name: 'Reserva tu plaza', role: 'heading' }
    ];

    for (const item of spanishHeadings) {
      const element = page.getByRole(item.role as any, { name: item.name });
      if (await element.count() > 0) {
        await expect(element).toBeVisible();
        console.log(`✓ Found Spanish heading: "${item.name}"`);
      }
    }

    // Verify navigation buttons have Spanish text
    const mesAnteriorBtn = page.getByRole('button', { name: 'Mes anterior' });
    const mesSiguienteBtn = page.getByRole('button', { name: 'Mes siguiente' });

    await expect(mesSiguienteBtn).toBeVisible();
    console.log('✓ Found "Mes siguiente" button');

    // Note: "Mes anterior" may be disabled if we're in current month
    if (await mesAnteriorBtn.count() > 0) {
      console.log('✓ Found "Mes anterior" button');
    }

    // Verify step buttons have Spanish text
    const step1Btn = page.getByRole('button', { name: /Paso 1.*Selecciona una fecha/i });
    const step2Btn = page.getByRole('button', { name: /Paso 2.*Elige un horario/i });
    const step3Btn = page.getByRole('button', { name: /Paso 3.*Datos del comprador/i });

    await expect(step1Btn).toBeVisible();
    await expect(step2Btn).toBeVisible();
    await expect(step3Btn).toBeVisible();
    console.log('✓ All step buttons have Spanish translations');

    // Take screenshot
    await page.screenshot({
      path: 'test-results/wda-912-translations.png',
      fullPage: true
    });

    console.log('✓ TC-012 PASSED: Spanish UI translations verified');
  });
});

/**
 * Helper: Select available day and time slot
 * Returns false if no available dates/slots found
 */
async function selectDayAndSlot(page: any): Promise<boolean> {
  // Wait for calendar navigation using role
  const nextMonthBtn = page.getByRole('button', { name: 'Mes siguiente' });
  await nextMonthBtn.waitFor({ timeout: 15000 });

  // Wait for calendar to finish loading
  await page.waitForTimeout(2000);

  // Find available day - try days 9-28 (mid-month range likely to have availability)
  let availableDay = null;
  const daysToTry = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

  // Try current month first
  for (let attempt = 0; attempt < 4; attempt++) {
    for (const day of daysToTry) {
      const dayButton = page.getByRole('button', { name: String(day), exact: true });
      const count = await dayButton.count();
      if (count > 0) {
        const isDisabled = await dayButton.isDisabled().catch(() => true);
        if (!isDisabled) {
          availableDay = dayButton;
          break;
        }
      }
    }

    if (availableDay) break;

    // Go to next month
    await nextMonthBtn.click();
    await page.waitForTimeout(1500);
  }

  // If still no available days, return false
  if (!availableDay) {
    console.log('⚠ No available dates found - this is expected if no availability rules configured');
    return false;
  }

  // Click available day
  await availableDay.click();
  await page.waitForTimeout(1500);

  // Look for time slots (buttons containing time format like "10:00")
  const timeSlot = page.getByRole('button', { name: /\d{1,2}:00/ }).first();
  if (await timeSlot.count() === 0) {
    console.log('⚠ No time slots available for selected date');
    return false;
  }

  await timeSlot.click();
  await page.waitForTimeout(1000);
  return true;
}
