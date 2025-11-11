# Context Brief: Individual Blog Post Page Implementation

## Executive Summary

This document provides comprehensive context for implementing individual blog post pages for the SAUWA website. The implementation requires creating dynamic Astro pages with server-side generation (SSG) that fetch content from WordPress via GraphQL, featuring a full-width hero section with featured image and multilingual support across four languages (ES, CA, EN, FR).

## Project Overview

### Technical Stack
- **Frontend Framework**: Astro (v3.x) with Static Site Generation (SSG)
- **Backend CMS**: WordPress Headless with WPGraphQL
- **Styling**: Tailwind CSS (core utilities only)
- **Languages**: TypeScript
- **Deployment**: Static files on shared hosting (no Node.js runtime)
- **Supported Locales**: ES (Spanish), CA (Catalan), EN (English), FR (French)

### Architecture Pattern
```
WordPress (CMS) → WPGraphQL API → Astro SSG → Static HTML/CSS/JS
```

## Design Requirements

### 1. Hero Section (100% Width & Height)
- **Layout**: Full viewport width and height
- **Featured Image**: Background image with overlay
- **Title Overlay**: Positioned on top of the featured image
- **Responsive**: Adapt to all screen sizes
- **Accessibility**: WCAG 2.1 AA compliant

### 2. Content Section
- **Typography**: Following SAUWA brand guidelines
  - Headings: Helvetica Neue (font-thin)
  - Body: Avenir Next (font-light)
- **Max Width**: 1280px container with responsive padding
- **Content Elements**: Support for paragraphs, headings, lists, images, quotes
- **Readability**: Optimal line height and font sizes

### 3. Design System (SAUWA Brand)

#### Colors
```css
--sauwa-red: #BA2515      /* Primary brand color */
--sauwa-orange: #DB4529   /* Accent/hover states */
--sauwa-green: #406E51    /* Secondary */
--sauwa-brown: #897162    /* Tertiary */
--sauwa-gray: #636464     /* Text/neutral */
```

#### Typography Scale
```css
/* Headings */
h1: 48px, font-weight: 100 (Helvetica Neue)
h2: 24px, font-weight: 300 (Avenir Next)
h3: 20px, font-weight: 500 (Avenir Next)

/* Body */
body: 15px, font-weight: 300 (Avenir Next)
small: 13px, font-weight: 300 (Avenir Next)
```

## Existing Implementation Analysis

### GraphQL Infrastructure

#### Client (`/astro/src/lib/graphql.ts`)
- Simple fetch-based GraphQL client
- Environment variable: `PUBLIC_WORDPRESS_GRAPHQL_URL`
- Error handling and response validation
- No external dependencies (Apollo/urql not needed)

#### Blog Queries (`/astro/src/lib/blog-queries.ts`)
- **Key Query**: `GET_POST_BY_SLUG_QUERY` (lines 126-167)
  - Fetches single post by slug
  - Includes: title, content, excerpt, date, featured image, categories, author, SEO metadata
- **Caching**: In-memory cache with 5-minute TTL
- **Helper Functions**:
  - `formatDate()`: Localized date formatting
  - `stripHtml()`: Remove HTML tags from excerpts
  - `truncateText()`: Text truncation utility

#### Type Definitions (`/astro/src/lib/types/blog.ts`)
```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
  modified?: string;
  featuredImage?: FeaturedImage;
  categories: { nodes: Category[] };
  author?: { node: { name: string; avatar?: { url: string } } };
  seo?: { title?: string; metaDesc?: string };
}
```

### Current Blog Implementation

#### Blog Index Page (`/astro/src/pages/es/blog.astro`)
- Server-side category fetching
- Client-side post loading with BlogGrid component
- Breadcrumb navigation
- Category filtering
- Load more pagination

#### Components
- **BlogCard**: Individual post preview with hover effects
- **BlogGrid**: Grid layout with dynamic loading
- **CategoryFilter**: Category selection UI
- **Breadcrumb**: Navigation trail

### i18n System

#### Translation Utils (`/astro/src/i18n/utils.ts`)
- `getLangFromUrl()`: Extract locale from URL
- `useTranslations()`: Translation hook for components

#### UI Translations (`/astro/src/i18n/ui.ts`)
- Complete translations for all 4 languages
- Blog-specific keys already defined

## Astro Dynamic Pages Requirements

### File Structure for Dynamic Routes
```
src/pages/
├── es/
│   └── blog/
│       └── [slug].astro    # Spanish blog posts
├── ca/
│   └── blog/
│       └── [slug].astro    # Catalan blog posts
├── en/
│   └── blog/
│       └── [slug].astro    # English blog posts
└── fr/
    └── blog/
        └── [slug].astro    # French blog posts
```

### Dynamic Page Pattern
```astro
---
// [slug].astro
import type { GetStaticPaths } from 'astro';

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all posts from GraphQL
  // Return paths array with params and props
  return {
    paths: posts.map(post => ({
      params: { slug: post.slug },
      props: { post }
    }))
  };
};

const { slug } = Astro.params;
const { post } = Astro.props;
---
```

### Key Astro Features to Utilize

1. **`getStaticPaths()`**: Generate all post pages at build time
2. **Image Optimization**: Use Astro's `<Image />` component
3. **SEO Component**: Leverage existing Layout.astro meta tags
4. **Partial Hydration**: Keep pages static, hydrate only interactive elements

## Implementation Specifications

### URL Structure
```
/{locale}/blog/{slug}
Example: /es/blog/beneficios-sauna-finlandesa
```

### Required GraphQL Queries

The existing `GET_POST_BY_SLUG_QUERY` is sufficient but may need enhancement for:
1. Related posts (for "Read Next" section)
2. Previous/Next post navigation
3. Language-specific content if using WPML/Polylang

### SEO Requirements

#### Meta Tags (from post.seo object)
- Title: `post.seo.title || post.title`
- Description: `post.seo.metaDesc || truncateText(post.excerpt, 160)`
- Canonical URL: `https://sauwasauna.com/{locale}/blog/{slug}`
- Open Graph tags for social sharing
- Twitter Card metadata

#### Structured Data (Schema.org)
```json
{
  "@type": "BlogPosting",
  "headline": "post.title",
  "datePublished": "post.date",
  "dateModified": "post.modified",
  "author": { "@type": "Person", "name": "post.author.node.name" },
  "image": "post.featuredImage.node.sourceUrl",
  "publisher": { "@type": "Organization", "name": "SAUWA" }
}
```

### Performance Considerations

1. **Image Optimization**
   - Use responsive images with srcset
   - Lazy loading for content images
   - WebP format with fallbacks
   - Hero image: Priority loading

2. **Core Web Vitals Targets**
   - LCP: < 2.5s (optimize hero image)
   - FID: < 100ms (minimal JavaScript)
   - CLS: < 0.1 (reserve space for images)

3. **Caching Strategy**
   - Static pages cached at CDN level
   - Browser cache headers for assets
   - GraphQL query results cached during build

### Accessibility Requirements

1. **Navigation**
   - Skip to content link
   - Breadcrumb navigation with proper ARIA labels
   - Keyboard navigation support

2. **Content**
   - Semantic HTML structure (article, header, main)
   - Proper heading hierarchy
   - Alt text for all images
   - Focus visible states

3. **Reading Experience**
   - Sufficient color contrast (4.5:1 minimum)
   - Responsive font sizes
   - Line height 1.5-1.8 for body text
   - Maximum line length ~80 characters

## Component Architecture

### Proposed Component Structure

```
BlogPostLayout.astro
├── Layout.astro (existing)
├── BlogPostHero.astro (new)
│   ├── Featured Image (background)
│   ├── Title Overlay
│   └── Post Meta (date, category, reading time)
├── BlogPostContent.astro (new)
│   ├── Article Content (HTML from WordPress)
│   ├── Author Bio (optional)
│   └── Social Share Buttons (optional)
├── BlogPostNavigation.astro (new)
│   ├── Previous Post Link
│   └── Next Post Link
├── RelatedPosts.astro (new)
│   └── BlogCard.astro (existing)
└── FooterBlack.astro (existing)
```

## File Dependencies

### Existing Files to Reuse
- `/astro/src/layouts/Layout.astro` - Base layout with SEO
- `/astro/src/lib/graphql.ts` - GraphQL client
- `/astro/src/lib/blog-queries.ts` - Blog queries and utilities
- `/astro/src/lib/types/blog.ts` - TypeScript types
- `/astro/src/components/blog/BlogCard.astro` - For related posts
- `/astro/src/components/layout/FooterBlack.astro` - Footer
- `/astro/src/components/ui/Breadcrumb.astro` - Navigation
- `/astro/src/i18n/utils.ts` - Translation utilities

### New Files to Create
1. `/astro/src/pages/[locale]/blog/[slug].astro` - Dynamic page template
2. `/astro/src/components/blog/BlogPostHero.astro` - Hero section
3. `/astro/src/components/blog/BlogPostContent.astro` - Content wrapper
4. `/astro/src/components/blog/BlogPostNavigation.astro` - Prev/Next nav
5. `/astro/src/components/blog/RelatedPosts.astro` - Related posts section

## Implementation Steps

### Phase 1: Backend Preparation
1. Verify GraphQL queries return complete data
2. Ensure featured images are optimized at source
3. Confirm SEO fields are populated in WordPress

### Phase 2: Frontend Development
1. Create dynamic route structure
2. Implement `getStaticPaths()` function
3. Build BlogPostHero component
4. Create BlogPostContent wrapper
5. Add navigation and related posts
6. Implement SEO and structured data

### Phase 3: Testing & Optimization
1. Test all language variations
2. Validate responsive design
3. Performance optimization
4. Accessibility audit
5. SEO validation

## Success Criteria

1. **Functional Requirements**
   - All blog posts accessible via slug-based URLs
   - Full-width hero section with featured image
   - Content properly rendered from WordPress HTML
   - Working navigation between posts
   - Related posts section

2. **Performance Metrics**
   - Lighthouse score > 90
   - Page load time < 3 seconds
   - Image optimization implemented

3. **Quality Standards**
   - WCAG 2.1 AA compliant
   - Mobile responsive
   - SEO optimized
   - Cross-browser compatible

## Risk Mitigation

1. **Missing Featured Images**
   - Implement fallback placeholder image
   - Default to gradient background

2. **Long Content Loading**
   - Implement content skeleton
   - Progressive image loading

3. **Translation Gaps**
   - Fallback to default language
   - Clear indication of untranslated content

## Notes for Implementation Teams

### For technical-project-manager
- Create detailed WBS based on implementation steps
- Allocate tasks between frontend and backend teams
- Set up testing milestones

### For astro-ux-architect
- Focus on component architecture and performance
- Implement responsive design patterns
- Ensure smooth user experience

### For wordpress-headless-expert
- Verify GraphQL endpoint stability
- Optimize query performance
- Ensure proper content formatting

## Appendix: Code Examples

### Example Dynamic Page Structure
```astro
---
// [slug].astro
import Layout from '../../../layouts/Layout.astro';
import BlogPostHero from '../../../components/blog/BlogPostHero.astro';
import BlogPostContent from '../../../components/blog/BlogPostContent.astro';
import { getPostBySlug, getBlogPosts } from '../../../lib/blog-queries';
import type { GetStaticPaths } from 'astro';

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getBlogPosts({ first: 100 });
  const posts = response.posts.nodes;

  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }));
};

const { post } = Astro.props;
const locale = 'es'; // Extract from URL
---

<Layout
  title={post.seo?.title || post.title}
  description={post.seo?.metaDesc || post.excerpt}
  lang={locale}
  pageType="blog-post"
>
  <BlogPostHero
    title={post.title}
    image={post.featuredImage}
    date={post.date}
    category={post.categories.nodes[0]}
  />

  <BlogPostContent
    content={post.content}
    author={post.author}
  />
</Layout>
```

---

This context brief provides all necessary information for implementing the individual blog post pages. The implementation should follow the established patterns while ensuring performance, accessibility, and multilingual support.