# WDA-538: Mobile Dropdown Design Specification

**Component**: CategoryFilter Mobile Dropdown
**Date**: 2025-11-09
**Designer**: Mobile-First UI/UX Specialist
**Status**: Ready for Implementation

---

## Design Overview

### Purpose
Optimize blog category filtering for mobile users by replacing the horizontal carousel with a space-efficient dropdown, reducing vertical space consumption by 50%.

### Design Principles
- **Mobile-First**: Designed for thumb-zone accessibility
- **Minimalist**: Clean, distraction-free interface
- **Touch-Optimized**: 44px minimum touch targets
- **Accessible**: WCAG 2.1 AA compliant
- **Cohesive**: Matches SAUWA brand identity

---

## Visual Specifications

### 1. Dropdown Trigger (Closed State)

```
┌────────────────────────────────────────┐
│  Todas las categorías              ▼  │  ← Full width button
└────────────────────────────────────────┘
  ↑                                   ↑
  20px padding                    Icon

Dimensions:
- Width: 100% (minus container padding 20px each side)
- Height: 44px minimum (touch target)
- Padding: 12px (--spacing-3) vertical, 16px (--spacing-4) horizontal
- Border: 2px solid #e5e5e5
- Border Radius: 4px (--radius-sm)
- Background: #ffffff (--color-bg-white)

Typography:
- Font: 'Avenir Next' (--font-family-secondary)
- Size: 16-18px (--font-scale-sm)
- Weight: 400 (--font-weight-regular)
- Color: #1a1a1a (--color-text-primary)

Icon:
- Chevron down 16x16px
- Color: currentColor
- Rotates 180° on open
- Transition: 300ms ease-out
```

### 2. Dropdown Trigger (Hover State)

```
┌────────────────────────────────────────┐
│  Todas las categorías              ▼  │  ← Orange border + text
└────────────────────────────────────────┘

Changes:
- Border: 2px solid #DB4529 (--color-primary-hover)
- Text Color: #DB4529
- Transition: 300ms ease-out
```

### 3. Dropdown Trigger (Open State)

```
┌────────────────────────────────────────┐
│  Bienestar                         ▲  │  ← Category name, icon rotated
└────────────────────────────────────────┘  ← No bottom border radius
┌────────────────────────────────────────┐
│  Todas las categorías                  │
├────────────────────────────────────────┤
│  Bienestar                          (5)│  ← Active (orange bg)
├────────────────────────────────────────┤
│  Salud                              (3)│
├────────────────────────────────────────┤
│  Relajación                         (7)│
└────────────────────────────────────────┘

Changes:
- Border Color: #DB4529
- Bottom Border Radius: 0
- Icon: Rotated 180° (chevron up)
- Menu: Visible below
```

### 4. Dropdown Menu (Open)

```
Position: Absolute, below trigger
┌────────────────────────────────────────┐
│  Todas las categorías                  │ ← Option 1 (default)
├────────────────────────────────────────┤
│  Bienestar                          (5)│ ← Option 2 (active - orange)
├────────────────────────────────────────┤
│  Salud                              (3)│ ← Option 3
├────────────────────────────────────────┤
│  Relajación                         (7)│ ← Option 4
├────────────────────────────────────────┤
│  Mindfulness                        (2)│ ← Option 5
└────────────────────────────────────────┘

Menu Container:
- Position: absolute
- Top: 100% of trigger
- Left/Right: Align with trigger (20px from screen edge)
- Max-height: 400px
- Overflow-y: auto (if needed)
- Background: #ffffff
- Border: 2px solid #DB4529 (only sides and bottom)
- Border-radius: 0 0 4px 4px (bottom corners only)
- Box-shadow: 0 6px 16px rgba(0,0,0,0.12) (--shadow-md)
- Z-index: 10 (--z-dropdown)

Transitions:
- Max-height: 0 → 400px (300ms ease-out)
- Opacity: 0 → 1 (300ms ease-out)
- Visibility: hidden → visible
```

### 5. Dropdown Options (Default State)

```
Single Option:
┌────────────────────────────────────────┐
│  Salud                              (3)│  ← 44px min height
└────────────────────────────────────────┘

Dimensions:
- Width: 100%
- Height: 44px minimum
- Padding: 12px 16px
- Border-bottom: 1px solid #f0f0f0 (except last)

Typography:
- Font: 'Avenir Next'
- Size: 16-18px (--font-scale-sm)
- Weight: 400 (--font-weight-regular)
- Color: #1a1a1a (--color-text-primary)

Count Badge:
- Font-size: 15-17px (--font-scale-xs)
- Opacity: 0.7
- Color: inherit
- Format: (N)
```

### 6. Dropdown Options (Hover State)

```
┌────────────────────────────────────────┐
│  Salud                              (3)│  ← Light orange tint
└────────────────────────────────────────┘

Changes:
- Background: rgba(219, 69, 41, 0.05)
- Text Color: #DB4529 (--color-primary-hover)
- Transition: 150ms ease-out (--transition-fast)
```

### 7. Dropdown Options (Active State)

```
┌────────────────────────────────────────┐
│  Bienestar                          (5)│  ← Full orange bg
└────────────────────────────────────────┘

Changes:
- Background: #DB4529 (--color-primary-hover)
- Text Color: #ffffff (--color-bg-white)
- Font-weight: 500 (--font-weight-medium)
- Count opacity: 0.9
```

### 8. Dropdown Options (Focus State)

```
┌────────────────────────────────────────┐
│  ║ Salud                            (3)║│  ← Visible outline
└────────────────────────────────────────┘

Changes:
- Outline: 2px solid #BA2515 (--color-primary)
- Outline-offset: -2px (inside)
- Background: rgba(219, 69, 41, 0.05)
- Z-index: 1 (above siblings)
```

---

## Interaction States

### State Machine

```
CLOSED → Click Trigger → OPENING → OPEN
  ↑                                  ↓
  └──────── Select Option ←─────────┘
  └──────── Outside Click ←─────────┘
  └──────── Escape Key ←────────────┘

OPEN → Click Option → SELECTING → CLOSED (with new selection)
     → Click Trigger → CLOSING → CLOSED
     → Click Outside → CLOSING → CLOSED
     → Press Escape → CLOSING → CLOSED
```

### Transition Timings

```
Opening:
- Duration: 300ms
- Easing: ease-out
- Properties: max-height, opacity, visibility

Closing:
- Duration: 300ms
- Easing: ease-out
- Properties: max-height, opacity, visibility

Hover/Focus:
- Duration: 150ms
- Easing: ease-out
- Properties: background, color

Icon Rotation:
- Duration: 300ms
- Easing: ease-out
- Transform: rotate(0deg) → rotate(180deg)
```

---

## Responsive Behavior

### Mobile Breakpoint (< 768px)

```
Screen Width: 320px - 767px
Container Padding: 20px each side

┌─────────────────────────────────────────────┐
│  [20px]                            [20px]   │
│         ┌───────────────────────┐           │
│         │  Dropdown Trigger     │           │
│         └───────────────────────┘           │
│                                             │
│  Dropdown takes full available width       │
└─────────────────────────────────────────────┘

Spacing:
- Margin-bottom: 1.5rem (reduced from 3rem - 50% less)
- ::after pseudo: 0.5rem (reduced from 1rem)
- Total vertical space saved: ~2rem (50% reduction)
```

### Ultra-Small Screens (< 360px)

```
Adjustments:
- Font-size: --font-scale-xs (15-17px)
- Padding: --spacing-2 --spacing-3 (8px 12px)
- Still maintains 44px min-height
- Count badge: smaller but readable
```

### Desktop Breakpoint (>= 768px)

```
Show: Horizontal carousel (existing)
Hide: Dropdown (display: none)

No changes to desktop experience
```

---

## Color Palette

### Primary Colors (From SAUWA Design System)

```
Orange (Primary Hover): #DB4529
├─ Used for: Active states, hover effects, borders
└─ WCAG AA compliant on white background

Red (Primary): #BA2515
├─ Used for: Focus outlines
└─ WCAG AA compliant

Text Primary: #1a1a1a
├─ Used for: Default text
└─ Contrast ratio: 14.5:1 on white

Text Secondary: #636464
├─ Used for: Secondary text
└─ Contrast ratio: 5.7:1 on white

White: #ffffff
├─ Used for: Backgrounds, active text
└─ Base color
```

### Interactive States

```
Default:
- Text: #1a1a1a on #ffffff
- Border: #e5e5e5

Hover:
- Text: #DB4529 on rgba(219,69,41,0.05)
- Border: #DB4529

Active:
- Text: #ffffff on #DB4529
- Border: #DB4529

Focus:
- Outline: #BA2515 2px
- Background: rgba(219,69,41,0.05)
```

---

## Accessibility Features

### Touch Targets

```
✅ All targets ≥ 44x44px
✅ Adequate spacing between options
✅ No overlapping touch areas
✅ Thumb-zone optimized (bottom 2/3 of screen)
```

### Keyboard Navigation

```
Tab → Focus trigger
Enter/Space → Open dropdown
ArrowDown → Focus next option
ArrowUp → Focus previous option
Home → Focus first option
End → Focus last option
Escape → Close dropdown, focus trigger
Enter/Space → Select focused option
```

### Screen Reader

```
Trigger:
- role="button"
- aria-haspopup="listbox"
- aria-expanded="false|true"
- aria-label="Seleccionar categoría"

Menu:
- role="listbox"
- aria-label="Categorías disponibles"

Options:
- role="option" (on li element)
- aria-selected="true|false"

Icon:
- aria-hidden="true" (decorative)
```

### Focus Management

```
Open Dropdown:
1. Click trigger
2. Menu opens
3. Focus moves to first option
4. Visual focus outline visible

Navigate:
1. ArrowDown/Up moves focus
2. Only one option focused at a time
3. Focus loops (end → start, start → end)

Close:
1. Escape pressed
2. Menu closes
3. Focus returns to trigger
```

---

## Animation Details

### Opening Animation

```css
@keyframes dropdownOpen {
  from {
    max-height: 0;
    opacity: 0;
    visibility: hidden;
  }
  to {
    max-height: 400px;
    opacity: 1;
    visibility: visible;
  }
}

Duration: 300ms
Easing: cubic-bezier(0, 0, 0.2, 1) (ease-out)
```

### Closing Animation

```css
@keyframes dropdownClose {
  from {
    max-height: 400px;
    opacity: 1;
    visibility: visible;
  }
  to {
    max-height: 0;
    opacity: 0;
    visibility: hidden;
  }
}

Duration: 300ms
Easing: cubic-bezier(0, 0, 0.2, 1)
```

### Icon Rotation

```css
.dropdown-trigger__icon {
  transform: rotate(0deg);
  transition: transform 300ms ease-out;
}

.dropdown-trigger.open .dropdown-trigger__icon {
  transform: rotate(180deg);
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable all animations */
  .dropdown-trigger,
  .dropdown-menu,
  .dropdown-option,
  .dropdown-trigger__icon {
    transition: none;
    animation: none;
  }
}
```

---

## Content Guidelines

### Trigger Text Rules

```
Default: "Todas las categorías"
Selected: Category name (no count)

Examples:
✅ "Todas las categorías"
✅ "Bienestar"
✅ "Salud Mental"
❌ "Bienestar (5)" ← Count not shown in trigger
❌ "Ver todas" ← Not descriptive enough
```

### Option Text Rules

```
Format: "Category Name" + optional "(Count)"

Examples:
✅ "Todas las categorías"
✅ "Bienestar (5)"
✅ "Salud (3)"
✅ "Salud Mental y Bienestar (12)"
❌ "Bienestar - 5 posts" ← Wrong format
❌ "Ver Bienestar" ← Unnecessary verb
```

### Max Text Length

```
Trigger: Single line, ellipsis if needed
Options: Single line, wraps if necessary (avoid)

Recommendations:
- Category names: 2-4 words ideal
- Max 30 characters to avoid wrapping
- Test at 320px viewport
```

---

## Technical Implementation Notes

### CSS Variables Used

```css
/* From design-tokens.css */
--color-primary-hover: #DB4529
--color-primary: #BA2515
--color-text-primary: #1a1a1a
--color-bg-white: #ffffff
--font-family-secondary: 'Avenir Next'
--font-scale-sm: clamp(1rem, 1vw + 0.9rem, 1.125rem)
--font-scale-xs: clamp(0.9375rem, 0.9vw + 0.85rem, 1.0625rem)
--font-weight-regular: 400
--font-weight-medium: 500
--spacing-2: 0.5rem (8px)
--spacing-3: 0.75rem (12px)
--spacing-4: 1rem (16px)
--radius-sm: 4px
--border-width-base: 2px
--transition-base: 300ms ease-out
--transition-fast: 150ms ease-out
--shadow-md: 0 6px 16px rgba(0,0,0,0.12)
--z-dropdown: 10
--container-padding-mobile: 1.25rem (20px)
```

### No Hardcoded Values

```css
/* ✅ GOOD: Uses design tokens */
.dropdown-trigger {
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-sm);
  color: var(--color-text-primary);
}

/* ❌ BAD: Hardcoded values */
.dropdown-trigger {
  padding: 12px 16px;
  border-radius: 4px;
  color: #1a1a1a;
}
```

---

## Performance Considerations

### Critical Metrics

```
Render Time: < 50ms
First Paint: < 100ms
Animation FPS: 60fps
Layout Shift: 0 (CLS)
Memory: < 2MB
```

### Optimizations

```
1. GPU Acceleration:
   - Use transform instead of position
   - Use opacity instead of visibility alone
   - Enable will-change on animated elements

2. Lazy Rendering:
   - Menu DOM exists but hidden (display: none on desktop)
   - No unnecessary re-renders
   - Event delegation where possible

3. Efficient Animations:
   - CSS transitions (not JS)
   - Composite properties only (transform, opacity)
   - No layout thrashing

4. Event Handling:
   - Debounce outside click (if needed)
   - Remove listeners on cleanup
   - Passive event listeners where applicable
```

---

## Browser Support

### Minimum Supported Versions

```
Chrome: 90+ (2021)
Safari: 14+ (iOS 14+)
Firefox: 88+ (2021)
Edge: 90+ (2021)
```

### Fallbacks

```
CSS Custom Properties: Required (no fallback needed for modern browsers)
CSS Grid/Flexbox: Required
Touch Events: Required for mobile
Pointer Events: Nice to have, fallback to mouse events
```

---

## Testing Scenarios

### Visual Regression

```
1. Screenshot at 320px width
2. Screenshot at 375px width
3. Screenshot at 767px width
4. Compare trigger closed state
5. Compare menu open state
6. Compare active option state
7. Compare hover state
```

### Functional Tests

```
1. Click trigger opens/closes
2. Select option updates trigger text
3. Select option dispatches filter event
4. Outside click closes menu
5. Escape key closes menu
6. Keyboard navigation works
7. Focus management correct
8. Screen reader announces states
```

### Performance Tests

```
1. Measure render time
2. Check animation smoothness (60fps)
3. Verify no layout shifts
4. Memory leak test (open/close 100x)
5. Touch response time (< 100ms)
```

---

## Design Checklist

**Before marking WDA-538 as complete:**

- [ ] Visual design matches specification
- [ ] All touch targets ≥ 44px
- [ ] Color contrast WCAG AA compliant
- [ ] Animations smooth (60fps)
- [ ] Keyboard navigation complete
- [ ] Screen reader compatible
- [ ] Desktop carousel unchanged
- [ ] Mobile dropdown functional
- [ ] Transitions 300ms ease-out
- [ ] CSS variables used (no hardcoded)
- [ ] Responsive tested (320px - 767px)
- [ ] Cross-browser tested
- [ ] Performance metrics met
- [ ] Accessibility audit passed
- [ ] Code reviewed
- [ ] Documentation complete

---

**Design Version**: 1.0
**Last Updated**: 2025-11-09
**Status**: Implemented
**File**: `CategoryFilter.astro`
