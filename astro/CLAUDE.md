# SAUWA - Sauna Premium Experience Platform

## Project Context
- **Client**: SAUWA
- **Project Type**: WordPress Headless + Astro Frontend
- **Timeline**: 26/09/2025 - 07/12/2025
- **Linear Project**: https://linear.app/wdamanage/project/sauwasaunacom-44379947aed1
- **WordPress**: https://backend.sauwasauna.com/
- **GUIDELINE**: C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\docs\GUIDELINE
- **Project History**: See [CHANGELOG.md](CHANGELOG.md) for detailed version history and updates

## Technical Stack
- **Backend**: WordPress Headless + WPGraphQL
- **Frontend**: Astro (SSG) + TypeScript
- **Styling**: Tailwind CSS
- **Database**: MySQL/MariaDB
- **Deployment**: Hosting compartido (sin Node.js)
- **Languages**: ES, CA, EN, FR

## Architecture
- WordPress provides CMS + GraphQL endpoint (/graphql)
- Astro generates static HTML + CSS + JS
- Client-side JS queries GraphQL for dynamic content
- Same server hosts both WP and Astro build

### Dynamic Content System (WDA-990)
Sistema híbrido SSG + Client Hydration para contenido sin rebuild:

```
BUILD TIME (SSG):
├── Páginas con datos iniciales de WordPress
├── Script de hidratación incluido
└── Hash de contenido para change detection

RUNTIME (Browser):
├── Mostrar SSG inmediatamente (SEO ✓)
├── Fetch datos frescos de GraphQL
├── Comparar hash → Actualizar si cambió
└── Cache 5 min en cliente

CATCH-ALL (URLs nuevas post-build):
├── .htaccess rewrite → /[locale]/dynamic/
└── Validar slug via GraphQL → Cargar o 404
```

**Core Files:**
- `src/lib/dynamic-content-client.ts` - Cliente JS con cache y change detection
- `src/lib/dynamic-queries.ts` - Queries GraphQL para partners/sessions
- `src/lib/dynamic-renderers.ts` - Funciones DOM update
- `src/components/core/DynamicContent.astro` - Wrapper SSG + Hydration
- `src/components/core/DynamicPageLoader.astro` - Loader catch-all
- `src/components/core/skeletons/` - Skeleton components

## Key Features

### 🌐 Experiencia Multiidioma
- Landing en 4 idiomas (ES/CA/EN/FR) con detección automática + selector manual
- Contenido totalmente traducido: blog, FAQ, textos legales

### 📅 Sistema de Reservas Inteligente
- Aforo dinámico con mínimo 3 personas por sesión
- Calendario interactivo con disponibilidad en tiempo real
- Gestión de múltiples localizaciones
- Sistema de recordatorios automáticos pre-sesión

### 💳 Gestión de Pagos y Fidelización
- Pasarela de pago integrada (Stripe/Redsys)
- Programa 10+1: sesión gratis cada 10 reservas
- Tarjetas regalo y packs experiencia
- Sistema de cupones descuento (newsletter 10%)

### 🔐 Check-in Digital
- QR único por reserva
- App/panel para operadores validar entrada
- Control de asistencia en tiempo real

### 🤖 Asistente IA 24/7
- Chatbot en web para resolver dudas y guiar a reserva
- Respuestas contextuales sobre horarios, precios, localizaciones
- Captura de leads con seguimiento marketing

### 📊 Panel de Gestión Completo
- Backoffice WordPress headless
- Gestión de sesiones, capacidades, precios por localización
- Reportes de ocupación y revenue
- Control de roles (Admin, Manager, Operador, Soporte)

### 🎨 Diseño y Performance
- Landing moderna y minimalista con sliders sutiles
- Optimización Core Web Vitals (Lighthouse 90+)
- SEO multiidioma con hreflang y schema markup
- Accesibilidad WCAG 2.1 AA

### 📧 Marketing Automation
- Newsletter con descuento 10% primer reserva
- Emails post-experiencia para review y fidelización
- Segmentación por idioma y preferencias

---

**Stack Técnico**: WordPress Headless (backoffice) + Astro (frontend SSG) + Vanilla JS (dynamic content via WPGraphQL)

## Development Guidelines
- Use fetch for GraphQL queries (no Apollo/urql unless needed)
- Tailwind: only core utility classes (no JIT dependencies)
- File naming: kebab-case for files, PascalCase for components
- Git: Conventional commits
- Testing: Playwright for E2E

## Agents to Use
- **technical-project-manager**: For Linear updates and project tracking
- **wordpress-headless-expert**: For WP backend and WPGraphQL
- **astro-ux-architect**: For Astro frontend
- **docops-engineer**: For documentation

## Current Phase

[EPIC 1] Fundación y Landing Page (WDA-61)
Hito: 1-2 (26 Sep - 5 Oct)
Estado Epic: In Progress

## Recent Completed

- **WDA-990**: Sistema de contenido dinámico SSG + Client Hydration (2025-12-08)
  - Nuevo partner/sesión accesible sin rebuild
  - Cambios visibles en < 5 min
  - Funciona en hosting sin Node.js

## Next Actions

- Test en staging: crear partner/sesión nuevo y verificar acceso sin rebuild
- WDA-294: Correcciones landing

## Project Documentation

- **[CHANGELOG.md](CHANGELOG.md)** - Complete version history with all features, fixes, and improvements
- **[README.md](README.md)** - Project overview and setup instructions
- **[START-HERE.md](START-HERE.md)** - Quick start guide for new developers
- **[docs/GUIDELINE](docs/GUIDELINE)** - Design and development guidelines
