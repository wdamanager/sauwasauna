# Cards

**Component:** UI Components
**Version:** 1.0.0
**Last Updated:** October 20, 2025
**Reference:** SessionPhases.astro

---

## 🃏 Card Types

### Image Overlay Card (SessionPhases Style)

The premium card design with background image and text overlay. Used for showcasing key features or phases.

#### Visual Specifications
- **Height:** 480px (desktop), 360px (mobile)
- **Border Radius:** `4px` (0.25rem) - **USES STANDARD RADIUS**
- **Image:** Full coverage with object-fit: cover
- **Overlay:** Gradient from transparent to 50% black
- **Padding:** 40px (desktop), 32px 24px (mobile)
- **Shadow:** `0 4px 12px rgba(0, 0, 0, 0.1)`
- **Hover Shadow:** `0 12px 32px rgba(0, 0, 0, 0.2)`
- **Hover Scale:** 1.03
- **Transition:** 400ms ease-out

#### Implementation

```css
/* CSS - Image Overlay Card */
.card-overlay {
  position: relative;
  height: 480px;
  border-radius: 4px;  /* STANDARD RADIUS */
  overflow: hidden;
  cursor: pointer;
  transition: all 400ms ease-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-overlay:hover {
  transform: scale(1.03);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.card-overlay:hover .card-image {
  transform: scale(1.08);
  filter: brightness(1.05);
}

.card-overlay:hover .card-number {
  color: #BA2515;
  transform: translateY(-4px);
}

/* Image */
.card-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms ease-out, filter 400ms ease-out;
  will-change: transform;
}

/* Overlay Gradient */
.card-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  z-index: 1;
}

/* Content */
.card-content {
  position: relative;
  z-index: 2;
  padding: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.card-number {
  font-family: 'Helvetica Neue', 'Inter', sans-serif;
  font-weight: 100;
  font-size: 64px;
  color: #DB4529;
  opacity: 0.8;
  line-height: 1;
  margin-bottom: 1rem;
  transition: all 300ms ease-out;
}

.card-title {
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: 28px;
  font-weight: 400;  /* Fixed from 500 */
  color: #FFFFFF;
  margin: 0 0 0.75rem;
}

.card-description {
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  max-width: 90%;
}
```

```html
<!-- HTML Structure -->
<article class="card-overlay">
  <img src="/images/sauna-interior.webp"
       alt="Interior sauna"
       class="card-image"
       loading="lazy">
  <div class="card-gradient"></div>
  <div class="card-content">
    <span class="card-number">01</span>
    <h4 class="card-title">Sauna de leña</h4>
    <p class="card-description">
      Calor intenso y vapor natural en nuestra sauna finlandesa auténtica.
    </p>
  </div>
</article>
```

---

### Content Card (Standard)

Basic card for general content, blog posts, or features without background images.

#### Visual Specifications
- **Background:** White
- **Border:** 1px solid rgba(0,0,0,0.1) or none
- **Border Radius:** `4px` - **USES STANDARD RADIUS**
- **Padding:** 32px
- **Shadow:** `0 2px 8px rgba(0,0,0,0.08)`
- **Hover Shadow:** `0 8px 24px rgba(0,0,0,0.12)`
- **Transition:** 300ms ease

```css
/* CSS - Content Card */
.card {
  background: #FFFFFF;
  border-radius: 4px;  /* STANDARD RADIUS */
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 300ms ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.card-header {
  margin-bottom: 16px;
}

.card-icon {
  width: 48px;
  height: 48px;
  color: #DB4529;
  margin-bottom: 16px;
}

.card-title {
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #1a1a1a;
  margin: 0 0 8px;
}

.card-body {
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.6;
  color: #555;
}
```

---

### Benefit Card (Icon + Text)

Used for listing benefits or features with an icon.

```css
/* CSS - Benefit Card */
.card-benefit {
  display: flex;
  gap: 20px;
  padding: 0;
  background: transparent;
  transition: transform 300ms ease;
}

.card-benefit:hover {
  transform: translateX(4px);
}

.benefit-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #DB4529;
}

.benefit-content {
  flex: 1;
}

.benefit-title {
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #1a1a1a;
  margin: 0 0 8px;
}

.benefit-text {
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.6;
  color: #555;
  margin: 0;
}
```

---

## 📐 Card Grid Layouts

### Three Column Grid

```css
.card-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1280px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .card-grid-3 {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .card-grid-3 {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

### Two Column Grid

```css
.card-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

@media (max-width: 768px) {
  .card-grid-2 {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

---

## 🎨 Card Variations

### Clickable Card

```css
.card-clickable {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: block;
}

.card-clickable:hover {
  color: inherit;
}
```

### Card with Footer

```css
.card-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-footer-text {
  font-size: 14px;
  color: #777;
}

.card-footer-action {
  color: #406E51;
  text-decoration: none;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-footer-action:hover {
  color: #DB4529;
}
```

---

## 💻 Complete Astro Component

```astro
---
// Card.astro
export interface Props {
  variant?: 'overlay' | 'content' | 'benefit';
  image?: string;
  imageAlt?: string;
  number?: string;
  title: string;
  description?: string;
  icon?: string;
  href?: string;
  class?: string;
}

const {
  variant = 'content',
  image,
  imageAlt,
  number,
  title,
  description,
  icon,
  href,
  class: className = ''
} = Astro.props;

const Component = href ? 'a' : 'article';
---

{variant === 'overlay' && (
  <Component
    class={`card-overlay ${className}`}
    href={href}
  >
    {image && (
      <>
        <img
          src={image}
          alt={imageAlt || ''}
          class="card-image"
          loading="lazy"
          width="600"
          height="480"
        />
        <div class="card-gradient"></div>
      </>
    )}
    <div class="card-content">
      {number && <span class="card-number">{number}</span>}
      <h4 class="card-title">{title}</h4>
      {description && <p class="card-description">{description}</p>}
    </div>
  </Component>
)}

{variant === 'content' && (
  <Component
    class={`card ${className}`}
    href={href}
  >
    <div class="card-header">
      {icon && (
        <div class="card-icon" set:html={icon} />
      )}
      <h4 class="card-title">{title}</h4>
    </div>
    {description && (
      <div class="card-body">{description}</div>
    )}
    <slot name="footer" />
  </Component>
)}

{variant === 'benefit' && (
  <div class={`card-benefit ${className}`}>
    {icon && (
      <div class="benefit-icon" set:html={icon} />
    )}
    <div class="benefit-content">
      <h4 class="benefit-title">{title}</h4>
      {description && <p class="benefit-text">{description}</p>}
    </div>
  </div>
)}

<style>
  /* Card Overlay Styles */
  .card-overlay {
    position: relative;
    height: 480px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    transition: all 400ms ease-out;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .card-overlay:hover {
    transform: scale(1.03);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  }

  .card-overlay:hover .card-image {
    transform: scale(1.08);
    filter: brightness(1.05);
  }

  .card-overlay:hover .card-number {
    color: #BA2515;
    transform: translateY(-4px);
  }

  .card-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 600ms ease-out, filter 400ms ease-out;
  }

  .card-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
    z-index: 1;
  }

  .card-content {
    position: relative;
    z-index: 2;
    padding: 40px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .card-number {
    font-family: 'Helvetica Neue', 'Inter', sans-serif;
    font-weight: 100;
    font-size: 64px;
    color: #DB4529;
    opacity: 0.8;
    line-height: 1;
    margin-bottom: 1rem;
    transition: all 300ms ease-out;
    display: block;
  }

  /* Content Card Styles */
  .card {
    background: #FFFFFF;
    border-radius: 4px;
    padding: 32px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 300ms ease;
  }

  .card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  /* Benefit Card Styles */
  .card-benefit {
    display: flex;
    gap: 20px;
    transition: transform 300ms ease;
  }

  .card-benefit:hover {
    transform: translateX(4px);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .card-overlay {
      height: 360px;
    }

    .card-content {
      padding: 32px 24px;
    }

    .card-number {
      font-size: 48px;
    }

    .card {
      padding: 24px;
    }
  }

  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    .card-overlay,
    .card-image,
    .card-number,
    .card,
    .card-benefit {
      transition: none;
    }
  }
</style>
```

---

## 🚫 Don'ts

❌ **Don't forget the standard border radius (4px)**
- All cards must use the same radius

❌ **Don't use excessive shadows**
- Keep shadows subtle and functional

❌ **Don't make cards too tall on mobile**
- Optimize heights for smaller screens

❌ **Don't forget hover states**
- All interactive cards need feedback

---

## ✅ Do's

✅ **Use consistent padding**
- Follow the spacing system

✅ **Maintain visual hierarchy**
- Clear title > description structure

✅ **Optimize images**
- Use WebP with JPEG fallbacks

✅ **Test touch interactions**
- Ensure mobile hover states work

---

## 📚 Related Documentation

- [Buttons](buttons.md) - Card CTAs
- [Typography](../01-FOUNDATION/typography.md) - Card text styles
- [Spacing](../01-FOUNDATION/spacing.md) - Card padding
- [Animations](../03-PATTERNS/animations.md) - Card transitions

---

## 🛠 Tools

- [Card Design Patterns](https://ui-patterns.com/patterns/cards)
- [Shadow Generator](https://shadows.brumm.af/)
- [Gradient Generator](https://cssgradient.io/)