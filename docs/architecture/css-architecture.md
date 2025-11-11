# CSS Architecture - SAUWA Design System

## TL;DR

Atomic CSS architecture with design tokens, utility classes, and component-specific styles. Variables in `design-tokens.css`, utilities in `utilities.css`, components use global classes first. NO inline styles, NO duplicates, ALWAYS use variables.

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│           design-tokens.css                 │  Layer 1: Variables
│  (Colors, Typography, Spacing, Shadows)     │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│            utilities.css                    │  Layer 2: Global Classes
│  (section-*, text-*, container, spacing)    │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│           components.css                    │  Layer 3: Component Classes
│  (cards, buttons, forms, specific patterns) │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│         Astro Components                    │  Layer 4: Implementation
│  (Use global classes, minimal scoped CSS)   │
└─────────────────────────────────────────────┘
```

## Design Tokens System

### Color Palette
```css
/* Primary Brand */
--color-primary: #BA2515;      /* Sauwa Red */
--color-primary-hover: #DB4529; /* Sauwa Orange */

/* Secondary */
--color-b2b: #406E51;           /* Partners Green */
--color-b2b-hover: #4a7e5c;

/* Neutral */
--color-text-primary: #1a1a1a;
--color-text-secondary: #636464;
--color-bg-light: #f4f4f4;
--color-bg-white: #ffffff;
```

### Typography Scale
```css
/* Fluid Typography - Mobile → Desktop */
--font-scale-xs: clamp(0.9375rem, 0.9vw + 0.85rem, 1.0625rem);  /* 15-17px */
--font-scale-sm: clamp(1rem, 1vw + 0.9rem, 1.125rem);           /* 16-18px */
--font-scale-base: clamp(1.125rem, 1.2vw + 1rem, 1.25rem);      /* 18-20px */
--font-scale-lg: clamp(1.5rem, 2vw + 1.2rem, 2rem);             /* 24-32px */
--font-scale-xl: clamp(1.75rem, 2.5vw + 1.4rem, 2.5rem);        /* 28-40px */
--font-scale-2xl: clamp(2rem, 3vw + 1.5rem, 3rem);              /* 32-48px */
```

### Spacing System (8pt Grid)
```css
--spacing-0: 0;
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-5: 1.5rem;   /* 24px */
--spacing-6: 2rem;     /* 32px */
--spacing-8: 3rem;     /* 48px */
--spacing-10: 4rem;    /* 64px */
--spacing-12: 5rem;    /* 80px */
```

## Utility Classes

### Section Headers (Required Pattern)
```css
/* H2 Label - ALWAYS use for section labels */
.section-label {
  font-family: var(--font-family-primary);
  font-size: var(--font-scale-xs);
  font-weight: var(--font-weight-regular);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0 0 var(--spacing-4);
}

/* H3 Title - ALWAYS use for section titles */
.section-title {
  font-family: var(--font-family-primary);
  font-size: var(--font-scale-xl);
  font-weight: var(--font-weight-light);
  line-height: 1.3;
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-5);
}

/* Description text */
.section-description {
  font-family: var(--font-family-secondary);
  font-size: var(--font-scale-base);
  font-weight: var(--font-weight-light);
  line-height: 1.7;
  color: var(--color-text-secondary);
}
```

### Modifiers (BEM Style)
```css
/* Color variants */
.section-label--primary { color: var(--color-primary); }
.section-label--b2b { color: var(--color-b2b); }
.section-label--white { color: white; }

/* Layout variants */
.section-title--center { text-align: center; }
.section-description--center { text-align: center; }
.section-description--max-width {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
```

### Container System
```css
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-5);
}

.container--narrow { max-width: 1200px; }
.container--wide { max-width: 1600px; }

.section {
  padding: var(--spacing-12) 0;
}

.section--compact { padding: var(--spacing-10) 0; }
.section--spacious { padding: var(--spacing-12) 0 var(--spacing-10); }
```

## Component Implementation

### ✅ CORRECT Implementation
```astro
<!-- Using global classes -->
<section class="section section--compact">
  <div class="container container--narrow">
    <h2 class="section-label section-label--b2b">EXPERIENCIA SAUWA</h2>
    <h3 class="section-title section-title--center">
      Descubre el auténtico ritual finlandés
    </h3>
    <p class="section-description section-description--center section-description--max-width">
      Una experiencia única de bienestar en Andorra
    </p>
  </div>
</section>

<style>
  /* ONLY truly unique styles for this component */
  .unique-pattern {
    /* Specific layout that doesn't exist globally */
  }
</style>
```

### ❌ INCORRECT Implementation
```astro
<!-- NEVER do this -->
<style>
  .my-component__title {
    font-size: 1.5rem; /* ❌ Hardcoded value */
    color: #406E51;    /* ❌ Hardcoded color */
    margin: 0 0 1rem;  /* ❌ Hardcoded spacing */
  }
</style>
```

## File Structure

```
src/styles/
├── design-tokens.css    # CSS variables (single source of truth)
├── utilities.css        # Global utility classes
├── components.css       # Reusable component styles
├── layouts.css         # Layout patterns
└── main.css            # Import orchestrator
```

### main.css
```css
/* Import order matters */
@import './design-tokens.css';
@import './utilities.css';
@import './components.css';
@import './layouts.css';
```

## Migration Strategy

### Phase 1: Setup Foundation
1. Create `design-tokens.css` with all variables
2. Create `utilities.css` with global classes
3. Update `main.css` to import new files

### Phase 2: Component Migration
1. Identify duplicate styles across components
2. Replace inline styles with utility classes
3. Move unique styles to component scope

### Phase 3: Validation
1. Visual regression testing
2. Performance audit
3. Cross-browser testing

## Decision Rules

### When to use global classes
- **ALWAYS** for typography (section-label, section-title, section-description)
- **ALWAYS** for spacing (use spacing variables)
- **ALWAYS** for colors (use color variables)
- **ALWAYS** for common patterns (containers, sections)

### When to use scoped styles
- **ONLY** for truly unique component layouts
- **ONLY** for component-specific animations
- **ONLY** when no global class exists AND pattern won't be reused

### When to create new global classes
1. Pattern appears in 2+ components → Make it global
2. Style represents design system element → Make it global
3. Value should be consistent across site → Use variable

## Performance Metrics

| Metric | Before | After | Target |
|--------|--------|-------|--------|
| CSS Lines | ~3,500 | 2,000 | <2,000 |
| Duplicated Code | 40% | 5% | <5% |
| Bundle Size | 85KB | 50KB | <50KB |
| Specificity Wars | Many | None | Zero |

## Tooling & Validation

### PostCSS Configuration
```javascript
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-custom-properties'),
    require('autoprefixer'),
    require('cssnano')
  ]
}
```

### Stylelint Rules
```json
{
  "rules": {
    "declaration-property-value-no-unknown": true,
    "color-no-hex": true,
    "unit-disallowed-list": ["px"],
    "custom-property-pattern": "^--[a-z]+"
  }
}
```

## Common Patterns

### Hero Section
```astro
<section class="section hero">
  <div class="container">
    <h1 class="hero__title">...</h1>
    <p class="section-description">...</p>
    <button class="btn btn--primary">...</button>
  </div>
</section>
```

### Content Section
```astro
<section class="section">
  <div class="container container--narrow">
    <header class="section__header">
      <h2 class="section-label">...</h2>
      <h3 class="section-title">...</h3>
    </header>
    <div class="section__content">
      <!-- Content -->
    </div>
  </div>
</section>
```

### Card Component
```astro
<article class="card">
  <h4 class="card__title">...</h4>
  <p class="card__description">...</p>
  <a class="card__link">...</a>
</article>
```

## Maintenance

### Daily Checks
- [ ] Using variables for all values?
- [ ] Using global classes first?
- [ ] No duplicate styles?

### PR Review
- [ ] CSS follows architecture?
- [ ] No hardcoded values?
- [ ] Documented new patterns?

### Monthly Audit
- [ ] Bundle size check
- [ ] Duplication analysis
- [ ] Performance metrics

---

**Status**: ACTIVE
**Version**: 2.0.0
**Updated**: 2025-11-09
**Owner**: Frontend Team