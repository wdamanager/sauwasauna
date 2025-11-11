# GraphQL Integration Guide

## TL;DR

WPGraphQL endpoint at `/graphql`. Client-side fetch for dynamic content. Queries for posts, pages, bookings, locations. No Apollo/urql - vanilla fetch only. Type generation via GraphQL Code Generator.

## Endpoint Configuration

**Production**: `https://backend.sauwasauna.com/graphql`
**Development**: `http://localhost:8080/graphql`

## Client Setup

### Environment Variables

```bash
# .env
PUBLIC_GRAPHQL_ENDPOINT=https://backend.sauwasauna.com/graphql
PUBLIC_SITE_URL=https://sauwasauna.com
```

### Fetch Client

```typescript
// src/lib/graphql-client.ts
const GRAPHQL_ENDPOINT = import.meta.env.PUBLIC_GRAPHQL_ENDPOINT;

export async function graphqlRequest<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
      console.error('GraphQL errors:', json.errors);
      throw new Error(json.errors[0]?.message || 'GraphQL error');
    }

    return json.data;
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
}
```

## Core Queries

### Get All Posts

```graphql
query GetAllPosts($language: String!, $first: Int = 10) {
  posts(
    where: { language: $language }
    first: $first
  ) {
    nodes {
      id
      databaseId
      title
      slug
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      readTime
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Get Single Post

```graphql
query GetPostBySlug($slug: String!, $language: String!) {
  postBy(slug: $slug) {
    id
    databaseId
    title
    content
    excerpt
    date
    modified
    slug
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
    tags {
      nodes {
        name
        slug
      }
    }
    author {
      node {
        name
        description
        avatar {
          url
        }
      }
    }
    seo {
      title
      metaDesc
      canonical
      opengraphImage {
        sourceUrl
      }
    }
    readTime
    language
  }
}
```

### Get Pages

```graphql
query GetPages($language: String!) {
  pages(where: { language: $language }) {
    nodes {
      id
      title
      slug
      content
      template {
        templateName
      }
    }
  }
}
```

### Get Locations

```graphql
query GetLocations {
  locations {
    nodes {
      id
      title
      slug
      locationDetails {
        address
        city
        capacity
        amenities
        pricing {
          regular
          peak
          offPeak
        }
        coordinates {
          latitude
          longitude
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}
```

### Get Available Sessions

```graphql
query GetAvailableSessions($locationId: ID!, $date: String!) {
  sessions(
    where: {
      location: $locationId
      date: $date
      status: "available"
    }
  ) {
    nodes {
      id
      time
      date
      capacity
      booked
      available
      price
      status
    }
  }
}
```

## Usage in Astro

### Static Generation (Build Time)

```astro
---
// src/pages/blog/index.astro
import { graphqlRequest } from '@/lib/graphql-client';
import BlogCard from '@/components/BlogCard.astro';

const query = `
  query GetBlogPosts {
    posts(first: 12) {
      nodes {
        id
        title
        slug
        excerpt
      }
    }
  }
`;

const { posts } = await graphqlRequest(query);
---

<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  {posts.nodes.map((post) => (
    <BlogCard {post} />
  ))}
</div>
```

### Client-Side (Dynamic)

```astro
---
// Component with client-side data
---

<div id="dynamic-posts"></div>

<script>
  import { graphqlRequest } from '@/lib/graphql-client';

  async function loadMorePosts() {
    const query = `
      query LoadMore($cursor: String!) {
        posts(first: 6, after: $cursor) {
          nodes {
            id
            title
            slug
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `;

    const data = await graphqlRequest(query, {
      cursor: sessionStorage.getItem('lastCursor')
    });

    // Render posts
    renderPosts(data.posts.nodes);

    // Save cursor
    sessionStorage.setItem('lastCursor', data.posts.pageInfo.endCursor);
  }

  // Load on scroll
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
      loadMorePosts();
    }
  });
</script>
```

## Type Safety

### GraphQL Code Generator Setup

```bash
pnpm add -D @graphql-codegen/cli @graphql-codegen/typescript
```

### codegen.yml

```yaml
schema: https://backend.sauwasauna.com/graphql
documents: 'src/**/*.{ts,tsx,astro}'
generates:
  src/types/graphql.ts:
    plugins:
      - typescript
      - typescript-operations
```

### Generate Types

```bash
pnpm graphql-codegen
```

### Using Generated Types

```typescript
// src/lib/wordpress.ts
import type { GetAllPostsQuery, GetPostBySlugQuery } from '@/types/graphql';
import { graphqlRequest } from './graphql-client';

export async function getAllPosts(language: string): Promise<GetAllPostsQuery> {
  const query = `...`; // Your query
  return graphqlRequest<GetAllPostsQuery>(query, { language });
}

export async function getPostBySlug(
  slug: string,
  language: string
): Promise<GetPostBySlugQuery> {
  const query = `...`; // Your query
  return graphqlRequest<GetPostBySlugQuery>(query, { slug, language });
}
```

## Error Handling

### Network Errors

```typescript
export async function safeGraphQLRequest<T>(
  query: string,
  variables?: Record<string, any>
): Promise<{ data?: T; error?: string }> {
  try {
    const data = await graphqlRequest<T>(query, variables);
    return { data };
  } catch (error) {
    console.error('GraphQL Error:', error);
    return {
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
```

### Component Error Boundary

```astro
---
const { data, error } = await safeGraphQLRequest(query);

if (error) {
  return Astro.redirect('/500');
}
---

{data ? (
  <div>{/* Render data */}</div>
) : (
  <div>No data available</div>
)}
```

## Caching Strategy

### Build-Time Caching

```typescript
// Cache at build time
const cache = new Map();

export async function cachedGraphQLRequest(
  query: string,
  variables?: any
) {
  const key = JSON.stringify({ query, variables });

  if (cache.has(key)) {
    return cache.get(key);
  }

  const data = await graphqlRequest(query, variables);
  cache.set(key, data);

  return data;
}
```

### Client-Side Caching

```javascript
// Use sessionStorage for client-side cache
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function cachedClientRequest(query, variables) {
  const key = btoa(JSON.stringify({ query, variables }));
  const cached = sessionStorage.getItem(key);

  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  const data = await graphqlRequest(query, variables);

  sessionStorage.setItem(key, JSON.stringify({
    data,
    timestamp: Date.now()
  }));

  return data;
}
```

## Performance Optimization

### Query Optimization

```graphql
# Bad - Over-fetching
query {
  posts {
    nodes {
      # Getting everything
      ... on Post {
        id
        title
        content  # Large field
        author {
          node {
            posts {  # N+1 problem
              nodes {
                title
              }
            }
          }
        }
      }
    }
  }
}

# Good - Specific fields
query {
  posts(first: 10) {
    nodes {
      id
      title
      excerpt  # Smaller field
      author {
        node {
          name  # Only needed field
        }
      }
    }
  }
}
```

### Batching Requests

```typescript
// Batch multiple queries
async function batchGraphQLRequests(queries: Array<{
  query: string;
  variables?: any;
}>) {
  const results = await Promise.all(
    queries.map(({ query, variables }) =>
      graphqlRequest(query, variables)
    )
  );

  return results;
}

// Usage
const [posts, pages, locations] = await batchGraphQLRequests([
  { query: postsQuery },
  { query: pagesQuery },
  { query: locationsQuery }
]);
```

## Testing

### Mock GraphQL Responses

```typescript
// src/lib/__mocks__/graphql-client.ts
export const graphqlRequest = jest.fn().mockImplementation((query) => {
  if (query.includes('GetAllPosts')) {
    return Promise.resolve({
      posts: {
        nodes: [
          { id: '1', title: 'Test Post', slug: 'test-post' }
        ]
      }
    });
  }

  return Promise.resolve({});
});
```

### Integration Tests

```javascript
// tests/graphql.test.js
import { graphqlRequest } from '../src/lib/graphql-client';

describe('GraphQL Integration', () => {
  it('should fetch posts', async () => {
    const query = `
      query {
        posts(first: 1) {
          nodes {
            id
            title
          }
        }
      }
    `;

    const data = await graphqlRequest(query);

    expect(data).toHaveProperty('posts');
    expect(data.posts.nodes).toHaveLength(1);
  });
});
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check WordPress `.htaccess`
   - Verify allowed origins
   - Use proper headers

2. **Query Complexity**
   - Limit query depth
   - Use pagination
   - Avoid circular references

3. **Authentication**
   - JWT tokens for mutations
   - Refresh token handling
   - Secure storage

4. **Rate Limiting**
   - Implement request throttling
   - Use caching effectively
   - Monitor API usage

---

*Last Updated: 2025-10-24*