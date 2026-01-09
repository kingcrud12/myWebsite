<?php
/**
 * Router PHP pour servir les fichiers statiques et gérer les routes PHP
 * Utilisé pour le déploiement sur Render
 */

// Configuration pour éviter les blocages
// Configuration pour éviter les blocages
set_time_limit(30);
ignore_user_abort(false);

// --- SECURITY HEADERS ---
// Prevent Clickjacking
header('X-Frame-Options: DENY');

// Prevent MIME-type sniffing
header('X-Content-Type-Options: nosniff');

// Control Referrer Information
header('Referrer-Policy: strict-origin-when-cross-origin');

// Enforce HTTPS (1 year) - Uncomment if you have SSL enabled (Render usually does)
header('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');

// Content Security Policy (CSP)
// - default-src: self only
// - script-src: self only (external scripts blocked)
// - style-src: self + Google Fonts + inline styles (needed for existing CSS)
// - font-src: self + Google Fonts
// - img-src: self + data: (for SVGs/encoded)
// - connect-src: self + Formspree (for form submission)
// - form-action: self + Formspree
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.tailwindcss.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://formspree.io; form-action 'self' https://formspree.io; base-uri 'self'; frame-ancestors 'none';");
// ------------------------

$requestUri = $_SERVER['REQUEST_URI'];
$requestPath = parse_url($requestUri, PHP_URL_PATH);

// Enlever le slash initial
$requestPath = ltrim($requestPath, '/');

// Log pour débogage sur Render (seulement pour les vraies requêtes, pas les connexions préventives)
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] !== '') {
    // Vérifier que c'est une vraie requête (a des headers ou du contenu)
    $hasContent = !empty($_POST) || !empty($_GET) || !empty(file_get_contents('php://input'));
    if ($hasContent || $_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'GET') {
        error_log("Router: " . $_SERVER['REQUEST_METHOD'] . " request to: " . $requestPath . " from: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
    }
}



// Servir robots.txt
if ($requestPath === 'robots.txt') {
    $file = __DIR__ . '/client/robots.txt';
    if (file_exists($file)) {
        header('Content-Type: text/plain; charset=utf-8');
        readfile($file);
        exit;
    }
}

// Servir sitemap.xml
if ($requestPath === 'sitemap.xml') {
    $file = __DIR__ . '/client/sitemap.xml';
    if (file_exists($file)) {
        header('Content-Type: application/xml; charset=utf-8');
        readfile($file);
        exit;
    }
}

// Si c'est la racine ou index.html, servir index.html
if ($requestPath === '' || $requestPath === 'index.html' || $requestPath === '/') {
    $file = __DIR__ . '/client/index.html';
    if (file_exists($file)) {
        header('Content-Type: text/html; charset=utf-8');
        readfile($file);
        exit;
    }
}

// Servir les fichiers statiques depuis client/
$filePath = __DIR__ . '/client/' . $requestPath;

// Vérifier que le fichier existe et est dans le dossier client (sécurité)
if (file_exists($filePath) && strpos(realpath($filePath), realpath(__DIR__ . '/client')) === 0) {
    // Déterminer le type MIME
    $mimeType = mime_content_type($filePath);

    // Types MIME spécifiques
    if (pathinfo($filePath, PATHINFO_EXTENSION) === 'css') {
        $mimeType = 'text/css';
    } elseif (pathinfo($filePath, PATHINFO_EXTENSION) === 'js') {
        $mimeType = 'application/javascript';
    }

    header('Content-Type: ' . $mimeType);
    readfile($filePath);
    exit;
}

// Si le fichier n'existe pas, servir index.html (pour le routing côté client)
$indexFile = __DIR__ . '/client/index.html';
if (file_exists($indexFile)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($indexFile);
    exit;
}

// 404
http_response_code(404);
echo '404 - Page not found';

