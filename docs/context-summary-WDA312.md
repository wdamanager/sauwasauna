# Resumen Ejecutivo - Proyecto SAUWA (sauwasauna.com)
## Contexto para Tarea WDA-312

### 1. INFORMACIÓN GENERAL DEL PROYECTO

**Cliente**: SAUWA
**Tipo**: WordPress Headless + Astro Frontend (SSG)
**Timeline**: 26/09/2025 - 07/12/2025
**Estado Actual**: Epic 1 (Fundación y Landing Page) - In Progress
**URL Backend**: https://backend.sauwasauna.com/
**Linear**: https://linear.app/wdamanage/project/sauwasaunacom-44379947aed1

### 2. ARQUITECTURA TÉCNICA

#### Stack Tecnológico
- **Backend**: WordPress Headless con WPGraphQL
- **Frontend**: Astro 5.0.5 (Static Site Generation)
- **Styling**: Tailwind CSS 3.4.15
- **Lenguajes**: TypeScript 5.7.2
- **Deployment**: Hosting compartido (sin Node.js)
- **Idiomas**: ES, CA, EN, FR (multi-idioma con i18n nativo de Astro)

#### Arquitectura del Sistema
```
WordPress (CMS) → GraphQL API (/graphql) → Astro (SSG) → HTML/CSS/JS estático
                                           ↓
                                    Client-side JS → GraphQL (contenido dinámico)
```

- WordPress provee el CMS y endpoint GraphQL
- Astro genera HTML/CSS/JS estático en build
- JavaScript del cliente consulta GraphQL para contenido dinámico
- El mismo servidor aloja WordPress y el build de Astro

### 3. ESTRUCTURA DEL PROYECTO

```
C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\
├── astro/                        # Proyecto Astro principal
│   ├── src/
│   │   ├── components/           # Componentes reutilizables Astro
│   │   │   ├── layout/          # Footer, Header, etc.
│   │   │   ├── NavbarScroll.astro
│   │   │   ├── HeroSlider.astro
│   │   │   ├── BenefitsSection.astro
│   │   │   ├── SessionPhases.astro
│   │   │   ├── NewsletterForm.astro
│   │   │   └── CookieBanner.astro
│   │   ├── layouts/             # Layout principal
│   │   │   └── Layout.astro
│   │   ├── pages/               # Páginas con routing i18n
│   │   │   ├── index.astro     # Detector de idioma y redirect
│   │   │   ├── es/             # Páginas en español
│   │   │   ├── ca/             # Páginas en catalán
│   │   │   ├── en/             # Páginas en inglés
│   │   │   └── fr/             # Páginas en francés
│   │   ├── data/               # Datos y traducciones
│   │   ├── lib/                # Utilidades y cliente GraphQL
│   │   └── styles/             # CSS global
│   ├── public/                 # Assets estáticos
│   │   ├── images/
│   │   ├── logos/
│   │   └── audio/
│   ├── package.json
│   ├── astro.config.mjs        # Configuración i18n y build
│   └── tsconfig.json
├── docs/                        # Documentación del proyecto
│   ├── GUIDELINE/              # Guías de desarrollo (pendiente)
│   └── context-summary-WDA312.md # Este archivo
├── CLAUDE.md                   # Contexto del proyecto para Claude
├── README.md                   # Documentación principal
└── .env                        # Variables de entorno

```

### 4. CONFIGURACIÓN Y CONVENCIONES

#### Convenciones de Desarrollo
- **Indentación**: 2 espacios (no tabs)
- **Nombres de archivos**: kebab-case
- **Componentes**: PascalCase
- **CSS**: Tailwind utility classes (sin JIT)
- **GraphQL**: Fetch nativo (no Apollo/urql)
- **Git**: Conventional commits (feat:, fix:, docs:, etc.)
- **Testing**: Playwright para E2E

#### Configuración i18n (astro.config.mjs)
```javascript
i18n: {
  defaultLocale: 'es',
  locales: ['es', 'ca', 'en', 'fr'],
  routing: {
    prefixDefaultLocale: true,  // URLs: /es/, /ca/, /en/, /fr/
  }
}
```

### 5. CARACTERÍSTICAS IMPLEMENTADAS

#### Landing Page Multiidioma (WDA-65)
- ✅ Auto-detección de idioma del navegador
- ✅ Selector de idioma en navbar
- ✅ Páginas index para cada idioma
- ✅ Preferencia guardada en localStorage

#### Componentes Desarrollados
- **NavbarScroll**: Navbar inteligente con comportamiento dinámico
  - Transparente en TOP (logo blanco)
  - Se oculta al scrollear DOWN
  - Aparece con fondo blanco al scrollear UP
- **HeroSlider**: Slider de imágenes de fondo
- **NewsletterForm**: Formulario con variantes (hero/cta)
- **SessionPhases**: Fases de la experiencia
- **BenefitsSection**: Beneficios de la sauna
- **CookieBanner**: Banner de cookies GDPR
- **Footer**: Dos variantes (normal/negro)

#### SEO y Performance
- Meta tags dinámicos por idioma
- Schema markup pendiente
- Lighthouse target: 90+
- Accesibilidad WCAG 2.1 AA

### 6. ESTADO ACTUAL DEL PROYECTO

#### Epic 1: Fundación y Landing Page (WDA-61)
**Estado**: In Progress
**Hito**: 1-2 (26 Sep - 5 Oct)

#### Historia en Progreso
**WDA-65**: Landing Page Multiidioma con Newsletter
**Estado**: In Progress
**Completado**:
- Estructura base Astro
- Sistema de routing multiidioma
- Componentes principales
- Hero con slider

**Pendiente**:
- Integración newsletter con backend
- Optimización de imágenes
- Testing cross-browser
- Schema markup

#### Próximas Tareas
- **WDA-294**: Correcciones landing (actual)
- **WDA-312**: [Por definir - siguiente tarea]

### 7. RECURSOS Y ENDPOINTS

#### WordPress/GraphQL
- **Backend**: https://backend.sauwasauna.com/
- **GraphQL**: https://backend.sauwasauna.com/graphql
- **Admin**: https://backend.sauwasauna.com/wp-admin

#### Variables de Entorno Configuradas (.env)
```env
WORDPRESS_GRAPHQL_URL=https://backend.sauwasauna.com/
# Pendientes de configurar:
# - STRIPE/REDSYS (pagos)
# - MAILCHIMP/MAILRELAY (newsletter)
# - GA4/GTM (analytics)
# - SMTP (emails)
```

### 8. COMANDOS ÚTILES

```bash
# Desarrollo
cd astro && pnpm dev          # http://localhost:4321

# Build producción
pnpm build

# Preview build
pnpm preview

# Testing
npx playwright test

# Linting y formato
pnpm lint
pnpm format
```

### 9. CONSIDERACIONES PARA WDA-312

#### Áreas que Requieren Atención
1. **Newsletter Integration**: El formulario existe pero necesita conectarse al backend
2. **Imágenes**: Optimización pendiente (lazy loading, formats WebP/AVIF)
3. **GraphQL Client**: Implementar cliente para queries dinámicas
4. **Cookie Management**: Lógica de consentimiento implementar
5. **Analytics**: Integración GA4/GTM pendiente
6. **Schema Markup**: SEO estructurado pendiente

#### Archivos Clave para Modificar
- `C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\astro\src\components\NewsletterForm.astro` - Integración newsletter
- `C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\astro\src\lib\graphql.ts` - Cliente GraphQL (por crear)
- `C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\astro\src\layouts\Layout.astro` - Meta tags y analytics

### 10. AGENTES ESPECIALIZADOS DISPONIBLES

- **technical-project-manager**: Gestión Linear y tracking
- **wordpress-headless-expert**: Backend WP y WPGraphQL
- **astro-ux-architect**: Frontend Astro y UX
- **docops-engineer**: Documentación
- **api-integration-architect**: Integraciones API

### 11. NOTAS IMPORTANTES

1. **No Node.js en producción**: El hosting es compartido, todo debe ser estático
2. **Vanilla JS para dinámico**: No usar frameworks pesados del lado cliente
3. **Mobile First**: Diseño responsive prioritario
4. **Performance crítica**: Core Web Vitals debe ser excelente
5. **Multiidioma completo**: Todo contenido debe estar traducido

---

**Preparado por**: context-manager
**Fecha**: 2025-10-30
**Para tarea**: WDA-312
**Próximo paso**: Definir alcance específico de WDA-312 y asignar al agente correspondiente