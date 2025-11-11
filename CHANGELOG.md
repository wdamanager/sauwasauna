# Changelog

All notable changes to the SAUWA project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Dynamic Sitemap.xml for SEO** (WDA-555, 2025-11-11): Implemented runtime sitemap generation
  - Runtime generation with WordPress GraphQL integration
  - Combines static pages (7 pages × 4 locales = 28 URLs) with dynamic blog posts
  - Fetches posts from WordPress using `GET_ALL_POSTS_FOR_SITEMAP` query
  - Filters out posts with `metaRobotsNoindex` SEO setting
  - Multi-language support (es, ca, en, fr) with proper URL structure
  - Total 52 URLs: 28 static pages + 24 blog posts (6 posts × 4 locales)
  - 1-hour cache headers for performance optimization
  - Graceful fallback to static URLs if WordPress fails
  - Valid XML per sitemap 0.9 specification
  - robots.txt pointing to sitemap at https://sauwasauna.com/sitemap.xml
  - Files: `src/pages/sitemap.xml.js`, `src/pages/robots.txt.js`, `src/lib/wordpress/queries.js`
- **CSS Architecture Overhaul** (WDA-531): Complete refactoring of CSS system
  - New modular CSS architecture with design tokens, utilities, and components
  - Comprehensive documentation structure in `/docs/`
  - Mandatory CSS best practices and testing checklist
  - Prevention system for style duplication issues
- **Partners Hoteleros - Card "Viabilidad logística" restaurada** (2025-11-11):
  - Card visible en las 4 idiomas (ES/CA/EN/FR)
  - Texto actualizado enfocado en estándares de calidad y comodidad

### Changed
- **Documentation Restructure** (2025-11-09):
  - Created `/docs/architecture/` for system architecture docs
  - Created `/docs/best-practices/` for development guidelines
  - Created `/docs/workflows/` for development processes
  - Moved historical docs to `/docs/history/`
  - Updated GUIDELINE to version 2.0.0 with CSS architecture references
  - Added CRITICAL RULES section to CLAUDE.md (impossible to ignore)
- **Menú de navegación actualizado** (2025-11-11):
  - "Acceso Exclusivo" → "Partners Hoteleros" (ES)
  - "Accés exclusiu" → "Socis Hotelers" (CA)
  - "Exclusive access" → "Hotel Partners" (EN)
  - "Accès exclusif" → "Partenaires Hôteliers" (FR)
- **Hero video poster image unificada** (2025-11-11):
  - Nueva imagen: `/images/sauwa-sauna-en-andorra.webp`
  - Fallback PNG: `/images/sauwa-sauna-en-andorra.png`
  - Aplicado tanto a HTML poster como JavaScript fallback

### Fixed
- **CSS Duplication Issue** (WDA-531): Global style changes now apply consistently
  - Eliminated 40% code duplication across components
  - Replaced hardcoded values with CSS variables
  - Consolidated typography and spacing systems
  - Fixed inconsistent styling between pages
- **Mobile Margin Consistency** (WDA-535): Unified horizontal padding across all mobile sections
  - Standard mobile padding: 20px (`--container-padding-mobile`)
  - Applied consistently to: BenefitsImageSection, SessionPhases, BenefitsList, NewsletterForm, FooterBlack
  - Replaced hardcoded values (16px, 24px) with CSS variable
  - Tested across 320px - 768px viewports
  - Perfect visual consistency on all mobile devices
- **Safari 18.1 video autoplay fix** (2025-11-11):
  - Implementado fallback inteligente para Safari macOS Sequoia
  - Video poster se mantiene visible cuando Safari bloquea autoplay
  - Eliminado fondo negro y controles nativos feos
  - Retry con exponential backoff (4 intentos)
  - Activación por user interaction (click/touch/scroll)
  - WebP con fallback PNG en poster estático
  - MP4 fallback agregado para Safari antiguo
  - `preload="auto"` para mejor compatibilidad Safari 18.1
  - Graceful degradation: poster estático profesional si autoplay bloqueado

### Documentation
- [CSS Architecture](/docs/architecture/css-architecture.md) - Complete CSS system design
- [CSS Best Practices](/docs/best-practices/css-best-practices.md) - Implementation rules
- [Common Pitfalls](/docs/best-practices/common-pitfalls.md) - Documented past mistakes
- [Testing Checklist](/docs/workflows/testing-checklist.md) - Pre-commit validation

### To Do
- Sistema de reservas inteligente
- Integración con pasarela de pago (Stripe/Redsys)
- Check-in digital con QR
- Asistente IA 24/7
- Panel de gestión completo
- **CRÍTICO**: Implementar refactorización CSS completa (5 días estimados)

## [0.3.0] - 2025-10-31

### Added
- **Páginas nuevas** (WDA-315, WDA-320):
  - "Trabaja con nosotros" - página de empleo con formularios completos
  - "Acceso Exclusivo" - página de acceso especial con formularios
- **SEO mejorado**: Imagen OG para redes sociales implementada

### Fixed
- Restaurado sticky positioning en secciones clave
- Unificado background color en blog section para consistencia visual
- Corregido comportamiento de navegación móvil al hacer clic en enlaces

## [0.2.0] - 2025-10-30

### Added
- **Sistema de navegación móvil completo** (WDA-314):
  - Hamburger menu funcional
  - Sidebar responsive con navegación completa
  - Auto-cierre de sidebar al navegar
  - Logos adaptados para diferentes tamaños de pantalla
- **Mejoras UI globales** (WDA-313):
  - Font-weights aplicados consistentemente
  - Sistema de tipografía unificado

### Fixed
- **Home page optimizaciones** (WDA-312):
  - SVG rendering en Safari corregido
  - Espaciado y layout mejorado
  - Tipografía refinada
- Altura del hero en dispositivos móviles
- Posicionamiento del hamburger menu

## [0.1.2] - 2025-10-24

### Changed
- **Reorganización completa de estructura** del proyecto:
  - Separación clara entre `/astro` y `/wp-plugin`
  - Estructura de carpetas más limpia y mantenible
  - Documentación reorganizada

### Added
- Análisis de blog móvil documentado
- Implementación de cookie banner planificada

## [0.1.1] - 2025-10-23

### Added
- **Newsletter unificado** (WDA-99):
  - Componente de formulario newsletter integrado con backend
  - Validación y manejo de errores
  - Integración con WordPress GraphQL

### Fixed
- **Blog móvil mejorado** (WDA-295):
  - Botón "Sesión de SAUWA" ancho completo en móvil
  - Márgenes y espaciados consistentes
  - Jerarquía h1/h2 corregida
  - Gap blanco en navbar eliminado
- Trailing slashes en URLs
- Diseño de blog cards restaurado
- Position sticky funcionando correctamente
- Espaciado móvil en botón "Ver más"

## [0.1.0] - 2025-10-22

### Added
- **Blog section completa** (WDA-298, WDA-272):
  - Carousel de categorías implementado
  - Estilos GUIDELINE aplicados
  - Integración con WordPress para contenido dinámico
- **Footer actualizado** (WDA-268):
  - Enlaces a redes sociales
  - Información de contacto
  - Enlaces legales

### Changed
- Mejoras significativas en versión móvil (WDA-295)

## [0.0.2] - 2025-10-20

### Added
- **Landing page features**:
  - Sección de fases de sesión SAUWA
  - CTA newsletter integrado
  - Cliente GraphQL para WordPress
  - Sección 50/50 imagen + beneficios (WDA-267)
  - Sticky scroll benefits (WDA-266)
  - Blog carousel inicial

## [0.0.1] - 2025-10-19

### Added
- **Landing page multiidioma** (WDA-65):
  - Soporte para ES/CA/EN/FR
  - Detección automática de idioma del navegador
  - Selector manual de idioma
- **Navbar dinámica** (WDA-264):
  - Scroll-down navbar con animaciones
  - Ocultación inteligente de elementos del hero
  - Comportamiento sticky mejorado
- **Hero section**:
  - Diseño responsive
  - Animaciones sutiles
  - CTA prominente

### Fixed
- Renderizado del hero section en todas las páginas

## [0.0.0] - 2025-10-04

### Added
- Configuración inicial del proyecto
- Stack tecnológico:
  - Astro como generador de sitios estáticos (SSG)
  - WordPress Headless con WPGraphQL
  - Tailwind CSS para estilos
  - TypeScript para type safety
- Estructura base del proyecto
- Configuración de entorno de desarrollo

---

## Versiones Planificadas

### [1.0.0] - Meta: Lanzamiento MVP
- Sistema de reservas completo
- Integración de pagos
- Panel de administración funcional
- Todas las páginas traducidas
- Testing E2E completo

### [0.4.0] - Próximo Sprint
- Páginas legales (Política de Privacidad, Términos y Condiciones)
- Formulario de contacto funcional
- Mejoras de accesibilidad WCAG 2.1 AA
- Optimización Core Web Vitals

## Enlaces

- **Linear Project**: [sauwasauna.com](https://linear.app/wdamanage/project/sauwasaunacom-44379947aed1)
- **WordPress Backend**: [backend.sauwasauna.com](https://backend.sauwasauna.com/)
- **Documentación**: [/docs/GUIDELINE](./docs/GUIDELINE)

## Convenciones de Commit

Este proyecto sigue [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` Nueva funcionalidad
- `fix:` Corrección de errores
- `docs:` Cambios en documentación
- `style:` Cambios de formato (no afectan funcionalidad)
- `refactor:` Cambios de código que no corrigen bugs ni añaden features
- `test:` Añadir o corregir tests
- `chore:` Cambios en el proceso de build o herramientas auxiliares

## Autores

- **WDA** - *Desarrollo inicial* - [WDA Manage](https://linear.app/wdamanage)