# SAUWA Dynamic Sitemap - Testing Guide

## Pre-Deployment Testing

### Test Environment Setup

1. **Install on staging/test site first**
2. **Verify WordPress version**: 5.0+
3. **Verify PHP version**: 7.4+
4. **Backup database** before testing

### Installation Tests

#### Test 1: Plugin Activation

**Steps**:
1. Upload plugin to `/wp-content/plugins/sauwa-dynamic-sitemap/`
2. Go to Plugins → Installed Plugins
3. Click "Activate" on SAUWA Dynamic Sitemap

**Expected Result**:
- ✅ Plugin activates without errors
- ✅ No PHP warnings/errors in debug.log
- ✅ Rewrite rules flushed automatically

**Pass/Fail**: _______

---

#### Test 2: Rewrite Rule Registration

**Steps**:
1. After activation, go to Settings → Permalinks
2. Click "Save Changes"
3. Visit: `https://yourdomain.com/sitemap.xml`

**Expected Result**:
- ✅ Sitemap XML loads (not 404)
- ✅ Valid XML structure
- ✅ No PHP errors

**Pass/Fail**: _______

---

### Functional Tests

#### Test 3: Static Pages Generation

**Steps**:
1. Visit sitemap.xml
2. Count URLs ending with `/es/`, `/ca/`, `/en/`, `/fr/`
3. Verify all 7 static pages appear for each locale

**Expected Result**:
```xml
<!-- Homepage -->
<loc>https://sauwasauna.com/es/</loc>
<loc>https://sauwasauna.com/ca/</loc>
<loc>https://sauwasauna.com/en/</loc>
<loc>https://sauwasauna.com/fr/</loc>

<!-- Blog Page -->
<loc>https://sauwasauna.com/es/guia-sauwa-sauna/</loc>
...

<!-- Other static pages (28 total URLs) -->
```

**Verification**:
- [ ] Homepage (4 URLs)
- [ ] guia-sauwa-sauna (4 URLs)
- [ ] trabaja-con-nosotros (4 URLs)
- [ ] partners-hoteleros (4 URLs)
- [ ] aviso-legal (4 URLs)
- [ ] politica-de-privacidad (4 URLs)
- [ ] politica-de-cookies (4 URLs)
- **Total**: 28 static URLs

**Pass/Fail**: _______

---

#### Test 4: Dynamic Blog Posts

**Steps**:
1. Create 3 test posts with status "Published"
2. Visit sitemap.xml
3. Search for post slugs in sitemap

**Expected Result**:
- Each post appears 4 times (once per locale)
- URLs follow pattern: `/{locale}/guia-sauwa-sauna/{slug}/`
- Example:
  ```xml
  <loc>https://sauwasauna.com/es/guia-sauwa-sauna/test-post/</loc>
  <loc>https://sauwasauna.com/ca/guia-sauwa-sauna/test-post/</loc>
  <loc>https://sauwasauna.com/en/guia-sauwa-sauna/test-post/</loc>
  <loc>https://sauwasauna.com/fr/guia-sauwa-sauna/test-post/</loc>
  ```

**Verification**:
- [ ] All published posts appear
- [ ] Each post has 4 locale variants
- [ ] URLs use frontend domain (sauwasauna.com)
- [ ] lastmod dates match post modified date

**Pass/Fail**: _______

---

#### Test 5: Yoast SEO Noindex Integration

**Prerequisites**: Yoast SEO plugin installed

**Steps**:
1. Create a new post
2. In Yoast SEO meta box → Advanced tab
3. Set "Allow search engines to show this Post in search results?" to **No**
4. Publish the post
5. Clear sitemap cache (Settings → SAUWA Sitemap → Clear Cache Now)
6. Visit sitemap.xml
7. Search for the post slug

**Expected Result**:
- ✅ Post with noindex does NOT appear in sitemap
- ✅ Other posts still appear normally

**Pass/Fail**: _______

---

#### Test 6: URL Format Validation

**Steps**:
1. View sitemap.xml source
2. Check all `<loc>` tags

**Expected Format**:
```
https://sauwasauna.com/es/
https://sauwasauna.com/ca/guia-sauwa-sauna/
https://sauwasauna.com/en/guia-sauwa-sauna/post-slug/
```

**Invalid Formats** (should NOT appear):
```
http://sauwasauna.com/...              ❌ (not HTTPS)
https://backend.sauwasauna.com/...     ❌ (wrong domain)
https://sauwasauna.com/es              ❌ (missing trailing slash)
https://sauwasauna.com//es/            ❌ (double slash)
```

**Pass/Fail**: _______

---

### Caching Tests

#### Test 7: Cache Creation

**Steps**:
1. Clear cache: Settings → SAUWA Sitemap → Clear Cache Now
2. Verify cache status shows "○ Not cached"
3. Visit sitemap.xml
4. Go back to Settings → SAUWA Sitemap
5. Check cache status

**Expected Result**:
- ✅ Cache status shows "✓ Cached"
- ✅ Sitemap loads quickly (< 50ms)

**Pass/Fail**: _______

---

#### Test 8: Cache Persistence

**Steps**:
1. Note current time
2. Visit sitemap.xml
3. Wait 2 minutes
4. Visit sitemap.xml again
5. Check if same cached version is served

**Expected Result**:
- ✅ Same cached version served (check lastmod dates)
- ✅ No database queries executed (check Query Monitor if available)

**Pass/Fail**: _______

---

#### Test 9: Auto Cache Clear on Publish

**Steps**:
1. Visit sitemap.xml (populate cache)
2. Create a new post
3. Publish the post
4. Check Settings → SAUWA Sitemap cache status

**Expected Result**:
- ✅ Cache status shows "○ Not cached"
- ✅ Next sitemap request generates fresh version
- ✅ New post appears in sitemap

**Pass/Fail**: _______

---

#### Test 10: Auto Cache Clear on Update

**Steps**:
1. Visit sitemap.xml (populate cache)
2. Edit an existing published post
3. Change the title/content
4. Click "Update"
5. Check cache status

**Expected Result**:
- ✅ Cache cleared automatically
- ✅ Sitemap regenerates with updated `lastmod` date

**Pass/Fail**: _______

---

#### Test 11: Auto Cache Clear on Delete

**Steps**:
1. Visit sitemap.xml (populate cache)
2. Delete a published post (move to trash)
3. Check cache status
4. Visit sitemap.xml

**Expected Result**:
- ✅ Cache cleared automatically
- ✅ Deleted post no longer appears in sitemap

**Pass/Fail**: _______

---

### Performance Tests

#### Test 12: Response Time (Cached)

**Steps**:
1. Ensure sitemap is cached
2. Use browser DevTools Network tab
3. Visit sitemap.xml
4. Record response time

**Expected Result**:
- ✅ Response time < 100ms
- ✅ Size: ~10-50 KB (depends on post count)

**Actual**: _______ ms

**Pass/Fail**: _______

---

#### Test 13: Response Time (Uncached)

**Steps**:
1. Clear cache
2. Use browser DevTools Network tab
3. Visit sitemap.xml
4. Record response time

**Expected Result**:
- ✅ Response time < 500ms (for 100 posts)
- ✅ No PHP errors

**Actual**: _______ ms

**Pass/Fail**: _______

---

#### Test 14: Memory Usage

**Steps**:
1. Enable WordPress debug: `define('WP_DEBUG', true);`
2. Add to theme functions.php:
   ```php
   add_action('shutdown', function() {
     error_log('Memory: ' . memory_get_peak_usage(true) / 1024 / 1024 . ' MB');
   });
   ```
3. Clear cache
4. Visit sitemap.xml
5. Check error.log for memory usage

**Expected Result**:
- ✅ Memory usage < 10 MB increase
- ✅ No memory limit errors

**Actual**: _______ MB

**Pass/Fail**: _______

---

### HTTP Header Tests

#### Test 15: Content-Type Header

**Steps**:
1. Use curl or browser DevTools
   ```bash
   curl -I https://sauwasauna.com/sitemap.xml
   ```
2. Check Content-Type header

**Expected Result**:
```
Content-Type: application/xml; charset=utf-8
```

**Pass/Fail**: _______

---

#### Test 16: Cache-Control Header

**Steps**:
1. Use curl:
   ```bash
   curl -I https://sauwasauna.com/sitemap.xml
   ```
2. Check Cache-Control header

**Expected Result**:
```
Cache-Control: public, max-age=3600
```

**Pass/Fail**: _______

---

#### Test 17: X-Robots-Tag Header

**Steps**:
1. Use curl:
   ```bash
   curl -I https://sauwasauna.com/sitemap.xml
   ```
2. Check X-Robots-Tag header

**Expected Result**:
```
X-Robots-Tag: noindex
```

**Pass/Fail**: _______

---

### XML Validation Tests

#### Test 18: XML Structure Validation

**Steps**:
1. Visit sitemap.xml
2. View page source
3. Copy entire XML
4. Paste into: https://www.xmlvalidation.com/

**Expected Result**:
- ✅ Valid XML structure
- ✅ No parsing errors
- ✅ Well-formed document

**Pass/Fail**: _______

---

#### Test 19: Sitemap Protocol Validation

**Steps**:
1. Visit: https://www.xml-sitemaps.com/validate-xml-sitemap.html
2. Enter: `https://sauwasauna.com/sitemap.xml`
3. Click "Validate"

**Expected Result**:
- ✅ Valid sitemap per sitemaps.org protocol
- ✅ All URLs are valid
- ✅ All dates are properly formatted (Y-m-d)

**Pass/Fail**: _______

---

### Admin Interface Tests

#### Test 20: Settings Page Access

**Steps**:
1. Go to WordPress Admin
2. Click Settings → SAUWA Sitemap

**Expected Result**:
- ✅ Page loads without errors
- ✅ Shows sitemap URL
- ✅ Shows total URL count
- ✅ Shows cache status
- ✅ Shows static pages table

**Pass/Fail**: _______

---

#### Test 21: Manual Cache Clear

**Steps**:
1. Go to Settings → SAUWA Sitemap
2. Click "Clear Cache Now" button
3. Check for success notice

**Expected Result**:
- ✅ Success message appears
- ✅ Cache status changes to "○ Not cached"
- ✅ No errors

**Pass/Fail**: _______

---

#### Test 22: URL Count Accuracy

**Steps**:
1. Count published posts manually (Posts → All Posts)
2. Go to Settings → SAUWA Sitemap
3. Compare "Total URLs" count

**Expected Formula**:
```
Total URLs = (7 static × 4 locales) + (X posts × 4 locales)
           = 28 + (X × 4)
```

**Example**: 6 posts → 28 + 24 = 52 URLs

**Actual Count**: _______

**Expected Count**: _______

**Pass/Fail**: _______

---

### Edge Case Tests

#### Test 23: No Published Posts

**Steps**:
1. Move all posts to trash (or test on fresh install)
2. Clear cache
3. Visit sitemap.xml

**Expected Result**:
- ✅ Sitemap still loads
- ✅ Contains 28 static page URLs
- ✅ No PHP errors

**Pass/Fail**: _______

---

#### Test 24: Large Number of Posts

**Steps**:
1. Create 100+ test posts (or use WP-CLI):
   ```bash
   for i in {1..100}; do
     wp post create --post_title="Test Post $i" --post_status=publish
   done
   ```
2. Clear cache
3. Visit sitemap.xml
4. Measure response time

**Expected Result**:
- ✅ Sitemap loads successfully
- ✅ Response time < 1 second
- ✅ No timeout errors
- ✅ All posts appear

**Pass/Fail**: _______

---

#### Test 25: Special Characters in Post Slug

**Steps**:
1. Create post with title: "Sauna & Spa: ¿Beneficios? (2025)"
2. Publish
3. Clear cache
4. Visit sitemap.xml
5. Find the post URL

**Expected Result**:
- ✅ URL is properly encoded
- ✅ Special characters handled correctly
- ✅ Example: `sauna-spa-beneficios-2025`

**Pass/Fail**: _______

---

### Security Tests

#### Test 26: Admin Access Control

**Steps**:
1. Log out of WordPress
2. Try to access: `/wp-admin/options-general.php?page=sauwa-sitemap`

**Expected Result**:
- ✅ Redirected to login page
- ✅ Cannot access without authentication

**Pass/Fail**: _______

---

#### Test 27: XSS Prevention

**Steps**:
1. Create post with title: `<script>alert('XSS')</script>`
2. Publish
3. Visit sitemap.xml
4. View source

**Expected Result**:
- ✅ Script tags are escaped/encoded
- ✅ No JavaScript execution
- ✅ URL slug is sanitized

**Pass/Fail**: _______

---

### Integration Tests

#### Test 28: Yoast SEO Compatibility

**Prerequisites**: Yoast SEO installed

**Steps**:
1. Ensure Yoast SEO is active
2. Create posts with various Yoast settings
3. Check sitemap includes/excludes correctly

**Expected Result**:
- ✅ Plugin doesn't conflict with Yoast
- ✅ Respects Yoast noindex settings
- ✅ No duplicate sitemaps

**Pass/Fail**: _______

---

#### Test 29: Multisite Compatibility (if applicable)

**Steps**:
1. Activate plugin on multisite network
2. Test on individual sites

**Expected Result**:
- ✅ Each site has its own sitemap
- ✅ URLs point to correct site
- ✅ No cross-site URL contamination

**Pass/Fail**: _______

---

### Deployment Tests

#### Test 30: robots.txt Integration

**Steps**:
1. Edit robots.txt
2. Add: `Sitemap: https://sauwasauna.com/sitemap.xml`
3. Visit: `/robots.txt`

**Expected Result**:
- ✅ Sitemap line appears in robots.txt
- ✅ URL is correct

**Pass/Fail**: _______

---

#### Test 31: Google Search Console Submission

**Steps**:
1. Go to Google Search Console
2. Add sitemap URL
3. Wait for processing

**Expected Result**:
- ✅ Sitemap submitted successfully
- ✅ No errors in GSC
- ✅ URLs discovered

**Pass/Fail**: _______

---

## Test Summary

| Category | Tests Passed | Tests Failed | Total |
|----------|--------------|--------------|-------|
| Installation | ____ | ____ | 2 |
| Functional | ____ | ____ | 6 |
| Caching | ____ | ____ | 5 |
| Performance | ____ | ____ | 3 |
| HTTP Headers | ____ | ____ | 3 |
| XML Validation | ____ | ____ | 2 |
| Admin Interface | ____ | ____ | 3 |
| Edge Cases | ____ | ____ | 3 |
| Security | ____ | ____ | 2 |
| Integration | ____ | ____ | 2 |
| Deployment | ____ | ____ | 2 |
| **TOTAL** | ____ | ____ | **31** |

## Sign-Off

**Tested By**: _______________________

**Date**: _______________________

**WordPress Version**: _______________________

**PHP Version**: _______________________

**Server**: _______________________

**Result**: PASS / FAIL

**Notes**:
```
[Add any additional notes or observations]
```

## Post-Deployment Monitoring

### Week 1 Checklist

- [ ] Monitor Google Search Console for crawl errors
- [ ] Check sitemap accessibility daily
- [ ] Verify cache clearing on post publish
- [ ] Monitor server load/performance

### Week 2-4 Checklist

- [ ] Verify all new posts appear in sitemap
- [ ] Check Search Console URL count matches expected
- [ ] Review cache hit rate
- [ ] Validate sitemap monthly

### Ongoing Monitoring

- [ ] Set up uptime monitoring for sitemap.xml
- [ ] Review GSC errors weekly
- [ ] Update plugin if WordPress core updates
- [ ] Document any issues or edge cases

## Automated Testing (Optional)

### WP-CLI Test Script

Create `test-sitemap.sh`:

```bash
#!/bin/bash

echo "Testing SAUWA Dynamic Sitemap..."

# Check if plugin is active
wp plugin is-active sauwa-dynamic-sitemap
if [ $? -eq 0 ]; then
  echo "✓ Plugin is active"
else
  echo "✗ Plugin is not active"
  exit 1
fi

# Clear cache
wp transient delete sauwa_sitemap_xml
echo "✓ Cache cleared"

# Create test post
POST_ID=$(wp post create --post_title="Test Sitemap Post" --post_status=publish --porcelain)
echo "✓ Created test post (ID: $POST_ID)"

# Fetch sitemap
curl -s -o /tmp/sitemap.xml https://sauwasauna.com/sitemap.xml
if [ $? -eq 0 ]; then
  echo "✓ Sitemap downloaded"
else
  echo "✗ Sitemap download failed"
  exit 1
fi

# Validate XML
xmllint --noout /tmp/sitemap.xml
if [ $? -eq 0 ]; then
  echo "✓ Sitemap is valid XML"
else
  echo "✗ Sitemap is invalid XML"
  exit 1
fi

# Check URL count
URL_COUNT=$(grep -c "<loc>" /tmp/sitemap.xml)
echo "✓ Found $URL_COUNT URLs"

# Cleanup
wp post delete $POST_ID --force
echo "✓ Deleted test post"

echo ""
echo "All tests passed!"
```

Run with: `bash test-sitemap.sh`

---

**End of Testing Guide**
