<?php
/**
 * Router PHP pour servir les fichiers statiques et gérer les routes PHP
 * Utilisé pour le déploiement sur Render
 */

$requestUri = $_SERVER['REQUEST_URI'];
$requestPath = parse_url($requestUri, PHP_URL_PATH);

// Enlever le slash initial
$requestPath = ltrim($requestPath, '/');

// Log pour débogage sur Render
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
    error_log("POST Request to: " . $requestPath);
}

// Si c'est une requête vers l'API (send-email.php)
if (strpos($requestPath, 'server/send-email.php') !== false || 
    strpos($requestPath, 'send-email') !== false ||
    $requestPath === 'server/send-email.php' ||
    preg_match('/\/?server\/send-email\.php\/?$/', $requestPath)) {
    
    // Définir les headers pour JSON
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    
    // Gérer les requêtes OPTIONS (preflight)
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
    
    // Vérifier que c'est une requête POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
        exit;
    }
    
    // Inclure le script PHP
    $sendEmailPath = __DIR__ . '/server/send-email.php';
    if (file_exists($sendEmailPath)) {
        require_once $sendEmailPath;
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Script non trouvé']);
    }
    exit;
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

