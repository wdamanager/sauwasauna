<?php
/**
 * Register Custom Post Types
 */

if (!defined('ABSPATH')) {
    exit;
}

class SAUWA_Post_Types {

    /**
     * Initialize post types
     */
    public static function init() {
        add_action('init', [__CLASS__, 'register_post_types']);
        add_action('init', [__CLASS__, 'register_post_statuses']);
        add_filter('manage_job_application_posts_columns', [__CLASS__, 'job_application_columns']);
        add_action('manage_job_application_posts_custom_column', [__CLASS__, 'job_application_column_content'], 10, 2);
        add_filter('manage_partner_application_posts_columns', [__CLASS__, 'partner_application_columns']);
        add_action('manage_partner_application_posts_custom_column', [__CLASS__, 'partner_application_column_content'], 10, 2);
    }

    /**
     * Register custom post types
     */
    public static function register_post_types() {
        // Job Applications CPT
        register_post_type('job_application', [
            'labels' => [
                'name'               => __('Aplicaciones Empleo', 'sauwa-applications'),
                'singular_name'      => __('Aplicación', 'sauwa-applications'),
                'menu_name'          => __('Aplicaciones Empleo', 'sauwa-applications'),
                'name_admin_bar'     => __('Aplicación', 'sauwa-applications'),
                'add_new'            => __('Añadir Nueva', 'sauwa-applications'),
                'add_new_item'       => __('Añadir Nueva Aplicación', 'sauwa-applications'),
                'new_item'           => __('Nueva Aplicación', 'sauwa-applications'),
                'edit_item'          => __('Editar Aplicación', 'sauwa-applications'),
                'view_item'          => __('Ver Aplicación', 'sauwa-applications'),
                'all_items'          => __('Todas las Aplicaciones', 'sauwa-applications'),
                'search_items'       => __('Buscar Aplicaciones', 'sauwa-applications'),
                'not_found'          => __('No se encontraron aplicaciones', 'sauwa-applications'),
                'not_found_in_trash' => __('No se encontraron aplicaciones en la papelera', 'sauwa-applications')
            ],
            'public'              => false,
            'publicly_queryable'  => false,
            'show_ui'             => true,
            'show_in_menu'        => true,
            'query_var'           => false,
            'rewrite'             => false,
            'capability_type'     => 'post',
            'has_archive'         => false,
            'hierarchical'        => false,
            'menu_position'       => 25,
            'menu_icon'           => 'dashicons-id',
            'supports'            => ['title', 'custom-fields'],
            'show_in_rest'        => false,
            'show_in_graphql'     => true,
            'graphql_single_name' => 'jobApplication',
            'graphql_plural_name' => 'jobApplications'
        ]);

        // Partner Applications CPT
        register_post_type('partner_application', [
            'labels' => [
                'name'               => __('Solicitudes Partners', 'sauwa-applications'),
                'singular_name'      => __('Solicitud Partner', 'sauwa-applications'),
                'menu_name'          => __('Solicitudes Partners', 'sauwa-applications'),
                'name_admin_bar'     => __('Solicitud Partner', 'sauwa-applications'),
                'add_new'            => __('Añadir Nueva', 'sauwa-applications'),
                'add_new_item'       => __('Añadir Nueva Solicitud', 'sauwa-applications'),
                'new_item'           => __('Nueva Solicitud', 'sauwa-applications'),
                'edit_item'          => __('Editar Solicitud', 'sauwa-applications'),
                'view_item'          => __('Ver Solicitud', 'sauwa-applications'),
                'all_items'          => __('Todas las Solicitudes', 'sauwa-applications'),
                'search_items'       => __('Buscar Solicitudes', 'sauwa-applications'),
                'not_found'          => __('No se encontraron solicitudes', 'sauwa-applications'),
                'not_found_in_trash' => __('No se encontraron solicitudes en la papelera', 'sauwa-applications')
            ],
            'public'              => false,
            'publicly_queryable'  => false,
            'show_ui'             => true,
            'show_in_menu'        => true,
            'query_var'           => false,
            'rewrite'             => false,
            'capability_type'     => 'post',
            'has_archive'         => false,
            'hierarchical'        => false,
            'menu_position'       => 26,
            'menu_icon'           => 'dashicons-businessman',
            'supports'            => ['title', 'custom-fields'],
            'show_in_rest'        => false,
            'show_in_graphql'     => true,
            'graphql_single_name' => 'partnerApplication',
            'graphql_plural_name' => 'partnerApplications'
        ]);
    }

    /**
     * Register custom post statuses
     */
    public static function register_post_statuses() {
        // Status for job applications
        $job_statuses = [
            'nueva'      => __('Nueva', 'sauwa-applications'),
            'revisada'   => __('Revisada', 'sauwa-applications'),
            'entrevista' => __('Entrevista', 'sauwa-applications'),
            'aceptada'   => __('Aceptada', 'sauwa-applications'),
            'rechazada'  => __('Rechazada', 'sauwa-applications')
        ];

        foreach ($job_statuses as $status_key => $status_label) {
            register_post_status('job_' . $status_key, [
                'label'                     => $status_label,
                'public'                    => false,
                'internal'                  => true,
                'exclude_from_search'       => true,
                'show_in_admin_all_list'    => true,
                'show_in_admin_status_list' => true,
                'label_count'               => _n_noop(
                    $status_label . ' <span class="count">(%s)</span>',
                    $status_label . ' <span class="count">(%s)</span>',
                    'sauwa-applications'
                )
            ]);
        }

        // Status for partner applications
        $partner_statuses = [
            'nueva'     => __('Nueva', 'sauwa-applications'),
            'revisada'  => __('Revisada', 'sauwa-applications'),
            'aprobada'  => __('Aprobada', 'sauwa-applications'),
            'rechazada' => __('Rechazada', 'sauwa-applications')
        ];

        foreach ($partner_statuses as $status_key => $status_label) {
            register_post_status('partner_' . $status_key, [
                'label'                     => $status_label,
                'public'                    => false,
                'internal'                  => true,
                'exclude_from_search'       => true,
                'show_in_admin_all_list'    => true,
                'show_in_admin_status_list' => true,
                'label_count'               => _n_noop(
                    $status_label . ' <span class="count">(%s)</span>',
                    $status_label . ' <span class="count">(%s)</span>',
                    'sauwa-applications'
                )
            ]);
        }
    }

    /**
     * Customize job application columns
     */
    public static function job_application_columns($columns) {
        $new_columns = [
            'cb'        => $columns['cb'],
            'title'     => __('Candidato', 'sauwa-applications'),
            'email'     => __('Email', 'sauwa-applications'),
            'telefono'  => __('Teléfono', 'sauwa-applications'),
            'edad'      => __('Edad', 'sauwa-applications'),
            'cv'        => __('CV', 'sauwa-applications'),
            'estado'    => __('Estado', 'sauwa-applications'),
            'date'      => __('Fecha', 'sauwa-applications')
        ];
        return $new_columns;
    }

    /**
     * Job application column content
     */
    public static function job_application_column_content($column, $post_id) {
        switch ($column) {
            case 'email':
                $email = get_field('email', $post_id);
                echo $email ? '<a href="mailto:' . esc_attr($email) . '">' . esc_html($email) . '</a>' : '-';
                break;

            case 'telefono':
                $telefono = get_field('telefono', $post_id);
                echo $telefono ? esc_html($telefono) : '-';
                break;

            case 'edad':
                $edad = get_field('edad', $post_id);
                echo $edad ? esc_html($edad) . ' años' : '-';
                break;

            case 'cv':
                $cv_url = get_field('cv_url', $post_id);
                if ($cv_url) {
                    echo '<a href="' . esc_url($cv_url) . '" target="_blank" class="button button-small">Ver CV</a>';
                } else {
                    echo '-';
                }
                break;

            case 'estado':
                $estado = get_field('estado', $post_id);
                $estado_class = sanitize_html_class($estado);
                echo '<span class="status-badge status-' . $estado_class . '">' . esc_html($estado) . '</span>';
                break;
        }
    }

    /**
     * Customize partner application columns
     */
    public static function partner_application_columns($columns) {
        $new_columns = [
            'cb'              => $columns['cb'],
            'title'           => __('Establecimiento', 'sauwa-applications'),
            'tipo_propiedad'  => __('Tipo', 'sauwa-applications'),
            'contacto'        => __('Contacto', 'sauwa-applications'),
            'email'           => __('Email', 'sauwa-applications'),
            'website'         => __('Website', 'sauwa-applications'),
            'estado'          => __('Estado', 'sauwa-applications'),
            'date'            => __('Fecha', 'sauwa-applications')
        ];
        return $new_columns;
    }

    /**
     * Partner application column content
     */
    public static function partner_application_column_content($column, $post_id) {
        switch ($column) {
            case 'tipo_propiedad':
                $tipo = get_field('tipo_propiedad', $post_id);
                echo $tipo ? esc_html($tipo) : '-';
                break;

            case 'contacto':
                $nombre = get_field('nombre_apellidos', $post_id);
                $cargo = get_field('cargo', $post_id);
                echo $nombre ? esc_html($nombre) : '-';
                if ($cargo) {
                    echo '<br><small>' . esc_html($cargo) . '</small>';
                }
                break;

            case 'email':
                $email = get_field('email', $post_id);
                echo $email ? '<a href="mailto:' . esc_attr($email) . '">' . esc_html($email) . '</a>' : '-';
                break;

            case 'website':
                $website = get_field('website', $post_id);
                if ($website) {
                    echo '<a href="' . esc_url($website) . '" target="_blank">Ver sitio</a>';
                } else {
                    echo '-';
                }
                break;

            case 'estado':
                $estado = get_field('estado', $post_id);
                $estado_class = sanitize_html_class($estado);
                echo '<span class="status-badge status-' . $estado_class . '">' . esc_html($estado) . '</span>';
                break;
        }
    }
}