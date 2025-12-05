# 🐳 Déploiement avec Docker sur Render

Render ne propose pas PHP directement, mais on peut utiliser **Docker** qui fonctionne parfaitement !

## ✅ Solution : Utiliser Docker

J'ai créé un `Dockerfile` qui configure PHP automatiquement. Voici comment déployer :

## 🚀 Étapes de Déploiement

### Étape 1 : Commiter les fichiers

```bash
git add Dockerfile .dockerignore render.yaml
git commit -m "Ajout Dockerfile pour déploiement Render"
git push origin main
```

### Étape 2 : Créer le service sur Render

1. **Allez sur Render** : https://render.com
2. **Créez un nouveau service** : "New +" → "Web Service"
3. **Connectez votre dépôt** GitHub/GitLab
4. **Sélectionnez votre dépôt**

### Étape 3 : Configurer le service

**IMPORTANT** : Sélectionnez **"Docker"** comme environnement !

1. **Environment** : Sélectionnez **"Docker"** dans le menu déroulant
2. **Name** : `portfolio-yann-dipita`
3. **Region** : Choisissez votre région (ex: Frankfurt)
4. **Branch** : `main`
5. **Root Directory** : Laissez vide

**Render détectera automatiquement le Dockerfile** et utilisera les paramètres de `render.yaml`.

### Étape 4 : Variables d'environnement

Dans la section "Environment", ajoutez :

- **SMTP_USERNAME** : `dipitay@gmail.com`
- **SMTP_PASSWORD** : Votre mot de passe d'application Gmail (sans espaces)

### Étape 5 : Déployer

1. Cliquez sur **"Create Web Service"**
2. Render va :
   - Construire l'image Docker avec PHP
   - Installer les dépendances Composer
   - Démarrer le serveur PHP
3. Attendez 3-5 minutes (première fois plus long)

## ✅ Avantages de Docker

- ✅ Fonctionne sur Render même sans support PHP direct
- ✅ Environnement isolé et reproductible
- ✅ PHP 8.2 pré-configuré
- ✅ Composer installé automatiquement
- ✅ Configuration simple

## 🔍 Vérification

Après le déploiement, vérifiez les logs :
- ✅ "Building Docker image"
- ✅ "Installing dependencies"
- ✅ "Starting PHP server"
- ✅ "Your service is live"

## 🐛 Dépannage

### Le build échoue

1. Vérifiez les logs dans Render
2. Assurez-vous que `Dockerfile` est à la racine
3. Vérifiez que `server/composer.json` existe

### Le site ne démarre pas

1. Vérifiez que `router.php` existe à la racine
2. Vérifiez les logs pour les erreurs PHP
3. Assurez-vous que les variables d'environnement sont configurées

### Le formulaire ne fonctionne pas

1. Vérifiez que `SMTP_USERNAME` et `SMTP_PASSWORD` sont bien configurées
2. Vérifiez les logs pour les erreurs SMTP
3. Testez avec un mot de passe d'application Gmail valide

## 📝 Structure Docker

Le Dockerfile :
- Utilise PHP 8.2
- Installe Composer
- Copie tous les fichiers
- Installe les dépendances PHP
- Démarre le serveur PHP avec router.php

C'est tout ! Docker gère tout automatiquement. 🎉

