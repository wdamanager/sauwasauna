# Email Templates para wpgraphql-universal-contact

## Instrucciones de Actualización

Accede a WordPress Admin → Contact Forms → Editar cada formulario y actualiza las plantillas de email con los placeholders de custom fields.

---

## Form 126: RRHH (Solicitudes de Empleo)

### Plantilla de Email al Admin (Español)

```
Nuevo mensaje de contacto - Solicitud de Empleo
=====================================

Detalles del candidato:
------------------
Nombre completo: {{name}} {{surname}}
Email: {{email}}
Teléfono: {{phone}}
Edad: {{age}} años

Documento CV:
{{cv_url}}

Mensaje / Motivación:
---------
{{motivation}}

Información adicional:
----------------------
Idioma: {{language}}
Consentimiento GDPR: {{gdpr_consent}}

Detalles técnicos:
------------------
Fecha: {{date}}
IP: {{ip}}

=====================================
{{site_name}}
{{site_url}}
```

### Email de Confirmación al Usuario (Español)

```
Estimado/a {{name}},

Gracias por tu interés en formar parte de nuestro equipo. Hemos recibido tu solicitud de empleo y la revisaremos detenidamente.

Tu solicitud incluye:
- Nombre: {{name}} {{surname}}
- Email: {{email}}
- Edad: {{age}} años
- CV: {{cv_url}}

Nos pondremos en contacto contigo en los próximos días si tu perfil se ajusta a lo que buscamos.

Saludos cordiales,
{{site_name}}
{{site_url}}
```

---

## Form 128: Partners (Solicitudes B2B)

### Plantilla de Email al Admin (Español)

```
Nuevo mensaje de contacto - Solicitud de Partnership
=====================================

Detalles del establecimiento:
------------------
Nombre del establecimiento: {{establishment_name}}
Tipo de propiedad: {{property_type}}
Dirección: {{address}}
Sitio web: {{website}}

Datos de contacto:
------------------
Nombre: {{name}}
Cargo: {{contact_position}}
Email: {{email}}
Teléfono: {{phone}}

Motivación / Mensaje:
---------
{{motivation}}

Información adicional:
----------------------
Idioma: {{language}}
Consentimiento GDPR: {{gdpr_consent}}

Detalles técnicos:
------------------
Fecha: {{date}}
IP: {{ip}}

=====================================
{{site_name}}
{{site_url}}
```

### Email de Confirmación al Usuario (Español)

```
Estimado/a {{name}},

Gracias por tu interés en convertirte en partner de SAUWA. Hemos recibido tu solicitud y la revisaremos en detalle.

Datos recibidos:
- Establecimiento: {{establishment_name}}
- Tipo: {{property_type}}
- Ubicación: {{address}}
- Web: {{website}}

Nuestro equipo de partnerships se pondrá en contacto contigo en breve para explorar posibles colaboraciones.

Saludos cordiales,
{{site_name}}
{{site_url}}
```

---

## Paso a Paso en WordPress Admin

### 1. Form 126 (RRHH)

1. Ve a `/wp-admin/post.php?post=126&action=edit`
2. Scroll hasta "Email Configuration"
3. Pega la plantilla de admin en "Email Template (es)"
4. Scroll hasta "Confirmation Email"
5. Activa "Enable confirmation email"
6. Pega la plantilla de confirmación en "Confirmation Template (es)"
7. Click "Update"

### 2. Form 128 (Partners)

1. Ve a `/wp-admin/post.php?post=128&action=edit`
2. Scroll hasta "Email Configuration"
3. Pega la plantilla de admin en "Email Template (es)"
4. Scroll hasta "Confirmation Email"
5. Activa "Enable confirmation email"
6. Pega la plantilla de confirmación en "Confirmation Template (es)"
7. Click "Update"

---

## Verificar Custom Field Types

En el plugin, verifica que los tipos de campos estén correctamente definidos en:

**File:** `includes/class-graphql.php` línea 916-930

```php
$field_types = array(
    // Job Application fields (Form 126)
    'surname' => 'text',
    'age' => 'number',
    'cv_url' => 'url',
    'motivation' => 'textarea',

    // Partner Application fields (Form 128)
    'establishment_name' => 'text',
    'property_type' => 'text',
    'address' => 'text',
    'website' => 'url',
    'contact_position' => 'text',
);
```

Estos tipos determinan cómo se sanitizan los valores en el backend.

---

## Testing

Después de actualizar las plantillas:

1. **Test Form 126 (RRHH):**
   - Ir a `/es/trabaja-con-nosotros`
   - Llenar formulario completo
   - Subir PDF de prueba como CV
   - Enviar
   - Verificar email recibido contiene todos los placeholders

2. **Test Form 128 (Partners):**
   - Ir a `/es/partners-hoteleros`
   - Llenar formulario completo
   - Enviar
   - Verificar email recibido contiene todos los placeholders

3. **Verificar en DB:**
   ```sql
   SELECT id, form_id, name, email, custom_fields
   FROM wp_wpguc_submissions
   ORDER BY id DESC
   LIMIT 2;
   ```

   El campo `custom_fields` debe contener JSON con todos los valores.

---

## Troubleshooting

### Placeholders no se reemplazan

Si los placeholders como `{{surname}}` aparecen sin reemplazar en el email:

1. Verifica que el campo esté en `customFields` del frontend
2. Verifica que el tipo de campo esté definido en `class-graphql.php`
3. Revisa logs: `tail -f /path/to/wp-content/debug.log`

### CV no se sube

Si el CV no se sube correctamente:

1. Verifica permisos de `/wp-content/uploads/`
2. Verifica que el plugin `class-file-upload.php` esté cargado
3. Test endpoint directamente:
   ```bash
   curl -X POST -F "file=@test.pdf" \
     https://backend.sauwasauna.com/wp-json/wpguc/v1/upload
   ```

### Error 429 (Rate Limit)

El plugin tiene rate limiting. Si aparece error 429:

1. Espera 5 minutos
2. O incrementa el límite en WordPress Admin → Contact Forms → Settings → Security

---

## URLs Útiles

- **Backend Admin:** https://backend.sauwasauna.com/wp-admin
- **Form 126 Edit:** https://backend.sauwasauna.com/wp-admin/post.php?post=126&action=edit
- **Form 128 Edit:** https://backend.sauwasauna.com/wp-admin/post.php?post=128&action=edit
- **Submissions:** https://backend.sauwasauna.com/wp-admin/admin.php?page=wpguc-submissions
- **Settings:** https://backend.sauwasauna.com/wp-admin/options-general.php?page=wpguc-settings

---

**Fecha:** 2025-12-11
**Versión Plugin:** 3.1.0
**Frontend:** Astro + wpgraphql-universal-contact integration
