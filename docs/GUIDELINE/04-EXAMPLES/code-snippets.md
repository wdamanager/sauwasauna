# Code Snippets

**Component:** Ready-to-Use Examples
**Version:** 1.0.0
**Last Updated:** October 20, 2025

---

## 🚀 Quick Copy Components

Ready-to-use code snippets for common SAUWA components. Copy, paste, and customize.

---

## 🎯 Hero Section

### Complete Hero with Newsletter

```astro
---
// HeroSection.astro
const { locale = 'es' } = Astro.props;
---

<section class="hero-section">
  <!-- Background Slider -->
  <div class="hero-slider">
    <img src="/images/hero-1.webp" alt="SAUWA" class="hero-image active" />
  </div>

  <!-- Content -->
  <div class="hero-content-wrapper">
    <!-- Logo -->
    <img src="/logos/sauwa-white.svg" alt="SAUWA" class="logo" />

    <!-- Titles -->
    <h1 class="hero-h1">
      Sauna en Andorra
      <span class="hero-subtitle">(sauna finlandesa de leña + baños fríos)</span>
    </h1>

    <h2 class="hero-h2">
      La primera experiencia de auténtica sauna finlandesa
    </h2>

    <!-- Newsletter Form -->
    <form class="newsletter-form">
      <input
        type="email"
        placeholder="tu@email.com"
        required
        class="email-input"
      />
      <label class="privacy-label">
        <input type="checkbox" required />
        <span>Acepto la <a href="/privacidad">política de privacidad</a> *</span>
      </label>
      <button type="submit" class="btn-primary">
        AVISADME
      </button>
    </form>
  </div>
</section>

<style>
  .hero-section {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .hero-slider {
    position: absolute;
    inset: 0;
  }

  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-content-wrapper {
    position: relative;
    z-index: 10;
    text-align: center;
    padding: 2rem;
    max-width: 900px;
  }

  .logo {
    height: 200px;
    margin-bottom: 2rem;
  }

  .hero-h1 {
    font-family: 'Helvetica Neue', sans-serif;
    font-size: clamp(2rem, 6vw, 4.5rem);
    font-weight: 100;
    color: white;
    margin-bottom: 1rem;
    text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }

  .hero-subtitle {
    display: block;
    font-size: 0.6em;
    margin-top: 0.5rem;
    opacity: 0.9;
  }

  .hero-h2 {
    font-family: 'Avenir Next', sans-serif;
    font-size: clamp(1rem, 2.5vw, 1.75rem);
    font-weight: 300;
    color: #DB4529;
    margin-bottom: 2rem;
  }

  .newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }

  .email-input {
    padding: 14px 20px;
    background: rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.4);
    border-radius: 4px;
    color: white;
    font-size: 16px;
  }

  .email-input::placeholder {
    color: rgba(255,255,255,0.6);
  }

  .privacy-label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    font-size: 14px;
  }

  .privacy-label a {
    color: white;
    text-decoration: underline;
  }

  .btn-primary {
    padding: 16px 32px;
    background: #BA2515;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: background 300ms ease;
  }

  .btn-primary:hover {
    background: #DB4529;
  }
</style>
```

---

## 📊 Benefits Section

### Benefits with Icons

```astro
---
// BenefitsSection.astro
const benefits = [
  {
    icon: 'muscle',
    title: 'Recuperación muscular',
    text: 'Acelera la recuperación tras actividad física intensa.'
  },
  {
    icon: 'sleep',
    title: 'Mejora del sueño',
    text: 'Favorece un descanso profundo y reparador.'
  },
  {
    icon: 'circulation',
    title: 'Activación circulatoria',
    text: 'Estimula la circulación sanguínea.'
  }
];

const icons = {
  muscle: `<svg>...</svg>`,
  sleep: `<svg>...</svg>`,
  circulation: `<svg>...</svg>`
};
---

<section class="benefits-section">
  <div class="container">
    <h2 class="seo-title">Beneficios sauna finlandesa</h2>
    <h3 class="main-heading">Beneficios reales del contraste calor-frío</h3>

    <div class="benefits-grid">
      {benefits.map(benefit => (
        <div class="benefit-card">
          <div class="benefit-icon" set:html={icons[benefit.icon]} />
          <div class="benefit-content">
            <h4 class="benefit-title">{benefit.title}</h4>
            <p class="benefit-text">{benefit.text}</p>
          </div>
        </div>
      ))}
    </div>

    <a href="/reservas" class="cta-link">
      Reserva tu sesión
      <svg class="arrow">...</svg>
    </a>
  </div>
</section>

<style>
  .benefits-section {
    padding: 5rem 0;
    background: white;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .seo-title {
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #DB4529;
    margin-bottom: 1rem;
  }

  .main-heading {
    font-family: 'Helvetica Neue', sans-serif;
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 200;
    color: #1a1a1a;
    margin-bottom: 3rem;
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .benefit-card {
    display: flex;
    gap: 1.25rem;
  }

  .benefit-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    color: #DB4529;
  }

  .benefit-title {
    font-family: 'Avenir Next', sans-serif;
    font-size: 1.125rem;
    font-weight: 400;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
  }

  .benefit-text {
    font-family: 'Avenir Next', sans-serif;
    font-size: 0.95rem;
    font-weight: 300;
    line-height: 1.6;
    color: #555;
  }

  .cta-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: 1px solid #406E51;
    border-radius: 4px;
    color: #406E51;
    text-decoration: none;
    transition: all 300ms ease;
  }

  .cta-link:hover {
    background: #406E51;
    color: white;
  }
</style>
```

---

## 🃏 Session Cards

### Image Overlay Cards Grid

```astro
---
// SessionPhases.astro
const phases = [
  {
    number: '01',
    title: 'Sauna de leña',
    description: 'Calor intenso y vapor natural.',
    image: '/images/phase-1.webp'
  },
  {
    number: '02',
    title: 'Inmersión en agua fría',
    description: 'Contraste térmico con baños de agua fría.',
    image: '/images/phase-2.webp'
  },
  {
    number: '03',
    title: 'Recuperación',
    description: 'Descanso profundo y conexión.',
    image: '/images/phase-3.webp'
  }
];
---

<section class="phases-section">
  <h2 class="section-title">¿Cómo es una sesión en SAUWA?</h2>

  <div class="phases-grid">
    {phases.map((phase, index) => (
      <article
        class="phase-card"
        data-aos="fade-up"
        data-aos-delay={index * 150}
      >
        <img src={phase.image} alt={phase.title} class="phase-image" />
        <div class="phase-overlay"></div>
        <div class="phase-content">
          <span class="phase-number">{phase.number}</span>
          <h3 class="phase-title">{phase.title}</h3>
          <p class="phase-description">{phase.description}</p>
        </div>
      </article>
    ))}
  </div>
</section>

<style>
  .phases-section {
    padding: 5rem 0;
    background: white;
  }

  .section-title {
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 2.5rem;
    font-weight: 300;
    text-align: center;
    margin-bottom: 4rem;
  }

  .phases-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .phase-card {
    position: relative;
    height: 480px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    transition: all 400ms ease-out;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .phase-card:hover {
    transform: scale(1.03);
    box-shadow: 0 12px 32px rgba(0,0,0,0.2);
  }

  .phase-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 600ms ease-out;
  }

  .phase-card:hover .phase-image {
    transform: scale(1.08);
  }

  .phase-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg,
      rgba(0,0,0,0.2) 0%,
      rgba(0,0,0,0.5) 100%
    );
  }

  .phase-content {
    position: relative;
    z-index: 2;
    padding: 40px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .phase-number {
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 64px;
    font-weight: 100;
    color: #DB4529;
    opacity: 0.8;
    line-height: 1;
    margin-bottom: 1rem;
  }

  .phase-title {
    font-family: 'Avenir Next', sans-serif;
    font-size: 28px;
    font-weight: 400;
    color: white;
    margin-bottom: 0.75rem;
  }

  .phase-description {
    font-family: 'Avenir Next', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(255,255,255,0.9);
  }

  @media (max-width: 1024px) {
    .phases-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .phases-grid {
      grid-template-columns: 1fr;
    }

    .phase-card {
      height: 360px;
    }
  }
</style>
```

---

## 📧 Newsletter CTA

### Full Width Newsletter Section

```astro
---
// NewsletterCTA.astro
---

<section class="newsletter-cta">
  <div class="container">
    <h2 class="cta-title">
      Únete a nuestra comunidad
    </h2>
    <p class="cta-subtitle">
      Recibe ofertas exclusivas y contenido sobre bienestar nórdico
    </p>

    <form class="newsletter-form">
      <div class="form-row">
        <input
          type="email"
          placeholder="tu@email.com"
          required
          class="email-input"
        />
        <button type="submit" class="submit-button">
          SUSCRIBIRSE
        </button>
      </div>
      <label class="privacy-check">
        <input type="checkbox" required />
        <span>Acepto recibir comunicaciones y ofertas especiales</span>
      </label>
    </form>

    <p class="discount-note">
      🎁 10% de descuento en tu primera sesión
    </p>
  </div>
</section>

<style>
  .newsletter-cta {
    padding: 4rem 0;
    background: linear-gradient(135deg, #BA2515 0%, #DB4529 100%);
    color: white;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2rem;
    text-align: center;
  }

  .cta-title {
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 2.5rem;
    font-weight: 200;
    margin-bottom: 1rem;
  }

  .cta-subtitle {
    font-family: 'Avenir Next', sans-serif;
    font-size: 1.125rem;
    font-weight: 300;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .newsletter-form {
    max-width: 500px;
    margin: 0 auto;
  }

  .form-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .email-input {
    flex: 1;
    padding: 14px 20px;
    background: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
  }

  .submit-button {
    padding: 14px 32px;
    background: #406E51;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: background 300ms ease;
  }

  .submit-button:hover {
    background: #355841;
  }

  .privacy-check {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    cursor: pointer;
  }

  .discount-note {
    margin-top: 2rem;
    font-size: 1rem;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    .form-row {
      flex-direction: column;
    }

    .submit-button {
      width: 100%;
    }
  }
</style>
```

---

## 🎨 Utility Classes

### Quick Tailwind Classes

```css
/* Text Styles */
.text-display { @apply font-helvetica font-thin text-7xl; }
.text-h1 { @apply font-helvetica font-thin text-5xl; }
.text-h2 { @apply font-helvetica font-extralight text-4xl; }
.text-h3 { @apply font-helvetica font-light text-3xl; }
.text-body { @apply font-avenir font-light text-base; }

/* Colors */
.text-primary { color: #BA2515; }
.text-accent { color: #DB4529; }
.text-secondary { color: #406E51; }
.bg-primary { background-color: #BA2515; }
.bg-accent { background-color: #DB4529; }
.bg-secondary { background-color: #406E51; }

/* Spacing */
.section-padding { @apply py-20; }
.container-padding { @apply px-8; }
.card-spacing { @apply p-8; }

/* Effects */
.shadow-soft { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.shadow-medium { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.shadow-strong { box-shadow: 0 8px 24px rgba(0,0,0,0.15); }

/* Animations */
.hover-lift { @apply transition-transform hover:-translate-y-1; }
.hover-scale { @apply transition-transform hover:scale-105; }
.fade-in { @apply animate-fadeIn; }
.slide-up { @apply animate-slideUp; }
```

---

## 🔧 JavaScript Helpers

### Smooth Scroll

```javascript
// Smooth scroll to section
function scrollToSection(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Usage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = anchor.getAttribute('href');
    scrollToSection(target);
  });
});
```

### Form Validation

```javascript
// Newsletter form validation and submission
class NewsletterForm {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    if (!this.form) return;

    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const email = formData.get('email');

    if (!this.validateEmail(email)) {
      this.showError('Por favor, introduce un email válido');
      return;
    }

    try {
      // Submit to API
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        this.showSuccess('✓ Suscripción completada');
        this.form.reset();
      } else {
        throw new Error('Error en el servidor');
      }
    } catch (error) {
      this.showError('Error al suscribir. Intenta de nuevo.');
    }
  }

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showSuccess(message) {
    // Show success message
    console.log(message);
  }

  showError(message) {
    // Show error message
    console.error(message);
  }
}

// Initialize
new NewsletterForm('#newsletter-form');
```

### Intersection Observer

```javascript
// Animate elements on scroll
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('[data-animate]');
    this.init();
  }

  init() {
    if (!this.elements.length) return;

    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animation = entry.target.dataset.animate;
          entry.target.classList.add(animation);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.elements.forEach(el => observer.observe(el));
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimations();
});
```

---

## 🎯 Complete Page Template

### Landing Page Structure

```astro
---
// LandingPage.astro
import Layout from '../layouts/Layout.astro';
import HeroSection from '../components/HeroSection.astro';
import BenefitsSection from '../components/BenefitsSection.astro';
import SessionPhases from '../components/SessionPhases.astro';
import NewsletterCTA from '../components/NewsletterCTA.astro';
import Footer from '../components/Footer.astro';

const { locale = 'es' } = Astro.props;
---

<Layout title="SAUWA - Sauna finlandesa en Andorra" lang={locale}>
  <HeroSection locale={locale} />
  <BenefitsSection locale={locale} />
  <SessionPhases locale={locale} />
  <NewsletterCTA locale={locale} />
  <Footer locale={locale} />
</Layout>

<style is:global>
  /* Global styles */
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Avenir Next', sans-serif;
    color: #333;
    line-height: 1.6;
  }

  /* Section spacing */
  section {
    padding: 5rem 0;
  }

  @media (max-width: 768px) {
    section {
      padding: 3rem 0;
    }
  }
</style>
```

---

## 📚 Related Documentation

- [Components](../02-COMPONENTS/) - Individual component docs
- [Foundation](../01-FOUNDATION/) - Design tokens
- [Patterns](../03-PATTERNS/) - Design patterns

---

## 🛠 Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [MDN Web Docs](https://developer.mozilla.org)