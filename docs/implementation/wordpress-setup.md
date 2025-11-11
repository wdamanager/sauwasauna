# WordPress Headless Setup Guide

## TL;DR

WordPress 6.4+ with WPGraphQL for headless CMS. ACF Pro for custom fields. Multi-language via WPML/Polylang. Custom post types for bookings, locations, sessions. GraphQL endpoint: `/graphql`.

## Requirements

- PHP 8.1+
- MySQL 8.0+ or MariaDB 10.5+
- WordPress 6.4+
- 256MB PHP memory limit
- mod_rewrite enabled

## Installation

### 1. WordPress Core

```bash
# Download WordPress
wget https://wordpress.org/latest.zip
unzip latest.zip
mv wordpress/* ./
rm -rf wordpress latest.zip

# Set permissions
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
chmod 600 wp-config.php
```

### 2. Database Configuration

```sql
CREATE DATABASE sauwa_wp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'sauwa_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON sauwa_wp.* TO 'sauwa_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. wp-config.php

```php
// Database
define('DB_NAME', 'sauwa_wp');
define('DB_USER', 'sauwa_user');
define('DB_PASSWORD', 'secure_password');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', 'utf8mb4_unicode_ci');

// Security
define('AUTH_KEY', 'generate-from-api.wordpress.org/secret-key/1.1/salt/');
define('SECURE_AUTH_KEY', '...');
define('LOGGED_IN_KEY', '...');
define('NONCE_KEY', '...');

// Performance
define('WP_MEMORY_LIMIT', '256M');
define('WP_MAX_MEMORY_LIMIT', '512M');
define('WP_CACHE', true);

// Headless
define('HEADLESS_MODE', true);
define('WP_SITEURL', 'https://backend.sauwasauna.com');
define('WP_HOME', 'https://backend.sauwasauna.com');

// GraphQL
define('GRAPHQL_JWT_AUTH_SECRET_KEY', 'your-secret-key');

// Debug (development only)
define('WP_DEBUG', false);
define('WP_DEBUG_LOG', false);
define('WP_DEBUG_DISPLAY', false);
```

## Required Plugins

### Core Plugins

| Plugin | Version | Purpose |
|--------|---------|---------|
| **WPGraphQL** | 1.19+ | GraphQL API |
| **ACF Pro** | 6.2+ | Custom fields |
| **WPGraphQL for ACF** | 2.0+ | ACF GraphQL integration |
| **WPML/Polylang** | Latest | Multi-language |
| **WP Migrate DB** | 2.6+ | Database migration |

### Installation

```bash
# Install via WP-CLI
wp plugin install wp-graphql --activate
wp plugin install --activate acf-pro.zip  # Requires license
wp plugin install polylang --activate

# Or manually via admin panel
# Go to Plugins > Add New
```

## Custom Post Types

### functions.php Setup

```php
// Register Custom Post Types
function sauwa_register_post_types() {

    // Locations (Saunas)
    register_post_type('location', [
        'label' => 'Locations',
        'public' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'location',
        'graphql_plural_name' => 'locations',
        'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
        'has_archive' => false,
        'rewrite' => ['slug' => 'locations'],
    ]);

    // Sessions (Time Slots)
    register_post_type('session', [
        'label' => 'Sessions',
        'public' => false,
        'show_ui' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'session',
        'graphql_plural_name' => 'sessions',
        'supports' => ['title', 'custom-fields'],
    ]);

    // Bookings
    register_post_type('booking', [
        'label' => 'Bookings',
        'public' => false,
        'show_ui' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'booking',
        'graphql_plural_name' => 'bookings',
        'supports' => ['title', 'custom-fields'],
        'capability_type' => 'post',
        'capabilities' => [
            'create_posts' => 'do_not_allow',
        ],
    ]);
}
add_action('init', 'sauwa_register_post_types');
```

## ACF Field Groups

### Location Fields

```json
{
  "key": "group_location",
  "title": "Location Details",
  "fields": [
    {
      "key": "field_address",
      "label": "Address",
      "name": "address",
      "type": "text"
    },
    {
      "key": "field_capacity",
      "label": "Max Capacity",
      "name": "capacity",
      "type": "number"
    },
    {
      "key": "field_amenities",
      "label": "Amenities",
      "name": "amenities",
      "type": "repeater"
    },
    {
      "key": "field_pricing",
      "label": "Pricing",
      "name": "pricing",
      "type": "group"
    }
  ]
}
```

### Blog Post Fields

```json
{
  "key": "group_blog",
  "title": "Blog Post Details",
  "fields": [
    {
      "key": "field_featured_image",
      "label": "Featured Image",
      "name": "featuredImage",
      "type": "image"
    },
    {
      "key": "field_excerpt",
      "label": "Excerpt",
      "name": "excerpt",
      "type": "textarea"
    },
    {
      "key": "field_read_time",
      "label": "Read Time",
      "name": "readTime",
      "type": "number"
    },
    {
      "key": "field_tags",
      "label": "Tags",
      "name": "tags",
      "type": "taxonomy"
    }
  ]
}
```

## GraphQL Configuration

### Enable GraphQL

```php
// functions.php
add_action('graphql_init', function() {
    // Add custom fields to GraphQL
    register_graphql_field('Post', 'customField', [
        'type' => 'String',
        'resolve' => function($post) {
            return get_post_meta($post->ID, 'custom_field', true);
        }
    ]);
});
```

### CORS Configuration

```php
// Enable CORS for headless
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: https://sauwasauna.com');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        return $value;
    });
});
```

### .htaccess Configuration

```apache
# WordPress default
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>

# GraphQL endpoint
<IfModule mod_headers.c>
Header set Access-Control-Allow-Origin "https://sauwasauna.com"
Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>

# Security
<FilesMatch "wp-config\.php|\.htaccess">
Order Allow,Deny
Deny from all
</FilesMatch>
```

## Multi-Language Setup

### Polylang Configuration

1. Install Polylang plugin
2. Configure languages: ES, CA, EN, FR
3. Set ES as default
4. Enable for all post types

```php
// Register strings for translation
pll_register_string('booking_confirm', 'Confirm your booking');
pll_register_string('newsletter_subscribe', 'Subscribe to newsletter');
```

### Language in GraphQL

```php
// Add language to GraphQL
add_action('graphql_register_types', function() {
    register_graphql_field('Post', 'language', [
        'type' => 'String',
        'resolve' => function($post) {
            return pll_get_post_language($post->ID);
        }
    ]);
});
```

## Performance Optimization

### Caching

```php
// Object caching
define('WP_CACHE', true);

// Use Redis/Memcached if available
if (class_exists('Redis')) {
    define('WP_REDIS_HOST', '127.0.0.1');
    define('WP_REDIS_PORT', 6379);
}
```

### Database Optimization

```sql
-- Optimize tables monthly
OPTIMIZE TABLE wp_posts, wp_postmeta, wp_options;

-- Add indexes for custom queries
ALTER TABLE wp_postmeta ADD INDEX meta_key_value (meta_key(191), meta_value(100));
```

## Security

### Disable Features

```php
// Disable unnecessary features
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');

// Disable XML-RPC
add_filter('xmlrpc_enabled', '__return_false');

// Hide login errors
add_filter('login_errors', function() {
    return 'Login failed';
});
```

### User Roles

```php
// Custom role for operators
add_role('operator', 'Operator', [
    'read' => true,
    'edit_posts' => false,
    'delete_posts' => false,
    'edit_bookings' => true,
    'read_bookings' => true,
]);
```

## Testing

### GraphQL Queries

```graphql
# Test query
query TestConnection {
  generalSettings {
    title
    url
  }
  posts {
    nodes {
      id
      title
      slug
    }
  }
}
```

### Health Check

```php
// wp-content/health-check.php
<?php
require_once('../wp-load.php');

$checks = [
    'WordPress' => defined('ABSPATH'),
    'Database' => $wpdb->check_connection(),
    'GraphQL' => class_exists('WPGraphQL'),
    'ACF' => class_exists('ACF'),
];

header('Content-Type: application/json');
echo json_encode([
    'status' => !in_array(false, $checks) ? 'ok' : 'error',
    'checks' => $checks,
    'timestamp' => time()
]);
```

## Troubleshooting

### Common Issues

1. **GraphQL 404**: Check permalinks, flush rewrite rules
2. **CORS errors**: Verify .htaccess and headers
3. **Memory errors**: Increase PHP memory limit
4. **Slow queries**: Add database indexes, enable caching
5. **Plugin conflicts**: Test with default theme, disable plugins

### Debug Mode

```php
// Enable for debugging
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
define('GRAPHQL_DEBUG', true);

// Check logs at
// wp-content/debug.log
```

---

*Last Updated: 2025-10-24*