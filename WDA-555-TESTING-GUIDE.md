# WDA-555: Quick Testing Guide

**Files**: `sitemap.xml` & `robots.txt`
**Status**: Ready for testing

---

## Quick Test (5 minutes)

```bash
# 1. Install dependencies
cd astro
npm install

# 2. Start dev server
npm run dev

# 3. Test endpoints in browser
# http://localhost:4321/sitemap.xml
# http://localhost:4321/robots.txt
```

---

## What to Check

### Sitemap.xml ✅

**Visual Check**:
- Valid XML (browser shows formatted XML, not error)
- Shows static pages like `/es/`, `/ca/guia-sauwa-sauna/`
- Shows blog posts like `/es/guia-sauwa-sauna/post-slug/`
- All URLs start with `https://sauwasauna.com`

**Console Check** (terminal where dev server runs):
```
[GraphQL] Fetching: ...
[Sitemap] Fetched X posts (filtered noindex)
[Sitemap] Generating sitemap.xml
```

### Robots.txt ✅

**Visual Check**:
- Plain text (not HTML)
- Contains: `Sitemap: https://sauwasauna.com/sitemap.xml`
- Contains: `User-agent: *`
- Contains: `Allow: /`

---

## Verify URL Structure

Sitemap should contain URLs like:

```
Static Pages (4 locales × 7 pages = 28 URLs):
https://sauwasauna.com/es/
https://sauwasauna.com/ca/
https://sauwasauna.com/en/
https://sauwasauna.com/fr/
https://sauwasauna.com/es/guia-sauwa-sauna/
https://sauwasauna.com/ca/guia-sauwa-sauna/
...

Blog Posts (4 locales × N posts):
https://sauwasauna.com/es/guia-sauwa-sauna/{post-slug}/
https://sauwasauna.com/ca/guia-sauwa-sauna/{post-slug}/
https://sauwasauna.com/en/guia-sauwa-sauna/{post-slug}/
https://sauwasauna.com/fr/guia-sauwa-sauna/{post-slug}/
```

---

## Build Test (Optional)

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Test endpoints again
# http://localhost:4321/sitemap.xml
# http://localhost:4321/robots.txt
```

---

## Validation Test (Optional)

```bash
# Get sitemap
curl http://localhost:4321/sitemap.xml > sitemap.xml

# Validate XML online
# https://www.xml-sitemaps.com/validate-xml-sitemap.html

# Or use xmllint (if installed)
xmllint --noout sitemap.xml
```

---

## Expected Post Count

If WordPress has 10 posts, sitemap should show:
- 28 static page URLs (7 pages × 4 locales)
- 40 dynamic post URLs (10 posts × 4 locales)
- **Total: 68 URLs**

Count URLs:
```bash
curl -s http://localhost:4321/sitemap.xml | grep -c "<loc>"
```

---

## Troubleshooting

**No blog posts in sitemap?**
- Check: WordPress GraphQL is accessible at https://backend.sauwasauna.com/graphql
- Check: Console logs show "[Sitemap] Fetched X posts"
- Check: Posts don't have "noindex" SEO setting

**Wrong domain in URLs?**
- Should be: `https://sauwasauna.com`
- Not: `http://localhost:4321`

**Sitemap shows error?**
- Check console for GraphQL errors
- Fallback should show static pages only

---

## Pass Criteria

✅ Sitemap.xml is valid XML
✅ Contains all 4 locales for static pages
✅ Contains blog posts (if WordPress accessible)
✅ All URLs use production domain
✅ Robots.txt points to sitemap
✅ Cache headers set to 1 hour
✅ Console logs show fetch status

---

**Time Required**: 5-10 minutes
**Next**: Test in staging, then submit to Google Search Console
