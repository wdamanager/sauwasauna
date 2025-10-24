# TrailingSlash Configuration Documentation

**Date:** October 23, 2025
**Status:** ✅ Implemented and Verified

## Configuration Decision

The project uses **`trailingSlash: 'always'`** in `astro.config.mjs`.

## Rationale

### Why `trailingSlash: 'always'`?

1. **Shared Hosting Compatibility**
   - The project deploys to shared hosting (no Node.js support)
   - Static HTML files are served directly by Apache/nginx
   - Trailing slashes ensure correct directory-based routing: `/es/` → `/es/index.html`

2. **Build Format Alignment**
   - Project uses `format: 'directory'` in build config
   - This creates folder structures: `/es/blog/` → `dist/es/blog/index.html`
   - Trailing slashes match this directory structure naturally

3. **SEO Best Practices**
   - Consistent URL format across all pages
   - Prevents duplicate content issues (Google treats `/page` and `/page/` as different URLs)
   - All hreflang tags and canonical URLs use trailing slashes

4. **WordPress Headless Integration**
   - GraphQL API endpoints are unaffected by trailing slash config
   - Static content and API calls remain separate
   - No conflicts with WordPress permalink structure

## Implementation Summary

### Files Modified

#### Configuration
- **`astro/astro.config.mjs`**: Already had `trailingSlash: 'always'` (no change needed)

#### Root Redirect
- **`astro/src/pages/index.astro`**: Updated redirect from `/${targetLang}` to `/${targetLang}/`

#### Navigation Components
- **`astro/src/components/layout/Navbar.astro`**: Logo link updated to `/${locale}/`
- **`astro/src/components/layout/Header.astro`**: All navigation links updated with trailing slashes
- **`astro/src/components/layout/Footer.astro`**: Navigation and legal links updated with trailing slashes

#### Blog Components
- **`astro/src/pages/es/blog.astro`** (+ ca, en, fr): Breadcrumb home link updated to `/${locale}/`
- **`astro/src/components/blog/BlogGrid.astro`**: All blog post links updated to `/${locale}/blog/${post.slug}/`
- **`astro/src/components/blog/BlogCard.astro`**: Post URL updated to `/${locale}/blog/${post.slug}/`
- **`astro/src/components/blog/BlogPostHero.astro`**: Category filter link updated to `/${locale}/blog/?category=${slug}`
- **`astro/src/components/BlogScrollCards.astro`**: Blog post and "See More" links updated with trailing slashes

#### Content Components
- **`astro/src/components/BenefitsList.astro`**: Blog CTA links updated to `/es/blog/`, `/ca/blog/`, `/en/blog/`, `/fr/blog/`
- **`astro/src/components/CTANewsletter.astro`**: Privacy policy links updated with trailing slashes
- **`astro/src/components/BenefitsImageSection.astro`**: Session anchor links already use hashes (no change needed)

### URL Structure Examples

| Route Type | URL Format | File Location |
|------------|-----------|---------------|
| Homepage | `/es/` | `dist/es/index.html` |
| Blog Index | `/es/blog/` | `dist/es/blog/index.html` |
| Blog Post | `/es/blog/sauna-benefits/` | `dist/es/blog/sauna-benefits/index.html` |
| Legal Page | `/es/politica-de-privacidad/` | `dist/es/politica-de-privacidad/index.html` |
| Blog Category Filter | `/es/blog/?category=wellness` | Query parameter on blog index |

## Maintenance Guidelines

### When Adding New Pages

Always use trailing slashes in internal links:

```astro
<!-- ✅ CORRECT -->
<a href="/es/nueva-pagina/">Link</a>
<a href={`/${locale}/blog/`}>Blog</a>

<!-- ❌ INCORRECT -->
<a href="/es/nueva-pagina">Link</a>
<a href={`/${locale}/blog`}>Blog</a>
```

### When Adding New Components

1. **Static Links**: Always append `/` to route-based hrefs
2. **Dynamic Links**: Use template literals with trailing slash: `` href={`/${locale}/page/`} ``
3. **Anchor Links**: Hash-based links don't need trailing slashes: `href="#section"`
4. **Query Parameters**: Add `/` before the `?`: `href="/blog/?category=wellness"`

### Testing

#### Development
```bash
npm run dev
# Navigate to http://localhost:4321/es/
# Click through all navigation links
# Verify no 404 errors in browser console
```

#### Build Verification
```bash
npm run build
# Check dist/ folder structure
ls -la dist/es/
ls -la dist/es/blog/
# Verify all folders have index.html files
```

#### Preview Build
```bash
npm run preview
# Test all links in production-like environment
# Verify trailing slashes work correctly
```

### Common Pitfalls

#### ❌ Forgetting Trailing Slash in Breadcrumbs
```astro
<!-- WRONG -->
{ label: 'Home', href: `/${locale}` }

<!-- CORRECT -->
{ label: 'Home', href: `/${locale}/` }
```

#### ❌ Inconsistent Blog Post Links
```astro
<!-- WRONG -->
<a href={`/${locale}/blog/${slug}`}>

<!-- CORRECT -->
<a href={`/${locale}/blog/${slug}/`}>
```

#### ❌ Missing Trailing Slash in Redirects
```javascript
// WRONG
window.location.href = `/${lang}`;

// CORRECT
window.location.href = `/${lang}/`;
```

## Deployment Checklist

Before deploying to production:

- [ ] Build completes successfully (`npm run build`)
- [ ] All pages in `dist/` have proper folder structure
- [ ] Navigate through site in `npm run preview`
- [ ] Test all internal links (navigation, footer, breadcrumbs)
- [ ] Verify blog post links work correctly
- [ ] Check language selector switches correctly
- [ ] Test on mobile and desktop
- [ ] Verify no 404 errors in browser console
- [ ] Check Google Search Console for no crawl errors (after deployment)

## Additional Notes

### Shared Hosting Configuration

When deploying to shared hosting, ensure `.htaccess` (Apache) or equivalent config handles trailing slashes correctly:

```apache
# Redirect non-trailing-slash to trailing-slash
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !/$
RewriteCond %{REQUEST_URI} !^/\.
RewriteRule ^(.*)$ https://sauwasauna.com/$1/ [R=301,L]
```

### External Links

External links (Instagram, privacy policies from external services, etc.) should be left as provided by the external service - do not modify their URL structure.

### API Endpoints

WordPress GraphQL endpoints are accessed via full URLs and are unaffected by this configuration:
- GraphQL: `https://backend.sauwasauna.com/graphql` (no trailing slash)
- REST API: Uses WordPress defaults

## Verification

Build output verified on October 23, 2025:
- ✅ All 31 pages built successfully
- ✅ Correct folder structure in `/dist`
- ✅ All internal links use trailing slashes
- ✅ Root redirect includes trailing slash
- ✅ No broken links detected

## Support

If you encounter issues:
1. Check this document first
2. Verify `astro.config.mjs` has `trailingSlash: 'always'`
3. Run `npm run build` and check for errors
4. Review the "Common Pitfalls" section above
