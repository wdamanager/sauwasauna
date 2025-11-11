# SAUWA Blog Components

Production-ready blog components for the SAUWA Finnish sauna experience website. This documentation covers the complete blog implementation with expert UI/UX design, accessibility, and performance optimizations.

## Architecture Overview

The blog system follows a modern, performant architecture:

- **Static Site Generation (SSG)**: Categories fetched at build time
- **Client-Side Hydration**: Posts loaded dynamically via GraphQL
- **5-Minute Cache**: Optimized caching for better performance
- **Islands Architecture**: Interactive components load independently

## Components

### 1. BlogGrid.astro

Main grid component with responsive layout and dynamic loading.

**Features:**
- 3-column (desktop) → 2-column (tablet) → 1-column (mobile)
- Skeleton loading states
- "Load More" pagination
- Error and empty states
- Smooth animations
- WCAG 2.1 AA compliant

**Usage:**
```astro
<BlogGrid
  locale="es"
  postsPerPage={9}
  loadMoreText="Cargar más artículos"
  loadingText="Cargando..."
  noPostsText="No hay artículos"
  errorText="Error al cargar"
  retryText="Intentar de nuevo"
  readMoreText="Leer más"
/>
```

**Props:**
- `locale`: Language code (es/ca/en/fr)
- `postsPerPage`: Number of posts per page (default: 9)
- `loadMoreText`: Load more button text
- `loadingText`: Loading state text
- `noPostsText`: Empty state text
- `errorText`: Error state text
- `retryText`: Retry button text
- `readMoreText`: Card CTA text

### 2. BlogCard.astro

Individual blog post card with hover effects.

**Features:**
- Featured image with zoom on hover
- Category badge
- Title, excerpt, and date
- "Read more" CTA with arrow
- Keyboard navigation support
- Focus visible states

**Design:**
- Border-radius: 8px
- Box shadow: elevation on hover
- Transitions: 0.3s ease
- Image aspect ratio: 5:3

**Accessibility:**
- Semantic HTML (article, h3, time)
- ARIA labels for screen readers
- Keyboard focus indicators
- High contrast mode support
- Reduced motion respect

### 3. CategoryFilter.astro

Radio-style category filter inspired by elefantensauna.de/blog.

**Features:**
- "All categories" option
- Active state styling
- Keyboard navigation (Arrow keys, Home, End)
- Post count badges
- Smooth transitions
- Custom event dispatching

**Usage:**
```astro
<CategoryFilter
  categories={categories}
  allCategoriesText="Todas las categorías"
  locale="es"
/>
```

**Events:**
Dispatches `blog:filter` event with selected category:
```javascript
document.addEventListener('blog:filter', (event) => {
  const { category } = event.detail;
  // Handle filter
});
```

### 4. Breadcrumb.astro

Accessible breadcrumb navigation with structured data.

**Features:**
- Schema.org BreadcrumbList markup
- SEO optimized
- Keyboard navigation
- ARIA attributes
- Responsive design

**Usage:**
```astro
<Breadcrumb
  items={[
    { label: 'Inicio', href: '/es' },
    { label: 'Blog' }
  ]}
  locale="es"
/>
```

## Blog Pages

All blog pages follow the same structure across languages:

- `/es/blog.astro` - Spanish
- `/ca/blog.astro` - Catalan
- `/en/blog.astro` - English
- `/fr/blog.astro` - French

**Structure:**
1. Header section (H1 + H2 mandatory per WDA-276)
2. Breadcrumb navigation
3. Category filter
4. Blog grid with posts
5. Footer (FooterBlack component)

## GraphQL Queries

### Location
`C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\astro\src\lib\blog-queries.ts`

### Available Functions

#### `getBlogPosts(variables)`
Fetch blog posts with optional filtering.

**Parameters:**
```typescript
{
  first?: number;        // Posts per page (default: 9)
  after?: string | null; // Pagination cursor
  categoryName?: string; // Filter by category slug
}
```

**Returns:**
```typescript
{
  posts: {
    nodes: BlogPost[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}
```

#### `getCategories()`
Fetch all categories with post counts.

**Returns:**
```typescript
{
  categories: {
    nodes: Category[];
  };
}
```

#### `getPostBySlug(slug)`
Fetch single post by slug (for detail pages).

**Parameters:**
- `slug`: Post slug

**Returns:**
- `BlogPost | null`

### Caching

All queries include 5-minute client-side cache:
- Reduces API calls
- Improves performance
- Configurable TTL: `CACHE_TTL = 5 * 60 * 1000`

Clear cache manually:
```javascript
import { clearBlogCache } from '@/lib/blog-queries';
clearBlogCache();
```

## TypeScript Types

### Location
`C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\astro\src\lib\types\blog.ts`

### Key Types

```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
  featuredImage?: FeaturedImage;
  categories: { nodes: Category[] };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

type Locale = 'es' | 'ca' | 'en' | 'fr';
```

## Internationalization (i18n)

### Translations Location
`C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\astro\src\i18n\ui.ts`

### Available Keys
```typescript
'blog.title'           // "Blog"
'blog.subtitle'        // Language-specific subtitle
'blog.description'     // SEO description
'blog.breadcrumb.home' // "Home" / "Inicio" / etc.
'blog.breadcrumb.blog' // "Blog"
'blog.category.all'    // "All categories"
'blog.readmore'        // "Read more"
'blog.loadmore'        // "Load more articles"
'blog.loading'         // "Loading articles..."
'blog.noposts'         // "No articles available"
'blog.error'           // "Error loading articles"
'blog.retry'           // "Try again"
```

### Usage in Components
```astro
---
import { useTranslations } from '@/i18n/utils';
const t = useTranslations('es');
---
<h1>{t('blog.title')}</h1>
```

## Design System

### Colors
Following SAUWA Brand Guidelines:

```css
--sauwa-red: #BA2515;      /* Primary CTA */
--sauwa-orange: #DB4529;   /* Hover states */
--sauwa-green: #406E51;    /* Accents */
--sauwa-brown: #897162;    /* Secondary */
--sauwa-gray: #636464;     /* Text muted */
```

### Typography

**Headings:**
- Font: Helvetica Neue Ultra Light (100)
- Primary: 48px → 32px (mobile)
- Secondary: 24px → 18px (mobile)

**Body:**
- Font: Avenir Next Light (300)
- Base: 15px
- Line height: 1.6

**CTA:**
- Font: Avenir Next Medium (500)
- Size: 14-16px

### Spacing

Following 8px grid system:
- Container padding: 2rem (32px)
- Section gaps: 3rem (48px)
- Card padding: 1.5rem (24px)
- Element gaps: 0.75rem (12px)

### Shadows

```css
/* Card default */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

/* Card hover */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
```

### Border Radius
- Cards: 8px
- Buttons: 4px
- Category badges: 4px
- Filter buttons: 24px (pill shape)

## Performance Optimization

### Implemented Optimizations

1. **Image Loading**
   - `loading="lazy"` on all images
   - `decoding="async"`
   - Explicit width/height attributes
   - Optimized aspect ratios

2. **Caching Strategy**
   - 5-minute client-side cache
   - In-memory Map implementation
   - Automatic cache invalidation

3. **Code Splitting**
   - Astro islands architecture
   - Client-side scripts only where needed
   - Minimal JavaScript footprint

4. **CSS Optimization**
   - Scoped styles per component
   - No unused CSS
   - Critical CSS inline

5. **Animations**
   - GPU-accelerated transforms
   - `prefers-reduced-motion` support
   - Optimized keyframes

### Expected Lighthouse Scores

**Target: 90+ across all metrics**

- Performance: 95+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

### Optimization Tips

**For Production:**

1. Enable image optimization in Astro config
2. Use CDN for static assets
3. Implement service worker for offline support
4. Compress responses (gzip/brotli)
5. Minimize third-party scripts

**For WordPress:**

1. Optimize featured images (WebP format)
2. Use lazy loading on backend
3. Enable object caching (Redis/Memcached)
4. Optimize database queries
5. Use WP GraphQL query complexity limits

## Accessibility (WCAG 2.1 AA)

### Implemented Features

✅ **Keyboard Navigation**
- Tab order follows visual flow
- Focus visible indicators
- Skip links where appropriate
- Arrow key navigation in filters

✅ **Screen Reader Support**
- Semantic HTML elements
- ARIA labels and roles
- Live regions for dynamic content
- Descriptive link text

✅ **Visual**
- Color contrast ratios > 4.5:1
- Minimum touch target: 44x44px
- No information by color alone
- High contrast mode support

✅ **Motion**
- `prefers-reduced-motion` respected
- No auto-playing animations
- Smooth, purposeful transitions

### Testing Checklist

- [ ] Keyboard-only navigation
- [ ] Screen reader (NVDA/JAWS)
- [ ] Color contrast checker
- [ ] Lighthouse accessibility audit
- [ ] axe DevTools scan

## Browser Support

**Modern browsers with ES6+ support:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Graceful degradation:**
- No JavaScript: Server-rendered content visible
- Old browsers: Basic styles, no animations

## Deployment

### Build Command
```bash
npm run build
```

### Static Output
All blog pages generate static HTML:
- `/es/blog/index.html`
- `/ca/blog/index.html`
- `/en/blog/index.html`
- `/fr/blog/index.html`

### Environment Variables
```env
PUBLIC_WORDPRESS_GRAPHQL_URL=https://backend.sauwasauna.com/graphql
```

### Hosting Requirements
- Static file hosting (Netlify, Vercel, etc.)
- No Node.js required on server
- GraphQL endpoint must be accessible

## Troubleshooting

### Issue: Posts not loading

**Check:**
1. GraphQL endpoint accessible
2. Network tab for CORS errors
3. Console for JavaScript errors
4. Categories exist in WordPress

### Issue: Images not displaying

**Check:**
1. Featured images set in WordPress
2. Image URLs absolute
3. CORS headers on image domain
4. Fallback placeholder exists

### Issue: Category filter not working

**Check:**
1. JavaScript enabled
2. Console for event listener errors
3. Category slugs match backend
4. `blog:filter` event dispatched

### Issue: Slow performance

**Optimize:**
1. Enable image optimization
2. Check cache TTL
3. Minimize API requests
4. Use production build
5. Enable CDN

## Future Enhancements

**Potential improvements:**

1. **Search Functionality**
   - Full-text search
   - Algolia integration
   - Search suggestions

2. **Related Posts**
   - Based on categories
   - ML-powered recommendations
   - "You might also like" section

3. **Social Sharing**
   - Share buttons
   - Open Graph optimization
   - Twitter cards

4. **Comments System**
   - Native comments
   - Third-party integration (Disqus)
   - Moderation tools

5. **Analytics**
   - Post view tracking
   - Popular posts widget
   - Reading time estimation

## Support

For issues or questions, contact:
- **Project Lead**: Technical Project Manager
- **Backend**: WordPress Headless Expert
- **Frontend**: Astro UX Architect

## License

© 2024 SAUWA - PCR Europe, S.L. All rights reserved.
