# SAUWA Project Context Briefing for Astro UX Architect

## 🎯 Current Tasks

### WDA-272: Crear componente de mapa interactivo con Mapbox
- Integrate Mapbox for showing SAUWA locations
- Interactive markers with location details
- Mobile-responsive design

### WDA-271: Aplicar correcciones críticas a los componentes existentes
- Fix section headers across all components
- Apply design system standards
- Ensure consistency with the established patterns

## 🚨 CRITICAL DESIGN STANDARDS (MANDATORY)

### ⚠️ Section Headers Pattern - MUST FOLLOW

**ALL section components (except Hero) MUST use this exact H2+H3 pattern:**

```html
<!-- ALWAYS use this exact pattern -->
<h2 class="seo-title">Keywords SEO en español</h2>
<h3 class="main-heading">Título Principal Visual</h3>
```

**Required CSS (DO NOT MODIFY):**

```css
.seo-title {
  font-family: 'Helvetica Neue', 'Inter', sans-serif;
  font-size: 1rem;           /* EXACT: 16px */
  font-weight: 300;          /* EXACT: Light */
  letter-spacing: 0.05em;    /* EXACT: 0.05em */
  text-transform: uppercase; /* ALWAYS uppercase */
  color: #DB4529;           /* EXACT: Sauwa Orange */
  margin: 0 0 1rem;         /* EXACT: 1rem bottom */
}

.main-heading {
  font-family: 'Helvetica Neue', 'Inter', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.25rem); /* RESPONSIVE */
  font-weight: 200;          /* EXACT: Thin */
  line-height: 1.3;         /* EXACT: 1.3 */
  color: #1a1a1a;          /* EXACT: Almost black */
  margin: 0 0 1.5rem;      /* EXACT: 1.5rem bottom */
}
```

### 🎨 Design System Core

#### Brand Colors (EXACT VALUES)
```css
--sauwa-red: #BA2515;      /* Primary CTA */
--sauwa-orange: #DB4529;   /* Hover states, accents */
--sauwa-green: #406E51;    /* Secondary CTAs */
--sauwa-brown: #897162;    /* Tertiary elements */
--sauwa-brown-warm: #887161; /* Section backgrounds - ALWAYS use white text */
--sauwa-gray: #636464;     /* Neutral text */
```

#### ⚠️ Critical Color Rule
**When using `#887161` (warm brown) as background:**
- ALL text MUST be white (#FFFFFF)
- No exceptions - this ensures WCAG AA compliance

#### Typography System
- **Primary Font:** Helvetica Neue (weights: 100, 200, 300)
- **Secondary Font:** Avenir Next (weights: 200, 300, 400)
- **Body text minimum:** 16px / 0.95rem
- **Line height body:** 1.6-1.7
- **Ultra-light aesthetic:** Never use font-weight above 400

#### Spacing Scale (8px grid)
```css
--space-2: 0.5rem;   /* 8px - Compact */
--space-4: 1rem;     /* 16px - Default */
--space-6: 1.5rem;   /* 24px - Section spacing */
--space-8: 2rem;     /* 32px - Group separation */
--space-12: 3rem;    /* 48px - Hero spacing */
--space-16: 4rem;    /* 64px - Page sections */
--space-20: 5rem;    /* 80px - Large sections */
```

## 🏗 Technical Stack & Constraints

### Environment
- **Frontend:** Astro (SSG) + TypeScript
- **Styling:** Tailwind CSS (core utilities only, no JIT)
- **Backend:** WordPress Headless + WPGraphQL
- **Deployment:** Static hosting (no Node.js runtime)
- **Languages:** ES, CA, EN, FR (multilingue)

### Development Rules
- **File naming:** kebab-case for files, PascalCase for components
- **Indentation:** 2 spaces (no tabs)
- **GraphQL:** Use native fetch (no Apollo/urql)
- **Git:** Conventional commits (feat:, fix:, docs:, etc.)
- **Comments:** Only when they add value

### File Structure
```
src/
  components/     # Reusable components
  layouts/        # Base layouts
  pages/          # Routes/pages
  styles/         # Global CSS
  lib/            # Utilities
```

## ❌ Components Requiring Fixes (WDA-271)

### SessionPhases.astro
**Issues:** 6 CSS properties incorrect in H2 styling
- Wrong class: `.phase-title` instead of `.seo-title`
- Font-size: 1.25rem → 1rem
- Font-weight: 500 → 300
- Letter-spacing: 0.08em → 0.05em
- Text-transform: none → uppercase
- Color: #BA2515 → #DB4529
- Margin: 0 0 0.5rem → 0 0 1rem

### CTANewsletter.astro
**Issues:** Wrong font family and 6 CSS properties
- Font-family: Avenir Next → Helvetica Neue
- Font-size: 1.125rem → 1rem
- Font-weight: 400 → 300
- Text-transform: none → uppercase
- Color: #406E51 → #DB4529
- Margin: 0 0 0.75rem → 0 0 1rem

### ExperienceSection.astro
**Issues:** Complete restructuring needed
- Missing H2+H3 pattern (only has single H2)
- Needs full HTML and CSS rewrite

## ✅ Reference Implementation

**BenefitsImageSection.astro** - This component has PERFECT implementation of all standards. Use as reference.

## 🎯 Design Principles

1. **Ultra-Light Aesthetic**
   - Thin typography weights (100-300)
   - Subtle shadows and effects
   - Generous white space
   - Minimal visual noise

2. **Nordic Minimalism**
   - Clean, functional design
   - Natural color palette
   - Focus on content
   - Purposeful animations

3. **Premium Experience**
   - Smooth transitions (0.3s ease)
   - High-quality imagery
   - Refined interactions
   - Attention to detail

4. **Accessibility First**
   - WCAG 2.1 AA compliance
   - Minimum contrast 4.5:1
   - Touch targets 44x44px minimum
   - Keyboard navigation support

## 📋 Implementation Checklist

For every component, verify:

### Structure
- [ ] Uses H2+H3 pattern for section headers
- [ ] H2 has class `.seo-title`
- [ ] H3 has class `.main-heading`
- [ ] No heading level skips

### Styling
- [ ] Font families match design system
- [ ] Font weights ≤ 400
- [ ] Colors use exact hex values
- [ ] Spacing follows 8px grid

### Responsive
- [ ] Mobile-first approach
- [ ] Clamp() for fluid typography
- [ ] Touch-friendly on mobile
- [ ] Tests pass at all breakpoints

### Performance
- [ ] Lighthouse score 90+
- [ ] Images optimized
- [ ] CSS minimized
- [ ] No runtime JS unless necessary

## 🚀 Quick Start for New Components

```astro
---
// NewSection.astro
interface Props {
  seoTitle: string;
  mainTitle: string;
}

const { seoTitle, mainTitle } = Astro.props;
---

<section class="section">
  <div class="container">
    <h2 class="seo-title">{seoTitle}</h2>
    <h3 class="main-heading">{mainTitle}</h3>
    <!-- Content here -->
  </div>
</section>

<style>
  .section {
    padding: 5rem 0;
    background: #FFFFFF;
  }

  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .seo-title {
    font-family: 'Helvetica Neue', 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #DB4529;
    margin: 0 0 1rem;
  }

  .main-heading {
    font-family: 'Helvetica Neue', 'Inter', sans-serif;
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 200;
    line-height: 1.3;
    color: #1a1a1a;
    margin: 0 0 1.5rem;
  }

  @media (max-width: 768px) {
    .section {
      padding: 3rem 0;
    }

    .container {
      padding: 0 1rem;
    }
  }
</style>
```

## 📝 Notes for Implementation

1. **PRIORITY:** First fix the section headers in SessionPhases, CTANewsletter, and ExperienceSection
2. **Mapbox Integration:** Ensure map component follows the same visual language (light colors, minimal UI)
3. **Testing:** Verify all changes against BenefitsImageSection.astro as the gold standard
4. **Documentation:** Update component comments with design system references

## 🔗 References

- Design System: `/docs/GUIDELINE/`
- Section Headers: `/docs/GUIDELINE/02-COMPONENTS/section-headers.md`
- Typography: `/docs/GUIDELINE/01-FOUNDATION/typography.md`
- Colors: `/docs/GUIDELINE/01-FOUNDATION/colors.md`
- Reference Component: `/src/components/BenefitsImageSection.astro`

---

**Last Updated:** October 20, 2025
**For:** WDA-271 & WDA-272 Implementation
**Agent:** astro-ux-architect