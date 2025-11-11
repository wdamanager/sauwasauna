# Sticky Scroll Pattern Documentation

## TL;DR

The sticky scroll pattern in SAUWA uses CSS `position: sticky` for a 2-column layout with left column fixed during scroll. **Critical**: `overflow-x: hidden` on any parent element BREAKS sticky positioning. This bug occurred on 2025-01-09 when global overflow was added, fixed by restricting overflow to mobile only (<768px).

**Quick Fix Checklist:**
1. Check for `overflow: hidden` on html/body/section
2. Verify parent containers have defined height
3. Ensure sticky element has `top` value set
4. Test on desktop (>768px) where overflow must NOT be hidden

## Architecture

### Pattern Overview

```
┌─────────────────────────────────────────────────┐
│                   DESKTOP VIEW                   │
├─────────────────┬───────────────────────────────┤
│                 │                               │
│  LEFT COLUMN    │     RIGHT COLUMN              │
│  (Sticky)       │     (Scrollable)              │
│                 │                               │
│  Benefits List  │     Blog Cards                │
│  Stays Fixed    │     ┌──────────┐              │
│                 │     │  Card 1  │              │
│                 │     └──────────┘              │
│                 │          ↓                    │
│                 │     ┌──────────┐              │
│                 │     │  Card 2  │              │
│                 │     └──────────┘              │
│                 │          ↓                    │
│                 │     ┌──────────┐              │
│                 │     │  Card 3  │              │
│                 │     └──────────┘              │
├─────────────────┴───────────────────────────────┤
│                   MOBILE VIEW                    │
│              (Stack Vertical)                    │
└─────────────────────────────────────────────────┘
```

### Where Used in SAUWA

- **Section**: "GUÍA SAUWA SAUNA" on landing page
- **Component**: `src/components/BenefitsBlogSection.astro`
- **ID**: `#beneficios-blog`
- **Purpose**: Display benefits with sticky sidebar while scrolling through blog articles

### Why It's Important

1. **User Experience**: Keeps key benefits visible while exploring content
2. **Visual Hierarchy**: Maintains context during long scroll
3. **Engagement**: Encourages exploration without losing orientation
4. **Modern Design**: Follows contemporary web patterns (inspired by DATA Arquitectura)

## How `position: sticky` Works

### Technical Explanation

`position: sticky` is a hybrid positioning that switches between `relative` and `fixed`:

```css
.sticky-element {
  position: sticky;
  top: 0; /* Required: sticking point */
}
```

**Behavior:**
1. Element starts as `position: relative`
2. When scroll reaches threshold (`top: 0`), becomes `position: fixed`
3. Stays fixed until parent container ends
4. Returns to relative positioning

### Requirements for Sticky to Work

✅ **MUST HAVE:**
1. `position: sticky` on element
2. `top`, `bottom`, `left`, or `right` value
3. Parent container with defined height
4. NO `overflow: hidden` on ANY parent

❌ **MUST NOT HAVE:**
1. `overflow: hidden` on parents (CRITICAL)
2. `height: 100%` without parent height
3. `display: flex` with wrong alignment
4. Z-index conflicts with overlapping elements

### Known Limitations

- Not supported in IE11 (use polyfill if needed)
- Table elements need specific wrappers
- Performance impact with many sticky elements
- Mobile Safari has viewport issues

## Implementation in SAUWA

### HTML Structure

```html
<!-- BenefitsBlogSection.astro -->
<section class="benefits-blog-section" id="beneficios-blog">
  <div class="sticky-grid">
    <!-- Left Column: Sticky -->
    <div class="sticky-column">
      <div class="sticky-content">
        <BenefitsList />
      </div>
    </div>

    <!-- Right Column: Scrollable -->
    <div class="scroll-column">
      <BlogScrollCards />
    </div>
  </div>
</section>
```

### CSS Implementation

```css
/* Grid container */
.sticky-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh; /* Important: Define height */
}

/* Sticky column setup */
.sticky-column {
  position: relative;
  background-color: #f4f4f4;
  /* NO overflow: hidden here! */
}

/* The sticky element */
.sticky-content {
  position: sticky;    /* Magic property */
  top: 0;             /* Sticking point */
  height: 100vh;      /* Full viewport */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;  /* MUST be visible */
}

/* Scrollable column */
.scroll-column {
  position: relative;
  background-color: #f4f4f4;
  /* Content height creates scroll */
}

/* Mobile: Disable sticky */
@media (max-width: 1024px) {
  .sticky-grid {
    grid-template-columns: 1fr; /* Stack */
  }

  .sticky-content {
    position: relative; /* Not sticky */
    height: auto;
  }
}
```

### Complete Annotated Example

```css
/* ✅ CORRECT: Working sticky implementation */
.benefits-blog-section {
  position: relative;
  background-color: #FFFFFF;
  /* NO overflow: hidden! */
}

.sticky-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh; /* Parent needs height */
}

.sticky-content {
  position: sticky;   /* 1. Enable sticky */
  top: 0;            /* 2. Set threshold */
  height: 100vh;     /* 3. Define height */
  overflow: visible; /* 4. Keep visible */
}

/* ❌ WRONG: This breaks sticky */
.broken-example {
  overflow: hidden;     /* BREAKS sticky */
  overflow-x: hidden;   /* BREAKS sticky */
  overflow-y: hidden;   /* BREAKS sticky */
}
```

## ⚠️ WHAT BREAKS STICKY (CRITICAL SECTION)

### 1. `overflow: hidden` on Parents (MAIN CULPRIT)

❌ **This BREAKS sticky:**
```css
/* ANY of these on html, body, or parent sections */
html { overflow-x: hidden; } /* BREAKS */
body { overflow: hidden; }   /* BREAKS */
section { overflow-x: hidden; } /* BREAKS */
```

✅ **Solution:**
```css
/* Desktop: Allow overflow for sticky */
@media (min-width: 768px) {
  html, body, section {
    overflow: visible; /* or just don't set */
  }
}

/* Mobile only: Can hide overflow */
@media (max-width: 767px) {
  html, body {
    overflow-x: hidden; /* OK on mobile */
  }
}
```

### 2. Missing Height Definition

❌ **This BREAKS sticky:**
```css
.parent {
  /* No height defined */
}
.sticky-element {
  position: sticky;
  top: 0;
  height: 100%; /* 100% of what? */
}
```

✅ **Solution:**
```css
.parent {
  min-height: 100vh; /* Define height */
}
.sticky-element {
  position: sticky;
  top: 0;
  height: 100vh; /* Now has reference */
}
```

### 3. Z-index Conflicts

❌ **This causes overlap issues:**
```css
.sticky-element {
  position: sticky;
  /* No z-index */
}
.other-element {
  position: relative;
  z-index: 10; /* Overlaps sticky */
}
```

✅ **Solution:**
```css
.sticky-element {
  position: sticky;
  z-index: 100; /* Higher than others */
}
```

### 4. Display Flex Issues

❌ **This can break sticky:**
```css
.flex-parent {
  display: flex;
  align-items: stretch; /* Can break */
}
```

✅ **Solution:**
```css
.flex-parent {
  display: flex;
  align-items: flex-start; /* Better for sticky */
}
```

## How to Fix When Broken

### Debugging Checklist (Step by Step)

1. **Inspect Overflow** (Most Common Issue)
```javascript
// Run in console to find overflow culprits
const elements = document.querySelectorAll('*');
elements.forEach(el => {
  const style = getComputedStyle(el);
  if (style.overflow === 'hidden' ||
      style.overflowX === 'hidden' ||
      style.overflowY === 'hidden') {
    console.log('Overflow hidden on:', el, style.overflow);
  }
});
```

2. **Check Parent Heights**
```javascript
// Verify parent containers have height
const sticky = document.querySelector('.sticky-content');
let parent = sticky.parentElement;
while (parent) {
  console.log(parent.className, getComputedStyle(parent).height);
  parent = parent.parentElement;
}
```

3. **Test Sticky Support**
```javascript
// Check if sticky is supported
const testEl = document.createElement('div');
testEl.style.position = 'sticky';
const isSupported = testEl.style.position === 'sticky';
console.log('Sticky supported:', isSupported);
```

4. **Verify Top Value**
```javascript
// Check sticky element config
const sticky = document.querySelector('.sticky-content');
const styles = getComputedStyle(sticky);
console.log({
  position: styles.position,
  top: styles.top,
  height: styles.height,
  overflow: styles.overflow
});
```

### Quick Fix Process

1. **Remove all overflow: hidden**
```css
/* Temporarily add to test */
* {
  overflow: visible !important;
}
```

2. **If sticky works, find specific culprit**
```css
/* Add back selectively */
@media (max-width: 767px) {
  html, body {
    overflow-x: hidden; /* Only mobile */
  }
}
```

3. **Add height to parents**
```css
.sticky-grid {
  min-height: 100vh;
}
```

4. **Set z-index if overlapping**
```css
.sticky-content {
  z-index: 100;
}
```

## Bug History: The overflow-x Incident

### Date: 2025-01-09

### What Happened

1. **Initial State**: Sticky scroll working perfectly
2. **Change Made**: Added `overflow-x: hidden` globally in `wda531-hotfix.css`
3. **Result**: Sticky scroll completely broken on desktop
4. **Investigation**: Multiple attempts to fix via HTML/CSS structure changes
5. **Root Cause Found**: Global `overflow-x: hidden` breaking sticky
6. **Solution Applied**: Restrict `overflow-x: hidden` to mobile only

### Timeline

```
09:00 - Sticky working correctly
10:30 - Applied wda531-hotfix.css with global overflow-x: hidden
10:45 - Reports of sticky not working
11:00 - Attempted structural fixes (failed)
11:30 - Identified overflow as cause
11:45 - Fixed by mobile-only overflow
12:00 - Sticky working again
```

### Code Changes

**Before (BROKEN):**
```css
/* wda531-hotfix.css - BREAKS STICKY */
html, body {
  overflow-x: hidden; /* Applied to ALL viewports */
}
```

**After (FIXED):**
```css
/* wda531-hotfix.css - FIXED */
/* Desktop: No overflow hidden */
html, body {
  max-width: 100vw;
}

/* Mobile only: Can hide overflow */
@media (max-width: 767px) {
  html, body {
    overflow-x: hidden;
  }
}
```

### Lessons Learned

1. **Never apply overflow: hidden globally** without testing sticky elements
2. **Mobile and desktop need different overflow rules**
3. **Test sticky behavior** after any global CSS changes
4. **Document critical CSS dependencies** in components
5. **Use CSS variables** instead of global overrides when possible

### Prevention Measures

1. **Add warning comments** in sticky components:
```css
/* WARNING: This component uses position: sticky
   DO NOT add overflow: hidden to any parent element
   See: docs/architecture/sticky-scroll-pattern.md */
```

2. **Create test checklist** for CSS changes
3. **Use feature detection** for progressive enhancement
4. **Implement automated tests** for critical UI patterns

## Testing Checklist

### Functional Tests

- [ ] Sticky element stays fixed while scrolling
- [ ] Content in right column scrolls normally
- [ ] No horizontal scroll on any viewport
- [ ] Sticky releases at container end
- [ ] Mobile layout stacks correctly

### Visual Tests

- [ ] No content overlap
- [ ] Smooth scroll behavior
- [ ] Correct backgrounds/colors
- [ ] Proper spacing/padding
- [ ] Animation performance

### Cross-browser Tests

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (desktop)
- [ ] Safari (iOS)
- [ ] Samsung Internet

### Responsive Tests

- [ ] Desktop (>1024px) - sticky works
- [ ] Tablet (768px-1024px) - stacked layout
- [ ] Mobile (<768px) - stacked layout
- [ ] Test at exact breakpoints
- [ ] Orientation changes

### Performance Tests

- [ ] Lighthouse score >90
- [ ] No layout shifts
- [ ] Smooth 60fps scroll
- [ ] No memory leaks
- [ ] Fast paint times

## Expected Behavior

### Desktop (>1024px)
- Two columns side by side
- Left column stays fixed during scroll
- Right column scrolls normally
- No horizontal scroll
- Smooth transitions

### Tablet (768px-1024px)
- Single column layout
- All content scrolls normally
- No sticky behavior
- Full width content
- Proper touch scrolling

### Mobile (<768px)
- Single column layout
- Vertical stack order
- No sticky behavior
- Overflow-x hidden (prevents horizontal scroll)
- Native momentum scrolling

## References

### Official Documentation
- [MDN: position sticky](https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky)
- [CSS Working Group: Sticky Positioning](https://drafts.csswg.org/css-position-3/#sticky-pos)
- [Can I Use: CSS Sticky](https://caniuse.com/css-sticky)

### Common Issues
- [Stack Overflow: Why position sticky doesn't work](https://stackoverflow.com/questions/43539708/why-position-sticky-doesnt-work)
- [CSS Tricks: Creating Sliding Effects](https://css-tricks.com/creating-sliding-effects-using-sticky-positioning/)
- [Debugging position: sticky](https://www.designcise.com/web/tutorial/how-to-fix-issues-with-css-position-sticky-not-working)

### Browser Bugs
- [Chrome: Sticky with overflow](https://bugs.chromium.org/p/chromium/issues/detail?id=1074139)
- [Safari: Sticky in flexbox](https://bugs.webkit.org/show_bug.cgi?id=191640)
- [Firefox: Sticky table headers](https://bugzilla.mozilla.org/show_bug.cgi?id=1488810)

---

## Summary

The sticky scroll pattern is powerful but fragile. The #1 rule: **NEVER add `overflow: hidden` to parent elements on desktop**. When debugging, always check overflow first, then heights, then z-index. Keep this documentation handy for the next developer who encounters sticky issues.

**Remember**: What works on mobile (overflow hidden) BREAKS desktop sticky. Always use media queries to separate mobile and desktop overflow rules.