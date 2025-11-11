# Colors

**Component:** Foundation
**Version:** 1.0.0
**Last Updated:** October 20, 2025
**Linear Reference:** WDA-98

---

## 🎨 Brand Palette

### Primary Colors

| Color | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| ![#BA2515](https://via.placeholder.com/60x40/BA2515/BA2515) | **Sauwa Red** | `#BA2515` | `186, 37, 21` | Primary CTA, brand identity, error states |
| ![#DB4529](https://via.placeholder.com/60x40/DB4529/DB4529) | **Sauwa Orange** | `#DB4529` | `219, 69, 41` | Hover states, accents, highlights |
| ![#406E51](https://via.placeholder.com/60x40/406E51/406E51) | **Sauwa Green** | `#406E51` | `64, 110, 81` | Secondary CTAs, success states, nature elements |

### Secondary Colors

| Color | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| ![#897162](https://via.placeholder.com/60x40/897162/897162) | **Sauwa Brown** | `#897162` | `137, 113, 98` | Tertiary elements, earth tones |
| ![#636464](https://via.placeholder.com/60x40/636464/636464) | **Sauwa Gray** | `#636464` | `99, 100, 100` | Body text, neutral backgrounds |

### Base Colors

| Color | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| ![#FFFFFF](https://via.placeholder.com/60x40/FFFFFF/FFFFFF?text=+) | **White** | `#FFFFFF` | `255, 255, 255` | Backgrounds, text on dark |
| ![#000000](https://via.placeholder.com/60x40/000000/000000) | **Black** | `#000000` | `0, 0, 0` | Text, overlays (with opacity) |

---

## 📐 Color System

### Text Colors

```css
/* Primary Text */
--text-black: #1a1a1a;      /* Main headings */
--text-dark: #333333;       /* Subheadings */
--text-gray: #555555;       /* Body text */
--text-light: #777777;      /* Secondary text */
--text-muted: #999999;      /* Disabled/muted */

/* Brand Text */
--text-red: #BA2515;        /* Error, important */
--text-orange: #DB4529;     /* Links, highlights */
--text-green: #406E51;      /* Success, eco */
--text-white: #FFFFFF;      /* On dark backgrounds */
```

### Background Colors

```css
/* Light Backgrounds */
--bg-white: #FFFFFF;
--bg-light: #F8F8F8;
--bg-gray: #F0F0F0;

/* Brand Backgrounds */
--bg-brown-warm: #887161;  /* SIEMPRE usar con texto blanco */

/* Dark Backgrounds with Opacity */
--bg-black-20: rgba(0, 0, 0, 0.2);
--bg-black-40: rgba(0, 0, 0, 0.4);
--bg-black-60: rgba(0, 0, 0, 0.6);
--bg-black-80: rgba(0, 0, 0, 0.8);

/* Overlay Gradients */
--overlay-light: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%);
--overlay-dark: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%);
```

---

## 🎯 Usage Guidelines

### Primary Button Colors

```css
.btn-primary {
  background-color: #BA2515;  /* Sauwa Red */
  color: #FFFFFF;
}

.btn-primary:hover {
  background-color: #DB4529;  /* Sauwa Orange */
}
```

### Secondary Button Colors

```css
.btn-secondary {
  border: 1px solid #406E51;  /* Sauwa Green */
  color: #406E51;
  background-color: transparent;
}

.btn-secondary:hover {
  background-color: #406E51;
  color: #FFFFFF;
}
```

### Link Colors

```css
a {
  color: #406E51;  /* Sauwa Green */
}

a:hover {
  color: #DB4529;  /* Sauwa Orange */
}
```

---

## 🎨 Combinaciones de Color y Reglas de Contraste

### Reglas Obligatorias de Combinación

| Fondo | Texto | Ratio | WCAG | Uso Recomendado |
|-------|-------|-------|------|-----------------|
| **#887161** (Marrón cálido) | **#FFFFFF** (Blanco) | 4.5:1 | AA | ✅ **OBLIGATORIO** - Secciones con fondo marrón |
| #BA2515 (Sauwa Red) | #FFFFFF | 7.4:1 | AAA | ✅ Botones CTA principales |
| #DB4529 (Sauwa Orange) | #FFFFFF | 4.8:1 | AA | ✅ Estados hover, acentos |
| #406E51 (Sauwa Green) | #FFFFFF | 4.6:1 | AA | ✅ Botones secundarios |
| #897162 (Sauwa Brown) | #FFFFFF | 4.3:1 | AA | ✅ Elementos terciarios |
| #FFFFFF | #555555 | 7.5:1 | AAA | ✅ Texto del cuerpo |

### ⚠️ Regla Crítica: Fondo Marrón #887161

**Cuando se use `#887161` como color de fondo, TODO el texto DEBE ser blanco (`#FFFFFF`)**

```css
/* OBLIGATORIO - No modificar */
.brown-section {
  background-color: #887161;  /* Marrón cálido */
  color: #FFFFFF;             /* SIEMPRE blanco */
}

/* Todos los elementos hijos heredan el color blanco */
.brown-section h1,
.brown-section h2,
.brown-section h3,
.brown-section p,
.brown-section span,
.brown-section a {
  color: #FFFFFF;  /* Asegurar texto blanco en todos los elementos */
}
```

### Ejemplo de Implementación

```astro
---
// SectionWithBrownBackground.astro
---

<section class="brown-section">
  <div class="container">
    <h2 class="section-title">Título de Sección</h2>
    <p class="section-text">
      Todo el texto en esta sección será blanco automáticamente
      para garantizar el contraste WCAG AA sobre el fondo marrón.
    </p>
    <a href="#" class="section-link">Enlaces también en blanco</a>
  </div>
</section>

<style>
  .brown-section {
    background-color: #887161;
    color: #FFFFFF;
    padding: 4rem 0;
  }

  .section-title {
    color: #FFFFFF;  /* Explícitamente blanco */
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .section-text {
    color: #FFFFFF;  /* Heredado pero reforzado */
    opacity: 0.95;   /* Ligera transparencia si se necesita */
  }

  .section-link {
    color: #FFFFFF;
    text-decoration: underline;
    transition: opacity 0.3s ease;
  }

  .section-link:hover {
    opacity: 0.8;  /* Hover mediante opacity, no cambio de color */
  }
</style>
```

---

## ♿ Accessibility

### Contrast Ratios (WCAG AA)

| Combination | Contrast Ratio | WCAG Level | Usage |
|-------------|---------------|------------|-------|
| White on Brown (#887161) | 4.5:1 | AA | ✅ Section backgrounds |
| White on Sauwa Red | 7.4:1 | AAA | ✅ CTA buttons |
| White on Sauwa Orange | 4.8:1 | AA | ✅ Hover states |
| White on Sauwa Green | 4.6:1 | AA | ✅ Secondary buttons |
| Sauwa Red on White | 7.4:1 | AAA | ✅ Error messages |
| Sauwa Green on White | 4.6:1 | AA | ✅ Success messages |
| Gray (#555) on White | 7.5:1 | AAA | ✅ Body text |

### Color Blindness Considerations

- Don't rely solely on color to convey information
- Use icons alongside color indicators
- Maintain sufficient contrast for all text
- Test with color blindness simulators

---

## 💻 Implementation

### Tailwind CSS Config

```javascript
// tailwind.config.mjs
colors: {
  'sauwa-red': '#BA2515',
  'sauwa-orange': '#DB4529',
  'sauwa-green': '#406E51',
  'sauwa-brown': '#897162',
  'sauwa-brown-warm': '#887161',  // Nuevo: marrón cálido para fondos
  'sauwa-gray': '#636464',
}
```

### CSS Variables

```css
:root {
  /* Brand Colors */
  --color-primary: #BA2515;
  --color-primary-hover: #DB4529;
  --color-secondary: #406E51;
  --color-tertiary: #897162;
  --color-neutral: #636464;

  /* Background Colors */
  --color-bg-brown-warm: #887161;  /* IMPORTANTE: Usar solo con texto blanco */

  /* Semantic Colors */
  --color-error: #BA2515;
  --color-success: #406E51;
  --color-warning: #DB4529;
  --color-info: #636464;
}
```

### Astro Component Example

```astro
---
// Button.astro
export interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  class?: string;
}

const { variant = 'primary', class: className = '' } = Astro.props;

const variants = {
  primary: 'bg-sauwa-red hover:bg-sauwa-orange text-white',
  secondary: 'border border-sauwa-green text-sauwa-green hover:bg-sauwa-green hover:text-white',
  ghost: 'text-sauwa-gray hover:text-sauwa-orange'
};
---

<button class={`${variants[variant]} ${className}`}>
  <slot />
</button>
```

---

## 🚫 Don'ts

### Common Mistakes to Avoid

❌ **Don't use pure black (#000000) for text**
- Use `#1a1a1a` instead for better readability

❌ **Don't mix brand colors randomly**
- Follow the hierarchy: Red > Green > Brown > Gray

❌ **Don't use low contrast combinations**
- Always test contrast ratios with WebAIM tools

❌ **Don't create new shades**
- Use opacity for variations instead of new colors

❌ **Don't use dark text on #887161 background**
- SIEMPRE usar texto blanco (#FFFFFF) sobre fondo marrón cálido (#887161)
- No usar texto negro, gris o de color sobre este fondo

---

## 🔍 Examples

### Hero Section
- Background: Image with `rgba(0,0,0,0.4)` overlay
- H1 Text: `#FFFFFF`
- H2 Accent: `#DB4529`
- CTA Button: `#BA2515` → `#DB4529` on hover

### Content Section
- Background: `#FFFFFF`
- H2 Title: `#1a1a1a`
- Body Text: `#555555`
- Links: `#406E51`
- Icons: `#DB4529`

### Brown Background Section
- Background: `#887161` (marrón cálido)
- ALL Text: `#FFFFFF` (blanco obligatorio)
- H2 Title: `#FFFFFF`
- Body Text: `#FFFFFF`
- Links: `#FFFFFF` with underline
- Hover: Use `opacity: 0.8` instead of color change

### Cards
- Background: `#FFFFFF`
- Border: `rgba(0,0,0,0.1)`
- Title: `#1a1a1a`
- Description: `#555555`
- Hover Shadow: `rgba(0,0,0,0.2)`

---

## 📚 Related Documentation

- [Typography](typography.md) - Font colors and hierarchy
- [Buttons](../02-COMPONENTS/buttons.md) - Button color implementations
- [Accessibility](../03-PATTERNS/accessibility.md) - Contrast requirements

---

## 🔧 Tools & Resources

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors Palette Generator](https://coolors.co/)
- [Stark (Figma Plugin)](https://www.getstark.co/)
- [Color Oracle](https://colororacle.org/) - Color blindness simulator