# SAUWA Dynamic Sitemap - Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Verification

- [ ] **WordPress Version**: 5.0 or higher
  ```bash
  wp core version
  ```

- [ ] **PHP Version**: 7.4 or higher
  ```bash
  php -v
  ```

- [ ] **HTTPS Enabled**: Site accessible via HTTPS
  - Test: `https://sauwasauna.com`

- [ ] **Permalink Structure**: Not "Plain"
  - WordPress Admin → Settings → Permalinks
  - Should be "Post name" or any structure except "Plain"

### 2. Backup

**Critical**: Always backup before deployment!

**Option A: Via Plugin (UpdraftPlus, BackupBuddy, etc.)**
1. Install backup plugin
2. Create full backup (database + files)
3. Download backup to local machine

**Option B: Via cPanel/Hosting Panel**
1. Go to cPanel → Backups
2. Generate full backup
3. Download when ready

**Option C: Via WP-CLI**
```bash
# Backup database
wp db export backup-$(date +%Y%m%d).sql

# Backup plugins folder
tar -czf plugins-backup-$(date +%Y%m%d).tar.gz wp-content/plugins/
```

**Option D: Manual**
1. Export database via phpMyAdmin
2. Download `/wp-content/plugins/` via FTP

### 3. Test Environment

**Recommended**: Test on staging environment first!

- [ ] Staging site available
- [ ] Staging database is recent copy of production
- [ ] Can access staging WordPress admin

If no staging environment:
- [ ] Prepared to rollback if issues occur
- [ ] Low-traffic time window scheduled
- [ ] Team notified of deployment

## Deployment Steps

### Step 1: Prepare Plugin Package

**On Local Machine:**

1. Navigate to plugin directory:
   ```bash
   cd C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\SAUWA-WDA-555\wordpress-plugin\sauwa-dynamic-sitemap
   ```

2. Verify all files are present:
   ```
   sauwa-dynamic-sitemap/
   ├── sauwa-dynamic-sitemap.php
   ├── README.md
   ├── INSTALLATION.md
   ├── TESTING.md
   ├── QUICK-REFERENCE.md
   ├── DEPLOYMENT.md (this file)
   └── robots.txt.example
   ```

3. Create ZIP archive:

   **Windows (PowerShell):**
   ```powershell
   Compress-Archive -Path "sauwa-dynamic-sitemap" -DestinationPath "sauwa-dynamic-sitemap.zip"
   ```

   **Windows (7-Zip):**
   ```
   Right-click folder → 7-Zip → Add to archive → ZIP format
   ```

   **Mac/Linux:**
   ```bash
   zip -r sauwa-dynamic-sitemap.zip sauwa-dynamic-sitemap/
   ```

### Step 2: Upload to WordPress

**Method A: WordPress Admin Upload (Recommended)**

1. Log in to WordPress Admin: `https://backend.sauwasauna.com/wp-admin`

2. Navigate to: **Plugins → Add New**

3. Click: **Upload Plugin** (top of page)

4. Click: **Choose File**

5. Select: `sauwa-dynamic-sitemap.zip`

6. Click: **Install Now**

7. Wait for upload and extraction

8. You should see: "Plugin installed successfully."

**Method B: FTP Upload**

1. Connect to server via FTP (FileZilla, WinSCP, etc.):
   - Host: `ftp.sauwasauna.com` (or your hosting FTP host)
   - Username: Your FTP username
   - Password: Your FTP password

2. Navigate to: `/public_html/wp-content/plugins/`

3. Upload the entire `sauwa-dynamic-sitemap` folder (not the ZIP)

4. Verify all files uploaded correctly

**Method C: File Manager (cPanel)**

1. Log in to cPanel

2. Open **File Manager**

3. Navigate to: `/public_html/wp-content/plugins/`

4. Click **Upload** (top toolbar)

5. Upload `sauwa-dynamic-sitemap.zip`

6. Go back to File Manager

7. Right-click ZIP file → **Extract**

8. Delete the ZIP file after extraction

### Step 3: Activate Plugin

1. Go to: **WordPress Admin → Plugins → Installed Plugins**

2. Find: **SAUWA Dynamic Sitemap**

3. Click: **Activate**

4. Look for success message (green banner at top)

5. If you see errors:
   - Note the error message
   - **DO NOT PROCEED** - troubleshoot first
   - Check PHP version, file permissions

### Step 4: Flush Rewrite Rules

**Critical**: This MUST be done after activation!

1. Go to: **Settings → Permalinks**

2. **Do not change anything**

3. Scroll down and click: **Save Changes**

4. You should see: "Permalink structure updated."

**Alternative (WP-CLI):**
```bash
wp rewrite flush
```

### Step 5: Verify Sitemap

1. Open new browser tab

2. Visit: `https://sauwasauna.com/sitemap.xml`

3. You should see XML document with `<urlset>` root element

4. Verify:
   - [ ] Shows XML (not 404)
   - [ ] URLs point to `https://sauwasauna.com` (not backend)
   - [ ] At least 28 static page URLs (7 pages × 4 locales)
   - [ ] Blog post URLs appear (if you have published posts)

**If 404 Error**:
- Go back to Step 4 and flush permalinks again
- Clear browser cache
- Try in incognito/private window

### Step 6: Check Admin Panel

1. Go to: **Settings → SAUWA Sitemap**

2. Verify you see:
   - [ ] Sitemap URL
   - [ ] Total URLs count
   - [ ] Cache status
   - [ ] Static pages table
   - [ ] "Clear Cache Now" button

3. Compare "Total URLs" with expected count:
   ```
   Expected = (7 static × 4 locales) + (X posts × 4 locales)
            = 28 + (X × 4)
   ```

### Step 7: Test Cache Functionality

1. In Settings → SAUWA Sitemap, note cache status

2. Click: **Clear Cache Now**

3. Verify: Cache status shows "○ Not cached"

4. Visit: `https://sauwasauna.com/sitemap.xml` in new tab

5. Go back to Settings → SAUWA Sitemap

6. Verify: Cache status shows "✓ Cached"

### Step 8: Update robots.txt

**Locate robots.txt**:

- Root of your site: `/robots.txt`
- URL: `https://sauwasauna.com/robots.txt`

**Edit robots.txt**:

**Option A: Via File Manager/FTP**

1. Connect via FTP or open File Manager

2. Navigate to root directory (where `index.php` is)

3. Look for `robots.txt`

4. If exists:
   - Edit file
   - Add at the bottom:
     ```
     Sitemap: https://sauwasauna.com/sitemap.xml
     ```
   - Save

5. If doesn't exist:
   - Create new file: `robots.txt`
   - Add content:
     ```
     User-agent: *
     Allow: /

     Sitemap: https://sauwasauna.com/sitemap.xml
     ```
   - Save

**Option B: Via Yoast SEO**

1. Go to: **Yoast SEO → Tools → File Editor**

2. Click on: **robots.txt** tab

3. Add at the bottom:
   ```
   Sitemap: https://sauwasauna.com/sitemap.xml
   ```

4. Click: **Save Changes**

**Verify**:

1. Visit: `https://sauwasauna.com/robots.txt`

2. Verify you see the Sitemap line

### Step 9: Submit to Search Engines

**Google Search Console**:

1. Go to: https://search.google.com/search-console

2. Select property: `sauwasauna.com`

3. Click: **Sitemaps** (left sidebar)

4. Enter in "Add a new sitemap": `sitemap.xml`

5. Click: **Submit**

6. Wait for Google to process (can take a few hours)

7. Check back later - status should show "Success"

**Bing Webmaster Tools**:

1. Go to: https://www.bing.com/webmasters

2. Select your site

3. Navigate to: **Sitemaps**

4. Enter: `https://sauwasauna.com/sitemap.xml`

5. Click: **Submit**

### Step 10: Post-Deployment Validation

**Checklist**:

- [ ] Sitemap accessible at correct URL
- [ ] No PHP errors in WordPress debug log
- [ ] Admin panel loads without errors
- [ ] Cache creation/clearing works
- [ ] URLs use correct domain (sauwasauna.com)
- [ ] Static pages count correct (28 URLs)
- [ ] Blog posts appear (if applicable)
- [ ] robots.txt updated
- [ ] Submitted to Google Search Console
- [ ] Submitted to Bing Webmaster Tools

**Performance Check**:

1. Open browser DevTools (F12)

2. Go to Network tab

3. Visit: `https://sauwasauna.com/sitemap.xml`

4. Check response:
   - [ ] HTTP Status: 200 OK
   - [ ] Response time: < 500ms (first load)
   - [ ] Response time: < 100ms (cached)
   - [ ] Content-Type: `application/xml; charset=utf-8`
   - [ ] Cache-Control: `public, max-age=3600`

**XML Validation**:

1. Visit: https://www.xml-sitemaps.com/validate-xml-sitemap.html

2. Enter: `https://sauwasauna.com/sitemap.xml`

3. Click: **Validate**

4. Verify: "Valid sitemap" message

### Step 11: Document Deployment

**Create deployment record**:

```
Deployment Record - SAUWA Dynamic Sitemap
==========================================

Date: [Insert date]
Time: [Insert time]
Deployed By: [Your name]

Environment:
- WordPress Version: [Check: wp core version]
- PHP Version: [Check: php -v]
- Plugin Version: 1.0.0

Deployment Method: [Admin Upload / FTP / File Manager]

Verification Results:
- Sitemap URL: https://sauwasauna.com/sitemap.xml ✓
- Total URLs: [Insert count]
- Cache Working: Yes / No
- robots.txt Updated: Yes / No
- GSC Submitted: Yes / No
- Bing Submitted: Yes / No

Issues Encountered: [None / List any issues]

Rollback Plan: [Backup location and procedure]

Notes: [Any additional notes]
```

## Rollback Procedure

### If Issues Occur

**Immediate Rollback**:

1. **Deactivate Plugin**:
   - WordPress Admin → Plugins
   - Find "SAUWA Dynamic Sitemap"
   - Click "Deactivate"

2. **Delete Plugin** (if necessary):
   - Click "Delete" after deactivation
   - Confirm deletion

3. **Restore Backup** (if needed):
   - If database issues, restore database backup
   - If file issues, restore `/wp-content/plugins/` backup

4. **Flush Permalinks**:
   - Settings → Permalinks → Save Changes

**Verify Rollback**:
- [ ] Site loads normally
- [ ] No PHP errors
- [ ] WordPress admin accessible
- [ ] Front-end functional

## Troubleshooting Common Deployment Issues

### Issue: Plugin Won't Activate

**Symptoms**: Error message when clicking "Activate"

**Causes**:
- PHP version too old
- File permissions incorrect
- Corrupted upload

**Solutions**:

1. **Check PHP Version**:
   ```bash
   php -v
   ```
   Minimum: 7.4

2. **Check File Permissions**:
   ```bash
   chmod 755 wp-content/plugins/sauwa-dynamic-sitemap/
   chmod 644 wp-content/plugins/sauwa-dynamic-sitemap/sauwa-dynamic-sitemap.php
   ```

3. **Re-upload Plugin**:
   - Delete existing folder
   - Re-upload fresh copy

4. **Check Error Logs**:
   - cPanel → Error Logs
   - Or: `/wp-content/debug.log`

### Issue: 404 on sitemap.xml

**Symptoms**: "Page not found" when visiting sitemap.xml

**Solutions**:

1. **Flush Rewrite Rules** (most common):
   - Settings → Permalinks → Save Changes
   - **DO NOT** use "Plain" permalinks

2. **Check .htaccess**:
   - Ensure `.htaccess` exists in root
   - Should contain WordPress rewrite rules
   - If missing, save permalinks to regenerate

3. **Disable Other Sitemap Plugins**:
   - Yoast SEO sitemap
   - RankMath sitemap
   - Google XML Sitemaps
   - All in One SEO sitemap

4. **Check for .htaccess Conflicts**:
   - Look for rules blocking `/sitemap.xml`
   - Remove or modify conflicting rules

### Issue: Wrong Domain in URLs

**Symptoms**: URLs show `backend.sauwasauna.com` instead of `sauwasauna.com`

**Solution**:

1. Edit `sauwa-dynamic-sitemap.php`

2. Line 33, verify:
   ```php
   const FRONTEND_DOMAIN = 'https://sauwasauna.com';
   ```

3. Save file

4. Clear cache: Settings → SAUWA Sitemap → Clear Cache Now

### Issue: Empty Sitemap

**Symptoms**: Sitemap loads but has no URLs (or only static pages)

**Causes**:
- No published posts
- All posts have Yoast noindex
- Database query issue

**Solutions**:

1. **Check for Published Posts**:
   - Posts → All Posts
   - Verify status = "Published"

2. **Check Yoast SEO Settings**:
   - Edit a post
   - Yoast SEO meta box → Advanced
   - Ensure "Allow search engines" = Yes

3. **Test Post Query**:
   ```bash
   wp post list --post_status=publish --format=count
   ```
   Should return count > 0

### Issue: Cache Not Clearing

**Symptoms**: Sitemap doesn't update after publishing new post

**Solutions**:

1. **Manual Clear**:
   - Settings → SAUWA Sitemap → Clear Cache Now

2. **Check Hooks** (advanced):
   - Verify `save_post` hook is firing
   - Check for hook conflicts with other plugins

3. **Disable Object Cache** (temporarily):
   - If using Redis/Memcached
   - May need to clear external cache too

## Monitoring Setup

### Week 1: Daily Monitoring

**Daily Tasks**:

- [ ] Visit sitemap.xml - verify accessible
- [ ] Check Google Search Console - no errors
- [ ] Verify new posts appear in sitemap
- [ ] Monitor site performance (no slowdowns)

**What to Look For**:
- HTTP 200 status on sitemap.xml
- URL count increasing as posts published
- No error messages in GSC
- Response time < 100ms (cached)

### Week 2-4: Weekly Monitoring

**Weekly Tasks**:

- [ ] Validate sitemap XML
- [ ] Check GSC coverage report
- [ ] Verify cache clearing on post publish
- [ ] Review error logs

### Ongoing: Monthly Monitoring

**Monthly Tasks**:

- [ ] Full sitemap validation
- [ ] GSC error review
- [ ] URL count audit
- [ ] Performance benchmarks
- [ ] Plugin update check

### Automated Monitoring (Optional)

**Set Up Uptime Monitor**:

Services:
- UptimeRobot (free)
- Pingdom
- StatusCake

Monitor URL: `https://sauwasauna.com/sitemap.xml`

Expected:
- HTTP 200 status
- Response time < 1000ms
- Content contains `<urlset>`

**Set Up Cron Health Check** (optional):

Create `check-sitemap-health.sh`:

```bash
#!/bin/bash

SITEMAP="https://sauwasauna.com/sitemap.xml"
EMAIL="your@email.com"

# Fetch sitemap
STATUS=$(curl -s -o /tmp/sitemap-check.xml -w "%{http_code}" $SITEMAP)

# Check HTTP status
if [ $STATUS -ne 200 ]; then
  echo "ERROR: Sitemap returned HTTP $STATUS" | mail -s "SAUWA Sitemap Alert" $EMAIL
  exit 1
fi

# Check for valid XML
if ! xmllint --noout /tmp/sitemap-check.xml 2>/dev/null; then
  echo "ERROR: Sitemap is invalid XML" | mail -s "SAUWA Sitemap Alert" $EMAIL
  exit 1
fi

# Check URL count
URL_COUNT=$(grep -c "<loc>" /tmp/sitemap-check.xml)
if [ $URL_COUNT -lt 28 ]; then
  echo "WARNING: Sitemap has only $URL_COUNT URLs (expected 28+)" | mail -s "SAUWA Sitemap Alert" $EMAIL
  exit 1
fi

echo "SUCCESS: Sitemap OK ($URL_COUNT URLs)"
```

Add to crontab (daily at 9 AM):
```
0 9 * * * /path/to/check-sitemap-health.sh
```

## Maintenance Schedule

### Daily
- Automatic cache clearing on post changes
- No manual intervention needed

### Weekly
- Review Google Search Console for errors
- Verify new posts appear in sitemap

### Monthly
- Validate sitemap XML
- Check URL count accuracy
- Review performance metrics

### Quarterly
- Full plugin review
- Update documentation if needed
- Benchmark performance

### Yearly
- Review configuration
- Update plugin if WordPress core updates
- Security audit

## Security Best Practices

### File Permissions

```bash
# Plugin directory
chmod 755 wp-content/plugins/sauwa-dynamic-sitemap/

# Plugin file
chmod 644 wp-content/plugins/sauwa-dynamic-sitemap/sauwa-dynamic-sitemap.php
```

### Regular Updates

- [ ] Keep WordPress updated
- [ ] Keep PHP updated (8.0+ recommended)
- [ ] Review plugin code after WordPress major updates

### Access Control

- [ ] Restrict admin access to trusted users
- [ ] Use strong passwords
- [ ] Enable two-factor authentication
- [ ] Regular security scans

## Support and Documentation

### Internal Documentation

Keep these files accessible to team:
- README.md - Full documentation
- INSTALLATION.md - Installation guide
- TESTING.md - Testing procedures
- QUICK-REFERENCE.md - Quick reference
- DEPLOYMENT.md - This file

### External Resources

- WordPress Codex: https://codex.wordpress.org/
- WPGraphQL: https://www.wpgraphql.com/
- Sitemaps.org: https://www.sitemaps.org/
- Google Search Central: https://developers.google.com/search

## Success Metrics

Track these metrics post-deployment:

**Technical**:
- Sitemap uptime: 99.9%+
- Response time: < 100ms (cached)
- Cache hit rate: > 95%
- XML validation: 100% valid

**SEO**:
- Google Search Console coverage: No errors
- Indexed URLs: Increasing over time
- Crawl efficiency: Improved
- Sitemap status: Success

**Operational**:
- Zero manual interventions needed
- Automatic cache clearing: 100% success
- New posts appear: < 1 hour
- No support tickets related to sitemap

## Deployment Sign-Off

```
Deployment Approved By:

Technical Lead: _______________________  Date: ___________

Project Manager: ______________________  Date: ___________

Client Approval: ______________________  Date: ___________

Deployment Completed By: ______________  Date: ___________

Post-Deployment Verification:

[ ] All tests passed (see TESTING.md)
[ ] Sitemap accessible and valid
[ ] Search engines notified
[ ] Monitoring configured
[ ] Documentation updated
[ ] Team trained
[ ] Backup verified

Sign-Off: _____________________________  Date: ___________
```

---

**Deployment Complete!**

Your dynamic sitemap is now live and will automatically update as content changes.

For questions or issues, refer to:
- README.md for detailed documentation
- QUICK-REFERENCE.md for common tasks
- TESTING.md for validation procedures
