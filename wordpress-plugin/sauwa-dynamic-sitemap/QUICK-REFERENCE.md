# SAUWA Dynamic Sitemap - Quick Reference

## Installation (5 Minutes)

1. **Upload**: Plugins → Add New → Upload Plugin → Choose ZIP
2. **Activate**: Click "Activate Plugin"
3. **Flush**: Settings → Permalinks → Save Changes
4. **Test**: Visit `https://sauwasauna.com/sitemap.xml`
5. **robots.txt**: Add `Sitemap: https://sauwasauna.com/sitemap.xml`

## Key URLs

| Purpose | URL |
|---------|-----|
| Sitemap | `https://sauwasauna.com/sitemap.xml` |
| Admin Panel | WordPress Admin → Settings → SAUWA Sitemap |
| Google Search Console | https://search.google.com/search-console |
| Bing Webmaster | https://www.bing.com/webmasters |

## Common Tasks

### Clear Cache Manually

1. Go to **Settings → SAUWA Sitemap**
2. Click **"Clear Cache Now"**

### Check Sitemap Stats

1. Go to **Settings → SAUWA Sitemap**
2. View:
   - Total URLs
   - Cache status
   - Static pages list

### Fix 404 Error

1. Go to **Settings → Permalinks**
2. Click **"Save Changes"** (don't change anything)
3. Try sitemap.xml again

### Add New Static Page

1. Edit `sauwa-dynamic-sitemap.php`
2. Find `const STATIC_PAGES = array(`
3. Add:
   ```php
   array(
     'slug'       => 'new-page',
     'priority'   => '0.8',
     'changefreq' => 'monthly',
   ),
   ```
4. Clear cache

## URL Patterns

### Static Pages
```
https://sauwasauna.com/{locale}/
https://sauwasauna.com/{locale}/{page}/
```

Example: `https://sauwasauna.com/es/guia-sauwa-sauna/`

### Blog Posts
```
https://sauwasauna.com/{locale}/guia-sauwa-sauna/{slug}/
```

Example: `https://sauwasauna.com/en/guia-sauwa-sauna/benefits-of-sauna/`

## Configuration Quick Edit

### Change Cache Duration

Edit line 75 in `sauwa-dynamic-sitemap.php`:

```php
const CACHE_DURATION = 3600; // 1 hour (in seconds)
```

**Common values**:
- 30 minutes: `1800`
- 1 hour: `3600` (default)
- 2 hours: `7200`

### Change Frontend Domain

Edit line 33 in `sauwa-dynamic-sitemap.php`:

```php
const FRONTEND_DOMAIN = 'https://sauwasauna.com';
```

### Add/Remove Languages

Edit line 33 in `sauwa-dynamic-sitemap.php`:

```php
const LOCALES = array( 'es', 'ca', 'en', 'fr' );
```

## Expected URL Counts

| Content | Count per Locale | Total URLs |
|---------|------------------|------------|
| Static Pages | 7 pages | 28 URLs (7 × 4) |
| Blog Posts | X posts | X×4 URLs |
| **TOTAL** | - | **28 + (X×4)** |

**Example**: 6 blog posts → 28 + 24 = 52 total URLs

## Troubleshooting

| Problem | Solution |
|---------|----------|
| 404 on sitemap.xml | Flush rewrite rules (Settings → Permalinks → Save) |
| Backend URLs appear | Edit FRONTEND_DOMAIN constant |
| New posts don't appear | Clear cache manually |
| Empty sitemap | Check you have published posts |
| Wrong URL count | Posts with Yoast noindex are excluded (correct) |

## Cache Behavior

### Auto-Clear Triggers

Cache automatically clears when:
- New post is published
- Existing post is updated
- Post is deleted
- Post status changes to/from "Published"

### Manual Clear

When to clear cache manually:
- After editing plugin configuration
- After adding/removing static pages
- After changing locales
- To troubleshoot missing content

## Performance Benchmarks

| Metric | Target | Typical |
|--------|--------|---------|
| Response time (cached) | < 100ms | ~50ms |
| Response time (uncached) | < 500ms | ~200ms |
| Memory usage | < 10 MB | ~5 MB |
| Cache duration | 1 hour | 1 hour |

## SEO Integration

### Yoast SEO

Posts with Yoast noindex are **automatically excluded**:
- Edit Post → Yoast SEO → Advanced
- "Allow search engines..." = No → **Excluded from sitemap**

### RankMath

Posts with RankMath noindex are **automatically excluded**:
- Edit Post → RankMath → Advanced
- Robots Meta: "noindex" → **Excluded from sitemap**

## Static Pages Priority

| Page | Priority | Change Frequency |
|------|----------|------------------|
| Homepage | 1.0 | daily |
| Blog Index | 0.9 | weekly |
| Careers | 0.8 | monthly |
| Partners | 0.8 | monthly |
| Legal Notice | 0.5 | yearly |
| Privacy Policy | 0.5 | yearly |
| Cookie Policy | 0.5 | yearly |

## WP-CLI Commands

```bash
# Activate plugin
wp plugin activate sauwa-dynamic-sitemap

# Clear cache
wp transient delete sauwa_sitemap_xml

# Flush rewrite rules
wp rewrite flush

# Check plugin status
wp plugin status sauwa-dynamic-sitemap

# Count published posts
wp post list --post_status=publish --format=count
```

## Headers Reference

```
Content-Type: application/xml; charset=utf-8
Cache-Control: public, max-age=3600
X-Robots-Tag: noindex
```

## XML Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sauwasauna.com/es/</loc>
    <lastmod>2025-11-11</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- More URLs... -->
</urlset>
```

## Search Console Submission

### Google

1. https://search.google.com/search-console
2. Sitemaps (left sidebar)
3. Add sitemap: `sitemap.xml`
4. Submit

### Bing

1. https://www.bing.com/webmasters
2. Sitemaps
3. Add sitemap: `https://sauwasauna.com/sitemap.xml`
4. Submit

## Validation Tools

| Tool | URL |
|------|-----|
| XML Validator | https://www.xmlvalidation.com/ |
| Sitemap Validator | https://www.xml-sitemaps.com/validate-xml-sitemap.html |
| Google Rich Results | https://search.google.com/test/rich-results |

## Support Checklist

Before asking for help:

- [ ] Flushed rewrite rules?
- [ ] Cleared cache?
- [ ] Checked WordPress/PHP version?
- [ ] Tested with browser DevTools?
- [ ] Checked error logs?
- [ ] Verified published posts exist?
- [ ] Confirmed Yoast settings?

## Backup and Restore

### Before Making Changes

```bash
# Backup plugin file
cp sauwa-dynamic-sitemap.php sauwa-dynamic-sitemap.php.backup

# Backup database transient
wp transient get sauwa_sitemap_xml > sitemap-backup.xml
```

### Restore

```bash
# Restore plugin file
cp sauwa-dynamic-sitemap.php.backup sauwa-dynamic-sitemap.php

# Clear cache and regenerate
wp transient delete sauwa_sitemap_xml
```

## Monitoring Script (Optional)

Create `monitor-sitemap.sh`:

```bash
#!/bin/bash

URL="https://sauwasauna.com/sitemap.xml"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $URL)

if [ $STATUS -eq 200 ]; then
  echo "✓ Sitemap OK (HTTP $STATUS)"
else
  echo "✗ Sitemap ERROR (HTTP $STATUS)"
  # Send alert (email, Slack, etc.)
fi
```

Run daily via cron:
```
0 9 * * * /path/to/monitor-sitemap.sh
```

## Important Files

```
wordpress-plugin/
└── sauwa-dynamic-sitemap/
    ├── sauwa-dynamic-sitemap.php  # Main plugin file
    ├── README.md                  # Full documentation
    ├── INSTALLATION.md            # Installation guide
    ├── TESTING.md                 # Testing procedures
    ├── QUICK-REFERENCE.md         # This file
    └── robots.txt.example         # robots.txt template
```

## Version Info

- **Version**: 1.0.0
- **WordPress**: 5.0+
- **PHP**: 7.4+
- **License**: GPL v2 or later

## Quick Debug Mode

Add to `wp-config.php` (temporarily):

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

Check logs at: `/wp-content/debug.log`

---

**Remember**: After ANY configuration change, always clear cache!

Settings → SAUWA Sitemap → Clear Cache Now
