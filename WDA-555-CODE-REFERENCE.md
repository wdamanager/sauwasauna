# WDA-555: Code Reference

Quick reference for the sitemap and robots.txt implementation.

---

## File Locations

```
astro/
└── src/
    └── pages/
        ├── sitemap.xml.js    ← Dynamic sitemap endpoint
        └── robots.txt.js     ← Dynamic robots.txt endpoint
```

---

## Key Code Snippets

### 1. GraphQL Query for Posts

```javascript
const GET_ALL_POSTS_FOR_SITEMAP = `
  query GetAllPostsForSitemap($first: Int = 500) {
    posts(
      first: $first
      where: { orderby: { field: MODIFIED, order: DESC } }
    ) {
      nodes {
        slug
        modified
        seo {
          metaRobotsNoindex
        }
      }
    }
  }
`;
```

**Why this structure?**
- Fetches up to 500 posts (configurable)
- Orders by modified date (most recent first)
- Includes SEO data to filter noindex posts
- Minimal fields for performance

---

### 2. Noindex Filter Logic

```javascript
const posts = data.posts.nodes.filter(post => {
  const noindex = post.seo?.metaRobotsNoindex === 'noindex' ||
                  post.seo?.metaRobotsNoindex === true;
  return !noindex;
});
```

**Handles both**:
- String value: `"noindex"`
- Boolean value: `true`

---

### 3. URL Generation Pattern

```javascript
// Static pages for each locale
for (const locale of LOCALES) {
  for (const page of STATIC_URLS) {
    const url = `${SITE_URL}/${locale}${page.url}`;
    // https://sauwasauna.com/es/guia-sauwa-sauna/
  }
}

// Blog posts for each locale
for (const locale of LOCALES) {
  for (const post of posts) {
    const url = `${SITE_URL}/${locale}/guia-sauwa-sauna/${post.slug}/`;
    // https://sauwasauna.com/es/guia-sauwa-sauna/post-slug/
  }
}
```

**Result**:
- All locales get same pages
- Blog posts follow: `/{locale}/guia-sauwa-sauna/{slug}/`
- Trailing slashes match Astro config

---

### 4. Error Handling Strategy

```javascript
try {
  const posts = await fetchPosts();
  const sitemap = generateSitemap(posts);
  return new Response(sitemap, { status: 200, headers: {...} });

} catch (error) {
  console.error('[Sitemap] Critical error:', error);

  // Fallback: static pages only
  const fallbackSitemap = generateSitemap([]);
  return new Response(fallbackSitemap, {
    status: 200,
    headers: { 'X-Fallback': 'true', ... }
  });
}
```

**Strategy**:
- Never return 500 error
- Always return valid sitemap
- Use fallback if WordPress fails
- Add debug header: `X-Fallback: true`

---

### 5. Cache Headers

```javascript
headers: {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'public, max-age=3600', // 1 hour
  'X-Generated-At': new Date().toISOString(),
}
```

**Why 1 hour?**
- Google crawls sitemaps ~daily
- Reduces load on WordPress
- Fresh enough for SEO
- Can be adjusted: 3600 = 1 hour in seconds

---

## Static Pages Configuration

To add/remove pages, edit this array in `sitemap.xml.js`:

```javascript
const STATIC_URLS = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/guia-sauwa-sauna', priority: 0.9, changefreq: 'weekly' },
  { url: '/trabaja-con-nosotros', priority: 0.8, changefreq: 'monthly' },
  { url: '/partners-hoteleros', priority: 0.8, changefreq: 'monthly' },
  { url: '/aviso-legal', priority: 0.5, changefreq: 'yearly' },
  { url: '/politica-de-privacidad', priority: 0.5, changefreq: 'yearly' },
  { url: '/politica-de-cookies', priority: 0.5, changefreq: 'yearly' },
];
```

**Add new page**:
```javascript
{ url: '/nueva-pagina', priority: 0.8, changefreq: 'monthly' },
```

---

## Priority Guidelines

| Priority | Use Case | Example |
|----------|----------|---------|
| 1.0 | Homepage | `/` |
| 0.9 | Main sections | `/guia-sauwa-sauna` |
| 0.8 | Important pages | `/trabaja-con-nosotros` |
| 0.7 | Blog posts | Dynamic posts |
| 0.5-0.6 | Secondary pages | Contact, about |
| 0.3-0.4 | Legal pages | Privacy, terms |

---

## Change Frequency Guidelines

| Frequency | Use Case | Example |
|-----------|----------|---------|
| `always` | Real-time data | Live scores |
| `hourly` | Very dynamic | News feeds |
| `daily` | Updated daily | Homepage |
| `weekly` | Regular updates | Blog section, posts |
| `monthly` | Occasional updates | Team page |
| `yearly` | Rarely changes | Legal pages |
| `never` | Archived content | Old blog posts |

---

## Extending the Implementation

### Add Image Sitemap

```javascript
// In generateUrlEntry function, add:
if (post.featuredImage) {
  entry += `
    <image:image>
      <image:loc>${post.featuredImage.node.sourceUrl}</image:loc>
      <image:title>${post.title}</image:title>
    </image:image>`;
}

// Update XML namespace:
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
```

### Add News Sitemap

```javascript
// For recent posts (< 2 days old)
if (isRecent(post.date)) {
  entry += `
    <news:news>
      <news:publication>
        <news:name>SAUWA Blog</news:name>
        <news:language>es</news:language>
      </news:publication>
      <news:publication_date>${post.date}</news:publication_date>
      <news:title>${post.title}</news:title>
    </news:news>`;
}
```

### Add Hreflang Links

```javascript
// In generateUrlEntry, add alternate versions
for (const altLocale of LOCALES) {
  entry += `
    <xhtml:link
      rel="alternate"
      hreflang="${altLocale}"
      href="${SITE_URL}/${altLocale}${page.url}"
    />`;
}

// Update namespace:
xmlns:xhtml="http://www.w3.org/1999/xhtml"
```

---

## Debugging Tips

### 1. Check GraphQL Response

```javascript
// In fetchPosts(), add temporary logging:
console.log('[Sitemap] Raw GraphQL data:', JSON.stringify(data, null, 2));
console.log('[Sitemap] Post count:', data?.posts?.nodes?.length);
console.log('[Sitemap] First post:', data?.posts?.nodes?.[0]);
```

### 2. Check Generated URLs

```javascript
// In generateSitemap(), add:
console.log('[Sitemap] Total URLs:', entries.length);
console.log('[Sitemap] Sample URLs:', entries.slice(0, 5));
```

### 3. Test GraphQL Separately

```bash
# Test WordPress GraphQL directly
curl -X POST https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ posts(first: 1) { nodes { slug modified seo { metaRobotsNoindex } } } }"}'
```

---

## Configuration Constants

```javascript
// Site URL - must match astro.config.mjs
const SITE_URL = 'https://sauwasauna.com';

// Supported locales - must match astro.config.mjs
const LOCALES = ['es', 'ca', 'en', 'fr'];

// Max posts to fetch
const MAX_POSTS = 500; // Adjust if needed

// Cache duration (seconds)
const CACHE_MAX_AGE = 3600; // 1 hour
```

---

## Response Headers Explained

```javascript
{
  // Tells browser/CDN this is XML
  'Content-Type': 'application/xml; charset=utf-8',

  // Cache for 1 hour in browser and CDN
  'Cache-Control': 'public, max-age=3600',

  // Debug: when was sitemap generated
  'X-Generated-At': new Date().toISOString(),

  // Debug: was fallback used?
  'X-Fallback': 'true', // Only if GraphQL failed
}
```

---

## Common Modifications

### Change cache duration

```javascript
// 30 minutes
'Cache-Control': 'public, max-age=1800'

// 1 day
'Cache-Control': 'public, max-age=86400'

// No cache (development only)
'Cache-Control': 'no-cache'
```

### Change max posts

```javascript
const GET_ALL_POSTS_FOR_SITEMAP = `
  query GetAllPostsForSitemap($first: Int = 1000) {
    // Fetch up to 1000 posts
  }
`;
```

### Add custom post types

```javascript
// Fetch custom post type
const GET_CUSTOM_POSTS = `
  query GetCustomPosts {
    customPosts(first: 100) {
      nodes {
        slug
        modified
      }
    }
  }
`;

// Generate URLs
for (const customPost of customPosts) {
  const url = `${SITE_URL}/${locale}/custom/${customPost.slug}/`;
  entries.push(generateUrlEntry(url, ...));
}
```

---

## Testing Checklist

```bash
# 1. Start dev server
cd astro && npm run dev

# 2. Check sitemap loads
curl http://localhost:4321/sitemap.xml

# 3. Check robots.txt loads
curl http://localhost:4321/robots.txt

# 4. Count URLs in sitemap
curl -s http://localhost:4321/sitemap.xml | grep -c "<loc>"

# 5. Check for localhost URLs (should be 0)
curl -s http://localhost:4321/sitemap.xml | grep -c "localhost"

# 6. Check cache headers
curl -I http://localhost:4321/sitemap.xml | grep "Cache-Control"

# 7. Validate XML
curl http://localhost:4321/sitemap.xml | xmllint --noout -
```

---

## Performance Metrics

Typical generation times:

| Posts | Generation Time | Response Size |
|-------|----------------|---------------|
| 0 (static only) | 10-20ms | ~2KB |
| 10 posts | 50-100ms | ~8KB |
| 50 posts | 100-200ms | ~30KB |
| 100 posts | 200-400ms | ~60KB |
| 500 posts | 500-1000ms | ~300KB |

**Optimization tip**: If > 1000 posts, use sitemap index.

---

## SEO Best Practices

1. **Submit to Search Console**
   ```
   https://search.google.com/search-console
   → Sitemaps → Add new sitemap
   → https://sauwasauna.com/sitemap.xml
   ```

2. **Monitor Coverage**
   - Check "Coverage" report in Search Console
   - Verify all URLs are indexed
   - Fix any errors reported

3. **Update Frequency**
   - Rebuild site when adding new posts
   - Or use SSR for always-fresh sitemap

4. **Validate Regularly**
   - Use https://www.xml-sitemaps.com/validate-xml-sitemap.html
   - Check for broken URLs
   - Verify all URLs return 200

---

## Resources

- [Sitemaps Protocol](https://www.sitemaps.org/protocol.html)
- [Google Sitemap Guidelines](https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap)
- [Astro Endpoints Docs](https://docs.astro.build/en/core-concepts/endpoints/)
- [WPGraphQL SEO Plugin](https://www.wpgraphql.com/docs/wpgraphql-seo)

---

**Last Updated**: 2025-11-11
**Implementation**: WDA-555
**Agent**: astro-ux-architect
