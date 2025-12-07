# i18n - Internacionalización y Traducción

Sistema centralizado de gestión multiidioma para SAUWA.

---

## 📋 Norma Global

> **Si un campo ACF está vacío en el idioma solicitado, siempre hacer fallback a español (ES).**

El español es el idioma base del sistema y siempre tiene contenido completo.

---

## 📂 Archivos

### `fallback.ts` - Utilidad centralizada de fallback

Funciones principales:
- `getLocalizedValue()` - Obtiene un campo traducido con fallback automático
- `getLocalizedFields()` - Obtiene múltiples campos traducidos
- `hasTranslation()` - Verifica si existe traducción en un idioma

**Uso básico**:
```typescript
import { getLocalizedValue } from './i18n/fallback';

const title = getLocalizedValue({
  es: 'Título en español',
  ca: 'Títol en català',
  en: null,
  fr: null
}, 'en'); // → 'Título en español' (fallback automático)
```

### `sessions.ts` - Traducción de sesiones

Funciones específicas para sesiones SAUWA:
- `getLocalizedSession()` - Obtiene título, subtítulo y descripción traducidos
- `hasSessionTranslation()` - Verifica si una sesión tiene traducción

**Uso básico**:
```typescript
import { getLocalizedSession } from './i18n/sessions';

const localized = getLocalizedSession(session, 'ca');
console.log(localized.title);       // Título en catalán o español
console.log(localized.subtitle);    // Subtítulo en catalán o español
console.log(localized.description); // Descripción en catalán o español
```

---

## 🎯 Ejemplos de Uso

### Ejemplo 1: Campo Individual

```typescript
import { getLocalizedValue } from '../lib/i18n/fallback';

// Componente Astro
const title = getLocalizedValue(
  {
    es: partner.title,
    ca: partner.titleCa,
    en: partner.titleEn,
    fr: partner.titleFr,
  },
  locale as Locale
);
```

### Ejemplo 2: Múltiples Campos

```typescript
import { getLocalizedFields } from '../lib/i18n/fallback';

const fields = getLocalizedFields(
  {
    title: {
      es: 'Título ES',
      ca: 'Títol CA',
      en: null,
      fr: null
    },
    subtitle: {
      es: 'Subtítulo ES',
      ca: 'Subtítol CA',
      en: null,
      fr: null
    }
  },
  'ca'
);

// fields = { title: 'Títol CA', subtitle: 'Subtítol CA' }
```

### Ejemplo 3: Sesiones con Utilidad Específica

```typescript
import { getLocalizedSession } from '../lib/i18n/sessions';

// session viene de GraphQL con todos los campos
const localized = getLocalizedSession(session, 'ca');

// Usar en el template
<h2>{localized.title}</h2>
<p>{localized.subtitle}</p>
<div>{localized.description}</div>
```

---

## 🔧 Convenciones ACF

### Sufijos de Idioma

| Idioma  | Sufijo | Ejemplo Completo |
|---------|--------|------------------|
| Español | _(sin)_ | `title`, `subtitle` |
| Catalán | `Ca`   | `titleCa`, `subtitleCa` |
| Inglés  | `En`   | `titleEn`, `subtitleEn` |
| Francés | `Fr`   | `titleFr`, `subtitleFr` |

### Campos Estándar por Tipo

**Sessions**:
- Título: `title`, `tituloCa`, `tituloEn`, `tituloFr`
- Subtítulo: `subtitulo`, `subtituloCa`, `sessionSubtitleEn`, `subtituloFr`
- Descripción: `content`, `sessionDescriptionCa`, `sessionDescriptionEn`, `sessionDescriptionFr`

**Partners**:
- Título: `title` (compartido, sin traducción)
- Dirección: `partnerAddress` (compartido, sin traducción)

---

## ✅ Testing

### Test Manual

```typescript
// Caso 1: Traducción existe
getLocalizedValue({ es: 'Hola', ca: 'Hola', en: 'Hello', fr: null }, 'en')
// Esperado: 'Hello'

// Caso 2: Traducción vacía
getLocalizedValue({ es: 'Hola', ca: null, en: null, fr: null }, 'en')
// Esperado: 'Hola' (fallback)

// Caso 3: Español solicitado
getLocalizedValue({ es: 'Hola', ca: 'Hola', en: null, fr: null }, 'es')
// Esperado: 'Hola'

// Caso 4: String vacío
getLocalizedValue({ es: 'Hola', ca: '   ', en: null, fr: null }, 'ca')
// Esperado: 'Hola' (fallback, string vacío no cuenta)
```

---

## 📚 Documentación Completa

Ver especificación completa: [`docs/specs/MULTI-LANGUAGE-FALLBACK-SPEC.md`](../../../docs/specs/MULTI-LANGUAGE-FALLBACK-SPEC.md)

---

**Última actualización**: 2025-12-04
