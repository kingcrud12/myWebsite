# Guide de Déploiement sur Render

## 📋 Prérequis

1. Un compte GitHub, GitLab ou Bitbucket
2. Un compte Render (gratuit) : https://render.com
3. Votre mot de passe d'application Gmail (déjà configuré)

## 🚀 Étapes de Déploiement

### Étape 1 : Préparer votre dépôt Git

1. **Initialisez Git** (si ce n'est pas déjà fait) :
   ```bash
   git init
   ```

2. **Vérifiez que `server/config.php` n'est pas commité** :
   ```bash
   git status
   ```
   Le fichier `server/config.php` ne doit PAS apparaître (il est dans `.gitignore`)

3. **Ajoutez tous les fichiers** :
   ```bash
   git add .
   ```

4. **Commitez** :
   ```bash
   git commit -m "Initial commit - Portfolio Yann Dipita"
   ```

5. **Créez un dépôt sur GitHub/GitLab** :
   - Allez sur GitHub.com (ou GitLab.com)
   - Créez un nouveau dépôt (ex: `portfolio-yann-dipita`)
   - Ne cochez PAS "Initialize with README"

6. **Poussez votre code** :
   ```bash
   git remote add origin https://github.com/VOTRE_USERNAME/portfolio-yann-dipita.git
   git branch -M main
   git push -u origin main
   ```

### Étape 2 : Créer le service sur Render

1. **Connectez-vous à Render** :
   - Allez sur https://render.com
   - Créez un compte (gratuit) ou connectez-vous

2. **Créez un nouveau service** :
   - Cliquez sur "New +" en haut à droite
   - Sélectionnez "Web Service"

3. **Connectez votre dépôt** :
   - Si c'est la première fois, connectez votre compte GitHub/GitLab
   - Sélectionnez votre dépôt `portfolio-yann-dipita`
   - Cliquez sur "Connect"

### Étape 3 : Configurer le service

Render détectera automatiquement le fichier `render.yaml` et utilisera ces paramètres :

- **Name** : `portfolio-yann-dipita` (ou le nom que vous préférez)
- **Environment** : `PHP` (détecté automatiquement)
- **Build Command** : `cd server && composer install` (depuis render.yaml)
- **Start Command** : `php -S 0.0.0.0:$PORT router.php` (depuis render.yaml)

**Vous pouvez laisser les valeurs par défaut** ou les modifier si nécessaire.

### Étape 4 : Configurer les variables d'environnement

**IMPORTANT** : C'est ici que vous configurez votre mot de passe Gmail de manière sécurisée.

1. Dans la page de configuration du service, allez dans la section **"Environment"**

2. Cliquez sur **"Add Environment Variable"**

3. Ajoutez ces deux variables :

   **Variable 1** :
   - **Key** : `SMTP_USERNAME`
   - **Value** : `dipitay@gmail.com`
   - Cliquez sur "Save"

   **Variable 2** :
   - **Key** : `SMTP_PASSWORD`
   - **Value** : Votre mot de passe d'application Gmail (sans espaces)
     - Exemple : `zntoueypvdvcbxgx` (sans les espaces)
   - Cliquez sur "Save"

### Étape 5 : Déployer

1. Cliquez sur **"Create Web Service"** en bas de la page

2. Render va maintenant :
   - Cloner votre dépôt
   - Exécuter `cd server && composer install` pour installer PHPMailer
   - Démarrer le serveur avec `router.php`

3. **Attendez la fin du déploiement** (2-3 minutes)
   - Vous verrez les logs en temps réel
   - Quand c'est prêt, vous verrez "Your service is live"

### Étape 6 : Tester votre site

1. **Récupérez l'URL** :
   - Render vous donnera une URL comme : `https://portfolio-yann-dipita.onrender.com`
   - Cette URL est gratuite et permanente

2. **Testez le site** :
   - Ouvrez l'URL dans votre navigateur
   - Vérifiez que la page s'affiche correctement
   - Testez le formulaire de contact

3. **Vérifiez les emails** :
   - Envoyez un message de test via le formulaire
   - Vérifiez votre boîte mail `dipitay@gmail.com`

## 🔧 Configuration Optionnelle

### Domaine personnalisé (optionnel)

Si vous avez un domaine (ex: `yann-dipita.com`) :

1. Dans Render, allez dans "Settings" > "Custom Domains"
2. Ajoutez votre domaine
3. Suivez les instructions pour configurer le DNS

### Variables d'environnement supplémentaires

Si vous voulez modifier les paramètres SMTP plus tard :
- Allez dans "Environment" dans les paramètres du service
- Modifiez les variables `SMTP_USERNAME` et `SMTP_PASSWORD`
- Render redéploiera automatiquement

## 🐛 Dépannage

### Le déploiement échoue

1. **Vérifiez les logs** :
   - Dans Render, cliquez sur "Logs"
   - Cherchez les erreurs en rouge

2. **Vérifiez que Composer s'est bien exécuté** :
   - Les logs doivent montrer "Installing dependencies"
   - Vérifiez que `server/vendor/` existe dans votre dépôt (il ne devrait PAS être commité normalement)

3. **Vérifiez les variables d'environnement** :
   - Assurez-vous que `SMTP_USERNAME` et `SMTP_PASSWORD` sont bien configurées

### Le formulaire ne fonctionne pas

1. **Vérifiez les logs Render** :
   - Allez dans "Logs" > "Runtime Logs"
   - Testez le formulaire et regardez les erreurs

2. **Vérifiez le mot de passe d'application Gmail** :
   - Assurez-vous qu'il n'y a pas d'espaces dans la variable d'environnement
   - Vérifiez que la validation en 2 étapes est activée sur Gmail

3. **Testez l'URL de l'API** :
   - Ouvrez `https://votre-site.onrender.com/server/send-email.php` dans votre navigateur
   - Vous devriez voir une erreur "Method Not Allowed" (c'est normal, c'est une requête GET)
   - Si vous voyez une erreur PHP, il y a un problème de configuration

### Le site ne s'affiche pas

1. **Vérifiez que router.php est bien à la racine**
2. **Vérifiez les logs Render** pour voir les erreurs
3. **Vérifiez que tous les fichiers sont bien commités**

## 📝 Checklist de Déploiement

- [ ] Code commité et poussé sur GitHub/GitLab
- [ ] Service créé sur Render
- [ ] Dépôt connecté
- [ ] Variables d'environnement configurées (`SMTP_USERNAME` et `SMTP_PASSWORD`)
- [ ] Déploiement réussi (statut "Live")
- [ ] Site accessible via l'URL Render
- [ ] Formulaire de contact testé et fonctionnel
- [ ] Email reçu dans la boîte mail

## 🎉 C'est tout !

Votre site est maintenant en ligne et accessible partout dans le monde !

L'URL Render est gratuite et permanente. Vous pouvez la partager avec qui vous voulez.

