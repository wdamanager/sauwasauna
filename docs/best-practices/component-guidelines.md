# Astro Component Guidelines - SAUWA Project

## TL;DR

Create reusable Astro components using global CSS classes. Props for variants. Minimal scoped styles. Follow patterns shown here. Test on all breakpoints.

## Component Creation Checklist

### Before Creating a Component
- [ ] Does a similar component already exist?
- [ ] Can I compose this from existing components?
- [ ] Have I identified all variants needed?
- [ ] Do I have the design specs from GUIDELINE?

### During Development
- [ ] Using TypeScript interface for props?
- [ ] Using global CSS classes first?
- [ ] Props control class variations?
- [ ] Scoped styles only for unique patterns?
- [ ] Semantic HTML elements used?
- [ ] Accessibility attributes included?

### After Development
- [ ] Works on mobile (320px)?
- [ ] Works on tablet (768px)?
- [ ] Works on desktop (1024px+)?
- [ ] Documented with examples?
- [ ] Added to component library?

## Component Structure Pattern

### Basic Component Template
```astro
---
// SectionHeader.astro
interface Props {
  label?: string;
  title: string;
  description?: string;
  variant?: 'default' | 'primary' | 'b2b' | 'white';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const {
  label,
  title,
  description,
  variant = 'default',
  align = 'left',
  className = ''
} = Astro.props;

// Build class names using global utilities
const labelClasses = [
  'section-label',
  variant !== 'default' && `section-label--${variant}`,
  align === 'center' && 'text-center'
].filter(Boolean).join(' ');

const titleClasses = [
  'section-title',
  align === 'center' && 'section-title--center'
].filter(Boolean).join(' ');

const descClasses = [
  'section-description',
  align === 'center' && 'section-description--center section-description--max-width'
].filter(Boolean).join(' ');
---

<header class={`section-header ${className}`.trim()}>
  {label && <h2 class={labelClasses}>{label}</h2>}
  <h3 class={titleClasses}>{title}</h3>
  {description && <p class={descClasses}>{description}</p>}
</header>

<style>
  /* ONLY if absolutely necessary */
  .section-header {
    /* Use variables even in scoped styles */
    margin-bottom: var(--spacing-8);
  }
</style>
```

## Prop Design Patterns

### Variant Props
```typescript
// Use string literals for variants
interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
}

// Map to CSS classes
const variantClasses = {
  primary: 'btn--primary',
  secondary: 'btn--secondary',
  tertiary: 'btn--tertiary'
};
```

### Boolean Props
```typescript
interface Props {
  centered?: boolean;
  fullWidth?: boolean;
  sticky?: boolean;
}

// Apply conditionally
const classes = [
  'component',
  centered && 'text-center',
  fullWidth && 'w-full',
  sticky && 'sticky top-0'
].filter(Boolean).join(' ');
```

### Responsive Props
```typescript
interface Props {
  mobileColumns?: 1 | 2;
  tabletColumns?: 2 | 3 | 4;
  desktopColumns?: 3 | 4 | 6;
}

// Generate responsive classes
const gridClasses = [
  `grid-cols-${mobileColumns}`,
  `md:grid-cols-${tabletColumns}`,
  `lg:grid-cols-${desktopColumns}`
].join(' ');
```

## Common Component Patterns

### Section Component
```astro
---
// Section.astro
interface Props {
  background?: 'white' | 'light' | 'dark' | 'gradient';
  spacing?: 'default' | 'compact' | 'spacious';
  width?: 'default' | 'narrow' | 'wide' | 'full';
  id?: string;
  className?: string;
}

const {
  background = 'white',
  spacing = 'default',
  width = 'default',
  id,
  className = ''
} = Astro.props;

const sectionClasses = [
  'section',
  spacing !== 'default' && `section--${spacing}`,
  background !== 'white' && `bg-${background}`
].filter(Boolean).join(' ');

const containerClasses = [
  width !== 'full' && 'container',
  width === 'narrow' && 'container--narrow',
  width === 'wide' && 'container--wide'
].filter(Boolean).join(' ');
---

<section id={id} class={`${sectionClasses} ${className}`.trim()}>
  {width !== 'full' ? (
    <div class={containerClasses}>
      <slot />
    </div>
  ) : (
    <slot />
  )}
</section>
```

### Card Component
```astro
---
// Card.astro
interface Props {
  title: string;
  description?: string;
  image?: string;
  href?: string;
  variant?: 'default' | 'featured' | 'minimal';
  orientation?: 'vertical' | 'horizontal';
}

const {
  title,
  description,
  image,
  href,
  variant = 'default',
  orientation = 'vertical'
} = Astro.props;

const cardClasses = [
  'card',
  variant !== 'default' && `card--${variant}`,
  orientation === 'horizontal' && 'card--horizontal'
].filter(Boolean).join(' ');

const Component = href ? 'a' : 'article';
---

<Component
  class={cardClasses}
  href={href}
>
  {image && (
    <img
      src={image}
      alt={title}
      class="card__image"
      loading="lazy"
    />
  )}
  <div class="card__content">
    <h3 class="card__title">{title}</h3>
    {description && (
      <p class="card__description">{description}</p>
    )}
    <slot />
  </div>
</Component>
```

### Button Component
```astro
---
// Button.astro
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const {
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  href,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = ''
} = Astro.props;

const buttonClasses = [
  'btn',
  `btn--${variant}`,
  `btn--${size}`,
  fullWidth && 'btn--full',
  loading && 'btn--loading',
  disabled && 'btn--disabled'
].filter(Boolean).join(' ');

const Component = href ? 'a' : 'button';
---

<Component
  class={`${buttonClasses} ${className}`.trim()}
  type={!href ? type : undefined}
  href={href}
  disabled={disabled || loading}
  aria-busy={loading}
>
  {icon && iconPosition === 'left' && (
    <span class="btn__icon btn__icon--left">{icon}</span>
  )}
  <span class="btn__text">
    <slot />
  </span>
  {icon && iconPosition === 'right' && (
    <span class="btn__icon btn__icon--right">{icon}</span>
  )}
</Component>
```

## Composition Patterns

### Combining Components
```astro
---
// HeroSection.astro
import Section from './Section.astro';
import SectionHeader from './SectionHeader.astro';
import Button from './Button.astro';
---

<Section
  background="gradient"
  spacing="spacious"
  width="narrow"
>
  <SectionHeader
    label="EXPERIENCIA SAUWA"
    title="Descubre el auténtico ritual finlandés"
    description="Una experiencia de bienestar única"
    variant="primary"
    align="center"
  />

  <div class="flex justify-center gap-4 mt-8">
    <Button variant="primary" size="lg">
      Reservar Sesión
    </Button>
    <Button variant="ghost" size="lg">
      Saber Más
    </Button>
  </div>
</Section>
```

### Slot-Based Composition
```astro
---
// Layout.astro
---
<div class="layout">
  <slot name="header" />

  <main class="layout__main">
    <slot />
  </main>

  <slot name="sidebar" />
  <slot name="footer" />
</div>

<!-- Usage -->
<Layout>
  <Header slot="header" />
  <Content />
  <Sidebar slot="sidebar" />
  <Footer slot="footer" />
</Layout>
```

## Responsive Patterns

### Mobile-First Responsive
```astro
---
// ResponsiveGrid.astro
interface Props {
  columns?: {
    mobile?: 1 | 2;
    tablet?: 2 | 3 | 4;
    desktop?: 3 | 4 | 6;
  };
  gap?: 'sm' | 'md' | 'lg';
}

const {
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md'
} = Astro.props;

const gapSizes = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8'
};
---

<div class={`
  grid
  grid-cols-${columns.mobile || 1}
  md:grid-cols-${columns.tablet || 2}
  lg:grid-cols-${columns.desktop || 3}
  ${gapSizes[gap]}
`}>
  <slot />
</div>
```

### Conditional Mobile/Desktop
```astro
---
// ResponsiveNav.astro
---
<nav class="nav">
  <!-- Mobile -->
  <div class="block md:hidden">
    <button class="hamburger">☰</button>
  </div>

  <!-- Desktop -->
  <ul class="hidden md:flex nav__menu">
    <slot />
  </ul>
</nav>
```

## Accessibility Patterns

### Required Attributes
```astro
---
// AccessibleButton.astro
interface Props {
  ariaLabel?: string;
  ariaPressed?: boolean;
  ariaExpanded?: boolean;
  ariaControls?: string;
}
---

<button
  aria-label={ariaLabel}
  aria-pressed={ariaPressed}
  aria-expanded={ariaExpanded}
  aria-controls={ariaControls}
  role="button"
>
  <slot />
</button>
```

### Form Components
```astro
---
// FormField.astro
interface Props {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}

const inputId = `field-${name}`;
const errorId = `${inputId}-error`;
---

<div class="form-field">
  <label for={inputId} class="form-field__label">
    {label}
    {required && <span aria-label="required">*</span>}
  </label>

  <input
    id={inputId}
    name={name}
    type={type}
    required={required}
    aria-required={required}
    aria-invalid={!!error}
    aria-describedby={error ? errorId : undefined}
    class="form-field__input"
  />

  {error && (
    <span id={errorId} class="form-field__error" role="alert">
      {error}
    </span>
  )}
</div>
```

## Performance Patterns

### Lazy Loading
```astro
---
// LazyImage.astro
interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}
---

<img
  src={src}
  alt={alt}
  width={width}
  height={height}
  loading="lazy"
  decoding="async"
/>
```

### Dynamic Imports
```astro
---
// Only import heavy components when needed
const { showMap } = Astro.props;

let Map;
if (showMap) {
  Map = await import('./Map.astro');
}
---

{showMap && Map && <Map.default />}
```

## Testing Components

### Visual Testing Checklist
- [ ] Mobile: 320px, 375px, 414px
- [ ] Tablet: 768px, 834px
- [ ] Desktop: 1024px, 1440px, 1920px
- [ ] Dark mode (if applicable)
- [ ] RTL languages (if applicable)
- [ ] Long content (text overflow)
- [ ] Empty states
- [ ] Loading states
- [ ] Error states

### Accessibility Testing
```bash
# Use axe-core
npm run test:a11y

# Manual checks
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Color contrast passes WCAG AA
- [ ] Focus indicators visible
```

## Documentation Template

```astro
---
/**
 * ComponentName
 *
 * Description of what the component does
 *
 * @example
 * <ComponentName
 *   prop1="value"
 *   prop2={true}
 * >
 *   Content
 * </ComponentName>
 *
 * @props
 * - prop1: string (required) - Description
 * - prop2: boolean - Description (default: false)
 *
 * @slots
 * - default: Main content
 * - header: Optional header content
 *
 * @css-vars
 * - --component-color: Primary color
 * - --component-spacing: Internal spacing
 */
---
```

## Common Mistakes to Avoid

1. **Creating components too early** - Build inline first, extract when repeated
2. **Over-abstracting** - Keep components simple and focused
3. **Prop explosion** - Too many props = hard to use
4. **Ignoring global styles** - Always check utilities first
5. **Forgetting responsive** - Test all breakpoints
6. **Missing accessibility** - Include ARIA attributes
7. **No documentation** - Document props and usage

---

**Remember**: Good components are reusable, predictable, and maintainable. When in doubt, keep it simple.