# Dockerfile pour le site portfolio PHP
FROM php:8.2-apache

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Activer le module rewrite d'Apache
RUN a2enmod rewrite

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier les fichiers du projet
COPY . .

# Installer les dépendances PHP
RUN cd server && composer install --no-dev --optimize-autoloader

# Configurer Apache pour écouter sur le port 8080 (requis par Render)
RUN sed -i 's/80/8080/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Configurer le DocumentRoot pour pointer vers le dossier client si nécessaire, 
# ou laisser router.php gérer le routage via .htaccess (à créer)
# Pour l'instant, on copie router.php à la racine et on configure .htaccess

# Créer un fichier .htaccess pour rediriger toutes les requêtes vers router.php
RUN echo "RewriteEngine On\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteRule ^(.*)$ router.php [QSA,L]" > .htaccess

# Ajuster les permissions
RUN chown -R www-data:www-data /var/www/html

# Exposer le port
EXPOSE 8080

# Apache démarre automatiquement avec l'image php:apache


