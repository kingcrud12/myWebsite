# Dossier Serveur

Ce dossier contient tous les fichiers backend nécessaires au fonctionnement du site.

## Fichiers

- **send-email.php** : Script PHP qui gère l'envoi des emails via SMTP Gmail
- **config.php** : Configuration SMTP (ne pas commiter - utilise les variables d'environnement en production)
- **config.php.example** : Exemple de configuration
- **composer.json** : Dépendances PHP (PHPMailer)
- **vendor/** : Dépendances installées par Composer

## Installation

```bash
cd server
composer install
```

## Configuration

1. Copiez `config.php.example` vers `config.php`
2. Remplissez vos identifiants Gmail
3. Pour la production (Render), utilisez les variables d'environnement

## Variables d'environnement (Render)

- `SMTP_USERNAME` : Votre adresse Gmail
- `SMTP_PASSWORD` : Votre mot de passe d'application Gmail

