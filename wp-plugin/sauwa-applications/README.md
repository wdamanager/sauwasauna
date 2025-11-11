# SAUWA Applications Manager

Plugin de WordPress para gestionar aplicaciones de empleo y solicitudes de partners para SAUWA.

## Características

### 1. Gestión de Aplicaciones de Empleo
- Custom Post Type para aplicaciones de trabajo
- Campos ACF para datos del candidato
- Subida segura de CVs en PDF
- Notificaciones por email automáticas
- Mutation GraphQL para envío desde frontend

### 2. Gestión de Solicitudes de Partners
- Custom Post Type para solicitudes de partners
- Campos ACF para datos del establecimiento
- Validación de datos empresariales
- Emails de confirmación automáticos
- Mutation GraphQL para envío desde frontend

## Requisitos

- WordPress 5.8+
- PHP 7.4+
- Advanced Custom Fields PRO
- WPGraphQL 1.12+

## Instalación

1. Sube la carpeta `sauwa-applications` a `/wp-content/plugins/`
2. Activa el plugin desde el panel de WordPress
3. Configura los emails de notificación en Ajustes > SAUWA Applications (opcional)

## Configuración de Emails

Por defecto, el plugin usa:
- **RRHH**: rrhh@sauwasauna.com
- **Partners**: partners@sauwasauna.com

Para cambiarlos, añade en `wp-config.php`:

```php
define('SAUWA_HR_EMAIL', 'tu-email-rrhh@ejemplo.com');
define('SAUWA_PARTNERS_EMAIL', 'tu-email-partners@ejemplo.com');
```

## Uso desde Frontend (Astro)

### Mutation para Aplicación de Empleo

```javascript
const JOB_APPLICATION_MUTATION = `
  mutation CreateJobApplication($input: CreateJobApplicationInput!) {
    createJobApplication(input: $input) {
      success
      message
      applicationId
    }
  }
`;

// Ejemplo de uso
async function submitJobApplication(formData) {
  // Convertir archivo a base64
  const fileBase64 = await fileToBase64(formData.cvFile);

  const response = await fetch('https://backend.sauwasauna.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: JOB_APPLICATION_MUTATION,
      variables: {
        input: {
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          email: formData.email,
          telefono: formData.telefono,
          edad: parseInt(formData.edad),
          motivacion: formData.motivacion,
          cvFileData: fileBase64,
          cvFileName: formData.cvFile.name,
          idioma: formData.idioma || 'es',
          gdprConsent: true
        }
      }
    })
  });

  const data = await response.json();
  return data.data.createJobApplication;
}

// Helper para convertir archivo a base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
```

### Mutation para Solicitud de Partner

```javascript
const PARTNER_APPLICATION_MUTATION = `
  mutation CreatePartnerApplication($input: CreatePartnerApplicationInput!) {
    createPartnerApplication(input: $input) {
      success
      message
      applicationId
    }
  }
`;

// Ejemplo de uso
async function submitPartnerApplication(formData) {
  const response = await fetch('https://backend.sauwasauna.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: PARTNER_APPLICATION_MUTATION,
      variables: {
        input: {
          establecimiento: formData.establecimiento,
          tipoPropiedad: formData.tipoPropiedad,
          direccion: formData.direccion,
          website: formData.website,
          nombreApellidos: formData.nombreApellidos,
          cargo: formData.cargo,
          telefono: formData.telefono,
          email: formData.email,
          motivacion: formData.motivacion,
          idioma: formData.idioma || 'es',
          gdprConsent: true
        }
      }
    })
  });

  const data = await response.json();
  return data.data.createPartnerApplication;
}
```

## Panel de Administración

### Aplicaciones de Empleo
- Acceso desde: **Aplicaciones Empleo** en el menú de WordPress
- Estados disponibles: Nueva, Revisada, Entrevista, Aceptada, Rechazada
- Columnas personalizadas con información clave
- Descarga segura de CVs

### Solicitudes de Partners
- Acceso desde: **Solicitudes Partners** en el menú de WordPress
- Estados disponibles: Nueva, Revisada, Aprobada, Rechazada
- Columnas personalizadas con información del establecimiento
- Enlaces directos a websites de partners

## Seguridad

- Validación exhaustiva de todos los inputs
- Sanitización de datos con funciones nativas de WordPress
- Validación de archivos PDF (tipo MIME y tamaño)
- CVs almacenados en directorio protegido
- Enlaces de descarga temporales con expiración
- Protección GDPR con consentimiento obligatorio
- Registro de IPs para auditoría

## Hooks Disponibles

### Filters
- `sauwa_job_application_notification_email` - Modificar email de notificación RRHH
- `sauwa_partner_notification_email` - Modificar email de notificación Partners
- `sauwa_cv_max_size` - Modificar tamaño máximo de CV (default: 5MB)

### Actions
- `sauwa_after_job_application_created` - Ejecutar después de crear aplicación
- `sauwa_after_partner_application_created` - Ejecutar después de crear solicitud

## Testing con GraphiQL

1. Accede a `https://backend.sauwasauna.com/wp-admin/admin.php?page=graphiql-ide`
2. Prueba las mutations con datos de ejemplo:

### Test Job Application
```graphql
mutation {
  createJobApplication(input: {
    nombre: "Test",
    apellidos: "Usuario",
    email: "test@ejemplo.com",
    telefono: "600123456",
    edad: 25,
    motivacion: "Me encanta el wellness y tengo experiencia...",
    cvFileData: "data:application/pdf;base64,JVBERi0xLjQKJeLj...",
    cvFileName: "cv-test.pdf",
    idioma: "es",
    gdprConsent: true
  }) {
    success
    message
    applicationId
  }
}
```

### Test Partner Application
```graphql
mutation {
  createPartnerApplication(input: {
    establecimiento: "Hotel Test",
    tipoPropiedad: "Hotel",
    direccion: "Calle Test 123, Barcelona",
    website: "https://hoteltest.com",
    nombreApellidos: "Juan Pérez",
    cargo: "Director",
    telefono: "600123456",
    email: "director@hoteltest.com",
    motivacion: "Queremos ofrecer experiencias wellness...",
    idioma: "es",
    gdprConsent: true
  }) {
    success
    message
    applicationId
  }
}
```

## Mantenimiento

### Limpieza automática de CVs antiguos
El plugin incluye una función para limpiar CVs de más de 6 meses:

```php
$file_handler = new SAUWA_File_Handler();
$deleted = $file_handler->cleanup_old_cvs();
echo "Se eliminaron $deleted archivos antiguos";
```

### Logs de errores
Los errores se registran en el log de WordPress:
- Ubicación: `/wp-content/debug.log`
- Prefijo: `SAUWA:`

## Soporte

Para soporte o consultas sobre el plugin, contacta con el equipo de desarrollo.

## Licencia

Propiedad de SAUWA. Todos los derechos reservados.