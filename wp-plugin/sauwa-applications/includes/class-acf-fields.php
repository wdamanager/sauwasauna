<?php
/**
 * ACF Fields Registration
 */

if (!defined('ABSPATH')) {
    exit;
}

class SAUWA_ACF_Fields {

    /**
     * Initialize ACF fields
     */
    public static function init() {
        add_action('acf/init', [__CLASS__, 'register_field_groups']);
        add_action('admin_head', [__CLASS__, 'admin_styles']);
    }

    /**
     * Register ACF field groups
     */
    public static function register_field_groups() {
        // Job Application Fields
        if (function_exists('acf_add_local_field_group')) {
            acf_add_local_field_group([
                'key' => 'group_job_application',
                'title' => 'Datos Aplicación Empleo',
                'fields' => [
                    [
                        'key' => 'field_ja_nombre',
                        'label' => 'Nombre',
                        'name' => 'nombre',
                        'type' => 'text',
                        'required' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_ja_apellidos',
                        'label' => 'Apellidos',
                        'name' => 'apellidos',
                        'type' => 'text',
                        'required' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_ja_email',
                        'label' => 'Email',
                        'name' => 'email',
                        'type' => 'email',
                        'required' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_ja_telefono',
                        'label' => 'Teléfono',
                        'name' => 'telefono',
                        'type' => 'text',
                        'required' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_ja_edad',
                        'label' => 'Edad',
                        'name' => 'edad',
                        'type' => 'number',
                        'required' => 1,
                        'min' => 18,
                        'max' => 65,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_ja_motivacion',
                        'label' => 'Motivación',
                        'name' => 'motivacion',
                        'type' => 'textarea',
                        'required' => 1,
                        'maxlength' => 500,
                        'rows' => 4,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_ja_cv_url',
                        'label' => 'CV URL',
                        'name' => 'cv_url',
                        'type' => 'text',
                        'readonly' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_ja_cv_filename',
                        'label' => 'CV Nombre Archivo',
                        'name' => 'cv_filename',
                        'type' => 'text',
                        'readonly' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_ja_idioma',
                        'label' => 'Idioma',
                        'name' => 'idioma',
                        'type' => 'select',
                        'choices' => [
                            'es' => 'Español',
                            'ca' => 'Català',
                            'en' => 'English',
                            'fr' => 'Français'
                        ],
                        'default_value' => 'es',
                        'required' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_ja_fecha_aplicacion',
                        'label' => 'Fecha Aplicación',
                        'name' => 'fecha_aplicacion',
                        'type' => 'date_time_picker',
                        'display_format' => 'd/m/Y H:i',
                        'return_format' => 'Y-m-d H:i:s',
                        'first_day' => 1,
                        'readonly' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_ja_estado',
                        'label' => 'Estado',
                        'name' => 'estado',
                        'type' => 'select',
                        'choices' => [
                            'Nueva' => 'Nueva',
                            'Revisada' => 'Revisada',
                            'Entrevista' => 'Entrevista',
                            'Aceptada' => 'Aceptada',
                            'Rechazada' => 'Rechazada'
                        ],
                        'default_value' => 'Nueva',
                        'required' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_ja_ip_address',
                        'label' => 'Dirección IP',
                        'name' => 'ip_address',
                        'type' => 'text',
                        'readonly' => 1,
                        'show_in_graphql' => 0,
                    ],
                    [
                        'key' => 'field_ja_notas_internas',
                        'label' => 'Notas Internas',
                        'name' => 'notas_internas',
                        'type' => 'textarea',
                        'instructions' => 'Notas privadas sobre el candidato (no visibles en el frontend)',
                        'rows' => 4,
                        'show_in_graphql' => 0,
                    ]
                ],
                'location' => [
                    [
                        [
                            'param' => 'post_type',
                            'operator' => '==',
                            'value' => 'job_application'
                        ]
                    ]
                ],
                'menu_order' => 0,
                'position' => 'normal',
                'style' => 'default',
                'label_placement' => 'top',
                'instruction_placement' => 'label',
                'show_in_graphql' => 1,
                'graphql_field_name' => 'jobApplicationFields'
            ]);

            // Partner Application Fields
            acf_add_local_field_group([
                'key' => 'group_partner_application',
                'title' => 'Datos Solicitud Partner',
                'fields' => [
                    [
                        'key' => 'field_pa_establecimiento',
                        'label' => 'Establecimiento',
                        'name' => 'establecimiento',
                        'type' => 'text',
                        'required' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_pa_tipo_propiedad',
                        'label' => 'Tipo de Propiedad',
                        'name' => 'tipo_propiedad',
                        'type' => 'select',
                        'choices' => [
                            'Hotel' => 'Hotel',
                            'Glamping Premium' => 'Glamping Premium'
                        ],
                        'required' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_pa_direccion',
                        'label' => 'Dirección',
                        'name' => 'direccion',
                        'type' => 'text',
                        'required' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_pa_website',
                        'label' => 'Website',
                        'name' => 'website',
                        'type' => 'url',
                        'required' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_pa_nombre_apellidos',
                        'label' => 'Nombre y Apellidos',
                        'name' => 'nombre_apellidos',
                        'type' => 'text',
                        'required' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_pa_cargo',
                        'label' => 'Cargo',
                        'name' => 'cargo',
                        'type' => 'text',
                        'required' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_pa_telefono',
                        'label' => 'Teléfono',
                        'name' => 'telefono',
                        'type' => 'text',
                        'required' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_pa_email',
                        'label' => 'Email',
                        'name' => 'email',
                        'type' => 'email',
                        'required' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_pa_motivacion',
                        'label' => 'Motivación',
                        'name' => 'motivacion',
                        'type' => 'textarea',
                        'required' => 1,
                        'maxlength' => 500,
                        'rows' => 4,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_pa_idioma',
                        'label' => 'Idioma',
                        'name' => 'idioma',
                        'type' => 'select',
                        'choices' => [
                            'es' => 'Español',
                            'ca' => 'Català',
                            'en' => 'English',
                            'fr' => 'Français'
                        ],
                        'default_value' => 'es',
                        'required' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_pa_fecha_solicitud',
                        'label' => 'Fecha Solicitud',
                        'name' => 'fecha_solicitud',
                        'type' => 'date_time_picker',
                        'display_format' => 'd/m/Y H:i',
                        'return_format' => 'Y-m-d H:i:s',
                        'first_day' => 1,
                        'readonly' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_pa_estado',
                        'label' => 'Estado',
                        'name' => 'estado',
                        'type' => 'select',
                        'choices' => [
                            'Nueva' => 'Nueva',
                            'Revisada' => 'Revisada',
                            'Aprobada' => 'Aprobada',
                            'Rechazada' => 'Rechazada'
                        ],
                        'default_value' => 'Nueva',
                        'required' => 1,
                        'show_in_graphql' => 1,
                    ],
                    [
                        'key' => 'field_pa_ip_address',
                        'label' => 'Dirección IP',
                        'name' => 'ip_address',
                        'type' => 'text',
                        'readonly' => 1,
                        'show_in_graphql' => 0,
                    ],
                    [
                        'key' => 'field_pa_notas_internas',
                        'label' => 'Notas Internas',
                        'name' => 'notas_internas',
                        'type' => 'textarea',
                        'instructions' => 'Notas privadas sobre el partner (no visibles en el frontend)',
                        'rows' => 4,
                        'show_in_graphql' => 0,
                    ]
                ],
                'location' => [
                    [
                        [
                            'param' => 'post_type',
                            'operator' => '==',
                            'value' => 'partner_application'
                        ]
                    ]
                ],
                'menu_order' => 0,
                'position' => 'normal',
                'style' => 'default',
                'label_placement' => 'top',
                'instruction_placement' => 'label',
                'show_in_graphql' => 1,
                'graphql_field_name' => 'partnerApplicationFields'
            ]);
        }
    }

    /**
     * Admin styles for status badges
     */
    public static function admin_styles() {
        ?>
        <style>
            .status-badge {
                display: inline-block;
                padding: 3px 8px;
                border-radius: 3px;
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
            }
            .status-nueva { background: #f0f0f1; color: #50575e; }
            .status-revisada { background: #dcdcde; color: #2c3338; }
            .status-entrevista { background: #f0b849; color: #fff; }
            .status-aceptada { background: #00a32a; color: #fff; }
            .status-aprobada { background: #00a32a; color: #fff; }
            .status-rechazada { background: #d63638; color: #fff; }
        </style>
        <?php
    }
}