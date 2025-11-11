# Plan de Refactorización CSS - Proyecto SAUWA

## Objetivo

Establecer un sistema de diseño CSS consistente y mantenible que permita cambios globales eficientes y elimine la duplicación de código.

## Estrategia: Atomic Design + BEM + CSS Custom Properties

### Principios Fundamentales

1. **DRY (Don't Repeat Yourself)**: Cada estilo definido una sola vez
2. **Single Source of Truth**: Variables CSS como fuente única
3. **Composición sobre herencia**: Clases utilitarias combinables
4. **Escalabilidad**: Sistema que crece sin romper

## Fase 1: Preparación (Día 1)

### 1.1 Crear Sistema de Variables CSS Mejorado

```css
/* src/styles/design-tokens.css */
:root {
  /* =========================
     COLORES
     ========================= */
  /* Primarios */
  --color-primary: #BA2515;      /* Rojo SAUWA */
  --color-primary-hover: #DB4529; /* Naranja SAUWA */

  /* B2B/Partners */
  --color-b2b: #406E51;           /* Verde Partners */
  --color-b2b-hover: #4a7e5c;

  /* Neutros */
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #636464;
  --color-bg-light: #f4f4f4;
  --color-bg-white: #ffffff;

  /* =========================
     TIPOGRAFÍA - Sistema Modular
     ========================= */
  /* Familias */
  --font-family-primary: 'Helvetica Neue', 'Inter', sans-serif;
  --font-family-secondary: 'Avenir Next', 'Avenir', system-ui, sans-serif;

  /* Escalas - Fluid Typography */
  --font-scale-xxs: clamp(0.875rem, 0.8vw + 0.8rem, 1rem);      /* 14-16px */
  --font-scale-xs: clamp(0.9375rem, 0.9vw + 0.85rem, 1.0625rem); /* 15-17px */
  --font-scale-sm: clamp(1rem, 1vw + 0.9rem, 1.125rem);          /* 16-18px */
  --font-scale-base: clamp(1.125rem, 1.2vw + 1rem, 1.25rem);     /* 18-20px */
  --font-scale-md: clamp(1.25rem, 1.4vw + 1.1rem, 1.5rem);       /* 20-24px */
  --font-scale-lg: clamp(1.5rem, 2vw + 1.2rem, 2rem);            /* 24-32px */
  --font-scale-xl: clamp(1.75rem, 2.5vw + 1.4rem, 2.5rem);       /* 28-40px */
  --font-scale-2xl: clamp(2rem, 3vw + 1.5rem, 3rem);             /* 32-48px */

  /* Pesos */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* =========================
     ESPACIADO - Sistema 8pt
     ========================= */
  --spacing-0: 0;
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 0.75rem;  /* 12px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-5: 1.5rem;   /* 24px */
  --spacing-6: 2rem;     /* 32px */
  --spacing-8: 3rem;     /* 48px */
  --spacing-10: 4rem;    /* 64px */
  --spacing-12: 5rem;    /* 80px */

  /* =========================
     COMPONENTES
     ========================= */
  --radius-sm: 4px;
  --radius-base: 8px;
  --radius-lg: 12px;

  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-base: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15);

  --transition-fast: 200ms ease-out;
  --transition-base: 300ms ease-out;
  --transition-slow: 600ms ease-out;
}
```

### 1.2 Crear Clases Utilitarias Base

```css
/* src/styles/utilities.css */

/* =========================
   TÍTULOS DE SECCIÓN
   ========================= */
.section-label {
  font-family: var(--font-family-primary);
  font-size: var(--font-scale-xs);
  font-weight: var(--font-weight-regular);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0 0 var(--spacing-4);
}

.section-label--primary { color: var(--color-primary); }
.section-label--b2b { color: var(--color-b2b); }
.section-label--white { color: white; }
.section-label--dark { color: var(--color-text-primary); }

/* =========================
   ENCABEZADOS
   ========================= */
.section-title {
  font-family: var(--font-family-primary);
  font-size: var(--font-scale-xl);
  font-weight: var(--font-weight-light);
  line-height: 1.3;
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-5);
}

.section-title--white { color: white; }
.section-title--center { text-align: center; }

/* =========================
   TEXTO DESCRIPTIVO
   ========================= */
.section-description {
  font-family: var(--font-family-secondary);
  font-size: var(--font-scale-base);
  font-weight: var(--font-weight-light);
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0;
}

.section-description--white { color: rgba(255, 255, 255, 0.9); }
.section-description--center { text-align: center; }
.section-description--max-width {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

/* =========================
   CONTENEDORES
   ========================= */
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-5);
}

.container--narrow { max-width: 1200px; }
.container--wide { max-width: 1600px; }

.section {
  padding: var(--spacing-12) 0;
}

.section--compact { padding: var(--spacing-10) 0; }
.section--spacious { padding: var(--spacing-12) 0 var(--spacing-10); }

/* =========================
   MODIFICADORES RESPONSIVE
   ========================= */
@media (max-width: 767px) {
  .section {
    padding: var(--spacing-8) 0;
  }

  .container {
    padding: 0 var(--spacing-4);
  }

  .section-title {
    font-size: var(--font-scale-lg);
    margin-bottom: var(--spacing-4);
  }

  .section-description {
    font-size: var(--font-scale-sm);
  }
}
```

## Fase 2: Migración de Componentes (Días 2-3)

### 2.1 Template de Componente Refactorizado

**ANTES** (Componente con estilos inline):
```astro
<!-- SelectionProcess.astro ANTES -->
<style>
  .partners-selection__title {
    font-family: 'Helvetica Neue', 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #406E51;
    margin: 0 0 1rem;
  }

  .partners-selection__subtitle {
    font-family: 'Helvetica Neue', 'Inter', sans-serif;
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 300;
    line-height: 1.3;
    color: #1a1a1a;
    margin: 0 0 1.5rem;
  }
</style>
```

**DESPUÉS** (Usando clases utilitarias):
```astro
<!-- SelectionProcess.astro DESPUÉS -->
<section class="section section--compact bg-gradient-light">
  <div class="container container--narrow">
    <header class="text-center mb-10">
      <h2 class="section-label section-label--b2b">{title}</h2>
      <h3 class="section-title section-title--center">{subtitle}</h3>
      <p class="section-description section-description--center section-description--max-width">
        {intro}
      </p>
    </header>

    <!-- Contenido específico del componente -->
    <div class="selection-grid">
      <!-- Solo estilos específicos de este componente -->
    </div>
  </div>
</section>

<style>
  /* SOLO estilos específicos del componente que no son reutilizables */
  .selection-grid {
    display: grid;
    gap: var(--spacing-6);
    /* ... estilos únicos de este componente */
  }

  .bg-gradient-light {
    background: linear-gradient(180deg, var(--color-bg-light) 0%, var(--color-bg-white) 100%);
  }
</style>
```

### 2.2 Orden de Migración

1. **Componentes globales** (Mayor impacto):
   - `NavbarScroll.astro`
   - `FooterBlack.astro`
   - `NewsletterForm.astro`

2. **Componentes de sección**:
   - `SessionPhases.astro`
   - `BenefitsSection.astro`
   - `CTANewsletter.astro`

3. **Páginas**:
   - `/es/acceso-exclusivo.astro`
   - `/es/trabaja-con-nosotros.astro`
   - Resto de páginas

## Fase 3: Limpieza y Optimización (Día 4)

### 3.1 Eliminar Código Muerto

```bash
# Script para encontrar clases CSS no utilizadas
npx purgecss --css ./dist/**/*.css --content ./dist/**/*.html --output ./dist/css/
```

### 3.2 Consolidar Archivos CSS

```css
/* src/styles/main.css */
@import './design-tokens.css';
@import './utilities.css';
@import './components.css';
@import './layouts.css';
```

### 3.3 Configurar PostCSS

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-custom-properties')({
      preserve: false
    }),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    })
  ]
}
```

## Fase 4: Documentación y Entrenamiento (Día 5)

### 4.1 Crear Guía de Estilos

```markdown
# Guía de Estilos SAUWA

## Convenciones de Nomenclatura

### Clases Utilitarias
- `section-*` : Elementos de estructura de sección
- `text-*` : Modificadores de texto
- `bg-*` : Fondos
- `color-*` : Colores

### Modificadores BEM
- `--primary` : Variante principal (rojo)
- `--b2b` : Variante partners (verde)
- `--white` : Variante blanca
- `--center` : Centrado
```

### 4.2 Componente de Ejemplo Documentado

```astro
---
/**
 * SectionHeader Component
 *
 * @param {string} label - Texto pequeño superior (opcional)
 * @param {string} title - Título principal
 * @param {string} description - Descripción (opcional)
 * @param {'primary' | 'b2b' | 'white'} variant - Variante de color
 * @param {boolean} centered - Centrar contenido
 *
 * @example
 * <SectionHeader
 *   label="EXPERIENCIA SAUWA"
 *   title="Descubre el auténtico ritual finlandés"
 *   description="Una experiencia de bienestar única en Andorra"
 *   variant="primary"
 *   centered
 * />
 */

interface Props {
  label?: string;
  title: string;
  description?: string;
  variant?: 'primary' | 'b2b' | 'white';
  centered?: boolean;
}

const {
  label,
  title,
  description,
  variant = 'primary',
  centered = false
} = Astro.props;

const labelClass = `section-label section-label--${variant}`;
const titleClass = `section-title${centered ? ' section-title--center' : ''}`;
const descClass = `section-description${centered ? ' section-description--center section-description--max-width' : ''}`;
---

<header class="section-header">
  {label && <h2 class={labelClass}>{label}</h2>}
  <h3 class={titleClass}>{title}</h3>
  {description && <p class={descClass}>{description}</p>}
</header>

<style>
  .section-header {
    margin-bottom: var(--spacing-8);
  }
</style>
```

## Checklist de Implementación

### Día 1
- [ ] Crear `design-tokens.css`
- [ ] Crear `utilities.css`
- [ ] Configurar PostCSS
- [ ] Actualizar `global.css` para importar nuevos archivos

### Día 2-3
- [ ] Migrar componente `NavbarScroll`
- [ ] Migrar componente `FooterBlack`
- [ ] Migrar componente `NewsletterForm`
- [ ] Migrar componentes de sección
- [ ] Actualizar páginas problemáticas

### Día 4
- [ ] Ejecutar PurgeCSS
- [ ] Consolidar archivos CSS
- [ ] Optimizar bundle final
- [ ] Testear en todos los breakpoints

### Día 5
- [ ] Documentar sistema en `/docs/CSS-ARCHITECTURE.md`
- [ ] Actualizar `/docs/GUIDELINE`
- [ ] Crear ejemplos de componentes
- [ ] Session de entrenamiento con equipo

## Métricas de Validación

### Antes de la Refactorización
- Líneas de CSS: ~3,500
- Archivos CSS: 15+
- Duplicación: 40%
- Tamaño bundle: 85KB

### Objetivo Post-Refactorización
- Líneas de CSS: < 2,000 (-43%)
- Archivos CSS: 5
- Duplicación: < 5%
- Tamaño bundle: < 50KB (-41%)

## Riesgos y Mitigación

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Regresiones visuales | Media | Alto | Testing visual automatizado |
| Resistencia del equipo | Baja | Medio | Documentación y ejemplos claros |
| Conflictos con PRs activos | Alta | Bajo | Coordinar con equipo, merge frecuente |
| Performance degradada | Baja | Alto | Benchmarks antes/después |

## Herramientas Recomendadas

1. **CSS Stats**: Para analizar CSS actual
2. **PurgeCSS**: Para eliminar CSS no utilizado
3. **Stylelint**: Para mantener consistencia
4. **Percy/Chromatic**: Para visual regression testing
5. **Bundle Analyzer**: Para analizar tamaño final

## Conclusión

Este plan de refactorización transformará el sistema CSS de SAUWA de un conjunto fragmentado de estilos a un sistema de diseño cohesivo y mantenible. La inversión de 5 días resultará en:

- **50% menos tiempo** en futuros cambios de estilo
- **Consistencia visual** garantizada
- **Onboarding más rápido** para nuevos desarrolladores
- **Mejor performance** del sitio

---

**Próximo Paso**: Aprobar plan y comenzar con Fase 1 inmediatamente.

**Fecha de Inicio Propuesta**: 2025-11-11
**Fecha de Finalización Estimada**: 2025-11-15