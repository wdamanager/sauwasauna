# Vertical Scroll Carousel Analysis Report
## SAUWA vs DATA Project Comparison

### Executive Summary

The user wants to implement a vertical scroll carousel effect in the "DIARIO SAUWA SAUNA" section where:
1. The section title/header stays FIXED (sticky)
2. Blog posts scroll vertically through the viewport
3. Each post appears one at a time as you scroll
4. Similar to DATA project's "Projectes DATA Arquitectura" section

**Current Status**: SAUWA has a partially implemented sticky layout but lacks the true vertical scroll effect where cards appear one-by-one.

---

## 1. DATA Project Implementation Analysis

### Location: Section "Projectes DATA Arquitectura"
**File**: `C:\Users\moise\OneDrive\Documentos\Trabajo\DATA\data-astro\src\pages\index.astro` (lines 173-302)

### Key Implementation Details:

#### HTML Structure:
```html
<section id="projectes" class="min-h-screen bg-white">
  <div class="grid lg:grid-cols-2 min-h-screen">

    <!-- Left Column - STICKY -->
    <div class="lg:sticky lg:top-0 lg:h-screen flex items-center">
      <div class="hero-section-content w-full">
        <h2>Projectes arquitectònics a Andorra</h2>
        <h3>Projectes DATA Arquitectura</h3>
        <p>Description text...</p>
        <a href="#">Més projectes</a>
      </div>
    </div>

    <!-- Right Column - SCROLLABLE -->
    <div class="flex flex-col">
      <!-- Project 1 -->
      <div class="py-16 flex items-center project-item fade-in-up">
        <!-- Each project has min-height to force scroll -->
      </div>
      <!-- Project 2, 3, 4... -->
    </div>
  </div>
</section>
```

#### Critical CSS Properties:
```css
/* Left column sticky implementation */
.lg\:sticky {
  position: sticky;
}

.lg\:top-0 {
  top: 0;
}

.lg\:h-screen {
  height: 100vh;
}

/* Each project item */
.project-item {
  padding: 4rem 0;
  min-height: 600px; /* Forces scroll */
}
```

### How It Works:
1. **Two-column grid layout** (50/50 split)
2. **Left column**: `position: sticky; top: 0; height: 100vh`
3. **Right column**: Normal flow with tall content items
4. Each project card has significant padding and min-height to create scroll distance
5. Uses Tailwind classes directly in HTML

---

## 2. SAUWA Current Implementation Analysis

### Location: "DIARIO SAUWA SAUNA" Section
**Files**:
- `src\components\BenefitsBlogSection.astro`
- `src\components\BlogScrollCards.astro`
- `src\components\BenefitsList.astro`

### Current Structure:

#### BenefitsBlogSection.astro:
```html
<section class="benefits-blog-section">
  <div class="sticky-grid">
    <!-- Left Column -->
    <div class="sticky-column">
      <div class="sticky-content">
        <BenefitsList />
      </div>
    </div>

    <!-- Right Column -->
    <div class="scroll-column">
      <BlogScrollCards />
    </div>
  </div>
</section>
```

#### Current CSS:
```css
.sticky-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

.sticky-content {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Blog cards */
.blog-card {
  min-height: 600px;
  /* Has animations but not one-by-one scroll */
}
```

---

## 3. What's Missing/Broken in SAUWA

### Issue #1: Section Title Not Fixed
- **Problem**: The "DIARIO SAUWA SAUNA" title is inside the sticky content, not as a fixed header
- **DATA has**: Title stays fixed while content scrolls
- **SAUWA has**: Entire left column is sticky (title + benefits)

### Issue #2: Blog Cards Don't Scroll One-by-One
- **Problem**: All blog cards are visible, just with fade-in animation
- **DATA has**: Each project takes up significant viewport height
- **SAUWA has**: Multiple cards visible at once

### Issue #3: Missing Viewport-Height Cards
- **Problem**: Cards don't take full viewport height
- **DATA has**: Each item has substantial padding creating scroll distance
- **SAUWA has**: Smaller cards that don't force individual scroll

---

## 4. Implementation Plan

### Step 1: Restructure the Layout

**File to modify**: `src\components\BenefitsBlogSection.astro`

```astro
<section class="benefits-blog-section" id="beneficios-blog">
  <!-- Fixed Header -->
  <div class="section-header">
    <h2>DIARIO SAUWA SAUNA</h2>
  </div>

  <div class="content-wrapper">
    <div class="sticky-grid">
      <!-- Left Column - Sticky (without title) -->
      <div class="sticky-column">
        <div class="sticky-content">
          <BenefitsList showTitle={false} />
        </div>
      </div>

      <!-- Right Column - Vertical Scroll -->
      <div class="scroll-column">
        <BlogScrollCards verticalScroll={true} />
      </div>
    </div>
  </div>
</section>
```

### Step 2: Add CSS for Fixed Header

```css
.section-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 100;
  padding: 2rem 3rem;
  border-bottom: 1px solid #e5e5e5;
}

.content-wrapper {
  padding-top: 100px; /* Space for fixed header */
}

.sticky-column {
  position: relative;
}

.sticky-content {
  position: sticky;
  top: 120px; /* Below fixed header */
  height: calc(100vh - 120px);
}
```

### Step 3: Modify BlogScrollCards for Vertical Effect

**File to modify**: `src\components\BlogScrollCards.astro`

Add prop for vertical scroll mode:
```astro
const { locale = 'es', limit = 3, verticalScroll = false } = Astro.props;
```

Update card styles:
```css
/* Vertical scroll mode */
.vertical-scroll .blog-card {
  min-height: 80vh; /* Takes most of viewport */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 4rem;
  padding: 4rem 3rem;
}

.vertical-scroll .blog-card:first-child {
  margin-top: 2rem;
}

.vertical-scroll .blog-card:last-child {
  margin-bottom: 40vh; /* Extra scroll space at end */
}
```

### Step 4: Add Scroll-Triggered Animations

```javascript
// Enhanced scroll animations
document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('.vertical-scroll')) return;

  const cards = document.querySelectorAll('.vertical-scroll .blog-card');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -20% 0px', // Card in center of viewport
    threshold: [0, 0.5, 1],
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const card = entry.target;

      if (entry.intersectionRatio > 0.5) {
        // Card is centered in viewport
        card.classList.add('is-centered');
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      } else if (entry.intersectionRatio > 0) {
        // Card is partially visible
        card.classList.remove('is-centered');
        card.style.opacity = '0.6';
        card.style.transform = 'scale(0.95)';
      } else {
        // Card is not visible
        card.style.opacity = '0.3';
        card.style.transform = 'scale(0.9)';
      }
    });
  }, observerOptions);

  cards.forEach(card => {
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
  });
});
```

---

## 5. Complete Implementation Guide

### Option A: Minimal Changes (Recommended)

1. **Modify** `BlogScrollCards.astro`:
   - Increase `min-height` of `.blog-card` to `80vh`
   - Add more padding between cards
   - Adjust the intersection observer threshold

2. **Keep** current sticky layout but enhance it:
   ```css
   .blog-card {
     min-height: 80vh;
     padding: 6rem 3rem;
     margin-bottom: 4rem;
     display: flex;
     flex-direction: column;
     justify-content: center;
   }
   ```

### Option B: Full DATA-style Implementation

1. **Create new component** `VerticalBlogScroll.astro`
2. **Copy DATA structure** exactly
3. **Adapt styling** to SAUWA brand

---

## 6. Quick Fix (Immediate Solution)

To quickly restore the vertical scroll effect, modify these files:

### File: `src\components\BlogScrollCards.astro`

Replace lines 145-154 with:
```css
.blog-card {
  background: #FFFFFF;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(30px);

  /* VERTICAL SCROLL EFFECT */
  min-height: 80vh; /* Takes most viewport */
  margin-bottom: 10vh; /* Space between cards */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 3rem;
}
```

### File: `src\components\BenefitsBlogSection.astro`

Update line 62 (sticky-content):
```css
.sticky-content {
  position: sticky;
  top: 80px; /* Account for navbar */
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
```

---

## 7. Testing Checklist

- [ ] Left column stays fixed while scrolling
- [ ] Blog cards appear one at a time
- [ ] Smooth scroll between cards
- [ ] Mobile responsive (stacks vertically)
- [ ] Animation triggers at right scroll position
- [ ] Last card has enough scroll space
- [ ] Performance is smooth (no jank)

---

## Conclusion

The SAUWA implementation has the basic sticky layout structure but needs:
1. **Taller blog cards** (80vh minimum)
2. **More spacing** between cards
3. **Better scroll-triggered animations**
4. **Optional**: Fixed section header separate from sticky content

The quickest fix is to increase the `min-height` of blog cards and adjust the spacing, which will create the vertical scroll effect similar to DATA's implementation.