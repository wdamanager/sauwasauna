# SAUWA - Sauna Premium Experience Platform

## 🚨 CRITICAL DEVELOPMENT RULES - MANDATORY COMPLIANCE

### CSS and Styling - NEVER VIOLATE THESE RULES

**NEVER DO THIS:**
- ❌ **NEVER** define inline styles or duplicate styles in components
- ❌ **NEVER** use hardcoded values (colors: #hex, sizes: px, spacing: arbitrary)
- ❌ **NEVER** create new classes without checking `/src/styles/utilities.css` first
- ❌ **NEVER** ignore CSS variables from `design-tokens.css`
- ❌ **NEVER** copy-paste styles between components

**ALWAYS DO THIS:**
- ✅ **ALWAYS** use CSS variables: `var(--color-primary)`, `var(--spacing-4)`
- ✅ **ALWAYS** use global classes: `section-label`, `section-title`, `container`
- ✅ **ALWAYS** check `docs/best-practices/css-best-practices.md` before writing CSS
- ✅ **ALWAYS** ask "Is this style already defined globally?" before creating new
- ✅ **ALWAYS** keep scoped styles minimal - only for truly unique patterns

**BEFORE WRITING ANY CSS:**
1. Check existing utilities: `/src/styles/utilities.css`
2. Check design tokens: `/src/styles/design-tokens.css`
3. Read architecture: `/docs/architecture/css-architecture.md`
4. Follow checklist: `/docs/workflows/testing-checklist.md`

**Reference Documentation:**
- 📋 [CSS Architecture](/docs/architecture/css-architecture.md) - System overview
- ⚠️ [Common Pitfalls](/docs/best-practices/common-pitfalls.md) - Mistakes to avoid
- ✅ [Testing Checklist](/docs/workflows/testing-checklist.md) - Pre-commit validation

---

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

## Project Documentation

- **[CHANGELOG.md](CHANGELOG.md)** - Complete version history with all features, fixes, and improvements
- **[README.md](README.md)** - Project overview and setup instructions
- **[START-HERE.md](START-HERE.md)** - Quick start guide for new developers
- **[docs/GUIDELINE](docs/GUIDELINE)** - Design and development guidelines
