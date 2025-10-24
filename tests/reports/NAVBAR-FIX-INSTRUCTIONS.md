# Navbar Fix Implementation Instructions

## Executive Summary

**CRITICAL ISSUE:** The homepage currently has duplicate navigation elements that create visual inconsistency. The user wants ONE navbar that simply changes colors on scroll, not different elements appearing/disappearing.

## Required Changes (Priority Order)

### 1. IMMEDIATE FIX - Homepage (`/es/index.astro`)

**File:** `C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\astro\src\pages\es\index.astro`

#### Step 1.1: Add Navbar Import (Line 17, after Footer imports)
```astro
import Navbar from '../../components/layout/Navbar.astro';
```

#### Step 1.2: Add Navbar Component (After Layout opening tag, before audio element - Line 26)
```astro
<Layout title={title} description={description} lang={lang} pageType="homepage">
  <!-- Add Navbar here -->
  <Navbar locale={lang} class="homepage-navbar" />

  <!-- Ambient Audio continues... -->
```

#### Step 1.3: Remove Duplicate Elements (DELETE Lines 86-102)
Remove this entire block:
```astro
<!-- Fixed UI Elements -->
<!-- Language Selector - Top Left -->
<div class="language-selector">
  <a href="/ca" class="lang-option">CA</a>
  <span class="separator">/</span>
  <a href="/es" class="lang-option active">ES</a>
  <span class="separator">/</span>
  <a href="/fr" class="lang-option">FR</a>
  <span class="separator">/</span>
  <a href="/en" class="lang-option">EN</a>
</div>

<!-- Instagram Icon - Top Right -->
<a href="https://www.instagram.com/sauwa.sauna/" target="_blank" rel="noopener noreferrer" class="instagram-link">
  <svg class="instagram-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204..."/>
  </svg>
</a>
```

### 2. UPDATE - NavbarScroll Component

**File:** `C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\astro\src\components\NavbarScroll.astro`

#### Option A: Disable on Homepage (RECOMMENDED)
Add this to the script section (Line 241, after `if (!navbar) return;`):

```javascript
// Skip initialization on homepage
const isHomepage = window.location.pathname === '/es/' ||
                   window.location.pathname === '/ca/' ||
                   window.location.pathname === '/en/' ||
                   window.location.pathname === '/fr/' ||
                   window.location.pathname === '/es' ||
                   window.location.pathname === '/ca' ||
                   window.location.pathname === '/en' ||
                   window.location.pathname === '/fr';

if (isHomepage) {
  navbar.style.display = 'none';
  return;
}
```

### 3. VERIFY - Logo Assets

Check that these files exist:
- `C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\astro\public\images\logo\sauwa-full-white.svg`
- `C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\astro\public\images\logo\sauwa-black.svg`

If not, update paths in `layout/Navbar.astro` lines 28 and 34.

### 4. OPTIONAL - Homepage-Specific Navbar Styling

Add to homepage if needed for hero integration:

```astro
<style>
  /* Homepage-specific navbar adjustments */
  .homepage-navbar {
    position: absolute !important; /* Ensure it overlays the hero */
  }

  /* Ensure navbar is above hero content */
  .hero-section {
    position: relative;
    z-index: 1;
  }

  .homepage-navbar {
    z-index: 50;
  }
</style>
```

## Testing Requirements

### Desktop Testing
1. Load homepage - navbar should be visible with:
   - Transparent background
   - White logo (full version with text)
   - White Instagram icon
   - White language selector

2. Scroll down 100px - navbar should transition to:
   - White background with shadow
   - Black logo (compact version)
   - Black Instagram icon
   - Black language selector

3. Scroll back to top:
   - Smooth transition back to transparent/white

### Mobile Testing
- Same behavior but with adjusted sizing
- Ensure touch interactions work for language selector

### Cross-Page Testing
- Privacy policy page should show navbar correctly
- Blog pages (when created) should work
- All language versions (/es, /ca, /en, /fr) should behave identically

## Rollback Plan

If issues arise:
1. Remove Navbar component from homepage
2. Restore deleted lines 86-102 in index.astro
3. Re-enable NavbarScroll globally

## Success Criteria

✅ ONE navbar visible at all times on homepage
✅ Smooth color transitions on scroll
✅ No duplicate navigation elements
✅ Consistent positioning of logo, language selector, and Instagram icon
✅ Works on all breakpoints (mobile, tablet, desktop)
✅ Other pages unaffected

## Common Issues & Solutions

### Issue: Logo images not showing
**Solution:** Verify SVG paths in public folder, update Navbar.astro

### Issue: Navbar not transparent on hero
**Solution:** Add `homepage-navbar` class with position absolute

### Issue: NavbarScroll still appearing
**Solution:** Ensure the skip logic is properly implemented in NavbarScroll

### Issue: Language selector not visible
**Solution:** Check z-index conflicts, ensure LanguageSelector colors adapt to parent

## Notes for Implementation

- The `layout/Navbar.astro` component is already well-structured for this use case
- It has proper scroll detection and color transitions built-in
- The LanguageSelector component is reusable and adapts to navbar state
- Maintain the existing responsive breakpoints

## Timeline

This is a HIGH PRIORITY fix that should be implemented immediately as it affects the core user experience on the landing page.

Estimated time: 30-45 minutes including testing