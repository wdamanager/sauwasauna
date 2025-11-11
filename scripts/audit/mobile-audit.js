const { chromium } = require('playwright');
const fs = require('fs');

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

    // Find widest element
    console.log('\n🔎 Finding widest element causing overflow...');
    const widestElement = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      let widest = { width: 0, selector: '', computedWidth: 0 };

      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const computed = window.getComputedStyle(el);
        const scrollWidth = el.scrollWidth;

        if (scrollWidth > widest.width) {
          widest = {
            width: scrollWidth,
            selector: el.tagName + (el.className ? '.' + el.className.split(' ').join('.') : '') + (el.id ? '#' + el.id : ''),
            computedWidth: parseFloat(computed.width),
            tag: el.tagName,
            className: el.className
          };
        }
      });

      return widest;
    });

    results.measurements.widestElement = widestElement;
    console.log(`📦 Widest element: ${widestElement.selector} (${widestElement.width}px)`);

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
    const verMasButton = await page.locator('text=Ver más').last();

    if (await verMasButton.isVisible()) {
      // Scroll button into view
      await verMasButton.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      // Get button measurements
      const buttonBox = await verMasButton.boundingBox();
      const buttonStyles = await verMasButton.evaluate(el => {
        const computed = window.getComputedStyle(el);
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
          parentClassName: el.parentElement.className
        };
      });

      results.measurements.verMasButton = {
        boundingBox: buttonBox,
        styles: buttonStyles
      };

      console.log(`📏 Button dimensions: ${buttonBox.width}px × ${buttonBox.height}px`);
      console.log(`📏 CSS width: ${buttonStyles.width}, height: ${buttonStyles.height}`);
      console.log(`📏 Padding: ${buttonStyles.padding}`);
      console.log(`📏 Margin: ${buttonStyles.margin}`);
      console.log(`📏 Font size: ${buttonStyles.fontSize}`);
      console.log(`📏 Class: ${buttonStyles.className}`);

      // Check if button is wider than viewport
      if (buttonBox.width > 375) {
        results.issues.push({
          severity: 'HIGH',
          issue: 'Ver más button exceeds viewport width',
          measurement: `${buttonBox.width}px > 375px`,
          overflow: `${buttonBox.width - 375}px`
        });
        console.log(`❌ Button too wide: ${buttonBox.width}px > 375px`);
      } else {
        console.log(`✅ Button width OK: ${buttonBox.width}px <= 375px`);
      }

      // Get distance from last blog card to button
      console.log('\n📏 Measuring spacing from last card to button...');
      const lastCard = await page.locator('.blog-card, [class*="blog"], article').last();
      const lastCardBox = await lastCard.boundingBox();

      const spacing = buttonBox.y - (lastCardBox.y + lastCardBox.height);
      results.measurements.cardToButtonSpacing = spacing;

      console.log(`📏 Last card bottom: ${lastCardBox.y + lastCardBox.height}px`);
      console.log(`📏 Button top: ${buttonBox.y}px`);
      console.log(`📏 Spacing: ${spacing}px`);

      if (spacing > 80) {
        results.issues.push({
          severity: 'MEDIUM',
          issue: 'Excessive spacing above Ver más button',
          measurement: `${spacing}px (recommended: 48-64px)`
        });
        console.log(`⚠️ Excessive spacing: ${spacing}px (should be 48-64px)`);
      } else {
        console.log(`✅ Spacing OK: ${spacing}px`);
      }

      // Take screenshot focused on button
      console.log('\n📸 Taking focused screenshot of button area...');
      await page.screenshot({
        path: 'baseline-mobile-button-focus.png',
        fullPage: false
      });
      results.screenshots.push('baseline-mobile-button-focus.png');

    } else {
      console.log('❌ Ver más button not found');
      results.issues.push({
        severity: 'CRITICAL',
        issue: 'Ver más button not visible'
      });
    }

    // Check for category tags
    console.log('\n🏷️ Checking category tags...');
    const categoryTags = await page.locator('[class*="category"], [class*="tag"]').all();

    for (let i = 0; i < Math.min(categoryTags.length, 3); i++) {
      const tag = categoryTags[i];
      if (await tag.isVisible()) {
        const tagBox = await tag.boundingBox();
        const tagStyles = await tag.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            width: computed.width,
            maxWidth: computed.maxWidth,
            display: computed.display,
            className: el.className,
            textContent: el.textContent.trim()
          };
        });

        console.log(`🏷️ Tag ${i + 1}: "${tagStyles.textContent}"`);
        console.log(`   Width: ${tagBox.width}px, CSS: ${tagStyles.width}`);
        console.log(`   Max-width: ${tagStyles.maxWidth}`);
        console.log(`   Class: ${tagStyles.className}`);

        if (tagBox.width > 200) {
          results.issues.push({
            severity: 'MEDIUM',
            issue: `Category tag too wide: ${tagStyles.textContent}`,
            measurement: `${tagBox.width}px (should be ~60-120px for tags)`,
            className: tagStyles.className
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
  }

  // Save results to JSON
  fs.writeFileSync('mobile-audit-results.json', JSON.stringify(results, null, 2));
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

  await browser.close();

  return results;
}

performMobileAudit().catch(console.error);
