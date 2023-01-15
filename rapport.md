#   Labo 5 DAI infrastructure HTTP
### Auteurs: Miguel Jalube, Paul Gillet
### Date: 2023-01-15

## Reverse proxy
Le service "reverse-proxy" utilise l'image "traefik:v2.9" et exécute la commande "--api.insecure=true --providers.docker". 
Il expose les ports 80 et 8080 et monte le volume "/var/run/docker.sock" pour permettre à Traefik de détecter les autres conteneurs.

## Serveurs web static
Le service "static1" utilise une image construite de serveur web static. Ce serveur s'occupe de charger des animaux générés par express-dynamic toutes les x secondes grâce à des requetes ajax.

Le service "static2" est un serveur "miroir" dédoublé de static1. Il permet d'équilibrer la charge entre les deux serveurs.

## Serveur dynamique
Le service "dynamic" utilise une image construite à partir du contexte "../express-image" qui est un serveur express qui génère des animaux aléatoirement et les retourne en JSON.

## Service de management des conteneurs
Le service "management" utilise une image portainer qui est une interface web pour gérer les conteneurs Docker.

## Conclusion
En résumé, cette configuration utilise Traefik comme reverse proxy pour diriger les demandes vers les différents services en fonction des règles de routage définies, et inclut des services statiques et dynamiques, un service de gestion pour Portainer.
le serveur fait également du load balancing entre les deux serveurs statiques et utilise les sticky sessions pour que les requêtes d'un même client soient toujours dirigées vers le même serveur.