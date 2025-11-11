import { chromium } from 'playwright';
import { writeFile } from 'fs/promises';

async function completeAudit() {
  const browser = await chromium.launch({ headless: false });

  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║         SAUWA SAUNA - MOBILE AUDIT (CLEAN STATE)          ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const report = {
    timestamp: new Date().toISOString(),
    url: 'http://localhost:4322/es/',
    commit: '728456e (sticky fix - last stable)',
    verticalScrollMode: false,
    mobile: {},
    desktop: {},
    issues: [],
    fixPlan: [],
    screenshots: []
  };

  // ============================================================
  // PHASE 1: MOBILE AUDIT (375px - iPhone X)
  // ============================================================
  console.log('\n📱 PHASE 1: MOBILE AUDIT (375x812)\n' + '─'.repeat(60));

  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const mobilePage = await mobileContext.newPage();

  try {
    await mobilePage.goto('http://localhost:4322/es/', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(2000);

    // Screenshot 1: Initial load
    console.log('📸 Screenshot 1: Initial viewport...');
    await mobilePage.screenshot({ path: 'audit-mobile-01-initial.png', fullPage: false });
    report.screenshots.push('audit-mobile-01-initial.png');

    // Check 1: Horizontal overflow
    console.log('\n🔍 Check 1: Horizontal Overflow');
    const overflow = await mobilePage.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;

      const bodyScrollWidth = body.scrollWidth;
      const bodyOffsetWidth = body.offsetWidth;
      const htmlScrollWidth = html.scrollWidth;
      const viewportWidth = window.innerWidth;

      // Find all elements
      const allElements = Array.from(document.querySelectorAll('*'));
      const overflowing = allElements
        .map(el => ({
          tag: el.tagName,
          className: el.className,
          id: el.id,
          scrollWidth: el.scrollWidth,
          offsetWidth: el.offsetWidth,
          boundingWidth: el.getBoundingClientRect().width,
          boundingLeft: el.getBoundingClientRect().left,
          boundingRight: el.getBoundingClientRect().right,
        }))
        .filter(el => el.scrollWidth > 375 || el.boundingRight > 375)
        .sort((a, b) => b.scrollWidth - a.scrollWidth)
        .slice(0, 10);

      return {
        bodyScrollWidth,
        bodyOffsetWidth,
        htmlScrollWidth,
        viewportWidth,
        hasOverflow: bodyScrollWidth > viewportWidth,
        overflowAmount: Math.max(0, bodyScrollWidth - viewportWidth),
        overflowingElements: overflowing
      };
    });

    report.mobile.overflow = overflow;

    if (overflow.hasOverflow) {
      console.log(`   ❌ OVERFLOW DETECTED: ${overflow.overflowAmount}px`);
      console.log(`   Body: ${overflow.bodyScrollWidth}px > Viewport: ${overflow.viewportWidth}px`);

      report.issues.push({
        severity: 'CRITICAL',
        category: 'Horizontal Overflow',
        description: 'Page wider than mobile viewport',
        measurement: `${overflow.bodyScrollWidth}px > ${overflow.viewportWidth}px`,
        overflow: `${overflow.overflowAmount}px`,
        impact: 'Users must scroll horizontally - poor UX'
      });

      console.log(`\n   Top ${overflow.overflowingElements.length} widest elements:`);
      overflow.overflowingElements.forEach((el, idx) => {
        const selector = el.tag + (el.className ? `.${el.className.split(' ')[0]}` : '') + (el.id ? `#${el.id}` : '');
        console.log(`   ${idx + 1}. ${selector}: ${el.scrollWidth}px`);

        if (idx < 5) {
          report.issues.push({
            severity: 'HIGH',
            category: 'Element Overflow',
            description: `Element exceeds viewport width`,
            element: selector,
            measurement: `${el.scrollWidth}px (overflow: ${el.scrollWidth - 375}px)`,
            className: el.className
          });
        }
      });
    } else {
      console.log(`   ✅ No horizontal overflow`);
      console.log(`   Body: ${overflow.bodyScrollWidth}px <= Viewport: ${overflow.viewportWidth}px`);
    }

    // Scroll to blog section
    console.log('\n🔍 Check 2: Blog Section Navigation');
    await mobilePage.evaluate(() => {
      const heading = Array.from(document.querySelectorAll('h2, h3')).find(
        el => el.textContent.includes('DIARIO')
      );
      heading?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    await mobilePage.waitForTimeout(1500);

    // Screenshot 2: Blog section
    console.log('📸 Screenshot 2: Blog section...');
    await mobilePage.screenshot({ path: 'audit-mobile-02-blog-section.png', fullPage: false });
    report.screenshots.push('audit-mobile-02-blog-section.png');

    // Check 2: Ver más buttons
    console.log('\n🔍 Check 3: "Ver más" Buttons');
    const buttonAnalysis = await mobilePage.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('a, button')).filter(
        el => el.textContent.trim().toLowerCase().includes('ver más') ||
              el.textContent.trim().toLowerCase().includes('ver mas')
      );

      return buttons.map((btn, idx) => {
        const computed = window.getComputedStyle(btn);
        const rect = btn.getBoundingClientRect();
        const parent = btn.parentElement;
        const parentComputed = window.getComputedStyle(parent);

        return {
          index: idx + 1,
          tag: btn.tagName,
          text: btn.textContent.trim(),
          className: btn.className,
          parentClassName: parent.className,

          // Dimensions
          boundingWidth: rect.width,
          boundingHeight: rect.height,
          boundingLeft: rect.left,
          boundingRight: rect.right,

          // CSS
          cssWidth: computed.width,
          cssMaxWidth: computed.maxWidth,
          cssMinWidth: computed.minWidth,
          padding: computed.padding,
          margin: computed.margin,
          fontSize: computed.fontSize,

          // Position
          display: computed.display,
          position: computed.position,

          // Parent
          parentDisplay: parentComputed.display,
          parentWidth: parentComputed.width,
          parentMaxWidth: parentComputed.maxWidth,

          // Visibility
          visible: rect.width > 0 && rect.height > 0
        };
      });
    });

    report.mobile.buttons = buttonAnalysis;

    buttonAnalysis.forEach(btn => {
      console.log(`\n   Button ${btn.index}: "${btn.text}"`);
      console.log(`   Tag: ${btn.tag}, Class: ${btn.className}`);
      console.log(`   Width: ${btn.boundingWidth.toFixed(2)}px (CSS: ${btn.cssWidth})`);
      console.log(`   Position: left=${btn.boundingLeft.toFixed(2)}px, right=${btn.boundingRight.toFixed(2)}px`);
      console.log(`   Parent: ${btn.parentClassName} (${btn.parentWidth})`);

      // Check if exceeds viewport
      if (btn.boundingRight > 375) {
        console.log(`   ❌ EXCEEDS VIEWPORT by ${(btn.boundingRight - 375).toFixed(2)}px`);
        report.issues.push({
          severity: 'HIGH',
          category: 'Button Overflow',
          description: `Ver más button ${btn.index} exceeds viewport`,
          element: `${btn.tag}.${btn.className.split(' ')[0]}`,
          measurement: `Right edge: ${btn.boundingRight.toFixed(2)}px > 375px`,
          overflow: `${(btn.boundingRight - 375).toFixed(2)}px`,
          cssWidth: btn.cssWidth,
          actualWidth: `${btn.boundingWidth.toFixed(2)}px`
        });
      } else if (btn.boundingWidth > 350) {
        console.log(`   ⚠️ Very wide (${(btn.boundingWidth / 375 * 100).toFixed(1)}% of viewport)`);
        report.issues.push({
          severity: 'MEDIUM',
          category: 'Button Width',
          description: `Ver más button ${btn.index} very wide`,
          element: `${btn.tag}.${btn.className.split(' ')[0]}`,
          measurement: `${btn.boundingWidth.toFixed(2)}px (${(btn.boundingWidth / 375 * 100).toFixed(1)}% viewport)`,
          recommendation: 'Consider max-width: 90% or specific pixel value'
        });
      } else {
        console.log(`   ✅ Width OK`);
      }
    });

    // Scroll to last button
    if (buttonAnalysis.length > 0) {
      await mobilePage.evaluate((idx) => {
        const buttons = Array.from(document.querySelectorAll('a, button')).filter(
          el => el.textContent.trim().toLowerCase().includes('ver más')
        );
        buttons[idx - 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, buttonAnalysis[buttonAnalysis.length - 1].index);
      await mobilePage.waitForTimeout(1000);

      // Screenshot 3: Button focus
      console.log('\n📸 Screenshot 3: Ver más button focused...');
      await mobilePage.screenshot({ path: 'audit-mobile-03-button-focus.png', fullPage: false });
      report.screenshots.push('audit-mobile-03-button-focus.png');
    }

    // Check 3: Category tags
    console.log('\n🔍 Check 4: Category Tags');
    const tagAnalysis = await mobilePage.evaluate(() => {
      const tags = Array.from(document.querySelectorAll('[class*="category"], [class*="tag"], [class*="badge"]'));

      return tags.slice(0, 5).map((tag, idx) => {
        const computed = window.getComputedStyle(tag);
        const rect = tag.getBoundingClientRect();

        return {
          index: idx + 1,
          className: tag.className,
          text: tag.textContent.trim().substring(0, 30),
          width: rect.width,
          cssWidth: computed.width,
          maxWidth: computed.maxWidth,
          display: computed.display,
          visible: rect.width > 0 && rect.height > 0
        };
      }).filter(t => t.visible);
    });

    report.mobile.tags = tagAnalysis;

    tagAnalysis.forEach(tag => {
      console.log(`   Tag ${tag.index}: "${tag.text}"`);
      console.log(`   Width: ${tag.width.toFixed(2)}px (CSS: ${tag.cssWidth}, max: ${tag.maxWidth})`);

      if (tag.width > 200) {
        console.log(`   ⚠️ Too wide for a category tag`);
        report.issues.push({
          severity: 'MEDIUM',
          category: 'Tag Width',
          description: 'Category tag unusually wide',
          element: tag.className.split(' ')[0],
          measurement: `${tag.width.toFixed(2)}px`,
          recommendation: 'Tags should be 60-120px typically'
        });
      } else {
        console.log(`   ✅ Width OK`);
      }
    });

    // Screenshot 4: Full page
    console.log('\n📸 Screenshot 4: Full mobile page...');
    await mobilePage.screenshot({ path: 'audit-mobile-04-fullpage.png', fullPage: true });
    report.screenshots.push('audit-mobile-04-fullpage.png');

  } catch (error) {
    console.error('❌ Mobile audit error:', error);
    report.mobile.error = error.message;
  } finally {
    await mobileContext.close();
  }

  // ============================================================
  // PHASE 2: DESKTOP AUDIT (1920px)
  // ============================================================
  console.log('\n\n🖥️  PHASE 2: DESKTOP AUDIT (1920x1080)\n' + '─'.repeat(60));

  const desktopContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });
  const desktopPage = await desktopContext.newPage();

  try {
    await desktopPage.goto('http://localhost:4322/es/', { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(2000);

    // Screenshot 5: Desktop
    console.log('📸 Screenshot 5: Desktop view...');
    await desktopPage.screenshot({ path: 'audit-desktop-01-fullpage.png', fullPage: true });
    report.screenshots.push('audit-desktop-01-fullpage.png');

    const desktopOverflow = await desktopPage.evaluate(() => {
      return {
        bodyScrollWidth: document.body.scrollWidth,
        viewportWidth: window.innerWidth,
        hasOverflow: document.body.scrollWidth > window.innerWidth
      };
    });

    report.desktop.overflow = desktopOverflow;

    if (desktopOverflow.hasOverflow) {
      console.log(`   ⚠️ Desktop overflow: ${desktopOverflow.bodyScrollWidth}px > ${desktopOverflow.viewportWidth}px`);
      report.issues.push({
        severity: 'MEDIUM',
        category: 'Desktop Overflow',
        description: 'Desktop view has horizontal overflow',
        measurement: `${desktopOverflow.bodyScrollWidth}px > ${desktopOverflow.viewportWidth}px`
      });
    } else {
      console.log(`   ✅ Desktop OK: ${desktopOverflow.bodyScrollWidth}px <= ${desktopOverflow.viewportWidth}px`);
    }

  } catch (error) {
    console.error('❌ Desktop audit error:', error);
    report.desktop.error = error.message;
  } finally {
    await desktopContext.close();
  }

  // ============================================================
  // PHASE 3: GENERATE FIX PLAN
  // ============================================================
  console.log('\n\n🔧 PHASE 3: GENERATING FIX PLAN\n' + '─'.repeat(60));

  // Analyze issues and create surgical fix plan
  const criticalIssues = report.issues.filter(i => i.severity === 'CRITICAL');
  const highIssues = report.issues.filter(i => i.severity === 'HIGH');
  const mediumIssues = report.issues.filter(i => i.severity === 'MEDIUM');

  console.log(`\n📊 Issue Summary:`);
  console.log(`   CRITICAL: ${criticalIssues.length}`);
  console.log(`   HIGH: ${highIssues.length}`);
  console.log(`   MEDIUM: ${mediumIssues.length}`);
  console.log(`   TOTAL: ${report.issues.length}`);

  // Create fix plan based on issues found
  if (report.issues.some(i => i.category === 'Button Overflow' || i.category === 'Button Width')) {
    report.fixPlan.push({
      priority: 1,
      file: 'Identify button CSS file',
      change: 'Add max-width constraint to Ver más buttons',
      css: 'max-width: calc(100vw - 32px) or max-width: 343px (375px - 16px padding each side)',
      reason: 'Prevent button from exceeding viewport width'
    });
  }

  if (report.issues.some(i => i.category === 'Element Overflow')) {
    const overflowElements = report.issues.filter(i => i.category === 'Element Overflow');
    overflowElements.slice(0, 3).forEach((issue, idx) => {
      report.fixPlan.push({
        priority: idx + 2,
        element: issue.element,
        change: 'Add max-width: 100vw or containment',
        reason: `Element causing ${issue.measurement} overflow`
      });
    });
  }

  await browser.close();

  // ============================================================
  // SAVE REPORT
  // ============================================================
  console.log('\n💾 Saving comprehensive report...');
  await writeFile('MOBILE-AUDIT-REPORT.json', JSON.stringify(report, null, 2));

  // ============================================================
  // PRINT FINAL SUMMARY
  // ============================================================
  console.log('\n\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                    AUDIT COMPLETE                          ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  console.log(`\n📸 Screenshots Generated: ${report.screenshots.length}`);
  report.screenshots.forEach(s => console.log(`   - ${s}`));

  console.log(`\n📋 Report saved: MOBILE-AUDIT-REPORT.json`);

  console.log(`\n🐛 Issues Found: ${report.issues.length}`);
  if (report.issues.length > 0) {
    console.log('\nTop Issues:');
    report.issues.slice(0, 5).forEach((issue, idx) => {
      console.log(`\n${idx + 1}. [${issue.severity}] ${issue.description}`);
      console.log(`   ${issue.measurement || ''}`);
      if (issue.overflow) console.log(`   Overflow: ${issue.overflow}`);
    });
  }

  console.log(`\n🔧 Fix Plan: ${report.fixPlan.length} changes recommended`);
  report.fixPlan.forEach((fix, idx) => {
    console.log(`\n${idx + 1}. [Priority ${fix.priority}] ${fix.change}`);
    if (fix.css) console.log(`   CSS: ${fix.css}`);
    console.log(`   Reason: ${fix.reason}`);
  });

  console.log('\n✅ Review screenshots and MOBILE-AUDIT-REPORT.json for details');
  console.log('✅ Ready to create surgical fixes based on evidence\n');
}

completeAudit().catch(console.error);
