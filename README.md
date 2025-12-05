# Site Portfolio - Yann Dipita

Site web portfolio élégant avec formulaire de contact fonctionnel.

## Structure du projet

```
mywebsite/
├── client/             # Dossier client (Frontend)
│   ├── index.html      # Page principale
│   ├── styles.css      # Styles CSS
│   └── script.js        # JavaScript
├── server/             # Dossier serveur (Backend PHP)
│   ├── send-email.php  # Script PHP pour l'envoi d'emails
│   ├── config.php      # Configuration SMTP (à ne PAS commiter)
│   ├── config.php.example # Exemple de configuration
│   ├── composer.json   # Dépendances PHP
│   └── vendor/         # Dépendances Composer (généré)
├── router.php          # Routeur PHP (gère fichiers statiques + API)
├── render.yaml         # Configuration pour Render
└── .gitignore          # Fichiers à ignorer par Git
```

## Installation locale

### 1. Prérequis

- PHP 7.4 ou supérieur
- Composer (pour installer PHPMailer)
- Un compte Gmail avec validation en 2 étapes activée

### 2. Installation des dépendances

```bash
cd server
composer install
```

### 3. Configuration du mot de passe d'application Gmail

1. **Activez la validation en 2 étapes** (si ce n'est pas déjà fait) :
   - Allez sur https://myaccount.google.com/
   - Cliquez sur "Sécurité"
   - Activez "Validation en 2 étapes"

2. **Créez un mot de passe d'application** :
   - Allez sur : https://myaccount.google.com/apppasswords
   - Sélectionnez "Autre (nom personnalisé)"
   - Entrez un nom (ex: "Site Web Portfolio")
   - Cliquez sur "Générer"
   - **Copiez le mot de passe généré** (16 caractères sans espaces)

3. **Configurez le fichier server/config.php** :
   - Copiez `server/config.php.example` vers `server/config.php`
   - Remplacez les valeurs par vos identifiants

### 4. Lancer le serveur local

```bash
# Depuis la racine du projet (utilise le router pour tout gérer)
php -S localhost:8000 router.php
```

Puis ouvrez http://localhost:8000 dans votre navigateur.

Le router gère automatiquement :
- Les fichiers statiques (HTML, CSS, JS) depuis `client/`
- Les requêtes vers `server/send-email.php` pour le formulaire de contact

## Déploiement sur Render

### 1. Préparer le dépôt

Assurez-vous que tous les fichiers sont commités (sauf `server/config.php` qui est dans `.gitignore`).

### 2. Créer un nouveau service sur Render

1. Connectez-vous à [Render](https://render.com)
2. Cliquez sur "New +" > "Web Service"
3. Connectez votre dépôt GitHub/GitLab
4. Configurez le service :
   - **Name**: portfolio-yann-dipita
   - **Environment**: PHP
   - **Build Command**: `cd server && composer install`
   - **Start Command**: `php -S 0.0.0.0:$PORT router.php`

### 3. Configurer les variables d'environnement

Dans le dashboard Render, allez dans "Environment" et ajoutez :

- **SMTP_USERNAME**: `dipitay@gmail.com`
- **SMTP_PASSWORD**: Votre mot de passe d'application Gmail (sans espaces)

### 4. Déployer

Render déploiera automatiquement votre site. L'URL sera disponible après le déploiement.

## Sécurité

⚠️ **IMPORTANT** : 
- Ne commitez **JAMAIS** le fichier `server/config.php` avec vos identifiants réels
- Le fichier `server/config.php` est déjà dans `.gitignore`
- Pour la production sur Render, utilisez les variables d'environnement (déjà configuré)

## Fonctionnalités

- ✅ Design moderne et responsive
- ✅ Animations fluides
- ✅ Formulaire de contact fonctionnel avec envoi par email
- ✅ Navigation fluide
- ✅ Section projets
- ✅ Section à propos

## Dépannage

### Le formulaire ne fonctionne pas en local

1. Vérifiez que PHP est installé et fonctionne
2. Vérifiez que Composer a installé les dépendances (`server/vendor/` existe)
3. Vérifiez que le mot de passe d'application Gmail est correct dans `server/config.php`
4. Vérifiez les logs d'erreur PHP
5. Assurez-vous que la validation en 2 étapes est activée sur votre compte Gmail

### Le formulaire ne fonctionne pas sur Render

1. Vérifiez que les variables d'environnement `SMTP_USERNAME` et `SMTP_PASSWORD` sont configurées
2. Vérifiez les logs de déploiement dans le dashboard Render
3. Vérifiez que le build command s'est exécuté correctement

### Erreur "SMTP connect() failed"

- Vérifiez que le mot de passe d'application est correct
- Vérifiez que votre connexion internet fonctionne
- Certains hébergeurs bloquent les connexions SMTP sortantes (contactez votre hébergeur)

## Support

Pour toute question, contactez : dipitay@gmail.com
