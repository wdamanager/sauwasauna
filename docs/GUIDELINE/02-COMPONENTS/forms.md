# Forms

**Component:** UI Components
**Version:** 1.0.0
**Last Updated:** October 20, 2025
**Reference:** CTANewsletter.astro, Hero Newsletter Form

---

## 📝 Form Elements

### Text Input (Email Field)

Primary input style used in newsletter forms and contact forms.

#### Visual Specifications
- **Background:** `rgba(0, 0, 0, 0.2)` on dark, `#FFFFFF` on light
- **Border:** 1px solid `rgba(255, 255, 255, 0.4)` on dark
- **Border Radius:** `4px` - **USES STANDARD RADIUS**
- **Padding:** `14px 20px`
- **Font:** Avenir Next, 300 weight, 16px
- **Text Color:** White on dark, `#333` on light
- **Placeholder:** 60% opacity
- **Focus Border:** White on dark, `#406E51` on light
- **Transition:** 300ms ease

#### Implementation

```css
/* Input on Dark Background (Hero) */
.input-dark {
  width: 100%;
  padding: 14px 20px;
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-weight: 300;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 4px;  /* STANDARD RADIUS */
  color: #FFFFFF;
  transition: all 300ms ease;
}

.input-dark::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.input-dark:focus {
  outline: none;
  border-color: #FFFFFF;
  background-color: rgba(0, 0, 0, 0.3);
}

/* Input on Light Background */
.input-light {
  width: 100%;
  padding: 14px 20px;
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-weight: 300;
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 4px;  /* STANDARD RADIUS */
  color: #333333;
  transition: all 300ms ease;
}

.input-light::placeholder {
  color: #999999;
}

.input-light:focus {
  outline: none;
  border-color: #406E51;
  box-shadow: 0 0 0 3px rgba(64, 110, 81, 0.1);
}
```

```html
<!-- Email Input Dark -->
<input
  type="email"
  name="email"
  placeholder="Introduce tu email…"
  required
  class="input-dark"
/>

<!-- Email Input Light -->
<input
  type="email"
  name="email"
  placeholder="tu@email.com"
  required
  class="input-light"
/>
```

---

### Checkbox (Privacy Policy)

Used for consent and agreement checkboxes.

```css
/* Custom Checkbox */
.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
}

.checkbox-input {
  margin-top: 4px;
  cursor: pointer;
  width: 16px;
  height: 16px;
  accent-color: #DB4529;
}

.checkbox-label {
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

.checkbox-label a {
  color: #FFFFFF;
  text-decoration: underline;
}

.checkbox-label a:hover {
  opacity: 0.9;
}

.required-mark {
  color: #BA2515;
  margin-left: 2px;
}
```

```html
<!-- Privacy Checkbox -->
<label class="checkbox-group">
  <input
    type="checkbox"
    name="privacy"
    required
    class="checkbox-input"
  />
  <span class="checkbox-label">
    He leído y acepto la
    <a href="/es/politica-de-privacidad">política de privacidad</a>
    <span class="required-mark">*</span>
  </span>
</label>
```

---

### Select Dropdown

Dropdown menu for selecting options.

```css
.select {
  width: 100%;
  padding: 14px 20px;
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-weight: 300;
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 4px;  /* STANDARD RADIUS */
  color: #333333;
  cursor: pointer;
  transition: all 300ms ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
}

.select:focus {
  outline: none;
  border-color: #406E51;
  box-shadow: 0 0 0 3px rgba(64, 110, 81, 0.1);
}
```

---

### Textarea

Multi-line text input for messages and comments.

```css
.textarea {
  width: 100%;
  padding: 14px 20px;
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-weight: 300;
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 4px;  /* STANDARD RADIUS */
  color: #333333;
  resize: vertical;
  min-height: 120px;
  transition: all 300ms ease;
}

.textarea:focus {
  outline: none;
  border-color: #406E51;
  box-shadow: 0 0 0 3px rgba(64, 110, 81, 0.1);
}
```

---

## 📋 Form Layouts

### Newsletter Form (Hero Style)

```html
<form class="newsletter-form" id="newsletter-form">
  <!-- Email Input -->
  <input
    type="email"
    name="email"
    placeholder="Introduce tu email…"
    required
    class="email-input"
  />

  <!-- Privacy Checkbox -->
  <label class="privacy-label">
    <input type="checkbox" name="privacy" required class="privacy-checkbox" />
    <span class="privacy-text">
      He leído y acepto la
      <a href="/es/politica-de-privacidad" class="privacy-link">política de privacidad</a>
      <span class="required-asterisk">*</span>
    </span>
  </label>

  <!-- Submit Button -->
  <button type="submit" class="submit-button">
    AVISADME
  </button>
</form>
```

```css
.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 400px;
}
```

### Contact Form (Standard)

```html
<form class="contact-form">
  <div class="form-group">
    <label for="name" class="form-label">Nombre *</label>
    <input
      type="text"
      id="name"
      name="name"
      required
      class="input-light"
    />
  </div>

  <div class="form-group">
    <label for="email" class="form-label">Email *</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      class="input-light"
    />
  </div>

  <div class="form-group">
    <label for="subject" class="form-label">Asunto</label>
    <select id="subject" name="subject" class="select">
      <option value="">Selecciona una opción</option>
      <option value="reserva">Reserva</option>
      <option value="info">Información</option>
      <option value="otro">Otro</option>
    </select>
  </div>

  <div class="form-group">
    <label for="message" class="form-label">Mensaje *</label>
    <textarea
      id="message"
      name="message"
      required
      class="textarea"
    ></textarea>
  </div>

  <div class="form-group">
    <label class="checkbox-group">
      <input type="checkbox" required />
      <span class="checkbox-label">
        Acepto los términos y condiciones *
      </span>
    </label>
  </div>

  <button type="submit" class="btn-primary">
    Enviar mensaje
  </button>
</form>
```

```css
.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-family: 'Avenir Next', 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  margin-bottom: 8px;
}
```

---

## 🎨 Form States

### Validation States

```css
/* Error State */
.input-error {
  border-color: #BA2515 !important;
  background-color: rgba(186, 37, 21, 0.05);
}

.error-message {
  font-size: 14px;
  color: #BA2515;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Success State */
.input-success {
  border-color: #406E51 !important;
  background-color: rgba(64, 110, 81, 0.05);
}

.success-message {
  font-size: 14px;
  color: #406E51;
  margin-top: 8px;
}

/* Disabled State */
.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #F5F5F5;
}
```

### Loading State

```css
.form-loading {
  position: relative;
  pointer-events: none;
}

.form-loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.form-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #E0E0E0;
  border-top-color: #DB4529;
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## 💻 Complete Astro Form Component

```astro
---
// NewsletterForm.astro
export interface Props {
  variant?: 'dark' | 'light';
  buttonText?: string;
  class?: string;
}

const {
  variant = 'dark',
  buttonText = 'SUSCRIBIRSE',
  class: className = ''
} = Astro.props;

const inputClass = variant === 'dark' ? 'input-dark' : 'input-light';
const labelClass = variant === 'dark' ? 'text-white/80' : 'text-gray-700';
---

<form
  class={`newsletter-form ${className}`}
  data-newsletter-form
>
  <div class="form-group">
    <input
      type="email"
      name="email"
      placeholder="tu@email.com"
      required
      class={inputClass}
      aria-label="Email"
    />
  </div>

  <div class="form-group">
    <label class="checkbox-group">
      <input
        type="checkbox"
        name="privacy"
        required
        class="checkbox-input"
      />
      <span class={`checkbox-label ${labelClass}`}>
        He leído y acepto la
        <a href="/politica-privacidad" class="underline">
          política de privacidad
        </a>
        <span class="text-sauwa-red">*</span>
      </span>
    </label>
  </div>

  <button
    type="submit"
    class="btn-primary w-full"
    data-submit-btn
  >
    {buttonText}
  </button>

  <div class="form-message hidden" data-form-message></div>
</form>

<style>
  .newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 400px;
  }

  .form-message {
    padding: 12px 16px;
    border-radius: 4px;
    font-size: 14px;
    text-align: center;
  }

  .form-message.success {
    background-color: rgba(64, 110, 81, 0.1);
    color: #406E51;
    border: 1px solid #406E51;
  }

  .form-message.error {
    background-color: rgba(186, 37, 21, 0.1);
    color: #BA2515;
    border: 1px solid #BA2515;
  }

  .form-message.hidden {
    display: none;
  }
</style>

<script>
  // Newsletter form handler
  document.querySelectorAll('[data-newsletter-form]').forEach(form => {
    const submitBtn = form.querySelector('[data-submit-btn]');
    const messageDiv = form.querySelector('[data-form-message]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const email = formData.get('email');
      const privacy = formData.get('privacy');

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Show success message
        messageDiv.textContent = '✓ Suscripción completada. Revisa tu email.';
        messageDiv.className = 'form-message success';
        form.reset();
      } catch (error) {
        // Show error message
        messageDiv.textContent = '✗ Error al suscribir. Intenta de nuevo.';
        messageDiv.className = 'form-message error';
      } finally {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.originalText || 'SUSCRIBIRSE';
      }
    });
  });
</script>
```

---

## ♿ Accessibility

### Requirements
- All inputs must have labels (visible or aria-label)
- Required fields marked with * and aria-required
- Error messages associated with aria-describedby
- Keyboard navigation support
- Focus visible indicators

### ARIA Attributes

```html
<!-- Accessible Input -->
<div class="form-group">
  <label for="email" id="email-label">
    Email <span aria-label="required">*</span>
  </label>
  <input
    type="email"
    id="email"
    name="email"
    aria-labelledby="email-label"
    aria-describedby="email-error"
    aria-required="true"
    aria-invalid="false"
  />
  <span id="email-error" class="error-message" role="alert">
    Please enter a valid email
  </span>
</div>
```

---

## 🚫 Don'ts

❌ **Don't forget the 4px border radius**
- Keep consistent with other components

❌ **Don't use placeholder as label**
- Always provide proper labels

❌ **Don't make inputs too small**
- Minimum height 44px for touch

❌ **Don't skip validation feedback**
- Users need clear error messages

---

## 📚 Related Documentation

- [Buttons](buttons.md) - Submit button styles
- [Typography](../01-FOUNDATION/typography.md) - Form text styles
- [Colors](../01-FOUNDATION/colors.md) - Form states colors
- [Spacing](../01-FOUNDATION/spacing.md) - Form spacing

---

## 🛠 Tools

- [Form Design Patterns](https://www.uxmatters.com/mt/archives/2021/03/form-design-patterns.php)
- [Input Type Sandbox](https://inputtypes.com/)
- [Form Validation UX](https://designmodo.com/ux-form-validation/)