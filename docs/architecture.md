# Arquitectura del Proyecto

## Visión General

Este proyecto utiliza una arquitectura WordPress Headless con frontend Astro.

```
┌─────────────────────────────────────────────┐
│              USUARIOS                        │
│  (Navegadores Mobile/Desktop)               │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│     CDN / Hosting Compartido                │
│  • Astro Build (HTML/CSS/JS estáticos)     │
│  • Assets optimizados                       │
│  • Caché agresivo                          │
└────────────────┬────────────────────────────┘
                 │
                 │ Consultas GraphQL
                 │ (client-side JS)
                 │
                 ▼
┌─────────────────────────────────────────────┐
│    WORDPRESS HEADLESS (Mismo servidor)      │
│  • WPGraphQL endpoint: /graphql            │
│  • ACF Pro (campos custom)                 │
│  • Custom Post Types                       │
│  • Admin Panel (backoffice)                │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│           MySQL/MariaDB                     │
│  • Tablas WP core                          │
│  • Tablas custom                           │
└─────────────────────────────────────────────┘
```

## Flujo de Datos

1. **Build Time (Desarrollo)**:
   - Astro consulta WPGraphQL para contenido estático
   - Genera HTML estático con contenido base
   - Optimiza assets (imágenes, CSS, JS)

2. **Runtime (Producción)**:
   - Usuario accede a HTML estático (ultra rápido)
   - JavaScript client-side consulta GraphQL para contenido dinámico
   - Actualización de UI sin reload completo

## Componentes Principales

### WordPress Backend
- **Rol**: CMS + API GraphQL
- **Responsabilidades**:
  - Gestión de contenido
  - Autenticación
  - Lógica de negocio
  - API GraphQL endpoint

### Astro Frontend
- **Rol**: Generación de sitio estático
- **Responsabilidades**:
  - Renderizado de HTML
  - Optimización de assets
  - SEO (meta tags, sitemaps)
  - Routing multiidioma

### Client-side JavaScript
- **Rol**: Interactividad y contenido dinámico
- **Responsabilidades**:
  - Consultas GraphQL en tiempo real
  - Actualizaciones de UI
  - Formularios interactivos
  - Gestión de estado

## Decisiones Técnicas Clave

Ver carpeta `adr/` para Architecture Decision Records detallados.

## Deployment

1. **WordPress**: Hosting compartido (PHP 8.1+)
2. **Astro build**: Mismo hosting o CDN
3. **Sin Node.js en producción**: Todo es estático

## Performance

- **TTFB**: < 200ms (HTML estático)
- **FCP**: < 1.5s
- **LCP**: < 2.5s
- **Core Web Vitals**: Todas verdes
