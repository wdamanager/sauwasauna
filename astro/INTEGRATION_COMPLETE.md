# ✅ Integración Frontend-Backend Completada

**Fecha:** 2025-11-12
**Plugin Backend:** WPGraphQL Universal Contact v3.0.0
**Frontend:** Astro 5.0.5 - sauwasauna.com

---

## 📋 Resumen de la Integración

Se han actualizado **3 formularios del frontend** para conectarlos con el backend de WordPress usando GraphQL con soporte multilingüe (ES/CA/EN/FR).

---

## 🎯 Form IDs Asignados

| Formulario | Form ID | Archivo Frontend | Usado en |
|------------|---------|------------------|----------|
| **Newsletter** | 85 | `src/components/NewsletterForm.astro` | Homepage (hero + CTA sections) |
| **Job Application** | 126 | `src/components/careers/JobApplicationForm.astro` | `/*/trabaja-con-nosotros` (4 idiomas) |
| **Partner Application** | 128 | `src/components/partners/PartnerApplicationForm.astro` | `/*/partners-hoteleros` (4 idiomas) |

---

## 📝 Archivos Modificados

### 1. NewsletterForm.astro

**Cambios realizados:**
- ✅ Agregado `formId: 85` en variables de mutation
- ✅ Ya tenía implementación GraphQL funcional
- ✅ Parámetro `language` ya incluido

**Línea modificada:** 900
```javascript
formId: 85, // Newsletter - Homepage form
```

**GraphQL Endpoint:** `https://backend.sauwasauna.com/graphql`

**Mutation:**
```graphql
mutation SubmitNewsletter($input: SubmitContactFormInput!) {
  submitContactForm(input: $input) {
    success
    message
  }
}
```

**Variables enviadas:**
```javascript
{
  formId: 85,
  name: "Newsletter Subscriber" (o nombre si variant=cta),
  email: "user@example.com",
  message: "Newsletter subscription - hero/cta",
  newsletter: true,
  gdprConsent: true,
  language: "es" | "ca" | "en" | "fr"
}
```

---

### 2. JobApplicationForm.astro

**Cambios realizados:**
- ✅ Reemplazado método `submitToBackend()` completo
- ✅ Descomentada y adaptada mutation GraphQL
- ✅ Cambiado de `createJobApplication` a `submitContactForm`
- ✅ Agregado `formId: 126`
- ✅ Concatenado nombre + apellido en campo `name`
- ✅ Incluida edad, CV, motivación en campo `message`
- ✅ Newsletter: `true` (suscribe a grupo RRHH de Mailrelay)

**Líneas modificadas:** 737-814

**GraphQL Endpoint:** `https://backend.sauwasauna.com/graphql`

**Mutation:**
```graphql
mutation SubmitJobApplication($input: SubmitContactFormInput!) {
  submitContactForm(input: $input) {
    success
    message
    submissionId
  }
}
```

**Variables enviadas:**
```javascript
{
  formId: 126,
  name: "Juan García" (nombre + apellido concatenados),
  email: "juan@example.com",
  phone: "+376123456",
  message: `SOLICITUD DE EMPLEO - SAUNA MASTER

Nombre completo: Juan García
Edad: 28 años
Teléfono: +376123456
CV adjunto: juan-cv.pdf

MOTIVACIÓN:
[Texto de motivación del candidato]

---
Formulario enviado desde: https://sauwasauna.com/es/trabaja-con-nosotros`,
  newsletter: true,
  gdprConsent: true,
  language: "es" | "ca" | "en" | "fr"
}
```

**Nota sobre CV:** El archivo se menciona en `message` pero no se sube (backend actual no soporta file upload). El nombre del archivo se captura y se incluye en el mensaje.

---

### 3. PartnerApplicationForm.astro

**Cambios realizados:**
- ✅ Reemplazado método `submitToBackend()` completo
- ✅ Implementada mutation GraphQL real
- ✅ Agregado `formId: 128`
- ✅ Incluidos todos los datos del establecimiento en `message`
- ✅ Newsletter: `true` (suscribe a grupo Partners de Mailrelay)

**Líneas modificadas:** 767-850

**GraphQL Endpoint:** `https://backend.sauwasauna.com/graphql`

**Mutation:**
```graphql
mutation SubmitPartnerApplication($input: SubmitContactFormInput!) {
  submitContactForm(input: $input) {
    success
    message
    submissionId
  }
}
```

**Variables enviadas:**
```javascript
{
  formId: 128,
  name: "María López" (contactName),
  email: "maria@hotelexample.com",
  phone: "+376987654",
  message: `SOLICITUD DE PARTNERSHIP B2B

DATOS DEL ESTABLECIMIENTO:
Nombre: Hotel Mountain Resort
Tipo de propiedad: hotel
Dirección: Av. Principal 123, Andorra la Vella
Sitio web: https://hotelmountainresort.com

PERSONA DE CONTACTO:
Nombre: María López
Cargo: Directora General
Teléfono: +376987654
Email: maria@hotelexample.com

MOTIVACIÓN PARA COLABORAR:
[Texto de motivación del partner]

---
Formulario enviado desde: https://sauwasauna.com/es/partners-hoteleros`,
  newsletter: true,
  gdprConsent: true,
  language: "es" | "ca" | "en" | "fr"
}
```

---

## 🔄 Flujo de Datos Completo

```
FRONTEND (Astro)
└─ Usuario completa formulario
   └─ Validation client-side (JS)
      └─ GraphQL mutation → https://backend.sauwasauna.com/graphql
         ↓
WORDPRESS BACKEND (WPGraphQL Universal Contact v3.0.0)
└─ submitContactForm(input: {...})
   ├─ Detecta language (es/ca/en/fr)
   ├─ Valida datos (nonces, sanitization)
   ├─ Guarda en DB (wp_wpguc_submissions)
   ├─ Envía email a destinatario (con template en idioma correcto)
   ├─ Envía confirmation email (en idioma del usuario)
   ├─ Suscribe a Mailrelay (grupo específico por formId)
   └─ Retorna: { success: true, message: "¡Gracias...", submissionId: 123 }
      ↓
FRONTEND
└─ Muestra success message en idioma del usuario
   └─ Reset del formulario
```

---

## 🌐 Soporte Multilingüe

### Detección de Idioma

El backend detecta automáticamente el idioma del usuario a partir del parámetro `language`:

```javascript
// En cada formulario
language: this.locale // "es" | "ca" | "en" | "fr"
```

### Mensajes Personalizados por Idioma

**Success Messages:** Configurados en WordPress admin con tabs multilingües
- Tab Default (Fallback)
- Tab Spanish (es)
- Tab Catalan (ca)
- Tab English (en)
- Tab French (fr)

**Email Templates:** Emails enviados al equipo en el idioma configurado

**Confirmation Emails:** Emails enviados al usuario en su idioma detectado

**Validation Errors:** Backend retorna errores en el idioma del usuario
- Ejemplo ES: "El email no es válido"
- Ejemplo CA: "L'email no és vàlid"
- Ejemplo EN: "The email is not valid"
- Ejemplo FR: "L'email n'est pas valide"

---

## 📧 Configuración de Emails por Formulario

### Form 85 - Newsletter
- **Destinatario:** marketing@sauwasauna.com
- **Sender:** noreply@sauwasauna.com
- **Subject:** [SAUWA] Nueva suscripción a lista prioritaria
- **Confirmation Email:** ✅ Activado
- **Mailrelay Group:** Lista Prioritaria Apertura

### Form 126 - Job Application
- **Destinatario:** rrhh@sauwasauna.com
- **Sender:** noreply@sauwasauna.com
- **Subject:** [RRHH] Nueva solicitud de empleo - Sauna Master
- **Confirmation Email:** ✅ Activado
- **Mailrelay Group:** Candidatos RRHH

### Form 128 - Partner Application
- **Destinatario:** partners@sauwasauna.com
- **Sender:** noreply@sauwasauna.com
- **Subject:** [PARTNERS] Nueva solicitud de colaboración B2B
- **Confirmation Email:** ✅ Activado
- **Mailrelay Group:** Partners B2B

---

## ✅ Checklist de Testing

### Pruebas Locales (Desarrollo)

- [ ] Build del proyecto Astro sin errores: `npm run build`
- [ ] TypeScript sin errores de tipo
- [ ] Linting sin errores: `npm run lint`

### Pruebas en Staging

#### Newsletter Form (3 variantes × 4 idiomas = 12 pruebas)

**Spanish (es):**
- [ ] Hero variant - `/es/` - Email válido → Success message en ES
- [ ] CTA variant - `/es/` - Nombre + Email → Success message en ES
- [ ] Verificar email recibido en marketing@sauwasauna.com
- [ ] Verificar confirmation email en ES

**Catalan (ca):**
- [ ] Hero variant - `/ca/` - Email válido → Success message en CA
- [ ] CTA variant - `/ca/` - Nombre + Email → Success message en CA
- [ ] Verificar confirmation email en CA

**English (en):**
- [ ] Hero variant - `/en/` - Email válido → Success message en EN
- [ ] CTA variant - `/en/` - Nombre + Email → Success message en EN
- [ ] Verificar confirmation email en EN

**French (fr):**
- [ ] Hero variant - `/fr/` - Email válido → Success message en FR
- [ ] CTA variant - `/fr/` - Nombre + Email → Success message en FR
- [ ] Verificar confirmation email en FR

#### Job Application Form (4 idiomas = 4 pruebas)

**Spanish (es):**
- [ ] `/es/trabaja-con-nosotros` - Completar todos los campos
- [ ] Subir CV (PDF, max 5MB)
- [ ] Success message en ES
- [ ] Email recibido en rrhh@sauwasauna.com con todos los datos
- [ ] Confirmation email en ES

**Catalan (ca):**
- [ ] `/ca/treballa-amb-nosaltres` - Completar formulario
- [ ] Success message en CA
- [ ] Confirmation email en CA

**English (en):**
- [ ] `/en/work-with-us` - Completar formulario
- [ ] Success message en EN
- [ ] Confirmation email en EN

**French (fr):**
- [ ] `/fr/travailler-avec-nous` - Completar formulario
- [ ] Success message en FR
- [ ] Confirmation email en FR

#### Partner Application Form (4 idiomas = 4 pruebas)

**Spanish (es):**
- [ ] `/es/partners-hoteleros` - Completar todos los campos
- [ ] Success message en ES
- [ ] Email recibido en partners@sauwasauna.com
- [ ] Confirmation email en ES

**Catalan (ca):**
- [ ] `/ca/socis-hotelers` - Completar formulario
- [ ] Success message en CA
- [ ] Confirmation email en CA

**English (en):**
- [ ] `/en/hotel-partners` - Completar formulario
- [ ] Success message en EN
- [ ] Confirmation email en EN

**French (fr):**
- [ ] `/fr/partenaires-hoteliers` - Completar formulario
- [ ] Success message en FR
- [ ] Confirmation email en FR

### Verificaciones Backend (WordPress)

- [ ] Submissions guardadas en **Contact Forms > Submissions**
- [ ] Cada submission tiene el `form_id` correcto (85, 126, 128)
- [ ] Suscripciones a Mailrelay en grupos correctos:
  - [ ] Newsletter → Grupo "Lista Prioritaria"
  - [ ] Job Application → Grupo "Candidatos RRHH"
  - [ ] Partner Application → Grupo "Partners B2B"

### Validación de Errores

**Campos vacíos:**
- [ ] Email vacío → Error client-side: "El email es obligatorio"
- [ ] Nombre vacío (CTA) → Error: "El nombre es obligatorio"
- [ ] GDPR no aceptado → Error: "Debes aceptar la política de privacidad"

**Formatos inválidos:**
- [ ] Email inválido → Error: "El email no es válido"
- [ ] Teléfono inválido (Job/Partners) → Error: "El teléfono no es válido"
- [ ] URL inválida (Partners) → Error: "La URL no es válida"

**Backend errors:**
- [ ] Rate limiting → Error: "Has enviado demasiadas solicitudes..."
- [ ] reCAPTCHA fail (si activado) → Error: "Verificación reCAPTCHA fallida"

---

## 🚀 Deployment Steps

### 1. Preparar Frontend

```bash
cd C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com\astro

# Install dependencies (si es necesario)
npm install

# Build para producción
npm run build

# Preview build localmente
npm run preview
```

### 2. Deploy a Staging

```bash
# Netlify / Vercel (según tu configuración)
git add .
git commit -m "feat(forms): connect to WordPress backend with multilingual support

- Add formId to all 3 forms (85, 126, 128)
- Implement real GraphQL mutations for Job Application and Partner forms
- Support 4 languages (ES/CA/EN/FR)
- Newsletter subscription to specific Mailrelay groups"

git push origin staging
```

### 3. Verificar en Staging

1. Esperar deploy completo
2. Abrir URL de staging
3. Ejecutar checklist de testing completo
4. Fix bugs si es necesario

### 4. Deploy a Production

```bash
git checkout main
git merge staging
git push origin main
```

---

## 🐛 Troubleshooting

### Error: "HTTP error! status: 500"

**Causa:** Backend WordPress tiene error
**Solución:** Revisar logs de WordPress (`wp-content/debug.log`)

### Error: "GraphQL errors: [...]"

**Causa:** Mutation inválida o campos faltantes
**Solución:** Verificar que todos los campos requeridos estén presentes en variables

### Success message no aparece en idioma correcto

**Causa:** Tabs multilingües no configuradas en WordPress
**Solución:** Revisar formulario en WordPress admin → Success Messages → Tabs

### Email no se envía

**Causa:** SMTP mal configurado
**Solución:** WordPress admin → Contact Forms → Settings → SMTP → Test Email

### Suscripción a Mailrelay no funciona

**Causa:** API Key o Group ID incorrecto
**Solución:** Verificar configuración Newsletter en cada formulario

### CV no se adjunta en Job Application

**Limitación actual:** El backend no soporta file upload vía GraphQL
**Workaround:** El nombre del archivo se incluye en el mensaje
**Solución futura:** Implementar upload con multipart/form-data o REST API

---

## 📊 Métricas Esperadas

Una vez en producción, verifica en WordPress admin:

**Contact Forms > Submissions:**
- Filtrar por `form_id = 85` → Newsletter submissions
- Filtrar por `form_id = 126` → Job applications
- Filtrar por `form_id = 128` → Partner applications

**Mailrelay Dashboard:**
- Grupo "Lista Prioritaria" → Nuevos suscriptores
- Grupo "Candidatos RRHH" → Applicants
- Grupo "Partners B2B" → Partner contacts

---

## 📝 Notas Importantes

1. **CV Upload:** Actualmente solo se captura el nombre del archivo. Para upload real, se necesitaría:
   - WordPress REST API endpoint para files
   - O integración con servicio externo (S3, Cloudinary)

2. **Rate Limiting:** Backend tiene rate limiting por IP (120 segundos default)
   - En desarrollo, puede causar errores si envías muchos tests seguidos
   - Wait 2 minutos entre submissions del mismo IP

3. **reCAPTCHA:** Si se activa en WordPress:
   - Frontend necesitará agregar widget de reCAPTCHA
   - Y pasar token en mutation

4. **Newsletter Checkbox:** Los 3 formularios tienen `newsletter: true` hardcoded
   - Newsletter form: Suscribe a lista general
   - Job form: Suscribe a lista RRHH
   - Partner form: Suscribe a lista Partners
   - Si quieres hacerlo opcional, agregar checkbox en frontend

---

## ✅ Sign-off

**Frontend Developer:** Claude Code
**Backend Plugin:** WPGraphQL Universal Contact v3.0.0
**Integration Status:** ✅ Complete - Ready for Testing
**Date:** 2025-11-12

---

**Next Steps:**
1. Deploy to staging
2. Execute testing checklist
3. Fix any bugs found
4. Deploy to production
5. Monitor submissions and emails
6. Celebrate! 🎉
