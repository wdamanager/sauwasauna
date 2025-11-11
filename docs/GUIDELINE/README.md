# SAUWA Design System

**Version:** 2.0.0
**Last Updated:** November 9, 2025
**Project:** sauwasauna.com
**Linear:** [WDA-98](https://linear.app/wdamanage/issue/WDA-98), [WDA-119](https://linear.app/wdamanage/issue/WDA-119), [WDA-531](https://linear.app/wdamanage/issue/WDA-531)

---

## 🎯 Purpose

This Design System serves as the single source of truth for SAUWA's visual design and development standards. It ensures consistency, scalability, and maintainability across all digital touchpoints.

## 🚨 CRITICAL UPDATE: CSS Architecture Refactored

**Major changes after WDA-531 incident:**
- Consolidated CSS architecture to prevent style duplication
- Mandatory use of global utility classes
- Strict variable-only approach for values

**Required Reading Before Development:**
1. [CSS Architecture](/docs/architecture/css-architecture.md) - Complete system overview
2. [CSS Best Practices](/docs/best-practices/css-best-practices.md) - Implementation rules
3. [Common Pitfalls](/docs/best-practices/common-pitfalls.md) - Mistakes to avoid
4. [Testing Checklist](/docs/workflows/testing-checklist.md) - Pre-commit validation

## 🔴 ESTÁNDARES CRÍTICOS (OBLIGATORIO)

### ⚠️ Estos estándares son OBLIGATORIOS y deben cumplirse en TODOS los componentes:

- **[SECTION HEADERS](02-COMPONENTS/section-headers.md)** 🚨 **PATRÓN H2+H3 OBLIGATORIO** - Todos los títulos de sección DEBEN seguir este estándar
- **[Typography](01-FOUNDATION/typography.md)** - Sistema tipográfico con **sección obligatoria de títulos**
- **[Colors](01-FOUNDATION/colors.md)** - Paleta de marca (no modificar valores hex)

> **IMPORTANTE:** Revisar [Section Headers](02-COMPONENTS/section-headers.md) ANTES de crear o modificar cualquier componente de sección.

---

## 📚 Quick Navigation

### 01 - Foundation
Core design tokens and principles that form the basis of the system.

- **[Colors](01-FOUNDATION/colors.md)** - Brand palette and usage guidelines
- **[Typography](01-FOUNDATION/typography.md)** - Font system and text styles
- **[Spacing](01-FOUNDATION/spacing.md)** - Spacing scale and grid system
- **[Grid & Breakpoints](01-FOUNDATION/grid.md)** - Responsive layout system

### 02 - Components
Reusable UI components with implementation details.

- **[Section Headers](02-COMPONENTS/section-headers.md)** ⚠️ **CRÍTICO** - Patrón H2+H3 obligatorio para todas las secciones
- **[Buttons](02-COMPONENTS/buttons.md)** - Primary, secondary, and special CTAs
- **[Cards](02-COMPONENTS/cards.md)** - Content containers and layouts
- **[Forms](02-COMPONENTS/forms.md)** - Input fields, validation, and forms
- **[Navigation](02-COMPONENTS/navigation.md)** - Headers, menus, and links
- **[Media](02-COMPONENTS/media.md)** - Images, icons, and sliders

### 03 - Patterns
Design patterns and interaction principles.

- **[Animations](03-PATTERNS/animations.md)** - Transitions and micro-interactions
- **[Effects](03-PATTERNS/effects.md)** - Shadows, overlays, and filters
- **[Responsive](03-PATTERNS/responsive.md)** - Adaptive behavior guidelines
- **[Accessibility](03-PATTERNS/accessibility.md)** - WCAG 2.1 AA standards

### 04 - Examples
Ready-to-use code snippets and compositions.

- **[Hero Sections](04-EXAMPLES/hero-section.md)** - Landing page heroes
- **[Content Sections](04-EXAMPLES/content-sections.md)** - Layout patterns
- **[Code Snippets](04-EXAMPLES/code-snippets.md)** - Copy-paste components

---

## 🚀 Getting Started

### ⚠️ PRIMERO: Revisar Estándares Críticos

**ANTES de crear o modificar cualquier componente:**
1. **[Section Headers](02-COMPONENTS/section-headers.md)** - OBLIGATORIO para todos los títulos
2. **[Typography](01-FOUNDATION/typography.md#estándar-obligatorio-títulos-de-sección)** - Ver sección obligatoria

### For Developers

1. **Review Critical Standards** - PRIMERO [Section Headers](02-COMPONENTS/section-headers.md) ⚠️
2. **Review Foundation** - Start with [Colors](01-FOUNDATION/colors.md) and [Typography](01-FOUNDATION/typography.md)
3. **Use Components** - Copy code from [Components](02-COMPONENTS/) section
4. **Apply Patterns** - Follow guidelines in [Patterns](03-PATTERNS/)
5. **Test Accessibility** - Validate with [WCAG guidelines](03-PATTERNS/accessibility.md)

### For Designers

1. **Understand the System** - Review all Foundation documents
2. **Use Brand Assets** - Follow color and typography guidelines
3. **Maintain Consistency** - Reference existing components before creating new ones
4. **Document Changes** - Update this guide when introducing new patterns

---

## 🎨 Design Principles

### 1. Ultra-Light Aesthetic
- Thin typography weights (100-300)
- Subtle shadows and effects
- Generous white space
- Minimal visual noise

### 2. Nordic Minimalism
- Clean, functional design
- Natural color palette
- Focus on content
- Purposeful animations

### 3. Premium Experience
- Smooth transitions
- High-quality imagery
- Refined interactions
- Attention to detail

### 4. Accessibility First
- WCAG 2.1 AA compliance
- High contrast ratios
- Keyboard navigation
- Screen reader support

---

## 🏗 Tech Stack

### Frameworks & Libraries
- **Frontend:** Astro (SSG)
- **Styling:** Tailwind CSS
- **Components:** Vanilla Astro Components
- **Fonts:** Self-hosted WOFF2

### Design Tokens
```css
/* Colors */
--sauwa-red: #BA2515;      /* Primary brand */
--sauwa-orange: #DB4529;   /* Accent/hover */
--sauwa-green: #406E51;    /* Secondary */
--sauwa-brown: #897162;    /* Tertiary */
--sauwa-gray: #636464;     /* Neutral */

/* Typography */
--font-helvetica: 'Helvetica Neue', 'Inter', sans-serif;
--font-avenir: 'Avenir Next', 'Nunito Sans', sans-serif;

/* Spacing (rem) */
--spacing-xs: 0.5;    /* 8px */
--spacing-sm: 1;      /* 16px */
--spacing-md: 1.5;    /* 24px */
--spacing-lg: 2;      /* 32px */
--spacing-xl: 3;      /* 48px */
--spacing-2xl: 4;     /* 64px */
--spacing-3xl: 5;     /* 80px */
```

---

## 📋 Component Status

| Component | Status | Documentation | Code Examples | Priority |
|-----------|--------|--------------|---------------|----------|
| **Section Headers** | ⚠️ **CRÍTICO** | [View](02-COMPONENTS/section-headers.md) | Yes | **HIGH** |
| **Buttons** | ✅ Complete | [View](02-COMPONENTS/buttons.md) | Yes | Normal |
| **Cards** | ✅ Complete | [View](02-COMPONENTS/cards.md) | Yes | Normal |
| **Forms** | ✅ Complete | [View](02-COMPONENTS/forms.md) | Yes | Normal |
| **Typography** | ✅ Complete | [View](01-FOUNDATION/typography.md) | Yes | High |
| **Colors** | ✅ Complete | [View](01-FOUNDATION/colors.md) | Yes | High |
| **Navigation** | 🚧 In Progress | [View](02-COMPONENTS/navigation.md) | Partial | Normal |
| **Media** | 🚧 In Progress | [View](02-COMPONENTS/media.md) | Partial | Normal |
| **Animations** | ✅ Complete | [View](03-PATTERNS/animations.md) | Yes | Normal |

---

## 🔄 Version History

### v1.1.0 (October 20, 2025)
- **CRÍTICO:** Documentación obligatoria de Section Headers (patrón H2+H3)
- Actualización de Typography con estándares obligatorios
- Sección de estándares críticos en README principal
- Checklist de auditoría para títulos de sección

### v1.0.0 (October 20, 2025)
- Initial Design System documentation
- Complete Foundation guidelines
- Core component documentation
- Accessibility standards defined

### Planned Updates
- v1.1.0 - Additional component patterns
- v1.2.0 - Dark mode support
- v1.3.0 - Mobile-first components

---

## 🤝 Contributing

### How to Update
1. Create a new branch from `main`
2. Make your changes following existing patterns
3. Update relevant documentation
4. Submit PR with clear description
5. Request review from design team

### Documentation Standards
- Use clear, technical language
- Include code examples
- Add visual references where helpful
- Maintain consistent formatting
- Update version history

---

## 📞 Support

**Design Lead:** [Contact via Linear]
**Tech Lead:** Moisés
**Project:** [SAUWA on Linear](https://linear.app/wdamanage/project/sauwasaunacom-44379947aed1)

---

## 📄 License

© 2025 SAUWA. All rights reserved.
This Design System is proprietary and confidential.