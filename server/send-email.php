<?php
// Activer l'affichage des erreurs pour le débogage (à désactiver en production)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Log de débogage
error_log("send-email.php: Request method = " . $_SERVER['REQUEST_METHOD']);

// Vérifier que la requête est en POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error_log("send-email.php: Method not allowed");
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

// Vérifier que vendor/autoload.php existe
$vendorPath = __DIR__ . '/vendor/autoload.php';
if (!file_exists($vendorPath)) {
    error_log("send-email.php: vendor/autoload.php not found at: " . $vendorPath);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Dépendances non trouvées']);
    exit;
}

// Charger PHPMailer
require_once $vendorPath;
error_log("send-email.php: PHPMailer loaded successfully");

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

// Récupérer les données du formulaire
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validation des champs
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Tous les champs sont requis']);
    exit;
}

// Validation de l'email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Adresse email invalide']);
    exit;
}

try {
    // Créer une instance de PHPMailer
    $mail = new PHPMailer(true);

    // Configuration du serveur SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USERNAME; // Votre adresse Gmail
    $mail->Password = SMTP_PASSWORD; // Votre mot de passe d'application
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';

    // Expéditeur et destinataire
    $mail->setFrom(SMTP_USERNAME, 'Site Web - Yann Dipita');
    $mail->addAddress('dipitay@gmail.com', 'Yann Dipita');
    $mail->addReplyTo($email, $name);

    // Contenu de l'email
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

    // Envoyer l'email
    $mail->send();

    // Réponse de succès
    echo json_encode([
        'success' => true,
        'message' => 'Message envoyé avec succès! Je vous répondrai bientôt.'
    ]);

} catch (Exception $e) {
    // En cas d'erreur
    error_log('Erreur PHPMailer Exception: ' . $e->getMessage());
    error_log('Stack trace: ' . $e->getTraceAsString());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer plus tard.',
        'error' => $e->getMessage()
    ]);
} catch (Error $e) {
    // Erreur fatale PHP
    error_log('Erreur fatale PHP: ' . $e->getMessage());
    error_log('Stack trace: ' . $e->getTraceAsString());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erreur serveur. Veuillez réessayer plus tard.',
        'error' => $e->getMessage()
    ]);
}

// S'assurer qu'une réponse est toujours envoyée
if (!headers_sent()) {
    error_log("send-email.php: Script completed");
}
?>