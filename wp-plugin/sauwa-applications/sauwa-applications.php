<?php
/**
 * Plugin Name: SAUWA Applications Manager
 * Plugin URI: https://sauwasauna.com
 * Description: Gestión de aplicaciones de empleo y solicitudes de partners para SAUWA
 * Version: 1.0.0
 * Author: SAUWA Development Team
 * Author URI: https://sauwasauna.com
 * License: GPL v2 or later
 * Text Domain: sauwa-applications
 * Domain Path: /languages
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('SAUWA_APPLICATIONS_VERSION', '1.0.0');
define('SAUWA_APPLICATIONS_PATH', plugin_dir_path(__FILE__));
define('SAUWA_APPLICATIONS_URL', plugin_dir_url(__FILE__));

// Load required files
require_once SAUWA_APPLICATIONS_PATH . 'includes/class-post-types.php';
require_once SAUWA_APPLICATIONS_PATH . 'includes/class-acf-fields.php';
require_once SAUWA_APPLICATIONS_PATH . 'includes/class-graphql-mutations.php';
require_once SAUWA_APPLICATIONS_PATH . 'includes/class-email-handler.php';
require_once SAUWA_APPLICATIONS_PATH . 'includes/class-file-handler.php';

/**
 * Main plugin class
 */
class SAUWA_Applications {

    /**
     * Instance of this class
     */
    private static $instance = null;

    /**
     * Get instance of this class
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     */
    private function __construct() {
        $this->init_hooks();
    }

    /**
     * Initialize hooks
     */
    private function init_hooks() {
        // Activation/Deactivation hooks
        register_activation_hook(__FILE__, [$this, 'activate']);
        register_deactivation_hook(__FILE__, [$this, 'deactivate']);

        // Initialize components
        add_action('init', [$this, 'init_components']);

        // Check dependencies
        add_action('admin_notices', [$this, 'check_dependencies']);
    }

    /**
     * Initialize plugin components
     */
    public function init_components() {
        // Register post types
        SAUWA_Post_Types::init();

        // Register ACF fields if ACF is active
        if (class_exists('ACF')) {
            SAUWA_ACF_Fields::init();
        }

        // Register GraphQL mutations if WPGraphQL is active
        if (class_exists('WPGraphQL')) {
            SAUWA_GraphQL_Mutations::init();
        }

        // Initialize email handler
        SAUWA_Email_Handler::init();

        // Initialize file handler
        SAUWA_File_Handler::init();
    }

    /**
     * Check plugin dependencies
     */
    public function check_dependencies() {
        $missing_dependencies = [];

        if (!class_exists('ACF')) {
            $missing_dependencies[] = 'Advanced Custom Fields PRO';
        }

        if (!class_exists('WPGraphQL')) {
            $missing_dependencies[] = 'WPGraphQL';
        }

        if (!empty($missing_dependencies)) {
            $message = sprintf(
                __('SAUWA Applications Manager requiere los siguientes plugins: %s', 'sauwa-applications'),
                implode(', ', $missing_dependencies)
            );

            echo '<div class="notice notice-error"><p>' . esc_html($message) . '</p></div>';
        }
    }

    /**
     * Plugin activation
     */
    public function activate() {
        // Create upload directory for CVs
        $upload_dir = wp_upload_dir();
        $cv_dir = $upload_dir['basedir'] . '/sauwa-cvs';

        if (!file_exists($cv_dir)) {
            wp_mkdir_p($cv_dir);

            // Add .htaccess for security
            $htaccess_content = "Options -Indexes\n";
            $htaccess_content .= "Order Deny,Allow\n";
            $htaccess_content .= "Deny from all\n";
            file_put_contents($cv_dir . '/.htaccess', $htaccess_content);
        }

        // Flush rewrite rules
        flush_rewrite_rules();
    }

    /**
     * Plugin deactivation
     */
    public function deactivate() {
        // Flush rewrite rules
        flush_rewrite_rules();
    }
}

// Initialize plugin
SAUWA_Applications::get_instance();