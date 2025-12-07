<?php
// Activer l'affichage des erreurs pour le débogage (à désactiver en production)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Définir un timeout pour éviter que le script reste bloqué
set_time_limit(25); // Légèrement moins que le timeout du serveur
ignore_user_abort(false); // Arrêter le script si le client se déconnecte

// Gestionnaire d'erreur global pour s'assurer qu'une réponse est toujours envoyée
register_shutdown_function(function () {
    $error = error_get_last();
    if ($error !== NULL && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        error_log("Fatal error in send-email.php: " . $error['message'] . " in " . $error['file'] . " on line " . $error['line']);
        if (!headers_sent()) {
            header('Content-Type: application/json; charset=utf-8');
            http_response_code(500);
        }
        echo json_encode([
            'success' => false,
            'message' => 'Erreur serveur fatale. Veuillez réessayer plus tard.'
        ]);
    }
});

// Envoyer les headers immédiatement pour éviter que la requête reste en pending
if (!headers_sent()) {
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('X-Content-Type-Options: nosniff');
}

// Log de débogage
error_log("send-email.php: Request method = " . $_SERVER['REQUEST_METHOD']);

// Vérifier que la requête est en POST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error_log("send-email.php: Method not allowed");
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

// Lire le body JSON
$jsonInput = file_get_contents('php://input');
$data = json_decode($jsonInput, true);

// Vérifier que le JSON est valide
if (json_last_error() !== JSON_ERROR_NONE) {
    error_log("send-email.php: Invalid JSON - " . json_last_error_msg());
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Format JSON invalide']);
    exit;
}

// Vérifier que tous les champs requis sont présents
$requiredFields = ['name', 'email', 'subject', 'message'];
$missingFields = [];

foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || trim($data[$field]) === '') {
        $missingFields[] = $field;
    }
}

// Si des champs manquent, refuser la requête et fermer le traitement
if (!empty($missingFields)) {
    error_log("send-email.php: Missing required fields: " . implode(', ', $missingFields));
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Champs manquants: ' . implode(', ', $missingFields)
    ]);
    exit;
}

// Extraire et nettoyer les données
$name = trim($data['name']);
$email = trim($data['email']);
$subject = trim($data['subject']);
$message = trim($data['message']);

// Validation de l'email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    error_log("send-email.php: Invalid email format");
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Adresse email invalide']);
    exit;
}

// Vérifier que vendor/autoload.php existe
// Essayer d'abord dans server/vendor (où composer install est exécuté)
$vendorPath = __DIR__ . '/vendor/autoload.php';
if (!file_exists($vendorPath)) {
    // Essayer aussi à la racine au cas où
    $vendorPathRoot = dirname(__DIR__) . '/vendor/autoload.php';
    if (file_exists($vendorPathRoot)) {
        $vendorPath = $vendorPathRoot;
        error_log("send-email.php: Using root vendor/autoload.php");
    } else {
        error_log("send-email.php: vendor/autoload.php not found at: " . __DIR__ . '/vendor/autoload.php');
        error_log("send-email.php: Also checked: " . $vendorPathRoot);
        error_log("send-email.php: Current directory: " . __DIR__);
        error_log("send-email.php: Parent directory: " . dirname(__DIR__));
        if (is_dir(__DIR__ . '/vendor')) {
            error_log("send-email.php: server/vendor directory exists");
        } else {
            error_log("send-email.php: server/vendor directory does NOT exist");
        }
        if (is_dir(dirname(__DIR__) . '/vendor')) {
            error_log("send-email.php: root/vendor directory exists");
        } else {
            error_log("send-email.php: root/vendor directory does NOT exist");
        }
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Dépendances non trouvées. Vérifiez que composer install a été exécuté.']);
        exit;
    }
}

// Charger PHPMailer
require_once $vendorPath;
error_log("send-email.php: PHPMailer loaded successfully from: " . $vendorPath);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Charger la configuration depuis les variables d'environnement ou config.php
$configPath = __DIR__ . '/config.php';
if (file_exists($configPath)) {
    require_once $configPath;
    error_log("send-email.php: Config file loaded");
} else {
    // Utiliser les variables d'environnement si config.php n'existe pas (production)
    error_log("send-email.php: config.php not found, using environment variables");
    if (!defined('SMTP_USERNAME')) {
        $smtpUsername = getenv('SMTP_USERNAME');
        define('SMTP_USERNAME', $smtpUsername ?: '');
    }
    if (!defined('SMTP_PASSWORD')) {
        $smtpPassword = getenv('SMTP_PASSWORD');
        define('SMTP_PASSWORD', $smtpPassword ?: '');
    }
    error_log("send-email.php: Environment variables loaded");
}

// Vérifier que les credentials SMTP sont définis
$smtpUser = defined('SMTP_USERNAME') ? SMTP_USERNAME : '';
$smtpPass = defined('SMTP_PASSWORD') ? SMTP_PASSWORD : '';

if (empty($smtpUser) || empty($smtpPass)) {
    error_log("send-email.php: SMTP credentials not configured. USERNAME: " . ($smtpUser ? 'SET' : 'NOT SET') . ", PASSWORD: " . ($smtpPass ? 'SET' : 'NOT SET'));
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Configuration SMTP manquante. Veuillez configurer SMTP_USERNAME et SMTP_PASSWORD.']);
    exit;
}

error_log("send-email.php: SMTP credentials configured successfully");

// Les données JSON ont déjà été validées plus haut
// Utiliser les variables déjà extraites

try {
    error_log("send-email.php: Starting email creation");

    // Créer une instance de PHPMailer
    $mail = new PHPMailer(true);
    error_log("send-email.php: PHPMailer instance created");

    // Configuration du serveur SMTP avec timeouts
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USERNAME;
    $mail->Password = SMTP_PASSWORD;

    // Essayer d'abord le port 465 avec SSL (plus fiable sur Render)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL direct
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    // Timeouts SMTP augmentés pour Render
    $mail->Timeout = 30; // Timeout de connexion (secondes) - augmenté pour Render
    $mail->SMTPKeepAlive = false; // Ne pas garder la connexion ouverte

    // Options SSL/TLS pour Render
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true,
            'crypto_method' => STREAM_CRYPTO_METHOD_TLS_CLIENT
        )
    );

    // Activer le mode debug pour voir les détails de connexion
    $mail->SMTPDebug = 0; // 0 = pas de debug, 2 = debug complet (à activer si besoin)

    error_log("send-email.php: SMTP configuration completed");

    // Expéditeur et destinataire
    error_log("send-email.php: Setting email addresses");
    $mail->setFrom(SMTP_USERNAME, 'Site Web - Yann Dipita');
    $mail->addAddress('dipitay@gmail.com', 'Yann Dipita');
    $mail->addReplyTo($email, $name);
    error_log("send-email.php: Email addresses set");

    // Contenu de l'email
    error_log("send-email.php: Setting email content");
    $mail->isHTML(true);
    $mail->Subject = 'Nouveau message du site web: ' . $subject;

    $mail->Body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #6366f1; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Nouveau message depuis votre site web</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Nom:</div>
                    <div class='value'>{$name}</div>
                </div>
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>{$email}</div>
                </div>
                <div class='field'>
                    <div class='label'>Sujet:</div>
                    <div class='value'>{$subject}</div>
                </div>
                <div class='field'>
                    <div class='label'>Message:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";

    // Version texte pour les clients email qui ne supportent pas HTML
    $mail->AltBody = "
Nouveau message depuis votre site web

Nom: {$name}
Email: {$email}
Sujet: {$subject}

Message:
{$message}
    ";

    // Envoyer l'email avec gestion d'erreur améliorée
    error_log("send-email.php: Attempting to connect to SMTP server");
    error_log("send-email.php: SMTP Host: " . $mail->Host . ", Port: " . $mail->Port . ", Encryption: " . $mail->SMTPSecure);

    try {
        // Tester la connexion avant d'envoyer
        if (!$mail->smtpConnect()) {
            error_log("send-email.php: SMTP connection failed");
            throw new Exception("SMTP Error: Could not connect to SMTP host. Connection failed.");
        }
        error_log("send-email.php: SMTP connection successful");

        // Envoyer l'email
        error_log("send-email.php: Attempting to send email");
        $sendResult = $mail->send();
        error_log("send-email.php: Email send result: " . ($sendResult ? 'SUCCESS' : 'FAILED'));

        if (!$sendResult) {
            error_log("send-email.php: Send failed. Error: " . $mail->ErrorInfo);
            throw new Exception("Échec de l'envoi: " . $mail->ErrorInfo);
        }

        // Fermer la connexion SMTP
        $mail->smtpClose();
        error_log("send-email.php: SMTP connection closed");
        error_log("send-email.php: Email sent successfully");

    } catch (Exception $smtpException) {
        // Fermer la connexion en cas d'erreur
        try {
            if (method_exists($mail, 'smtpClose')) {
                $mail->smtpClose();
            }
        } catch (Exception $closeException) {
            // Ignorer les erreurs de fermeture
        }
        throw $smtpException;
    }

    // Réponse de succès
    $response = json_encode([
        'success' => true,
        'message' => 'Message envoyé avec succès! Je vous répondrai bientôt.'
    ]);
    error_log("send-email.php: Sending success response");
    echo $response;
    error_log("send-email.php: Success response sent");

} catch (Exception $e) {
    // En cas d'erreur
    $errorMessage = $e->getMessage();
    error_log('send-email.php: Exception caught: ' . $errorMessage);
    error_log('send-email.php: Stack trace: ' . $e->getTraceAsString());

    if (!headers_sent()) {
        http_response_code(500);
    }

    // Inclure le message d'erreur dans la réponse (sans détails sensibles)
    $userMessage = 'Une erreur est survenue lors de l\'envoi.';
    if (strpos($errorMessage, 'SMTP') !== false || strpos($errorMessage, 'Connection') !== false) {
        $userMessage = 'Erreur de connexion au serveur email. Veuillez réessayer plus tard.';
    } elseif (strpos($errorMessage, 'Authentication') !== false || strpos($errorMessage, 'credentials') !== false) {
        $userMessage = 'Erreur d\'authentification. Veuillez contacter l\'administrateur.';
    } elseif (strpos($errorMessage, 'Timeout') !== false) {
        $userMessage = 'Le serveur a mis trop de temps à répondre. Veuillez réessayer.';
    }

    $errorResponse = json_encode([
        'success' => false,
        'message' => $userMessage,
        'error' => $errorMessage // Pour le débogage côté client
    ]);
    echo $errorResponse;
    error_log("send-email.php: Error response sent: " . $userMessage);

} catch (Error $e) {
    // Erreur fatale PHP
    $errorMessage = $e->getMessage();
    error_log('send-email.php: Fatal error: ' . $errorMessage);
    error_log('send-email.php: Stack trace: ' . $e->getTraceAsString());

    if (!headers_sent()) {
        http_response_code(500);
    }
    $errorResponse = json_encode([
        'success' => false,
        'message' => 'Erreur serveur. Veuillez réessayer plus tard.',
        'error' => $errorMessage // Pour le débogage côté client
    ]);
    echo $errorResponse;
    error_log("send-email.php: Fatal error response sent");

} catch (Throwable $e) {
    // Toute autre erreur
    error_log('send-email.php: Throwable error: ' . $e->getMessage());

    if (!headers_sent()) {
        http_response_code(500);
    }
    $errorResponse = json_encode([
        'success' => false,
        'message' => 'Erreur inattendue. Veuillez réessayer plus tard.'
    ]);
    echo $errorResponse;
    error_log("send-email.php: Throwable error response sent");
}

// S'assurer qu'une réponse est toujours envoyée
error_log("send-email.php: Script completed");
// Forcer la sortie pour s'assurer que la réponse est envoyée
if (ob_get_level() > 0) {
    ob_end_flush();
}
flush();
?>