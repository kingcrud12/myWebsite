# 🔧 Solution : Render détecte Node.js au lieu de PHP

Si Render pense que votre projet est Node.js, suivez ces étapes :

## Solution Rapide

### Option 1 : Configuration Manuelle (Recommandé)

1. **Dans la page de création du service Render** :
   - Ignorez la détection automatique
   - **Environment** : Sélectionnez **"PHP"** dans le menu déroulant
     - Si PHP n'apparaît pas, choisissez **"Docker"** ou **"Other"**

2. **Configurez manuellement** :
   - **Build Command** : 
     ```
     cd server && composer install
     ```
   - **Start Command** : 
     ```
     php -S 0.0.0.0:$PORT router.php
     ```

3. **Autres paramètres** :
   - **Name** : `portfolio-yann-dipita`
   - **Region** : Choisissez la région la plus proche
   - **Branch** : `main` (ou `master`)
   - **Root Directory** : Laissez vide

### Option 2 : Forcer la Détection PHP

Si vous voulez que Render détecte automatiquement PHP :

1. **Assurez-vous que ces fichiers existent** :
   - ✅ `composer.json` à la racine (créé)
   - ✅ `index.php` à la racine (créé)
   - ✅ `router.php` à la racine
   - ✅ Fichiers `.php` dans le projet

2. **Commitez et poussez** :
   ```bash
   git add composer.json index.php
   git commit -m "Ajout fichiers de détection PHP"
   git push origin main
   ```

3. **Sur Render** :
   - Supprimez le service actuel (s'il existe)
   - Recréez un nouveau service
   - Render devrait maintenant détecter PHP

## Configuration Complète Manuelle

Si vous configurez manuellement, voici tous les paramètres :

### Paramètres de Base
- **Name** : `portfolio-yann-dipita`
- **Environment** : `PHP`
- **Region** : `Frankfurt` (ou votre région préférée)
- **Branch** : `main`
- **Root Directory** : (vide)

### Commandes
- **Build Command** : 
  ```bash
  cd server && composer install
  ```
- **Start Command** : 
  ```bash
  php -S 0.0.0.0:$PORT router.php
  ```

### Variables d'Environnement
- **SMTP_USERNAME** : `dipitay@gmail.com`
- **SMTP_PASSWORD** : Votre mot de passe d'application Gmail (sans espaces)

## Vérification

Après le déploiement, vérifiez dans les logs :
- ✅ "Installing dependencies" (Composer)
- ✅ "Starting PHP server"
- ✅ Pas d'erreurs Node.js/npm

Si vous voyez des erreurs Node.js, c'est que Render utilise encore Node.js. Dans ce cas :
1. Allez dans "Settings"
2. Changez "Environment" en "PHP"
3. Mettez à jour les commandes
4. Redéployez

## Aide Supplémentaire

Si le problème persiste :
1. Vérifiez que `render.yaml` est bien commité
2. Vérifiez que les fichiers PHP existent
3. Contactez le support Render si nécessaire

