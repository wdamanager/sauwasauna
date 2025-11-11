import { chromium } from 'playwright';
import { writeFile } from 'fs/promises';

async function performMobileAudit() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const results = {
    timestamp: new Date().toISOString(),
    viewport: '375x812 (iPhone X)',
    url: 'http://localhost:4322/es/',
    measurements: {},
    issues: [],
    screenshots: []
  };

  try {
    console.log('🔍 Starting Mobile Audit...\n');

    // Navigate to page
    console.log('📱 Navigating to http://localhost:4322/es/...');
    await page.goto('http://localhost:4322/es/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Take initial viewport screenshot
    console.log('📸 Taking initial viewport screenshot...');
    await page.screenshot({
      path: 'baseline-mobile-initial.png',
      fullPage: false
    });
    results.screenshots.push('baseline-mobile-initial.png');

    // Check for horizontal overflow
    console.log('\n📏 Checking for horizontal overflow...');
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    results.measurements.bodyScrollWidth = bodyWidth;
    results.measurements.viewportWidth = viewportWidth;
    results.measurements.hasHorizontalOverflow = bodyWidth > viewportWidth;

    if (bodyWidth > viewportWidth) {
      results.issues.push({
        severity: 'HIGH',
        issue: 'Horizontal overflow detected',
        measurement: `Body width (${bodyWidth}px) > Viewport (${viewportWidth}px)`,
        overflow: `${bodyWidth - viewportWidth}px`
      });
      console.log(`❌ OVERFLOW: Body ${bodyWidth}px > Viewport ${viewportWidth}px (${bodyWidth - viewportWidth}px overflow)`);
    } else {
      console.log(`✅ No horizontal overflow: Body ${bodyWidth}px <= Viewport ${viewportWidth}px`);
    }

    // Find widest elements
    console.log('\n🔎 Finding widest elements causing overflow...');
    const widestElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      let widest = [];

      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const scrollWidth = el.scrollWidth;

        if (scrollWidth > 375) {
          widest.push({
            width: scrollWidth,
            offsetWidth: el.offsetWidth,
            selector: el.tagName + (el.className ? '.' + el.className.split(' ').slice(0, 2).join('.') : '') + (el.id ? '#' + el.id : ''),
            tag: el.tagName,
            className: el.className,
            left: rect.left,
            right: rect.right
          });
        }
      });

      return widest.sort((a, b) => b.width - a.width).slice(0, 5);
    });

    results.measurements.widestElements = widestElements;
    widestElements.forEach((el, idx) => {
      console.log(`📦 ${idx + 1}. ${el.selector}: ${el.width}px (overflow: ${el.width - 375}px)`);
    });

    // Scroll to blog section
    console.log('\n📜 Scrolling to "DIARIO SAUWA SAUNA" section...');
    const blogSection = await page.locator('text=DIARIO SAUWA SAUNA').first();
    await blogSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Take blog section screenshot
    console.log('📸 Taking blog section screenshot...');
    await page.screenshot({
      path: 'baseline-mobile-blog-section.png',
      fullPage: false
    });
    results.screenshots.push('baseline-mobile-blog-section.png');

    // Find the "Ver más" button
    console.log('\n🔘 Analyzing "Ver más" button...');
    const verMasButtons = await page.locator('text=Ver más').all();
    console.log(`Found ${verMasButtons.length} "Ver más" buttons`);

    for (let i = 0; i < verMasButtons.length; i++) {
      const button = verMasButtons[i];
      if (await button.isVisible()) {
        console.log(`\n🔘 Button ${i + 1}:`);
        await button.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        const buttonBox = await button.boundingBox();
        const buttonData = await button.evaluate(el => {
          const computed = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return {
            width: computed.width,
            height: computed.height,
            padding: computed.padding,
            margin: computed.margin,
            marginTop: computed.marginTop,
            marginBottom: computed.marginBottom,
            fontSize: computed.fontSize,
            display: computed.display,
            className: el.className,
            parentClassName: el.parentElement.className,
            boundingWidth: rect.width,
            boundingLeft: rect.left,
            boundingRight: rect.right
          };
        });

        console.log(`   📏 Bounding box: ${buttonBox.width.toFixed(2)}px × ${buttonBox.height.toFixed(2)}px`);
        console.log(`   📏 Position: left=${buttonBox.x.toFixed(2)}px, right=${(buttonBox.x + buttonBox.width).toFixed(2)}px`);
        console.log(`   📏 CSS width: ${buttonData.width}`);
        console.log(`   📏 Computed width: ${buttonData.boundingWidth.toFixed(2)}px`);
        console.log(`   📏 Padding: ${buttonData.padding}`);
        console.log(`   📏 Margin: ${buttonData.margin}`);
        console.log(`   📏 Class: ${buttonData.className}`);

        if (!results.measurements.verMasButtons) {
          results.measurements.verMasButtons = [];
        }
        results.measurements.verMasButtons.push({
          index: i + 1,
          boundingBox: buttonBox,
          styles: buttonData
        });

        // Check if button exceeds viewport
        const rightEdge = buttonBox.x + buttonBox.width;
        if (rightEdge > 375) {
          results.issues.push({
            severity: 'HIGH',
            issue: `Ver más button ${i + 1} exceeds viewport width`,
            measurement: `Right edge at ${rightEdge.toFixed(2)}px > 375px`,
            overflow: `${(rightEdge - 375).toFixed(2)}px`,
            className: buttonData.className
          });
          console.log(`   ❌ Button exceeds viewport: right edge at ${rightEdge.toFixed(2)}px`);
        } else if (buttonBox.width > 350) {
          results.issues.push({
            severity: 'MEDIUM',
            issue: `Ver más button ${i + 1} too wide`,
            measurement: `${buttonBox.width.toFixed(2)}px (>93% viewport)`,
            className: buttonData.className
          });
          console.log(`   ⚠️ Button very wide: ${buttonBox.width.toFixed(2)}px`);
        } else {
          console.log(`   ✅ Button width OK: ${buttonBox.width.toFixed(2)}px`);
        }

        // Take screenshot
        if (i === verMasButtons.length - 1) {
          console.log('\n📸 Taking focused screenshot of last button area...');
          await page.screenshot({
            path: `baseline-mobile-button-${i + 1}.png`,
            fullPage: false
          });
          results.screenshots.push(`baseline-mobile-button-${i + 1}.png`);
        }
      }
    }

    // Check for category tags
    console.log('\n🏷️ Checking category tags...');
    const categoryTags = await page.locator('[class*="category"], [class*="tag"], [class*="badge"]').all();

    for (let i = 0; i < Math.min(categoryTags.length, 5); i++) {
      const tag = categoryTags[i];
      if (await tag.isVisible()) {
        const tagBox = await tag.boundingBox();
        const tagData = await tag.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            width: computed.width,
            maxWidth: computed.maxWidth,
            display: computed.display,
            className: el.className,
            textContent: el.textContent.trim().substring(0, 30)
          };
        });

        console.log(`🏷️ Tag ${i + 1}: "${tagData.textContent}"`);
        console.log(`   Width: ${tagBox.width.toFixed(2)}px, CSS: ${tagData.width}`);
        console.log(`   Class: ${tagData.className}`);

        if (tagBox.width > 200) {
          results.issues.push({
            severity: 'MEDIUM',
            issue: `Category tag ${i + 1} too wide`,
            measurement: `${tagBox.width.toFixed(2)}px (should be ~60-120px)`,
            className: tagData.className,
            text: tagData.textContent
          });
          console.log(`   ⚠️ Too wide for a tag`);
        }
      }
    }

    // Take full page screenshot
    console.log('\n📸 Taking full page screenshot...');
    await page.screenshot({
      path: 'baseline-mobile-fullpage.png',
      fullPage: true
    });
    results.screenshots.push('baseline-mobile-fullpage.png');

    // Desktop check
    console.log('\n🖥️ Checking desktop view (1920x1080)...');
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'baseline-desktop-fullpage.png',
      fullPage: true
    });
    results.screenshots.push('baseline-desktop-fullpage.png');

    const desktopBodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const desktopViewportWidth = await page.evaluate(() => window.innerWidth);

    results.measurements.desktop = {
      bodyWidth: desktopBodyWidth,
      viewportWidth: desktopViewportWidth,
      hasOverflow: desktopBodyWidth > desktopViewportWidth
    };

    if (desktopBodyWidth > desktopViewportWidth) {
      results.issues.push({
        severity: 'MEDIUM',
        issue: 'Desktop horizontal overflow',
        measurement: `${desktopBodyWidth}px > ${desktopViewportWidth}px`
      });
      console.log(`⚠️ Desktop overflow: ${desktopBodyWidth}px > ${desktopViewportWidth}px`);
    } else {
      console.log(`✅ Desktop OK: ${desktopBodyWidth}px <= ${desktopViewportWidth}px`);
    }

  } catch (error) {
    console.error('❌ Error during audit:', error);
    results.error = error.message;
    results.stack = error.stack;
  }

  // Save results to JSON
  await writeFile('mobile-audit-results.json', JSON.stringify(results, null, 2));
  console.log('\n✅ Audit complete! Results saved to mobile-audit-results.json');
  console.log(`📸 Screenshots saved: ${results.screenshots.join(', ')}`);

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('AUDIT SUMMARY');
  console.log('='.repeat(60));
  console.log(`\n📊 Total Issues Found: ${results.issues.length}`);

  results.issues.forEach((issue, idx) => {
    console.log(`\n${idx + 1}. [${issue.severity}] ${issue.issue}`);
    console.log(`   ${issue.measurement}`);
    if (issue.overflow) console.log(`   Overflow: ${issue.overflow}`);
    if (issue.className) console.log(`   Class: ${issue.className}`);
  });

  console.log('\n' + '='.repeat(60));

  await browser.close();

  return results;
}

performMobileAudit().catch(console.error);
