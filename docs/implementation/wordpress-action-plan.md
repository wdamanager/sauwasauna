# Plan de Acción Inmediato - Backend WordPress SAUWA

**Fecha**: 20 de octubre de 2025
**Objetivo**: Optimizar backend WordPress en 1 semana
**Esfuerzo estimado**: 8 horas
**Costo**: €10 (ShortPixel credits)

---

## RESUMEN EJECUTIVO

### Situación Actual
- 6 posts publicados en español únicamente
- Imágenes pesadas (promedio 233KB, objetivo <120KB)
- Sin SEO on-page configurado
- Sin backups automáticos
- Polylang instalado pero sin traducciones

### Resultado Esperado (después de Sprint 1)
- Imágenes optimizadas (-50% peso, formato WebP)
- SEO configurado (meta tags, Schema, sitemap)
- Backups automáticos diarios
- Base para multiidioma verificada

---

## SPRINT 1: OPTIMIZACIÓN TÉCNICA (Esta Semana)

### DÍA 1: Optimización de Imágenes (2 horas)

#### Tarea 1.1: Instalar ShortPixel (15 min)

**Acceso necesario**: WordPress Admin (https://backend.sauwasauna.com/wp-admin/)

**Pasos**:
1. [ ] Login en WordPress Admin
2. [ ] Ir a: Plugins > Add New
3. [ ] Buscar: "ShortPixel Image Optimizer"
4. [ ] Click: Install Now > Activate
5. [ ] Verificar activación exitosa

**Alternativa via WP-CLI** (si tienes acceso SSH):
```bash
wp plugin install shortpixel-image-optimiser --activate
```

#### Tarea 1.2: Configurar ShortPixel (15 min)

**Pasos**:
1. [ ] Ir a: Settings > ShortPixel
2. [ ] Registrar cuenta (email + API key gratis)
3. [ ] Configuración recomendada:
   - Compression Type: **Lossy**
   - Convert to WebP: **Yes**
   - Convert PNG to JPEG: **No** (si tienes PNGs con transparencia)
   - Resize Large Images: **1920px** (mantener tamaño actual)
   - Optimize Thumbnails: **Yes**
   - Backup: **Yes** (primera vez)
   - Lazy Load: **No** (Astro frontend ya lo hace)

4. [ ] Save Settings

**Documentación**: https://shortpixel.com/knowledge-base/article/7-how-to-configure-shortpixel

#### Tarea 1.3: Optimizar Imágenes Existentes (30 min)

**Pasos**:
1. [ ] Ir a: Media > Bulk ShortPixel
2. [ ] Click: "Start Optimizing" o "Resume Optimizing"
3. [ ] Esperar a que procese las 6 imágenes + thumbnails
   - Total imágenes: ~6 originales + 5 tamaños cada una = ~36 imágenes
   - Tiempo estimado: 5-10 minutos

4. [ ] Verificar resultados:
   - Ver % de reducción
   - Verificar que formato WebP se generó
   - Comprobar que backups se crearon

5. [ ] Ir a: Media > Library
6. [ ] Click en cada imagen featured
7. [ ] Verificar:
   - [ ] Nuevo tamaño < 120KB (objetivo)
   - [ ] Archivo WebP disponible
   - [ ] Alt text sigue intacto

**Imágenes a verificar**:
- recuperacion-tras-esquiar-andorra-modalidad-30-60-90-sauwa-1920x1080px.jpg (era 260KB)
- que-hacer-andorra-invierno-sauna-finlandesa-sauwa-1920x1080px.jpg (era 207KB)
- banos-agua-fria-andorra-sauwa-sauna-1920x1080px.jpg (era 346KB - CRÍTICA)
- sauna-privada-andorra-lena-loyly-experiencia-sauna-1920x1080px.jpg (era 188KB)
- sauwa-sauna-1920x1080px.jpg (era 213KB)
- sauna-finlandesa-sauwa-1920x1080px.jpg (era 183KB)

#### Tarea 1.4: Verificar Frontend (30 min)

**Pasos**:
1. [ ] Ir al frontend Astro (https://sauwasauna.com/blog o local)
2. [ ] Abrir DevTools > Network
3. [ ] Reload página del blog
4. [ ] Verificar que las imágenes:
   - [ ] Se cargan en formato WebP (si navegador lo soporta)
   - [ ] Peso reducido vs antes
   - [ ] Sin errores de carga

5. [ ] Test con PageSpeed Insights:
   ```bash
   https://pagespeed.web.dev/analysis?url=https://sauwasauna.com/blog
   ```
   - [ ] LCP mejorado
   - [ ] Score general mejorado

**Criterio de éxito**:
- Peso promedio de imágenes: <120KB (era 233KB)
- Formato: WebP + JPEG fallback
- Reducción total: ~40-50%

#### Tarea 1.5: Comprar Créditos (si es necesario) (10 min)

**SOLO si se agotaron los 100 créditos gratuitos**:

1. [ ] Ir a: Settings > ShortPixel > View Quota
2. [ ] Si quedan <50 créditos: comprar pack
   - Recomendado: **7,000 imágenes por €9.99** (one-time)
   - URL: https://shortpixel.com/pricing

3. [ ] Esto cubre:
   - 6 posts actuales × 6 tamaños = 36 imágenes
   - Posts futuros en 3 idiomas (18 posts × 6 tamaños = 108 imágenes)
   - Total necesario: ~150 imágenes
   - Sobrante: ~6,850 para el futuro

---

### DÍA 2: SEO On-Page (3 horas)

#### Tarea 2.1: Instalar Rank Math (15 min)

**Pasos**:
1. [ ] Ir a: Plugins > Add New
2. [ ] Buscar: "Rank Math SEO"
3. [ ] Click: Install Now > Activate
4. [ ] Iniciar Setup Wizard automático

**Alternativa via WP-CLI**:
```bash
wp plugin install seo-by-rank-math --activate
```

#### Tarea 2.2: Setup Wizard Rank Math (30 min)

**Pasos del wizard**:

**1. Welcome**
- [ ] Choose mode: Easy (recomendado para empezar)

**2. Site Settings**
- [ ] Site Type: **Blog + Local Business**
- [ ] Site Name: **SAUWA Sauna Andorra**
- [ ] Logo: Upload logo SAUWA (si tienes)

**3. Organization or Person**
- [ ] Choose: **Organization**
- [ ] Name: **SAUWA Sauna**
- [ ] URL: **https://sauwasauna.com**
- [ ] Logo: Mismo que arriba
- [ ] Default Social Share Image: Featured image del post principal

**4. Social Profiles**
- [ ] Facebook: https://facebook.com/sauwa (si existe)
- [ ] Instagram: https://instagram.com/sauwa (si existe)
- [ ] Twitter: (dejar vacío si no hay)
- [ ] LinkedIn: (si existe)
- [ ] YouTube: (si existe)

**5. Sitemap**
- [ ] Enable Sitemap: **Yes**
- [ ] Include Post Types: **Posts, Pages**
- [ ] Include Taxonomies: **Categories**
- [ ] Exclude: Tags (si no se usan)

**6. Optimization**
- [ ] Noindex Empty Category: **Yes**
- [ ] Noindex Paginated Pages: **No** (queremos indexar blog paginated)
- [ ] Open External Links in New Tab: **No** (UX)
- [ ] Nofollow External Links: **No**

**7. Advanced Options**
- [ ] Enable Breadcrumbs: **Yes** (útil para Astro frontend)
- [ ] Redirect Attachments: **Yes**
- [ ] Strip Category Base: **No** (mantener URLs limpias)

**8. Google Services**
- [ ] Google Search Console: (conectar si tienes acceso)
- [ ] Skip por ahora si no tienes acceso

**9. Finish**
- [ ] Complete setup

#### Tarea 2.3: Configurar Schema Organization (15 min)

**Pasos**:
1. [ ] Ir a: Rank Math > General Settings > Local SEO
2. [ ] Configurar:

```
Business Type: Local Business > Sauna
Business Name: SAUWA Sauna Andorra
Street Address: [Dirección real de SAUWA]
City: Andorra la Vella (o ubicación principal)
State/Region: Andorra
Postal Code: [código postal]
Country: Andorra
Latitude: [coordenadas GPS]
Longitude: [coordenadas GPS]
Phone: [teléfono de contacto]
Email: [email de contacto]
Opening Hours:
  - [Configurar horarios de apertura]
Price Range: €€ (medio-alto)
```

3. [ ] Save

**IMPORTANTE**: Si no tienes todos los datos, dejar vacío por ahora y completar después.

#### Tarea 2.4: Optimizar Posts (90 min = 15 min por post)

**Para CADA uno de los 6 posts**:

1. [ ] Ir a: Posts > All Posts
2. [ ] Edit post: "Recuperación tras esquiar en Andorra"

**En el editor de Rank Math** (panel lateral derecho):

**Focus Keyword**:
```
Post 1: recuperación tras esquiar andorra
Post 2: qué hacer andorra invierno
Post 3: baños agua fría andorra
Post 4: sauna privada andorra
Post 5: sauwa sauna andorra
Post 6: sauna finlandesa
```

**SEO Title** (max 60 chars):
```
Ejemplo Post 1:
Recuperación tras Esquiar en Andorra | SAUWA Sauna
(59 caracteres)

Plantilla genérica:
[Título del Post] | SAUWA Sauna
```

**Meta Description** (max 160 chars):
```
Ejemplo Post 1:
Descubre cómo recuperarte tras esquiar en Andorra con sauna de leña y baño frío guiado. Modalidades 30/60/90 min adaptadas a tu nivel. Reserva SAUWA.
(158 caracteres)

Plantilla:
- Incluir keyword principal
- Mencionar beneficio/solución
- Call to action (Reserva, Descubre, Aprende)
- Longitud: 150-160 chars
```

**Schema Type**:
- [ ] Article (por defecto)

**Advanced**:
- [ ] Canonical URL: (dejar por defecto)
- [ ] Robots Meta: index, follow (por defecto)

**Social Tab**:
- [ ] Facebook/OG Title: (mismo que SEO Title)
- [ ] Facebook/OG Description: (mismo que Meta Description)
- [ ] Facebook/OG Image: (featured image automática)
- [ ] Twitter Card: Summary with Large Image

3. [ ] Verificar Score de Rank Math:
   - Objetivo: **80-100/100** (verde)
   - Si <80: seguir sugerencias del panel

4. [ ] Update post

5. [ ] Repetir para los 6 posts:
   - [ ] Post 1: Recuperación tras esquiar
   - [ ] Post 2: Qué hacer en invierno
   - [ ] Post 3: Baños de agua fría
   - [ ] Post 4: Sauna privada
   - [ ] Post 5: Qué es SAUWA
   - [ ] Post 6: Sauna finlandesa

**Tiempo estimado**: 15 min × 6 posts = 90 min

#### Tarea 2.5: Verificar Sitemap (15 min)

**Pasos**:
1. [ ] Ir a: https://backend.sauwasauna.com/sitemap_index.xml
2. [ ] Verificar que se muestra XML con:
   - Posts sitemap
   - Categories sitemap
   - Pages sitemap

3. [ ] Click en "post-sitemap.xml"
4. [ ] Verificar que aparecen los 6 posts con:
   - URL
   - lastmod (fecha de modificación)
   - priority

5. [ ] Copiar URL del sitemap: https://backend.sauwasauna.com/sitemap_index.xml

**PARA DESPUÉS** (no ahora):
- Enviar a Google Search Console
- Enviar a Bing Webmaster Tools

#### Tarea 2.6: Test de Schema Markup (15 min)

**Pasos**:
1. [ ] Abrir: https://search.google.com/test/rich-results
2. [ ] Ingresar URL: https://backend.sauwasauna.com/que-es-sauwa-sauna/
3. [ ] Click: Test URL
4. [ ] Verificar que aparece:
   - [ ] Article Schema
   - [ ] Organization Schema
   - [ ] LocalBusiness Schema (si configuraste)

5. [ ] Si hay errores: corregir en Rank Math settings

6. [ ] Repetir test con 2-3 posts diferentes

**Criterio de éxito**: Rich Results válidos sin errores críticos

---

### DÍA 3: Backups y Seguridad (1 hora)

#### Tarea 3.1: Instalar UpdraftPlus (10 min)

**Pasos**:
1. [ ] Ir a: Plugins > Add New
2. [ ] Buscar: "UpdraftPlus"
3. [ ] Install Now > Activate

**Alternativa via WP-CLI**:
```bash
wp plugin install updraftplus --activate
```

#### Tarea 3.2: Conectar Google Drive (15 min)

**Pasos**:
1. [ ] Ir a: Settings > UpdraftPlus Backups
2. [ ] Tab: Settings
3. [ ] Files backup schedule:
   - [ ] Frequency: **Daily** (o Weekly si poco contenido)
   - [ ] Time: **02:00** (2am, fuera de horario pico)
   - [ ] Retain: **30 backups** (1 mes)

4. [ ] Database backup schedule:
   - [ ] Frequency: **Daily**
   - [ ] Time: **02:00**
   - [ ] Retain: **30 backups**

5. [ ] Remote storage:
   - [ ] Select: **Google Drive**
   - [ ] Click: "Authenticate with Google"
   - [ ] Login con cuenta Google
   - [ ] Grant permissions
   - [ ] Verificar: "Successfully authenticated"

6. [ ] Include in files backup:
   - [ ] Plugins: **Yes**
   - [ ] Themes: **Yes**
   - [ ] Uploads: **Yes**
   - [ ] Others: **Yes**
   - [ ] Database: **Yes** (automatic)

7. [ ] Save Changes

#### Tarea 3.3: Primer Backup Manual (20 min)

**Pasos**:
1. [ ] Ir a: Settings > UpdraftPlus Backups
2. [ ] Tab: Backup / Restore
3. [ ] Click: **Backup Now**
4. [ ] Popup options:
   - [ ] Include database: **Yes**
   - [ ] Include files: **Yes**
   - [ ] Send to remote storage: **Google Drive** (Yes)

5. [ ] Click: Backup Now
6. [ ] Esperar a que complete (5-10 min):
   - Backup de archivos (~100-200MB)
   - Backup de database (~5-10MB)
   - Upload a Google Drive

7. [ ] Verificar en Google Drive:
   - [ ] Abrir Google Drive
   - [ ] Buscar carpeta "UpdraftPlus"
   - [ ] Verificar archivos .zip presentes

#### Tarea 3.4: Test de Restore (15 min)

**IMPORTANTE**: Hacer esto SOLO en entorno de staging, NO en producción

**Si tienes staging**:
1. [ ] Ir a staging site
2. [ ] Install UpdraftPlus
3. [ ] Connect to Google Drive (same account)
4. [ ] Tab: Backup / Restore
5. [ ] Rescan remote storage
6. [ ] Select latest backup
7. [ ] Click: Restore
8. [ ] Verify restoration successful

**Si NO tienes staging**: Skip por ahora, pero documentar proceso

#### Tarea 3.5: Configurar Email Notifications (opcional, 5 min)

**Pasos**:
1. [ ] Ir a: Settings > UpdraftPlus > Settings
2. [ ] Email: [tu email]
3. [ ] Report: On successful backup AND errors
4. [ ] Save

**Resultado**: Recibirás email cada vez que se complete o falle un backup

---

### DÍA 4: Verificación Multiidioma (2 horas)

#### Tarea 4.1: Verificar Polylang Settings (30 min)

**Pasos**:
1. [ ] Ir a: Languages (Polylang menu)
2. [ ] Verificar idiomas instalados:
   - [ ] ES - Español (activo)
   - [ ] CA - Català (¿activo?)
   - [ ] EN - English (¿activo?)
   - [ ] FR - Français (¿activo?)

3. [ ] Si faltan idiomas:
   - [ ] Click: Add New Language
   - [ ] Seleccionar CA, EN, FR
   - [ ] Save

4. [ ] Settings > Languages:
   - [ ] Default language: **Español** (ES)
   - [ ] Detect browser language: **Yes** (recomendado)
   - [ ] URL modifications: **Different subdirectories** (ejemplo: /es/, /ca/, /en/, /fr/)
   - [ ] Hide URL for default language: **No** (mantener /es/)

5. [ ] Save

**Documentar en screenshot**: Captura de pantalla de la configuración

#### Tarea 4.2: Verificar WPGraphQL Polylang (15 min)

**Pasos**:
1. [ ] Ir a: Plugins > Installed Plugins
2. [ ] Buscar: "WPGraphQL Polylang" o "WPGraphQL for Polylang"

**Si NO está instalado**:
3. [ ] Ir a: Plugins > Add New
4. [ ] Buscar: "WPGraphQL Polylang"
5. [ ] Install + Activate

**ALTERNATIVA** (si no existe en repo):
```bash
# Via GitHub (requiere SSH)
cd wp-content/plugins/
git clone https://github.com/valu-digital/wp-graphql-polylang.git
cd ../../
wp plugin activate wp-graphql-polylang
```

**Verificar integración**:
6. [ ] Ir a: GraphQL > Settings (si existe)
7. [ ] Verificar que Polylang aparece en opciones

#### Tarea 4.3: Test GraphQL Language Filtering (30 min)

**Test 1: Query posts en español**
```bash
curl -X POST https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ posts(where: {language: ES}, first: 5) { nodes { title language { code } } } }"}'
```

**Resultado esperado**:
```json
{
  "data": {
    "posts": {
      "nodes": [
        {
          "title": "Recuperación tras esquiar en Andorra",
          "language": {"code": "ES"}
        },
        ...
      ]
    }
  }
}
```

**Test 2: Query con campo translations**
```bash
curl -X POST https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ posts(first: 1) { nodes { title translations { title language { code } } } } }"}'
```

**Resultado esperado AHORA** (sin traducciones):
```json
{
  "translations": []
}
```

**Resultado esperado DESPUÉS** (con traducciones):
```json
{
  "translations": [
    {"title": "Recovery after skiing in Andorra", "language": {"code": "EN"}},
    {"title": "Recuperació després d'esquiar a Andorra", "language": {"code": "CA"}},
    ...
  ]
}
```

#### Tarea 4.4: Documentar Estado Actual (30 min)

**Crear documento**: `docs/multilanguage-status.md`

**Contenido**:
```markdown
# Estado Multiidioma - SAUWA Backend

## Configuración Polylang
- Idiomas activos: ES, CA, EN, FR (Sí/No para cada uno)
- Default language: ES
- URL structure: /es/, /ca/, /en/, /fr/
- Browser detection: Yes

## WPGraphQL Polylang
- Plugin instalado: Sí/No
- Versión: X.X.X
- GraphQL field `language` disponible: Sí/No
- GraphQL field `translations` disponible: Sí/No

## Contenido Actual
- Posts en ES: 6
- Posts en CA: 0
- Posts en EN: 0
- Posts en FR: 0

## Próximos Pasos
1. Traducir categorías (6 → CA/EN/FR)
2. Traducir posts (6 → CA/EN/FR = 18 nuevos)
3. Verificar links entre traducciones
4. Test frontend con selector de idioma

## Estimación
- Tiempo: 30-40 horas (manual) o €400 (profesional)
- Deadline: Sprint 2 (próximas 2 semanas)
```

5. [ ] Guardar documento
6. [ ] Compartir con equipo

#### Tarea 4.5: Preparar Plan de Traducción (15 min)

**Decisión necesaria**: ¿Traducción manual o profesional?

**Opción A: Manual**
- Tiempo: 30-40 horas
- Costo: €0
- Riesgo: Calidad variable, errores

**Opción B: Profesional**
- Tiempo: 5 horas (supervisión)
- Costo: €300-400
- Calidad: Alta, nativo

**Opción C: Semi-automática (DeepL + revisión)**
- Tiempo: 15-20 horas
- Costo: €30 (DeepL API)
- Calidad: Media-alta, requiere revisión

**Documentar decisión** y presupuesto aprobado

---

## CHECKLIST FINAL DÍA 4

### Verificación de Completitud

**Imágenes** (Día 1):
- [ ] ShortPixel instalado y configurado
- [ ] 6 imágenes optimizadas (WebP + reducción >40%)
- [ ] Peso promedio <120KB
- [ ] Frontend carga imágenes correctamente
- [ ] PageSpeed Insights mejorado

**SEO** (Día 2):
- [ ] Rank Math instalado
- [ ] Schema Organization configurado
- [ ] 6 posts con meta titles optimizados
- [ ] 6 posts con meta descriptions (150-160 chars)
- [ ] Sitemap.xml generado y accesible
- [ ] Rich Results Test pasa sin errores
- [ ] Score Rank Math >80/100 en todos los posts

**Backups** (Día 3):
- [ ] UpdraftPlus instalado
- [ ] Conectado a Google Drive
- [ ] Backup schedule: Daily 2am
- [ ] Primer backup completado
- [ ] Backups en Google Drive verificados
- [ ] Email notifications configuradas

**Multiidioma** (Día 4):
- [ ] Polylang configurado (4 idiomas)
- [ ] WPGraphQL Polylang instalado
- [ ] GraphQL language filter funciona
- [ ] Estado actual documentado
- [ ] Plan de traducción definido

---

## MÉTRICAS DE ÉXITO

### Antes vs Después

| Métrica | Antes | Después | Mejora |
|---|---|---|---|
| Peso imágenes (avg) | 233 KB | <120 KB | -48% |
| Posts con meta tags | 0% | 100% | +100% |
| Sitemap.xml | No | Sí | ✅ |
| Backups automáticos | No | Sí (diarios) | ✅ |
| Schema markup | No | Sí | ✅ |
| Idiomas activos | 1 (ES) | 4 (ES/CA/EN/FR) | +300% |

### KPIs Post-Sprint 1

**Performance**:
- [ ] PageSpeed Score: >80 (antes: ?)
- [ ] LCP: <2.5s (antes: ?)
- [ ] Image weight reduction: >40%

**SEO**:
- [ ] Meta titles: 100% posts
- [ ] Meta descriptions: 100% posts
- [ ] Rich Results: 0 errores
- [ ] Sitemap: Accesible

**Seguridad**:
- [ ] Backups: Funcionando
- [ ] Backup test: OK (en staging)
- [ ] Retention: 30 días

---

## PROBLEMAS COMUNES Y SOLUCIONES

### Problema 1: ShortPixel no optimiza

**Síntomas**: Imágenes quedan igual tamaño

**Soluciones**:
1. Verificar API key válida
2. Check quota (Settings > ShortPixel > View Quota)
3. Probar con 1 imagen manual (Media > Optimize)
4. Ver error log (Settings > ShortPixel > Advanced > Debug)

### Problema 2: Rank Math score bajo (<80)

**Causas comunes**:
- Focus keyword no en título
- Meta description muy corta/larga
- Falta alt text en imágenes
- Contenido muy corto

**Solución**: Seguir sugerencias del panel Rank Math

### Problema 3: Backup falla

**Causas comunes**:
- Sin espacio en Google Drive
- Timeout (archivos muy grandes)
- Permisos de Google Drive revocados

**Soluciones**:
1. Verificar espacio en Google Drive
2. Aumentar max execution time (Settings > UpdraftPlus > Expert)
3. Re-authenticate Google Drive

### Problema 4: GraphQL language filter no funciona

**Causas**:
- WPGraphQL Polylang no instalado
- Polylang no configurado
- Query syntax incorrecta

**Solución**:
```graphql
# Correcto
posts(where: {language: ES}) { ... }

# Incorrecto
posts(language: ES) { ... }
```

---

## SIGUIENTE SPRINT: TRADUCCIÓN DE CONTENIDO

### Sprint 2 Preparación

**Objetivo**: 6 posts × 3 idiomas = 18 posts nuevos

**Tareas**:
1. Contratar traductor profesional O
2. Asignar recursos internos para traducción manual
3. Preparar brief de traducción:
   - Glosario de términos (sauna, löyly, etc.)
   - Tono de voz (profesional pero cercano)
   - Keywords por idioma

4. Crear posts en otros idiomas:
   - [ ] Duplicate post en WordPress
   - [ ] Translate title, content, excerpt
   - [ ] Upload featured image (si tiene texto)
   - [ ] Translate alt text
   - [ ] Link translations (Polylang)
   - [ ] Optimize SEO (Rank Math)

5. Verificar:
   - [ ] GraphQL translations field populated
   - [ ] Frontend language selector funciona
   - [ ] hreflang tags correctos

**Estimación**: 2 semanas (30-40h manual o €400 profesional)

---

## RECURSOS Y SOPORTE

### Documentación Generada

Los siguientes documentos están disponibles en `C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\docs\`:

1. **wordpress-backend-audit.md** (este documento)
   - Auditoría completa del backend
   - 20 secciones con análisis detallado

2. **graphql-queries-reference.md**
   - Queries GraphQL de referencia
   - Ejemplos para Astro frontend

3. **wordpress-action-plan.md** (presente documento)
   - Plan de acción día a día
   - Checklists ejecutables

### Enlaces Útiles

**Plugins**:
- ShortPixel: https://shortpixel.com/knowledge-base/
- Rank Math: https://rankmath.com/kb/
- UpdraftPlus: https://updraftplus.com/support/

**Testing Tools**:
- PageSpeed Insights: https://pagespeed.web.dev/
- Rich Results Test: https://search.google.com/test/rich-results
- GTmetrix: https://gtmetrix.com/

**WordPress**:
- Developer Handbook: https://developer.wordpress.org/
- WPGraphQL Docs: https://www.wpgraphql.com/docs/
- Polylang Docs: https://polylang.pro/doc/

### Comandos Útiles

```bash
# Test GraphQL endpoint
curl -X POST https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ generalSettings { title } }"}'

# Check image size
curl -I https://backend.sauwasauna.com/wp-content/uploads/2025/10/[image].jpg | grep -i content-length

# Verify sitemap
curl https://backend.sauwasauna.com/sitemap_index.xml

# Test Schema markup
curl https://backend.sauwasauna.com/que-es-sauwa-sauna/ | grep -o 'application/ld+json'
```

---

## SIGN-OFF

### Al completar Sprint 1:

**Developer**:
- [ ] Todas las tareas completadas
- [ ] Tests pasados
- [ ] Documentación actualizada

**Client/PM**:
- [ ] Resultados verificados
- [ ] Métricas de éxito cumplidas
- [ ] Aprobación para Sprint 2

**Fecha completado**: _______________
**Firma**: _______________

---

**Última actualización**: 20 de octubre de 2025
**Mantenido por**: wordpress-plugin-developer
**Proyecto**: SAUWA Sauna Andorra
