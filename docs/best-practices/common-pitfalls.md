# Common CSS Pitfalls - SAUWA Project

## TL;DR

Document of CSS mistakes that have occurred and MUST NOT happen again. Each pitfall includes: problem description, root cause, impact, solution, and prevention strategy.

## Critical Incident: WDA-531 Style Duplication

### Problem
Global CSS changes not applying to all pages. Each page had duplicate inline styles overriding global styles.

### Root Cause
- No design system in place
- Copy-paste development
- Lack of CSS architecture documentation
- No code review process for CSS

### Impact
- 3+ hours debugging why changes didn't work
- 40% code duplication across components
- Inconsistent user experience
- Increased bundle size (85KB vs 50KB target)

### Solution Implemented
```css
/* BEFORE: Each page had its own styles */
/* /es/acceso-exclusivo.astro */
.partners-intro__title {
  font-size: 1.0625rem;
  color: #406E51;
  /* ... duplicated styles */
}

/* /es/trabaja-con-nosotros.astro */
.careers-responsibilities__intro {
  font-size: 1.25rem;
  color: #406E51;
  /* ... same styles, different values */
}

/* AFTER: Global utility classes */
.section-label { /* Single definition */ }
.section-label--b2b { /* Modifier */ }
```

### Prevention
1. **Always check** for existing global classes
2. **Never duplicate** typography styles
3. **Use variables** for all values
4. **Document** new patterns immediately

---

## Pitfall 1: Hardcoded Values

### Anti-Pattern
```css
.component {
  color: #BA2515;      /* ❌ Hardcoded color */
  font-size: 18px;     /* ❌ Hardcoded size */
  margin-bottom: 24px; /* ❌ Hardcoded spacing */
}
```

### Why It Happens
- Designer provides specific values
- Quick fixes under deadline
- Lack of variable awareness
- Copy from design tools

### Correct Pattern
```css
.component {
  color: var(--color-primary);
  font-size: var(--font-scale-base);
  margin-bottom: var(--spacing-5);
}
```

### Detection
```bash
# Find hardcoded hex colors
grep -r "#[0-9a-fA-F]\{3,6\}" src/styles/ src/components/

# Find pixel values
grep -r "[0-9]\+px" src/styles/ src/components/
```

---

## Pitfall 2: Component-Specific Typography

### Anti-Pattern
```astro
<!-- Every component defines its own title styles -->
<style>
  .hero__title { font-size: 2rem; font-weight: 300; }
  .section__title { font-size: 2rem; font-weight: 300; }
  .card__title { font-size: 1.5rem; font-weight: 400; }
</style>
```

### Why It Happens
- Component-first thinking
- Lack of global typography system
- Different developers, different approaches
- No design system documentation

### Correct Pattern
```astro
<!-- Use global typography classes -->
<h1 class="text-hero">...</h1>
<h2 class="section-title">...</h2>
<h3 class="card-title">...</h3>
```

### Prevention Checklist
- [ ] Typography scale defined in variables
- [ ] Global classes for each text level
- [ ] Documentation of when to use each class
- [ ] Lint rule to catch custom font-size

---

## Pitfall 3: Specificity Wars

### Anti-Pattern
```css
/* Escalating specificity */
.nav .menu .item { color: blue; }
.nav .menu .item.active { color: red; }
.nav .menu .item.active:hover { color: green !important; }
```

### Why It Happens
- Fighting with existing styles
- Lack of CSS architecture
- Third-party library overrides
- Quick fixes that become permanent

### Correct Pattern
```css
/* Flat, predictable specificity */
.nav-item { color: var(--color-primary); }
.nav-item--active { color: var(--color-secondary); }
.nav-item:hover { color: var(--color-hover); }
```

### Rules
1. Maximum nesting: 3 levels
2. Avoid ID selectors for styling
3. !important only for utilities (and sparingly)
4. BEM for component modifiers

---

## Pitfall 4: Responsive Breakpoint Chaos

### Anti-Pattern
```css
/* Random breakpoints everywhere */
@media (max-width: 823px) { }
@media (max-width: 650px) { }
@media (max-width: 500px) { }
@media (min-width: 1243px) { }
```

### Why It Happens
- Fixing specific device issues
- No defined breakpoint system
- Testing on personal devices only
- Pixel-perfect matching attempts

### Correct Pattern
```css
/* Consistent breakpoint system */
/* Mobile First */
.element { }                        /* 0-767px */
@media (min-width: 768px) { }      /* Tablet */
@media (min-width: 1024px) { }     /* Desktop */
@media (min-width: 1440px) { }     /* Wide */
```

### System
```javascript
// breakpoints.js
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};
```

---

## Pitfall 5: Scoped Styles Overuse

### Anti-Pattern
```astro
<!-- Every component has scoped styles -->
<style>
  h2 { /* Affects only this component */ }
  p { /* Creating inconsistency */ }
</style>
```

### Why It Happens
- Astro makes it easy
- Fear of affecting other components
- Lack of global styles
- Component isolation mindset

### Correct Pattern
```astro
<!-- Global classes first, scoped only for unique needs -->
<h2 class="section-title">...</h2>
<p class="section-description">...</p>

<style>
  /* Only truly component-specific styles */
  .unique-layout-grid {
    display: grid;
    grid-template: /* specific to this component */;
  }
</style>
```

### Rule of Thumb
- 80% global classes
- 20% component-specific (maximum)

---

## Pitfall 6: Z-Index Tower

### Anti-Pattern
```css
.modal { z-index: 9999; }
.dropdown { z-index: 99999; }
.tooltip { z-index: 999999; }
.popup { z-index: 9999999; }
```

### Why It Happens
- Quick fixes for overlapping elements
- No z-index system
- Third-party components
- "Just make it higher"

### Correct Pattern
```css
:root {
  --z-index-dropdown: 1000;
  --z-index-sticky: 1020;
  --z-index-fixed: 1030;
  --z-index-backdrop: 1040;
  --z-index-modal: 1050;
  --z-index-popover: 1060;
  --z-index-tooltip: 1070;
}

.modal { z-index: var(--z-index-modal); }
```

---

## Pitfall 7: Color Variations Explosion

### Anti-Pattern
```css
.btn-red { background: #BA2515; }
.btn-dark-red { background: #9A1505; }
.btn-light-red { background: #DA3525; }
.btn-very-light-red { background: #EA4535; }
/* 20+ color variations */
```

### Why It Happens
- Design iterations
- "Just a bit darker/lighter"
- No color system
- Client requests

### Correct Pattern
```css
.btn--primary {
  background: var(--color-primary);
}

.btn--primary:hover {
  filter: brightness(1.1);
  /* OR */
  background: var(--color-primary-hover);
}

/* Maximum 3-5 color variants per element */
```

---

## Pitfall 8: Mobile-Last Development

### Anti-Pattern
```css
/* Desktop styles first */
.element { width: 1200px; }

@media (max-width: 768px) {
  .element { width: 100%; } /* Override for mobile */
}
```

### Why It Happens
- Design provided desktop-first
- Development on desktop
- Mobile as afterthought
- Legacy approach

### Correct Pattern
```css
/* Mobile First */
.element { width: 100%; }

@media (min-width: 768px) {
  .element { width: 1200px; } /* Enhance for desktop */
}
```

---

## Pitfall 9: Animation Performance Issues

### Anti-Pattern
```css
.element {
  transition: all 0.3s; /* Animating everything */
}

.animate {
  animation: complexMove 1s;
  /* Animating width, height, top, left */
}
```

### Why It Happens
- Convenience of "all"
- Not understanding render performance
- Complex animations look cool
- Copy from animation libraries

### Correct Pattern
```css
.element {
  transition: transform 0.3s, opacity 0.3s;
  /* Only animate GPU-accelerated properties */
}

.animate {
  transform: translateX(100px);
  /* Use transform instead of position */
}
```

### Performance Properties
- ✅ transform
- ✅ opacity
- ⚠️ color, background
- ❌ width, height, top, left

---

## Pitfall 10: Framework Fighting

### Anti-Pattern
```css
/* Fighting with Tailwind */
.my-component {
  margin: 20px !important; /* Override Tailwind */
  padding: 15px !important;
}
```

### Why It Happens
- Mixing approaches
- Not understanding framework
- Legacy code integration
- Personal preferences

### Correct Pattern
```astro
<!-- Work with the framework -->
<div class="m-5 p-4">
  <!-- Or extend it properly -->
</div>

<style>
  /* Only for non-utility styles */
  .complex-grid {
    display: grid;
    /* Specific grid layout */
  }
</style>
```

---

## Prevention Strategies

### 1. Code Review Checklist
```markdown
CSS Review:
- [ ] No hardcoded values
- [ ] No duplicate styles
- [ ] Using existing utilities
- [ ] Following naming convention
- [ ] Mobile-first approach
- [ ] Performance considered
```

### 2. Automated Checks
```json
// .stylelintrc.json
{
  "rules": {
    "color-no-hex": true,
    "unit-disallowed-list": ["px"],
    "max-nesting-depth": 3,
    "selector-max-specificity": "0,3,0"
  }
}
```

### 3. Documentation Requirements
- Every new pattern must be documented
- Examples of correct usage required
- Anti-patterns explicitly shown
- Migration guide for existing code

### 4. Regular Audits
```bash
# Weekly CSS audit script
#!/bin/bash
echo "CSS Health Check"
echo "================"
echo "Checking for hardcoded values..."
grep -r "#[0-9a-fA-F]\{6\}" src/

echo "Checking file sizes..."
ls -lh dist/**/*.css

echo "Running CSS stats..."
npx cssstats dist/styles.css
```

## Learning Resources

1. [CSS Architecture Guide](../architecture/css-architecture.md)
2. [Best Practices](./css-best-practices.md)
3. [Design System](../GUIDELINE/README.md)
4. [Migration Plan](../history/css-refactor-plan.md)

---

**Remember**: These aren't just guidelines—they're lessons learned from real incidents. Following them prevents hours of debugging and ensures consistent, maintainable code.