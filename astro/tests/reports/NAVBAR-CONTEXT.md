# SAUWA Navbar Implementation Context

## Current Problem

The user is experiencing confusion with the navbar implementation. The navbar is not behaving consistently across the homepage, particularly the transition between the transparent state (at top) and the scrolled state (white background).

## Current Implementation Analysis

### THREE Different Navbar Implementations Exist:

1. **Homepage Hero Elements** (`/es/index.astro` lines 87-102)
   - Hard-coded language selector and Instagram icon directly in the hero section
   - Static positioning within the hero
   - White text/icons
   - Disappears when scrolled

2. **NavbarScroll Component** (`NavbarScroll.astro`)
   - Appears only when scrolling down past 100px threshold
   - White background with black logo and text
   - Contains: Logo (compact black), Language selector, Instagram icon
   - Hides when scrolling up or at top
   - Used globally via Layout.astro

3. **Layout Navbar Component** (`layout/Navbar.astro`)
   - Full navbar with logo transition capability
   - Switches between white logo (transparent bg) and black logo (white bg) on scroll
   - Contains LanguageSelector component and Instagram icon
   - Used on non-hero pages like privacy policy

## The Core Issue

**The homepage has TWO SEPARATE UI ELEMENTS:**
- Hero section has static language/Instagram elements
- NavbarScroll appears/disappears on scroll

This creates visual inconsistency where:
1. At top: User sees hero elements (white, positioned in corners)
2. When scrolled: Hero elements hide, NavbarScroll appears with different positioning
3. When scrolling back up: NavbarScroll hides, hero elements reappear

**User expectation:** ONE navbar that simply changes colors (transparent → white) while maintaining the SAME structure and position.

## Desired Behavior

The user wants **ONE UNIFIED NAVBAR** that:

### At Top (Hero Section):
- Transparent background
- White logo (full version)
- White Instagram icon
- White language selector text
- Fixed position at top

### When Scrolled:
- White background with shadow
- Black logo (compact version)
- Black Instagram icon
- Black language selector text
- **SAME POSITION AND STRUCTURE** as at top

## Current File Structure

```
astro/src/
├── components/
│   ├── NavbarScroll.astro       # Scroll-triggered navbar
│   ├── layout/
│   │   └── Navbar.astro         # Full navbar with transitions
│   └── ui/
│       └── LanguageSelector.astro # Reusable language dropdown
├── layouts/
│   └── Layout.astro              # Uses NavbarScroll globally
└── pages/
    └── es/
        └── index.astro           # Has hardcoded hero elements
```

## Implementation Requirements

### Option 1: Use Existing `layout/Navbar.astro` (RECOMMENDED)

The `layout/Navbar.astro` component already has most of the required functionality:
- Logo transition (white ↔ black)
- Color changes on scroll
- Contains LanguageSelector and Instagram icon
- Proper structure and spacing

**Changes needed:**
1. Add to homepage (`/es/index.astro`)
2. Remove hardcoded hero language selector and Instagram icon (lines 87-102)
3. Ensure transparent background at top on homepage
4. Adjust logo paths if needed (`/images/logo/sauwa-full-white.svg` exists?)
5. Remove or disable NavbarScroll on homepage

### Option 2: Modify NavbarScroll

Transform NavbarScroll to:
1. Always be visible (remove show/hide logic)
2. Add transparent state at top
3. Add logo switching (white ↔ black)
4. Add color transitions for text/icons

## Specific Code Locations to Modify

### 1. Homepage (`/es/index.astro`)
- **Remove lines 87-102** (hardcoded language selector and Instagram)
- **Add** `<Navbar locale={lang} />` import and usage at top of Layout content

### 2. Layout.astro
- **Consider:** Conditionally include NavbarScroll only for non-homepage
- OR remove NavbarScroll entirely and use layout/Navbar everywhere

### 3. layout/Navbar.astro
- **Verify:** Logo paths are correct
- **Ensure:** Transparent background works on homepage hero
- **Test:** Scroll transitions work smoothly

## Testing Checklist

- [ ] Homepage shows ONE navbar at all times
- [ ] Navbar is transparent with white elements at top
- [ ] Navbar transitions to white bg with black elements on scroll
- [ ] No duplicate UI elements (language/Instagram)
- [ ] Smooth transitions without flickering
- [ ] Mobile responsive behavior maintained
- [ ] Other pages (privacy, etc.) still work correctly

## Key Decision Points for astro-ux-architect

1. **Which navbar to use?** Recommend using `layout/Navbar.astro` as it's more complete
2. **Global or page-specific?** Should all pages use the same navbar?
3. **Logo versions:** Ensure both white and black logo SVGs exist at correct paths
4. **Scroll threshold:** Current is 50px in Navbar.astro, 100px in NavbarScroll
5. **Mobile behavior:** Maintain current responsive design

## Next Steps

1. Choose implementation approach (Option 1 recommended)
2. Remove duplicate hero elements from homepage
3. Implement chosen navbar consistently
4. Test across all pages and breakpoints
5. Ensure smooth scroll transitions