<?php
/**
 * Router PHP pour servir les fichiers statiques et gérer les routes PHP
 * Utilisé pour le déploiement sur Render
 */

$requestUri = $_SERVER['REQUEST_URI'];
$requestPath = parse_url($requestUri, PHP_URL_PATH);

// Enlever le slash initial
$requestPath = ltrim($requestPath, '/');

// Si c'est une requête vers l'API (send-email.php)
if (strpos($requestPath, 'server/send-email.php') !== false || 
    strpos($requestPath, 'send-email') !== false) {
    // Inclure le script PHP
    require_once __DIR__ . '/server/send-email.php';
    exit;
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

