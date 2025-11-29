const { chromium } = require('playwright');
const path = require('path');

const screenshotDir = 'C:/Users/moise/OneDrive/Documentos/Trabajo/wp-headless-astro/temp/screenshots';

async function test() {
  console.log('=== BOOKING WIDGET INTEGRATION TEST ===');
  console.log('Testing WDA-911 and WDA-910');
  
  const browser = await chromium.launch({ headless: false, slowMo: 400 });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  
  try {
    console.log('Step 1: Navigate to /es/puertas-abiertas/');
    await page.goto('http://localhost:4321/es/puertas-abiertas/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    console.log('Step 2: Scrolling to BookingWidget...');
    const widget = await page.waitForSelector('.booking-widget', { timeout: 10000 });
    await widget.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(screenshotDir, '01-widget-visible.png') });
    
    console.log('Step 3: Selecting available date...');
    await page.waitForSelector('.calendar-day.available', { timeout: 15000 });
    const dates = await page.$$('.calendar-day.available');
    console.log('  Found', dates.length, 'available dates');
    if (dates.length > 0) {
      await dates[0].click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(screenshotDir, '02-date-selected.png') });
    }
    
    console.log('Step 4: Selecting time slot...');
    await page.waitForSelector('.time-slot:not(.disabled)', { timeout: 10000 });
    const slots = await page.$$('.time-slot:not(.disabled)');
    console.log('  Found', slots.length, 'available slots');
    if (slots.length > 0) {
      await slots[0].click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(screenshotDir, '03-slot-selected.png') });
    }
    
    console.log('Step 5: Verify form step...');
    await page.waitForSelector('.attendees-section', { timeout: 5000 });
    const initialCount = await page.textContent('.attendees-count');
    console.log('  Initial count:', initialCount);
    
    // WDA-910 Test
    console.log('');
    console.log('=== TEST WDA-910: Optional Email ===');
    const emailPh = await page.$eval('.attendee-field input[type="email"]', el => el.placeholder).catch(() => 'NOT_FOUND');
    console.log('  Email placeholder:', emailPh);
    const wda910 = emailPh.toLowerCase().includes('opcional');
    console.log('  RESULT:', wda910 ? 'PASSED' : 'FAILED');
    
    // WDA-911 Test
    console.log('');
    console.log('=== TEST WDA-911: Attendee Cleanup ===');
    console.log('Step 6: Adding 2 attendees...');
    const addBtn = await page.$('[data-action="add-attendee"]');
    if (addBtn) {
      await addBtn.click();
      await page.waitForTimeout(500);
      await addBtn.click();
      await page.waitForTimeout(500);
    }
    const countAfterAdd = await page.textContent('.attendees-count');
    const rowsAfterAdd = (await page.$$('.attendee-row')).length;
    console.log('  After adding: count =', countAfterAdd, ', rows =', rowsAfterAdd);
    await page.screenshot({ path: path.join(screenshotDir, '04-attendees-added.png') });
    
    console.log('Step 7: Going back...');
    const backSlots = await page.$('[data-action="back-to-slots"]');
    if (backSlots) { await backSlots.click(); await page.waitForTimeout(1000); }
    const backCal = await page.$('[data-action="back-to-calendar"]');
    if (backCal) { await backCal.click(); await page.waitForTimeout(1000); }
    await page.screenshot({ path: path.join(screenshotDir, '05-back-to-calendar.png') });
    
    console.log('Step 8: Selecting new date/slot...');
    await page.waitForSelector('.calendar-day.available', { timeout: 10000 });
    const newDates = await page.$$('.calendar-day.available');
    if (newDates.length > 1) { await newDates[1].click(); } else if (newDates.length > 0) { await newDates[0].click(); }
    await page.waitForTimeout(2000);
    
    await page.waitForSelector('.time-slot:not(.disabled)', { timeout: 10000 });
    const newSlots = await page.$$('.time-slot:not(.disabled)');
    if (newSlots.length > 0) { await newSlots[0].click(); await page.waitForTimeout(2000); }
    
    console.log('Step 9: Verifying cleanup...');
    await page.waitForSelector('.attendees-section', { timeout: 5000 });
    const countAfterReinit = await page.textContent('.attendees-count');
    const rowsAfterReinit = (await page.$$('.attendee-row')).length;
    const additionalRows = (await page.$$('.attendee-row:not(.main-contact)')).length;
    console.log('  After reinit: count =', countAfterReinit, ', rows =', rowsAfterReinit);
    console.log('  Additional rows:', additionalRows);
    await page.screenshot({ path: path.join(screenshotDir, '06-after-reinit.png') });
    
    const wda911 = additionalRows === 0 && countAfterReinit.startsWith('1/');
    console.log('  RESULT:', wda911 ? 'PASSED' : 'FAILED');
    
    console.log('');
    console.log('=== SUMMARY ===');
    console.log('WDA-910 (Optional Email):', wda910 ? 'PASSED' : 'FAILED');
    console.log('WDA-911 (Attendee Cleanup):', wda911 ? 'PASSED' : 'FAILED');
    console.log('Console Errors:', consoleErrors.length);
    console.log('Screenshots saved to:', screenshotDir);
    
    await page.waitForTimeout(3000);
  } catch (error) {
    console.error('ERROR:', error.message);
    await page.screenshot({ path: path.join(screenshotDir, 'error.png') }).catch(() => {});
  }
  await browser.close();
}
test();