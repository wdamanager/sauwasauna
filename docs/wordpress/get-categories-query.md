# GET_CATEGORIES Query Documentation

## Overview
The `GET_CATEGORIES` query fetches blog categories from WordPress via WPGraphQL, specifically designed for the category dropdown filter in mobile view (WDA-538).

## Query Details

### GraphQL Query
```graphql
query GetCategories($first: Int = 100, $hideEmpty: Boolean = true) {
  categories(
    first: $first
    where: {
      hideEmpty: $hideEmpty,
      orderby: NAME,
      order: ASC
    }
  ) {
    nodes {
      id
      name
      slug
      count
    }
  }
}
```

### Features
- **Only categories with posts**: `hideEmpty: true` ensures only categories with at least one post are returned
- **Alphabetical ordering**: Categories are sorted by name in ascending order
- **Post count included**: Each category includes the `count` field showing number of posts
- **Pagination support**: `$first` parameter limits the number of categories (default: 100)

### Response Structure
```typescript
{
  categories: {
    nodes: [
      {
        id: "dGVybToxMg==",
        name: "Beneficios",
        slug: "beneficios",
        count: 5
      },
      {
        id: "dGVybToxMw==",
        name: "Cuidados",
        slug: "cuidados",
        count: 3
      },
      // ...
    ]
  }
}
```

## Usage Examples

### Basic Usage with GraphQLClient
```javascript
import { createClient, QUERIES } from '../../lib/wordpress';

// Create client instance
const client = createClient();

// Fetch categories
const response = await client.query(QUERIES.GET_CATEGORIES);

// Access categories
const categories = response.categories.nodes;
```

### With Custom Parameters
```javascript
// Fetch up to 50 categories, including empty ones
const response = await client.query(QUERIES.GET_CATEGORIES, {
  first: 50,
  hideEmpty: false
});
```

### In Astro Component
```astro
---
import { createClient, QUERIES } from '../../lib/wordpress';
import type { Category } from '../../lib/types/blog';

let categories: Category[] = [];

try {
  const client = createClient();
  const response = await client.query(QUERIES.GET_CATEGORIES);

  if (response?.categories?.nodes) {
    categories = response.categories.nodes;
  }
} catch (error) {
  console.error('Error fetching categories:', error);
}
---

<!-- Use categories in your template -->
<select>
  <option value="all">All Categories</option>
  {categories.map(cat => (
    <option value={cat.slug}>
      {cat.name} ({cat.count})
    </option>
  ))}
</select>
```

## Testing the Query

### 1. Direct GraphQL Testing
Test the query directly on the WordPress GraphQL endpoint:

**Endpoint**: `https://backend.sauwasauna.com/graphql`

**Query to test**:
```graphql
{
  categories(
    first: 10
    where: {
      hideEmpty: true,
      orderby: NAME,
      order: ASC
    }
  ) {
    nodes {
      id
      name
      slug
      count
    }
  }
}
```

### 2. Using GraphQL Playground
1. Navigate to: `https://backend.sauwasauna.com/graphql`
2. Paste the query in the left panel
3. Click "Play" button
4. Verify the response includes categories with counts

### 3. Command Line Testing with curl
```bash
curl -X POST https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ categories(first: 10, where: { hideEmpty: true, orderby: NAME, order: ASC }) { nodes { id name slug count } } }"
  }'
```

### 4. Browser Console Testing
```javascript
// Test in browser console
fetch('https://backend.sauwasauna.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `
      query GetCategories {
        categories(
          first: 10
          where: { hideEmpty: true, orderby: NAME, order: ASC }
        ) {
          nodes {
            id
            name
            slug
            count
          }
        }
      }
    `
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## Integration with Existing System

### File Locations
- **Query Definition**: `/astro/src/lib/wordpress/queries.js`
- **Type Definition**: `/astro/src/lib/wordpress/types/blog.ts` (Category interface)
- **GraphQL Client**: `/astro/src/lib/wordpress/index.js`

### Component Integration
- **Desktop Filter**: `/astro/src/components/blog/CategoryFilter.astro`
- **Mobile Dropdown**: `/astro/src/components/blog/CategoryDropdown.astro`

### Event System
Both components dispatch the same `blog:filter` event:
```javascript
document.addEventListener('blog:filter', (event) => {
  const { category } = event.detail;
  // Handle category change
});
```

## Troubleshooting

### No categories returned
- Check if WordPress has published posts with categories
- Verify `hideEmpty` parameter (set to `false` to see all categories)
- Check WordPress permissions for category visibility

### Query fails
- Verify GraphQL endpoint is accessible
- Check CORS configuration if calling from browser
- Ensure WPGraphQL plugin is active and configured

### Count is always 0
- Ensure posts are published (not draft)
- Check if posts are properly assigned to categories
- Verify WPGraphQL is counting correctly in WordPress admin

## Performance Considerations

1. **Caching**: Categories don't change frequently, consider caching the response
2. **Limit**: Use reasonable `first` parameter (50-100 categories max)
3. **Static Generation**: In Astro, fetch categories at build time when possible

## Related Documentation
- [WordPress GraphQL Client Documentation](../lib/wordpress/README.md)
- [Blog Type Definitions](../lib/types/blog.ts)
- [WPGraphQL Official Docs](https://www.wpgraphql.com/docs/categories-and-tags/)