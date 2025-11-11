# Buttons

**Component:** UI Components
**Version:** 1.0.0
**Last Updated:** October 20, 2025
**Reference:** HeroSection "AVISADME" button

---

## 🎯 Button Types

### Primary Button - "AVISADME" Style

The main CTA button used throughout the site. Based on the Hero Section newsletter button.

#### Visual Specifications
- **Background:** `#BA2515` (Sauwa Red)
- **Hover Background:** `#DB4529` (Sauwa Orange)
- **Text Color:** `#FFFFFF`
- **Border Radius:** `4px` (0.25rem) - **STANDARD FOR ALL COMPONENTS**
- **Padding:** `16px 32px` (1rem 2rem)
- **Font:** Avenir Next, 600 weight, 16px
- **Letter Spacing:** `0.05em` (wide tracking)
- **Transition:** `300ms ease all`

#### Implementation

```css
/* CSS */
.btn-primary {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;

  /* Spacing - Standard */
  padding: 16px 32px;

  /* Typography */
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  /* Colors */
  background-color: #BA2515;
  color: #FFFFFF;

  /* Border - STANDARD RADIUS */
  border: none;
  border-radius: 4px;

  /* Effects */
  cursor: pointer;
  transition: all 300ms ease;
}

.btn-primary:hover {
  background-color: #DB4529;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(186, 37, 21, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

```html
<!-- HTML -->
<button type="submit" class="btn-primary">
  AVISADME
</button>
```

```astro
<!-- Astro Component -->
<button
  type="submit"
  class="w-full px-8 py-4 text-base font-semibold tracking-wide bg-sauwa-red text-white border-none rounded cursor-pointer transition-colors duration-300 hover:bg-sauwa-orange"
>
  AVISADME
</button>
```

---

### Secondary Button - Blog/Content Style

Used for secondary actions like "Leer más en el blog" or "Reserva tu sesión".

#### Visual Specifications
- **Background:** Transparent
- **Border:** 1px solid `#406E51` (Sauwa Green)
- **Text Color:** `#406E51`
- **Hover Background:** `#406E51`
- **Hover Text:** `#FFFFFF`
- **Border Radius:** `4px` (0.25rem) - **USES STANDARD RADIUS**
- **Padding:** `12px 24px` (0.75rem 1.5rem)
- **Font:** Avenir Next, 400 weight, 16px
- **Transition:** `300ms ease all`

#### Implementation

```css
/* CSS */
.btn-secondary {
  /* Layout */
  display: inline-flex;
  align-items: center;
  gap: 8px;

  /* Spacing */
  padding: 12px 24px;

  /* Typography */
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;

  /* Colors & Border */
  background-color: transparent;
  color: #406E51;
  border: 1px solid #406E51;
  border-radius: 4px;  /* STANDARD RADIUS */

  /* Effects */
  cursor: pointer;
  transition: all 300ms ease;
}

.btn-secondary:hover {
  background-color: #406E51;
  color: #FFFFFF;
}

.btn-secondary:hover .arrow-icon {
  transform: translateX(4px);
}

.arrow-icon {
  width: 20px;
  height: 20px;
  transition: transform 300ms ease;
}
```

```html
<!-- HTML with Icon -->
<a href="/es/reservas" class="btn-secondary">
  Reserva tu sesión
  <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
</a>
```

---

## 🎨 Button Variants

### Ghost Button

Text-only button for tertiary actions.

```css
.btn-ghost {
  background: transparent;
  color: #636464;
  border: none;
  padding: 8px 16px;
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: color 300ms ease;
}

.btn-ghost:hover {
  color: #DB4529;
}
```

### Icon Button

Square button for icon-only actions.

```css
.btn-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;  /* STANDARD RADIUS */
  cursor: pointer;
  transition: all 300ms ease;
}

.btn-icon:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}
```

---

## 📏 Button Sizes

### Large (Hero CTAs)
```css
.btn-large {
  padding: 20px 40px;
  font-size: 18px;
}
```

### Medium (Default)
```css
.btn-medium {
  padding: 16px 32px;
  font-size: 16px;
}
```

### Small (Inline Actions)
```css
.btn-small {
  padding: 8px 16px;
  font-size: 14px;
}
```

---

## 🚫 Standard Border Radius

### IMPORTANT: Universal Border Radius = 4px

All components in the design system use the same border radius for consistency:

```css
:root {
  --border-radius-standard: 4px;
}

/* Applied to ALL components */
.btn-primary,
.btn-secondary,
.btn-ghost,
.btn-icon,
.card,
.input,
.select,
.textarea,
.modal,
.dropdown,
.tooltip {
  border-radius: 4px;
}
```

**Never use:**
- `rounded-lg` (8px) ❌
- `rounded-xl` (12px) ❌
- `rounded-full` (9999px) ❌
- Custom radius values ❌

**Always use:**
- `rounded` (4px) ✅
- `border-radius: 4px` ✅
- `var(--border-radius-standard)` ✅

---

## 📱 Responsive Behavior

### Mobile Adjustments

```css
@media (max-width: 768px) {
  .btn-primary,
  .btn-secondary {
    width: 100%;
    padding: 14px 24px;
  }

  .button-group {
    flex-direction: column;
    gap: 12px;
  }
}
```

---

## ♿ Accessibility

### Requirements
- Minimum touch target: 44px × 44px
- Focus visible indicator required
- Keyboard navigation support
- ARIA labels for icon-only buttons

### Focus States

```css
.btn-primary:focus-visible,
.btn-secondary:focus-visible {
  outline: 2px solid #DB4529;
  outline-offset: 2px;
}

.btn-ghost:focus-visible {
  outline: 2px solid #636464;
  outline-offset: 2px;
}
```

---

## 🎯 Button States

### Loading State

```css
.btn-loading {
  position: relative;
  color: transparent;
  pointer-events: none;
}

.btn-loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  top: 50%;
  left: 50%;
  margin-left: -8px;
  margin-top: -8px;
  border: 2px solid #FFFFFF;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spinner 600ms linear infinite;
}

@keyframes spinner {
  to { transform: rotate(360deg); }
}
```

### Disabled State

```css
.btn-primary:disabled,
.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

---

## 💻 Complete Astro Component

```astro
---
// Button.astro
export interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  class?: string;
  icon?: boolean;
}

const {
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false,
  loading = false,
  href,
  class: className = '',
  icon = false
} = Astro.props;

const baseClasses = 'inline-flex items-center justify-center font-avenir transition-all duration-300 rounded cursor-pointer';

const variantClasses = {
  primary: 'bg-sauwa-red hover:bg-sauwa-orange text-white border-none',
  secondary: 'bg-transparent hover:bg-sauwa-green text-sauwa-green hover:text-white border border-sauwa-green',
  ghost: 'bg-transparent hover:text-sauwa-orange text-sauwa-gray border-none',
  icon: 'bg-white/10 hover:bg-white/20 text-white border border-white/30'
};

const sizeClasses = {
  small: 'px-4 py-2 text-sm',
  medium: 'px-8 py-4 text-base',
  large: 'px-10 py-5 text-lg'
};

const iconSizeClasses = {
  small: 'w-9 h-9',
  medium: 'w-11 h-11',
  large: 'w-14 h-14'
};

const classes = [
  baseClasses,
  variantClasses[variant],
  icon ? iconSizeClasses[size] : sizeClasses[size],
  loading && 'btn-loading',
  disabled && 'opacity-50 cursor-not-allowed',
  className
].filter(Boolean).join(' ');

const Component = href ? 'a' : 'button';
---

<Component
  class={classes}
  type={!href ? type : undefined}
  href={href}
  disabled={disabled || loading}
  aria-busy={loading}
>
  {icon ? (
    <slot name="icon" />
  ) : (
    <>
      <slot />
      {variant === 'secondary' && (
        <svg class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      )}
    </>
  )}
</Component>

<style>
  /* Component-specific loading animation */
  .btn-loading {
    color: transparent !important;
  }

  .btn-loading::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    top: 50%;
    left: 50%;
    margin-left: -8px;
    margin-top: -8px;
    border: 2px solid currentColor;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spinner 0.6s linear infinite;
  }

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
</style>
```

---

## 📚 Related Documentation

- [Colors](../01-FOUNDATION/colors.md) - Button color system
- [Typography](../01-FOUNDATION/typography.md) - Button text styles
- [Spacing](../01-FOUNDATION/spacing.md) - Button padding system
- [Forms](forms.md) - Submit button guidelines

---

## 🛠 Tools

- [Button Builder](https://markodenic.com/tools/buttons-generator/)
- [CSS Button Generator](https://cssgradient.io/css-button-generator/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)