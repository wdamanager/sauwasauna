/**
 * SAUWA Applications - Astro Integration Examples
 *
 * Ejemplos completos de integración con Astro para los formularios de
 * aplicación de empleo y solicitud de partners.
 */

// =============================================================================
// CONFIGURACIÓN
// =============================================================================

const GRAPHQL_ENDPOINT = 'https://backend.sauwasauna.com/graphql';

// =============================================================================
// MUTATIONS GRAPHQL
// =============================================================================

const JOB_APPLICATION_MUTATION = `
  mutation CreateJobApplication($input: CreateJobApplicationInput!) {
    createJobApplication(input: $input) {
      success
      message
      applicationId
    }
  }
`;

const PARTNER_APPLICATION_MUTATION = `
  mutation CreatePartnerApplication($input: CreatePartnerApplicationInput!) {
    createPartnerApplication(input: $input) {
      success
      message
      applicationId
    }
  }
`;

// =============================================================================
// UTILIDADES
// =============================================================================

/**
 * Convierte un archivo a base64
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

/**
 * Valida un email
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Valida un teléfono español
 */
function validatePhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 9 && cleaned.length <= 15;
}

/**
 * Valida una URL
 */
function validateURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// =============================================================================
// FORMULARIO DE APLICACIÓN DE EMPLEO
// =============================================================================

/**
 * Componente Astro: JobApplicationForm.astro
 *
 * Ejemplo de implementación:
 *
 * ---
 * import JobApplicationForm from './JobApplicationForm.astro';
 * ---
 *
 * <JobApplicationForm lang="es" />
 */

class JobApplicationHandler {
  constructor(formElement, options = {}) {
    this.form = formElement;
    this.lang = options.lang || 'es';
    this.onSuccess = options.onSuccess || (() => {});
    this.onError = options.onError || (() => {});

    this.init();
  }

  init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));

    // Validación en tiempo real
    this.setupRealtimeValidation();
  }

  setupRealtimeValidation() {
    // Email validation
    const emailInput = this.form.querySelector('[name="email"]');
    if (emailInput) {
      emailInput.addEventListener('blur', (e) => {
        if (!validateEmail(e.target.value)) {
          this.showFieldError(e.target, this.getTranslation('invalidEmail'));
        } else {
          this.clearFieldError(e.target);
        }
      });
    }

    // Phone validation
    const phoneInput = this.form.querySelector('[name="telefono"]');
    if (phoneInput) {
      phoneInput.addEventListener('blur', (e) => {
        if (!validatePhone(e.target.value)) {
          this.showFieldError(e.target, this.getTranslation('invalidPhone'));
        } else {
          this.clearFieldError(e.target);
        }
      });
    }

    // Age validation
    const ageInput = this.form.querySelector('[name="edad"]');
    if (ageInput) {
      ageInput.addEventListener('blur', (e) => {
        const age = parseInt(e.target.value);
        if (age < 18 || age > 65) {
          this.showFieldError(e.target, this.getTranslation('invalidAge'));
        } else {
          this.clearFieldError(e.target);
        }
      });
    }

    // CV validation
    const cvInput = this.form.querySelector('[name="cv"]');
    if (cvInput) {
      cvInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          // Check file type
          if (file.type !== 'application/pdf') {
            this.showFieldError(e.target, this.getTranslation('onlyPDF'));
            e.target.value = '';
            return;
          }

          // Check file size (5MB max)
          const maxSize = 5 * 1024 * 1024;
          if (file.size > maxSize) {
            this.showFieldError(e.target, this.getTranslation('fileTooLarge'));
            e.target.value = '';
            return;
          }

          this.clearFieldError(e.target);
        }
      });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Disable submit button
    const submitBtn = this.form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = this.getTranslation('sending');

    try {
      // Collect form data
      const formData = new FormData(this.form);

      // Validate all fields
      const validation = await this.validateForm(formData);
      if (!validation.valid) {
        throw new Error(validation.message);
      }

      // Convert CV to base64
      const cvFile = formData.get('cv');
      const cvBase64 = await fileToBase64(cvFile);

      // Prepare mutation variables
      const variables = {
        input: {
          nombre: formData.get('nombre'),
          apellidos: formData.get('apellidos'),
          email: formData.get('email'),
          telefono: formData.get('telefono'),
          edad: parseInt(formData.get('edad')),
          motivacion: formData.get('motivacion'),
          cvFileData: cvBase64,
          cvFileName: cvFile.name,
          idioma: this.lang,
          gdprConsent: formData.get('gdpr') === 'on'
        }
      };

      // Send to GraphQL
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: JOB_APPLICATION_MUTATION,
          variables
        })
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      const { success, message, applicationId } = result.data.createJobApplication;

      if (!success) {
        throw new Error(message);
      }

      // Success!
      this.showSuccessMessage(message);
      this.form.reset();
      this.onSuccess({ applicationId, message });

    } catch (error) {
      console.error('Job application error:', error);
      this.showErrorMessage(error.message);
      this.onError(error);
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  async validateForm(formData) {
    // Check required fields
    const required = ['nombre', 'apellidos', 'email', 'telefono', 'edad', 'motivacion', 'cv', 'gdpr'];
    for (const field of required) {
      if (!formData.get(field)) {
        return {
          valid: false,
          message: this.getTranslation('requiredField') + ': ' + field
        };
      }
    }

    // Validate email
    if (!validateEmail(formData.get('email'))) {
      return {
        valid: false,
        message: this.getTranslation('invalidEmail')
      };
    }

    // Validate phone
    if (!validatePhone(formData.get('telefono'))) {
      return {
        valid: false,
        message: this.getTranslation('invalidPhone')
      };
    }

    // Validate age
    const age = parseInt(formData.get('edad'));
    if (age < 18 || age > 65) {
      return {
        valid: false,
        message: this.getTranslation('invalidAge')
      };
    }

    // Validate motivation length
    if (formData.get('motivacion').length > 500) {
      return {
        valid: false,
        message: this.getTranslation('motivationTooLong')
      };
    }

    // Validate GDPR consent
    if (formData.get('gdpr') !== 'on') {
      return {
        valid: false,
        message: this.getTranslation('gdprRequired')
      };
    }

    return { valid: true };
  }

  showFieldError(field, message) {
    // Remove existing error
    this.clearFieldError(field);

    // Add error class
    field.classList.add('error');

    // Add error message
    const errorEl = document.createElement('span');
    errorEl.className = 'field-error';
    errorEl.textContent = message;
    field.parentElement.appendChild(errorEl);
  }

  clearFieldError(field) {
    field.classList.remove('error');
    const errorEl = field.parentElement.querySelector('.field-error');
    if (errorEl) {
      errorEl.remove();
    }
  }

  showSuccessMessage(message) {
    const alertEl = document.createElement('div');
    alertEl.className = 'alert alert-success';
    alertEl.innerHTML = `
      <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
      <span>${message}</span>
    `;
    this.form.parentElement.insertBefore(alertEl, this.form);

    // Auto-remove after 10 seconds
    setTimeout(() => alertEl.remove(), 10000);
  }

  showErrorMessage(message) {
    const alertEl = document.createElement('div');
    alertEl.className = 'alert alert-error';
    alertEl.innerHTML = `
      <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
      </svg>
      <span>${message}</span>
    `;
    this.form.parentElement.insertBefore(alertEl, this.form);

    // Auto-remove after 10 seconds
    setTimeout(() => alertEl.remove(), 10000);
  }

  getTranslation(key) {
    const translations = {
      es: {
        sending: 'Enviando...',
        requiredField: 'Campo requerido',
        invalidEmail: 'Email no válido',
        invalidPhone: 'Teléfono no válido',
        invalidAge: 'La edad debe estar entre 18 y 65 años',
        onlyPDF: 'Solo se aceptan archivos PDF',
        fileTooLarge: 'El archivo no puede superar los 5MB',
        motivationTooLong: 'La motivación no puede superar los 500 caracteres',
        gdprRequired: 'Debes aceptar la política de privacidad'
      },
      ca: {
        sending: 'Enviant...',
        requiredField: 'Camp requerit',
        invalidEmail: 'Email no vàlid',
        invalidPhone: 'Telèfon no vàlid',
        invalidAge: 'L\'edat ha d\'estar entre 18 i 65 anys',
        onlyPDF: 'Només s\'accepten arxius PDF',
        fileTooLarge: 'L\'arxiu no pot superar els 5MB',
        motivationTooLong: 'La motivació no pot superar els 500 caràcters',
        gdprRequired: 'Has d\'acceptar la política de privacitat'
      },
      en: {
        sending: 'Sending...',
        requiredField: 'Required field',
        invalidEmail: 'Invalid email',
        invalidPhone: 'Invalid phone',
        invalidAge: 'Age must be between 18 and 65',
        onlyPDF: 'Only PDF files are accepted',
        fileTooLarge: 'File cannot exceed 5MB',
        motivationTooLong: 'Motivation cannot exceed 500 characters',
        gdprRequired: 'You must accept the privacy policy'
      },
      fr: {
        sending: 'Envoi...',
        requiredField: 'Champ requis',
        invalidEmail: 'Email invalide',
        invalidPhone: 'Téléphone invalide',
        invalidAge: 'L\'âge doit être entre 18 et 65 ans',
        onlyPDF: 'Seuls les fichiers PDF sont acceptés',
        fileTooLarge: 'Le fichier ne peut pas dépasser 5MB',
        motivationTooLong: 'La motivation ne peut pas dépasser 500 caractères',
        gdprRequired: 'Vous devez accepter la politique de confidentialité'
      }
    };

    return translations[this.lang]?.[key] || translations['es'][key];
  }
}

// =============================================================================
// FORMULARIO DE SOLICITUD DE PARTNER
// =============================================================================

class PartnerApplicationHandler {
  constructor(formElement, options = {}) {
    this.form = formElement;
    this.lang = options.lang || 'es';
    this.onSuccess = options.onSuccess || (() => {});
    this.onError = options.onError || (() => {});

    this.init();
  }

  init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.setupRealtimeValidation();
  }

  setupRealtimeValidation() {
    // Similar validation setup as JobApplicationHandler
    // but adapted for partner fields

    const websiteInput = this.form.querySelector('[name="website"]');
    if (websiteInput) {
      websiteInput.addEventListener('blur', (e) => {
        if (!validateURL(e.target.value)) {
          this.showFieldError(e.target, 'URL no válida');
        } else {
          this.clearFieldError(e.target);
        }
      });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const submitBtn = this.form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
      const formData = new FormData(this.form);

      const variables = {
        input: {
          establecimiento: formData.get('establecimiento'),
          tipoPropiedad: formData.get('tipoPropiedad'),
          direccion: formData.get('direccion'),
          website: formData.get('website'),
          nombreApellidos: formData.get('nombreApellidos'),
          cargo: formData.get('cargo'),
          telefono: formData.get('telefono'),
          email: formData.get('email'),
          motivacion: formData.get('motivacion'),
          idioma: this.lang,
          gdprConsent: formData.get('gdpr') === 'on'
        }
      };

      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: PARTNER_APPLICATION_MUTATION,
          variables
        })
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      const { success, message, applicationId } = result.data.createPartnerApplication;

      if (!success) {
        throw new Error(message);
      }

      this.showSuccessMessage(message);
      this.form.reset();
      this.onSuccess({ applicationId, message });

    } catch (error) {
      console.error('Partner application error:', error);
      this.showErrorMessage(error.message);
      this.onError(error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  showFieldError(field, message) {
    // Same as JobApplicationHandler
  }

  clearFieldError(field) {
    // Same as JobApplicationHandler
  }

  showSuccessMessage(message) {
    // Same as JobApplicationHandler
  }

  showErrorMessage(message) {
    // Same as JobApplicationHandler
  }
}

// =============================================================================
// INICIALIZACIÓN
// =============================================================================

/**
 * Inicializa los formularios cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', () => {
  // Job Application Form
  const jobForm = document.querySelector('#job-application-form');
  if (jobForm) {
    new JobApplicationHandler(jobForm, {
      lang: document.documentElement.lang || 'es',
      onSuccess: (data) => {
        console.log('Application submitted:', data);
        // Redirect after 3 seconds
        setTimeout(() => {
          window.location.href = '/gracias';
        }, 3000);
      },
      onError: (error) => {
        console.error('Application error:', error);
      }
    });
  }

  // Partner Application Form
  const partnerForm = document.querySelector('#partner-application-form');
  if (partnerForm) {
    new PartnerApplicationHandler(partnerForm, {
      lang: document.documentElement.lang || 'es',
      onSuccess: (data) => {
        console.log('Partner application submitted:', data);
        // Redirect after 3 seconds
        setTimeout(() => {
          window.location.href = '/gracias-partner';
        }, 3000);
      },
      onError: (error) => {
        console.error('Partner application error:', error);
      }
    });
  }
});

// =============================================================================
// EXPORT FOR ES MODULES
// =============================================================================

export {
  JobApplicationHandler,
  PartnerApplicationHandler,
  fileToBase64,
  validateEmail,
  validatePhone,
  validateURL
};