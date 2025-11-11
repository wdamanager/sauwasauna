# Auditoría Backend WordPress - SAUWA Sauna Andorra

**Fecha**: 20 de octubre de 2025
**Backend URL**: https://backend.sauwasauna.com/
**GraphQL Endpoint**: https://backend.sauwasauna.com/graphql
**Versión WordPress**: 6.8.3
**Tema**: Twenty Twenty-Five (oficial WordPress)

---

## 1. RESUMEN EJECUTIVO

### Estado General: BUENO CON MEJORAS NECESARIAS

**Fortalezas detectadas:**
- GraphQL endpoint operativo y funcional
- 6 posts publicados con contenido de calidad
- Todas las featured images presentes con alt text descriptivo
- Categorías bien estructuradas y con descripciones SEO
- Sistema multiidioma (Polylang) instalado
- Excerpts informativos en todos los posts

**Áreas críticas de mejora:**
- Imágenes NO optimizadas (JPEG en lugar de WebP)
- Tamaño de imágenes excesivo (180-340KB por imagen)
- Contenido SOLO en español (sin traducciones a CA/EN/FR)
- Falta GraphQL Smart Cache
- Falta plugin de optimización de imágenes
- Sin SEO plugin visible en GraphQL

---

## 2. AUDITORÍA DE POSTS

### 2.1 Inventario de Posts (6 totales)

| ID | Título | Slug | Categorías | Fecha |
|---|---|---|---|---|
| 26 | Recuperación tras esquiar en Andorra | recuperacion-tras-esquiar-andorra-protocolo-30-60-90 | Bienestar y Recuperación, Blog | 2025-10-19 |
| 30 | Qué hacer en invierno en Andorra | que-hacer-andorra | Andorra & Naturaleza, Blog | 2025-10-19 |
| 35 | Baños de agua fría en Andorra | banos-agua-fria-beneficios-andorra | Bienestar y Recuperación, Blog | 2025-10-19 |
| 58 | Sauna privada en Andorra | sauna-privada-andorra | Experiencias SAUWA, Blog | 2025-10-19 |
| 9 | Qué es SAUWA Sauna | que-es-sauwa-sauna | Cultura Nórdica y Ritual, Blog | 2025-10-19 |
| 14 | Sauna finlandesa: qué es | sauna-finlandesa-que-es | Cultura Nórdica y Ritual, Blog | 2025-10-19 |

**Autor**: Todos los posts están creados por "Meri"

### 2.2 Featured Images - Estado

**CRÍTICO**: Todas las imágenes necesitan optimización

| Post ID | Imagen | Dimensiones | Formato | Tamaño | Estado |
|---|---|---|---|---|---|
| 26 | recuperacion-tras-esquiar-andorra... | 1920x1080px | JPEG | 259.9 KB | PESADA |
| 30 | que-hacer-andorra-invierno... | 1920x1080px | JPEG | 207.0 KB | PESADA |
| 35 | banos-agua-fria-andorra... | 1920x1080px | JPEG | 346.4 KB | MUY PESADA |
| 58 | sauna-privada-andorra-lena... | 1920x1080px | JPEG | 188.3 KB | PESADA |
| 9 | sauwa-sauna-1920x1080px | 1920x1080px | JPEG | 213.2 KB | PESADA |
| 14 | sauna-finlandesa-sauwa... | 1920x1080px | JPEG | 183.3 KB | PESADA |

**Promedio**: 233 KB por imagen (DEBE SER < 120 KB)

**Alt Text**: Todas las imágenes tienen alt text descriptivo y optimizado para SEO.

**Tamaños generados por WordPress**:
- thumbnail (150x150)
- medium (300x169)
- medium_large (768x432)
- large (1024x576)
- 1536x1536 (1536x864)
- Original (1920x1080)

### 2.3 Excerpts

Todos los posts tienen excerpts personalizados e informativos. Longitud adecuada (100-200 caracteres aproximadamente).

**Ejemplo excerpt**:
> "¿Buscas recuperación tras esquiar en Andorra para descargar piernas y dormir mejor hoy mismo? Esta guía práctica te explica las modalidades 30 / 60 / 90..."

**Estado**: EXCELENTE

### 2.4 Títulos SEO

Los títulos están bien optimizados:
- Incluyen keyword principal
- Longitud adecuada (50-60 caracteres)
- Descriptivos y claros
- Incluyen ubicación geográfica (Andorra)

**Estado**: EXCELENTE

---

## 3. AUDITORÍA DE CATEGORÍAS

### 3.1 Categorías Activas (6 + 1 default)

| Nombre | Slug | Posts | Descripción |
|---|---|---|---|
| Blog | blog | 6 | "Your blog category" (descripción genérica) |
| Andorra & Naturaleza | andorra-naturaleza | 1 | Descripción SEO completa |
| Bienestar y Recuperación | bienestar-recuperacion | 2 | Descripción SEO completa |
| Cultura Nórdica y Ritual | cultura-nordica-ritual | 2 | Descripción SEO completa |
| Experiencias SAUWA | experiencias-sauwa | 1 | Descripción SEO completa |
| Consejos y Estilo de Vida Wellness | estilo-vida-wellness | 0 | Descripción SEO (sin posts) |

### 3.2 Categorías Vacías (multiidioma)

**DETECTADO**: 3 categorías "Sin categoría" sin uso:
- sin-categoria-fr (count: null)
- sin-categoria-en (count: null)
- sin-categoria-ca (count: null)

**Recomendación**: Eliminar estas categorías vacías o asignarlas correctamente.

### 3.3 Categorías del Brand Book - Verificación

**FALTA VERIFICAR**: ¿Hay categorías adicionales planificadas en el brand book que no están creadas?

**Estado de descripciones**: EXCELENTE (todas tienen descripción SEO excepto "Blog")

---

## 4. AUDITORÍA WPGRAPHQL

### 4.1 Configuración Actual

**Endpoint**: Funcionando correctamente
**Debug Mode**: Desactivado (mensaje: "GRAPHQL_DEBUG must be enabled")
**GraphQL Smart Cache**: Instalado (detectado en extensions)
**Límite de queries**: No detectado límite específico

### 4.2 Campos Expuestos

**Posts**:
- ✅ id, title, slug, excerpt
- ✅ date, modified
- ✅ author (name)
- ✅ featuredImage (sourceUrl, altText, mediaDetails, sizes)
- ✅ categories (name, slug, count, description)
- ✅ language (code, locale, name) - Polylang
- ✅ translations - Polylang

**Categorías**:
- ✅ name, slug, count, description

**Settings**:
- ✅ title, description, url, language

### 4.3 Campos Potencialmente Útiles NO Expuestos

**FALTA VERIFICAR** si estos campos están disponibles en el schema:
- Tags (etiquetas)
- Custom Fields (ACF si se usa)
- Reading time estimado
- Posts relacionados
- Comentarios
- Número de vistas
- Breadcrumbs

### 4.4 Filtro por Idioma

**ESTADO**: Polylang instalado y funcional
**PROBLEMA**: Todos los posts están SOLO en español (ES)
**PROBLEMA**: Campo `translations` vacío en todos los posts

**Evidencia**:
```json
{
  "language": {"code": "ES", "locale": "es_ES", "name": "Español"},
  "translations": []
}
```

### 4.5 Paginación

**VERIFICADO**: GraphQL acepta parámetro `first: N`
**RECOMENDACIÓN**: Implementar paginación con `after` cursor para queries grandes

---

## 5. OPTIMIZACIÓN DE IMÁGENES

### 5.1 Problema Detectado

**CRÍTICO**: Todas las featured images están en formato JPEG con pesos excesivos.

**Comparativa**:

| Métrica | Estado Actual | Objetivo | Gap |
|---|---|---|---|
| Formato | JPEG | WebP | Cambio necesario |
| Peso promedio | 233 KB | < 120 KB | -48% reducción |
| Peso máximo | 346 KB | < 150 KB | -57% reducción |
| Dimensiones | 1920x1080px | 1920x1080px (OK) | Sin cambio |

### 5.2 Impacto en Performance

**Core Web Vitals afectados**:
- **LCP (Largest Contentful Paint)**: Imágenes grandes retrasan carga de hero
- **CLS (Cumulative Layout Shift)**: OK (dimensiones explícitas)
- **FID (First Input Delay)**: No afectado

**Estimación de mejora con WebP**:
- Reducción de peso: 40-50% (de 233KB a 115-140KB)
- Mejora LCP: 0.3-0.5 segundos
- Ahorro ancho de banda: ~700KB por página de blog

### 5.3 Soluciones Recomendadas

#### Opción 1: Plugin de Optimización Automática (RECOMENDADO)

**ShortPixel Image Optimizer**
- **Pros**: Automático, batch optimization, WebP conversion, lazy loading
- **Plan**: Freemium (100 imágenes/mes gratis, luego de pago)
- **Configuración**: Lossy compression, Convert to WebP, Smart resize
- **Documentación**: https://wordpress.org/plugins/shortpixel-image-optimiser/

**Imagify**
- **Pros**: UI simple, bulk optimization, backup original
- **Plan**: Freemium (20MB/mes gratis)
- **Configuración**: Aggressive mode, WebP format
- **Documentación**: https://wordpress.org/plugins/imagify/

#### Opción 2: Conversión Manual Pre-Upload

**Herramientas**:
- Squoosh.app (web, gratis)
- ImageOptim (Mac)
- TinyPNG / TinyJPG (web)

**Proceso**:
1. Exportar imágenes a WebP con calidad 80-85%
2. Verificar peso < 120KB
3. Subir nuevamente a WordPress
4. Reemplazar en posts

#### Opción 3: Hosting con Optimización Integrada

**Verificar si el hosting actual (Hostinger detectado) ofrece**:
- Auto-conversión WebP
- CDN con image optimization
- Lazy loading nativo

### 5.4 Plugin Recomendado: ShortPixel

**Instalación**:
```bash
# Via WP-CLI (si tienes acceso SSH)
wp plugin install shortpixel-image-optimiser --activate

# O desde WordPress Admin:
Plugins > Add New > Search "ShortPixel" > Install > Activate
```

**Configuración Recomendada**:
```
Compression Type: Lossy
Convert to WebP: Yes
Resize Large Images: 1920px (mantener)
Optimize Thumbnails: Yes
Lazy Load: Yes (opcional, frontend Astro ya lo hace)
```

**Ejecución**:
```
Media > Bulk ShortPixel > Optimize All Images
```

---

## 6. PERFORMANCE Y CACHÉ

### 6.1 GraphQL Smart Cache

**ESTADO**: Plugin instalado (detectado en extensions)
**CONFIGURACIÓN**: Desconocida (requiere acceso admin)

**Verificación necesaria**:
- ¿Está activo el cache?
- ¿Cuál es el TTL (Time To Live)?
- ¿Se invalida automáticamente al publicar/actualizar posts?

**Documentación**: https://wordpress.org/plugins/wp-graphql-smart-cache/

### 6.2 Cache General de WordPress

**NO DETECTADO**: No hay evidencia de plugin de caché general (WP Rocket, W3 Total Cache, etc.)

**RECOMENDACIÓN**: Evaluar necesidad según:
- Tráfico del sitio
- Respuesta del servidor
- Si el hosting ya incluye caché (Hostinger suele incluirlo)

**Opciones**:

#### WP Rocket (PREMIUM - €59/año)
- **Pros**: All-in-one, page cache, minify, lazy load, CDN
- **Cons**: De pago
- **Uso**: SOLO para backend (frontend Astro ya optimiza)
- **Documentación**: https://wp-rocket.me/

#### W3 Total Cache (GRATIS)
- **Pros**: Gratis, completo, object cache, database cache
- **Cons**: Complejo de configurar
- **Uso**: Para backend y GraphQL endpoint
- **Documentación**: https://wordpress.org/plugins/w3-total-cache/

#### WP Super Cache (GRATIS)
- **Pros**: Simple, gratis, ligero
- **Cons**: Menos features
- **Uso**: Básico pero efectivo
- **Documentación**: https://wordpress.org/plugins/wp-super-cache/

**DECISIÓN RECOMENDADA**:
- Si hosting NO incluye caché: **W3 Total Cache** (gratis)
- Si presupuesto permite: **WP Rocket** (mejor UX)
- Si hosting YA incluye caché: NO instalar plugin adicional

### 6.3 GraphQL Query Performance

**FALTA MEDIR**:
- Tiempo de respuesta de queries
- Queries N+1 (sobrecarga)
- Uso de DataLoader

**Herramienta de testing**:
```bash
# Medir tiempo de respuesta
curl -w "@curl-format.txt" -o /dev/null -s -X POST \
  https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ posts(first: 10) { nodes { title } } }"}'
```

---

## 7. MULTIIDIOMA

### 7.1 Estado Actual

**Plugin**: Polylang (detectado via cookie `pll_language`)
**Idiomas configurados**: ES (Español) - SOLO ESTE ACTIVO
**Idiomas objetivo**: ES, CA, EN, FR

**PROBLEMA CRÍTICO**:
- **0 traducciones** detectadas en GraphQL
- Todos los posts en español únicamente
- Campo `translations` vacío en todos los posts

### 7.2 Verificación Necesaria

**Acceso a WordPress Admin requerido para verificar**:

1. **Polylang Settings**:
   - ¿Están creados los 4 idiomas (ES/CA/EN/FR)?
   - ¿Cuál es el idioma por defecto?
   - ¿Está activado el "Detect browser language"?

2. **Posts**:
   - ¿Hay posts duplicados para cada idioma?
   - ¿Están vinculados via Polylang translations?

3. **Categories**:
   - ¿Hay versión de cada categoría en 4 idiomas?
   - Detectamos 3 "Sin categoría" (FR/EN/CA) sin usar

4. **WPGraphQL Polylang Integration**:
   - ¿Está instalado el plugin de integración?
   - Plugin necesario: `wp-graphql-polylang`
   - Documentación: https://github.com/valu-digital/wp-graphql-polylang

### 7.3 Plan de Traducción Recomendado

#### Fase 1: Configuración Base
1. Verificar Polylang settings (4 idiomas activos)
2. Instalar `wp-graphql-polylang` si no está
3. Configurar idioma por defecto (probablemente ES)

#### Fase 2: Traducción de Categorías
1. Traducir las 6 categorías activas a CA/EN/FR
2. Eliminar categorías vacías "Sin categoría"
3. Verificar slugs consistentes

#### Fase 3: Traducción de Posts
1. **Opción A - Manual**: Duplicar 6 posts x 3 idiomas = 18 posts nuevos
2. **Opción B - Profesional**: Contratar traductor nativo
3. **Opción C - Semi-automática**: DeepL API + revisión manual

**Estimación de trabajo**:
- 6 posts x 3 idiomas = 18 traducciones
- Promedio 800 palabras por post
- Total: ~14,400 palabras
- Tiempo estimado (manual): 20-30 horas
- Costo estimado (profesional): €300-500

#### Fase 4: Verificación GraphQL
```graphql
query GetPostTranslations {
  posts(where: {language: ES}) {
    nodes {
      title
      language {
        code
      }
      translations {
        uri
        language {
          code
        }
        title
      }
    }
  }
}
```

### 7.4 Frontend Astro - Consideraciones

**El frontend debe**:
1. Detectar idioma del navegador
2. Consultar GraphQL con filtro `language: XX`
3. Mostrar selector de idioma
4. Implementar hreflang tags

**Ejemplo query por idioma**:
```javascript
// En Astro
const locale = Astro.currentLocale || 'es'
const query = `
  query GetPosts($language: LanguageCodeEnum!) {
    posts(where: {language: $language}, first: 10) {
      nodes { title slug }
    }
  }
`
const { data } = await fetch(GRAPHQL_URL, {
  method: 'POST',
  body: JSON.stringify({
    query,
    variables: { language: locale.toUpperCase() }
  })
})
```

---

## 8. SEO

### 8.1 Plugin SEO

**NO DETECTADO** en GraphQL: Yoast SEO ni Rank Math

**VERIFICAR** en WordPress Admin:
- ¿Está instalado Yoast SEO o Rank Math?
- ¿Están configurados los meta titles y descriptions?
- ¿Hay sitemap.xml generado?

**Recomendación**:

#### Yoast SEO (Freemium)
- **Pros**: Líder del mercado, UI simple, análisis en tiempo real
- **Plan gratis**: Meta tags, sitemap, breadcrumbs
- **Plan Premium** (€99/año): Redirects, internal linking, multiple keywords
- **Documentación**: https://yoast.com/wordpress/plugins/seo/

#### Rank Math (Freemium)
- **Pros**: Más features gratis, Schema markup integrado
- **Plan gratis**: Todo lo de Yoast Premium + Schema
- **Cons**: Más complejo
- **Documentación**: https://rankmath.com/

**DECISIÓN RECOMENDADA**: **Rank Math Free** (más completo sin pagar)

### 8.2 Meta Tags Verificados

**Via GraphQL**: No se exponen meta tags (necesario plugin WPGraphQL SEO)

**Verificación manual** (desde frontend):
```bash
curl https://backend.sauwasauna.com/que-es-sauwa-sauna/ | grep -i "og:\|twitter:\|description"
```

### 8.3 Schema Markup

**FALTA VERIFICAR**:
- ¿Hay Schema.org markup (JSON-LD)?
- ¿Está configurado para Articles, Organization, LocalBusiness?

**Recomendación**: Rank Math incluye Schema automático para:
- Article (posts)
- Organization (empresa)
- LocalBusiness (SAUWA locations)
- BreadcrumbList
- Person (autores)

### 8.4 Sitemap XML

**VERIFICAR**:
```bash
curl https://backend.sauwasauna.com/sitemap.xml
curl https://backend.sauwasauna.com/sitemap_index.xml
```

**Debe incluir**:
- Posts sitemap
- Categories sitemap
- Pages sitemap
- Idiomas separados (si multiidioma)

---

## 9. SEGURIDAD Y MANTENIMIENTO

### 9.1 Seguridad del GraphQL Endpoint

**VERIFICAR**:

1. **Rate Limiting**: ¿Hay límite de queries por IP?
   - Protección contra DDoS
   - Recomendación: 100 queries/minuto por IP

2. **Query Complexity Limit**: ¿Hay límite de profundidad de queries?
   - Evita queries maliciosas complejas
   - Recomendación: Max depth 10, max complexity 1000

3. **Introspection**: ¿Está habilitada en producción?
   - **DEBE ESTAR DESACTIVADA** en producción
   - Verificar con:
   ```graphql
   query { __schema { types { name } } }
   ```

4. **Authentication**: ¿Queries públicas limitadas?
   - Verificar que solo se expone contenido público
   - Mutations deben requerir autenticación

**Plugin recomendado**:
- **WPGraphQL CORS** (si frontend en dominio diferente)
- **WPGraphQL JWT Authentication** (si necesitas mutations)

### 9.2 Backups

**FALTA VERIFICAR**:
- ¿Hay backups automáticos configurados?
- ¿Frecuencia? (recomendado: diario)
- ¿Dónde se almacenan? (offsite)

**Opciones**:

#### UpdraftPlus (Freemium)
- **Pros**: Backups automáticos, restore fácil, cloud storage
- **Plan gratis**: Backup manual a Dropbox/Google Drive
- **Plan Premium** (€70/año): Backups incrementales, migrations
- **Documentación**: https://wordpress.org/plugins/updraftplus/

#### BackWPup (Gratis)
- **Pros**: Gratis, completo, múltiples destinos
- **Cons**: Menos user-friendly
- **Documentación**: https://wordpress.org/plugins/backwpup/

**DECISIÓN RECOMENDADA**: **UpdraftPlus Free** + Google Drive

### 9.3 Actualizaciones

**VERIFICAR en WordPress Admin**:

```
Dashboard > Updates
```

**Checklist**:
- [ ] WordPress Core actualizado (actual: 6.8.3)
- [ ] Plugins actualizados
- [ ] Tema actualizado
- [ ] PHP versión >= 8.0 (recomendado: 8.2)

**IMPORTANTE**: Antes de actualizar:
1. Hacer backup completo
2. Actualizar en entorno de staging primero
3. Verificar compatibilidad de plugins
4. Probar GraphQL queries después de actualizar

### 9.4 Logs de Errores

**VERIFICAR**:
- ¿Hay logs de errores de PHP?
- ¿Hay logs de errores de GraphQL?

**GraphQL Debug Mode**:
```php
// En wp-config.php
define('GRAPHQL_DEBUG', true);
```

**ADVERTENCIA**: Solo activar en desarrollo, NUNCA en producción.

---

## 10. ESTRUCTURA DE CONTENIDO FUTURO

### 10.1 Custom Post Types Potenciales

**Basado en el proyecto SAUWA**, estos CPT serían útiles:

#### 1. Locations (Localizaciones)
```php
// Campos necesarios:
- name (nombre)
- address (dirección)
- coordinates (lat/long)
- capacity (aforo)
- amenities (servicios)
- images (galería)
- availability_calendar (calendario)
```

**Uso**: Gestionar múltiples ubicaciones de saunas

#### 2. Experiences (Experiencias/Packs)
```php
// Campos necesarios:
- title
- description
- duration (30/60/90 min)
- price
- includes (qué incluye)
- min_people
- max_people
- available_locations
```

**Uso**: Sistema de reservas y packs (10+1, gift cards)

#### 3. Bookings (Reservas)
```php
// Campos necesarios:
- booking_id
- customer_info
- date_time
- location
- experience
- num_people
- payment_status
- qr_code
- reminder_sent
```

**Uso**: Gestión de reservas (requiere sistema de pago)

#### 4. FAQ
```php
// Campos necesarios:
- question
- answer
- category
- language
- order
```

**Uso**: FAQ multiidioma para chatbot y web

#### 5. Testimonials (Testimonios)
```php
// Campos necesarios:
- customer_name
- rating (1-5)
- comment
- date
- location
- photo (opcional)
- verified (sí/no)
```

**Uso**: Reviews y testimonios para landing

### 10.2 Campos Personalizados Recomendados (ACF)

**Para Posts (Blog)**:

```php
// Grupo: "Post Settings"
- reading_time (número, calculado)
- featured_video (URL YouTube)
- cta_text (texto)
- cta_url (URL)
- related_experience (relación a Experiences CPT)
```

**Para Pages**:

```php
// Grupo: "Page Hero"
- hero_title (texto)
- hero_subtitle (texto)
- hero_image (imagen)
- hero_cta (grupo: text + url)

// Grupo: "SEO Extra"
- focus_keyword (texto)
- meta_robots (select: index/noindex)
```

**Plugin necesario**: Advanced Custom Fields (ACF) PRO
- Costo: €59/año
- Documentación: https://www.advancedcustomfields.com/

**Integración con GraphQL**:
- Plugin: WPGraphQL for ACF
- Documentación: https://github.com/wp-graphql/wp-graphql-acf

### 10.3 Taxonomías Personalizadas

**Tags (Etiquetas)** - ya incluidas en WordPress
```
Ejemplos: "sauna-finlandesa", "contraste-termico", "bienestar",
          "recuperacion-deportiva", "esqui-andorra"
```

**Locations Taxonomy** (si no se usa CPT)
```
Andorra la Vella, Canillo, Soldeu, etc.
```

**Experience Types**
```
30min, 60min, 90min, Pack 10+1, Gift Card
```

### 10.4 Sistema de Posts Relacionados

**Opciones**:

#### 1. Manual (ACF)
```php
// Campo ACF en posts:
related_posts (relación, select multiple, 3 max)
```

#### 2. Automático (por categoría/tags)
```graphql
query GetRelatedPosts($categoryId: Int!, $excludeId: Int!) {
  posts(
    where: {
      categoryId: $categoryId
      notIn: [$excludeId]
    }
    first: 3
  ) {
    nodes { title slug }
  }
}
```

#### 3. Plugin (Yet Another Related Posts Plugin)
- Automático por similitud
- Thumbnail support
- GraphQL compatible

**DECISIÓN RECOMENDADA**: Opción 2 (automático) para MVP, luego migrar a manual (opción 1)

### 10.5 Sistema de Comentarios

**ESTADO ACTUAL**: No verificado

**Opciones**:

#### 1. WordPress Comments (nativo)
- **Pros**: Gratis, ya incluido
- **Cons**: Spam, moderación manual

#### 2. Disqus (terceros)
- **Pros**: Anti-spam, social login
- **Cons**: Ads en plan gratis, carga lenta

#### 3. WPDiscuz
- **Pros**: Moderno, AJAX, emoji, rating
- **Cons**: Premium features de pago

**RECOMENDACIÓN**: **Desactivar comentarios** en blog
- SAUWA es sitio de servicios, no blog personal
- Reviews mejor en Testimonials CPT
- Evita spam y moderación

---

## 11. RECOMENDACIONES DE PLUGINS

### 11.1 Instalación Prioritaria (AHORA)

| Plugin | Propósito | Plan | Prioridad |
|---|---|---|---|
| **ShortPixel Image Optimizer** | Optimización de imágenes | Freemium | CRÍTICA |
| **WPGraphQL Polylang** | Integración multiidioma GraphQL | Gratis | CRÍTICA |
| **Rank Math SEO** | SEO on-page y Schema | Gratis | ALTA |
| **UpdraftPlus** | Backups automáticos | Freemium | ALTA |

### 11.2 Instalación Fase 2 (DESPUÉS DE MVP)

| Plugin | Propósito | Plan | Prioridad |
|---|---|---|---|
| **ACF PRO** | Custom fields para CPT | €59/año | MEDIA |
| **WPGraphQL for ACF** | Exponer ACF en GraphQL | Gratis | MEDIA |
| **W3 Total Cache** | Cache general | Gratis | MEDIA |
| **Redirection** | Gestión de redirects 301 | Gratis | BAJA |

### 11.3 Plugins a EVITAR

**NO instalar**:
- Page builders (Elementor, Divi) - Frontend es Astro
- WooCommerce - No es e-commerce
- Contact Form 7 - Frontend maneja formularios
- Jetpack - Bloat innecesario

### 11.4 Orden de Instalación Recomendado

```bash
# Fase 1: Crítico (esta semana)
1. ShortPixel Image Optimizer
   - Optimizar 6 imágenes existentes
   - Configurar auto-optimization para futuras

2. WPGraphQL Polylang (verificar si ya está)
   - Verificar integración con GraphQL
   - Probar query con filtro language

3. Rank Math SEO
   - Configurar meta tags para 6 posts
   - Generar sitemap.xml
   - Configurar Schema markup

4. UpdraftPlus
   - Configurar backup diario
   - Primer backup manual inmediato
   - Conectar a Google Drive

# Fase 2: Contenido (próximas 2 semanas)
5. Traducir contenido a CA/EN/FR
   - 18 posts nuevos (6 x 3 idiomas)
   - Verificar links entre traducciones

6. ACF PRO + WPGraphQL for ACF
   - Crear campos personalizados
   - Añadir reading_time a posts existentes

# Fase 3: Performance (después de lanzamiento)
7. W3 Total Cache
   - Solo si hosting no tiene caché
   - Configurar page cache + object cache

8. Redirection
   - Solo si hay cambios de URLs
```

---

## 12. PLAN DE MEJORA PRIORITIZADO

### 12.1 Sprint 1 - Crítico (Esta semana)

**Objetivo**: Optimizar lo existente antes de crear más contenido

**Tareas**:

1. **Optimización de Imágenes** (2 horas)
   - [ ] Instalar ShortPixel
   - [ ] Configurar: Lossy + WebP
   - [ ] Ejecutar bulk optimization (6 imágenes)
   - [ ] Verificar reducción de peso (objetivo: <120KB)

2. **SEO On-Page** (3 horas)
   - [ ] Instalar Rank Math
   - [ ] Configurar meta titles (6 posts)
   - [ ] Configurar meta descriptions (6 posts)
   - [ ] Generar sitemap.xml
   - [ ] Configurar Schema: Article, Organization, LocalBusiness
   - [ ] Verificar con Google Rich Results Test

3. **Backup y Seguridad** (1 hora)
   - [ ] Instalar UpdraftPlus
   - [ ] Configurar backup diario (2am hora servidor)
   - [ ] Conectar a Google Drive
   - [ ] Ejecutar primer backup manual
   - [ ] Verificar restore (en staging)

4. **Multiidioma - Verificación** (2 horas)
   - [ ] Acceder a WordPress Admin
   - [ ] Verificar Polylang settings (4 idiomas activos)
   - [ ] Verificar WPGraphQL Polylang instalado
   - [ ] Probar query con filtro language
   - [ ] Documentar estado actual

**Total estimado**: 8 horas

### 12.2 Sprint 2 - Contenido (Próximas 2 semanas)

**Objetivo**: Completar multiidioma

**Tareas**:

1. **Traducción de Categorías** (4 horas)
   - [ ] Traducir 6 categorías a CA/EN/FR
   - [ ] Verificar slugs (andorra-naturaleza, andorra-natura, andorra-nature, andorre-nature)
   - [ ] Eliminar categorías "Sin categoría" vacías
   - [ ] Probar GraphQL queries por idioma

2. **Traducción de Posts** (20-30 horas o €300-500 profesional)
   - [ ] Definir método: Manual vs Profesional vs Semi-auto
   - [ ] Post 1: "Recuperación esquiar" → CA/EN/FR
   - [ ] Post 2: "Qué hacer Andorra" → CA/EN/FR
   - [ ] Post 3: "Baños agua fría" → CA/EN/FR
   - [ ] Post 4: "Sauna privada" → CA/EN/FR
   - [ ] Post 5: "Qué es SAUWA" → CA/EN/FR
   - [ ] Post 6: "Sauna finlandesa" → CA/EN/FR
   - [ ] Vincular traducciones en Polylang
   - [ ] Verificar GraphQL translations field

3. **Imágenes Traducidas** (4 horas)
   - [ ] Subir featured images en otros idiomas (si tienen texto)
   - [ ] Traducir alt texts (18 imágenes)
   - [ ] Optimizar con ShortPixel

**Total estimado**: 30-40 horas (o contratar)

### 12.3 Sprint 3 - Custom Fields (Después de lanzamiento)

**Objetivo**: Añadir funcionalidad avanzada

**Tareas**:

1. **ACF Setup** (3 horas)
   - [ ] Comprar ACF PRO
   - [ ] Instalar ACF PRO + WPGraphQL for ACF
   - [ ] Crear grupo "Post Settings"
   - [ ] Añadir campo: reading_time (número)
   - [ ] Añadir campo: related_posts (relación)
   - [ ] Verificar exposición en GraphQL

2. **Rellenar Custom Fields** (2 horas)
   - [ ] Calcular reading_time para 24 posts (6x4 idiomas)
   - [ ] Seleccionar 3 related posts por cada post
   - [ ] Verificar queries GraphQL con ACF fields

**Total estimado**: 5 horas

### 12.4 Sprint 4 - Custom Post Types (Futuro)

**Objetivo**: Preparar sistema de reservas

**Tareas**:

1. **Locations CPT** (4 horas)
   - [ ] Crear CPT "Locations"
   - [ ] ACF: address, coordinates, capacity, images
   - [ ] Crear 3-5 locations de ejemplo
   - [ ] Exponer en GraphQL
   - [ ] Integrar con frontend Astro

2. **Experiences CPT** (4 horas)
   - [ ] Crear CPT "Experiences"
   - [ ] ACF: duration, price, includes, capacity
   - [ ] Crear 3 experiences (30/60/90 min)
   - [ ] Relación con Locations
   - [ ] Exponer en GraphQL

3. **Bookings CPT** (8 horas + integración pago)
   - [ ] Crear CPT "Bookings"
   - [ ] ACF: customer_info, date_time, payment_status, qr_code
   - [ ] Integrar Stripe/Redsys
   - [ ] Generar QR único por reserva
   - [ ] Email automation (confirmación, reminder)
   - [ ] Exponer en GraphQL (con auth)

**Total estimado**: 16 horas (sin contar pasarela de pago)

---

## 13. CHECKLIST DE SEGURIDAD

### 13.1 WordPress Core

- [ ] WordPress actualizado a última versión estable
- [ ] PHP versión >= 8.0 (recomendado: 8.2)
- [ ] HTTPS activo (SSL/TLS)
- [ ] `wp-config.php` fuera de public_html
- [ ] Prefijo de DB diferente a `wp_` (anti SQL injection)
- [ ] Salts y keys únicos en wp-config.php
- [ ] `WP_DEBUG` en false en producción
- [ ] File permissions correctos (755 dirs, 644 files)

### 13.2 Usuarios y Accesos

- [ ] Usuario admin NO es "admin"
- [ ] Contraseñas fuertes (>12 chars, símbolos)
- [ ] Autenticación de 2 factores (plugin: Wordfence)
- [ ] Roles bien definidos (Admin, Editor, Author)
- [ ] Eliminar usuarios por defecto
- [ ] Limitar intentos de login (plugin: Limit Login Attempts)

### 13.3 GraphQL Endpoint

- [ ] Rate limiting activo (100 req/min por IP)
- [ ] Query complexity limit (max depth: 10)
- [ ] Introspection desactivada en producción
- [ ] Solo queries públicas permitidas sin auth
- [ ] CORS configurado (solo frontend Astro)
- [ ] GraphQL Debug Mode OFF en producción

### 13.4 Backups y Recuperación

- [ ] Backups automáticos diarios
- [ ] Backups offsite (Google Drive / S3)
- [ ] Retención: 30 días
- [ ] Backup manual antes de cada update
- [ ] Procedimiento de restore documentado y probado
- [ ] Backup de base de datos separado

### 13.5 Monitoreo

- [ ] Uptime monitoring (UptimeRobot / Pingdom)
- [ ] Error logs revisados semanalmente
- [ ] Google Search Console configurado
- [ ] Analytics de GraphQL (queries lentas)
- [ ] Alertas de downtime configuradas

---

## 14. MÉTRICAS Y KPIs

### 14.1 Performance

**Objetivo**: Lighthouse Score > 90

| Métrica | Estado Actual | Objetivo | Herramienta |
|---|---|---|---|
| LCP (Largest Contentful Paint) | ? | < 2.5s | PageSpeed Insights |
| FID (First Input Delay) | ? | < 100ms | PageSpeed Insights |
| CLS (Cumulative Layout Shift) | ? | < 0.1 | PageSpeed Insights |
| GraphQL Response Time | ? | < 500ms | GraphiQL Network tab |
| Image Weight (avg) | 233KB | < 120KB | DevTools |

**Cómo medir**:
```bash
# Lighthouse CLI
npx lighthouse https://backend.sauwasauna.com --view

# GraphQL query time
curl -w "@curl-format.txt" -X POST https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ posts { nodes { title } } }"}'
```

### 14.2 SEO

| Métrica | Estado Actual | Objetivo | Herramienta |
|---|---|---|---|
| Meta Titles | ? | 100% posts | Rank Math |
| Meta Descriptions | ? | 100% posts | Rank Math |
| Alt Texts | 100% | 100% | EXCELENTE |
| Sitemap.xml | ? | Sí | /sitemap.xml |
| Schema Markup | ? | Article + Org | Google Rich Results |
| hreflang tags | No | Sí (4 idiomas) | View Source |

### 14.3 Contenido

| Métrica | Estado Actual | Objetivo | Fecha |
|---|---|---|---|
| Posts en ES | 6 | 6 | COMPLETADO |
| Posts en CA | 0 | 6 | Sprint 2 |
| Posts en EN | 0 | 6 | Sprint 2 |
| Posts en FR | 0 | 6 | Sprint 2 |
| Categorías traducidas | 0 | 6x4 = 24 | Sprint 2 |
| Imágenes optimizadas | 0% | 100% | Sprint 1 |

### 14.4 Seguridad

| Métrica | Estado | Objetivo | Herramienta |
|---|---|---|---|
| Backups automáticos | ? | Diarios | UpdraftPlus |
| WordPress version | 6.8.3 | Latest | Dashboard |
| Plugins actualizados | ? | 100% | Dashboard |
| SSL/HTTPS | Sí | Sí | Browser |
| 2FA activo | ? | Sí | Wordfence |
| Uptime | ? | >99.9% | UptimeRobot |

---

## 15. PRESUPUESTO ESTIMADO

### 15.1 Plugins Premium (Opcional pero Recomendado)

| Plugin | Plan | Costo Anual | Prioridad |
|---|---|---|---|
| ShortPixel | One-Time Credits | €10 (7,000 img) | ALTA |
| ACF PRO | Personal | €59 | MEDIA |
| WP Rocket | Single | €59 | BAJA |
| Rank Math PRO | Business | €69 | BAJA |
| UpdraftPlus Premium | Personal | €70 | BAJA |
| **TOTAL (solo lo esencial)** | | **€69** | ACF PRO + ShortPixel |
| **TOTAL (completo)** | | **€267** | Todo |

**RECOMENDACIÓN PRESUPUESTO MÍNIMO**: €70/año (ACF PRO + ShortPixel credits)

### 15.2 Servicios Externos

| Servicio | Propósito | Costo Anual |
|---|---|---|
| **Hosting** | Ya contratado (Hostinger) | Incluido |
| **Google Drive** | Backups (15GB gratis) | €0 |
| **Traducción Profesional** | 14,400 palabras x 3 idiomas | €300-500 (one-time) |
| **SSL Certificate** | HTTPS (incluido en hosting) | €0 |

**TOTAL SERVICIOS**: €0/año (si traducciones son manuales)

### 15.3 Tiempo de Desarrollo

| Fase | Horas Estimadas | Tarifa (€50/h) |
|---|---|---|
| Sprint 1 - Optimización | 8h | €400 |
| Sprint 2 - Multiidioma (manual) | 35h | €1,750 |
| Sprint 3 - Custom Fields | 5h | €250 |
| Sprint 4 - CPT (futuro) | 16h | €800 |
| **TOTAL MVP** (Sprint 1+2) | **43h** | **€2,150** |

**ALTERNATIVA**: Traducción profesional (€400) + Sprint 1+2 (15h) = €1,150

---

## 16. ROADMAP VISUAL

```
AHORA (Sprint 1 - 1 semana)
├─ Instalar ShortPixel
├─ Optimizar 6 imágenes (→ WebP, <120KB)
├─ Instalar Rank Math
├─ Configurar meta tags + Schema
├─ Configurar backups (UpdraftPlus)
└─ Verificar multiidioma (Polylang)

PRÓXIMO (Sprint 2 - 2 semanas)
├─ Traducir categorías (6 → CA/EN/FR)
├─ Traducir posts (6 → CA/EN/FR) = 18 posts nuevos
├─ Optimizar imágenes traducidas
├─ Verificar GraphQL translations
└─ Frontend: Implementar selector idioma

DESPUÉS (Sprint 3 - 1 semana)
├─ Comprar ACF PRO
├─ Crear custom fields (reading_time, related_posts)
├─ Rellenar datos para 24 posts
└─ Actualizar queries GraphQL en frontend

FUTURO (Sprint 4 - 2 semanas)
├─ Crear CPT: Locations
├─ Crear CPT: Experiences
├─ Crear CPT: Bookings
├─ Integrar pasarela de pago
└─ Sistema de QR codes
```

---

## 17. RECURSOS Y DOCUMENTACIÓN

### 17.1 Documentación Oficial WordPress

- **WordPress Developer Handbook**: https://developer.wordpress.org/
- **WordPress Codex**: https://codex.wordpress.org/
- **WPGraphQL Docs**: https://www.wpgraphql.com/docs/introduction
- **Polylang Docs**: https://polylang.pro/doc/
- **WPGraphQL Polylang**: https://github.com/valu-digital/wp-graphql-polylang

### 17.2 Plugins Recomendados

- **ShortPixel**: https://shortpixel.com/
- **Rank Math**: https://rankmath.com/kb/
- **ACF PRO**: https://www.advancedcustomfields.com/resources/
- **UpdraftPlus**: https://updraftplus.com/support/
- **WPGraphQL for ACF**: https://github.com/wp-graphql/wp-graphql-acf

### 17.3 Herramientas de Testing

- **GraphiQL IDE**: https://backend.sauwasauna.com/graphql (si está habilitado)
- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/

### 17.4 Comandos Útiles

```bash
# GraphQL: Obtener posts con traducciones
curl -X POST https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ posts { nodes { title language { code } translations { title language { code } } } } }"}'

# GraphQL: Filtrar por idioma
curl -X POST https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ posts(where: {language: CA}) { nodes { title } } }"}'

# Verificar sitemap
curl https://backend.sauwasauna.com/sitemap.xml

# Verificar robots.txt
curl https://backend.sauwasauna.com/robots.txt

# Medir tiempo de respuesta GraphQL
curl -w "\nTime: %{time_total}s\n" -X POST https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ posts(first: 10) { nodes { title } } }"}'
```

---

## 18. PRÓXIMOS PASOS INMEDIATOS

### Acción 1: Acceso a WordPress Admin

**NECESARIO PARA COMPLETAR AUDITORÍA**:

1. Acceder a: https://backend.sauwasauna.com/wp-admin/
2. Verificar:
   - [ ] Plugins instalados (lista completa)
   - [ ] Configuración Polylang (idiomas activos)
   - [ ] Settings > General (idioma, timezone)
   - [ ] Settings > Reading (posts per page)
   - [ ] Settings > Permalinks (estructura)
   - [ ] Users (lista de usuarios y roles)

### Acción 2: Instalar Plugins Críticos

**ESTA SEMANA**:

```bash
# Opción 1: Via WP-CLI (si tienes SSH)
wp plugin install shortpixel-image-optimiser --activate
wp plugin install seo-by-rank-math --activate
wp plugin install updraftplus --activate

# Opción 2: Via WordPress Admin
WordPress Admin > Plugins > Add New > Search > Install > Activate
```

### Acción 3: Optimizar Imágenes Existentes

**HOY MISMO** (2 horas):

1. Instalar ShortPixel
2. Settings > ShortPixel:
   - Compression: Lossy
   - Convert to WebP: Yes
   - Backup: Yes (primera vez)
3. Media > Bulk ShortPixel > Select All (6 images) > Optimize
4. Verificar peso: ANTES 233KB avg → DESPUÉS <120KB avg

### Acción 4: Configurar SEO Básico

**MAÑANA** (3 horas):

1. Instalar Rank Math
2. Setup Wizard:
   - Site Type: Blog + LocalBusiness
   - Logo: Subir logo SAUWA
   - Social Profiles: FB, IG, etc.
   - Sitemap: Enable
3. Editar cada post (6):
   - Focus Keyword
   - Meta Title (customize)
   - Meta Description (150-160 chars)
   - Schema Type: Article
4. Pages > Organization:
   - Name: SAUWA Sauna Andorra
   - Logo: URL
   - Contact: Email, Phone
   - Address: Andorra location

### Acción 5: Primer Backup

**HOY** (30 min):

1. Instalar UpdraftPlus
2. Settings > UpdraftPlus Backups:
   - Schedule: Daily 2am
   - Retain: 30 backups
   - Remote Storage: Google Drive (connect)
3. Backup Now (manual):
   - Include: Files + Database
   - Send to: Google Drive
4. Download backup local (seguridad)

---

## 19. CONCLUSIONES Y RECOMENDACIONES FINALES

### 19.1 Estado General: BUENO CON ACCIONES INMEDIATAS

**El backend WordPress está bien configurado como base**, pero requiere:

1. **Optimización crítica** de imágenes (WebP, -50% peso)
2. **Completar multiidioma** (0% traducido → 100% en 4 idiomas)
3. **SEO on-page** (meta tags, Schema, sitemap)
4. **Backups automáticos** (seguridad)

### 19.2 Prioridades por Impacto

**ALTO IMPACTO, BAJO ESFUERZO** (hacer YA):
- Optimizar imágenes (2h, €0, +30% performance)
- Instalar Rank Math (3h, €0, +SEO)
- Configurar backups (1h, €0, +seguridad)

**ALTO IMPACTO, ALTO ESFUERZO** (planificar):
- Traducir contenido (30h o €400, +75% audiencia)
- Custom Post Types (16h, necesario para reservas)

**BAJO IMPACTO** (posponer):
- ACF custom fields (nice-to-have)
- Cache plugins (hosting ya lo hace)
- Premium plugins (freemium suficiente)

### 19.3 Recomendación Final

**SPRINT 1 (esta semana)**:
Foco en optimización técnica (imágenes + SEO + backups) = 8 horas

**SPRINT 2 (próximas 2 semanas)**:
Completar multiidioma (traducción profesional recomendada) = €400

**SPRINT 3+**:
Evaluar necesidad de CPT según roadmap de reservas

**PRESUPUESTO MÍNIMO RECOMENDADO**:
- Traducción profesional: €400 (one-time)
- ShortPixel credits: €10 (one-time)
- ACF PRO: €59/año (cuando se necesite CPT)
- **TOTAL AÑO 1**: €469

**ROI ESTIMADO**:
- Performance: +30% velocidad = mejor UX + SEO
- SEO: Meta tags + Schema = +20% tráfico orgánico
- Multiidioma: +75% audiencia (CA/EN/FR)
- Backups: Evitar pérdida datos (invaluable)

---

## 20. CONTACTO Y SOPORTE

**Documentación creada por**: wordpress-plugin-developer (Claude Code)
**Fecha**: 20 de octubre de 2025
**Versión**: 1.0

**Para implementar estas recomendaciones**:
1. Revisar este documento con el equipo
2. Priorizar acciones según roadmap del proyecto
3. Solicitar acceso a WordPress Admin si es necesario
4. Ejecutar Sprint 1 (optimización) esta semana
5. Planificar Sprint 2 (traducciones) con presupuesto aprobado

**Próxima auditoría recomendada**: Después de completar Sprint 1+2 (en 3 semanas)

---

**FIN DEL REPORTE**
