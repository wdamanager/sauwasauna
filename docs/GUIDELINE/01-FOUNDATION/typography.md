# Typography

**Component:** Foundation
**Version:** 1.1.0
**Last Updated:** October 20, 2025
**Linear Reference:** WDA-98, WDA-119
**Reference Component:** BenefitsImageSection.astro

---

## ⚠️ ESTÁNDAR OBLIGATORIO: Títulos de Sección

**TODOS los componentes de sección** (excepto Hero) DEBEN usar este patrón estandarizado:

### Patrón H2 + H3 (Obligatorio)

```html
<h2 class="seo-title">Keyword SEO</h2>
<h3 class="main-heading">Título visual principal</h3>
```

### Estilos Obligatorios (No Modificar)

**`.seo-title`** (H2 - pequeño superior):
- **Font:** Helvetica Neue
- **Size:** 1rem (16px)
- **Weight:** 300
- **Color:** #DB4529 (rojo SAUWA)
- **Transform:** uppercase
- **Letter-spacing:** 0.05em
- **Margin:** 0 0 1rem

**`.main-heading`** (H3 - título principal):
- **Font:** Helvetica Neue
- **Size:** clamp(1.75rem, 3vw, 2.25rem)
- **Weight:** 200
- **Color:** #1a1a1a
- **Line-height:** 1.3
- **Margin:** 0 0 1.5rem

### ✅ Componente de Referencia

`BenefitsImageSection.astro` - Este componente tiene la implementación PERFECTA del estándar.

### ❌ Componentes que NO Cumplen (Requieren Corrección)

| Componente | Estado | Cambios Necesarios |
|------------|--------|-------------------|
| **SessionPhases.astro** | ❌ No cumple | 6 cambios CSS: font-weight, font-size, letter-spacing, etc. |
| **CTANewsletter.astro** | ❌ No cumple | 6 cambios CSS: text-transform, color, margin, etc. |
| **ExperienceSection.astro** | ❌ No cumple | Restructuración HTML + CSS completa |

> **IMPORTANTE:** Ver [Section Headers Documentation](../02-COMPONENTS/section-headers.md) para guía completa de implementación y auditoría.

---

## 📝 Font Families

### Primary: Helvetica Neue Ultra Light

**Usage:** Logo, main headings, display text
**Weights:** 100 (Ultra Light), 200 (Thin), 300 (Light)
**Fallback:** `'Helvetica Neue', 'Inter', sans-serif`

```css
font-family: 'Helvetica Neue', 'Inter', sans-serif;
```

### Secondary: Avenir Next Ultra Light

**Usage:** Subtitles, body text, UI elements
**Weights:** 200 (Ultra Light), 300 (Light), 400 (Regular)
**Fallback:** `'Avenir Next', 'Nunito Sans', sans-serif`

```css
font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
```

---

## 🎯 Type Scale

### Heading Hierarchy

| Level | Class | Font | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|-------|-------|------|---------------|--------------|--------|-------------|
| **Display** | `.text-display` | Helvetica Neue | 72px | 48px | 100 | 1.1 |
| **H1** | `.text-h1` | Helvetica Neue | 56px | 36px | 100 | 1.2 |
| **H2** | `.text-h2` | Helvetica Neue | 42px | 32px | 200 | 1.2 |
| **H3** | `.text-h3` | Helvetica Neue | 36px | 28px | 200 | 1.3 |
| **H4** | `.text-h4` | Avenir Next | 28px | 24px | 300 | 1.4 |
| **H5** | `.text-h5` | Avenir Next | 24px | 20px | 400 | 1.4 |
| **H6** | `.text-h6` | Avenir Next | 18px | 18px | 400 | 1.5 |

### Body Text

| Type | Class | Font | Size | Weight | Line Height |
|------|-------|------|------|--------|-------------|
| **Lead** | `.text-lead` | Avenir Next | 20px | 300 | 1.7 |
| **Body** | `.text-body` | Avenir Next | 16px | 300 | 1.7 |
| **Small** | `.text-small` | Avenir Next | 14px | 300 | 1.6 |
| **Caption** | `.text-caption` | Avenir Next | 12px | 400 | 1.5 |

### Special Text

| Type | Class | Font | Size | Weight | Style |
|------|-------|------|------|--------|-------|
| **SEO Title** | `.seo-title` | Helvetica Neue | 16px | 300 | Uppercase, 0.05em spacing |
| **Display Number** | `.display-number` | Helvetica Neue | 64px | 100 | Sauwa Orange (#DB4529) |
| **CTA Text** | `.cta-text` | Avenir Next | 16px | 400 | 0.02em spacing |

---

## 💻 Implementation

### CSS Classes (Ready to Use)

```css
/* SEO Title - H2 for keywords */
.seo-title {
  font-family: 'Helvetica Neue', 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #DB4529;
  margin: 0 0 1rem;
}

/* Main Heading - H3 visual hierarchy */
.main-heading {
  font-family: 'Helvetica Neue', 'Inter', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 200;
  line-height: 1.3;
  color: #1a1a1a;
  margin: 0 0 1.5rem;
}

/* Intro Text - Lead paragraph */
.intro-text {
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: clamp(0.95rem, 1.2vw, 1.125rem);
  font-weight: 300;
  line-height: 1.7;
  color: #444;
  margin: 0 0 3rem;
}

/* Body Text - Standard paragraph */
.body-text {
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 300;
  line-height: 1.6;
  color: #555;
  margin: 0;
}

/* Display Number - Decorative */
.display-number {
  font-family: 'Helvetica Neue', 'Inter', sans-serif;
  font-weight: 100;
  font-size: 64px;
  color: #DB4529;
  opacity: 0.8;
  line-height: 1;
}
```

### Responsive Typography with Clamp

```css
/* Fluid Typography Scale */
:root {
  --text-xs: clamp(0.75rem, 0.9vw, 0.875rem);
  --text-sm: clamp(0.875rem, 1vw, 1rem);
  --text-base: clamp(0.95rem, 1.2vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1.5vw, 1.25rem);
  --text-xl: clamp(1.25rem, 2vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 2.5vw, 1.875rem);
  --text-3xl: clamp(1.875rem, 3vw, 2.25rem);
  --text-4xl: clamp(2.25rem, 4vw, 3rem);
  --text-5xl: clamp(3rem, 5vw, 3.75rem);
}
```

### Tailwind Utilities

```html
<!-- H1 Hero -->
<h1 class="font-helvetica font-thin text-5xl md:text-7xl text-white">
  Sauna en Andorra
</h1>

<!-- H2 Section Title -->
<h2 class="font-helvetica font-extralight text-3xl md:text-4xl text-gray-900">
  Beneficios reales
</h2>

<!-- Body Text -->
<p class="font-avenir font-light text-base md:text-lg text-gray-600 leading-relaxed">
  La sauna finlandesa de leña combinada con baños de agua helada...
</p>

<!-- CTA Link -->
<a class="font-avenir font-normal text-sauwa-green hover:text-sauwa-orange">
  Reserva tu sesión →
</a>
```

---

## 📐 Typography Patterns

### Hero Section Pattern

```html
<div class="hero-content">
  <h1 class="hero-h1">
    Sauna en Andorra
    <span class="hero-h1-subtitle">(sauna finlandesa de leña + baños fríos)</span>
  </h1>
  <h2 class="hero-h2">
    SAUWA es la única sauna finlandesa de leña y móvil en Andorra
  </h2>
  <p class="hero-text">
    Vive un rito nórdico con contrastes de calor y agua fría...
  </p>
</div>
```

```css
.hero-h1 {
  font-family: 'Helvetica Neue', 'Inter', sans-serif;
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 100;
  letter-spacing: 0.02em;
  line-height: 1.2;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.hero-h1-subtitle {
  display: block;
  font-size: clamp(1.25rem, 3.5vw, 2.5rem);
  font-weight: 200;
  margin-top: 0.5rem;
  opacity: 0.9;
}

.hero-h2 {
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.75rem);
  font-weight: 300;
  color: #DB4529;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}
```

### Content Section Pattern

```html
<section>
  <h2 class="seo-title">Sesión de sauna</h2>
  <h3 class="main-heading">¿Cómo es una sesión en SAUWA?</h3>
  <p class="intro-text">
    Descubre el auténtico ritual nórdico de contrastes...
  </p>
  <div class="content-grid">
    <article>
      <span class="display-number">01</span>
      <h4 class="card-title">Sauna de leña</h4>
      <p class="body-text">
        Calor intenso y vapor natural...
      </p>
    </article>
  </div>
</section>
```

---

## ♿ Accessibility Guidelines

### Font Size Requirements
- Minimum body text: 16px
- Minimum interactive text: 14px
- User must be able to zoom to 200%

### Line Height Requirements
- Body text: 1.5 minimum
- Headings: 1.2 minimum
- Small text: 1.6 minimum

### Font Weight Considerations
- Avoid weights below 300 for body text
- Ensure sufficient contrast with light weights
- Provide fallbacks for custom fonts

### WCAG 2.1 AA Compliance
- Text contrast: 4.5:1 minimum
- Large text contrast: 3:1 minimum
- Focus indicators on all interactive text

---

## 🚫 Don'ts

❌ **Don't mix font families in the same element**
- Keep Helvetica for headings, Avenir for body

❌ **Don't use font weights above 400**
- Maintain the ultra-light aesthetic

❌ **Don't skip heading levels**
- Always maintain H1 → H2 → H3 hierarchy for SEO

❌ **Don't use fonts smaller than 14px**
- Except for legal text or copyrights

❌ **Don't forget text shadows on images**
- Always add shadow for text over images

---

## 📊 Quick Reference Table

| Element | Font | Desktop | Mobile | Weight | Color |
|---------|------|---------|--------|--------|-------|
| **Logo** | Helvetica | 240px | 96px | 100 | White |
| **H1** | Helvetica | 56px | 36px | 100 | #1a1a1a |
| **H2 SEO** | Helvetica | 16px | 16px | 300 | #DB4529 |
| **H3** | Helvetica | 36px | 28px | 200 | #1a1a1a |
| **H4** | Avenir | 18px | 18px | 400 | #1a1a1a |
| **Body** | Avenir | 16px | 15px | 300 | #555 |
| **CTA** | Avenir | 16px | 16px | 400 | #406E51 |
| **Small** | Avenir | 14px | 14px | 300 | #777 |

---

## 🔄 Migration from Old Typography

If you find components using incorrect typography:

1. Identify the element type (heading, body, special)
2. Find the appropriate class from this guide
3. Replace inline styles with the class
4. Test responsive behavior
5. Verify contrast ratios

**Priority Fixes:**
- SessionPhases.astro: `.phase-title` weight 500 → 400
- CTANewsletter.astro: H2 should use Helvetica, not Avenir

---

## 📚 Related Documentation

- [Colors](colors.md) - Text color guidelines
- [Spacing](spacing.md) - Margin and padding for text
- [Accessibility](../03-PATTERNS/accessibility.md) - WCAG requirements

---

## 🛠 Tools

- [Type Scale Calculator](https://type-scale.com/)
- [Fluid Typography Calculator](https://fluid-typography.netlify.app/)
- [Font Weight Tester](https://wakamaifondue.com/)
- [Google Fonts Helper](https://google-webfonts-helper.herokuapp.com/)