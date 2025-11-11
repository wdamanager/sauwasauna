# WDA-528 EPIC Context: Partners Hoteleros (B2B)

## EPIC Overview
**ID:** WDA-528
**Title:** Partners Hoteleros (B2B) - Reestructuración completa
**Objective:** Restructurar la sección B2B "Partners Hoteleros" con nueva nomenclatura, contenido actualizado y diferenciación visual clara del B2C.

## Current State Analysis

### 1. Existing Pages Structure
**Current URLs:**
- ES: `/es/acceso-exclusivo`
- CA: `/ca/acces-exclusiu`
- EN: `/en/exclusive-access`
- FR: `/fr/acces-exclusif`

**Files:**
- `astro/src/pages/es/acceso-exclusivo.astro`
- `astro/src/pages/ca/acces-exclusiu.astro`
- `astro/src/pages/en/exclusive-access.astro`
- `astro/src/pages/fr/acces-exclusif.astro`

### 2. Current Components
- `ExclusiveHero.astro` - Hero section (green background, no image currently)
- `CountryFlags.astro` - Grid of partner country flags
- `SelectionProcess.astro` - Selection criteria cards
- `PartnerApplicationForm.astro` - Partner application form
- `FlagIcon.astro` - SVG flag components

### 3. Current Content Structure
- **Hero**: Simple green background (#406E51) without full image
- **Countries**: 6 flags in grid (CH, AT, DE, SE, NO, FI)
- **Content Sections**:
  - Intro section with 50/50 layout
  - Country flags with benefits
  - Selection process requirements
  - Application form

## Required Changes (Sub-issues Breakdown)

### WDA-559: Cambiar nomenclatura "Acceso Exclusivo" → "Partners Hoteleros"
**Priority:** HIGH
**Scope:**
1. Rename all page files:
   - `acceso-exclusivo.astro` → `partners-hoteleros.astro`
   - `acces-exclusiu.astro` → `socis-hotelers.astro`
   - `exclusive-access.astro` → `hotel-partners.astro`
   - `acces-exclusif.astro` → `partenaires-hoteliers.astro`

2. Update URLs in:
   - Navigation components
   - Internal links
   - Sitemap
   - Redirects from old URLs

3. Update i18n content:
   - Page titles
   - SEO meta tags
   - Breadcrumbs

### WDA-560: Actualizar imagen Hero con nueva fotografía
**Priority:** HIGH
**Scope:**
1. Implement full-width hero image (like "Trabaja con nosotros")
2. New image: Premium hotel/spa setting with sauna
3. Maintain green overlay/tint for B2B branding
4. Update `ExclusiveHero.astro` to support background image

### WDA-561: Revisar y actualizar textos principales (3 bloques)
**Priority:** HIGH
**Scope:**
1. **Block 1 - Intro**: Update value proposition text
2. **Block 2 - Countries**: Revise tourist market description
3. **Block 3 - Selection**: Update requirements text
4. All in 4 languages (ES, CA, EN, FR)
5. Content provided by client (to be requested)

### WDA-562: Añadir banderas UK y Rusia
**Priority:** MEDIUM
**Scope:**
1. Add UK and RU flags to `FlagIcon.astro`
2. Update grid layout: 2x3 on desktop, 2x4 total
3. Add country data in `partners.ts`:
   - UK: "Reino Unido" / "High purchasing power"
   - RU: "Rusia" / "Luxury segment"
4. Test responsive grid behavior

### WDA-563: Cambiar CTA principal
**Priority:** MEDIUM
**Scope:**
1. Change all CTAs from current to:
   - ES: "SOLICITAR EVALUACIÓN"
   - CA: "SOL·LICITAR AVALUACIÓ"
   - EN: "REQUEST EVALUATION"
   - FR: "DEMANDER ÉVALUATION"
2. Update in hero and form sections
3. Ensure consistent styling

### WDA-564: Diferenciar visualmente B2B (verde) vs B2C (naranja)
**Priority:** HIGH
**Scope:**
1. Ensure all B2B elements use green palette:
   - Primary: #406E51
   - Secondary: #507360
   - Accent: #6B8E78
2. Update CSS variables for B2B context
3. Review all components for color consistency
4. Document color usage in style guide

## Implementation Plan

### Phase 1: Structure & Navigation (Day 1)
1. ✅ Create comprehensive context document
2. Rename all page files (WDA-559)
3. Update navigation and links
4. Set up redirects from old URLs
5. Test navigation in all languages

### Phase 2: Visual Updates (Day 1-2)
1. Implement hero with background image (WDA-560)
2. Apply B2B green color scheme (WDA-564)
3. Add UK and Russia flags (WDA-562)
4. Update grid layout for 8 countries

### Phase 3: Content Updates (Day 2)
1. Update all text blocks (WDA-561)
2. Change CTAs (WDA-563)
3. Review and update form labels if needed
4. Ensure translation consistency

### Phase 4: Testing & QA (Day 2-3)
1. Test all 4 language versions
2. Verify responsive behavior
3. Check all internal links
4. Validate forms
5. Performance testing
6. Accessibility review

## Technical Considerations

### CSS Architecture Compliance (WDA-531)
- Use existing CSS variables from `design-tokens.css`
- Apply global utility classes from `utilities.css`
- Minimal scoped styles only for unique patterns
- No hardcoded values or inline styles

### File Structure
```
astro/src/
├── pages/
│   ├── es/partners-hoteleros.astro (renamed)
│   ├── ca/socis-hotelers.astro (renamed)
│   ├── en/hotel-partners.astro (renamed)
│   └── fr/partenaires-hoteliers.astro (renamed)
├── components/partners/
│   ├── ExclusiveHero.astro (update for image)
│   ├── CountryFlags.astro (keep as is)
│   ├── FlagIcon.astro (add UK, RU)
│   └── SelectionProcess.astro (update text)
└── lib/i18n/
    └── partners.ts (update all content)
```

### Navigation Updates Required
1. `NavbarScroll.astro` - Update menu items
2. `FooterBlack.astro` - Update footer links
3. Any breadcrumb components
4. Mobile menu items

### SEO Considerations
- Set up 301 redirects from old URLs
- Update canonical URLs
- Maintain hreflang tags
- Update sitemap.xml
- Update meta descriptions

## Content Requirements from Client

### Needed Assets
1. **Hero Image**: High-quality image for B2B hero section
   - Minimum 1920x1080
   - Premium hotel/spa setting
   - Sauna or wellness context preferred

### Needed Content
1. **Updated Text Blocks** (3 main sections in 4 languages):
   - Introduction/Value proposition
   - Target markets description
   - Selection criteria

2. **New Country Benefits** (for UK and Russia):
   - Short benefit description for each
   - Translated to all 4 languages

## Risk Mitigation

### Potential Issues
1. **URL Changes**: Risk of broken links
   - Solution: Comprehensive redirect mapping
   - Testing: Check all internal links

2. **Color Consistency**: B2B/B2C confusion
   - Solution: Clear documentation of color usage
   - Testing: Visual regression testing

3. **Mobile Layout**: 8 flags grid complexity
   - Solution: Test multiple viewport sizes
   - Consider 2x4 layout on mobile

## Success Criteria
- ✅ All pages renamed and accessible at new URLs
- ✅ Old URLs redirect properly (301)
- ✅ Hero shows new background image
- ✅ 8 country flags displayed correctly
- ✅ All CTAs show "SOLICITAR EVALUACIÓN" (localized)
- ✅ Green B2B branding consistent throughout
- ✅ All 4 language versions working
- ✅ Mobile responsive behavior validated
- ✅ No broken links or missing assets
- ✅ Forms submit successfully

## Dependencies
- Client to provide hero image
- Client to confirm new text content
- Client to approve UK/Russia addition
- Design approval for green color scheme

## Timeline Estimate
- **Day 1**: Structure, navigation, initial visual updates
- **Day 2**: Content updates, remaining visual changes
- **Day 3**: Testing, QA, deployment prep
- **Total**: 3 days development + client review

## Notes
- Similar to WDA-527 (Trabaja con nosotros) but for B2B
- Maintain consistency with recent hero implementation
- Follow CSS architecture guidelines strictly (WDA-531)
- Ensure clear B2B vs B2C differentiation

## Linear Sub-Issues Reference
- WDA-559: Nomenclatura change
- WDA-560: Hero image update
- WDA-561: Text content revision
- WDA-562: Add UK/Russia flags
- WDA-563: CTA change
- WDA-564: B2B visual differentiation

---
**Last Updated**: 2025-11-09
**Status**: Ready for implementation
**Blocked By**: Client assets (hero image, content)