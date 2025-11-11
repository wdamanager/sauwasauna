# Guía de Uso - Sistema GraphQL Client-Side

## Índice

1. [Instalación](#instalación)
2. [Uso Básico](#uso-básico)
3. [Componente BlogPostsClient](#componente-blogpostsclient)
4. [Ejemplos Avanzados](#ejemplos-avanzados)
5. [Testing](#testing)
6. [Best Practices](#best-practices)

---

## Instalación

El sistema ya está instalado en el proyecto. No requiere dependencias externas.

### Estructura de archivos

```
astro/src/
├── lib/wordpress/
│   ├── config.js
│   ├── graphql-client.js
│   ├── queries.js
│   └── cache-manager.js
└── components/blog/
    └── BlogPostsClient.astro
```

---

## Uso Básico

### 1. Usar el componente BlogPostsClient

La forma más simple es usar el componente ya creado:

```astro
---
// src/pages/blog.astro
import BlogPostsClient from '../components/blog/BlogPostsClient.astro';
---

<html>
  <body>
    <main>
      <h1>Blog</h1>
      <BlogPostsClient postsPerPage={6} showLoadMore={true} />
    </main>
  </body>
</html>
```

#### Props disponibles

- `postsPerPage` (number): Número de posts por página (default: 6)
- `showLoadMore` (boolean): Mostrar botón "Cargar más" (default: true)

### 2. Crear tu propio componente

Si necesitas personalizar la funcionalidad:

```astro
---
// src/components/MyCustomPosts.astro
---

<div id="my-posts"></div>

<script>
  import { GraphQLClient } from '../lib/wordpress/graphql-client.js';
  import { QUERIES } from '../lib/wordpress/queries.js';

  const client = new GraphQLClient();

  async function loadPosts() {
    try {
      const data = await client.query(QUERIES.GET_POSTS, {
        first: 3
      });

      const container = document.getElementById('my-posts');
      if (!container) return;

      const postsHTML = data.posts.nodes.map(post => `
        <article>
          <h2>${post.title}</h2>
          <p>${post.excerpt}</p>
        </article>
      `).join('');

      container.innerHTML = postsHTML;

    } catch (error) {
      console.error('Error:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', loadPosts);
</script>
```

---

## Componente BlogPostsClient

### Características

- **Skeleton Loading**: Placeholders animados mientras carga
- **Grid Responsive**: 1-2-3 columnas según viewport
- **Paginación**: Botón "Cargar más" con cursor-based pagination
- **Cache**: 5 minutos de cache automático
- **Error Handling**: Mensajes de error con botón de retry
- **Lazy Loading**: Imágenes con loading="lazy"

### Personalización de estilos

El componente usa variables CSS que puedes sobrescribir:

```css
/* En tu CSS global */
.blog-posts-wrapper {
  /* Sobrescribe estilos aquí */
}

.blog-card {
  /* Personaliza las cards */
}
```

### Eventos personalizados

Puedes escuchar eventos del componente:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('blog-posts-grid');

  // Detectar cuando se cargan posts
  const observer = new MutationObserver(() => {
    console.log('Posts actualizados');
  });

  observer.observe(grid, {
    childList: true
  });
});
```

---

## Ejemplos Avanzados

### Ejemplo 1: Filtrar posts por categoría

```astro
---
// src/components/PostsByCategory.astro
interface Props {
  category: string;
}

const { category } = Astro.props;
---

<div id="category-posts"></div>

<script define:vars={{ category }}>
  import { GraphQLClient } from '../lib/wordpress/graphql-client.js';

  const CATEGORY_QUERY = `
    query GetPostsByCategory($category: String!, $first: Int) {
      posts(
        where: { categoryName: $category }
        first: $first
      ) {
        nodes {
          id
          title
          slug
          excerpt
        }
      }
    }
  `;

  const client = new GraphQLClient();

  async function loadCategoryPosts() {
    const data = await client.query(CATEGORY_QUERY, {
      category: category,
      first: 10
    });

    // Renderizar posts...
  }

  loadCategoryPosts();
</script>
```

### Ejemplo 2: Búsqueda de posts

```astro
---
// src/components/PostSearch.astro
---

<div class="search-wrapper">
  <input
    type="search"
    id="search-input"
    placeholder="Buscar posts..."
  />
  <div id="search-results"></div>
</div>

<script>
  import { GraphQLClient } from '../lib/wordpress/graphql-client.js';

  const SEARCH_QUERY = `
    query SearchPosts($search: String!, $first: Int) {
      posts(
        where: { search: $search }
        first: $first
      ) {
        nodes {
          id
          title
          slug
          excerpt
        }
      }
    }
  `;

  const client = new GraphQLClient();
  let debounceTimer;

  async function searchPosts(searchTerm) {
    if (searchTerm.length < 3) return;

    try {
      const data = await client.query(
        SEARCH_QUERY,
        { search: searchTerm, first: 5 },
        false // No usar cache para búsquedas
      );

      renderResults(data.posts.nodes);

    } catch (error) {
      console.error('Search error:', error);
    }
  }

  function renderResults(posts) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    const html = posts.map(post => `
      <a href="/blog/${post.slug}">
        <h3>${post.title}</h3>
      </a>
    `).join('');

    resultsContainer.innerHTML = html;
  }

  // Debounced search
  const searchInput = document.getElementById('search-input');
  searchInput?.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchPosts(e.target.value);
    }, 300);
  });
</script>

<style>
  .search-wrapper {
    max-width: 600px;
    margin: 2rem auto;
  }

  #search-input {
    width: 100%;
    padding: 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 4px;
    font-size: 16px;
  }

  #search-results {
    margin-top: 1rem;
  }
</style>
```

### Ejemplo 3: Post individual con contenido relacionado

```astro
---
// src/pages/blog/[slug].astro

export async function getStaticPaths() {
  // Generar rutas estáticas en build time
  return [];
}
---

<article id="post-content">
  <!-- Skeleton loading -->
</article>

<aside id="related-posts">
  <!-- Posts relacionados -->
</aside>

<script>
  import { GraphQLClient } from '../../lib/wordpress/graphql-client.js';
  import { QUERIES } from '../../lib/wordpress/queries.js';

  const client = new GraphQLClient();
  const slug = window.location.pathname.split('/').pop();

  async function loadPost() {
    try {
      // Cargar post principal
      const postData = await client.query(QUERIES.GET_POST_BY_SLUG, {
        slug: slug
      });

      renderPost(postData.post);

      // Cargar posts relacionados de la misma categoría
      if (postData.post.categories.nodes[0]) {
        loadRelatedPosts(postData.post.categories.nodes[0].slug);
      }

    } catch (error) {
      console.error('Error loading post:', error);
    }
  }

  async function loadRelatedPosts(categorySlug) {
    const RELATED_QUERY = `
      query GetRelatedPosts($category: String!, $first: Int) {
        posts(
          where: { categoryName: $category }
          first: $first
        ) {
          nodes {
            id
            title
            slug
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `;

    const data = await client.query(RELATED_QUERY, {
      category: categorySlug,
      first: 3
    });

    renderRelatedPosts(data.posts.nodes);
  }

  function renderPost(post) {
    const container = document.getElementById('post-content');
    if (!container) return;

    container.innerHTML = `
      <h1>${post.title}</h1>
      <div>${post.content}</div>
    `;
  }

  function renderRelatedPosts(posts) {
    const container = document.getElementById('related-posts');
    if (!container) return;

    const html = posts.map(post => `
      <article>
        <a href="/blog/${post.slug}">
          <img src="${post.featuredImage?.node?.sourceUrl}" alt="${post.title}">
          <h3>${post.title}</h3>
        </a>
      </article>
    `).join('');

    container.innerHTML = `
      <h2>Posts relacionados</h2>
      ${html}
    `;
  }

  loadPost();
</script>
```

### Ejemplo 4: Infinite Scroll

```astro
---
// src/components/InfiniteScrollPosts.astro
---

<div id="posts-container"></div>
<div id="loading-indicator" class="hidden">Cargando...</div>

<script>
  import { GraphQLClient } from '../lib/wordpress/graphql-client.js';
  import { QUERIES } from '../lib/wordpress/queries.js';

  const client = new GraphQLClient();
  let currentCursor = null;
  let hasNextPage = true;
  let isLoading = false;

  async function loadPosts() {
    if (isLoading || !hasNextPage) return;

    isLoading = true;
    showLoadingIndicator(true);

    try {
      const data = await client.query(QUERIES.GET_POSTS, {
        first: 6,
        ...(currentCursor && { after: currentCursor })
      });

      appendPosts(data.posts.nodes);

      hasNextPage = data.posts.pageInfo.hasNextPage;
      currentCursor = data.posts.pageInfo.endCursor;

    } catch (error) {
      console.error('Error:', error);
    } finally {
      isLoading = false;
      showLoadingIndicator(false);
    }
  }

  function appendPosts(posts) {
    const container = document.getElementById('posts-container');
    if (!container) return;

    const html = posts.map(post => `
      <article class="post-card">
        <h2>${post.title}</h2>
        <p>${post.excerpt}</p>
      </article>
    `).join('');

    container.insertAdjacentHTML('beforeend', html);
  }

  function showLoadingIndicator(show) {
    const indicator = document.getElementById('loading-indicator');
    indicator?.classList.toggle('hidden', !show);
  }

  // Intersection Observer para infinite scroll
  const observerOptions = {
    root: null,
    rootMargin: '200px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && hasNextPage) {
        loadPosts();
      }
    });
  }, observerOptions);

  // Observar el indicador de carga
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    observer.observe(loadingIndicator);
  }

  // Carga inicial
  loadPosts();
</script>

<style>
  #posts-container {
    display: grid;
    gap: 2rem;
  }

  #loading-indicator {
    text-align: center;
    padding: 2rem;
    color: #666;
  }

  .hidden {
    display: none;
  }

  .post-card {
    padding: 1.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }
</style>
```

---

## Testing

### Test en consola del navegador

Abre las DevTools (F12) y ejecuta:

```javascript
// 1. Importar módulos
const { GraphQLClient } = await import('/src/lib/wordpress/graphql-client.js');
const { QUERIES } = await import('/src/lib/wordpress/queries.js');
const { GRAPHQL_CONFIG } = await import('/src/lib/wordpress/config.js');

// 2. Crear cliente
const client = new GraphQLClient();

// 3. Test query básica
console.log('Test 1: Query básica');
const data1 = await client.query(QUERIES.GET_POSTS, { first: 3 });
console.log('Posts:', data1.posts.nodes);

// 4. Test cache
console.log('\nTest 2: Cache');
console.time('Cache test');
const data2 = await client.query(QUERIES.GET_POSTS, { first: 3 });
console.timeEnd('Cache test');
console.log('¿Datos idénticos?', data1 === data2);

// 5. Test paginación
console.log('\nTest 3: Paginación');
const nextPage = await client.query(QUERIES.GET_POSTS, {
  first: 3,
  after: data1.posts.pageInfo.endCursor
});
console.log('Siguiente página:', nextPage.posts.nodes);

// 6. Test sin cache
console.log('\nTest 4: Sin cache');
console.time('No cache');
const data3 = await client.query(QUERIES.GET_POSTS, { first: 3 }, false);
console.timeEnd('No cache');

// 7. Test clear cache
console.log('\nTest 5: Clear cache');
client.clearCache();
console.log('Cache limpiada');

// 8. Verificar localStorage
console.log('\nTest 6: LocalStorage');
console.log('Keys:', Object.keys(localStorage).filter(k => k.includes('sauwa')));
```

### Test de performance

```javascript
// Test de performance
async function performanceTest() {
  const client = new GraphQLClient();
  const iterations = 10;

  // Limpiar cache
  client.clearCache();

  console.log('Performance Test: Sin cache');
  console.time('Sin cache (10 queries)');
  for (let i = 0; i < iterations; i++) {
    await client.query(QUERIES.GET_POSTS, { first: 6 }, false);
  }
  console.timeEnd('Sin cache (10 queries)');

  console.log('\nPerformance Test: Con cache');
  console.time('Con cache (10 queries)');
  for (let i = 0; i < iterations; i++) {
    await client.query(QUERIES.GET_POSTS, { first: 6 }, true);
  }
  console.timeEnd('Con cache (10 queries)');
}

performanceTest();
```

### Test de error handling

```javascript
// Test error handling
async function errorTest() {
  const client = new GraphQLClient('https://invalid-endpoint.com/graphql');

  try {
    await client.query(QUERIES.GET_POSTS, { first: 6 });
  } catch (error) {
    console.log('Error capturado correctamente:', error.message);
  }
}

errorTest();
```

---

## Best Practices

### 1. Usa cache inteligentemente

```javascript
// ✅ BUENO: Usar cache para contenido que no cambia frecuentemente
const posts = await client.query(QUERIES.GET_POSTS, {}, true);

// ❌ MALO: No usar cache para búsquedas o contenido dinámico
const search = await client.query(SEARCH_QUERY, { search: term }, true);

// ✅ BUENO: Desactivar cache para búsquedas
const search = await client.query(SEARCH_QUERY, { search: term }, false);
```

### 2. Maneja errores apropiadamente

```javascript
// ✅ BUENO: Error handling robusto
try {
  const data = await client.query(QUERIES.GET_POSTS);
  renderPosts(data.posts.nodes);
} catch (error) {
  console.error('Error loading posts:', error);
  showErrorMessage('No se pudieron cargar los posts');
}

// ❌ MALO: No manejar errores
const data = await client.query(QUERIES.GET_POSTS);
renderPosts(data.posts.nodes); // Puede fallar silenciosamente
```

### 3. Implementa loading states

```javascript
// ✅ BUENO: Mostrar estado de carga
function setLoading(loading) {
  const loader = document.getElementById('loader');
  const content = document.getElementById('content');

  loader.classList.toggle('hidden', !loading);
  content.classList.toggle('hidden', loading);
}

async function loadContent() {
  setLoading(true);
  try {
    const data = await client.query(QUERIES.GET_POSTS);
    renderContent(data);
  } finally {
    setLoading(false);
  }
}
```

### 4. Optimiza queries

```javascript
// ✅ BUENO: Solo pedir campos necesarios
const OPTIMIZED_QUERY = `
  query GetPostTitles($first: Int) {
    posts(first: $first) {
      nodes {
        id
        title
        slug
      }
    }
  }
`;

// ❌ MALO: Pedir todos los campos si no los necesitas
const data = await client.query(QUERIES.GET_POSTS); // Trae todo
```

### 5. Usa paginación correctamente

```javascript
// ✅ BUENO: Cursor-based pagination
let cursor = null;
let hasMore = true;

async function loadMore() {
  if (!hasMore) return;

  const data = await client.query(QUERIES.GET_POSTS, {
    first: 6,
    after: cursor
  });

  cursor = data.posts.pageInfo.endCursor;
  hasMore = data.posts.pageInfo.hasNextPage;
}

// ❌ MALO: Offset-based pagination (menos eficiente)
let page = 1;
async function loadPage() {
  const data = await client.query(QUERIES.GET_POSTS, {
    first: 6,
    offset: (page - 1) * 6
  });
  page++;
}
```

### 6. Limpia recursos

```javascript
// ✅ BUENO: Limpiar cache periódicamente
setInterval(() => {
  client.clearCache();
  console.log('Cache limpiada');
}, 30 * 60 * 1000); // Cada 30 minutos

// ✅ BUENO: Limpiar al cambiar de página
window.addEventListener('beforeunload', () => {
  client.clearCache();
});
```

### 7. Implementa retry logic

```javascript
// ✅ BUENO: Retry con exponential backoff
async function queryWithRetry(query, variables, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await client.query(query, variables);
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      const delay = Math.pow(2, i) * 1000;
      console.log(`Retry ${i + 1} after ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

---

## Troubleshooting

### Problema: Posts no se actualizan

**Causa**: Cache activa

**Solución**:
```javascript
// Opción 1: Limpiar cache manualmente
client.clearCache();

// Opción 2: Forzar query sin cache
const data = await client.query(QUERIES.GET_POSTS, {}, false);
```

### Problema: "localStorage is not defined"

**Causa**: Intentar acceder a localStorage en SSR

**Solución**:
```javascript
// Verificar si estamos en el browser
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  // Usar localStorage
}
```

### Problema: Queries muy lentas

**Causas posibles**:
1. Queries muy complejas
2. Muchos posts
3. Servidor WordPress lento

**Soluciones**:
```javascript
// 1. Reducir número de posts por query
const data = await client.query(QUERIES.GET_POSTS, { first: 3 });

// 2. Usar cache más agresivamente
// 3. Implementar lazy loading
// 4. Optimizar queries en WordPress
```

---

## Recursos

- **Documentación GraphQL**: https://graphql.org/learn/
- **WPGraphQL Docs**: https://www.wpgraphql.com/docs/
- **Astro Docs**: https://docs.astro.build/
- **Linear Project**: https://linear.app/wdamanage/project/sauwasaunacom-44379947aed1

---

## Contacto

Para dudas o sugerencias sobre el sistema GraphQL:
- Revisar documentación en `README.md`
- Consultar ejemplos en este archivo
- Testing en consola del navegador
