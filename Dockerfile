# Dockerfile pour le site portfolio PHP
FROM php:8.2-cli

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier les fichiers du projet
COPY . .

# Installer les dépendances PHP
RUN cd server && composer install --no-dev --optimize-autoloader

# Exposer le port (Render utilisera la variable PORT)
EXPOSE 8080

# Commande de démarrage avec options pour éviter les blocages
# Utiliser -t pour spécifier le répertoire racine et router.php comme routeur
CMD php -d max_execution_time=30 -d default_socket_timeout=10 -d memory_limit=128M -S 0.0.0.0:${PORT:-8080} router.php

