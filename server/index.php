<?php
/**
 * Point d'entrée pour Render
 * Redirige toutes les requêtes vers le fichier approprié
 */

// Si c'est une requête POST vers send-email.php, inclure ce fichier
if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], 'send-email') !== false) {
    require_once __DIR__ . '/send-email.php';
    exit;
}

// Sinon, rediriger vers la page d'accueil
header('Location: /');
exit;

