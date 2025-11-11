# 📊 Google Analytics 4 & Tag Manager - Guía de Implementación

## Resumen Ejecutivo

Se ha implementado **Google Tag Manager (GTM)** como sistema centralizado de gestión de tags para el proyecto SAUWA Sauna. GTM gestiona internamente Google Analytics 4 (GA4) y permite añadir futuros tags sin modificar código.

## Credenciales de Producción

```yaml
GTM Container ID: GTM-5FJSRXL7
GA4 Measurement ID: G-S3XC2RKG11
GA4 Stream ID: 12235820968
```

## Arquitectura Implementada

```
┌─────────────────────────┐
│   Astro SSG Frontend    │
│  (Static HTML/CSS/JS)   │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   Google Tag Manager    │
│    (GTM-5FJSRXL7)      │
│  ┌───────────────────┐  │
│  │ GA4 Configuration │  │
│  │  (G-S3XC2RKG11)   │  │
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │  Future Tags      │  │
│  │ (FB Pixel, etc.)  │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

## Archivos Creados/Modificados

### 1. Variables de Entorno
**Archivo:** `.env`
```env
PUBLIC_GTM_ID=GTM-5FJSRXL7
PUBLIC_GA4_MEASUREMENT_ID=G-S3XC2RKG11
PUBLIC_ENV=development
```

### 2. Componentes de Analytics

#### `src/components/GoogleTagManager.astro`
- Componente principal que inyecta GTM en el `<head>`
- Inicializa dataLayer con contexto (locale, pageType)
- Modo debug para desarrollo

#### `src/components/GoogleTagManagerNoScript.astro`
- Fallback para usuarios sin JavaScript
- Se coloca al inicio del `<body>`

#### `src/components/AnalyticsDebugger.astro`
- Panel de debugging (solo desarrollo)
- Muestra eventos en tiempo real
- Verifica estado de GTM/GA4

### 3. Utilidades de Tracking

**Archivo:** `src/utils/analytics.ts`
```typescript
// Funciones disponibles:
pushDataLayerEvent()      // Eventos genéricos
trackPageView()           // Vistas de página
trackNewsletterSignup()   // Suscripciones newsletter
trackBookingInteraction() // Interacciones de reserva
trackChatInteraction()    // Chat/Asistente IA
trackFormSubmission()     // Envío de formularios
trackEcommerceEvent()     // Eventos e-commerce
setUserProperties()       // Propiedades de usuario
```

### 4. Layout Principal

**Archivo:** `src/layouts/Layout.astro`
- Integra GTM en todas las páginas
- Pasa contexto (locale, pageType)
- Incluye debugger en desarrollo

## Configuración en Google Tag Manager

### Paso 1: Acceder a GTM
1. Ir a [tagmanager.google.com](https://tagmanager.google.com)
2. Seleccionar container: **GTM-5FJSRXL7**

### Paso 2: Configurar Tag de GA4
1. Click en **"Tags"** → **"Nuevo"**
2. Configuración del Tag:
   ```
   Tipo: Google Analytics: GA4 Configuration
   Measurement ID: G-S3XC2RKG11
   ```
3. Trigger: **All Pages**
4. Guardar como: **"GA4 - Configuration"**

### Paso 3: Variables de DataLayer
Crear las siguientes variables en GTM:

| Variable Name | Type | Data Layer Variable Name |
|--------------|------|--------------------------|
| DLV - Page Locale | Data Layer Variable | pageLocale |
| DLV - Page Type | Data Layer Variable | pageType |
| DLV - Environment | Data Layer Variable | environment |

### Paso 4: Enhanced Measurement
En GA4 Admin → Data Streams → Web:
- ✅ Page views
- ✅ Scrolls
- ✅ Outbound clicks
- ✅ Site search
- ✅ Form interactions
- ✅ File downloads

## Verificación de Implementación

### Método 1: GTM Preview Mode
1. En GTM, click en **"Preview"**
2. Introducir URL: `https://sauwasauna.com`
3. Verificar que se disparan eventos:
   - `gtm.js` (GTM carga)
   - `page_view` (Vista de página)
   - Variables correctas en dataLayer

### Método 2: Analytics Debugger (Desarrollo)
1. Ejecutar: `npm run dev`
2. Abrir navegador con panel de debugging
3. Click en **"📊 Analytics Debug"** (esquina inferior derecha)
4. Verificar eventos en tiempo real

### Método 3: Google Analytics Real-Time
1. Ir a GA4 → Reports → Real-time
2. Navegar por el sitio
3. Verificar usuarios y eventos activos

### Método 4: Chrome DevTools
```javascript
// En la consola:
console.log(window.dataLayer);
console.log(window.google_tag_manager);
```

## Eventos Personalizados Pendientes

### Subtareas para WDA-68:

#### 1. Newsletter Subscription (8h)
```typescript
// Ejemplo de implementación:
import { trackNewsletterSignup } from '@/utils/analytics';

// En el handler del formulario:
trackNewsletterSignup(email, locale);
```

#### 2. Booking Flow (12h)
- `booking_calendar_viewed`
- `booking_date_selected`
- `booking_time_selected`
- `booking_initiated`
- `booking_completed`

#### 3. Chat Assistant (6h)
- `chat_opened`
- `chat_message_sent`
- `chat_booking_suggested`
- `chat_closed`

#### 4. E-commerce Events (8h)
- `view_item` (ver sesión)
- `add_to_cart` (seleccionar sesión)
- `begin_checkout` (iniciar pago)
- `purchase` (completar reserva)

## Consideraciones de Privacidad y GDPR

### Implementación Pendiente de Cookie Consent

1. **Instalar librería de consent:**
```bash
npm install @analytics/cookie-consent
```

2. **Configurar en GTM:**
- Crear variable de Consent State
- Condicionar tags a consent positivo
- Implementar banner de cookies

3. **Configuración GA4:**
- Activar Consent Mode v2
- Configurar regiones (UE requiere consent)
- Ajustar retención de datos (14 meses)

### Anonimización de IP
Ya configurado por defecto en GA4 para cumplimiento GDPR.

## Optimización de Performance

### Recomendaciones Implementadas:
1. ✅ Scripts cargados de forma asíncrona
2. ✅ DataLayer inicializado antes de GTM
3. ✅ No bloquea renderizado inicial
4. ✅ Modo debug solo en desarrollo

### Consideraciones para Producción:
1. **NO usar Partytown** con GTM (puede causar problemas con eventos)
2. **Preconnect** para mejorar latencia:
```html
<link rel="preconnect" href="https://www.googletagmanager.com">
<link rel="dns-prefetch" href="https://www.google-analytics.com">
```

## Testing con Playwright

### Test Básico de Analytics
```typescript
// tests/analytics.spec.ts
import { test, expect } from '@playwright/test';

test('GTM loads correctly', async ({ page }) => {
  await page.goto('/');

  // Verificar que dataLayer existe
  const hasDataLayer = await page.evaluate(() => {
    return window.dataLayer && Array.isArray(window.dataLayer);
  });
  expect(hasDataLayer).toBe(true);

  // Verificar que GTM está cargado
  const hasGTM = await page.evaluate(() => {
    return typeof window.google_tag_manager !== 'undefined';
  });
  expect(hasGTM).toBe(true);
});
```

## Troubleshooting

### GTM no carga en desarrollo
1. Verificar `.env`: `PUBLIC_ENV=development`
2. Para forzar carga: `PUBLIC_ENABLE_GTM_IN_DEV=true`

### Eventos no aparecen en GA4
1. Verificar Preview Mode en GTM
2. Comprobar que el tag GA4 tiene trigger correcto
3. Revisar filtros en GA4 (IP internas)

### DataLayer vacío
1. Verificar orden de scripts en Layout
2. Confirmar que GTM script está en `<head>`
3. Check Console para errores de JavaScript

## Próximos Pasos

1. **Configurar GA4 en GTM** (30 min)
   - Crear tag de configuración
   - Establecer triggers básicos
   - Testear con Preview Mode

2. **Implementar eventos de Newsletter** (4h)
   - Integrar en componente de newsletter
   - Crear tags específicos en GTM
   - Testear flujo completo

3. **Cookie Consent Banner** (4h)
   - Diseñar UI del banner
   - Implementar lógica de consent
   - Configurar Consent Mode en GTM

4. **Dashboards en GA4** (2h)
   - Crear vistas personalizadas
   - Configurar objetivos
   - Establecer alertas

## Contacto y Soporte

Para dudas sobre la implementación:
- **Documentación GTM:** [tagmanager.google.com/docs](https://support.google.com/tagmanager)
- **Documentación GA4:** [developers.google.com/analytics](https://developers.google.com/analytics)
- **Astro + Analytics:** [docs.astro.build](https://docs.astro.build)

---

**Última actualización:** 05/10/2025
**Tarea Linear:** WDA-68
**Estado:** Implementación base completada ✅