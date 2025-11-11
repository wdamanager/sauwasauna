import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log('=== MOBILE BLOG SECTION INSPECTION ===\n');

  try {
    // Navigate to the page
    console.log('Navigating to http://localhost:4322/es/...');
    await page.goto('http://localhost:4322/es/', { waitUntil: 'networkidle' });

    // Wait for blog section to be visible
    await page.waitForSelector('.blog-scroll-container', { timeout: 5000 });
    console.log('Blog section loaded\n');

    // Scroll to blog section
    await page.evaluate(() => {
      const blogSection = document.querySelector('.blog-scroll-container');
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    await page.waitForTimeout(1000);

    // Check for horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    console.log(`Horizontal scroll detected: ${hasHorizontalScroll ? 'YES ❌' : 'NO ✓'}`);

    if (hasHorizontalScroll) {
      const scrollInfo = await page.evaluate(() => {
        return {
          viewportWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
        };
      });
      console.log(`  - Viewport width: ${scrollInfo.viewportWidth}px`);
      console.log(`  - Scroll width: ${scrollInfo.scrollWidth}px`);
      console.log(`  - Overflow: ${scrollInfo.overflow}px\n`);

      // Find elements causing overflow
      const wideElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        const viewportWidth = document.documentElement.clientWidth;
        const wide = [];

        elements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width > viewportWidth) {
            wide.push({
              tag: el.tagName,
              class: el.className,
              width: rect.width,
              overflow: rect.width - viewportWidth
            });
          }
        });

        return wide.slice(0, 10); // Top 10
      });

      console.log('Elements wider than viewport:');
      wideElements.forEach((el, i) => {
        console.log(`  ${i + 1}. <${el.tag}> .${el.class} - ${el.width.toFixed(2)}px (overflow: ${el.overflow.toFixed(2)}px)`);
      });
      console.log('');
    }

    // Measure spacing around CTA button
    const spacingInfo = await page.evaluate(() => {
      const lastCard = document.querySelector('.vertical-scroll-mode .blog-card:last-of-type');
      const ctaContainer = document.querySelector('.vertical-scroll-mode .cta-container');
      const ctaButton = document.querySelector('.cta-more');

      if (!lastCard || !ctaContainer || !ctaButton) {
        return { error: 'Elements not found' };
      }

      const lastCardRect = lastCard.getBoundingClientRect();
      const ctaContainerRect = ctaContainer.getBoundingClientRect();
      const ctaButtonRect = ctaButton.getBoundingClientRect();

      const gapBetweenCardAndContainer = ctaContainerRect.top - lastCardRect.bottom;

      // Get computed styles
      const ctaContainerStyles = window.getComputedStyle(ctaContainer);
      const lastCardStyles = window.getComputedStyle(lastCard);

      return {
        lastCard: {
          bottom: lastCardRect.bottom,
          marginBottom: lastCardStyles.marginBottom,
          height: lastCardRect.height
        },
        ctaContainer: {
          top: ctaContainerRect.top,
          marginTop: ctaContainerStyles.marginTop,
          paddingTop: ctaContainerStyles.paddingTop,
          paddingBottom: ctaContainerStyles.paddingBottom,
          minHeight: ctaContainerStyles.minHeight,
          height: ctaContainerRect.height
        },
        ctaButton: {
          top: ctaButtonRect.top,
          width: ctaButtonRect.width,
          maxWidth: window.getComputedStyle(ctaButton).maxWidth
        },
        gap: gapBetweenCardAndContainer,
        totalSpaceAboveButton: ctaButtonRect.top - lastCardRect.bottom
      };
    });

    if (spacingInfo.error) {
      console.log(`Error: ${spacingInfo.error}\n`);
    } else {
      console.log('=== SPACING MEASUREMENTS ===');
      console.log(`\nLast Blog Card:`);
      console.log(`  - Bottom position: ${spacingInfo.lastCard.bottom.toFixed(2)}px`);
      console.log(`  - Margin-bottom: ${spacingInfo.lastCard.marginBottom}`);
      console.log(`  - Card height: ${spacingInfo.lastCard.height.toFixed(2)}px`);

      console.log(`\nCTA Container:`);
      console.log(`  - Top position: ${spacingInfo.ctaContainer.top.toFixed(2)}px`);
      console.log(`  - Margin-top: ${spacingInfo.ctaContainer.marginTop}`);
      console.log(`  - Padding-top: ${spacingInfo.ctaContainer.paddingTop}`);
      console.log(`  - Padding-bottom: ${spacingInfo.ctaContainer.paddingBottom}`);
      console.log(`  - Min-height: ${spacingInfo.ctaContainer.minHeight}`);
      console.log(`  - Actual height: ${spacingInfo.ctaContainer.height.toFixed(2)}px`);

      console.log(`\nCTA Button:`);
      console.log(`  - Top position: ${spacingInfo.ctaButton.top.toFixed(2)}px`);
      console.log(`  - Width: ${spacingInfo.ctaButton.width.toFixed(2)}px`);
      console.log(`  - Max-width: ${spacingInfo.ctaButton.maxWidth}`);

      console.log(`\n=== GAPS ===`);
      console.log(`Gap between last card and CTA container: ${spacingInfo.gap.toFixed(2)}px`);
      console.log(`Total space above button: ${spacingInfo.totalSpaceAboveButton.toFixed(2)}px ⚠️`);
      console.log('');
    }

    // Take screenshots
    console.log('Taking screenshots...\n');

    // Full page screenshot
    await page.screenshot({
      path: 'C:\\Users\\moise\\OneDrive\\Documentos\\Trabajo\\SAUWA\\sauwasauna.com\\astro\\mobile-blog-full.png',
      fullPage: true
    });
    console.log('✓ Full page: mobile-blog-full.png');

    // Scroll to last card
    await page.evaluate(() => {
      const lastCard = document.querySelector('.blog-card:last-of-type');
      if (lastCard) {
        lastCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    await page.waitForTimeout(1000);

    // Screenshot of last card and CTA
    await page.screenshot({
      path: 'C:\\Users\\moise\\OneDrive\\Documentos\\Trabajo\\SAUWA\\sauwasauna.com\\astro\\mobile-blog-cta-spacing.png',
    });
    console.log('✓ CTA spacing: mobile-blog-cta-spacing.png');

    // Check blog container width
    const containerInfo = await page.evaluate(() => {
      const container = document.querySelector('.blog-scroll-container');
      const cards = document.querySelectorAll('.blog-card');
      const ctaMore = document.querySelector('.cta-more');

      if (!container) return { error: 'Container not found' };

      const containerRect = container.getBoundingClientRect();
      const containerStyles = window.getComputedStyle(container);

      const cardInfo = Array.from(cards).map(card => ({
        width: card.getBoundingClientRect().width,
        padding: window.getComputedStyle(card.querySelector('.card-content')).padding
      }));

      return {
        container: {
          width: containerRect.width,
          padding: containerStyles.padding,
          paddingLeft: containerStyles.paddingLeft,
          paddingRight: containerStyles.paddingRight
        },
        cards: cardInfo,
        ctaButton: ctaMore ? {
          width: ctaMore.getBoundingClientRect().width,
          maxWidth: window.getComputedStyle(ctaMore).maxWidth
        } : null,
        viewportWidth: window.innerWidth
      };
    });

    console.log(`\n=== WIDTH ANALYSIS ===`);
    console.log(`Viewport width: ${containerInfo.viewportWidth}px`);
    console.log(`Container width: ${containerInfo.container.width.toFixed(2)}px`);
    console.log(`Container padding: ${containerInfo.container.padding}`);
    console.log(`Container padding-left: ${containerInfo.container.paddingLeft}`);
    console.log(`Container padding-right: ${containerInfo.container.paddingRight}`);

    if (containerInfo.cards.length > 0) {
      console.log(`\nBlog cards (${containerInfo.cards.length} total):`);
      containerInfo.cards.forEach((card, i) => {
        console.log(`  Card ${i + 1}: ${card.width.toFixed(2)}px, content padding: ${card.padding}`);
      });
    }

    if (containerInfo.ctaButton) {
      console.log(`\nCTA button: ${containerInfo.ctaButton.width.toFixed(2)}px (max-width: ${containerInfo.ctaButton.maxWidth})`);
    }

    console.log('\n=== TEST COMPLETE ===');
    console.log('Screenshots saved to astro directory');

    // Keep browser open for manual inspection
    console.log('\nBrowser will stay open for manual inspection...');
    console.log('Press Ctrl+C to close');

    await page.waitForTimeout(60000); // Wait 1 minute

  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await browser.close();
  }
})();
