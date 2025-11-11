<?php
/**
 * GraphQL Mutations
 */

if (!defined('ABSPATH')) {
    exit;
}

class SAUWA_GraphQL_Mutations {

    /**
     * Initialize GraphQL mutations
     */
    public static function init() {
        add_action('graphql_register_types', [__CLASS__, 'register_mutations']);
    }

    /**
     * Register GraphQL mutations
     */
    public static function register_mutations() {
        // Register createJobApplication mutation
        register_graphql_mutation('createJobApplication', [
            'inputFields' => [
                'nombre' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Nombre del candidato'
                ],
                'apellidos' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Apellidos del candidato'
                ],
                'email' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Email del candidato'
                ],
                'telefono' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Teléfono del candidato'
                ],
                'edad' => [
                    'type' => ['non_null' => 'Int'],
                    'description' => 'Edad del candidato'
                ],
                'motivacion' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Motivación del candidato'
                ],
                'cvFileData' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Archivo CV en base64'
                ],
                'cvFileName' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Nombre del archivo CV'
                ],
                'idioma' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Idioma de la aplicación'
                ],
                'gdprConsent' => [
                    'type' => ['non_null' => 'Boolean'],
                    'description' => 'Consentimiento GDPR'
                ]
            ],
            'outputFields' => [
                'success' => [
                    'type' => 'Boolean',
                    'description' => 'Si la operación fue exitosa'
                ],
                'message' => [
                    'type' => 'String',
                    'description' => 'Mensaje de respuesta'
                ],
                'applicationId' => [
                    'type' => 'String',
                    'description' => 'ID de la aplicación creada'
                ]
            ],
            'mutateAndGetPayload' => function($input) {
                return self::handle_job_application($input);
            }
        ]);

        // Register createPartnerApplication mutation
        register_graphql_mutation('createPartnerApplication', [
            'inputFields' => [
                'establecimiento' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Nombre del establecimiento'
                ],
                'tipoPropiedad' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Tipo de propiedad'
                ],
                'direccion' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Dirección del establecimiento'
                ],
                'website' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Website del establecimiento'
                ],
                'nombreApellidos' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Nombre y apellidos del contacto'
                ],
                'cargo' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Cargo del contacto'
                ],
                'telefono' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Teléfono de contacto'
                ],
                'email' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Email de contacto'
                ],
                'motivacion' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Motivación para ser partner'
                ],
                'idioma' => [
                    'type' => ['non_null' => 'String'],
                    'description' => 'Idioma de la solicitud'
                ],
                'gdprConsent' => [
                    'type' => ['non_null' => 'Boolean'],
                    'description' => 'Consentimiento GDPR'
                ]
            ],
            'outputFields' => [
                'success' => [
                    'type' => 'Boolean',
                    'description' => 'Si la operación fue exitosa'
                ],
                'message' => [
                    'type' => 'String',
                    'description' => 'Mensaje de respuesta'
                ],
                'applicationId' => [
                    'type' => 'String',
                    'description' => 'ID de la solicitud creada'
                ]
            ],
            'mutateAndGetPayload' => function($input) {
                return self::handle_partner_application($input);
            }
        ]);
    }

    /**
     * Handle job application mutation
     */
    private static function handle_job_application($input) {
        try {
            // Validate GDPR consent
            if (!isset($input['gdprConsent']) || !$input['gdprConsent']) {
                throw new Exception(__('Debe aceptar la política de privacidad', 'sauwa-applications'));
            }

            // Validate email
            if (!is_email($input['email'])) {
                throw new Exception(__('El email proporcionado no es válido', 'sauwa-applications'));
            }

            // Validate age
            $edad = intval($input['edad']);
            if ($edad < 18 || $edad > 65) {
                throw new Exception(__('La edad debe estar entre 18 y 65 años', 'sauwa-applications'));
            }

            // Validate phone
            $telefono = sanitize_text_field($input['telefono']);
            if (strlen($telefono) < 9) {
                throw new Exception(__('El teléfono no es válido', 'sauwa-applications'));
            }

            // Validate motivation length
            if (strlen($input['motivacion']) > 500) {
                throw new Exception(__('La motivación no puede superar los 500 caracteres', 'sauwa-applications'));
            }

            // Sanitize inputs
            $nombre = sanitize_text_field($input['nombre']);
            $apellidos = sanitize_text_field($input['apellidos']);
            $email = sanitize_email($input['email']);
            $motivacion = sanitize_textarea_field($input['motivacion']);
            $idioma = sanitize_text_field($input['idioma']);

            // Process CV file
            $cv_url = '';
            $cv_filename = sanitize_file_name($input['cvFileName']);

            if (!empty($input['cvFileData'])) {
                $file_handler = new SAUWA_File_Handler();
                $upload_result = $file_handler->upload_cv_from_base64(
                    $input['cvFileData'],
                    $cv_filename,
                    $email
                );

                if (!$upload_result['success']) {
                    throw new Exception($upload_result['message']);
                }

                $cv_url = $upload_result['url'];
            }

            // Get client IP
            $ip_address = self::get_client_ip();

            // Create job application post
            $post_data = [
                'post_title'   => sprintf('%s %s - %s', $nombre, $apellidos, date('d/m/Y')),
                'post_type'    => 'job_application',
                'post_status'  => 'publish',
                'meta_input'   => []
            ];

            $post_id = wp_insert_post($post_data);

            if (is_wp_error($post_id)) {
                throw new Exception(__('Error al crear la aplicación', 'sauwa-applications'));
            }

            // Update ACF fields
            update_field('nombre', $nombre, $post_id);
            update_field('apellidos', $apellidos, $post_id);
            update_field('email', $email, $post_id);
            update_field('telefono', $telefono, $post_id);
            update_field('edad', $edad, $post_id);
            update_field('motivacion', $motivacion, $post_id);
            update_field('cv_url', $cv_url, $post_id);
            update_field('cv_filename', $cv_filename, $post_id);
            update_field('idioma', $idioma, $post_id);
            update_field('fecha_aplicacion', current_time('Y-m-d H:i:s'), $post_id);
            update_field('estado', 'Nueva', $post_id);
            update_field('ip_address', $ip_address, $post_id);

            // Send notification email to HR
            $email_handler = new SAUWA_Email_Handler();
            $email_sent = $email_handler->send_job_application_notification([
                'nombre' => $nombre,
                'apellidos' => $apellidos,
                'email' => $email,
                'telefono' => $telefono,
                'edad' => $edad,
                'motivacion' => $motivacion,
                'cv_url' => $cv_url,
                'idioma' => $idioma,
                'application_id' => $post_id
            ]);

            if (!$email_sent) {
                error_log('SAUWA: Failed to send job application email for ID: ' . $post_id);
            }

            return [
                'success' => true,
                'message' => __('Tu aplicación ha sido enviada correctamente. Te contactaremos pronto.', 'sauwa-applications'),
                'applicationId' => (string) $post_id
            ];

        } catch (Exception $e) {
            error_log('SAUWA Job Application Error: ' . $e->getMessage());

            return [
                'success' => false,
                'message' => $e->getMessage(),
                'applicationId' => null
            ];
        }
    }

    /**
     * Handle partner application mutation
     */
    private static function handle_partner_application($input) {
        try {
            // Validate GDPR consent
            if (!isset($input['gdprConsent']) || !$input['gdprConsent']) {
                throw new Exception(__('Debe aceptar la política de privacidad', 'sauwa-applications'));
            }

            // Validate email
            if (!is_email($input['email'])) {
                throw new Exception(__('El email proporcionado no es válido', 'sauwa-applications'));
            }

            // Validate website URL
            if (!filter_var($input['website'], FILTER_VALIDATE_URL)) {
                throw new Exception(__('La URL del website no es válida', 'sauwa-applications'));
            }

            // Validate phone
            $telefono = sanitize_text_field($input['telefono']);
            if (strlen($telefono) < 9) {
                throw new Exception(__('El teléfono no es válido', 'sauwa-applications'));
            }

            // Validate motivation length
            if (strlen($input['motivacion']) > 500) {
                throw new Exception(__('La motivación no puede superar los 500 caracteres', 'sauwa-applications'));
            }

            // Validate property type
            $valid_types = ['Hotel', 'Glamping Premium'];
            if (!in_array($input['tipoPropiedad'], $valid_types)) {
                throw new Exception(__('Tipo de propiedad no válido', 'sauwa-applications'));
            }

            // Sanitize inputs
            $establecimiento = sanitize_text_field($input['establecimiento']);
            $tipo_propiedad = sanitize_text_field($input['tipoPropiedad']);
            $direccion = sanitize_text_field($input['direccion']);
            $website = esc_url_raw($input['website']);
            $nombre_apellidos = sanitize_text_field($input['nombreApellidos']);
            $cargo = sanitize_text_field($input['cargo']);
            $email = sanitize_email($input['email']);
            $motivacion = sanitize_textarea_field($input['motivacion']);
            $idioma = sanitize_text_field($input['idioma']);

            // Get client IP
            $ip_address = self::get_client_ip();

            // Create partner application post
            $post_data = [
                'post_title'   => sprintf('%s - %s', $establecimiento, date('d/m/Y')),
                'post_type'    => 'partner_application',
                'post_status'  => 'publish',
                'meta_input'   => []
            ];

            $post_id = wp_insert_post($post_data);

            if (is_wp_error($post_id)) {
                throw new Exception(__('Error al crear la solicitud', 'sauwa-applications'));
            }

            // Update ACF fields
            update_field('establecimiento', $establecimiento, $post_id);
            update_field('tipo_propiedad', $tipo_propiedad, $post_id);
            update_field('direccion', $direccion, $post_id);
            update_field('website', $website, $post_id);
            update_field('nombre_apellidos', $nombre_apellidos, $post_id);
            update_field('cargo', $cargo, $post_id);
            update_field('telefono', $telefono, $post_id);
            update_field('email', $email, $post_id);
            update_field('motivacion', $motivacion, $post_id);
            update_field('idioma', $idioma, $post_id);
            update_field('fecha_solicitud', current_time('Y-m-d H:i:s'), $post_id);
            update_field('estado', 'Nueva', $post_id);
            update_field('ip_address', $ip_address, $post_id);

            // Send notification emails
            $email_handler = new SAUWA_Email_Handler();

            // 1. Send internal notification to management
            $internal_email_sent = $email_handler->send_partner_application_notification([
                'establecimiento' => $establecimiento,
                'tipo_propiedad' => $tipo_propiedad,
                'direccion' => $direccion,
                'website' => $website,
                'nombre_apellidos' => $nombre_apellidos,
                'cargo' => $cargo,
                'telefono' => $telefono,
                'email' => $email,
                'motivacion' => $motivacion,
                'idioma' => $idioma,
                'application_id' => $post_id
            ]);

            // 2. Send confirmation email to applicant
            $confirmation_email_sent = $email_handler->send_partner_confirmation([
                'establecimiento' => $establecimiento,
                'nombre_apellidos' => $nombre_apellidos,
                'email' => $email,
                'idioma' => $idioma
            ]);

            if (!$internal_email_sent) {
                error_log('SAUWA: Failed to send partner internal email for ID: ' . $post_id);
            }

            if (!$confirmation_email_sent) {
                error_log('SAUWA: Failed to send partner confirmation email for ID: ' . $post_id);
            }

            return [
                'success' => true,
                'message' => __('Tu solicitud ha sido recibida. Te contactaremos en 48-72 horas.', 'sauwa-applications'),
                'applicationId' => (string) $post_id
            ];

        } catch (Exception $e) {
            error_log('SAUWA Partner Application Error: ' . $e->getMessage());

            return [
                'success' => false,
                'message' => $e->getMessage(),
                'applicationId' => null
            ];
        }
    }

    /**
     * Get client IP address
     */
    private static function get_client_ip() {
        $ip_keys = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];

        foreach ($ip_keys as $key) {
            if (array_key_exists($key, $_SERVER) === true) {
                $ips = explode(',', $_SERVER[$key]);
                foreach ($ips as $ip) {
                    $ip = trim($ip);

                    if (filter_var($ip, FILTER_VALIDATE_IP,
                        FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                        return $ip;
                    }
                }
            }
        }

        return isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '0.0.0.0';
    }
}