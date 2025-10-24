import { chromium } from 'playwright';

(async () => {
  console.log('\n========================================');
  console.log('MOBILE BLOG FIXES - VERIFICATION TEST');
  console.log('========================================\n');

  const browser = await chromium.launch({ headless: false });

  // Test multiple mobile viewports
  const viewports = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 12 Pro', width: 390, height: 844 },
    { name: 'iPhone 12 Pro Max', width: 428, height: 926 },
    { name: 'Samsung Galaxy S20', width: 360, height: 800 },
  ];

  for (const viewport of viewports) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Testing: ${viewport.name} (${viewport.width}x${viewport.height})`);
    console.log('='.repeat(60));

    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    try {
      // Navigate to page
      await page.goto('http://localhost:4322/es/', { waitUntil: 'networkidle', timeout: 10000 });
      console.log('✓ Page loaded');

      // Wait for blog section
      await page.waitForSelector('.blog-scroll-container', { timeout: 5000 });

      // Scroll to blog section
      await page.evaluate(() => {
        const blogSection = document.querySelector('.blog-scroll-container');
        if (blogSection) {
          blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      await page.waitForTimeout(1000);

      // CHECK 1: Horizontal Scroll
      console.log('\n--- CHECK 1: Horizontal Scroll ---');
      const scrollCheck = await page.evaluate(() => {
        const html = document.documentElement;
        const body = document.body;
        return {
          htmlScrollWidth: html.scrollWidth,
          htmlClientWidth: html.clientWidth,
          bodyScrollWidth: body.scrollWidth,
          bodyClientWidth: body.clientWidth,
          hasOverflow: html.scrollWidth > html.clientWidth || body.scrollWidth > body.clientWidth,
          viewportWidth: window.innerWidth
        };
      });

      if (scrollCheck.hasOverflow) {
        console.log(`❌ FAIL: Horizontal scroll detected`);
        console.log(`   Viewport: ${scrollCheck.viewportWidth}px`);
        console.log(`   HTML scroll width: ${scrollCheck.htmlScrollWidth}px`);
        console.log(`   Overflow: ${scrollCheck.htmlScrollWidth - scrollCheck.htmlClientWidth}px`);

        // Find culprit elements
        const wideElements = await page.evaluate(() => {
          const elements = Array.from(document.querySelectorAll('*'));
          const viewportWidth = window.innerWidth;
          return elements
            .filter(el => el.getBoundingClientRect().width > viewportWidth)
            .slice(0, 5)
            .map(el => ({
              tag: el.tagName,
              class: el.className,
              id: el.id,
              width: Math.round(el.getBoundingClientRect().width),
              overflow: Math.round(el.getBoundingClientRect().width - viewportWidth)
            }));
        });

        console.log('\n   Wide elements causing overflow:');
        wideElements.forEach((el, i) => {
          console.log(`   ${i + 1}. <${el.tag}> ${el.class ? `.${el.class}` : ''} ${el.id ? `#${el.id}` : ''}`);
          console.log(`      Width: ${el.width}px (overflow: ${el.overflow}px)`);
        });
      } else {
        console.log(`✓ PASS: No horizontal scroll`);
        console.log(`   Viewport: ${scrollCheck.viewportWidth}px`);
        console.log(`   Content width: ${scrollCheck.htmlScrollWidth}px`);
      }

      // CHECK 2: CTA Button Spacing
      console.log('\n--- CHECK 2: CTA Button Spacing ---');
      const spacingCheck = await page.evaluate(() => {
        const lastCard = document.querySelector('.vertical-scroll-mode .blog-card:last-of-type');
        const ctaContainer = document.querySelector('.vertical-scroll-mode .cta-container');
        const ctaButton = document.querySelector('.cta-more');

        if (!lastCard || !ctaContainer || !ctaButton) {
          return { error: 'Elements not found' };
        }

        const lastCardRect = lastCard.getBoundingClientRect();
        const ctaContainerRect = ctaContainer.getBoundingClientRect();
        const ctaButtonRect = ctaButton.getBoundingClientRect();

        const lastCardStyles = window.getComputedStyle(lastCard);
        const ctaContainerStyles = window.getComputedStyle(ctaContainer);

        return {
          cardMarginBottom: lastCardStyles.marginBottom,
          containerMarginTop: ctaContainerStyles.marginTop,
          containerPaddingTop: ctaContainerStyles.paddingTop,
          totalGap: Math.round(ctaButtonRect.top - lastCardRect.bottom),
          targetRange: { min: 48, max: 80 }
        };
      });

      if (spacingCheck.error) {
        console.log(`❌ ERROR: ${spacingCheck.error}`);
      } else {
        const { totalGap, targetRange } = spacingCheck;
        const isOptimal = totalGap >= targetRange.min && totalGap <= targetRange.max;

        if (isOptimal) {
          console.log(`✓ PASS: CTA spacing is optimal (${totalGap}px)`);
        } else if (totalGap < targetRange.min) {
          console.log(`⚠ WARNING: Spacing too tight (${totalGap}px)`);
        } else {
          console.log(`❌ FAIL: Spacing too large (${totalGap}px)`);
        }

        console.log(`   Card margin-bottom: ${spacingCheck.cardMarginBottom}`);
        console.log(`   Container margin-top: ${spacingCheck.containerMarginTop}`);
        console.log(`   Container padding-top: ${spacingCheck.containerPaddingTop}`);
        console.log(`   Total gap: ${totalGap}px`);
        console.log(`   Target range: ${targetRange.min}-${targetRange.max}px`);
      }

      // CHECK 3: Text Overflow
      console.log('\n--- CHECK 3: Text Overflow ---');
      const textCheck = await page.evaluate(() => {
        const titles = Array.from(document.querySelectorAll('.blog-card .card-title'));
        const excerpts = Array.from(document.querySelectorAll('.blog-card .card-excerpt'));

        const hasOverflow = (el) => {
          return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
        };

        const overflowingTitles = titles.filter(hasOverflow);
        const overflowingExcerpts = excerpts.filter(hasOverflow);

        return {
          totalTitles: titles.length,
          overflowingTitles: overflowingTitles.length,
          totalExcerpts: excerpts.length,
          overflowingExcerpts: overflowingExcerpts.length
        };
      });

      if (textCheck.overflowingTitles === 0 && textCheck.overflowingExcerpts === 0) {
        console.log(`✓ PASS: All text properly contained`);
        console.log(`   Titles: ${textCheck.totalTitles} (0 overflowing)`);
        console.log(`   Excerpts: ${textCheck.totalExcerpts} (0 overflowing)`);
      } else {
        console.log(`❌ FAIL: Text overflow detected`);
        console.log(`   Titles: ${textCheck.totalTitles} (${textCheck.overflowingTitles} overflowing)`);
        console.log(`   Excerpts: ${textCheck.totalExcerpts} (${textCheck.overflowingExcerpts} overflowing)`);
      }

      // CHECK 4: Touch Targets
      console.log('\n--- CHECK 4: Touch Target Size ---');
      const touchCheck = await page.evaluate(() => {
        const ctaButton = document.querySelector('.cta-more');
        const minSize = 44; // Apple HIG minimum

        if (!ctaButton) return { error: 'Button not found' };

        const rect = ctaButton.getBoundingClientRect();
        const styles = window.getComputedStyle(ctaButton);

        return {
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          padding: styles.padding,
          minSize,
          passWidth: rect.width >= minSize,
          passHeight: rect.height >= minSize
        };
      });

      if (touchCheck.error) {
        console.log(`❌ ERROR: ${touchCheck.error}`);
      } else {
        const passTouch = touchCheck.passWidth && touchCheck.passHeight;
        if (passTouch) {
          console.log(`✓ PASS: Button meets touch target requirements`);
        } else {
          console.log(`❌ FAIL: Button too small for touch`);
        }
        console.log(`   Size: ${touchCheck.width}x${touchCheck.height}px`);
        console.log(`   Minimum: ${touchCheck.minSize}x${touchCheck.minSize}px`);
        console.log(`   Padding: ${touchCheck.padding}`);
      }

      // Take screenshot
      const screenshotPath = `C:\\Users\\moise\\OneDrive\\Documentos\\Trabajo\\SAUWA\\sauwasauna.com\\astro\\mobile-verify-${viewport.width}w.png`;

      // Scroll to show CTA button
      await page.evaluate(() => {
        const lastCard = document.querySelector('.blog-card:last-of-type');
        if (lastCard) {
          lastCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
      await page.waitForTimeout(1000);

      await page.screenshot({
        path: screenshotPath,
        fullPage: false
      });
      console.log(`\n📸 Screenshot saved: mobile-verify-${viewport.width}w.png`);

    } catch (error) {
      console.error(`\n❌ ERROR: ${error.message}`);
    } finally {
      await context.close();
    }
  }

  console.log('\n========================================');
  console.log('TEST SUMMARY');
  console.log('========================================');
  console.log('\nAll screenshots saved to:');
  console.log('C:\\Users\\moise\\OneDrive\\Documentos\\Trabajo\\SAUWA\\sauwasauna.com\\astro\\');
  console.log('\nFiles:');
  viewports.forEach(vp => {
    console.log(`  - mobile-verify-${vp.width}w.png (${vp.name})`);
  });
  console.log('\n');

  await browser.close();
  process.exit(0);
})();
