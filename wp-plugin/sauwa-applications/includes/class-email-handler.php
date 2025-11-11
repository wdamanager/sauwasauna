<?php
/**
 * Email Handler
 */

if (!defined('ABSPATH')) {
    exit;
}

class SAUWA_Email_Handler {

    /**
     * Initialize email handler
     */
    public static function init() {
        // Add any initialization if needed
    }

    /**
     * Send job application notification to HR
     */
    public function send_job_application_notification($data) {
        $to = get_option('sauwa_hr_email', 'rrhh@sauwasauna.com');
        $subject = sprintf('🎯 Nueva Aplicación Sauna Master: %s %s',
            $data['nombre'],
            $data['apellidos']
        );

        // Get language label
        $languages = [
            'es' => 'Español',
            'ca' => 'Català',
            'en' => 'English',
            'fr' => 'Français'
        ];
        $idioma_label = isset($languages[$data['idioma']]) ? $languages[$data['idioma']] : $data['idioma'];

        // Build email body
        $body = $this->get_email_template('job-application', [
            'nombre' => $data['nombre'],
            'apellidos' => $data['apellidos'],
            'email' => $data['email'],
            'telefono' => $data['telefono'],
            'edad' => $data['edad'],
            'motivacion' => $data['motivacion'],
            'cv_url' => $data['cv_url'],
            'idioma' => $idioma_label,
            'application_id' => $data['application_id'],
            'admin_url' => admin_url('post.php?post=' . $data['application_id'] . '&action=edit'),
            'fecha' => date_i18n('d/m/Y H:i')
        ]);

        $headers = [
            'Content-Type: text/html; charset=UTF-8',
            'From: SAUWA Sistema <noreply@sauwasauna.com>',
            'Reply-To: ' . $data['email']
        ];

        return wp_mail($to, $subject, $body, $headers);
    }

    /**
     * Send partner application notification to management
     */
    public function send_partner_application_notification($data) {
        $to = get_option('sauwa_partners_email', 'partners@sauwasauna.com');
        $subject = sprintf('🏨 Nueva Solicitud Partner: %s', $data['establecimiento']);

        // Get language label
        $languages = [
            'es' => 'Español',
            'ca' => 'Català',
            'en' => 'English',
            'fr' => 'Français'
        ];
        $idioma_label = isset($languages[$data['idioma']]) ? $languages[$data['idioma']] : $data['idioma'];

        // Build email body
        $body = $this->get_email_template('partner-application', [
            'establecimiento' => $data['establecimiento'],
            'tipo_propiedad' => $data['tipo_propiedad'],
            'direccion' => $data['direccion'],
            'website' => $data['website'],
            'nombre_apellidos' => $data['nombre_apellidos'],
            'cargo' => $data['cargo'],
            'telefono' => $data['telefono'],
            'email' => $data['email'],
            'motivacion' => $data['motivacion'],
            'idioma' => $idioma_label,
            'application_id' => $data['application_id'],
            'admin_url' => admin_url('post.php?post=' . $data['application_id'] . '&action=edit'),
            'fecha' => date_i18n('d/m/Y H:i')
        ]);

        $headers = [
            'Content-Type: text/html; charset=UTF-8',
            'From: SAUWA Partners <noreply@sauwasauna.com>',
            'Reply-To: ' . $data['email']
        ];

        return wp_mail($to, $subject, $body, $headers);
    }

    /**
     * Send partner confirmation email to applicant
     */
    public function send_partner_confirmation($data) {
        $to = $data['email'];

        // Subject based on language
        $subjects = [
            'es' => '✅ Solicitud recibida - SAUWA Acceso Exclusivo',
            'ca' => '✅ Sol·licitud rebuda - SAUWA Accés Exclusiu',
            'en' => '✅ Application received - SAUWA Exclusive Access',
            'fr' => '✅ Demande reçue - SAUWA Accès Exclusif'
        ];

        $subject = isset($subjects[$data['idioma']])
            ? $subjects[$data['idioma']]
            : $subjects['es'];

        // Build email body
        $body = $this->get_email_template('partner-confirmation-' . $data['idioma'], [
            'establecimiento' => $data['establecimiento'],
            'nombre_apellidos' => $data['nombre_apellidos']
        ]);

        $headers = [
            'Content-Type: text/html; charset=UTF-8',
            'From: SAUWA Partners <partners@sauwasauna.com>',
            'Reply-To: partners@sauwasauna.com'
        ];

        return wp_mail($to, $subject, $body, $headers);
    }

    /**
     * Get email template
     */
    private function get_email_template($template, $data = []) {
        $templates = [
            'job-application' => $this->get_job_application_template($data),
            'partner-application' => $this->get_partner_application_template($data),
            'partner-confirmation-es' => $this->get_partner_confirmation_template_es($data),
            'partner-confirmation-ca' => $this->get_partner_confirmation_template_ca($data),
            'partner-confirmation-en' => $this->get_partner_confirmation_template_en($data),
            'partner-confirmation-fr' => $this->get_partner_confirmation_template_fr($data)
        ];

        return isset($templates[$template]) ? $templates[$template] : '';
    }

    /**
     * Job application email template
     */
    private function get_job_application_template($data) {
        $html = '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nueva Aplicación - Sauna Master</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif; background-color: #f7f7f7;">
            <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Nueva Aplicación Recibida</h1>
                    <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">Candidato para Sauna Master</p>
                </div>

                <!-- Content -->
                <div style="padding: 40px 30px;">
                    <div style="background-color: #f0f4ff; border-left: 4px solid #667eea; padding: 15px 20px; margin-bottom: 30px; border-radius: 4px;">
                        <p style="margin: 0; color: #4c51bf; font-weight: 600;">📋 Aplicación ID: #' . $data['application_id'] . '</p>
                        <p style="margin: 5px 0 0 0; color: #718096; font-size: 14px;">Recibida el ' . $data['fecha'] . '</p>
                    </div>

                    <h2 style="color: #2d3748; font-size: 20px; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">👤 Datos del Candidato</h2>

                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                <strong style="color: #718096; display: inline-block; width: 140px;">Nombre:</strong>
                                <span style="color: #2d3748;">' . esc_html($data['nombre']) . ' ' . esc_html($data['apellidos']) . '</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                <strong style="color: #718096; display: inline-block; width: 140px;">Email:</strong>
                                <a href="mailto:' . esc_attr($data['email']) . '" style="color: #667eea; text-decoration: none;">' . esc_html($data['email']) . '</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                <strong style="color: #718096; display: inline-block; width: 140px;">Teléfono:</strong>
                                <span style="color: #2d3748;">' . esc_html($data['telefono']) . '</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                <strong style="color: #718096; display: inline-block; width: 140px;">Edad:</strong>
                                <span style="color: #2d3748;">' . esc_html($data['edad']) . ' años</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                <strong style="color: #718096; display: inline-block; width: 140px;">Idioma:</strong>
                                <span style="color: #2d3748;">' . esc_html($data['idioma']) . '</span>
                            </td>
                        </tr>
                    </table>

                    <h3 style="color: #2d3748; font-size: 18px; margin: 30px 0 15px 0;">💬 Motivación</h3>
                    <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                        <p style="margin: 0; color: #4a5568; line-height: 1.6;">' . nl2br(esc_html($data['motivacion'])) . '</p>
                    </div>';

        if (!empty($data['cv_url'])) {
            $html .= '
                    <div style="margin-top: 30px; text-align: center;">
                        <a href="' . esc_url($data['cv_url']) . '" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">📄 Ver Curriculum Vitae</a>
                    </div>';
        }

        $html .= '
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
                        <a href="' . esc_url($data['admin_url']) . '" style="display: inline-block; padding: 10px 25px; background-color: #48bb78; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500;">Ver en el Panel de Administración</a>
                    </div>
                </div>

                <!-- Footer -->
                <div style="background-color: #f7fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #718096; font-size: 12px;">Este es un email automático del sistema de SAUWA</p>
                    <p style="margin: 5px 0 0 0; color: #a0aec0; font-size: 12px;">© ' . date('Y') . ' SAUWA - Todos los derechos reservados</p>
                </div>
            </div>
        </body>
        </html>';

        return $html;
    }

    /**
     * Partner application email template
     */
    private function get_partner_application_template($data) {
        $html = '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nueva Solicitud Partner</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif; background-color: #f7f7f7;">
            <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Nueva Solicitud Partner</h1>
                    <p style="margin: 10px 0 0 0; color: #ffe0e6; font-size: 16px;">Programa Acceso Exclusivo</p>
                </div>

                <!-- Content -->
                <div style="padding: 40px 30px;">
                    <div style="background-color: #fff5f7; border-left: 4px solid #f5576c; padding: 15px 20px; margin-bottom: 30px; border-radius: 4px;">
                        <p style="margin: 0; color: #c53030; font-weight: 600;">🏨 Solicitud ID: #' . $data['application_id'] . '</p>
                        <p style="margin: 5px 0 0 0; color: #718096; font-size: 14px;">Recibida el ' . $data['fecha'] . '</p>
                    </div>

                    <h2 style="color: #2d3748; font-size: 20px; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">🏢 Datos del Establecimiento</h2>

                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                <strong style="color: #718096; display: inline-block; width: 140px;">Establecimiento:</strong>
                                <span style="color: #2d3748; font-weight: 600;">' . esc_html($data['establecimiento']) . '</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                <strong style="color: #718096; display: inline-block; width: 140px;">Tipo:</strong>
                                <span style="color: #2d3748;">' . esc_html($data['tipo_propiedad']) . '</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                <strong style="color: #718096; display: inline-block; width: 140px;">Dirección:</strong>
                                <span style="color: #2d3748;">' . esc_html($data['direccion']) . '</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                <strong style="color: #718096; display: inline-block; width: 140px;">Website:</strong>
                                <a href="' . esc_url($data['website']) . '" target="_blank" style="color: #f5576c; text-decoration: none;">' . esc_html($data['website']) . '</a>
                            </td>
                        </tr>
                    </table>

                    <h2 style="color: #2d3748; font-size: 20px; margin: 30px 0 20px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">👤 Datos del Contacto</h2>

                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                <strong style="color: #718096; display: inline-block; width: 140px;">Nombre:</strong>
                                <span style="color: #2d3748;">' . esc_html($data['nombre_apellidos']) . '</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                <strong style="color: #718096; display: inline-block; width: 140px;">Cargo:</strong>
                                <span style="color: #2d3748;">' . esc_html($data['cargo']) . '</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                <strong style="color: #718096; display: inline-block; width: 140px;">Email:</strong>
                                <a href="mailto:' . esc_attr($data['email']) . '" style="color: #f5576c; text-decoration: none;">' . esc_html($data['email']) . '</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                <strong style="color: #718096; display: inline-block; width: 140px;">Teléfono:</strong>
                                <span style="color: #2d3748;">' . esc_html($data['telefono']) . '</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                                <strong style="color: #718096; display: inline-block; width: 140px;">Idioma:</strong>
                                <span style="color: #2d3748;">' . esc_html($data['idioma']) . '</span>
                            </td>
                        </tr>
                    </table>

                    <h3 style="color: #2d3748; font-size: 18px; margin: 30px 0 15px 0;">💬 Motivación para ser Partner</h3>
                    <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                        <p style="margin: 0; color: #4a5568; line-height: 1.6;">' . nl2br(esc_html($data['motivacion'])) . '</p>
                    </div>

                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
                        <a href="' . esc_url($data['admin_url']) . '" style="display: inline-block; padding: 10px 25px; background-color: #48bb78; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500;">Ver en el Panel de Administración</a>
                    </div>
                </div>

                <!-- Footer -->
                <div style="background-color: #f7fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #718096; font-size: 12px;">Este es un email automático del sistema de SAUWA Partners</p>
                    <p style="margin: 5px 0 0 0; color: #a0aec0; font-size: 12px;">© ' . date('Y') . ' SAUWA - Todos los derechos reservados</p>
                </div>
            </div>
        </body>
        </html>';

        return $html;
    }

    /**
     * Partner confirmation template - Spanish
     */
    private function get_partner_confirmation_template_es($data) {
        return '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Solicitud Recibida - SAUWA</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif; background-color: #f7f7f7;">
            <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 600;">¡Solicitud Recibida!</h1>
                    <p style="margin: 15px 0 0 0; color: #e0e7ff; font-size: 18px;">Gracias por tu interés en SAUWA</p>
                </div>

                <!-- Content -->
                <div style="padding: 40px 30px;">
                    <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        Estimado/a <strong>' . esc_html($data['nombre_apellidos']) . '</strong>,
                    </p>

                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        Hemos recibido correctamente la solicitud de <strong>' . esc_html($data['establecimiento']) . '</strong> para formar parte del programa de Acceso Exclusivo SAUWA.
                    </p>

                    <div style="background-color: #f0f4ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
                        <h3 style="margin: 0 0 15px 0; color: #4c51bf; font-size: 18px;">📋 Próximos pasos:</h3>
                        <ul style="color: #4a5568; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                            <li>Nuestro equipo revisará tu solicitud detalladamente</li>
                            <li>Te contactaremos en un plazo de <strong>48-72 horas</strong></li>
                            <li>Si tu establecimiento cumple con nuestros criterios, programaremos una llamada para discutir los detalles</li>
                        </ul>
                    </div>

                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 25px 0;">
                        Mientras tanto, puedes visitar nuestra web para conocer más sobre nuestros servicios y la experiencia SAUWA.
                    </p>

                    <div style="text-align: center; margin: 35px 0;">
                        <a href="https://sauwasauna.com" style="display: inline-block; padding: 14px 35px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Visitar SAUWA</a>
                    </div>

                    <p style="color: #718096; font-size: 14px; line-height: 1.6; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                        Si tienes alguna pregunta urgente, no dudes en contactarnos en <a href="mailto:partners@sauwasauna.com" style="color: #667eea; text-decoration: none;">partners@sauwasauna.com</a>
                    </p>
                </div>

                <!-- Footer -->
                <div style="background-color: #f7fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #718096; font-size: 14px;">Saludos cordiales,<br><strong>El equipo de SAUWA</strong></p>
                    <p style="margin: 10px 0 0 0; color: #a0aec0; font-size: 12px;">© ' . date('Y') . ' SAUWA - Wellness reinventado</p>
                </div>
            </div>
        </body>
        </html>';
    }

    /**
     * Partner confirmation template - Catalan
     */
    private function get_partner_confirmation_template_ca($data) {
        return '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sol·licitud Rebuda - SAUWA</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif; background-color: #f7f7f7;">
            <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 600;">Sol·licitud Rebuda!</h1>
                    <p style="margin: 15px 0 0 0; color: #e0e7ff; font-size: 18px;">Gràcies pel teu interès en SAUWA</p>
                </div>

                <!-- Content -->
                <div style="padding: 40px 30px;">
                    <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        Benvolgut/da <strong>' . esc_html($data['nombre_apellidos']) . '</strong>,
                    </p>

                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        Hem rebut correctament la sol·licitud de <strong>' . esc_html($data['establecimiento']) . '</strong> per formar part del programa d\'Accés Exclusiu SAUWA.
                    </p>

                    <div style="background-color: #f0f4ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
                        <h3 style="margin: 0 0 15px 0; color: #4c51bf; font-size: 18px;">📋 Propers passos:</h3>
                        <ul style="color: #4a5568; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                            <li>El nostre equip revisarà la teva sol·licitud detalladament</li>
                            <li>Et contactarem en un termini de <strong>48-72 hores</strong></li>
                            <li>Si el teu establiment compleix amb els nostres criteris, programarem una trucada per discutir els detalls</li>
                        </ul>
                    </div>

                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 25px 0;">
                        Mentrestant, pots visitar la nostra web per conèixer més sobre els nostres serveis i l\'experiència SAUWA.
                    </p>

                    <div style="text-align: center; margin: 35px 0;">
                        <a href="https://sauwasauna.com" style="display: inline-block; padding: 14px 35px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Visitar SAUWA</a>
                    </div>

                    <p style="color: #718096; font-size: 14px; line-height: 1.6; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                        Si tens alguna pregunta urgent, no dubtis a contactar-nos a <a href="mailto:partners@sauwasauna.com" style="color: #667eea; text-decoration: none;">partners@sauwasauna.com</a>
                    </p>
                </div>

                <!-- Footer -->
                <div style="background-color: #f7fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #718096; font-size: 14px;">Salutacions cordials,<br><strong>L\'equip de SAUWA</strong></p>
                    <p style="margin: 10px 0 0 0; color: #a0aec0; font-size: 12px;">© ' . date('Y') . ' SAUWA - Wellness reinventat</p>
                </div>
            </div>
        </body>
        </html>';
    }

    /**
     * Partner confirmation template - English
     */
    private function get_partner_confirmation_template_en($data) {
        return '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Application Received - SAUWA</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif; background-color: #f7f7f7;">
            <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 600;">Application Received!</h1>
                    <p style="margin: 15px 0 0 0; color: #e0e7ff; font-size: 18px;">Thank you for your interest in SAUWA</p>
                </div>

                <!-- Content -->
                <div style="padding: 40px 30px;">
                    <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        Dear <strong>' . esc_html($data['nombre_apellidos']) . '</strong>,
                    </p>

                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        We have successfully received the application from <strong>' . esc_html($data['establecimiento']) . '</strong> to join the SAUWA Exclusive Access program.
                    </p>

                    <div style="background-color: #f0f4ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
                        <h3 style="margin: 0 0 15px 0; color: #4c51bf; font-size: 18px;">📋 Next steps:</h3>
                        <ul style="color: #4a5568; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                            <li>Our team will carefully review your application</li>
                            <li>We will contact you within <strong>48-72 hours</strong></li>
                            <li>If your establishment meets our criteria, we will schedule a call to discuss the details</li>
                        </ul>
                    </div>

                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 25px 0;">
                        Meanwhile, feel free to visit our website to learn more about our services and the SAUWA experience.
                    </p>

                    <div style="text-align: center; margin: 35px 0;">
                        <a href="https://sauwasauna.com" style="display: inline-block; padding: 14px 35px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Visit SAUWA</a>
                    </div>

                    <p style="color: #718096; font-size: 14px; line-height: 1.6; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                        If you have any urgent questions, please don\'t hesitate to contact us at <a href="mailto:partners@sauwasauna.com" style="color: #667eea; text-decoration: none;">partners@sauwasauna.com</a>
                    </p>
                </div>

                <!-- Footer -->
                <div style="background-color: #f7fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #718096; font-size: 14px;">Kind regards,<br><strong>The SAUWA Team</strong></p>
                    <p style="margin: 10px 0 0 0; color: #a0aec0; font-size: 12px;">© ' . date('Y') . ' SAUWA - Wellness reinvented</p>
                </div>
            </div>
        </body>
        </html>';
    }

    /**
     * Partner confirmation template - French
     */
    private function get_partner_confirmation_template_fr($data) {
        return '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Demande Reçue - SAUWA</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif; background-color: #f7f7f7;">
            <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 600;">Demande Reçue !</h1>
                    <p style="margin: 15px 0 0 0; color: #e0e7ff; font-size: 18px;">Merci de votre intérêt pour SAUWA</p>
                </div>

                <!-- Content -->
                <div style="padding: 40px 30px;">
                    <p style="color: #2d3748; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        Cher/Chère <strong>' . esc_html($data['nombre_apellidos']) . '</strong>,
                    </p>

                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        Nous avons bien reçu la demande de <strong>' . esc_html($data['establecimiento']) . '</strong> pour rejoindre le programme d\'Accès Exclusif SAUWA.
                    </p>

                    <div style="background-color: #f0f4ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
                        <h3 style="margin: 0 0 15px 0; color: #4c51bf; font-size: 18px;">📋 Prochaines étapes :</h3>
                        <ul style="color: #4a5568; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                            <li>Notre équipe examinera attentivement votre demande</li>
                            <li>Nous vous contacterons dans un délai de <strong>48-72 heures</strong></li>
                            <li>Si votre établissement répond à nos critères, nous programmerons un appel pour discuter des détails</li>
                        </ul>
                    </div>

                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 25px 0;">
                        En attendant, n\'hésitez pas à visiter notre site web pour en savoir plus sur nos services et l\'expérience SAUWA.
                    </p>

                    <div style="text-align: center; margin: 35px 0;">
                        <a href="https://sauwasauna.com" style="display: inline-block; padding: 14px 35px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Visiter SAUWA</a>
                    </div>

                    <p style="color: #718096; font-size: 14px; line-height: 1.6; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                        Si vous avez des questions urgentes, n\'hésitez pas à nous contacter à <a href="mailto:partners@sauwasauna.com" style="color: #667eea; text-decoration: none;">partners@sauwasauna.com</a>
                    </p>
                </div>

                <!-- Footer -->
                <div style="background-color: #f7fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #718096; font-size: 14px;">Cordialement,<br><strong>L\'équipe SAUWA</strong></p>
                    <p style="margin: 10px 0 0 0; color: #a0aec0; font-size: 12px;">© ' . date('Y') . ' SAUWA - Le bien-être réinventé</p>
                </div>
            </div>
        </body>
        </html>';
    }
}