# Typography System Reference

## TL;DR

SAUWA typography: Helvetica Neue (100-300) for titles, Avenir Next (300-400) for text. Ultra-light aesthetic. Orange (#DB4529) accent. Responsive with `clamp()`. BenefitsImageSection.astro is the reference implementation.

## Overview

| Aspect | Value |
|--------|-------|
| **Primary Font** | Helvetica Neue (titles) |
| **Secondary Font** | Avenir Next (text) |
| **Weight Range** | 100-400 (ultra-light focus) |
| **Brand Color** | #DB4529 (Sauwa Orange) |
| **Reference Component** | `BenefitsImageSection.astro` |
| **Guideline** | WDA-98 (Linear) |

## Font Families

```css
/* Titles (H1, H2, H3) */
font-family: 'Helvetica Neue', 'Inter', 'Helvetica', 'Arial', sans-serif;

/* Text & Subtitles (H4, P, Span) */
font-family: 'Avenir Next', 'Avenir', 'Nunito Sans', system-ui, sans-serif;
```

## Standard Classes

| Class | Element | Font | Size | Weight | Color | Usage |
|-------|---------|------|------|--------|-------|-------|
| `.seo-title` | H2 | Helvetica Neue | 16px | 300 | #DB4529 | SEO keywords (uppercase) |
| `.main-heading` | H3 | Helvetica Neue | clamp(28px, 4vw, 36px) | 200 | #1a1a1a | Section titles |
| `.main-heading--large` | H3 | Helvetica Neue | clamp(32px, 5vw, 42px) | 200 | #1a1a1a | Featured sections |
| `.card-title` | H4 | Avenir Next | 18px | 400 | #1a1a1a | Card subtitles |
| `.intro-text` | P | Avenir Next | clamp(15px, 2vw, 18px) | 300 | #444 | Intro paragraphs |
| `.body-text` | P | Avenir Next | 15px | 300 | #555 | Regular text |
| `.display-number` | Span | Helvetica Neue | 48px | 100 | #DB4529 | Decorative numbers |
| `.hero-h1` | H1 | Helvetica Neue | clamp(32px, 7vw, 72px) | 100 | #FFFFFF | Hero titles |
| `.hero-h2` | H2 | Avenir Next | clamp(16px, 3vw, 28px) | 300 | #DB4529 | Hero commercial text |

## Color Palette

```css
/* Text Colors */
--text-black: #1a1a1a;         /* Titles */
--text-dark-gray: #444;        /* Intro text */
--text-gray: #555;             /* Body text */
--text-light-gray: #666;       /* Small text */

/* Brand Colors */
--text-orange: #DB4529;        /* Sauwa orange */
--text-orange-dark: #BA2515;  /* Hover state */

/* Light Colors */
--text-white: #FFFFFF;
--text-white-90: rgba(255, 255, 255, 0.9);
--text-white-70: rgba(255, 255, 255, 0.7);
```

## Weight Guidelines

| Weight | Name | Usage | Status |
|--------|------|-------|--------|
| 100 | Ultra Light | H1 hero, decorative numbers | ✅ Use |
| 200 | Extra Light | H3 main headings | ✅ Use |
| 300 | Light | H2 SEO, body text | ✅ Use |
| 400 | Regular | H4 card titles | ✅ Use sparingly |
| 500+ | Medium+ | - | ❌ **NEVER USE** |

## Responsive Typography

### Mobile First Approach

```css
/* Base mobile → Desktop scaling */
.main-heading {
  font-size: clamp(28px, 4vw, 36px);  /* 28px mobile → 36px desktop */
}

.hero-h1 {
  font-size: clamp(32px, 7vw, 72px);  /* 32px mobile → 72px desktop */
}

.intro-text {
  font-size: clamp(15px, 2vw, 18px);  /* 15px mobile → 18px desktop */
}
```

### Breakpoint Overrides

```css
@media (max-width: 768px) {
  .main-heading { font-size: 24px; }
  .card-title { font-size: 16px; }
  .body-text { font-size: 14px; }
}
```

## Line Height Standards

| Context | Line Height | Rationale |
|---------|-------------|-----------|
| Large titles (H1-H3) | 1.2 - 1.3 | Tight for impact |
| Subtitles (H4) | 1.3 - 1.4 | Balance readability |
| Body text | 1.6 - 1.7 | Optimal reading |
| Intro text | 1.7 - 1.8 | Airy feeling |
| Small text | 1.4 - 1.6 | Compact but readable |

## Letter Spacing

```css
/* Uppercase text */
.uppercase { letter-spacing: 1.5px; }

/* Ultra-light titles */
.font-weight-100 { letter-spacing: -0.5px; }

/* Body text - default */
.body-text { letter-spacing: normal; }
```

## Component Patterns

### Section Headers
```html
<section>
  <h2 class="seo-title">BIENESTAR BARCELONA</h2>
  <h3 class="main-heading">Descubre el poder del calor</h3>
  <p class="intro-text">Una experiencia transformadora...</p>
</section>
```

### Cards
```html
<article class="card">
  <h4 class="card-title">Relajación Profunda</h4>
  <p class="body-text">El calor penetra en los músculos...</p>
</article>
```

### Hero Sections
```html
<div class="hero">
  <h1 class="hero-h1">SAUWA</h1>
  <h2 class="hero-h2">Tu bienestar empieza aquí</h2>
</div>
```

## Implementation Checklist

- [ ] Import Helvetica Neue & Avenir Next fonts
- [ ] Define CSS variables for colors
- [ ] Create utility classes for weights
- [ ] Implement responsive clamp() sizing
- [ ] Test on all breakpoints
- [ ] Validate WCAG contrast ratios
- [ ] Apply consistent line-heights
- [ ] Review with design team

## Reference Files

- **Component Model**: `/astro/src/components/sections/BenefitsImageSection.astro`
- **Guideline**: `/docs/GUIDELINE/01-FOUNDATION/typography.md`
- **Task**: Linear WDA-98

## Notes

1. **Never use font-weight > 400** - breaks ultra-light aesthetic
2. **Always include fallback fonts** in font-family declarations
3. **Use clamp() for responsive** sizing when possible
4. **Test on real devices** - ultra-light weights render differently

---

*Last Updated: 2025-10-24*
*Consolidated from 6 typography documents*