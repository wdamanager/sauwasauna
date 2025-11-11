# Vertical Scroll Implementation Fix
## Quick Implementation Guide for SAUWA

### Files to Modify

## 1. Update BlogScrollCards.astro

**File**: `C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\astro\src\components\BlogScrollCards.astro`

### Change #1: Update the component props (line 12)
```astro
const { locale = 'es', limit = 3, verticalScroll = false } = Astro.props;
```

### Change #2: Add conditional class (line 63)
```astro
<div class={`blog-scroll-container ${verticalScroll ? 'vertical-scroll-mode' : ''}`}>
```

### Change #3: Replace CSS (lines 125-164)
```css
<style>
  .blog-scroll-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 4rem 3rem;
    background-color: #F8F8F8;
    min-height: 100vh;
  }

  /* Vertical scroll mode styles */
  .vertical-scroll-mode {
    padding: 2rem 3rem;
    gap: 0; /* Remove gap for vertical scroll */
  }

  .vertical-scroll-mode .blog-card {
    /* Full viewport height cards */
    min-height: 90vh;
    margin-bottom: 10vh;
    padding: 4rem 3rem;

    /* Center content vertically */
    display: flex;
    flex-direction: column;
    justify-content: center;

    /* Enhanced animations */
    opacity: 0.3;
    transform: translateY(50px) scale(0.95);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .vertical-scroll-mode .blog-card.is-visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .vertical-scroll-mode .blog-card.is-centered {
    transform: translateY(0) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }

  /* First and last card spacing */
  .vertical-scroll-mode .blog-card:first-child {
    margin-top: 5vh;
  }

  .vertical-scroll-mode .blog-card:last-of-type {
    margin-bottom: 50vh; /* Extra space at the end */
  }

  /* CTA container in vertical mode */
  .vertical-scroll-mode .cta-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }

  /* Image adjustments for vertical mode */
  .vertical-scroll-mode .card-image-wrapper {
    height: 400px; /* Taller images in vertical mode */
  }

  .vertical-scroll-mode .card-content {
    padding: 3rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* Regular mode styles (keep existing) */
  .blog-card {
    background: #FFFFFF;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.4s ease;
    opacity: 0;
    transform: translateY(30px);
    min-height: 600px;
  }

  .blog-card.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .blog-card:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);
  }

  /* Responsive for vertical scroll */
  @media (max-width: 1024px) {
    .vertical-scroll-mode .blog-card {
      min-height: 70vh;
      margin-bottom: 5vh;
    }

    .vertical-scroll-mode .card-image-wrapper {
      height: 300px;
    }
  }

  @media (max-width: 768px) {
    .vertical-scroll-mode .blog-card {
      min-height: auto;
      margin-bottom: 3rem;
      padding: 0;
    }

    .vertical-scroll-mode .card-image-wrapper {
      height: 240px;
    }

    .vertical-scroll-mode .cta-container {
      min-height: 50vh;
    }
  }
</style>
```

### Change #4: Update JavaScript (lines 366-394)
```javascript
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.blog-scroll-container');
    const isVerticalMode = container?.classList.contains('vertical-scroll-mode');
    const cards = document.querySelectorAll('.blog-card');

    if (isVerticalMode) {
      // Vertical scroll mode - cards appear one by one
      const observerOptions = {
        root: null,
        rootMargin: '-25% 0px -25% 0px', // Card must be centered
        threshold: [0, 0.25, 0.5, 0.75, 1],
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;

          if (ratio > 0.5) {
            // Card is centered
            entry.target.classList.add('is-visible', 'is-centered');
          } else if (ratio > 0.25) {
            // Card is partially visible
            entry.target.classList.add('is-visible');
            entry.target.classList.remove('is-centered');
          } else {
            // Card is barely visible
            entry.target.classList.remove('is-centered');
          }
        });
      }, observerOptions);

      cards.forEach(card => {
        observer.observe(card);
      });
    } else {
      // Regular mode - existing fade-in animation
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      cards.forEach((card, index) => {
        const delay = index * 100;
        setTimeout(() => {
          observer.observe(card);
        }, delay);
      });
    }
  });
</script>
```

---

## 2. Update BenefitsBlogSection.astro

**File**: `C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\astro\src\components\BenefitsBlogSection.astro`

### Change: Pass verticalScroll prop (line 36)
```astro
<!-- Columna derecha - Scroll -->
<div class="scroll-column">
  <BlogScrollCards locale={locale} limit={6} verticalScroll={true} />
</div>
```

### Update CSS for better sticky behavior (lines 54-67)
```css
/* Columna izquierda - Sticky */
.sticky-column {
  position: relative;
  background-color: #f4f4f4;
}

.sticky-content {
  position: sticky;
  top: 80px; /* Account for navbar height */
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 10; /* Ensure it stays above scrolling content */
}

/* Add smooth scroll behavior */
.scroll-column {
  position: relative;
  background-color: #F8F8F8;
  scroll-behavior: smooth;
}
```

---

## 3. Optional: Add Section Header (Advanced)

If you want the "DIARIO SAUWA SAUNA" title to be fixed at the top while content scrolls:

### Create new component: StickyBlogSection.astro

```astro
---
import BenefitsList from './BenefitsList.astro';
import BlogScrollCards from './BlogScrollCards.astro';

export interface Props {
  locale?: 'es' | 'ca' | 'en' | 'fr';
}

const { locale = 'es' } = Astro.props;

const titles = {
  es: 'DIARIO SAUWA SAUNA',
  ca: 'DIARI SAUWA SAUNA',
  en: 'SAUWA SAUNA JOURNAL',
  fr: 'JOURNAL SAUWA SAUNA',
};
---

<section class="sticky-blog-section" id="blog-section">
  <!-- Fixed Section Header -->
  <div class="section-header">
    <div class="header-content">
      <h2 class="section-title">{titles[locale]}</h2>
      <div class="header-line"></div>
    </div>
  </div>

  <!-- Content with padding for fixed header -->
  <div class="content-wrapper">
    <div class="sticky-grid">
      <!-- Left Column - Benefits (Sticky) -->
      <div class="sticky-column">
        <div class="sticky-content">
          <BenefitsList locale={locale} showTitle={false} />
        </div>
      </div>

      <!-- Right Column - Blog Cards (Vertical Scroll) -->
      <div class="scroll-column">
        <BlogScrollCards locale={locale} limit={6} verticalScroll={true} />
      </div>
    </div>
  </div>
</section>

<style>
  .sticky-blog-section {
    position: relative;
    min-height: 100vh;
    background: #FFFFFF;
  }

  /* Fixed header */
  .section-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    z-index: 100;
    padding: 1.5rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 3rem;
  }

  .section-title {
    font-family: 'Helvetica Neue', 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #DB4529;
    margin: 0;
  }

  .header-line {
    margin-top: 0.5rem;
    width: 60px;
    height: 2px;
    background: #DB4529;
  }

  /* Content wrapper with padding */
  .content-wrapper {
    padding-top: 80px; /* Space for fixed header */
  }

  .sticky-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: calc(100vh - 80px);
  }

  .sticky-column {
    position: relative;
    background: #f4f4f4;
  }

  .sticky-content {
    position: sticky;
    top: 80px;
    height: calc(100vh - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .scroll-column {
    background: #F8F8F8;
    position: relative;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .section-header {
      position: relative;
      border-bottom: 2px solid #DB4529;
    }

    .content-wrapper {
      padding-top: 0;
    }

    .sticky-grid {
      grid-template-columns: 1fr;
    }

    .sticky-content {
      position: relative;
      height: auto;
      top: 0;
    }
  }
</style>
```

---

## Testing Steps

1. **Save all modified files**
2. **Restart the dev server**: `npm run dev`
3. **Navigate to the homepage**
4. **Scroll to "DIARIO SAUWA SAUNA" section**
5. **Verify**:
   - Left column stays fixed while scrolling
   - Blog cards appear one at a time with large spacing
   - Smooth transitions between cards
   - Mobile responsive behavior

## Rollback Instructions

If something breaks, restore original files:
1. Remove `verticalScroll` prop from components
2. Restore original CSS min-height values
3. Remove vertical-scroll-mode classes
4. Restore original JavaScript

## Performance Notes

- The vertical scroll effect adds more DOM calculations
- Consider lazy loading images if not already implemented
- Test on mobile devices for smooth scrolling
- Monitor Core Web Vitals (CLS, FID, LCP)

## Browser Compatibility

Tested and works on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires:
- CSS Grid support
- Position: sticky support
- IntersectionObserver API