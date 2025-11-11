# SAUWA Dynamic Sitemap - Installation Guide

## Quick Start (5 Minutes)

### Step 1: Upload Plugin

**Via WordPress Admin (Recommended):**

1. Compress the `sauwa-dynamic-sitemap` folder into `sauwa-dynamic-sitemap.zip`

2. Go to WordPress Admin → Plugins → Add New

3. Click "Upload Plugin" button

4. Choose `sauwa-dynamic-sitemap.zip`

5. Click "Install Now"

6. Click "Activate Plugin"

**Via FTP/File Manager:**

1. Upload the entire `sauwa-dynamic-sitemap` folder to:
   ```
   /wp-content/plugins/
   ```

2. Go to WordPress Admin → Plugins

3. Find "SAUWA Dynamic Sitemap"

4. Click "Activate"

### Step 2: Flush Rewrite Rules

**Important**: This must be done after activation!

Go to: **Settings → Permalinks → Save Changes**

(Don't change anything, just click "Save Changes")

### Step 3: Test the Sitemap

Visit: `https://sauwasauna.com/sitemap.xml`

You should see XML output starting with:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sauwasauna.com/es/</loc>
    ...
```

**If you see 404**: Go back to Step 2 and flush rewrite rules again.

### Step 4: Update robots.txt

Add this line to your `robots.txt` file:

```
Sitemap: https://sauwasauna.com/sitemap.xml
```

**How to edit robots.txt:**

**Option A: File Manager/FTP**
1. Connect to your hosting via FTP or File Manager
2. Navigate to the root directory (where `wp-config.php` is)
3. Edit or create `robots.txt`
4. Add the Sitemap line

**Option B: Via Yoast SEO (if installed)**
1. Go to Yoast SEO → Tools → File Editor
2. Click on "robots.txt"
3. Add the Sitemap line
4. Save changes

**Option C: Create New robots.txt**
If you don't have a `robots.txt` file, create one in the root with:
```
User-agent: *
Allow: /

Sitemap: https://sauwasauna.com/sitemap.xml
```

### Step 5: Submit to Search Engines

**Google Search Console:**

1. Go to https://search.google.com/search-console

2. Select your property (sauwasauna.com)

3. Click "Sitemaps" in the left sidebar

4. Enter: `sitemap.xml`

5. Click "Submit"

**Bing Webmaster Tools:**

1. Go to https://www.bing.com/webmasters

2. Select your site

3. Go to "Sitemaps"

4. Enter: `https://sauwasauna.com/sitemap.xml`

5. Click "Submit"

## Verification Checklist

- [ ] Plugin uploaded and activated
- [ ] Rewrite rules flushed (Settings → Permalinks → Save)
- [ ] Sitemap accessible at https://sauwasauna.com/sitemap.xml
- [ ] Sitemap shows correct URLs (sauwasauna.com, not backend.sauwasauna.com)
- [ ] robots.txt updated with Sitemap line
- [ ] Sitemap submitted to Google Search Console
- [ ] Sitemap submitted to Bing Webmaster Tools

## Common Issues

### Issue: 404 Error on sitemap.xml

**Cause**: Rewrite rules not flushed

**Solution**:
1. Go to Settings → Permalinks
2. Click "Save Changes" (don't modify anything)
3. Clear browser cache
4. Try again: https://sauwasauna.com/sitemap.xml

**Alternative Solution** (WP-CLI):
```bash
wp rewrite flush
```

**Last Resort**:
1. Deactivate the plugin
2. Reactivate the plugin
3. Flush permalinks again

### Issue: Sitemap Shows Backend URLs

**Cause**: Frontend domain not configured correctly

**Solution**:

1. Edit `sauwa-dynamic-sitemap.php`

2. Find line 33:
   ```php
   const FRONTEND_DOMAIN = 'https://sauwasauna.com';
   ```

3. Make sure it's exactly: `https://sauwasauna.com` (no trailing slash)

4. Save and clear cache (Settings → SAUWA Sitemap → Clear Cache Now)

### Issue: Sitemap is Empty or Missing Posts

**Cause**: No published posts or all posts have noindex meta

**Solution**:

1. Check you have published posts:
   - Go to Posts → All Posts
   - Verify status is "Published"

2. Check Yoast SEO settings:
   - Edit a post
   - Scroll to Yoast SEO meta box
   - Click "Advanced" tab
   - Ensure "Allow search engines to show this Post in search results?" is set to "Yes"

3. Clear cache:
   - Settings → SAUWA Sitemap → Clear Cache Now

### Issue: New Posts Don't Appear

**Cause**: Cache not clearing automatically

**Solution**:

1. Manual clear:
   - Go to Settings → SAUWA Sitemap
   - Click "Clear Cache Now"
   - Reload sitemap

2. Check auto-clear hooks:
   - Ensure post is actually "Published" (not Draft or Pending)
   - Try editing and re-saving the post

3. Reduce cache duration (temporarily):
   - Edit `sauwa-dynamic-sitemap.php`
   - Change line 75: `const CACHE_DURATION = 300;` (5 minutes)
   - Save and test

### Issue: Wrong Number of URLs

**Expected Count**: `(7 static pages × 4 locales) + (X posts × 4 locales)`

Example with 6 posts: `(7 × 4) + (6 × 4) = 28 + 24 = 52 URLs`

**Cause**: Posts with noindex are excluded (this is correct)

**Solution**: This is expected behavior. Posts with Yoast SEO noindex meta should NOT appear in sitemap.

## Advanced Configuration

### Change Cache Duration

Edit line 75 in `sauwa-dynamic-sitemap.php`:

```php
const CACHE_DURATION = 3600; // 1 hour (in seconds)
```

**Recommendations**:
- High-traffic site with frequent posts: `1800` (30 minutes)
- Medium-traffic site: `3600` (1 hour) - **Default**
- Low-traffic site with rare posts: `7200` (2 hours)

### Add/Remove Static Pages

Edit lines 36-68 in `sauwa-dynamic-sitemap.php`:

```php
const STATIC_PAGES = array(
  array(
    'slug'       => '',              // Empty for homepage
    'priority'   => '1.0',           // SEO priority (0.0-1.0)
    'changefreq' => 'daily',         // Change frequency
  ),
  array(
    'slug'       => 'nueva-pagina',  // Your page slug
    'priority'   => '0.8',
    'changefreq' => 'monthly',
  ),
  // Add more pages...
);
```

**After editing**: Clear cache in Settings → SAUWA Sitemap

### Add/Remove Locales

Edit line 33 in `sauwa-dynamic-sitemap.php`:

```php
const LOCALES = array( 'es', 'ca', 'en', 'fr' );
```

**Example** (add Portuguese):
```php
const LOCALES = array( 'es', 'ca', 'en', 'fr', 'pt' );
```

**After editing**: Clear cache in Settings → SAUWA Sitemap

### Change Blog URL Structure

Currently: `/{locale}/guia-sauwa-sauna/{slug}/`

To change, edit line 278 in `sauwa-dynamic-sitemap.php`:

```php
$url = self::FRONTEND_DOMAIN . '/' . $locale . '/guia-sauwa-sauna/' . $post->post_name . '/';
```

**Example** (change to `/blog/`):
```php
$url = self::FRONTEND_DOMAIN . '/' . $locale . '/blog/' . $post->post_name . '/';
```

**After editing**: Clear cache in Settings → SAUWA Sitemap

## Server Requirements

### Minimum Requirements

- **WordPress**: 5.0 or higher
- **PHP**: 7.4 or higher
- **MySQL**: 5.6 or higher
- **HTTPS**: Required (for https://sauwasauna.com)

### Recommended Requirements

- **WordPress**: 6.0+
- **PHP**: 8.0+
- **MySQL**: 5.7+
- **Server**: Apache or Nginx
- **Memory**: 128 MB PHP memory limit

### Hosting Compatibility

✅ **Compatible with**:
- Shared hosting (HostGator, Bluehost, SiteGround, etc.)
- VPS (DigitalOcean, Linode, Vultr)
- Managed WordPress (WP Engine, Kinsta, Flywheel)
- Cloud hosting (AWS, Google Cloud, Azure)

⚠️ **Not required**:
- Node.js (this is a PHP plugin)
- Shell/SSH access (optional, but not required)
- Root access

## Testing After Installation

### 1. Basic Functionality Test

Visit: `https://sauwasauna.com/sitemap.xml`

**Expected result**: XML document with URLs

### 2. URL Format Test

Check that URLs look like:
```
https://sauwasauna.com/es/
https://sauwasauna.com/ca/guia-sauwa-sauna/
https://sauwasauna.com/en/guia-sauwa-sauna/benefits-of-sauna/
```

**Not like**:
```
https://backend.sauwasauna.com/...  ❌ (wrong domain)
http://sauwasauna.com/...           ❌ (not HTTPS)
```

### 3. Cache Test

1. Visit sitemap.xml
2. Note the current time
3. Go to Settings → SAUWA Sitemap
4. Check "Cache Status" - should show "✓ Cached"
5. Click "Clear Cache Now"
6. Check "Cache Status" - should show "○ Not cached"
7. Visit sitemap.xml again
8. Check "Cache Status" - should show "✓ Cached" again

### 4. Auto-Clear Test

1. Create a new post (or edit existing)
2. Publish it
3. Go to Settings → SAUWA Sitemap
4. Check "Cache Status" - should show "○ Not cached"
5. Visit sitemap.xml
6. Verify new post appears

### 5. Count Validation

Go to Settings → SAUWA Sitemap

**Total URLs should equal**:
```
(7 static pages × 4 locales) + (X published posts × 4 locales)
```

**Example**:
- 6 published posts
- Expected: (7 × 4) + (6 × 4) = 28 + 24 = 52 URLs

### 6. XML Validation

Use an online validator:
- https://www.xml-sitemaps.com/validate-xml-sitemap.html
- Paste your sitemap URL: `https://sauwasauna.com/sitemap.xml`
- Click "Validate"
- Should show "Valid sitemap"

## WP-CLI Commands (Optional)

If you have WP-CLI access:

**Flush rewrite rules**:
```bash
wp rewrite flush
```

**Check if plugin is active**:
```bash
wp plugin list | grep sauwa
```

**Activate plugin**:
```bash
wp plugin activate sauwa-dynamic-sitemap
```

**Deactivate plugin**:
```bash
wp plugin deactivate sauwa-dynamic-sitemap
```

**Delete transient cache**:
```bash
wp transient delete sauwa_sitemap_xml
```

## Monitoring and Maintenance

### Weekly Checks

1. Verify sitemap is accessible
2. Check URL count matches expected
3. Verify cache is working

### Monthly Checks

1. Validate sitemap XML
2. Check Google Search Console for errors
3. Verify all new posts appear

### After Major Updates

1. Flush rewrite rules
2. Clear cache
3. Test sitemap generation
4. Validate XML

## Uninstallation

### Keep Settings

1. Go to Plugins → Installed Plugins
2. Find "SAUWA Dynamic Sitemap"
3. Click "Deactivate"

### Remove Completely

1. Deactivate the plugin (see above)
2. Click "Delete"
3. Confirm deletion
4. Go to Settings → Permalinks → Save Changes (flush rewrite rules)
5. Remove Sitemap line from robots.txt

**Manual cleanup** (if needed):
```bash
# Delete transient cache
wp transient delete sauwa_sitemap_xml

# Flush rewrite rules
wp rewrite flush
```

## Support Resources

### Documentation
- README.md - Complete documentation
- TESTING.md - Testing procedures
- This file - Installation guide

### WordPress Resources
- Permalinks: https://wordpress.org/support/article/using-permalinks/
- Rewrite API: https://developer.wordpress.org/apis/handbook/rewrite/

### SEO Resources
- Google Sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Sitemap Protocol: https://www.sitemaps.org/protocol.html

## Next Steps

After successful installation:

1. ✅ Monitor Google Search Console for crawl errors
2. ✅ Set up automated monitoring (optional)
3. ✅ Document any custom modifications
4. ✅ Train team on cache clearing
5. ✅ Review sitemap monthly

Your sitemap is now live and will automatically update when you publish new posts!
