# SAUWA Dynamic Sitemap Plugin

## Overview

WordPress plugin that generates a dynamic sitemap.xml with URLs pointing to the Astro frontend (sauwasauna.com) instead of the WordPress backend. Automatically updates when posts are published, updated, or deleted.

## Features

- **Dynamic Generation**: Sitemap updates automatically when content changes
- **Frontend URLs**: All URLs point to sauwasauna.com (not backend.sauwasauna.com)
- **Multilingual Support**: Generates URLs for 4 locales (ES, CA, EN, FR)
- **Smart Caching**: 1-hour transient cache for performance
- **SEO Integration**: Respects Yoast SEO and RankMath noindex settings
- **Admin Interface**: Settings page with cache management and statistics
- **Proper Headers**: Correct Content-Type and Cache-Control headers
- **Auto Cache Clear**: Clears cache on post publish/update/delete

## Installation

### Method 1: WordPress Admin (Recommended)

1. Download the plugin folder `sauwa-dynamic-sitemap`
2. Compress it as a ZIP file: `sauwa-dynamic-sitemap.zip`
3. Go to WordPress Admin → Plugins → Add New
4. Click "Upload Plugin"
5. Choose the ZIP file and click "Install Now"
6. Click "Activate Plugin"

### Method 2: FTP/File Manager

1. Upload the `sauwa-dynamic-sitemap` folder to:
   ```
   /wp-content/plugins/sauwa-dynamic-sitemap/
   ```

2. Go to WordPress Admin → Plugins

3. Find "SAUWA Dynamic Sitemap" and click "Activate"

### Method 3: WP-CLI

```bash
cd /path/to/wordpress
wp plugin install /path/to/sauwa-dynamic-sitemap.zip --activate
```

## Post-Installation Steps

### 1. Verify Rewrite Rules

After activation, flush rewrite rules:

**Option A: Via Admin**
- Go to Settings → Permalinks
- Click "Save Changes" (don't change anything)

**Option B: Via WP-CLI**
```bash
wp rewrite flush
```

### 2. Test the Sitemap

Visit: `https://sauwasauna.com/sitemap.xml`

You should see XML output with URLs like:
```xml
<url>
  <loc>https://sauwasauna.com/es/</loc>
  <lastmod>2025-11-11</lastmod>
  <changefreq>daily</changefreq>
  <priority>1.0</priority>
</url>
```

### 3. Update robots.txt

Add this line to your `robots.txt` file:

```
Sitemap: https://sauwasauna.com/sitemap.xml
```

**Method A: File Manager/FTP**
1. Edit `/robots.txt` in the root directory
2. Add the Sitemap line at the bottom

**Method B: WordPress Virtual robots.txt**
1. Install a plugin like "Yoast SEO" or "All in One SEO"
2. They provide virtual robots.txt editing

**Method C: Manual .htaccess (if no robots.txt exists)**
Create a `robots.txt` file in the root:
```
User-agent: *
Allow: /

Sitemap: https://sauwasauna.com/sitemap.xml
```

### 4. Submit to Search Engines

**Google Search Console:**
1. Go to https://search.google.com/search-console
2. Select your property
3. Go to Sitemaps (left sidebar)
4. Enter: `https://sauwasauna.com/sitemap.xml`
5. Click "Submit"

**Bing Webmaster Tools:**
1. Go to https://www.bing.com/webmasters
2. Select your site
3. Go to Sitemaps
4. Enter: `https://sauwasauna.com/sitemap.xml`
5. Click "Submit"

## Configuration

### Admin Panel

Access the settings page:
- WordPress Admin → Settings → SAUWA Sitemap

**Features:**
- View sitemap URL and statistics
- Check cache status
- Clear cache manually
- View static pages configuration
- Copy robots.txt configuration

### Modify Static Pages

Edit the `STATIC_PAGES` constant in `sauwa-dynamic-sitemap.php`:

```php
const STATIC_PAGES = array(
  array(
    'slug'       => 'nueva-pagina',      // URL slug
    'priority'   => '0.8',               // SEO priority (0.0-1.0)
    'changefreq' => 'monthly',           // Change frequency
  ),
  // Add more pages...
);
```

**Change Frequency Options:**
- `always` - Changes on every access
- `hourly` - Changes hourly
- `daily` - Changes daily
- `weekly` - Changes weekly
- `monthly` - Changes monthly
- `yearly` - Changes yearly
- `never` - Never changes

### Modify Locales

Edit the `LOCALES` constant:

```php
const LOCALES = array( 'es', 'ca', 'en', 'fr' );
```

### Change Cache Duration

Edit the `CACHE_DURATION` constant (in seconds):

```php
const CACHE_DURATION = 3600; // 1 hour
```

### Change Frontend Domain

Edit the `FRONTEND_DOMAIN` constant:

```php
const FRONTEND_DOMAIN = 'https://sauwasauna.com';
```

## How It Works

### URL Structure

**Static Pages:**
```
https://sauwasauna.com/{locale}/{page}/
```

**Blog Posts:**
```
https://sauwasauna.com/{locale}/guia-sauwa-sauna/{slug}/
```

### Example URLs

**Homepage (4 locales):**
- `https://sauwasauna.com/es/`
- `https://sauwasauna.com/ca/`
- `https://sauwasauna.com/en/`
- `https://sauwasauna.com/fr/`

**Blog Page:**
- `https://sauwasauna.com/es/guia-sauwa-sauna/`
- `https://sauwasauna.com/ca/guia-sauwa-sauna/`
- etc.

**Blog Post:**
- `https://sauwasauna.com/es/guia-sauwa-sauna/beneficios-del-sauna/`
- `https://sauwasauna.com/ca/guia-sauwa-sauna/beneficios-del-sauna/`
- etc.

### Sitemap Generation Logic

1. **Static Pages**: 7 pages × 4 locales = 28 URLs
2. **Blog Posts**: X posts × 4 locales = X×4 URLs
3. **Filtering**: Excludes posts with Yoast SEO `noindex` meta
4. **Caching**: Stores generated XML in WordPress transient for 1 hour
5. **Auto-Clear**: Cache clears on post publish/update/delete

### Rewrite Rules

The plugin registers a custom rewrite rule:

```
^sitemap\.xml$ → index.php?sauwa_sitemap=1
```

When WordPress detects `?sauwa_sitemap=1`, it:
1. Checks transient cache
2. If cached, serves cached version
3. If not cached, generates fresh sitemap
4. Sets proper headers and outputs XML

## Troubleshooting

### Sitemap Returns 404

**Cause**: Rewrite rules not flushed

**Solution**:
```bash
# Option 1: Via Admin
Settings → Permalinks → Save Changes

# Option 2: Via WP-CLI
wp rewrite flush

# Option 3: Deactivate and reactivate plugin
```

### Sitemap Shows Backend URLs

**Cause**: Wrong FRONTEND_DOMAIN constant

**Solution**: Edit line 33 in `sauwa-dynamic-sitemap.php`:
```php
const FRONTEND_DOMAIN = 'https://sauwasauna.com';
```

### New Posts Don't Appear

**Cause**: Cache not clearing automatically

**Solution**:
1. Go to Settings → SAUWA Sitemap
2. Click "Clear Cache Now"
3. Check if post status is "Published"
4. Verify post doesn't have Yoast SEO noindex meta

### Empty Sitemap

**Cause**: No published posts or all posts are noindex

**Solution**:
1. Publish at least one post
2. Check Yoast SEO settings: Edit Post → Yoast SEO → Advanced → Allow search engines
3. Clear cache and reload sitemap

### Wrong Post Count

**Cause**: Posts with noindex are excluded

**Solution**: This is correct behavior. Posts with Yoast SEO noindex meta should not appear in sitemap.

## Performance

### Caching Strategy

- **First Request**: Generates sitemap (~50-100ms for 100 posts)
- **Subsequent Requests**: Serves from cache (~5-10ms)
- **Cache Duration**: 1 hour (3600 seconds)
- **Auto-Clear**: On post publish/update/delete

### Server Impact

- **Memory**: ~1-2 MB for 100 posts
- **Database Queries**: 1 query for posts (optimized with `fields` parameter)
- **Load**: Minimal - only generates when cache expires

### Optimization Tips

1. **Increase Cache Duration** (for high-traffic sites):
   ```php
   const CACHE_DURATION = 7200; // 2 hours
   ```

2. **Use Object Cache** (if available):
   - Plugin automatically uses WordPress transients
   - Works with Redis/Memcached if configured

3. **Set Up Cron** (optional - for very large sites):
   ```bash
   # Regenerate sitemap every hour
   0 * * * * wget -O /dev/null https://sauwasauna.com/sitemap.xml
   ```

## Security

### Headers

The plugin sets these security headers:

```
Content-Type: application/xml; charset=utf-8
Cache-Control: public, max-age=3600
X-Robots-Tag: noindex
```

### Data Sanitization

- All URLs: `esc_url()`
- All XML data: `esc_xml()`
- All HTML output: `esc_html()`
- Admin forms: `wp_nonce_field()` + `check_admin_referer()`

### Capabilities

- Admin page: Requires `manage_options` capability
- No public input accepted
- Read-only database queries

## Compatibility

### WordPress Versions
- **Minimum**: WordPress 5.0
- **Tested**: WordPress 6.4+
- **PHP**: 7.4+

### SEO Plugins
- ✅ Yoast SEO (noindex detection)
- ✅ RankMath (noindex detection)
- ✅ All in One SEO
- ✅ SEOPress

### Hosting
- ✅ Shared hosting (no Node.js required)
- ✅ VPS/Dedicated servers
- ✅ WordPress.com Business plan
- ✅ Managed WordPress (WP Engine, Kinsta, etc.)

### Multisite
- ⚠️ Not tested for multisite
- Single site only (current version)

## Development

### Hooks and Filters

**Clear cache programmatically:**
```php
do_action( 'sauwa_sitemap_clear_cache' );
```

**Modify frontend domain:**
```php
add_filter( 'sauwa_sitemap_domain', function( $domain ) {
  return 'https://custom-domain.com';
} );
```

### File Structure

```
sauwa-dynamic-sitemap/
├── sauwa-dynamic-sitemap.php  # Main plugin file
├── README.md                  # This file
├── INSTALLATION.md            # Installation guide
└── TESTING.md                 # Testing instructions
```

## Support

For issues or questions:

1. Check this README
2. Check WordPress Admin → Settings → SAUWA Sitemap
3. Enable WordPress debug mode to see errors
4. Check server error logs

## License

GPL v2 or later - https://www.gnu.org/licenses/gpl-2.0.html

## Changelog

### Version 1.0.0 (2025-11-11)
- Initial release
- Dynamic sitemap generation
- Multilingual support (ES, CA, EN, FR)
- Frontend URL support
- Transient caching
- Admin interface
- Yoast SEO integration
- Auto cache clearing
