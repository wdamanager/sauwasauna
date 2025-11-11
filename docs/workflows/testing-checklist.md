# Testing Checklist - Pre-Commit & PR Review

## TL;DR

Mandatory checklist before ANY commit touching CSS/styles. Every checkbox must be checked. This prevents style regressions and maintains design system integrity.

## Pre-Commit Checklist (Developer)

### CSS Variables & Values
- [ ] **NO hardcoded colors** - All colors use CSS variables
  ```bash
  # Quick check - should return 0 results
  grep -r "#[0-9a-fA-F]\{3,6\}" --include="*.astro" --include="*.css" src/
  ```

- [ ] **NO hardcoded sizes** - All sizes use variables or rem units
  ```bash
  # Quick check - should return minimal results
  grep -r "[0-9]\+px" --include="*.astro" --include="*.css" src/
  ```

- [ ] **NO magic numbers** - Every value has a variable or comment
  ```css
  /* ❌ BAD */
  margin: 37px;

  /* ✅ GOOD */
  margin: var(--spacing-8);
  ```

### Global Classes Usage
- [ ] **Checked for existing global classes** before creating new styles
  - Searched in `/src/styles/utilities.css`
  - Searched in `/src/styles/components.css`
  - Searched in `/docs/GUIDELINE/`

- [ ] **Used global classes** for common patterns
  - Typography: `section-label`, `section-title`, `section-description`
  - Containers: `container`, `section`
  - Spacing: Using spacing variables

- [ ] **NO duplicate styles** - Verified style doesn't exist elsewhere
  ```bash
  # Search for similar patterns
  grep -r "font-size.*1.5rem" src/
  grep -r "similar-property-value" src/
  ```

### Component Implementation
- [ ] **Scoped styles are minimal** - Only truly unique styles
- [ ] **BEM naming** for new component classes
- [ ] **Modifiers over new classes** - Used `--modifier` pattern
- [ ] **Props for variants** - Dynamic classes based on props

### Responsive Design
- [ ] **Mobile-first approach** - Base styles for mobile
- [ ] **Tested on mobile** - Chrome DevTools mobile view
- [ ] **Tested on tablet** - 768px breakpoint
- [ ] **Tested on desktop** - 1024px+ breakpoint
- [ ] **No horizontal scroll** - Checked at all breakpoints

### Cross-Page Impact
- [ ] **Tested on home page** - `/`
- [ ] **Tested on other affected pages** - List pages:
  - [ ] `/es/acceso-exclusivo`
  - [ ] `/es/trabaja-con-nosotros`
  - [ ] Other: _______________

- [ ] **Global changes apply everywhere** - Verified consistency

### Performance
- [ ] **Bundle size checked** - CSS didn't grow significantly
  ```bash
  # Check CSS size before and after
  ls -lh dist/**/*.css
  ```

- [ ] **No unnecessary imports** - Removed unused styles
- [ ] **Animations use transform/opacity** - GPU-accelerated properties

## PR Review Checklist (Reviewer)

### Architecture Compliance
- [ ] **Follows CSS architecture** - Tokens → Utilities → Components
- [ ] **Uses design system** - Not creating parallel system
- [ ] **Maintains consistency** - Fits with existing patterns

### Code Quality
- [ ] **No !important** (except utilities)
- [ ] **Max 3 levels nesting** - Flat specificity
- [ ] **Meaningful class names** - Self-documenting
- [ ] **Comments for complex styles** - Explains "why"

### Documentation
- [ ] **New patterns documented** - Added to appropriate docs
- [ ] **CHANGELOG updated** if significant change
- [ ] **Component examples** updated if needed

### Testing Evidence
- [ ] **Screenshots provided** - Before/after for visual changes
- [ ] **Mobile screenshots** - Responsive behavior shown
- [ ] **Multiple pages tested** - Not just the working page

## Quick Validation Scripts

### 1. Find CSS Issues
```bash
#!/bin/bash
# save as check-css.sh

echo "🔍 Checking for CSS issues..."

echo "\n❌ Hardcoded colors:"
grep -r "#[0-9a-fA-F]\{3,6\}" --include="*.astro" --include="*.css" src/ || echo "✅ None found"

echo "\n❌ Pixel values:"
grep -r "[0-9]\+px" --include="*.astro" --include="*.css" src/ | head -10

echo "\n❌ Important declarations:"
grep -r "!important" --include="*.css" src/ || echo "✅ None found"

echo "\n📊 CSS Stats:"
find dist -name "*.css" -exec wc -l {} \; | sort -n
```

### 2. Visual Regression Check
```bash
# Before changes
npm run build
mv dist dist-before

# After changes
npm run build
mv dist dist-after

# Compare
diff -r dist-before dist-after > css-changes.diff
```

### 3. Global Class Usage
```javascript
// check-global-usage.js
const fs = require('fs');
const path = require('path');

const globalClasses = [
  'section-label',
  'section-title',
  'section-description',
  'container',
  'section'
];

// Check if components use global classes
function checkGlobalUsage(dir) {
  // Implementation
}
```

## Common Rejection Reasons

### 1. Hardcoded Values
```css
/* ❌ REJECTED */
.component {
  color: #BA2515;
  margin: 24px;
}

/* ✅ APPROVED */
.component {
  color: var(--color-primary);
  margin: var(--spacing-5);
}
```

### 2. Duplicate Styles
```css
/* ❌ REJECTED - Already exists as .section-title */
.my-title {
  font-size: 2rem;
  font-weight: 300;
}

/* ✅ APPROVED - Uses existing class */
<h2 class="section-title">
```

### 3. Over-Specific Selectors
```css
/* ❌ REJECTED - Too specific */
.page .section .container .header .title {
  color: red;
}

/* ✅ APPROVED - Flat structure */
.page-title {
  color: var(--color-primary);
}
```

### 4. Missing Mobile Styles
```css
/* ❌ REJECTED - Desktop only */
.component {
  width: 800px;
}

/* ✅ APPROVED - Responsive */
.component {
  width: 100%;
}

@media (min-width: 768px) {
  .component {
    width: 800px;
  }
}
```

## Emergency Hotfix Protocol

If you MUST push a CSS fix immediately:

1. **Document the debt**:
   ```css
   /* HOTFIX: [Ticket] - [Date] - [Your Name]
    * TECHNICAL DEBT: This needs refactoring
    * Reason: [Emergency reason]
    * TODO: Refactor to use global classes
    */
   ```

2. **Create follow-up ticket** immediately

3. **Add to technical debt log**

4. **Schedule refactoring** within 1 sprint

## Automation Setup

### Git Pre-Commit Hook
```bash
#!/bin/sh
# .git/hooks/pre-commit

echo "Running CSS checks..."

# Check for hardcoded colors
if grep -r "#[0-9a-fA-F]\{3,6\}" --include="*.astro" --include="*.css" src/; then
  echo "❌ Error: Hardcoded colors found!"
  echo "Use CSS variables instead."
  exit 1
fi

# Check for px values
if grep -r "[0-9]\+px" --include="*.astro" --include="*.css" src/ | grep -v "design-tokens"; then
  echo "⚠️ Warning: Pixel values found. Consider using rem or variables."
fi

echo "✅ CSS checks passed"
```

### VS Code Settings
```json
{
  "css.lint.hexColorLength": "error",
  "css.lint.importStatement": "warning",
  "css.lint.important": "warning",
  "css.lint.universalSelector": "warning",
  "stylelint.enable": true
}
```

## Final Verification

Before merging ANY PR with CSS changes:

### The 5-Point Check
1. ✅ **Variables** - No hardcoded values
2. ✅ **Global** - Uses existing classes
3. ✅ **Responsive** - Works on all devices
4. ✅ **Consistent** - Matches design system
5. ✅ **Documented** - Changes are noted

**If any check fails → PR is blocked until fixed**

---

**Remember**: This checklist exists because of real incidents. Each item prevents a specific problem we've encountered. Take the 5 minutes to check—it saves hours of debugging later.