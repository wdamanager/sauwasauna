# Animations

**Component:** Design Patterns
**Version:** 1.0.0
**Last Updated:** October 20, 2025

---

## ⚡ Animation Principles

### SAUWA Animation Philosophy

1. **Subtle & Elegant** - Animations should enhance, not distract
2. **Performance First** - Use CSS transforms and opacity only
3. **Natural Motion** - Inspired by nature (water, steam, fire)
4. **Purposeful** - Every animation has a clear function
5. **Accessible** - Respect prefers-reduced-motion

---

## 🎬 Core Animations

### Fade In Up

The primary entrance animation for content.

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out both;
}

/* With delays */
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-600 { animation-delay: 0.6s; }
.animation-delay-800 { animation-delay: 0.8s; }
```

### Fade In (Simple)

Basic opacity transition.

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.6s ease-out both;
}
```

### Slide In (Directional)

```css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in-left {
  animation: slideInLeft 0.8s ease-out both;
}

.slide-in-right {
  animation: slideInRight 0.8s ease-out both;
}
```

### Scale In

For modals and overlays.

```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn 0.3s ease-out both;
}
```

---

## 🔄 Transitions

### Standard Transition Timing

```css
:root {
  --transition-fast: 200ms;
  --transition-base: 300ms;
  --transition-slow: 400ms;
  --transition-slower: 600ms;
}

/* Base transition */
.transition {
  transition: all var(--transition-base) ease;
}

/* Specific transitions */
.transition-opacity {
  transition: opacity var(--transition-base) ease;
}

.transition-transform {
  transition: transform var(--transition-base) ease;
}

.transition-colors {
  transition: color var(--transition-base) ease,
              background-color var(--transition-base) ease,
              border-color var(--transition-base) ease;
}
```

### Easing Functions

```css
:root {
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

---

## 🎯 Component Animations

### Button Hover

```css
.btn {
  transition: all 300ms ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:active {
  transform: translateY(0);
  transition-duration: 100ms;
}
```

### Card Hover

```css
.card {
  transition: all 400ms ease-out;
}

.card:hover {
  transform: scale(1.03);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.card:hover .card-image {
  transform: scale(1.08);
}

.card-image {
  transition: transform 600ms ease-out;
}
```

### Link Hover with Arrow

```css
.link-arrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color 300ms ease;
}

.link-arrow:hover {
  color: #DB4529;
}

.link-arrow svg {
  transition: transform 300ms ease;
}

.link-arrow:hover svg {
  transform: translateX(4px);
}
```

---

## 📜 Scroll Animations

### Intersection Observer Setup

```javascript
// Scroll animation controller
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('[data-aos]');
    this.init();
  }

  init() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.aosDelay || 0;
          setTimeout(() => {
            entry.target.classList.add('aos-animate');
          }, delay);
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

### Scroll Animation CSS

```css
/* Initial state */
[data-aos="fade-up"] {
  opacity: 0;
  transform: translateY(30px);
  transition: all 500ms ease-out;
}

[data-aos="fade-left"] {
  opacity: 0;
  transform: translateX(-30px);
  transition: all 500ms ease-out;
}

[data-aos="fade-right"] {
  opacity: 0;
  transform: translateX(30px);
  transition: all 500ms ease-out;
}

[data-aos="zoom-in"] {
  opacity: 0;
  transform: scale(0.95);
  transition: all 500ms ease-out;
}

/* Animated state */
[data-aos].aos-animate {
  opacity: 1;
  transform: translateY(0) translateX(0) scale(1);
}
```

### HTML Usage

```html
<!-- Basic scroll animation -->
<div data-aos="fade-up">
  Content animates on scroll
</div>

<!-- With delay -->
<div data-aos="fade-up" data-aos-delay="150">
  Delayed animation
</div>

<!-- Staggered cards -->
<div class="grid">
  <div data-aos="fade-up" data-aos-delay="0">Card 1</div>
  <div data-aos="fade-up" data-aos-delay="150">Card 2</div>
  <div data-aos="fade-up" data-aos-delay="300">Card 3</div>
</div>
```

---

## 🔄 Loading Animations

### Spinner

```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: #DB4529;
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}
```

### Pulse

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

### Skeleton Loading

```css
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
```

---

## 🎨 Special Effects

### Hero Slider Transitions

```css
/* Slide transition */
.slide-enter {
  opacity: 0;
  transform: translateX(100%);
}

.slide-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 800ms ease-out;
}

.slide-exit {
  opacity: 1;
  transform: translateX(0);
}

.slide-exit-active {
  opacity: 0;
  transform: translateX(-100%);
  transition: all 800ms ease-out;
}

/* Fade transition */
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  opacity: 1;
  transition: opacity 1200ms ease;
}
```

### Parallax Effect

```css
.parallax-container {
  overflow: hidden;
  position: relative;
}

.parallax-element {
  will-change: transform;
  transition: transform 0s linear;
}

/* Apply via JavaScript based on scroll */
.parallax-slow {
  transform: translateY(calc(var(--scroll-y) * 0.5));
}

.parallax-fast {
  transform: translateY(calc(var(--scroll-y) * 1.5));
}
```

---

## ♿ Accessibility

### Respecting Motion Preferences

```css
/* Reduce all animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Keep opacity transitions for critical UX */
  .transition-opacity {
    transition: opacity 200ms ease !important;
  }
}
```

### JavaScript Check

```javascript
// Check motion preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  // Initialize animations
  initScrollAnimations();
  initParallax();
}
```

---

## 🎭 Performance Tips

### Best Practices

```css
/* Use transform and opacity for best performance */
.good-animation {
  transform: translateX(100px);
  opacity: 0.5;
}

/* Avoid animating layout properties */
.bad-animation {
  left: 100px; /* Triggers layout */
  width: 200px; /* Triggers layout */
}

/* Use will-change sparingly */
.hero-image {
  will-change: transform;
}

/* Remove will-change after animation */
.hero-image.animation-done {
  will-change: auto;
}
```

### GPU Acceleration

```css
/* Force GPU acceleration */
.gpu-accelerated {
  transform: translateZ(0);
  /* or */
  will-change: transform;
}

/* 3D transforms automatically use GPU */
.transform-3d {
  transform: translate3d(0, 0, 0);
}
```

---

## 💻 Complete Animation Library

```css
/* animations.css */

/* Keyframes */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Animation Classes */
.animate-fadeIn { animation: fadeIn 0.6s ease-out both; }
.animate-fadeInUp { animation: fadeInUp 0.8s ease-out both; }
.animate-fadeInDown { animation: fadeInDown 0.8s ease-out both; }
.animate-slideInLeft { animation: slideInLeft 0.8s ease-out both; }
.animate-slideInRight { animation: slideInRight 0.8s ease-out both; }
.animate-scaleIn { animation: scaleIn 0.3s ease-out both; }
.animate-spin { animation: spin 0.6s linear infinite; }
.animate-pulse { animation: pulse 2s ease-in-out infinite; }

/* Delays */
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }

/* Durations */
.duration-300 { animation-duration: 300ms; }
.duration-500 { animation-duration: 500ms; }
.duration-700 { animation-duration: 700ms; }
.duration-1000 { animation-duration: 1000ms; }

/* Transitions */
.transition-all { transition: all 300ms ease; }
.transition-opacity { transition: opacity 300ms ease; }
.transition-transform { transition: transform 300ms ease; }
.transition-colors {
  transition: color 300ms ease,
              background-color 300ms ease,
              border-color 300ms ease;
}

/* Hover Transforms */
.hover-scale:hover { transform: scale(1.05); }
.hover-rotate:hover { transform: rotate(5deg); }
.hover-lift:hover { transform: translateY(-4px); }
.hover-push:hover { transform: translateY(2px); }

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📚 Related Documentation

- [Components](../02-COMPONENTS/) - Component-specific animations
- [Accessibility](accessibility.md) - Motion accessibility guidelines

---

## 🛠 Tools

- [Cubic Bezier Generator](https://cubic-bezier.com/)
- [Animista](https://animista.net/)
- [CSS Animation Visualizer](https://www.cssportal.com/css-animation-generator/)