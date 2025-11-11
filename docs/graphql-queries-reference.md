# GraphQL Queries Reference - SAUWA Backend

**Endpoint**: https://backend.sauwasauna.com/graphql

---

## 1. QUERIES BÁSICAS

### 1.1 Obtener todos los posts

```graphql
query GetAllPosts {
  posts(first: 100) {
    nodes {
      id
      title
      slug
      excerpt
      date
      modified
    }
  }
}
```

**cURL equivalente**:
```bash
curl -X POST https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ posts(first: 100) { nodes { id title slug excerpt date } } }"}'
```

### 1.2 Obtener posts con featured image

```graphql
query GetPostsWithImages {
  posts(first: 10) {
    nodes {
      id
      title
      slug
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
            file
          }
        }
      }
    }
  }
}
```

### 1.3 Obtener posts con categorías

```graphql
query GetPostsWithCategories {
  posts(first: 10) {
    nodes {
      id
      title
      slug
      categories {
        nodes {
          name
          slug
          description
          count
        }
      }
    }
  }
}
```

### 1.4 Obtener post único por slug

```graphql
query GetPostBySlug($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    id
    title
    content
    excerpt
    date
    modified
    author {
      node {
        name
        firstName
        lastName
      }
    }
    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
  }
}
```

**Variables**:
```json
{
  "slug": "que-es-sauwa-sauna"
}
```

---

## 2. QUERIES MULTIIDIOMA (Polylang)

### 2.1 Obtener posts por idioma

```graphql
query GetPostsByLanguage($language: LanguageCodeEnum!) {
  posts(where: {language: $language}, first: 10) {
    nodes {
      id
      title
      slug
      language {
        code
        locale
        name
      }
    }
  }
}
```

**Variables**:
```json
{
  "language": "ES"
}
```

**Idiomas disponibles**: ES, CA, EN, FR

### 2.2 Obtener post con traducciones

```graphql
query GetPostWithTranslations($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    id
    title
    slug
    language {
      code
      locale
      name
    }
    translations {
      id
      title
      slug
      uri
      language {
        code
        locale
        name
      }
    }
  }
}
```

### 2.3 Obtener todas las categorías por idioma

```graphql
query GetCategoriesByLanguage($language: LanguageCodeEnum!) {
  categories(where: {language: $language}) {
    nodes {
      id
      name
      slug
      description
      count
      language {
        code
      }
    }
  }
}
```

---

## 3. QUERIES DE FILTRADO

### 3.1 Posts por categoría

```graphql
query GetPostsByCategory($categoryName: String!) {
  posts(where: {categoryName: $categoryName}, first: 10) {
    nodes {
      id
      title
      slug
      excerpt
      date
    }
  }
}
```

**Variables**:
```json
{
  "categoryName": "bienestar-recuperacion"
}
```

### 3.2 Posts por categoría (usando ID)

```graphql
query GetPostsByCategoryId($categoryId: Int!) {
  posts(where: {categoryId: $categoryId}, first: 10) {
    nodes {
      id
      title
      slug
    }
  }
}
```

### 3.3 Posts recientes (últimos 5)

```graphql
query GetRecentPosts {
  posts(first: 5, where: {orderby: {field: DATE, order: DESC}}) {
    nodes {
      id
      title
      slug
      date
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
}
```

### 3.4 Posts modificados recientemente

```graphql
query GetRecentlyModifiedPosts {
  posts(first: 5, where: {orderby: {field: MODIFIED, order: DESC}}) {
    nodes {
      id
      title
      slug
      modified
    }
  }
}
```

### 3.5 Buscar posts por texto

```graphql
query SearchPosts($searchTerm: String!) {
  posts(where: {search: $searchTerm}, first: 10) {
    nodes {
      id
      title
      slug
      excerpt
    }
  }
}
```

**Variables**:
```json
{
  "searchTerm": "sauna"
}
```

---

## 4. QUERIES DE PAGINACIÓN

### 4.1 Paginación básica (first/after)

```graphql
query GetPostsPaginated($first: Int!, $after: String) {
  posts(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        id
        title
        slug
      }
    }
  }
}
```

**Variables (primera página)**:
```json
{
  "first": 3
}
```

**Variables (segunda página)**: Usar `endCursor` de la respuesta anterior
```json
{
  "first": 3,
  "after": "eyJvZmZzZXQiOjN9"
}
```

### 4.2 Paginación con offset

```graphql
query GetPostsWithOffset($offset: Int!, $size: Int!) {
  posts(where: {offsetPagination: {offset: $offset, size: $size}}) {
    nodes {
      id
      title
      slug
    }
  }
}
```

**Variables**:
```json
{
  "offset": 0,
  "size": 6
}
```

---

## 5. QUERIES DE IMÁGENES

### 5.1 Obtener todos los tamaños de imagen

```graphql
query GetImageSizes {
  posts(first: 1) {
    nodes {
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
            file
            sizes {
              name
              width
              height
              sourceUrl
              mimeType
            }
          }
        }
      }
    }
  }
}
```

### 5.2 Obtener imagen en tamaño específico

```graphql
query GetPostWithOptimizedImage {
  posts(first: 5) {
    nodes {
      title
      slug
      featuredImage {
        node {
          # Original
          sourceUrl
          # Medium (300px)
          medium: sourceUrl(size: MEDIUM)
          # Large (1024px)
          large: sourceUrl(size: LARGE)
          altText
        }
      }
    }
  }
}
```

---

## 6. QUERIES DE CATEGORÍAS

### 6.1 Obtener todas las categorías

```graphql
query GetAllCategories {
  categories {
    nodes {
      id
      name
      slug
      description
      count
      posts {
        nodes {
          title
          slug
        }
      }
    }
  }
}
```

### 6.2 Obtener categoría por slug

```graphql
query GetCategoryBySlug($slug: ID!) {
  category(id: $slug, idType: SLUG) {
    id
    name
    slug
    description
    count
    posts(first: 10) {
      nodes {
        id
        title
        slug
        excerpt
      }
    }
  }
}
```

**Variables**:
```json
{
  "slug": "bienestar-recuperacion"
}
```

---

## 7. QUERIES DE CONFIGURACIÓN

### 7.1 Configuración general del sitio

```graphql
query GetGeneralSettings {
  generalSettings {
    title
    description
    url
    language
    timezone
    dateFormat
    timeFormat
  }
}
```

### 7.2 Información del sitio

```graphql
query GetSiteInfo {
  generalSettings {
    title
    description
    url
  }
  allSettings {
    readingSettingsPostsPerPage
  }
}
```

---

## 8. QUERIES AVANZADAS

### 8.1 Posts completos para blog (optimizado frontend)

```graphql
query GetBlogPosts($language: LanguageCodeEnum!, $first: Int!) {
  posts(where: {language: $language}, first: $first) {
    nodes {
      id
      title
      slug
      excerpt
      date
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl(size: LARGE)
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      language {
        code
        locale
      }
    }
  }
}
```

**Variables**:
```json
{
  "language": "ES",
  "first": 6
}
```

### 8.2 Post individual completo

```graphql
query GetSinglePost($slug: ID!, $language: LanguageCodeEnum!) {
  post(id: $slug, idType: SLUG) {
    id
    title
    content
    excerpt
    date
    modified
    author {
      node {
        name
        firstName
        lastName
        avatar {
          url
        }
      }
    }
    featuredImage {
      node {
        sourceUrl
        altText
        caption
        mediaDetails {
          width
          height
        }
      }
    }
    categories {
      nodes {
        name
        slug
        description
      }
    }
    language {
      code
      locale
      name
    }
    translations {
      title
      slug
      language {
        code
      }
    }
  }
  # Posts relacionados de la misma categoría
  posts(
    where: {
      language: $language
      categoryName: "blog"
      notIn: [$slug]
    }
    first: 3
  ) {
    nodes {
      title
      slug
      excerpt
      featuredImage {
        node {
          sourceUrl(size: MEDIUM)
          altText
        }
      }
    }
  }
}
```

### 8.3 Homepage data (todos los idiomas)

```graphql
query GetHomepageData {
  # Posts recientes en español
  postsES: posts(where: {language: ES}, first: 3) {
    nodes {
      id
      title
      slug
      excerpt
      featuredImage {
        node {
          sourceUrl(size: LARGE)
          altText
        }
      }
    }
  }
  # Posts recientes en catalán
  postsCA: posts(where: {language: CA}, first: 3) {
    nodes {
      id
      title
      slug
    }
  }
  # Categorías
  categories {
    nodes {
      name
      slug
      count
    }
  }
  # Configuración
  generalSettings {
    title
    description
  }
}
```

---

## 9. MUTATIONS (Requieren Autenticación)

**NOTA**: Estas mutations requieren JWT token o sesión autenticada

### 9.1 Crear post (draft)

```graphql
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    post {
      id
      title
      slug
      status
    }
  }
}
```

**Variables**:
```json
{
  "input": {
    "title": "Nuevo post de prueba",
    "content": "Contenido del post...",
    "status": "DRAFT"
  }
}
```

### 9.2 Actualizar post

```graphql
mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    post {
      id
      title
      modified
    }
  }
}
```

---

## 10. INTROSPECCIÓN (Solo en Development)

### 10.1 Obtener schema completo

```graphql
query IntrospectionQuery {
  __schema {
    queryType {
      name
    }
    mutationType {
      name
    }
    types {
      name
      kind
      description
    }
  }
}
```

### 10.2 Tipos disponibles para Post

```graphql
query GetPostType {
  __type(name: "Post") {
    name
    kind
    fields {
      name
      description
      type {
        name
        kind
      }
    }
  }
}
```

---

## 11. TESTING Y PERFORMANCE

### 11.1 Query mínima (testing latencia)

```graphql
query Ping {
  generalSettings {
    title
  }
}
```

**cURL con timing**:
```bash
curl -w "\nTime: %{time_total}s\n" -X POST https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ generalSettings { title } }"}'
```

### 11.2 Query compleja (testing performance)

```graphql
query StressTest {
  posts(first: 50) {
    nodes {
      id
      title
      content
      excerpt
      featuredImage {
        node {
          sourceUrl
          mediaDetails {
            sizes {
              sourceUrl
            }
          }
        }
      }
      categories {
        nodes {
          name
          posts(first: 5) {
            nodes {
              title
            }
          }
        }
      }
    }
  }
}
```

---

## 12. ERRORES COMUNES Y SOLUCIONES

### Error: "GraphQL Request must include query or queryId"

**Solución**: Asegúrate de enviar el parámetro `query` en el body

```bash
# Correcto
curl -X POST https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ posts { nodes { title } } }"}'

# Incorrecto
curl -X GET https://backend.sauwasauna.com/graphql
```

### Error: "Cannot query field X on type Y"

**Solución**: El campo no existe o el plugin no está instalado

```graphql
# Ejemplo: Si 'language' falla, falta wp-graphql-polylang
query {
  posts {
    nodes {
      language { # Este campo requiere wp-graphql-polylang
        code
      }
    }
  }
}
```

### Error: "Unknown argument 'language'"

**Solución**: Usar `where` wrapper

```graphql
# Incorrecto
posts(language: ES) { ... }

# Correcto
posts(where: {language: ES}) { ... }
```

---

## 13. EJEMPLOS PARA FRONTEND ASTRO

### 13.1 Fetch desde Astro

```javascript
// src/lib/graphql.js
const GRAPHQL_URL = 'https://backend.sauwasauna.com/graphql'

export async function fetchGraphQL(query, variables = {}) {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const { data, errors } = await response.json()

  if (errors) {
    console.error('GraphQL Errors:', errors)
    throw new Error(errors[0].message)
  }

  return data
}
```

### 13.2 Uso en página Astro

```astro
---
// src/pages/blog/[...slug].astro
import { fetchGraphQL } from '@/lib/graphql'

const { slug } = Astro.params
const locale = Astro.currentLocale || 'es'

const query = `
  query GetPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`

const { post } = await fetchGraphQL(query, { slug })
---

<article>
  <h1>{post.title}</h1>
  <img src={post.featuredImage.node.sourceUrl} alt={post.featuredImage.node.altText} />
  <div set:html={post.content} />
</article>
```

### 13.3 Static paths para SSG

```astro
---
// src/pages/blog/[...slug].astro
export async function getStaticPaths() {
  const query = `
    query GetAllSlugs {
      posts(first: 100) {
        nodes {
          slug
          language {
            code
          }
        }
      }
    }
  `

  const { posts } = await fetchGraphQL(query)

  return posts.nodes.map((post) => ({
    params: { slug: post.slug },
    props: { language: post.language.code },
  }))
}
---
```

---

## 14. RECURSOS ADICIONALES

**WPGraphQL Playground**: Si está habilitado, acceder a:
- https://backend.sauwasauna.com/graphql (con GraphiQL)

**Documentación**:
- WPGraphQL: https://www.wpgraphql.com/docs/
- WPGraphQL Polylang: https://github.com/valu-digital/wp-graphql-polylang
- GraphQL Spec: https://graphql.org/learn/

**Testing Tools**:
- GraphiQL (si está habilitado en backend)
- Postman (colección GraphQL)
- Insomnia (cliente GraphQL)

---

**Última actualización**: 20 de octubre de 2025
**Mantenido por**: wordpress-plugin-developer
