# WordPress GraphQL Client-Side System

Sistema modular y reutilizable para cargar contenido dinámico desde WordPress Headless sin necesidad de Node.js ni rebuilds de Astro. Compatible con hosting compartido.

## Arquitectura

```
src/lib/wordpress/
├── config.js              # Configuración centralizada
├── graphql-client.js      # Cliente GraphQL reutilizable
├── queries.js             # Queries predefinidas
├── cache-manager.js       # Gestión de cache localStorage
└── README.md              # Esta documentación
```

## Características

- **Sin dependencias externas**: Vanilla JavaScript puro
- **Cache inteligente**: localStorage con TTL de 5 minutos
- **Modular y DRY**: Sistema reutilizable en cualquier componente
- **Error handling robusto**: Manejo de errores de red y GraphQL
- **Compatible con SSG**: Funciona con Astro static build
- **Hosting compartido**: No requiere Node.js en producción

## Uso Básico

### 1. Importar el sistema

```javascript
import { GraphQLClient } from '../../lib/wordpress/graphql-client.js';
import { QUERIES } from '../../lib/wordpress/queries.js';
```

### 2. Crear instancia del cliente

```javascript
const client = new GraphQLClient();
```

### 3. Ejecutar queries

```javascript
// Con cache (recomendado)
const data = await client.query(QUERIES.GET_POSTS, {
  first: 6,
});

// Sin cache
const data = await client.query(QUERIES.GET_POSTS, {
  first: 6,
}, false);
```

## API Reference

### GraphQLClient

#### Constructor

```javascript
new GraphQLClient(endpoint?: string)
```

- `endpoint`: URL del endpoint GraphQL (default: config.GRAPHQL_CONFIG.endpoint)

#### Métodos

##### query(query, variables, useCache)

Ejecuta una query GraphQL.

```javascript
async query(
  query: string,
  variables?: object,
  useCache?: boolean
): Promise<object>
```

**Parámetros:**
- `query`: String con la query GraphQL
- `variables`: Objeto con variables de la query (opcional)
- `useCache`: Usar cache si está disponible (default: true)

**Retorna:** Promise con los datos de la respuesta

**Ejemplo:**
```javascript
const data = await client.query(
  QUERIES.GET_POSTS,
  { first: 6, after: 'cursor123' },
  true
);
```

##### clearCache()

Limpia toda la cache del cliente.

```javascript
clearCache(): void
```

### CacheManager

Sistema de cache usando localStorage con expiración automática.

#### Constructor

```javascript
new CacheManager(duration?: number)
```

- `duration`: Duración del cache en milisegundos (default: 5 minutos)

#### Métodos

##### get(key)

Obtiene datos de la cache.

```javascript
get(key: string): any | null
```

##### set(key, data)

Guarda datos en la cache.

```javascript
set(key: string, data: any): void
```

##### remove(key)

Elimina datos específicos de la cache.

```javascript
remove(key: string): void
```

##### clear()

Limpia toda la cache.

```javascript
clear(): void
```

## Queries Predefinidas

### GET_POSTS

Obtiene posts con paginación.

```javascript
const data = await client.query(QUERIES.GET_POSTS, {
  first: 6,        // Número de posts
  after: 'cursor'  // Cursor de paginación (opcional)
});
```

**Respuesta:**
```javascript
{
  posts: {
    pageInfo: {
      hasNextPage: boolean,
      endCursor: string
    },
    nodes: [
      {
        id: string,
        title: string,
        excerpt: string,
        slug: string,
        date: string,
        featuredImage: {
          node: {
            sourceUrl: string,
            altText: string
          }
        },
        categories: {
          nodes: [
            {
              name: string,
              slug: string
            }
          ]
        }
      }
    ]
  }
}
```

### GET_POST_BY_SLUG

Obtiene un post específico por slug.

```javascript
const data = await client.query(QUERIES.GET_POST_BY_SLUG, {
  slug: 'mi-post'
});
```

**Respuesta:**
```javascript
{
  post: {
    id: string,
    title: string,
    content: string,
    date: string,
    excerpt: string,
    featuredImage: { ... },
    seo: {
      title: string,
      metaDesc: string
    },
    categories: { ... }
  }
}
```

## Configuración

### GRAPHQL_CONFIG

Configuración centralizada en `config.js`:

```javascript
export const GRAPHQL_CONFIG = {
  endpoint: 'https://backend.sauwasauna.com/graphql',
  cacheKey: 'sauwa_graphql_cache',
  cacheDuration: 5 * 60 * 1000, // 5 minutos
  defaultPostsPerPage: 6,
  defaultImagePlaceholder: '/images/placeholder-blog.webp',
};
```

### GRAPHQL_ERRORS

Mensajes de error estandarizados:

```javascript
export const GRAPHQL_ERRORS = {
  NETWORK_ERROR: 'Error de conexión con el servidor',
  PARSE_ERROR: 'Error al procesar la respuesta',
  GRAPHQL_ERROR: 'Error en la consulta GraphQL',
  NO_DATA: 'No se encontraron datos',
};
```

## Ejemplos de Uso

### Ejemplo 1: Cargar posts en un componente

```astro
---
// MyComponent.astro
---

<div id="posts-container"></div>

<script>
  import { GraphQLClient } from '../lib/wordpress/graphql-client.js';
  import { QUERIES } from '../lib/wordpress/queries.js';

  const client = new GraphQLClient();

  async function loadPosts() {
    try {
      const data = await client.query(QUERIES.GET_POSTS, { first: 6 });

      // Renderizar posts...
      console.log(data.posts.nodes);

    } catch (error) {
      console.error('Error loading posts:', error);
    }
  }

  loadPosts();
</script>
```

### Ejemplo 2: Paginación con "Load More"

```javascript
let currentCursor = null;
let hasNextPage = true;

async function loadMorePosts() {
  if (!hasNextPage) return;

  const data = await client.query(QUERIES.GET_POSTS, {
    first: 6,
    after: currentCursor
  });

  // Actualizar estado de paginación
  hasNextPage = data.posts.pageInfo.hasNextPage;
  currentCursor = data.posts.pageInfo.endCursor;

  // Renderizar nuevos posts...
}
```

### Ejemplo 3: Query personalizada

```javascript
const CUSTOM_QUERY = `
  query GetPostsByCategory($category: String!, $first: Int) {
    posts(where: { categoryName: $category }, first: $first) {
      nodes {
        id
        title
        slug
      }
    }
  }
`;

const data = await client.query(CUSTOM_QUERY, {
  category: 'saunas',
  first: 10
});
```

### Ejemplo 4: Limpiar cache manualmente

```javascript
// Limpiar toda la cache
client.clearCache();

// O forzar query sin cache
const freshData = await client.query(QUERIES.GET_POSTS, {}, false);
```

## Performance

### Cache Strategy

El sistema implementa cache en localStorage con las siguientes características:

- **TTL**: 5 minutos (configurable)
- **Key generation**: Hash único basado en query + variables
- **Expiration**: Automática al superar TTL
- **Storage**: localStorage del navegador

### Optimizaciones

1. **Cache hit primero**: Verifica cache antes de hacer fetch
2. **Lazy loading**: Solo carga cuando el usuario lo necesita
3. **Paginación**: Carga incremental con cursors
4. **Error recovery**: Retry automático con exponential backoff

## Error Handling

El sistema maneja tres tipos de errores:

### 1. Errores de red
```javascript
try {
  const data = await client.query(QUERIES.GET_POSTS);
} catch (error) {
  if (error.message.includes('Error de conexión')) {
    // Manejar error de red
  }
}
```

### 2. Errores de GraphQL
```javascript
// El servidor respondió pero con errores
catch (error) {
  if (error.message.includes('Error en la consulta')) {
    // Manejar error de GraphQL
  }
}
```

### 3. Errores de datos
```javascript
// No se encontraron datos
catch (error) {
  if (error.message.includes('No se encontraron datos')) {
    // Manejar ausencia de datos
  }
}
```

## Testing

### Test manual en consola del navegador

```javascript
// 1. Importar sistema
const { GraphQLClient } = await import('/src/lib/wordpress/graphql-client.js');
const { QUERIES } = await import('/src/lib/wordpress/queries.js');

// 2. Crear cliente
const client = new GraphQLClient();

// 3. Probar query
const data = await client.query(QUERIES.GET_POSTS, { first: 3 });
console.log(data);

// 4. Verificar cache
const cached = await client.query(QUERIES.GET_POSTS, { first: 3 });
console.log('From cache:', cached);

// 5. Limpiar cache
client.clearCache();
```

## Troubleshooting

### El cache no funciona

**Problema**: Las queries siempre hacen fetch.

**Solución**: Verifica que localStorage esté disponible:
```javascript
if (typeof localStorage !== 'undefined') {
  console.log('localStorage disponible');
} else {
  console.warn('localStorage no disponible');
}
```

### CORS errors

**Problema**: Error de CORS al hacer queries.

**Solución**: Verifica headers en WordPress:
```php
// En functions.php o plugin
add_filter('graphql_response_headers_to_send', function($headers) {
  $headers['Access-Control-Allow-Origin'] = '*';
  return $headers;
});
```

### Queries lentas

**Problema**: Las queries tardan mucho.

**Solución**:
1. Reduce el número de posts por query
2. Implementa paginación
3. Optimiza queries en WPGraphQL
4. Usa cache más agresivamente

### Cache no expira

**Problema**: El cache nunca se limpia.

**Solución**: Verifica la duración del cache:
```javascript
// config.js
cacheDuration: 5 * 60 * 1000, // 5 minutos
```

## Roadmap

- [ ] Soporte para mutations (create, update, delete)
- [ ] Retry automático con exponential backoff
- [ ] Offline support con Service Worker
- [ ] TypeScript definitions
- [ ] Unit tests con Vitest
- [ ] Performance monitoring
- [ ] WebSocket support para updates en tiempo real

## Contribuir

Para añadir nuevas queries:

1. Agregar query en `queries.js`:
```javascript
export const QUERIES = {
  // ... queries existentes

  MY_NEW_QUERY: `
    query MyNewQuery($param: String!) {
      myField(param: $param) {
        data
      }
    }
  `,
};
```

2. Usar en componente:
```javascript
const data = await client.query(QUERIES.MY_NEW_QUERY, {
  param: 'value'
});
```

## Licencia

MIT License - SAUWA Project

## Contacto

- **Proyecto**: SAUWA Sauna
- **Linear**: https://linear.app/wdamanage/project/sauwasaunacom-44379947aed1
- **WordPress Backend**: https://backend.sauwasauna.com/
