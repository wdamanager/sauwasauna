<?php
/**
 * Plugin Name: SAUWA Dynamic Sitemap
 * Plugin URI: https://sauwasauna.com
 * Description: Generates dynamic sitemap.xml with frontend URLs for multilingual Astro site
 * Version: 1.0.0
 * Author: SAUWA Development Team
 * Author URI: https://sauwasauna.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: sauwa-sitemap
 * Domain Path: /languages
 *
 * @package SAUWA_Dynamic_Sitemap
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

/**
 * Main plugin class
 */
class SAUWA_Dynamic_Sitemap {

  /**
   * Frontend domain
   */
  const FRONTEND_DOMAIN = 'https://sauwasauna.com';

  /**
   * Available locales
   */
  const LOCALES = array( 'es', 'ca', 'en', 'fr' );

  /**
   * Static pages configuration
   */
  const STATIC_PAGES = array(
    array(
      'slug'       => '',
      'priority'   => '1.0',
      'changefreq' => 'daily',
    ),
    array(
      'slug'       => 'guia-sauwa-sauna',
      'priority'   => '0.9',
      'changefreq' => 'weekly',
    ),
    array(
      'slug'       => 'trabaja-con-nosotros',
      'priority'   => '0.8',
      'changefreq' => 'monthly',
    ),
    array(
      'slug'       => 'partners-hoteleros',
      'priority'   => '0.8',
      'changefreq' => 'monthly',
    ),
    array(
      'slug'       => 'aviso-legal',
      'priority'   => '0.5',
      'changefreq' => 'yearly',
    ),
    array(
      'slug'       => 'politica-de-privacidad',
      'priority'   => '0.5',
      'changefreq' => 'yearly',
    ),
    array(
      'slug'       => 'politica-de-cookies',
      'priority'   => '0.5',
      'changefreq' => 'yearly',
    ),
  );

  /**
   * Transient cache key
   */
  const CACHE_KEY = 'sauwa_sitemap_xml';

  /**
   * Cache duration (1 hour)
   */
  const CACHE_DURATION = 3600;

  /**
   * Instance of this class
   */
  private static $instance = null;

  /**
   * Get singleton instance
   */
  public static function get_instance() {
    if ( null === self::$instance ) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  /**
   * Constructor
   */
  private function __construct() {
    // Register activation/deactivation hooks
    register_activation_hook( __FILE__, array( $this, 'activate' ) );
    register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );

    // Initialize plugin
    add_action( 'init', array( $this, 'register_rewrite_rules' ) );
    add_action( 'template_redirect', array( $this, 'handle_sitemap_request' ) );

    // Clear cache when posts are published/updated
    add_action( 'save_post', array( $this, 'clear_cache' ) );
    add_action( 'delete_post', array( $this, 'clear_cache' ) );
    add_action( 'transition_post_status', array( $this, 'clear_cache_on_status_change' ), 10, 3 );

    // Add admin menu
    add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
    add_action( 'admin_init', array( $this, 'register_settings' ) );
  }

  /**
   * Plugin activation
   */
  public function activate() {
    $this->register_rewrite_rules();
    flush_rewrite_rules();
    $this->clear_cache();
  }

  /**
   * Plugin deactivation
   */
  public function deactivate() {
    flush_rewrite_rules();
    $this->clear_cache();
  }

  /**
   * Register custom rewrite rules
   */
  public function register_rewrite_rules() {
    add_rewrite_rule(
      '^sitemap\.xml$',
      'index.php?sauwa_sitemap=1',
      'top'
    );
    add_filter( 'query_vars', array( $this, 'add_query_vars' ) );
  }

  /**
   * Add custom query vars
   */
  public function add_query_vars( $vars ) {
    $vars[] = 'sauwa_sitemap';
    return $vars;
  }

  /**
   * Handle sitemap requests
   */
  public function handle_sitemap_request() {
    global $wp_query;

    if ( ! isset( $wp_query->query_vars['sauwa_sitemap'] ) ) {
      return;
    }

    // Try to get cached version
    $sitemap_xml = get_transient( self::CACHE_KEY );

    if ( false === $sitemap_xml ) {
      // Generate fresh sitemap
      $sitemap_xml = $this->generate_sitemap();

      // Cache for 1 hour
      set_transient( self::CACHE_KEY, $sitemap_xml, self::CACHE_DURATION );
    }

    // Set proper headers
    header( 'Content-Type: application/xml; charset=utf-8' );
    header( 'Cache-Control: public, max-age=' . self::CACHE_DURATION );
    header( 'X-Robots-Tag: noindex' );

    // Output sitemap
    echo $sitemap_xml;
    exit;
  }

  /**
   * Generate sitemap XML
   */
  private function generate_sitemap() {
    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

    // Add static pages
    $xml .= $this->generate_static_pages_xml();

    // Add dynamic blog posts
    $xml .= $this->generate_blog_posts_xml();

    $xml .= '</urlset>';

    return $xml;
  }

  /**
   * Generate XML for static pages
   */
  private function generate_static_pages_xml() {
    $xml = '';

    foreach ( self::STATIC_PAGES as $page ) {
      foreach ( self::LOCALES as $locale ) {
        $url = self::FRONTEND_DOMAIN . '/' . $locale . '/';

        if ( ! empty( $page['slug'] ) ) {
          $url .= $page['slug'] . '/';
        }

        $xml .= '  <url>' . "\n";
        $xml .= '    <loc>' . esc_url( $url ) . '</loc>' . "\n";
        $xml .= '    <lastmod>' . date( 'Y-m-d' ) . '</lastmod>' . "\n";
        $xml .= '    <changefreq>' . esc_xml( $page['changefreq'] ) . '</changefreq>' . "\n";
        $xml .= '    <priority>' . esc_xml( $page['priority'] ) . '</priority>' . "\n";
        $xml .= '  </url>' . "\n";
      }
    }

    return $xml;
  }

  /**
   * Generate XML for blog posts
   */
  private function generate_blog_posts_xml() {
    $xml = '';

    // Query all published posts
    $posts = $this->get_published_posts();

    if ( empty( $posts ) ) {
      return $xml;
    }

    foreach ( $posts as $post ) {
      // Skip posts with noindex meta
      if ( $this->is_noindex( $post->ID ) ) {
        continue;
      }

      // Get post modified date
      $lastmod = get_post_modified_time( 'Y-m-d', false, $post->ID );

      foreach ( self::LOCALES as $locale ) {
        $url = self::FRONTEND_DOMAIN . '/' . $locale . '/guia-sauwa-sauna/' . $post->post_name . '/';

        $xml .= '  <url>' . "\n";
        $xml .= '    <loc>' . esc_url( $url ) . '</loc>' . "\n";
        $xml .= '    <lastmod>' . esc_xml( $lastmod ) . '</lastmod>' . "\n";
        $xml .= '    <changefreq>weekly</changefreq>' . "\n";
        $xml .= '    <priority>0.7</priority>' . "\n";
        $xml .= '  </url>' . "\n";
      }
    }

    return $xml;
  }

  /**
   * Get all published posts
   */
  private function get_published_posts() {
    $args = array(
      'post_type'      => 'post',
      'post_status'    => 'publish',
      'posts_per_page' => -1,
      'orderby'        => 'modified',
      'order'          => 'DESC',
      'no_found_rows'  => true,
      'fields'         => array( 'ID', 'post_name', 'post_modified' ),
    );

    $query = new WP_Query( $args );
    return $query->posts;
  }

  /**
   * Check if post has noindex meta (Yoast SEO)
   */
  private function is_noindex( $post_id ) {
    // Check Yoast SEO meta
    $yoast_noindex = get_post_meta( $post_id, '_yoast_wpseo_meta-robots-noindex', true );

    if ( '1' === $yoast_noindex || 'noindex' === $yoast_noindex ) {
      return true;
    }

    // Check RankMath meta
    $rankmath_robots = get_post_meta( $post_id, 'rank_math_robots', true );
    if ( is_array( $rankmath_robots ) && in_array( 'noindex', $rankmath_robots, true ) ) {
      return true;
    }

    return false;
  }

  /**
   * Clear sitemap cache
   */
  public function clear_cache() {
    delete_transient( self::CACHE_KEY );
  }

  /**
   * Clear cache when post status changes
   */
  public function clear_cache_on_status_change( $new_status, $old_status, $post ) {
    if ( 'post' !== $post->post_type ) {
      return;
    }

    if ( 'publish' === $new_status || 'publish' === $old_status ) {
      $this->clear_cache();
    }
  }

  /**
   * Add admin menu
   */
  public function add_admin_menu() {
    add_options_page(
      __( 'SAUWA Sitemap Settings', 'sauwa-sitemap' ),
      __( 'SAUWA Sitemap', 'sauwa-sitemap' ),
      'manage_options',
      'sauwa-sitemap',
      array( $this, 'render_admin_page' )
    );
  }

  /**
   * Register settings
   */
  public function register_settings() {
    register_setting( 'sauwa_sitemap_settings', 'sauwa_sitemap_options' );
  }

  /**
   * Render admin page
   */
  public function render_admin_page() {
    if ( ! current_user_can( 'manage_options' ) ) {
      return;
    }

    // Handle manual cache clear
    if ( isset( $_POST['clear_cache'] ) && check_admin_referer( 'sauwa_clear_cache' ) ) {
      $this->clear_cache();
      echo '<div class="notice notice-success"><p>' . __( 'Sitemap cache cleared successfully!', 'sauwa-sitemap' ) . '</p></div>';
    }

    $sitemap_url = self::FRONTEND_DOMAIN . '/sitemap.xml';
    $posts_count = wp_count_posts( 'post' )->publish;
    $total_urls  = ( count( self::STATIC_PAGES ) * count( self::LOCALES ) ) + ( $posts_count * count( self::LOCALES ) );
    ?>
    <div class="wrap">
      <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>

      <div class="card">
        <h2><?php _e( 'Sitemap Information', 'sauwa-sitemap' ); ?></h2>
        <table class="form-table">
          <tr>
            <th><?php _e( 'Sitemap URL:', 'sauwa-sitemap' ); ?></th>
            <td>
              <a href="<?php echo esc_url( $sitemap_url ); ?>" target="_blank">
                <?php echo esc_url( $sitemap_url ); ?>
              </a>
            </td>
          </tr>
          <tr>
            <th><?php _e( 'Total URLs:', 'sauwa-sitemap' ); ?></th>
            <td>
              <?php echo esc_html( $total_urls ); ?>
              (<?php echo esc_html( count( self::STATIC_PAGES ) * count( self::LOCALES ) ); ?> static +
              <?php echo esc_html( $posts_count * count( self::LOCALES ) ); ?> blog posts)
            </td>
          </tr>
          <tr>
            <th><?php _e( 'Languages:', 'sauwa-sitemap' ); ?></th>
            <td><?php echo esc_html( implode( ', ', self::LOCALES ) ); ?></td>
          </tr>
          <tr>
            <th><?php _e( 'Cache Duration:', 'sauwa-sitemap' ); ?></th>
            <td><?php echo esc_html( self::CACHE_DURATION / 60 ); ?> <?php _e( 'minutes', 'sauwa-sitemap' ); ?></td>
          </tr>
          <tr>
            <th><?php _e( 'Cache Status:', 'sauwa-sitemap' ); ?></th>
            <td>
              <?php
              $cached = get_transient( self::CACHE_KEY );
              if ( false !== $cached ) {
                echo '<span style="color: green;">✓ ' . __( 'Cached', 'sauwa-sitemap' ) . '</span>';
              } else {
                echo '<span style="color: orange;">○ ' . __( 'Not cached', 'sauwa-sitemap' ) . '</span>';
              }
              ?>
            </td>
          </tr>
        </table>
      </div>

      <div class="card">
        <h2><?php _e( 'Cache Management', 'sauwa-sitemap' ); ?></h2>
        <p><?php _e( 'The sitemap is automatically cached for 1 hour and cleared when posts are published, updated, or deleted.', 'sauwa-sitemap' ); ?></p>
        <form method="post">
          <?php wp_nonce_field( 'sauwa_clear_cache' ); ?>
          <button type="submit" name="clear_cache" class="button button-secondary">
            <?php _e( 'Clear Cache Now', 'sauwa-sitemap' ); ?>
          </button>
        </form>
      </div>

      <div class="card">
        <h2><?php _e( 'robots.txt Configuration', 'sauwa-sitemap' ); ?></h2>
        <p><?php _e( 'Add this line to your robots.txt file:', 'sauwa-sitemap' ); ?></p>
        <pre style="background: #f5f5f5; padding: 10px; border-left: 3px solid #0073aa;">Sitemap: <?php echo esc_url( $sitemap_url ); ?></pre>
        <p>
          <a href="<?php echo admin_url( 'options-reading.php' ); ?>" class="button button-secondary">
            <?php _e( 'Edit robots.txt (if using virtual robots.txt)', 'sauwa-sitemap' ); ?>
          </a>
        </p>
      </div>

      <div class="card">
        <h2><?php _e( 'Static Pages Configuration', 'sauwa-sitemap' ); ?></h2>
        <table class="wp-list-table widefat fixed striped">
          <thead>
            <tr>
              <th><?php _e( 'Page', 'sauwa-sitemap' ); ?></th>
              <th><?php _e( 'Priority', 'sauwa-sitemap' ); ?></th>
              <th><?php _e( 'Change Frequency', 'sauwa-sitemap' ); ?></th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ( self::STATIC_PAGES as $page ) : ?>
              <tr>
                <td><?php echo esc_html( empty( $page['slug'] ) ? 'Homepage' : $page['slug'] ); ?></td>
                <td><?php echo esc_html( $page['priority'] ); ?></td>
                <td><?php echo esc_html( $page['changefreq'] ); ?></td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>
    <?php
  }
}

// Initialize plugin
SAUWA_Dynamic_Sitemap::get_instance();
