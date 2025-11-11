# Spacing

**Component:** Foundation
**Version:** 1.0.0
**Last Updated:** October 20, 2025

---

## 📏 Spacing Scale

### Base Unit: 8px

Our spacing system is based on an 8px grid for consistency and harmony across all components.

| Token | Name | rem | px | Usage |
|-------|------|-----|-----|-------|
| `space-0` | None | 0 | 0 | Reset/Remove spacing |
| `space-0.5` | 3XS | 0.125rem | 2px | Micro adjustments |
| `space-1` | 2XS | 0.25rem | 4px | Tight spacing |
| `space-2` | XS | 0.5rem | 8px | Compact elements |
| `space-3` | SM | 0.75rem | 12px | Related elements |
| `space-4` | MD | 1rem | 16px | Default spacing |
| `space-5` | LG | 1.25rem | 20px | Breathing room |
| `space-6` | XL | 1.5rem | 24px | Section spacing |
| `space-8` | 2XL | 2rem | 32px | Group separation |
| `space-10` | 3XL | 2.5rem | 40px | Major sections |
| `space-12` | 4XL | 3rem | 48px | Hero spacing |
| `space-16` | 5XL | 4rem | 64px | Page sections |
| `space-20` | 6XL | 5rem | 80px | Large sections |
| `space-24` | 7XL | 6rem | 96px | Maximum spacing |

---

## 🎯 Component Spacing

### Buttons

```css
/* Primary Button */
.btn-primary {
  padding: 1rem 2rem;      /* 16px 32px */
  margin: 0;
}

/* Secondary Button */
.btn-secondary {
  padding: 0.75rem 1.5rem;  /* 12px 24px */
  margin: 0;
}

/* Button Group */
.button-group {
  gap: 1rem;                /* 16px between buttons */
}
```

### Cards

```css
.card {
  padding: 2.5rem 2rem;     /* 40px 32px */
  margin-bottom: 1.5rem;    /* 24px */
}

.card-header {
  margin-bottom: 1rem;      /* 16px */
}

.card-content {
  margin-bottom: 1.5rem;    /* 24px */
}

.card-footer {
  margin-top: 1.5rem;       /* 24px */
}
```

### Forms

```css
.form-group {
  margin-bottom: 1.5rem;    /* 24px */
}

.form-label {
  margin-bottom: 0.5rem;    /* 8px */
}

.form-input {
  padding: 0.875rem 1.25rem; /* 14px 20px */
}

.form-help-text {
  margin-top: 0.5rem;       /* 8px */
}
```

---

## 📐 Layout Spacing

### Section Padding

```css
/* Desktop */
.section {
  padding: 5rem 0;          /* 80px 0 */
}

.section-compact {
  padding: 3rem 0;          /* 48px 0 */
}

.section-large {
  padding: 6rem 0;          /* 96px 0 */
}

/* Mobile */
@media (max-width: 768px) {
  .section {
    padding: 3rem 0;        /* 48px 0 */
  }

  .section-compact {
    padding: 2rem 0;        /* 32px 0 */
  }

  .section-large {
    padding: 4rem 0;        /* 64px 0 */
  }
}
```

### Container Padding

```css
.container {
  padding-left: 2rem;       /* 32px */
  padding-right: 2rem;      /* 32px */
}

@media (max-width: 1024px) {
  .container {
    padding-left: 1.5rem;   /* 24px */
    padding-right: 1.5rem;  /* 24px */
  }
}

@media (max-width: 768px) {
  .container {
    padding-left: 1rem;     /* 16px */
    padding-right: 1rem;    /* 16px */
  }
}
```

### Grid Gaps

```css
/* Desktop Grid */
.grid {
  gap: 2rem;                /* 32px */
}

.grid-compact {
  gap: 1.5rem;              /* 24px */
}

.grid-comfortable {
  gap: 3rem;                /* 48px */
}

/* Mobile Grid */
@media (max-width: 768px) {
  .grid {
    gap: 1.5rem;            /* 24px */
  }

  .grid-compact {
    gap: 1rem;              /* 16px */
  }

  .grid-comfortable {
    gap: 2rem;              /* 32px */
  }
}
```

---

## 🎨 Visual Rhythm

### Typography Spacing

```css
/* Heading Margins */
h1 { margin: 0 0 2rem; }      /* 32px bottom */
h2 { margin: 0 0 1.5rem; }     /* 24px bottom */
h3 { margin: 0 0 1.5rem; }     /* 24px bottom */
h4 { margin: 0 0 1rem; }       /* 16px bottom */
h5 { margin: 0 0 0.75rem; }    /* 12px bottom */
h6 { margin: 0 0 0.5rem; }     /* 8px bottom */

/* Paragraph Spacing */
p { margin: 0 0 1.5rem; }      /* 24px bottom */
p:last-child { margin: 0; }

/* List Spacing */
ul, ol {
  margin: 0 0 1.5rem;          /* 24px bottom */
  padding-left: 1.5rem;        /* 24px left */
}

li {
  margin-bottom: 0.5rem;       /* 8px */
}
```

### Component Spacing Patterns

```css
/* Hero Section */
.hero-content {
  padding: 4rem 2rem 5rem;     /* 64px 32px 80px */
}

.hero-title {
  margin-bottom: 1rem;         /* 16px */
}

.hero-subtitle {
  margin-bottom: 2rem;         /* 32px */
}

.hero-cta {
  margin-top: 2rem;            /* 32px */
}

/* Benefits List */
.benefit-item {
  display: flex;
  gap: 1.25rem;                /* 20px */
  margin-bottom: 2rem;         /* 32px */
}

.benefit-icon {
  width: 3rem;                 /* 48px */
  height: 3rem;                /* 48px */
}

.benefit-title {
  margin-bottom: 0.5rem;       /* 8px */
}
```

---

## 💻 Tailwind Utilities

### Padding Classes

```html
<!-- All sides -->
<div class="p-0">   <!-- 0 -->
<div class="p-2">   <!-- 8px -->
<div class="p-4">   <!-- 16px -->
<div class="p-6">   <!-- 24px -->
<div class="p-8">   <!-- 32px -->

<!-- Specific sides -->
<div class="pt-4">  <!-- padding-top: 16px -->
<div class="pr-6">  <!-- padding-right: 24px -->
<div class="pb-8">  <!-- padding-bottom: 32px -->
<div class="pl-4">  <!-- padding-left: 16px -->

<!-- Horizontal/Vertical -->
<div class="px-6">  <!-- padding-left & right: 24px -->
<div class="py-8">  <!-- padding-top & bottom: 32px -->
```

### Margin Classes

```html
<!-- All sides -->
<div class="m-0">   <!-- 0 -->
<div class="m-4">   <!-- 16px -->
<div class="m-auto"> <!-- auto -->

<!-- Specific sides -->
<div class="mt-4">  <!-- margin-top: 16px -->
<div class="mb-6">  <!-- margin-bottom: 24px -->
<div class="-mt-2"> <!-- margin-top: -8px (negative) -->

<!-- Horizontal/Vertical -->
<div class="mx-auto"> <!-- margin-left & right: auto -->
<div class="my-8">    <!-- margin-top & bottom: 32px -->
```

### Gap Classes (Flexbox/Grid)

```html
<div class="flex gap-4">      <!-- 16px gap -->
<div class="grid gap-6">      <!-- 24px gap -->
<div class="flex gap-x-4">    <!-- 16px horizontal gap -->
<div class="grid gap-y-8">    <!-- 32px vertical gap -->
```

---

## 📱 Responsive Spacing

### Mobile-First Approach

```html
<!-- Responsive padding -->
<div class="p-4 md:p-6 lg:p-8">
  <!-- Mobile: 16px, Tablet: 24px, Desktop: 32px -->
</div>

<!-- Responsive margins -->
<h2 class="mb-4 md:mb-6 lg:mb-8">
  <!-- Mobile: 16px, Tablet: 24px, Desktop: 32px -->
</h2>

<!-- Responsive gaps -->
<div class="grid gap-4 md:gap-6 lg:gap-8">
  <!-- Mobile: 16px, Tablet: 24px, Desktop: 32px -->
</div>
```

### Breakpoint-Specific Patterns

```css
/* Mobile (< 768px) */
@media (max-width: 767px) {
  .section { padding: 3rem 1rem; }
  .container { padding: 0 1rem; }
  .grid { gap: 1.5rem; }
}

/* Tablet (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .section { padding: 4rem 1.5rem; }
  .container { padding: 0 1.5rem; }
  .grid { gap: 2rem; }
}

/* Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  .section { padding: 5rem 2rem; }
  .container { padding: 0 2rem; }
  .grid { gap: 2rem; }
}

/* Large Desktop (≥ 1440px) */
@media (min-width: 1440px) {
  .section { padding: 6rem 3rem; }
  .container { max-width: 1280px; }
}
```

---

## 🚫 Don'ts

❌ **Don't use arbitrary spacing values**
- Stick to the 8px grid system

❌ **Don't mix spacing units**
- Use rem for consistency, px only for borders

❌ **Don't forget vertical rhythm**
- Maintain consistent spacing between sections

❌ **Don't use excessive spacing on mobile**
- Screen real estate is precious

❌ **Don't ignore touch targets**
- Minimum 44px × 44px for interactive elements

---

## ✅ Do's

✅ **Use consistent spacing tokens**
- Follow the defined scale

✅ **Maintain visual hierarchy**
- More space = more separation

✅ **Consider whitespace as design element**
- Let content breathe

✅ **Test responsive spacing**
- Check all breakpoints

✅ **Use negative space purposefully**
- Create focus and emphasis

---

## 📚 Related Documentation

- [Grid](grid.md) - Layout grid system
- [Typography](typography.md) - Text spacing
- [Components](../02-COMPONENTS/) - Component-specific spacing

---

## 🛠 Tools

- [8-Point Grid Calculator](https://spec.fm/specifics/8-pt-grid)
- [Spacing Design System](https://spacing.design/)
- [Tailwind Spacing Reference](https://tailwindcss.com/docs/padding)