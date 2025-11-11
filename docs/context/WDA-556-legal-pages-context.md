# WDA-556: Context Document - Integrar Páginas Legales Dinámicas

## Executive Summary

**Task**: Integrate dynamic legal pages (Aviso Legal, Cookies, Privacy) from WordPress CMS via GraphQL with multi-language support using Polylang.

**Priority**: Medium
**Estimated Time**: 5-6 hours
**Status**: Todo

**Core Objective**: Create legal pages that dynamically load content from WordPress (managed by client), supporting all 4 languages (ES, CA, EN, FR) through Polylang integration.

## System Architecture Overview

### Current Stack
```
Frontend (Astro SSG)           Backend (WordPress Headless)
┌─────────────────────┐       ┌──────────────────────────┐
│  Static HTML/CSS/JS │──────>│  WPGraphQL Endpoint      │
│  Client-side fetch  │       │  /graphql                │
│  4 Languages        │       │  Polylang Plugin         │
│  (ES/CA/EN/FR)     │       │  Legal Pages (Posts)     │
└─────────────────────┘       └──────────────────────────┘
         │                              │
         └──────── HTTPS Fetch ─────────┘
```

### GraphQL Integration Status
- **Endpoint**: https://backend.sauwasauna.com/graphql
- **Client**: `/astro/src/lib/graphql.ts` - Fetch-based implementation
- **Current Queries**: Posts (blog), no page queries yet
- **Polylang**: Not yet integrated in GraphQL queries

## File Structure Analysis

### Existing Relevant Files
```
astro/
├── src/
│   ├── lib/
│   │   └── graphql.ts         # GraphQL client (needs extension for pages)
│   ├── i18n/
│   │   ├── ui.ts             # Translation strings (has footer.legal.* keys)
│   │   └── utils.ts          # Language utilities
│   ├── pages/
│   │   └── [lang]/           # Dynamic language routes (to be created)
│   └── styles/               # CSS architecture (follow strict rules)
└── astro.config.mjs          # i18n configuration ready
```

## Legal Pages Information

### WordPress Content IDs
| Page | Post ID | Spanish Title |
|------|---------|---------------|
| Aviso Legal | 94 | Aviso Legal |
| Política de Cookies | 96 | Política de Cookies |
| Política de Privacidad | 3 | Política de Privacidad |

### URL Structure Required
```
/es/aviso-legal/
/ca/avis-legal/
/en/legal-notice/
/fr/mentions-legales/

/es/politica-cookies/
/ca/politica-cookies/
/en/cookie-policy/
/fr/politique-cookies/

/es/politica-privacidad/
/ca/politica-privacitat/
/en/privacy-policy/
/fr/politique-confidentialite/
```

## Critical Dependencies & Gaps

### 1. GraphQL Query for Pages with Polylang
**GAP**: No existing query for pages with language support
**NEED**: Create GraphQL query that:
- Fetches page by ID
- Includes Polylang translation data
- Returns content for specific language

### 2. Language Detection Utility
**EXISTS**: Basic i18n utils in `/astro/src/i18n/utils.ts`
**GAP**: No client-side language detection from URL
**NEED**: Enhance to work client-side for dynamic content

### 3. Dynamic Page Routes
**GAP**: No legal pages exist
**NEED**: Create pages under `/astro/src/pages/[lang]/`:
- `aviso-legal.astro` → Legal Notice
- `politica-cookies.astro` → Cookie Policy
- `politica-privacidad.astro` → Privacy Policy

### 4. Footer Links Update
**EXISTS**: Translation keys in `ui.ts` for footer legal links
**GAP**: Footer component not found in expected location
**NEED**: Locate and update footer component with proper links

## Implementation Strategy

### Phase 1: GraphQL Enhancement (1.5 hours)
1. **Extend `/astro/src/lib/graphql.ts`**:
   ```typescript
   // Add function to fetch page by ID with language
   export async function getPageByIdWithLanguage(id: number, lang: string) {
     const query = `
       query GetPageWithTranslation($id: ID!, $language: LanguageCodeEnum!) {
         page(id: $id, idType: DATABASE_ID) {
           translation(language: $language) {
             id
             title
             content
             slug
             language {
               code
               locale
             }
           }
         }
       }
     `;
     // Implementation
   }
   ```

2. **Test Polylang Integration**:
   - Verify WPGraphQL for Polylang is installed
   - Test language queries in GraphQL playground

### Phase 2: Language Utilities (1 hour)
1. **Create client-side language detection**:
   ```typescript
   // /astro/src/lib/language-client.ts
   export function getCurrentLanguage(): string {
     const path = window.location.pathname;
     const [, lang] = path.split('/');
     return ['es', 'ca', 'en', 'fr'].includes(lang) ? lang : 'es';
   }
   ```

2. **Add Polylang language code mapping**:
   ```typescript
   const polylangCodes = {
     'es': 'ES',
     'ca': 'CA',
     'en': 'EN',
     'fr': 'FR'
   };
   ```

### Phase 3: Create Legal Pages (2.5 hours)
1. **Create base legal page component**:
   - Location: `/astro/src/components/LegalPageTemplate.astro`
   - Responsibilities:
     - Fetch content on mount (client-side)
     - Display loading state
     - Render HTML content safely
     - Handle errors

2. **Create individual pages**:
   ```
   /astro/src/pages/[lang]/aviso-legal.astro
   /astro/src/pages/[lang]/politica-cookies.astro
   /astro/src/pages/[lang]/politica-privacidad.astro
   ```

### Phase 4: Update Footer (0.5 hours)
1. **Locate footer component** (check `/astro/src/components/`)
2. **Update with proper multiidioma links**:
   ```astro
   <a href={`/${lang}/aviso-legal/`}>{t('footer.legal.terms')}</a>
   <a href={`/${lang}/politica-cookies/`}>{t('footer.legal.cookies')}</a>
   <a href={`/${lang}/politica-privacidad/`}>{t('footer.legal.privacy')}</a>
   ```

### Phase 5: Testing & Validation (0.5 hours)
1. Test all 4 languages for each page
2. Verify content loads correctly
3. Check SEO meta tags
4. Validate links in footer
5. Performance audit (loading time)

## Risk Assessment

### High Priority Risks
1. **Polylang WPGraphQL Plugin Not Installed**
   - **Impact**: Cannot fetch translations
   - **Mitigation**: Verify with wordpress-headless-expert first
   - **Fallback**: Fetch all translations and filter client-side

2. **Performance Issues with Client-Side Loading**
   - **Impact**: Poor UX, SEO impact
   - **Mitigation**: Implement proper loading states, consider caching
   - **Fallback**: Pre-render critical content

### Medium Priority Risks
1. **CSS Architecture Violations**
   - **Impact**: Code review rejection
   - **Mitigation**: Strictly follow `/docs/architecture/css-architecture.md`
   - **Use**: Only global classes, CSS variables

2. **URL Structure Mismatch**
   - **Impact**: Broken links, poor SEO
   - **Mitigation**: Coordinate slug structure with CMS team

## Implementation Checklist

### Pre-Implementation
- [ ] Verify Polylang WPGraphQL plugin is active
- [ ] Test GraphQL queries in playground
- [ ] Confirm page IDs are correct (94, 96, 3)
- [ ] Review CSS architecture documentation
- [ ] Locate footer component

### During Implementation
- [ ] Follow CSS rules (NO inline styles, USE variables)
- [ ] Test each language as you go
- [ ] Use TypeScript for type safety
- [ ] Implement error handling
- [ ] Add loading states

### Post-Implementation
- [ ] Test all 12 page/language combinations
- [ ] Verify footer links work
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit
- [ ] Update documentation

## Code Examples & Patterns

### Legal Page Component Pattern
```astro
---
// /astro/src/pages/[lang]/aviso-legal.astro
import Layout from '@layouts/Layout.astro';
import LegalPageTemplate from '@components/LegalPageTemplate.astro';
import { getLangFromUrl } from '@i18n/utils';

const lang = getLangFromUrl(Astro.url);
const pageId = 94; // Aviso Legal ID
---

<Layout title="Aviso Legal">
  <LegalPageTemplate pageId={pageId} lang={lang} />
</Layout>
```

### Client-Side Content Fetching
```typescript
// In LegalPageTemplate component
<script>
  import { getPageByIdWithLanguage } from '@lib/graphql';

  const pageId = document.querySelector('[data-page-id]').dataset.pageId;
  const lang = window.location.pathname.split('/')[1];

  async function loadContent() {
    try {
      const content = await getPageByIdWithLanguage(pageId, lang);
      document.querySelector('.legal-content').innerHTML = content.content;
    } catch (error) {
      console.error('Error loading legal content:', error);
    }
  }

  loadContent();
</script>
```

### CSS Implementation (Following Architecture)
```css
/* Use ONLY global classes and variables */
.legal-page {
  /* From utilities.css */
  @apply section;
}

.legal-page__content {
  /* From design-tokens.css */
  color: var(--color-text-primary);
  font-size: var(--font-scale-base);
  line-height: 1.7;
}
```

## Success Criteria

1. **Functional Requirements**
   - All 3 legal pages load content from WordPress
   - Content displays correctly in all 4 languages
   - Footer links navigate to correct pages
   - Loading states provide good UX

2. **Technical Requirements**
   - Zero CSS architecture violations
   - TypeScript types properly defined
   - Error handling implemented
   - Performance metrics met (<2s load time)

3. **Quality Metrics**
   - Lighthouse score maintained (90+)
   - No console errors
   - Accessibility standards met (WCAG 2.1 AA)
   - Mobile-first responsive design

## Next Steps for Agents

### For wordpress-headless-expert
1. Verify Polylang WPGraphQL plugin status
2. Create/test GraphQL queries for pages with translations
3. Ensure page IDs are correct and accessible

### For astro-ux-architect
1. Implement legal page components following CSS architecture
2. Create dynamic routes with proper language handling
3. Update footer with multiidioma links
4. Ensure mobile responsiveness

### For docops-engineer
1. Document new GraphQL queries
2. Update component documentation
3. Add legal pages to site map

## Resources & References

- **CSS Architecture**: `/docs/architecture/css-architecture.md`
- **i18n Configuration**: `/astro/astro.config.mjs`
- **GraphQL Client**: `/astro/src/lib/graphql.ts`
- **Translation Strings**: `/astro/src/i18n/ui.ts`
- **WordPress Backend**: https://backend.sauwasauna.com/
- **Linear Task**: WDA-556

---

**Document Version**: 1.0.0
**Created**: 2025-11-10
**Author**: Context Management Agent
**Status**: Ready for Implementation