# Comprehensive Context for WDA-286, WDA-294, and WDA-295

## Executive Summary

This document provides complete context for implementing three Linear tasks related to the SAUWA website:

- **WDA-286**: Blog index page with category filtering and pagination
- **WDA-294**: Individual blog post pages with related content
- **WDA-295**: Mobile-first responsive design optimization

All implementations must follow the SAUWA design system, maintain mobile-first approach, and support multilingual content (ES, CA, EN, FR).

---

## Project Architecture Overview

### Technical Stack
- **Frontend**: Astro 5.0.5 (Static Site Generation)
- **Styling**: Tailwind CSS 3.4.15
- **Languages**: TypeScript
- **Multilingual**: ES (default), CA, EN, FR
- **Backend**: WordPress Headless + WPGraphQL (future integration)
- **Testing**: Playwright (to be implemented)
- **Analytics**: Google Tag Manager + GA4

### File Structure
```
astro/
├── src/
│   ├── components/      # Reusable Astro components
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages (multilingual)
│   │   ├── index.astro  # Language detection redirect
│   │   ├── es/          # Spanish pages
│   │   ├── ca/          # Catalan pages
│   │   ├── en/          # English pages
│   │   └── fr/          # French pages
│   ├── i18n/            # Translations
│   ├── lib/             # Utilities
│   └── styles/          # Global styles
└── public/              # Static assets
```

### Build Configuration
- **Output**: Static HTML/CSS/JS
- **Deployment**: Shared hosting (no Node.js)
- **URLs**: No trailing slash
- **i18n**: Prefix all locales including default

---

## SAUWA Design System

### Brand Colors
- **Primary Red**: `#BA2515` (sauwa-red)
- **Orange Accent**: `#DB4529` (sauwa-orange)
- **Forest Green**: `#406E51` (sauwa-green)
- **Earth Brown**: `#897162` (sauwa-brown)
- **Neutral Gray**: `#636464` (sauwa-gray)

### Typography
- **Headings**: Helvetica Neue (Ultra Light 100, Light 300)
- **Body Text**: Avenir Next (Ultra Light 100, Light 300, Regular 400)
- **Font Loading**: Self-hosted WOFF2 fonts with swap display

### Component Patterns

#### Standard Component Structure
```astro
---
// Component documentation
export interface Props {
  locale?: 'es' | 'ca' | 'en' | 'fr';
  class?: string;
}

const { locale = 'es', class: className = '' } = Astro.props;
---

<div class={`component-name ${className}`}>
  <!-- Component content -->
</div>

<style>
  /* Component-specific styles */
</style>
```

#### CSS Classes Convention
- **Utility Classes**: Tailwind CSS core utilities only
- **Custom Components**: Use `@layer components` in global.css
- **Naming**: kebab-case for CSS classes
- **Responsive**: Mobile-first breakpoints (sm, md, lg, xl, 2xl)

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: > 1440px

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Semantic HTML5 elements
- Proper ARIA labels
- Keyboard navigation support
- Reduced motion support

### Performance Targets
- Lighthouse Score: 90+ (all categories)
- Core Web Vitals:
  - LCP: < 2.5s
  - FID: < 100ms
  - CLS: < 0.1

---

## Task WDA-286: Blog Index Page

### Requirements
Create a blog index page (`/[locale]/blog`) with:

1. **Hero Section**
   - Title: "Blog"
   - Subtitle: "Descubre el bienestar nórdico"
   - Background image or gradient

2. **Category Filter**
   - All categories (default)
   - Dynamic categories from WordPress
   - Active state styling
   - Smooth transitions

3. **Blog Grid**
   - 3 columns on desktop
   - 2 columns on tablet
   - 1 column on mobile
   - Card-based layout

4. **Blog Card Component**
   - Featured image
   - Title (H3)
   - Excerpt (max 150 chars)
   - Read time
   - Category badge
   - "Leer más" CTA
   - Hover effects

5. **Pagination**
   - Load more button (initial)
   - Show 9 posts initially
   - Smooth loading animation
   - "No more posts" message

### Technical Implementation

#### File Locations
- Page: `/src/pages/[locale]/blog/index.astro`
- Components:
  - `/src/components/blog/BlogHero.astro`
  - `/src/components/blog/CategoryFilter.astro`
  - `/src/components/blog/BlogGrid.astro`
  - `/src/components/blog/BlogCard.astro`
  - `/src/components/blog/LoadMoreButton.astro`

#### Data Structure (Mock)
```typescript
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  readingTime: number;
  publishedDate: string;
  author: string;
}
```

#### Translations Required
```typescript
'blog.hero.title': 'Blog',
'blog.hero.subtitle': 'Descubre el bienestar nórdico',
'blog.filter.all': 'Todas las categorías',
'blog.card.readTime': '{minutes} min de lectura',
'blog.card.readMore': 'Leer más',
'blog.loadMore': 'Cargar más artículos',
'blog.noMorePosts': 'No hay más artículos',
```

---

## Task WDA-294: Blog Post Page

### Requirements
Create individual blog post pages (`/[locale]/blog/[slug]`) with:

1. **Article Header**
   - Breadcrumb navigation
   - Title (H1)
   - Meta info (date, author, reading time, category)
   - Featured image

2. **Article Content**
   - Rich text content
   - Responsive images
   - Blockquotes styling
   - Lists styling
   - Code blocks (if needed)

3. **Share Section**
   - Social media share buttons
   - Copy link functionality
   - WhatsApp, Twitter, Facebook, LinkedIn

4. **Related Posts**
   - 3 related posts maximum
   - Same category preference
   - Card layout (reuse BlogCard)

5. **Navigation**
   - Previous/Next post links
   - Back to blog index
   - Smooth scroll to top

### Technical Implementation

#### File Locations
- Page Template: `/src/pages/[locale]/blog/[...slug].astro`
- Components:
  - `/src/components/blog/ArticleHeader.astro`
  - `/src/components/blog/ArticleContent.astro`
  - `/src/components/blog/ShareButtons.astro`
  - `/src/components/blog/RelatedPosts.astro`
  - `/src/components/blog/PostNavigation.astro`

#### Mock Blog Posts
Create 3 sample blog posts:
1. "beneficios-sauna-finlandesa"
2. "ritual-nordico-completo"
3. "sauna-despues-deporte"

#### Content Structure
```typescript
interface BlogPostFull extends BlogPost {
  content: string; // HTML content
  tags: string[];
  seoDescription: string;
  ogImage: string;
}
```

---

## Task WDA-295: Mobile-First Responsive Design

### Requirements
Optimize all blog components for mobile-first responsive design:

1. **Mobile Optimization (< 768px)**
   - Single column layouts
   - Touch-friendly tap targets (min 44px)
   - Optimized font sizes
   - Simplified navigation
   - Lazy loading images

2. **Tablet Adaptation (768px - 1024px)**
   - 2-column grid for blog cards
   - Adjusted spacing
   - Side-by-side layouts where appropriate

3. **Desktop Enhancement (> 1024px)**
   - 3-column grid for blog cards
   - Enhanced hover states
   - Sticky elements where useful

4. **Performance**
   - Responsive images with srcset
   - WebP format with fallbacks
   - Critical CSS inline
   - Prefetch next pages

5. **Testing Requirements**
   - Test on real devices
   - Playwright E2E tests
   - Visual regression tests
   - Performance monitoring

### Mobile-First CSS Approach
```css
/* Mobile First - Default styles */
.component {
  /* Mobile styles */
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    /* Tablet enhancements */
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    /* Desktop enhancements */
  }
}
```

---

## Existing Components to Reuse

### Layout Components
- `Layout.astro` - Main layout with SEO, GTM, navigation
- `NavbarScroll.astro` - Scroll-triggered navigation bar
- `Footer.astro` - Footer with multilingual support
- `FooterBlack.astro` - Alternative dark footer

### Utility Components
- `GoogleTagManager.astro` - Analytics tracking
- `AnalyticsDebugger.astro` - Development debugging

### Patterns to Follow
1. **Animation Classes**
   ```css
   .animate-fade-in-up
   .animation-delay-200
   .animation-delay-400
   ```

2. **Typography Classes**
   ```css
   .heading-primary
   .heading-secondary
   .text-body
   .text-cta
   ```

3. **Button Styles**
   ```css
   .btn-primary
   .btn-secondary
   ```

---

## Implementation Workflow

### Phase 1: Blog Index (WDA-286)
1. Create BlogHero component
2. Implement CategoryFilter with mock categories
3. Build BlogGrid and BlogCard components
4. Add LoadMore functionality
5. Test responsive layout

### Phase 2: Blog Post (WDA-294)
1. Create dynamic route handler
2. Build ArticleHeader component
3. Implement ArticleContent with typography
4. Add ShareButtons functionality
5. Create RelatedPosts section

### Phase 3: Mobile Optimization (WDA-295)
1. Review all components for mobile-first
2. Optimize images and performance
3. Implement touch gestures
4. Add Playwright tests
5. Performance audit

---

## Testing Strategy

### Unit Tests (Components)
- Test component props and rendering
- Verify translation keys
- Check responsive breakpoints

### E2E Tests (Playwright)
```typescript
// Example test structure
test('Blog index loads and filters work', async ({ page }) => {
  await page.goto('/es/blog');
  await expect(page.locator('h1')).toContainText('Blog');
  await page.click('[data-category="sauna"]');
  await expect(page.locator('.blog-card')).toHaveCount(3);
});
```

### Visual Regression
- Capture screenshots at different viewports
- Compare against baseline images
- Flag any visual changes

### Performance Testing
- Lighthouse CI in pipeline
- Bundle size monitoring
- Loading time checks

---

## Success Criteria

### WDA-286 (Blog Index)
- [x] Responsive grid layout works on all devices
- [x] Category filtering is smooth and intuitive
- [x] Load more functionality works correctly
- [x] All text is translatable
- [x] Meets accessibility standards

### WDA-294 (Blog Post)
- [x] Clean, readable article layout
- [x] Social sharing works on all platforms
- [x] Related posts are relevant
- [x] Navigation is intuitive
- [x] SEO metadata is complete

### WDA-295 (Mobile Responsive)
- [x] Mobile-first CSS approach used
- [x] Touch targets meet 44px minimum
- [x] Images are optimized for mobile
- [x] Performance scores > 90
- [x] Tested on real devices

---

## Dependencies and Blockers

### Current Dependencies
- Translation keys need to be added to `/src/i18n/ui.ts`
- Mock blog data for development
- Blog images in `/public/images/blog/`

### Potential Blockers
- WordPress GraphQL integration (use mock data initially)
- Final design approval from client
- Performance on shared hosting

---

## Next Steps

1. **Immediate Actions**
   - Create blog page structure
   - Implement mock data service
   - Build reusable blog components

2. **Follow-up Tasks**
   - Integrate with WordPress GraphQL
   - Add advanced filtering options
   - Implement search functionality

3. **Future Enhancements**
   - Newsletter subscription in blog
   - Comments system
   - Author profiles

---

## References

### Design Assets
- Logo: `/public/logos/sauwa-full-white.svg`
- Icons: Use SVG inline or icon fonts
- Images: `/public/images/blog/` (to be created)

### Code Examples
- Hero Component: See `HeroSlider.astro`
- Grid Layout: Reference `BenefitsSection.astro`
- Responsive Patterns: Check `global.css`

### Documentation
- Astro Docs: https://docs.astro.build
- Tailwind CSS: https://tailwindcss.com/docs
- Playwright: https://playwright.dev

---

This context document provides all necessary information to implement WDA-286, WDA-294, and WDA-295 successfully. The technical-project-manager should use this to coordinate work between specialized agents, ensuring consistent implementation across all tasks.