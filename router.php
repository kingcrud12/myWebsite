<?php
/**
 * Router PHP pour servir les fichiers statiques et gérer les routes PHP
 * Utilisé pour le déploiement sur Render
 */

// Configuration pour éviter les blocages
set_time_limit(30);
ignore_user_abort(false);

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

$isEmailRequest = (
    strpos($requestPath, 'server/send-email.php') !== false || 
    strpos($requestPath, 'send-email') !== false ||
    $requestPath === 'server/send-email.php' ||
    $requestPath === 'send-email.php' ||
    preg_match('/\/?server\/send-email\.php\/?$/', $requestPath) ||
    preg_match('/\/?send-email\.php\/?$/', $requestPath)
);

if ($isEmailRequest) {
    error_log("Router: Email request detected. Path: " . $requestPath . " | Method: " . $_SERVER['REQUEST_METHOD']);
    
    // Définir les headers pour JSON IMMÉDIATEMENT
    if (!headers_sent()) {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('X-Content-Type-Options: nosniff');
    }
    
    // Flush les headers immédiatement
    if (function_exists('fastcgi_finish_request')) {
        // Ne pas utiliser fastcgi_finish_request ici car on veut envoyer la réponse
    } else {
        flush();
    }
    
    // Gérer les requêtes OPTIONS (preflight)
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        error_log("Router: OPTIONS request, sending 200");
        http_response_code(200);
        exit;
    }
    
    // Vérifier que c'est une requête POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        error_log("Router: Method not allowed: " . $_SERVER['REQUEST_METHOD']);
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
        exit;
    }
    
    error_log("Router: POST request validated, proceeding to include send-email.php");
    
    // Inclure le script PHP
    $sendEmailPath = __DIR__ . '/server/send-email.php';
    error_log("Router: Looking for send-email.php at: " . $sendEmailPath);
    error_log("Router: File exists: " . (file_exists($sendEmailPath) ? 'YES' : 'NO'));
    
    if (file_exists($sendEmailPath)) {
        try {
            error_log("Router: Including send-email.php");
            // Capturer la sortie pour s'assurer qu'elle est envoyée
            ob_start();
            require_once $sendEmailPath;
            $output = ob_get_clean();
            
            // Si send-email.php n'a rien retourné, envoyer une réponse par défaut
            if (empty($output) && !headers_sent()) {
                error_log("Router: send-email.php returned no output, sending default error");
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Le script n\'a retourné aucune réponse']);
            } else {
                echo $output;
                error_log("Router: send-email.php output sent: " . substr($output, 0, 100));
            }
            error_log("Router: send-email.php executed successfully");
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            error_log("Router: Exception including send-email.php: " . $errorMessage);
            error_log("Router: Stack trace: " . $e->getTraceAsString());
            if (!headers_sent()) {
                http_response_code(500);
                header('Content-Type: application/json; charset=utf-8');
            }
            echo json_encode([
                'success' => false, 
                'message' => 'Erreur serveur lors du traitement de la requête.',
                'error' => $errorMessage
            ]);
        } catch (Error $e) {
            $errorMessage = $e->getMessage();
            error_log("Router: Fatal error in send-email.php: " . $errorMessage);
            error_log("Router: Stack trace: " . $e->getTraceAsString());
            if (!headers_sent()) {
                http_response_code(500);
                header('Content-Type: application/json; charset=utf-8');
            }
            echo json_encode([
                'success' => false, 
                'message' => 'Erreur fatale sur le serveur.',
                'error' => $errorMessage
            ]);
        } catch (Throwable $e) {
            $errorMessage = $e->getMessage();
            error_log("Router: Throwable error: " . $errorMessage);
            error_log("Router: Stack trace: " . $e->getTraceAsString());
            if (!headers_sent()) {
                http_response_code(500);
                header('Content-Type: application/json; charset=utf-8');
            }
            echo json_encode([
                'success' => false, 
                'message' => 'Erreur inattendue sur le serveur.',
                'error' => $errorMessage
            ]);
        }
    } else {
        error_log("Router: send-email.php not found at: " . $sendEmailPath);
        error_log("Router: Current directory: " . __DIR__);
        if (is_dir(__DIR__)) {
            $dirContents = scandir(__DIR__);
            error_log("Router: Directory contents: " . implode(', ', $dirContents));
        }
        if (is_dir(__DIR__ . '/server')) {
            $serverContents = scandir(__DIR__ . '/server');
            error_log("Router: Server directory contents: " . implode(', ', $serverContents));
        }
        if (!headers_sent()) {
            http_response_code(500);
            header('Content-Type: application/json');
        }
        echo json_encode(['success' => false, 'message' => 'Script non trouvé']);
    }
    
    // Forcer la sortie
    if (ob_get_level() > 0) {
        ob_end_flush();
    }
    flush();
    error_log("Router: Exiting after email request");
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

