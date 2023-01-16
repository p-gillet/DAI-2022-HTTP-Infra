#   Labo 5 DAI infrastructure HTTP
### Auteurs : Miguel Jalube, Paul Gillet
### Date : 2023-01-15

## Reverse proxy
Le service "reverse-proxy" utilise l'image "traefik:v2.9" et exécute la commande "--api.insecure=true --providers.docker".
Il expose les ports 80 et 8080 et monte le volume "/var/run/docker.sock" pour permettre à Traefik de détecter les autres conteneurs.

### docker-compose.yml
Le fichier docker compose est ce qui permet de lancer les différents services. Il contient les informations suivantes :
- Le nom du service
- L'image utilisée
- Les commandes à exécuter
- Les ports exposés
- Les volumes montés
- Les labels pour Traefik

Le reverse proxy est configuré sur le port 80 et le port 8080 est utilisé pour accéder à l'interface de Traefik.

### Traefik
Est un reverse proxy qui permet de rediriger les requêtes vers les différents services. Il est configuré pour détecter les autres conteneurs et rediriger les requêtes vers le bon service.

## Serveurs web static
Le service "static1" utilise une image construite de serveur web static.
Ce serveur s'occupe de charger des animaux générés par express-dynamic toutes les secondes grâce à des requêtes ajax.

Le service static est accessible depuis l'adresse http://localhost/

Le service "static2" est un serveur "miroir" dédoublé de static1.
Il permet d'équilibrer la charge entre les deux serveurs grâce au loadbalancing.

## Serveur dynamique
Le service "dynamic" utilise une image construite à partir du contexte "../express-image" qui est un serveur express qui génère des animaux aléatoirement et les retournent en JSON.
Le service est accessible à l'adresse http://localhost/api/animals.
### Exemple de réponse
```json
{
    "animal": "dog",
    "name": "Buddy",
    "age": 3,
    "color": "brown"
}
```
### index.js
le fichier index contient du code express qui écoute sur le port 3000 toutes les requêtes http entrantes.
Une fois qu'il a reçu une requête, il utilise la librairie chance pour générer des noms et des espèces d'animaux aléatoires.

### package.json
Le fichier package.json contient les dépendances npm du projet. Notamment express et chance.

## Service de management des conteneurs
Le service "management" utilise une image portainer qui est une interface web pour gérer les conteneurs Docker.
Ce service est accessible à l'adresse "http://localhost:9000".

## Conclusion
En résumé, cette configuration utilise Traefik comme reverse proxy pour diriger les demandes vers les différents services en fonction des règles de routage définies, et inclut des services statiques et dynamiques, un service de gestion pour Portainer.
le serveur fait également du loadbalancing entre les deux serveurs statiques et utilise les sticky sessions pour que les requêtes d'un même client soient toujours dirigées vers le même serveur.