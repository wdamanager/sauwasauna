# SAUWA Astro Frontend Architecture Analysis
**Date**: 2025-12-07
**Scope**: Partner/Session Dynamic Routes & Multi-language Support
**Project Path**: `C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\astro`

---

## Executive Summary

The SAUWA Astro frontend has **partial implementation** of dynamic routes for partners and sessions. The foundation is solid, but several critical features are **missing or incomplete**.

### Current State: 🟡 PARTIALLY IMPLEMENTED

**What's Working**:
- ✅ Dynamic routes structure exists (`[locale]/[partnerSlug]/[sessionSlug]`)
- ✅ GraphQL queries for sessions and partners are complete
- ✅ Multi-language fallback system (ES → CA/EN/FR)
- ✅ Static path generation with `getAllSessions()`
- ✅ Components (SessionHero, BookingWidget) are reusable
- ✅ SEO optimizations (hreflang, Open Graph)

**What's Missing/Broken**:
- ❌ Session type handling (single/pack/voucher/private) not integrated
- ❌ Dynamic content not using localized WordPress fields
- ❌ Hardcoded i18n content instead of WordPress CMS
- ❌ No session type-specific UI variations
- ❌ About section uses static content, not WordPress description fields

---

## Architecture Deep Dive

### 1. Route Structure

#### Current Implementation

```
src/pages/
├── [locale]/
│   ├── [partnerSlug]/
│   │   ├── index.astro                    # Partner detail page ✅
│   │   └── [sessionSlug]/
│   │       └── index.astro                # Session detail page ✅
│   └── puertas-abiertas.astro             # Hardcoded page (to deprecate)
```

**Status**: ✅ **Structure is correct**

#### Analysis

**Partner Page** (`[locale]/[partnerSlug]/index.astro`):
- **Works**: Fetches partner data, displays sessions list, multi-language support
- **Route**: `/es/hotel-coma-bella/`
- **Data Source**: `getAllSessions()` → groups by partner
- **Components**: `PartnerHero`, session cards with correct links

**Session Page** (`[locale]/[partnerSlug]/[sessionSlug]/index.astro`):
- **Works**: Fetches session by ID, displays hero + booking widget
- **Route**: `/es/hotel-coma-bella/jornadas-de-puertas-abiertas-sauwa/`
- **Issue**: Uses hardcoded `getBookingContent()` instead of WordPress fields

---

### 2. Data Fetching Layer

#### GraphQL Queries (`src/lib/sessions-queries.ts`)

**Status**: ✅ **Complete and well-structured**

```typescript
// Main queries
GET_ALL_SESSIONS_QUERY         // For getStaticPaths
GET_SESSION_BY_ID_QUERY        // For session details
GET_SESSION_BY_ID_REALTIME_QUERY // For client-side updates
```

**What's Included**:
- ✅ Multi-language fields (tituloCa, tituloEn, tituloFr, etc.)
- ✅ Partner relationship (address, phone, email, web, images)
- ✅ Session details (duration, capacity, price)
- ✅ Featured images with alt text
- ✅ SEO fields (Yoast)
- ✅ Translations array (slug per language)

**What's MISSING**:
- ❌ `sessionType` field (single/pack/voucher/private)
- ❌ `includedPersons` field (for packs/vouchers)
- ❌ `usesSharedCapacity` field
- ❌ `requiresFullCapacity` field
- ❌ `baseSession` relationship (for packs/vouchers)

**Critical Gap**: The queries in `sessions-queries.ts` don't match the extended schema defined in `booking/types.ts` (lines 114-130).

---

### 3. Multi-language Implementation

#### Status: 🟡 **Partially Working**

**Fallback System** (`src/lib/i18n/fallback.ts`):
- ✅ Centralized `getLocalizedValue()` function
- ✅ Automatic fallback to Spanish (ES) when field is empty
- ✅ Supports ES, CA, EN, FR

**Session Localization** (`src/lib/i18n/sessions.ts`):
- ✅ `getLocalizedSession()` extracts title, subtitle, description
- ✅ Maps ACF fields correctly:
  - ES: `title`, `subtitulo`, `content`
  - CA: `tituloCa`, `subtituloCa`, `sessionDescriptionCa`
  - EN: `tituloEn`, `sessionSubtitleEn`, `sessionDescriptionEn`
  - FR: `tituloFr`, `subtituloFr`, `sessionDescriptionFr`

**Issue**: Dynamic session page (`[sessionSlug]/index.astro`) **DOES NOT USE** this system!

```typescript
// ❌ Current implementation (line 79)
const content = getBookingContent(locale as Locale, 'puertasAbiertas');

// ✅ Should be using
const localizedSession = getLocalizedSession(session, locale);
```

---

### 4. Session Type Handling

#### Status: ❌ **NOT IMPLEMENTED in dynamic routes**

**Where it's defined**:
- `src/lib/booking/types.ts` (lines 14-24): SessionType definition
- `src/lib/booking/queries.ts` (lines 19-39): GET_SESSION_TYPE query

**Where it's missing**:
- `src/lib/sessions-queries.ts`: No sessionType in queries
- `[sessionSlug]/index.astro`: No conditional rendering based on type

**Expected Behavior** (per WDA-974):

| Session Type | Booking Flow                          | UI Variations                      |
|--------------|---------------------------------------|------------------------------------|
| `single`     | Standard booking with quantity selector | Show capacity, price per person   |
| `pack`       | Pre-paid pack with fixed entries     | Show "X sessions included"         |
| `voucher`    | Gift voucher (no calendar)            | Hide calendar, show voucher form   |
| `private`    | Private session (full capacity)       | Hide quantity, "Book entire space" |

**Current State**: All sessions render as "single" type by default.

---

### 5. Content Management Strategy

#### Problem: Static vs Dynamic Content

**Hardcoded Page** (`puertas-abiertas.astro`):
```typescript
// Static content from i18n file
const content = getBookingContent(locale, 'puertasAbiertas');

// About section uses hardcoded arrays
content.about.description // ["Para 1", "Para 2"]
content.about.highlights  // ["Item 1", "Item 2"]
```

**Dynamic Page** (`[sessionSlug]/index.astro`):
```typescript
// ❌ Still using hardcoded content!
const content = getBookingContent(locale as Locale, 'puertasAbiertas');

// ✅ Should be using WordPress fields
const localizedSession = getLocalizedSession(session, locale);
// localizedSession.title
// localizedSession.subtitle
// localizedSession.description (HTML with <p> and <ul>)
```

**Client-side Hydration** (`puertas-abiertas.astro` lines 324-472):
- ✅ **Good pattern**: Fetches fresh WordPress data on page load
- ✅ Updates hero title/subtitle dynamically
- ✅ Parses WordPress HTML content for about section
- ✅ Extracts paragraphs and list items from HTML

**Gap**: This hydration logic is only in the hardcoded page, not in dynamic routes.

---

## Missing Components Analysis

### 1. Session Type UI Components

**What exists**:
- `SessionHero.astro` - Generic hero, works for all types
- `BookingWidget.astro` - Handles booking flow, but no type detection

**What's missing**:
- `SessionTypeIndicator.astro` - Badge showing "Pack", "Voucher", "Private"
- Type-specific booking widget variants:
  - `BookingWidgetSingle.astro`
  - `BookingWidgetPack.astro`
  - `BookingWidgetVoucher.astro`
  - `BookingWidgetPrivate.astro`

### 2. Dynamic Content Parsing

**What exists**:
- Hardcoded parsing in `puertas-abiertas.astro` (lines 337-359)

**What's missing**:
- `src/lib/utils/parseSessionContent.ts` - Reusable HTML parser
- `src/components/booking/SessionAbout.astro` - About section component

### 3. Session Grid/List Views

**What exists**:
- Partner page has inline session cards (lines 308-378)

**What's missing**:
- `src/components/sessions/SessionCard.astro` - Reusable session card
  - **NOTE**: File exists but check if it matches partner page requirements
- `src/components/sessions/SessionGrid.astro` - Grid layout component
  - **NOTE**: File exists but check if it's being used

---

## GraphQL Schema Gaps

### Current Schema (sessions-queries.ts)

```graphql
query GetAllSessions {
  sessions(first: 1000, where: { status: PUBLISH }) {
    nodes {
      id
      databaseId
      slug
      title
      sessionDetails {
        sessionDuration
        sessionCapacity
        sessionPrice
        # Multi-language fields ✅
        subtitulo
        tituloCa, subtituloCa
        tituloEn, sessionSubtitleEn
        tituloFr, subtituloFr
        # Partner ✅
        partner { node { ... } }
      }
      featuredImage { ... }
      translations { ... }
    }
  }
}
```

### Missing Fields (from booking/types.ts)

```graphql
sessionDetails {
  # ❌ Missing from queries
  sessionType              # 'single' | 'pack' | 'voucher' | 'private'
  includedPersons          # Number of persons for packs/vouchers
  usesSharedCapacity       # Boolean
  requiresFullCapacity     # Boolean for private sessions
  baseSession {            # Reference to base session for packs/vouchers
    node {
      ... on SaunaSession {
        databaseId
        title
      }
    }
  }
}
```

**Impact**: Without these fields, session type logic cannot work.

---

## Recommendations & Linear Tasks

### Priority 1: Critical (Blocks functionality)

#### Task 1: Extend GraphQL Queries with Session Type Fields
**Title**: Add sessionType fields to sessions-queries.ts
**Description**:
```
Update GET_ALL_SESSIONS_QUERY and GET_SESSION_BY_ID_QUERY to include:
- sessionType (single/pack/voucher/private)
- includedPersons
- usesSharedCapacity
- requiresFullCapacity
- baseSession relationship

This enables type-specific booking flows per WDA-974.

Files to modify:
- src/lib/sessions-queries.ts (add fields to queries)
- src/lib/sessions-queries.ts (update transformWPSession function)

Acceptance Criteria:
- getAllSessions() returns sessionType for each session
- getSessionById() returns all extended fields
- TypeScript types match actual GraphQL response
```

#### Task 2: Replace Hardcoded Content with WordPress CMS
**Title**: Use WordPress localized fields in dynamic session pages
**Description**:
```
Replace getBookingContent() with getLocalizedSession() in:
- [sessionSlug]/index.astro

Changes:
- Hero section: Use localizedSession.title, localizedSession.subtitle
- About section: Parse localizedSession.description (HTML)
- Remove dependency on src/lib/i18n/booking.ts for session content

Keep getBookingContent() only for static UI labels (buttons, forms).

Files to modify:
- src/pages/[locale]/[partnerSlug]/[sessionSlug]/index.astro

Acceptance Criteria:
- Session title/subtitle come from WordPress ACF fields
- Content updates in WordPress appear on frontend without rebuild
- Spanish fallback works when translation is empty
```

#### Task 3: Implement Session Type Conditional Rendering
**Title**: Add session type detection and UI variations
**Description**:
```
Add logic to detect sessionType and render appropriate UI:

1. Fetch sessionType in getStaticPaths
2. Pass sessionType to page props
3. Conditional rendering:
   - Single: Standard booking widget
   - Pack: Show "X sessions included" badge
   - Voucher: Hide calendar, show voucher redemption form
   - Private: Show "Book entire space" CTA

Files to create:
- src/components/booking/SessionTypeBadge.astro
- src/components/booking/VoucherRedemptionForm.astro

Files to modify:
- src/pages/[locale]/[partnerSlug]/[sessionSlug]/index.astro
- src/components/booking/BookingWidget.astro

Acceptance Criteria:
- Each session type shows correct UI elements
- Voucher sessions don't show calendar
- Private sessions don't show quantity selector
```

---

### Priority 2: Important (Improves UX)

#### Task 4: Create Reusable SessionAbout Component
**Title**: Extract session about section into reusable component
**Description**:
```
Create SessionAbout.astro that:
- Accepts localizedSession.description (HTML string)
- Parses paragraphs and list items
- Renders with proper styling
- Handles empty content gracefully

Extract parsing logic from puertas-abiertas.astro (lines 337-359)
into src/lib/utils/parseSessionContent.ts

Files to create:
- src/components/booking/SessionAbout.astro
- src/lib/utils/parseSessionContent.ts

Files to modify:
- src/pages/[locale]/[partnerSlug]/[sessionSlug]/index.astro
- src/pages/es/puertas-abiertas.astro (use new component)

Acceptance Criteria:
- DRY principle: No duplicated parsing logic
- Component works with any HTML structure
- Handles edge cases (empty content, no lists)
```

#### Task 5: Migrate Hardcoded Page to Dynamic Route
**Title**: Deprecate puertas-abiertas.astro and use dynamic route
**Description**:
```
Steps:
1. Ensure session ID 167 works perfectly with dynamic route
2. Create redirect from /es/puertas-abiertas to dynamic URL
3. Update internal links to use /${locale}/${partnerSlug}/${sessionSlug}
4. Add deprecation warning to puertas-abiertas.astro
5. Schedule for removal after 2 weeks

Files to modify:
- src/pages/es/puertas-abiertas.astro (add deprecation notice)
- Create src/pages/es/puertas-abiertas-redirect.astro

Acceptance Criteria:
- Session 167 accessible via /es/hotel-coma-bella/jornadas-puertas-abiertas
- Old URL redirects with 301 status
- No broken links in production
```

---

### Priority 3: Enhancement (Polish)

#### Task 6: Add Session Type Filters to Partner Page
**Title**: Filter sessions by type on partner detail pages
**Description**:
```
Add filter pills on partner page to filter sessions by type:
- All
- Sessions (single)
- Packs
- Vouchers
- Private

Uses client-side filtering (no page reload).

Files to create:
- src/components/sessions/SessionTypeFilter.astro

Files to modify:
- src/pages/[locale]/[partnerSlug]/index.astro

Acceptance Criteria:
- Filter persists in URL query param (?type=pack)
- Smooth transitions between filters
- Accessible (keyboard navigation)
```

#### Task 7: Implement Client-side Content Hydration
**Title**: Add client-side hydration to dynamic session pages
**Description**:
```
Port hydration logic from puertas-abiertas.astro to dynamic route:
- Fetch fresh session data on page load
- Update hero title/subtitle
- Update about section paragraphs/highlights

Benefits:
- Content updates appear without rebuild
- SSG fallback ensures SEO/performance
- Fresh data on every visit

Files to modify:
- src/pages/[locale]/[partnerSlug]/[sessionSlug]/index.astro

Acceptance Criteria:
- Initial render uses SSG data (fast)
- Client-side fetch updates content if changed
- Graceful degradation if fetch fails
```

---

## Testing Strategy

### Unit Tests
- `parseSessionContent()` - Test HTML parsing edge cases
- `getLocalizedSession()` - Test fallback logic
- `transformWPSession()` - Test GraphQL response mapping

### Integration Tests
- `getAllSessions()` - Test query execution and caching
- Dynamic routes - Test all 4 locales × all sessions

### E2E Tests (Playwright)
1. Navigate to partner page → verify sessions listed
2. Click session → verify correct detail page
3. Change language → verify content updates
4. Test session types:
   - Single: Calendar + quantity selector visible
   - Voucher: Voucher form visible, calendar hidden
   - Private: "Book entire space" CTA visible

---

## Migration Checklist

### Phase 1: Foundation (Week 1)
- [ ] Add sessionType fields to GraphQL queries
- [ ] Update TypeScript types to match queries
- [ ] Test queries return all expected fields

### Phase 2: Dynamic Content (Week 1-2)
- [ ] Replace hardcoded content with WordPress CMS
- [ ] Create SessionAbout component
- [ ] Create parseSessionContent utility
- [ ] Test multi-language fallback works

### Phase 3: Session Types (Week 2)
- [ ] Implement session type detection
- [ ] Create type-specific UI components
- [ ] Add conditional rendering logic
- [ ] Test all 4 session types render correctly

### Phase 4: Polish (Week 3)
- [ ] Add session type filters to partner pages
- [ ] Implement client-side hydration
- [ ] Migrate hardcoded page to dynamic route
- [ ] Run full E2E test suite

---

## Technical Debt

### Current Issues
1. **Content duplication**: Same parsing logic in 2 places
2. **Type safety**: GraphQL queries don't match TypeScript types
3. **Hardcoded content**: Using i18n files instead of CMS
4. **Missing abstraction**: Session type logic not encapsulated

### Proposed Solutions
1. Create reusable components and utilities
2. Generate TypeScript types from GraphQL schema
3. Use WordPress CMS as single source of truth
4. Create SessionTypeHandler utility class

---

## Performance Considerations

### Current Optimizations ✅
- Static path generation (SSG)
- 5-minute GraphQL cache
- Lazy loading images
- Optimized featured images

### Future Improvements
- [ ] Incremental Static Regeneration (ISR)
- [ ] CDN caching for session pages
- [ ] Preload critical session data
- [ ] Service worker for offline fallback

---

## Conclusion

The SAUWA Astro frontend has a **solid foundation** but requires **focused development** to unlock full functionality:

1. **Immediate Action**: Add sessionType fields to GraphQL queries
2. **Quick Win**: Replace hardcoded content with WordPress CMS
3. **Strategic**: Implement session type-specific UIs
4. **Long-term**: Migrate all hardcoded pages to dynamic routes

**Estimated Effort**: 2-3 weeks for full implementation
**ROI**: Enables WordPress team to manage all content without code changes

---

**Next Steps**:
1. Review this analysis with development team
2. Create Linear epics for each priority level
3. Break down tasks into actionable subtasks
4. Assign owners and set deadlines
