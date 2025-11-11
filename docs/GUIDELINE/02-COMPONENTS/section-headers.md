# Section Headers - ESTÁNDAR OBLIGATORIO

**Component:** Critical Standard
**Version:** 1.0.0
**Last Updated:** October 20, 2025
**Linear Reference:** WDA-119
**Reference Component:** BenefitsImageSection.astro
**Priority:** ⚠️ **OBLIGATORIO - TODOS LOS COMPONENTES DEBEN CUMPLIR**

---

## 🚨 ESTE ES UN ESTÁNDAR CRÍTICO

Todos los componentes de sección (excepto Hero) **DEBEN** seguir este patrón exacto para mantener:
- **Consistencia visual** en toda la aplicación
- **Jerarquía SEO** correcta (H2 → H3)
- **Identidad de marca** coherente

---

## ✅ Patrón Correcto (OBLIGATORIO)

### Estructura HTML

```html
<!-- SIEMPRE usar este patrón exacto -->
<h2 class="seo-title">Keywords SEO en español</h2>
<h3 class="main-heading">Título Principal Visual</h3>
```

### Estilos CSS Completos

```css
/* COPIAR EXACTAMENTE - NO MODIFICAR */

.seo-title {
  /* Tipografía */
  font-family: 'Helvetica Neue', 'Inter', sans-serif;
  font-size: 1rem;           /* EXACTO: 16px */
  font-weight: 300;          /* EXACTO: Light */

  /* Estilo */
  letter-spacing: 0.05em;    /* EXACTO: 0.05em */
  text-transform: uppercase; /* SIEMPRE uppercase */
  color: #DB4529;           /* EXACTO: Rojo SAUWA */

  /* Espaciado */
  margin: 0 0 1rem;         /* EXACTO: 1rem abajo */
}

.main-heading {
  /* Tipografía */
  font-family: 'Helvetica Neue', 'Inter', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.25rem); /* RESPONSIVE */
  font-weight: 200;          /* EXACTO: Thin */

  /* Estilo */
  line-height: 1.3;         /* EXACTO: 1.3 */
  color: #1a1a1a;          /* EXACTO: Casi negro */

  /* Espaciado */
  margin: 0 0 1.5rem;      /* EXACTO: 1.5rem abajo */
}
```

### Componente Astro Reutilizable

```astro
---
// SectionHeader.astro
interface Props {
  seoTitle: string;
  mainTitle: string;
}

const { seoTitle, mainTitle } = Astro.props;
---

<h2 class="seo-title">{seoTitle}</h2>
<h3 class="main-heading">{mainTitle}</h3>

<style>
  .seo-title {
    font-family: 'Helvetica Neue', 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #DB4529;
    margin: 0 0 1rem;
  }

  .main-heading {
    font-family: 'Helvetica Neue', 'Inter', sans-serif;
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 200;
    line-height: 1.3;
    color: #1a1a1a;
    margin: 0 0 1.5rem;
  }
</style>
```

### Uso del Componente

```astro
---
import SectionHeader from './SectionHeader.astro';
---

<section>
  <SectionHeader
    seoTitle="beneficios sauna"
    mainTitle="Beneficios reales respaldados por la ciencia"
  />
  <!-- Resto del contenido -->
</section>
```

### ⚠️ Caso Especial: Secciones con Fondo Marrón (#887161)

Cuando se use en secciones con fondo marrón cálido (#887161), **TODOS los textos deben ser blancos**:

```astro
---
import SectionHeader from './SectionHeader.astro';
---

<section class="brown-background">
  <SectionHeader
    seoTitle="experiencia única"
    mainTitle="Vive la experiencia SAUWA"
  />
  <!-- Resto del contenido con texto blanco -->
</section>

<style>
  .brown-background {
    background-color: #887161;
  }

  /* Sobrescribir colores para fondo marrón */
  .brown-background .seo-title {
    color: #FFFFFF;  /* Blanco en lugar de rojo */
  }

  .brown-background .main-heading {
    color: #FFFFFF;  /* Blanco en lugar de negro */
  }
</style>
```

**Regla obligatoria**: Ver [Guía de Colores - Fondo Marrón](../01-FOUNDATION/colors.md#-regla-crítica-fondo-marrón-887161)

---

## ❌ Errores Comunes (NO HACER)

### ❌ MAL: Usar solo un H2

```html
<!-- INCORRECTO -->
<h2 class="section-title">Título de la sección</h2>
```

### ❌ MAL: Invertir el orden

```html
<!-- INCORRECTO -->
<h3>Título grande</h3>
<h2>Subtítulo pequeño</h2>
```

### ❌ MAL: Modificar los estilos

```css
/* INCORRECTO - No cambiar valores */
.seo-title {
  font-size: 1.2rem;      /* MAL: Debe ser 1rem */
  font-weight: 400;       /* MAL: Debe ser 300 */
  color: #BA2515;        /* MAL: Debe ser #DB4529 */
  text-transform: none;   /* MAL: Debe ser uppercase */
}
```

### ❌ MAL: Usar otras clases

```html
<!-- INCORRECTO -->
<h2 class="phase-title">Título</h2>
<h3 class="section-heading">Subtítulo</h3>
```

---

## 🎯 Ejemplos Visuales

### Renderizado Correcto

```
BENEFICIOS SAUNA                    <- Pequeño, rojo, uppercase (H2)
Beneficios reales respaldados        <- Grande, negro, elegante (H3)
por la ciencia

Lorem ipsum dolor sit amet...        <- Texto normal del contenido
```

### Jerarquía Visual

```
┌─────────────────────────────────────┐
│ H2: SEO KEYWORDS (16px, #DB4529)   │  ← Contexto SEO
│                                     │
│ H3: Título Visual Principal        │  ← Foco visual
│     (28-36px, #1a1a1a)            │
│                                     │
│ Contenido de la sección...         │  ← Información
└─────────────────────────────────────┘
```

---

## 📊 Estado de Cumplimiento Actual

### ✅ Componentes que CUMPLEN

| Componente | Ubicación | Estado | Notas |
|------------|-----------|--------|-------|
| **BenefitsImageSection** | `/src/components/BenefitsImageSection.astro` | ✅ Perfecto | Implementación de referencia |
| **BenefitsList** | `/src/components/BenefitsList.astro` | ✅ Correcto | Sigue el estándar |

### ❌ Componentes que NO CUMPLEN

| Componente | Ubicación | Problemas | Acción Requerida |
|------------|-----------|-----------|------------------|
| **SessionPhases** | `/src/components/SessionPhases.astro` | 6 errores CSS | Ver correcciones detalladas abajo |
| **CTANewsletter** | `/src/components/CTANewsletter.astro` | 6 errores CSS | Ver correcciones detalladas abajo |
| **ExperienceSection** | `/src/components/ExperienceSection.astro` | Estructura incorrecta | Reescribir HTML + CSS |

---

## 🔧 Correcciones Específicas Requeridas

### SessionPhases.astro

**Líneas a modificar:**

```css
/* CAMBIAR DE (líneas 117-125): */
.phase-title {
  font-size: 1.25rem;        /* ❌ */
  font-weight: 500;          /* ❌ */
  letter-spacing: 0.08em;    /* ❌ */
  text-transform: none;      /* ❌ */
  color: #BA2515;           /* ❌ */
  margin: 0 0 0.5rem;       /* ❌ */
}

/* A: */
.seo-title {
  font-size: 1rem;          /* ✅ */
  font-weight: 300;         /* ✅ */
  letter-spacing: 0.05em;   /* ✅ */
  text-transform: uppercase; /* ✅ */
  color: #DB4529;          /* ✅ */
  margin: 0 0 1rem;        /* ✅ */
}
```

### CTANewsletter.astro

**Líneas a modificar:**

```css
/* CAMBIAR DE (líneas 79-86): */
.newsletter-title {
  font-family: 'Avenir Next';  /* ❌ Debe ser Helvetica */
  font-size: 1.125rem;         /* ❌ */
  font-weight: 400;            /* ❌ */
  text-transform: none;        /* ❌ */
  color: #406E51;             /* ❌ */
  margin: 0 0 0.75rem;        /* ❌ */
}

/* A los estilos estándar mostrados arriba */
```

### ExperienceSection.astro

**Requiere restructuración completa:**

1. Cambiar estructura HTML de un solo H2 a patrón H2+H3
2. Aplicar clases `.seo-title` y `.main-heading`
3. Ajustar todos los estilos CSS

---

## ✅ Checklist de Auditoría

Para cada componente de sección, verificar:

- [ ] **Estructura HTML**
  - [ ] ¿Usa el patrón H2 + H3?
  - [ ] ¿H2 está antes que H3?
  - [ ] ¿No hay saltos de nivel (H2 → H4)?

- [ ] **Clases CSS**
  - [ ] ¿H2 tiene clase `.seo-title`?
  - [ ] ¿H3 tiene clase `.main-heading`?
  - [ ] ¿No usa clases personalizadas?

- [ ] **Estilos H2 (seo-title)**
  - [ ] ¿Font: Helvetica Neue?
  - [ ] ¿Size: exactamente 1rem?
  - [ ] ¿Weight: exactamente 300?
  - [ ] ¿Color: exactamente #DB4529?
  - [ ] ¿Transform: uppercase?
  - [ ] ¿Letter-spacing: 0.05em?

- [ ] **Estilos H3 (main-heading)**
  - [ ] ¿Font: Helvetica Neue?
  - [ ] ¿Size: clamp(1.75rem, 3vw, 2.25rem)?
  - [ ] ¿Weight: exactamente 200?
  - [ ] ¿Color: exactamente #1a1a1a?
  - [ ] ¿Line-height: 1.3?

- [ ] **Espaciado**
  - [ ] ¿Margin H2: 0 0 1rem?
  - [ ] ¿Margin H3: 0 0 1.5rem?

---

## 📋 DO's and DON'Ts

### ✅ DO's

- **DO** usar exactamente las clases `.seo-title` y `.main-heading`
- **DO** mantener el orden H2 → H3 siempre
- **DO** copiar los estilos exactos sin modificación
- **DO** incluir keywords SEO relevantes en el H2
- **DO** hacer el H3 más descriptivo y visual
- **DO** usar el componente SectionHeader.astro cuando sea posible

### ❌ DON'Ts

- **DON'T** cambiar ningún valor de los estilos
- **DON'T** usar otras clases o nombres personalizados
- **DON'T** saltar niveles de encabezado
- **DON'T** invertir el orden H3 → H2
- **DON'T** omitir el H2 para SEO
- **DON'T** usar font-weight mayor a 300 en H2
- **DON'T** cambiar los colores de marca

---

## 🔍 Análisis Técnico Completo (Context Manager)

### Tabla Comparativa Detallada

| Propiedad CSS | BenefitsImageSection ✅ | SessionPhases ❌ | CTANewsletter ❌ | ExperienceSection ❌ |
|---------------|-------------------------|------------------|------------------|---------------------|
| **H2 - font-family** | Helvetica Neue | Helvetica Neue | Avenir Next ❌ | N/A |
| **H2 - font-size** | 1rem ✅ | 1.25rem ❌ | 1.125rem ❌ | N/A |
| **H2 - font-weight** | 300 ✅ | 500 ❌ | 400 ❌ | N/A |
| **H2 - color** | #DB4529 ✅ | #BA2515 ❌ | #406E51 ❌ | N/A |
| **H2 - text-transform** | uppercase ✅ | none ❌ | none ❌ | N/A |
| **H2 - letter-spacing** | 0.05em ✅ | 0.08em ❌ | normal ❌ | N/A |
| **H2 - margin** | 0 0 1rem ✅ | 0 0 0.5rem ❌ | 0 0 0.75rem ❌ | N/A |
| **H3 - font-family** | Helvetica Neue | Helvetica Neue | Helvetica Neue | Helvetica Neue |
| **H3 - font-size** | clamp() ✅ | 2rem ❌ | 1.75rem ❌ | 2.5rem ❌ |
| **H3 - font-weight** | 200 ✅ | 300 ❌ | 200 ✅ | 100 ❌ |
| **H3 - line-height** | 1.3 ✅ | 1.2 ❌ | 1.25 ❌ | 1.2 ❌ |
| **H3 - color** | #1a1a1a ✅ | #1a1a1a ✅ | #1a1a1a ✅ | #333 ❌ |

### Informe de Inconsistencias

1. **SessionPhases.astro**
   - Clase incorrecta: `.phase-title` en lugar de `.seo-title`
   - 6 propiedades CSS incorrectas en H2
   - Font-size del H3 no usa clamp()

2. **CTANewsletter.astro**
   - Usa Avenir Next en H2 (debe ser Helvetica)
   - Color incorrecto: verde en lugar de rojo
   - Sin text-transform uppercase

3. **ExperienceSection.astro**
   - No tiene estructura H2+H3
   - Solo usa un H2 sin H3 complementario
   - Necesita restructuración completa

---

## 🚀 Plan de Acción

### Prioridad Alta (Hacer Inmediatamente)

1. **SessionPhases.astro** - Cambiar 6 propiedades CSS
2. **CTANewsletter.astro** - Cambiar font-family y 5 propiedades CSS
3. **ExperienceSection.astro** - Restructurar HTML completo

### Prioridad Media

4. Crear componente `SectionHeader.astro` reutilizable
5. Refactorizar todos los componentes para usar `SectionHeader`
6. Añadir tests visuales para verificar consistencia

### Prioridad Baja

7. Documentar en Storybook los patrones de títulos
8. Crear linter rules para validar estructura H2+H3

---

## 📚 Referencias

- [Typography Guidelines](../01-FOUNDATION/typography.md)
- [Color Guidelines - Combinaciones y Contraste](../01-FOUNDATION/colors.md#-combinaciones-de-color-y-reglas-de-contraste) - **IMPORTANTE: Ver regla de fondo marrón #887161**
- [BenefitsImageSection.astro](../../../src/components/BenefitsImageSection.astro) - Implementación de referencia
- [WCAG 2.1 - Heading Hierarchy](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)
- [SEO Best Practices - H2/H3 Structure](https://developers.google.com/search/docs/appearance/title-link)

---

## 🛠 Herramientas de Validación

```bash
# Script para validar componentes
grep -r "class=\"seo-title\"" src/components/
grep -r "class=\"main-heading\"" src/components/

# Verificar jerarquía de encabezados
grep -A 1 "<h2" src/components/*.astro | grep "<h3"
```

---

**⚠️ RECORDATORIO FINAL:** Este es un estándar OBLIGATORIO. Todos los componentes deben cumplirlo antes del deploy a producción.