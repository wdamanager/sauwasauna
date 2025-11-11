import { chromium } from 'playwright';

async function checkStructure() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('🔍 Checking page structure...\n');

    await page.goto('http://localhost:4322/es/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Get blog section HTML
    const blogSectionHTML = await page.evaluate(() => {
      // Find blog section
      const heading = Array.from(document.querySelectorAll('h2, h3')).find(
        el => el.textContent.includes('DIARIO SAUWA SAUNA')
      );

      if (!heading) return 'Blog section not found';

      const section = heading.closest('section, div[class*="blog"]') || heading.parentElement;

      return {
        sectionHTML: section.outerHTML.substring(0, 2000),
        sectionClasses: section.className,

        // Find Ver más buttons
        verMasButtons: Array.from(section.querySelectorAll('a, button')).filter(
          el => el.textContent.includes('Ver más')
        ).map(btn => ({
          tag: btn.tagName,
          className: btn.className,
          innerHTML: btn.innerHTML,
          parentClass: btn.parentElement.className
        })),

        // Find all links in section
        allLinks: Array.from(section.querySelectorAll('a')).map(a => ({
          text: a.textContent.trim().substring(0, 30),
          className: a.className,
          href: a.getAttribute('href')
        }))
      };
    });

    console.log('📄 Blog Section Structure:');
    console.log(JSON.stringify(blogSectionHTML, null, 2));

    // Get all stylesheets
    const stylesheets = await page.evaluate(() => {
      return Array.from(document.styleSheets).map(sheet => {
        try {
          return {
            href: sheet.href,
            rules: sheet.cssRules ? sheet.cssRules.length : 0
          };
        } catch (e) {
          return { href: sheet.href, error: 'Cannot access' };
        }
      });
    });

    console.log('\n📝 Stylesheets:');
    console.log(JSON.stringify(stylesheets, null, 2));

  } catch (error) {
    console.error('❌ Error:', error);
  }

  await browser.close();
}

checkStructure().catch(console.error);
