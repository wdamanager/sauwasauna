<?php
/**
 * File Handler for CV uploads
 */

if (!defined('ABSPATH')) {
    exit;
}

class SAUWA_File_Handler {

    /**
     * Initialize file handler
     */
    public static function init() {
        // Add any initialization if needed
    }

    /**
     * Upload CV from base64 data
     */
    public function upload_cv_from_base64($base64_data, $filename, $email) {
        try {
            // Remove data URI prefix if present
            $base64_data = preg_replace('/^data:[^;]+;base64,/', '', $base64_data);

            // Decode base64
            $file_data = base64_decode($base64_data);

            if ($file_data === false) {
                throw new Exception(__('Error al procesar el archivo', 'sauwa-applications'));
            }

            // Validate file size (max 5MB)
            $file_size = strlen($file_data);
            $max_size = 5 * 1024 * 1024; // 5MB in bytes

            if ($file_size > $max_size) {
                throw new Exception(__('El archivo no puede superar los 5MB', 'sauwa-applications'));
            }

            // Validate file type (must be PDF)
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime_type = finfo_buffer($finfo, $file_data);
            finfo_close($finfo);

            if ($mime_type !== 'application/pdf') {
                throw new Exception(__('El archivo debe ser un PDF', 'sauwa-applications'));
            }

            // Sanitize filename
            $filename = sanitize_file_name($filename);
            if (empty($filename)) {
                $filename = 'cv.pdf';
            }

            // Ensure .pdf extension
            if (!preg_match('/\.pdf$/i', $filename)) {
                $filename .= '.pdf';
            }

            // Generate unique filename
            $email_hash = substr(md5($email), 0, 8);
            $timestamp = date('Ymd_His');
            $unique_filename = sprintf('cv_%s_%s_%s', $email_hash, $timestamp, $filename);

            // Get WordPress upload directory
            $upload_dir = wp_upload_dir();
            $cv_dir = $upload_dir['basedir'] . '/sauwa-cvs/' . date('Y/m');
            $cv_url_base = $upload_dir['baseurl'] . '/sauwa-cvs/' . date('Y/m');

            // Create directory if it doesn't exist
            if (!file_exists($cv_dir)) {
                wp_mkdir_p($cv_dir);
            }

            // Full file path
            $file_path = $cv_dir . '/' . $unique_filename;

            // Save file
            $bytes_written = file_put_contents($file_path, $file_data);

            if ($bytes_written === false) {
                throw new Exception(__('Error al guardar el archivo', 'sauwa-applications'));
            }

            // Create attachment in Media Library
            $attachment_data = [
                'guid'           => $cv_url_base . '/' . $unique_filename,
                'post_mime_type' => 'application/pdf',
                'post_title'     => sprintf('CV - %s - %s', $email, date('d/m/Y')),
                'post_content'   => '',
                'post_status'    => 'private'
            ];

            // Insert attachment
            $attachment_id = wp_insert_attachment($attachment_data, $file_path);

            if (is_wp_error($attachment_id)) {
                // Clean up file if attachment creation failed
                @unlink($file_path);
                throw new Exception(__('Error al registrar el archivo', 'sauwa-applications'));
            }

            // Generate attachment metadata
            require_once(ABSPATH . 'wp-admin/includes/image.php');
            $attachment_metadata = wp_generate_attachment_metadata($attachment_id, $file_path);
            wp_update_attachment_metadata($attachment_id, $attachment_metadata);

            // Get the attachment URL
            $attachment_url = wp_get_attachment_url($attachment_id);

            return [
                'success' => true,
                'url' => $attachment_url,
                'attachment_id' => $attachment_id,
                'filename' => $unique_filename,
                'message' => __('Archivo subido correctamente', 'sauwa-applications')
            ];

        } catch (Exception $e) {
            error_log('SAUWA CV Upload Error: ' . $e->getMessage());

            return [
                'success' => false,
                'url' => '',
                'attachment_id' => 0,
                'filename' => '',
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Delete CV file and attachment
     */
    public function delete_cv($attachment_id) {
        if (!$attachment_id) {
            return false;
        }

        // Delete attachment and file
        $deleted = wp_delete_attachment($attachment_id, true);

        return $deleted !== false;
    }

    /**
     * Clean up old CV files (older than 6 months)
     */
    public function cleanup_old_cvs() {
        // Get CVs older than 6 months
        $six_months_ago = date('Y-m-d', strtotime('-6 months'));

        $args = [
            'post_type'      => 'attachment',
            'post_status'    => 'private',
            'posts_per_page' => -1,
            'date_query'     => [
                [
                    'before' => $six_months_ago,
                    'inclusive' => false
                ]
            ],
            'meta_query'     => [
                [
                    'key'     => '_wp_attached_file',
                    'value'   => 'sauwa-cvs',
                    'compare' => 'LIKE'
                ]
            ]
        ];

        $old_cvs = get_posts($args);

        $deleted_count = 0;

        foreach ($old_cvs as $cv) {
            if (wp_delete_attachment($cv->ID, true)) {
                $deleted_count++;
            }
        }

        return $deleted_count;
    }

    /**
     * Get CV download URL with security
     */
    public function get_secure_cv_url($attachment_id) {
        // Generate a temporary download link with expiration
        $expiry = time() + (2 * HOUR_IN_SECONDS); // 2 hours expiry
        $key = wp_hash($attachment_id . $expiry . AUTH_SALT);

        $download_url = add_query_arg([
            'sauwa_cv_download' => 1,
            'attachment_id' => $attachment_id,
            'expiry' => $expiry,
            'key' => $key
        ], home_url());

        return $download_url;
    }

    /**
     * Handle secure CV download
     */
    public static function handle_cv_download() {
        if (!isset($_GET['sauwa_cv_download'])) {
            return;
        }

        $attachment_id = isset($_GET['attachment_id']) ? intval($_GET['attachment_id']) : 0;
        $expiry = isset($_GET['expiry']) ? intval($_GET['expiry']) : 0;
        $key = isset($_GET['key']) ? sanitize_text_field($_GET['key']) : '';

        // Verify key
        $expected_key = wp_hash($attachment_id . $expiry . AUTH_SALT);
        if ($key !== $expected_key) {
            wp_die(__('Link de descarga inválido', 'sauwa-applications'));
        }

        // Check expiry
        if (time() > $expiry) {
            wp_die(__('El link de descarga ha expirado', 'sauwa-applications'));
        }

        // Check user capabilities (only admins can download CVs)
        if (!current_user_can('manage_options')) {
            wp_die(__('No tienes permisos para descargar este archivo', 'sauwa-applications'));
        }

        // Get attachment
        $attachment = get_post($attachment_id);
        if (!$attachment || $attachment->post_type !== 'attachment') {
            wp_die(__('Archivo no encontrado', 'sauwa-applications'));
        }

        // Get file path
        $file_path = get_attached_file($attachment_id);
        if (!file_exists($file_path)) {
            wp_die(__('Archivo no encontrado', 'sauwa-applications'));
        }

        // Send file
        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename="' . basename($file_path) . '"');
        header('Content-Length: ' . filesize($file_path));
        header('Cache-Control: no-cache, no-store, must-revalidate');
        header('Pragma: no-cache');
        header('Expires: 0');

        readfile($file_path);
        exit;
    }
}

// Handle CV downloads
add_action('init', ['SAUWA_File_Handler', 'handle_cv_download']);