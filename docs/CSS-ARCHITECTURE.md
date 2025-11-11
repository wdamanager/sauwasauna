# SAUWA CSS Architecture Guide

**Versión**: 1.0.0
**Fecha**: 2025-11-09
**Sistema de Diseño**: WDA-531 Refactorización

---

## Índice

1. [Introducción](#introducción)
2. [Principios de Diseño](#principios-de-diseño)
3. [Estructura de Archivos](#estructura-de-archivos)
4. [Design Tokens](#design-tokens)
5. [Utilities (Clases Utilitarias)](#utilities-clases-utilitarias)
6. [Components (Componentes Base)](#components-componentes-base)
7. [Layouts (Estructuras de Página)](#layouts-estructuras-de-página)
8. [Patrones de Uso](#patrones-de-uso)
9. [Nomenclatura y Convenciones](#nomenclatura-y-convenciones)
10. [Responsive Design](#responsive-design)
11. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## Introducción

El sistema CSS de SAUWA está construido siguiendo principios de **Atomic Design**, **BEM**, y **CSS Custom Properties** para crear una arquitectura escalable, mantenible y consistente.

### Objetivos del Sistema

- **DRY (Don't Repeat Yourself)**: Cada estilo definido una sola vez
- **Single Source of Truth**: Variables CSS como fuente única de valores
- **Composición sobre Herencia**: Clases utilitarias combinables
- **Escalabilidad**: Sistema que crece sin romper
- **Performance**: CSS optimizado y eficiente

### Filosofía

> "Escribe el mínimo CSS posible. Usa clases globales para el 90% de casos. Scoped styles solo para lo verdaderamente único."

---

## Principios de Diseño

### 1. Mobile-First

Todo el CSS está diseñado mobile-first:

```css
/* Base: móvil */
.section {
  padding: var(--spacing-8) 0;
}

/* Desktop override */
@media (min-width: 768px) {
  .section {
    padding: var(--spacing-12) 0;
  }
}
```

### 2. Design Tokens First

SIEMPRE usar variables CSS en lugar de valores hardcodeados:

```css
/* ❌ MAL */
.my-element {
  color: #BA2515;
  font-size: 18px;
  padding: 24px;
}

/* ✅ BIEN */
.my-element {
  color: var(--color-primary);
  font-size: var(--font-scale-base);
  padding: var(--spacing-5);
}
```

### 3. Composición de Clases

Combinar clases utilitarias para crear variaciones:

```html
<!-- ✅ Composición correcta -->
<section class="section section--bg-light">
  <div class="container container--narrow">
    <h2 class="section-label section-label--primary">Label</h2>
    <h3 class="section-title section-title--center">Título</h3>
  </div>
</section>
```

### 4. BEM para Modificadores

Usar nomenclatura BEM para variantes:

```css
/* Block */
.section-label { }

/* Modificadores */
.section-label--primary { }
.section-label--b2b { }
.section-label--white { }
```

---

## Estructura de Archivos

```
src/styles/
├── design-tokens.css      # Variables CSS (colores, tipografía, espaciado)
├── utilities.css          # Clases utilitarias globales
├── components.css         # Componentes base (buttons, forms, cards)
├── layouts.css            # Estructuras de página predefinidas
├── global.css             # Archivo principal + legacy
├── landing.css            # Estilos específicos landing
└── wda531-hotfix.css      # Hotfix temporal (a eliminar)
```

### Orden de Imports en global.css

```css
@tailwind base;

/* Design System - Orden crítico */
@import './design-tokens.css';  /* 1. Variables primero */
@import './utilities.css';      /* 2. Utilidades */
@import './components.css';     /* 3. Componentes */
@import './layouts.css';        /* 4. Layouts */

@tailwind components;
@tailwind utilities;

/* Legacy compatibility */
```

---

## Design Tokens

### Colores

```css
/* Primarios */
--color-primary: #BA2515;         /* Rojo SAUWA */
--color-primary-hover: #DB4529;   /* Naranja SAUWA */

/* B2B */
--color-b2b: #406E51;             /* Verde Partners */
--color-b2b-hover: #4a7e5c;

/* Neutros */
--color-text-primary: #1a1a1a;
--color-text-secondary: #636464;
--color-bg-white: #ffffff;
--color-bg-light: #f4f4f4;
--color-bg-dark: #1a1a1a;
```

**Uso**:
```css
.my-element {
  color: var(--color-primary);
  background-color: var(--color-bg-light);
}
```

### Tipografía

#### Familias

```css
--font-family-primary: 'Helvetica Neue', 'Inter', sans-serif;
--font-family-secondary: 'Avenir Next', 'Avenir', sans-serif;
```

#### Escalas Fluidas (Responsive Automático)

```css
--font-scale-xxs: clamp(0.875rem, 0.8vw + 0.8rem, 1rem);      /* 14-16px */
--font-scale-xs: clamp(0.9375rem, 0.9vw + 0.85rem, 1.0625rem); /* 15-17px */
--font-scale-sm: clamp(1rem, 1vw + 0.9rem, 1.125rem);          /* 16-18px */
--font-scale-base: clamp(1.125rem, 1.2vw + 1rem, 1.25rem);     /* 18-20px */
--font-scale-md: clamp(1.25rem, 1.4vw + 1.1rem, 1.5rem);       /* 20-24px */
--font-scale-lg: clamp(1.5rem, 2vw + 1.2rem, 2rem);            /* 24-32px */
--font-scale-xl: clamp(1.75rem, 2.5vw + 1.4rem, 2.5rem);       /* 28-40px */
--font-scale-2xl: clamp(2rem, 3vw + 1.5rem, 3rem);             /* 32-48px */
--font-scale-3xl: clamp(2.5rem, 4vw + 2rem, 4rem);             /* 40-64px */
```

**Beneficio**: Se ajustan automáticamente entre móvil y desktop sin media queries.

#### Pesos

```css
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Espaciado (Sistema 8pt)

```css
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.5rem;    /* 24px */
--spacing-6: 2rem;      /* 32px */
--spacing-8: 3rem;      /* 48px */
--spacing-10: 4rem;     /* 64px */
--spacing-12: 5rem;     /* 80px */
```

**Uso**:
```css
.my-element {
  padding: var(--spacing-6);
  margin-bottom: var(--spacing-4);
  gap: var(--spacing-5);
}
```

### Componentes

```css
/* Border radius */
--radius-sm: 4px;
--radius-base: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-full: 9999px;

/* Shadows */
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
--shadow-base: 0 4px 12px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15);

/* Transitions */
--transition-fast: 150ms ease-out;
--transition-base: 300ms ease-out;
--transition-slow: 500ms ease-out;
```

---

## Utilities (Clases Utilitarias)

### Tipografía

#### Section Labels (pequeños, uppercase)

```html
<h2 class="section-label section-label--primary">EXPERIENCIA SAUWA</h2>
<h2 class="section-label section-label--b2b">PARTNERS B2B</h2>
<h2 class="section-label section-label--white">LABEL BLANCO</h2>
```

#### Section Titles (headings principales)

```html
<h3 class="section-title">Título Principal</h3>
<h3 class="section-title section-title--center">Título Centrado</h3>
<h3 class="section-title section-title--white">Título Blanco</h3>
```

#### Descriptions

```html
<p class="section-description">Descripción estándar</p>
<p class="section-description section-description--center">Centrada</p>
<p class="section-description section-description--max-width">Con ancho máximo</p>
```

### Layout

#### Contenedores

```html
<div class="container">Contenedor estándar (1400px)</div>
<div class="container container--narrow">Contenedor estrecho (1200px)</div>
<div class="container container--wide">Contenedor ancho (1600px)</div>
```

#### Secciones

```html
<section class="section">Sección estándar</section>
<section class="section section--compact">Sección compacta</section>
<section class="section section--bg-light">Con fondo gris</section>
<section class="section section--bg-gradient">Con gradiente</section>
```

#### Grid

```html
<div class="grid grid--3">
  <div>Columna 1</div>
  <div>Columna 2</div>
  <div>Columna 3</div>
</div>

<!-- Grid responsive -->
<div class="grid grid--responsive-3">
  <!-- 1 col móvil, 2 tablet, 3 desktop -->
</div>
```

#### Flexbox

```html
<div class="flex flex--center flex--items-center flex--gap-4">
  <!-- Centrado horizontal y vertical con gap -->
</div>
```

### Spacing

```html
<div class="mt-6 mb-8">Margins top/bottom</div>
<div class="p-6">Padding uniforme</div>
<div class="py-8 px-6">Padding vertical/horizontal</div>
```

### Responsive

```html
<div class="hide-mobile">Oculto en móvil</div>
<div class="show-mobile">Visible solo en móvil</div>
<div class="text-mobile-center">Centrado en móvil</div>
```

---

## Components (Componentes Base)

### Buttons

```html
<!-- Botón primario -->
<button class="btn btn--primary">Reservar Ahora</button>

<!-- Botón secundario -->
<button class="btn btn--secondary">Más Información</button>

<!-- Botón B2B -->
<button class="btn btn--b2b">Partners</button>

<!-- Tamaños -->
<button class="btn btn--primary btn--sm">Pequeño</button>
<button class="btn btn--primary btn--lg">Grande</button>

<!-- Full width -->
<button class="btn btn--primary btn--block">Full Width</button>
```

### Forms

```html
<div class="form-group">
  <label class="form-label">Email</label>
  <input type="email" class="form-input" placeholder="tu@email.com">
  <span class="form-helper">Te enviaremos confirmación</span>
</div>

<!-- Con error -->
<div class="form-group">
  <label class="form-label">Nombre</label>
  <input type="text" class="form-input form-input--error">
  <span class="form-error">Este campo es obligatorio</span>
</div>
```

### Cards

```html
<div class="card">
  <div class="card__header">
    <h3 class="card__title">Título de Card</h3>
  </div>
  <p class="card__description">Descripción del contenido</p>
  <div class="card__footer">
    <a href="#" class="link">Leer más</a>
  </div>
</div>
```

### Badges

```html
<span class="badge badge--primary">Nuevo</span>
<span class="badge badge--b2b">Partner</span>
<span class="badge badge--success">Activo</span>
```

### Lists

```html
<ul class="list list--icon">
  <li class="list__item">
    <svg class="list__icon"><!-- checkmark --></svg>
    <span>Item de lista</span>
  </li>
</ul>
```

---

## Layouts (Estructuras de Página)

### Hero Section

```html
<section class="hero">
  <div class="hero__background">
    <img src="/hero.jpg" alt="Hero">
  </div>
  <div class="hero__overlay hero__overlay--dark"></div>
  <div class="hero__content">
    <h1>Título Hero</h1>
    <p>Subtítulo</p>
  </div>
</section>
```

### Section Header

```html
<header class="section-header section-header--center">
  <h2 class="section-label section-label--primary">Label</h2>
  <h3 class="section-title section-title--center">Título</h3>
  <p class="section-description section-description--center">Descripción</p>
</header>
```

### Two Column Layout

```html
<div class="two-column">
  <div>Columna izquierda</div>
  <div>Columna derecha</div>
</div>

<!-- Con proporciones -->
<div class="two-column two-column--60-40">
  <div>60%</div>
  <div>40%</div>
</div>
```

### Feature Grid

```html
<div class="feature-grid feature-grid--3">
  <div class="feature-item">
    <div class="feature-item__icon">
      <!-- Icon SVG -->
    </div>
    <h4 class="feature-item__title">Feature</h4>
    <p class="feature-item__description">Descripción</p>
  </div>
  <!-- Más features -->
</div>
```

### CTA Section

```html
<section class="cta-section cta-section--gradient">
  <div class="cta-section__content">
    <h2 class="cta-section__title">Reserva Ahora</h2>
    <p class="cta-section__description">Experimenta el auténtico ritual</p>
    <div class="cta-section__actions">
      <button class="btn btn--primary btn--lg">Reservar</button>
      <button class="btn btn--secondary btn--lg">Más Info</button>
    </div>
  </div>
</section>
```

---

## Patrones de Uso

### Página Estándar

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Mi Página">
  <!-- Hero -->
  <section class="hero">
    <!-- Hero content -->
  </section>

  <!-- Sección con contenido -->
  <section class="section section--bg-light">
    <div class="container container--narrow">
      <header class="section-header section-header--center">
        <h2 class="section-label section-label--primary">Label</h2>
        <h3 class="section-title section-title--center">Título</h3>
        <p class="section-description section-description--center section-description--max-width">
          Descripción
        </p>
      </header>

      <!-- Grid de features -->
      <div class="feature-grid feature-grid--3">
        <!-- Features -->
      </div>
    </div>
  </section>

  <!-- CTA final -->
  <section class="cta-section">
    <!-- CTA content -->
  </section>
</Layout>

<style>
  /* SOLO estilos específicos aquí */
  .mi-elemento-unico {
    /* Estilos únicos de esta página */
  }
</style>
```

### Componente Reutilizable

```astro
---
interface Props {
  title: string;
  description: string;
  variant?: 'primary' | 'b2b';
}

const { title, description, variant = 'primary' } = Astro.props;
const labelClass = `section-label section-label--${variant}`;
---

<section class="section section--bg-light">
  <div class="container">
    <h2 class={labelClass}>{title}</h2>
    <p class="section-description">{description}</p>
  </div>
</section>

<style>
  /* Solo si hay algo específico del componente */
</style>
```

---

## Nomenclatura y Convenciones

### Reglas de Nomenclatura

1. **kebab-case** para clases CSS
2. **BEM** para modificadores: `block--modifier`
3. **Prefijos semánticos**:
   - `section-*` para elementos de sección
   - `btn-*` para botones
   - `form-*` para formularios
   - `card-*` para cards

### Modificadores BEM

```css
/* Block */
.section-label { }

/* Modificadores */
.section-label--primary { color: var(--color-primary); }
.section-label--b2b { color: var(--color-b2b); }
.section-label--white { color: white; }

/* Elementos (no se usan mucho, preferir composición) */
.card__title { }
.card__description { }
```

### Orden de Propiedades CSS

```css
.my-element {
  /* 1. Positioning */
  position: relative;
  top: 0;
  z-index: 1;

  /* 2. Display & Box Model */
  display: flex;
  width: 100%;
  padding: var(--spacing-4);
  margin-bottom: var(--spacing-6);

  /* 3. Typography */
  font-family: var(--font-family-primary);
  font-size: var(--font-scale-base);
  color: var(--color-text-primary);

  /* 4. Visual */
  background-color: var(--color-bg-light);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-base);

  /* 5. Misc */
  transition: var(--transition-base);
  cursor: pointer;
}
```

---

## Responsive Design

### Breakpoints

```css
/* Mobile: < 768px (default) */
/* Tablet: 768px - 1023px */
/* Desktop: >= 1024px */
/* Wide: >= 1920px */

--breakpoint-mobile: 768px;
--breakpoint-tablet: 1024px;
--breakpoint-desktop: 1280px;
--breakpoint-wide: 1920px;
```

### Mobile-First

```css
/* Base: móvil */
.element {
  font-size: var(--font-scale-sm);
  padding: var(--spacing-4);
}

/* Tablet */
@media (min-width: 768px) {
  .element {
    font-size: var(--font-scale-base);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .element {
    font-size: var(--font-scale-md);
    padding: var(--spacing-6);
  }
}
```

### Utilities Responsive

```html
<!-- Ocultar en móvil -->
<div class="hide-mobile">Solo desktop</div>

<!-- Centrar solo en móvil -->
<h1 class="text-mobile-center">Título</h1>

<!-- Grid responsive automático -->
<div class="grid grid--responsive-3">
  <!-- 1 col móvil, 2 tablet, 3 desktop -->
</div>
```

---

## Ejemplos Prácticos

### Ejemplo 1: Sección de Beneficios

```html
<section class="section section--bg-light">
  <div class="container">
    <header class="section-header section-header--center">
      <h2 class="section-label section-label--primary">BENEFICIOS</h2>
      <h3 class="section-title section-title--center">Por qué elegir SAUWA</h3>
      <p class="section-description section-description--center section-description--max-width">
        Descubre todos los beneficios de la sauna finlandesa auténtica
      </p>
    </header>

    <div class="feature-grid feature-grid--3">
      <div class="feature-item">
        <div class="feature-item__icon">
          <svg><!-- Icon --></svg>
        </div>
        <h4 class="feature-item__title">Salud</h4>
        <p class="feature-item__description">Mejora circulación</p>
      </div>
      <!-- Más features -->
    </div>
  </div>
</section>
```

### Ejemplo 2: Formulario de Contacto

```html
<form class="form">
  <div class="form-group">
    <label class="form-label">Nombre completo</label>
    <input type="text" class="form-input" placeholder="Tu nombre">
  </div>

  <div class="form-group">
    <label class="form-label">Email</label>
    <input type="email" class="form-input" placeholder="tu@email.com">
    <span class="form-helper">Te enviaremos confirmación</span>
  </div>

  <div class="form-group">
    <label class="form-label">Mensaje</label>
    <textarea class="form-input form-textarea"></textarea>
  </div>

  <button type="submit" class="btn btn--primary btn--block">Enviar</button>
</form>
```

### Ejemplo 3: Two-Column con Imagen

```html
<section class="section">
  <div class="container">
    <div class="two-column">
      <div>
        <h2 class="section-label section-label--primary">EXPERIENCIA</h2>
        <h3 class="section-title">Ritual Finlandés</h3>
        <p class="section-description">
          Vive la auténtica experiencia de sauna finlandesa
        </p>
        <button class="btn btn--primary mt-6">Reservar</button>
      </div>
      <div>
        <img src="/sauna.jpg" alt="Sauna" class="img-cover img-rounded">
      </div>
    </div>
  </div>
</section>
```

---

## Checklist de Desarrollo

### Antes de Escribir CSS

- [ ] ¿Existe una clase utilitaria para esto?
- [ ] ¿Puedo componer clases existentes?
- [ ] ¿Estoy usando variables CSS (design tokens)?
- [ ] ¿Este estilo es reutilizable o específico?

### Al Escribir CSS

- [ ] Usar variables CSS en lugar de valores hardcodeados
- [ ] Mobile-first (base móvil, desktop override)
- [ ] Nomenclatura BEM para modificadores
- [ ] Orden lógico de propiedades
- [ ] Comentarios cuando sea necesario

### Antes de Commit

- [ ] No hay duplicación de código
- [ ] Responsive funciona correctamente
- [ ] Accesibilidad validada
- [ ] Performance no degradada

---

## Próximos Pasos

1. **Leer este documento completo**
2. **Explorar archivos CSS** en `src/styles/`
3. **Ver ejemplos** en páginas refactorizadas
4. **Practicar** creando componentes con el sistema
5. **Consultar** cuando tengas dudas

---

## Recursos

- **Design Tokens**: `src/styles/design-tokens.css`
- **Utilities**: `src/styles/utilities.css`
- **Components**: `src/styles/components.css`
- **Layouts**: `src/styles/layouts.css`
- **Ejemplos**: `src/pages/es/acceso-exclusivo.astro`
- **Reporte**: `docs/REFACTORIZACION-CSS-REPORTE.md`
- **GUIDELINE**: `docs/GUIDELINE`

---

**Última actualización**: 2025-11-09
**Mantenedor**: Claude Code (Astro UX Architect)
