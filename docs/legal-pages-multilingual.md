# Sistema de Páginas Legales Multiidioma

## Resumen de la Solución

Se ha implementado un sistema centralizado de mapeo de slugs para las páginas legales multiidioma, resolviendo el problema de URLs incorrectas al cambiar de idioma.

## Problema Original

Cuando un usuario estaba en `/ca/politica-de-privacitat/` y cambiaba de idioma a español, la URL se construía incorrectamente como `/es/politica-de-privacitat/` en lugar de `/es/politica-de-privacidad/`.

## Solución Implementada

### 1. Sistema Centralizado de Mapeo (`/src/lib/wordpress/legal-slugs.js`)

Este archivo es la única fuente de verdad para los slugs de las páginas legales:

```javascript
export const LEGAL_SLUGS = {
  AVISO_LEGAL: {
    es: 'aviso-legal',
    ca: 'avis-legal',
    en: 'legal-notice',
    fr: 'mentions-legales'
  },
  POLITICA_COOKIES: {
    es: 'politica-de-cookies',
    ca: 'politica-de-cookies',
    en: 'cookie-policy',
    fr: 'politique-cookies'
  },
  POLITICA_PRIVACIDAD: {
    es: 'politica-de-privacidad',
    ca: 'politica-de-privacitat',
    en: 'privacy-policy',
    fr: 'politique-de-confidentialite'
  }
};
```

### 2. Funciones Helper

- `getLegalUrl(pageType, lang)`: Obtiene la URL completa de una página legal
- `getAllLegalUrls(lang)`: Obtiene todas las URLs legales para un idioma
- `getHreflangPaths(pageType)`: Obtiene los paths para HreflangMeta
- `detectLegalPageType(slug)`: Detecta el tipo de página por el slug
- `getLegalPageTranslations(pageType)`: Obtiene todas las traducciones de una página

### 3. Componentes Actualizados

#### Footer.astro
```javascript
import { getAllLegalUrls } from '../../lib/wordpress/legal-slugs.js';
const legalUrls = getAllLegalUrls(locale);
```

#### Páginas Legales (*.astro)
```javascript
import { getHreflangPaths } from '../../lib/wordpress/legal-slugs.js';
<HreflangMeta customPaths={getHreflangPaths('POLITICA_PRIVACIDAD')} />
```

#### NewsletterForm.astro
```javascript
import { getLegalUrl } from '../lib/wordpress/legal-slugs.js';
privacyUrl: getLegalUrl('POLITICA_PRIVACIDAD', 'es'),
```

#### cookieBannerTexts.ts
```javascript
import { getLegalUrl } from '../lib/wordpress/legal-slugs';
policyLink: getLegalUrl('POLITICA_COOKIES', 'es'),
```

### 4. Polylang Client Enhanced (`/src/lib/wordpress/polylang-client.js`)

Se añadieron métodos para obtener slugs dinámicamente desde WordPress:

- `getPageSlugs(pageId)`: Obtiene slugs de una página específica
- `getAllLegalPageSlugs()`: Obtiene todos los slugs de páginas legales

## Archivos Modificados

### Archivos Principales
- ✅ `/src/lib/wordpress/legal-slugs.js` (CREADO)
- ✅ `/src/lib/wordpress/polylang-client.js` (actualizado)
- ✅ `/src/components/layout/Footer.astro`
- ✅ `/src/components/NewsletterForm.astro`
- ✅ `/src/data/cookieBannerTexts.ts`

### Páginas Legales Actualizadas
- ✅ `/src/pages/es/aviso-legal.astro`
- ✅ `/src/pages/es/politica-de-cookies.astro`
- ✅ `/src/pages/es/politica-de-privacidad.astro`
- ✅ `/src/pages/ca/avis-legal.astro`
- ✅ `/src/pages/ca/politica-de-cookies.astro`
- ✅ `/src/pages/ca/politica-de-privacitat.astro`
- ✅ `/src/pages/en/legal-notice.astro`
- ✅ `/src/pages/en/cookie-policy.astro` (renombrado desde politica-de-cookies.astro)
- ✅ `/src/pages/en/privacy-policy.astro`
- ✅ `/src/pages/fr/mentions-legales.astro`
- ✅ `/src/pages/fr/politique-cookies.astro` (renombrado desde politica-de-cookies.astro)
- ✅ `/src/pages/fr/politique-de-confidentialite.astro`

## Estructura de URLs Final

```
ES (Español):
  - /es/aviso-legal/
  - /es/politica-de-cookies/
  - /es/politica-de-privacidad/

CA (Catalán):
  - /ca/avis-legal/
  - /ca/politica-de-cookies/
  - /ca/politica-de-privacitat/

EN (Inglés):
  - /en/legal-notice/
  - /en/cookie-policy/
  - /en/privacy-policy/

FR (Francés):
  - /fr/mentions-legales/
  - /fr/politique-cookies/
  - /fr/politique-de-confidentialite/
```

## Verificación

Para verificar que todo funciona correctamente:

```bash
# Ejecutar el script de verificación
cd astro
node src/scripts/verify-legal-slugs.js
```

## Testing Manual

1. **Navegación por Footer**: Verificar que los enlaces en el footer apuntan a las URLs correctas por idioma
2. **Cambio de Idioma**: En cualquier página legal, cambiar de idioma debe llevar a la URL correcta
3. **Newsletter Form**: El enlace de política de privacidad debe ser correcto según el idioma
4. **Cookie Banner**: El enlace debe apuntar a la política de cookies correcta

## Mantenimiento

### Para añadir una nueva página legal:

1. Añadir la definición en `LEGAL_SLUGS` en `/src/lib/wordpress/legal-slugs.js`
2. Crear los archivos .astro correspondientes en cada idioma
3. Actualizar `LEGAL_PAGE_IDS` en `polylang-client.js` si es necesario
4. Actualizar componentes que necesiten enlazar a la nueva página

### Para cambiar un slug:

1. Actualizar el slug en `LEGAL_SLUGS`
2. Renombrar el archivo .astro correspondiente
3. Verificar/actualizar el slug en WordPress/Polylang

## Notas Importantes

- Los slugs deben coincidir EXACTAMENTE con:
  - Los nombres de archivo .astro
  - Los slugs configurados en WordPress/Polylang
- El sistema usa la página con ID del idioma por defecto (ES) para obtener las traducciones
- El cache de GraphQL es de 24 horas para contenido legal

## Beneficios del Sistema

1. **Centralización**: Un único lugar para gestionar todos los slugs
2. **Consistencia**: Garantiza que los enlaces siempre sean correctos
3. **Mantenibilidad**: Fácil de actualizar y extender
4. **Type Safety**: Las funciones helper previenen errores
5. **Flexibilidad**: Puede integrarse con WordPress dinámicamente

## Próximos Pasos Recomendados

1. ✅ Verificar que los slugs en WordPress/Polylang coincidan exactamente
2. ✅ Hacer build de producción y probar en staging
3. ⏳ Considerar crear un endpoint GraphQL personalizado para obtener todos los slugs de una vez
4. ⏳ Implementar cache más agresivo para las URLs legales (son muy estables)
5. ⏳ Añadir tests automatizados para verificar la integridad de los slugs