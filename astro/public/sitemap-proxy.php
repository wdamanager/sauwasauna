<?php
/**
 * SAUWA - Sitemap Proxy to WordPress Backend
 * Fetches sitemap.xml from WordPress backend and serves it on frontend domain
 *
 * Usage: Place in /public/ folder of Astro build
 * URL: https://sauwasauna.com/sitemap.xml (via .htaccess rewrite)
 */

// Backend sitemap URL
$backend_sitemap = 'https://backend.sauwasauna.com/sitemap.xml';

// Cache duration (1 hour)
$cache_duration = 3600;

// Cache headers
header('Content-Type: application/xml; charset=utf-8');
header('Cache-Control: public, max-age=' . $cache_duration);
header('X-Sitemap-Source: backend-proxy');

// Fetch sitemap from WordPress backend
$context = stream_context_create([
    'http' => [
        'timeout' => 10, // 10 seconds timeout
        'user_agent' => 'SAUWA-Frontend-Proxy/1.0'
    ]
]);

$sitemap_content = @file_get_contents($backend_sitemap, false, $context);

// Check if fetch was successful
if ($sitemap_content === false) {
    // Fallback: Return error message
    http_response_code(503);
    header('Content-Type: text/plain; charset=utf-8');
    echo "Sitemap temporarily unavailable. Please try again later.";
    exit;
}

// Verify it's valid XML
$xml = @simplexml_load_string($sitemap_content);
if ($xml === false) {
    http_response_code(503);
    header('Content-Type: text/plain; charset=utf-8');
    echo "Invalid sitemap XML received from backend.";
    exit;
}

// Output sitemap
echo $sitemap_content;
exit;
