# Newsletter Forms Analysis - SAUWA Landing

## Current Implementation Status

### 1. Hero Section Form
**Location**: `C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\astro\src\pages\es\index.astro` (lines 62-86)
**Design**: Minimal, transparent overlay on hero slider
- **Fields**: Email only + privacy checkbox
- **Styling**: Dark transparent bg, white text, full-width button
- **Classes**: Applied via `global.css` (lines 137-173)

### 2. CTA Newsletter Section Form
**Location**: `C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\astro\src\components\CTANewsletter.astro`
**Design**: Prominent section with gray background (#f4f4f4)
- **Fields**: Name, Email, privacy checkbox (3 separate rows)
- **Styling**: White inputs, red CTA button, black text
- **Classes**: Component-scoped styles

## Design Differences

| Aspect | Hero Form | CTA Section |
|--------|-----------|-------------|
| Background | Transparent overlay | Gray (#f4f4f4) |
| Fields | Email only | Name + Email |
| Layout | Single column compact | Multi-row expanded |
| Button Text | "AVISADME" | "APUNTARME" |
| Text Color | White | Black |
| Input Style | Transparent with border | Solid white bg |

## Common Functionality
- GraphQL mutation to backend (WPGraphQL Universal Contact plugin ready)
- Privacy checkbox with policy link
- Form validation (email regex, required fields)
- Success/error messaging
- Analytics tracking (gtag events)
- Multilingual support (ES/CA/EN/FR)

## Recommended Component Structure

```
NewsletterForm.astro
├── Props: variant ('hero' | 'cta'), locale
├── Conditional rendering based on variant
├── Shared validation/submission logic
└── Variant-specific styles via CSS classes
```

**Implementation Strategy**:
1. Create unified `NewsletterForm.astro` component
2. Use `variant` prop to switch between designs
3. Extract shared TypeScript controller class
4. Maintain existing visual designs completely
5. Connect to WordPress GraphQL endpoint

## Linear Task Mapping
**WDA-99**: "Integrar formulario newsletter en landing" - Covers both form locations as single integration task with backend.

**Next Step**: Build reusable component preserving both distinct designs while unifying backend integration.