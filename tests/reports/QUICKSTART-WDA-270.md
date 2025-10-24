# QUICKSTART: Sistema GraphQL Client-Side WDA-270

## Para Comenzar Rápidamente

### 1. Verificar Instalación

Todos los archivos ya están instalados en:
```
C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\
```

### 2. Uso Inmediato

#### Opción A: Usar el Componente (Más Simple)

```astro
---
// En cualquier página .astro
import BlogPostsClient from '../components/blog/BlogPostsClient.astro';
---

<BlogPostsClient postsPerPage={6} showLoadMore={true} />
```

#### Opción B: Ver Ejemplo Completo

1. Abre `astro/src/pages/blog-example.astro`
2. Copia el código a tu página
3. Ajusta según necesites

#### Opción C: Implementación Custom

```astro
---
// Tu página personalizada
---

<div id="posts-container"></div>

<script>
  import { GraphQLClient, QUERIES } from '../lib/wordpress';

  const client = new GraphQLClient();

  async function loadPosts() {
    const data = await client.query(QUERIES.GET_POSTS, { first: 6 });
    console.log(data.posts.nodes);
    // Renderizar tus posts aquí
  }

  loadPosts();
</script>
```

---

## Testing Rápido

### Opción 1: En Consola del Navegador

1. Abre DevTools (F12)
2. Ejecuta:

```javascript
const { GraphQLClient } = await import('/src/lib/wordpress/graphql-client.js');
const { QUERIES } = await import('/src/lib/wordpress/queries.js');

const client = new GraphQLClient();
const data = await client.query(QUERIES.GET_POSTS, { first: 3 });
console.log(data);
```

### Opción 2: Test Suite Interactiva

1. Abre `astro/src/lib/wordpress/test.html` en navegador
2. Click "Run All Tests"
3. Verifica que todos pasen

---

## Configuración

### Cambiar Endpoint (Si es necesario)

Edita `astro/src/lib/wordpress/config.js`:

```javascript
export const GRAPHQL_CONFIG = {
  endpoint: 'https://backend.sauwasauna.com/graphql', // Tu endpoint
  cacheDuration: 5 * 60 * 1000, // Cambiar duración cache
  defaultPostsPerPage: 6, // Cambiar posts por página
};
```

---

## Migración desde BlogScrollCards.astro

### Antes (SSG - Build Time)
```astro
---
import { getLatestPosts } from '../lib/graphql';
const posts = await getLatestPosts(6); // En build time
---
```

### Después (Client-Side - Runtime)
```astro
---
import BlogPostsClient from '../components/blog/BlogPostsClient.astro';
---

<BlogPostsClient postsPerPage={6} /> <!-- En runtime, browser -->
```

### Ventajas del Nuevo Sistema
- ✅ Nuevos posts aparecen sin rebuild
- ✅ Compatible con hosting compartido
- ✅ Cache inteligente de 5 minutos
- ✅ Paginación "Load More"
- ✅ Error handling + retry

---

## Documentación Completa

Para más detalles, consulta:

1. **README.md** - Documentación técnica completa
   - Ubicación: `astro/src/lib/wordpress/README.md`
   - Contenido: API reference, configuración, troubleshooting

2. **USAGE.md** - Ejemplos prácticos
   - Ubicación: `astro/src/lib/wordpress/USAGE.md`
   - Contenido: Filtros, búsqueda, infinite scroll, etc.

3. **WDA-270-IMPLEMENTATION.md** - Reporte de implementación
   - Ubicación: Raíz del proyecto
   - Contenido: Criterios de aceptación, testing, deployment

---

## FAQ Rápido

### ¿Cómo funciona el cache?

- **Duración**: 5 minutos por defecto
- **Storage**: localStorage del navegador
- **Clear manual**: `client.clearCache()`

### ¿Cómo añado más posts por página?

```astro
<BlogPostsClient postsPerPage={12} />
```

### ¿Cómo desactivo "Load More"?

```astro
<BlogPostsClient showLoadMore={false} />
```

### ¿Cómo cambio los colores?

Edita los estilos en `BlogPostsClient.astro`:

```css
.card-category {
  background: #DB4529; /* Tu color */
}

.blog-card:hover .card-title {
  color: #BA2515; /* Tu color */
}
```

### ¿Necesito rebuild de Astro?

**NO**. Este sistema funciona 100% client-side. Solo rebuild si cambias el HTML/CSS del componente, no por nuevos posts en WordPress.

---

## Troubleshooting Rápido

### Posts no cargan

1. Verifica endpoint en `config.js`
2. Verifica WordPress GraphQL está activo
3. Check console del navegador (F12)
4. Intenta: `client.clearCache()`

### CORS Error

Verifica headers en WordPress:
```php
// functions.php
add_filter('graphql_response_headers_to_send', function($headers) {
  $headers['Access-Control-Allow-Origin'] = '*';
  return $headers;
});
```

### Cache no funciona

1. Verifica localStorage disponible
2. Check private/incognito mode (puede bloquear localStorage)
3. Intenta clear browser cache

---

## Siguiente Paso

Ahora que tienes el sistema funcionando, puedes:

1. **Integrar en landing**: Reemplaza `BlogScrollCards.astro` con `BlogPostsClient.astro`
2. **Personalizar estilos**: Edita colores/tipografía según brand guidelines
3. **Añadir features**: Consulta USAGE.md para filtros, búsqueda, etc.

---

## Soporte

- **Documentación**: Ver archivos .md en `astro/src/lib/wordpress/`
- **Testing**: Usar `test.html` para debugging
- **Ejemplos**: Ver `blog-example.astro`
- **Linear**: WDA-270

---

**Sistema listo para producción** ✅

Implementado por: Moisés + @astro-ux-architect
Fecha: 20 Octubre 2024
