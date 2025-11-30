# Changelog

All notable changes to the SAUWA project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### To Do
- Integración con pasarela de pago (Stripe/Redsys)
- Check-in digital con QR
- Asistente IA 24/7
- Panel de gestión completo

### Known Issues (WDA-910, WDA-911, WDA-912, WDA-913)
- Email de asistentes adicionales debería ser opcional (WDA-910)
- Cálculo de capacidad no cuenta el contacto principal (WDA-911)
- Mensajes de error del backend en inglés sin traducir (WDA-912)
- Contador de asistentes incorrecto en confirmación (WDA-913)

## [0.8.1] - 2025-11-30

### Fixed
- **Google Analytics Tracking**:
  - GTM ahora se carga correctamente en builds de producción
  - Cambiado de `PUBLIC_ENV` a `import.meta.env.DEV` para detección confiable
  - Fallback `GTM-5FJSRXL7` incluido en Layout.astro para builds sin variables de entorno
  - Analytics tracking funcional en producción manteniendo desarrollo limpio

### Changed
- **Archivos modificados**:
  - `src/layouts/Layout.astro` - Fallback GTM ID hardcoded
  - `src/components/GoogleTagManager.astro` - Usa `import.meta.env.DEV` en lugar de `PUBLIC_ENV`
  - `.env` - Comentario aclaratorio sobre GTM en builds

## [0.8.0] - 2025-11-30

### Added
- **Multi-language Session Fields** (WDA-960):
  - Nuevo helper `getLocalizedSession()` con lógica de fallback automática
  - Soporte para 4 idiomas: ES (base), CA, FR, EN
  - Fallback: Idioma solicitado → Español (si vacío)
  - GraphQL queries actualizados con campos multi-idioma
  - TypeScript interfaces extendidas para soportar campos opcionales por idioma

### Fixed
- **Session Hydration Bug** (WDA-960):
  - Script client-side sobrescribía contenido SSG correcto con campos base en español
  - Ahora usa `getLocalizedSession()` para respetar el idioma de cada página
  - Eliminado flash de contenido en idioma incorrecto

### Changed
- **Session Pages Hydration** (WDA-960):
  - Actualizados scripts de hidratación en 4 páginas (ES, CA, FR, EN)
  - Import de `getLocalizedSession` y `Locale` type
  - Localización aplicada tanto en SSG como en client-side hydration

### Technical
- **Archivos creados**:
  - `src/lib/i18n/sessions.ts` (128 líneas) - Helper de localización
- **Archivos modificados**:
  - `src/lib/booking/queries.ts` - Campos GraphQL multi-idioma
  - `src/lib/booking/types.ts` - Interfaces TypeScript
  - `src/pages/es/puertas-abiertas.astro` - Script hydration
  - `src/pages/ca/portes-obertes.astro` - Script hydration
  - `src/pages/fr/portes-ouvertes.astro` - Script hydration
  - `src/pages/en/open-days.astro` - Script hydration

## [0.7.2] - 2025-11-29

### Added
- **Páginas de Condiciones de Contratación** (4 idiomas):
  - `/es/condiciones-contratacion/`
  - `/ca/condicions-contractacio/`
  - `/en/booking-terms/`
  - `/fr/conditions-reservation/`
- **CollaboratorsSection**: Nuevo componente para mostrar sponsors/colaboradores
- **Imágenes de sponsors**: Nueva carpeta `public/images/sponsors/`

### Fixed
- **Booking Widget - Slot Selection** (WDA-909):
  - Slots con status `BELOW_MINIMUM` ahora son clickables (antes se deshabilitaban)
  - Solo se deshabilitan slots con status `full` o `closed`
- **Booking Widget - Attendees UI**:
  - Estilos CSS corregidos para asistentes dinámicos usando `:global()`
  - Campos de asistente con fondo blanco y tamaño proporcional al formulario
  - Botón "Eliminar" posicionado correctamente en esquina superior derecha
  - Responsive mejorado para mobile

### Changed
- Legal slugs actualizados con nuevas páginas de condiciones de contratación
- Navbar y MobileMenu actualizados

## [0.7.1] - 2025-11-28

### Fixed
- **Booking API Integration** (WDA-909):
  - Fix crítico: payload de reserva ahora envía `attendees` como array de objetos
  - Cada asistente incluye: `name`, `email`, y `consents` (privacy, terms, health)
  - Primer asistente usa email del contacto principal como fallback
  - Corregido error "attendees array is required" del backend
- **Calendar Timezone Fix** (WDA-909):
  - Corregido bug de timezone que mostraba fecha incorrecta al seleccionar día
  - Fechas ahora se parsean manualmente evitando conversión UTC
  - Formato correcto: "martes, 2 de diciembre" en lugar de "lunes, 1 de diciembre"

### Changed
- Tipo `CreateBookingRequest.attendees` cambiado de `number` a `BookingAttendee[]`
- Interface `AttendeeConsents` ahora incluye `terms` y `health` además de `privacy`
- Single checkbox de privacidad implica aceptación de todos los términos requeridos

## [0.7.0] - 2025-11-28

### Added
- **Booking Widget UX Improvements** (WDA-909):
  - Sistema de estados visuales para días del calendario:
    - Verde: días disponibles con indicador de punto
    - Amarillo: días con pocas plazas (≤2 slots)
    - Rojo: días completos
    - Gris: días sin disponibilidad
  - Steps de progreso clickables para navegación hacia atrás
  - Gestión de múltiples asistentes:
    - Sección "Datos de los asistentes" con contador dinámico
    - Badge "Contacto principal" para primer asistente
    - Campos Nombre (obligatorio) + Email (opcional) por asistente
    - Botones añadir/eliminar asistentes
    - Validación y envío de datos en booking
  - Traducciones para 4 idiomas (ES, CA, EN, FR)

### Fixed
- Alineación de steps de progreso en BookingWidget
- CSS scoping para elementos dinámicos usando `:global()`
- Altura mínima de días del calendario para visualización de indicadores

### Changed
- Steps de progreso cambiados de `<div>` a `<button>` para accesibilidad
- Días del calendario con `min-height: 40px` para mejor UX

## [0.6.0] - 2025-11-12

### Added
- **Dynamic SEO System** (WDA-555):
  - Sitemap.xml dinámico con integración WordPress
  - Robots.txt con configuración SEO
  - Proxy PHP para sitemap en hosting compartido
  - Plugin WordPress SAUWA Dynamic Sitemap
  - Documentación completa de arquitectura SEO
- **Dynamic Blog System** (WDA-558):
  - BlogScrollCards con carga dinámica desde WordPress
  - Client-side fetching sin necesidad de rebuild
  - Cache de 5 minutos para optimización
  - Diseño idéntico a producción preservado
  - Patrón reutilizable para otros componentes

### Fixed
- Global styles (`is:global`) para contenido dinámico
- GraphQL type error: `LanguageCodeFilterEnum!` en queries
- Scoped styles no aplicaban a DOM generado dinámicamente

## [0.5.0] - 2025-11-11

### Added
- **Partners Section Updates**:
  - Contenido actualizado para hoteles
  - Safari 18.1 video autoplay fix implementado
- **Hero Section Improvements** (WDA-402):
  - Typography responsive adjustments para laptops
  - Mejor escalado en pantallas medianas

### Changed
- `.gitignore` actualizado para excluir archivos temporales y Playwright MCP

### Fixed
- Video autoplay en Safari 18.1 y posteriores
- Responsive typography en hero section

## [0.4.0] - 2025-11-10

### Added
- **Legal Pages System** (WDA-556):
  - Páginas legales multiidioma con Polylang
  - Integración completa con WordPress GraphQL
  - Política de Privacidad, Términos y Condiciones, Cookies
  - SEO metadata y canonical URLs
- **Benefits Section Enhancement** (WDA-554):
  - SVG icons con width/height explícitos
  - Icon size aumentado a 36px para mejor visibilidad

### Fixed
- Horizontal scroll issues eliminados
- Benefits section icon rendering mejorado
- UI issues en home y blog corregidos

### Changed
- Audio de fuego deshabilitado temporalmente

## [0.3.1] - 2025-11-09

### Added
- **CSS Architecture Overhaul**:
  - Sistema de diseño modular implementado
  - Design tokens centralizados (`design-tokens.css`)
  - Utilities CSS reutilizables (`utilities.css`)
  - Documentación de arquitectura CSS completa
  - Sistema de favicons implementado
- **Blog Rename**: Blog section renombrada a "Guía SAUWA SAUNA"
- **Mobile Optimization** (WDA-294, WDA-531, WDA-535):
  - Márgenes laterales unificados a 20px estándar
  - Sistema de z-index optimizado
  - Espaciado del menú móvil mejorado
  - 5 problemas críticos de mobile resueltos

### Fixed
- Sticky scroll restaurado en sección blog (critical fix)
- Sistema de diseño y márgenes mobile unificados
- Z-index en mobile corregido
- PostCSS @import warnings resueltos
- Image extensions corregidas (.jpg → .webp)
- Scroll horizontal en móvil eliminado (WDA-294)

### Changed
- Font sizes aumentados para mejor legibilidad
- CSS classes unificadas globalmente
- Orden CSS reorganizado para evitar warnings

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

### [0.8.0] - Próximo Sprint
- Formulario de contacto funcional
- Mejoras de accesibilidad WCAG 2.1 AA
- Optimización Core Web Vitals
- Performance audits y mejoras Lighthouse
- Cookie consent banner
- Testing E2E del flujo de reservas

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