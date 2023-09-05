# Backend de l'Application

![logo](https://github.com/JulesLaroche/Sages-et-S-Api/assets/124147377/63fd1768-2b24-494b-af0a-1009ca08d2fa)


Ce dépôt contient le code source du backend de notre application, qui alimente la plateforme en ligne de gestion de services, Sages & S. Ce backend est responsable de la gestion des données, des utilisateurs et de la logique métier de l'application.

## Dépendances

Le backend utilise diverses dépendances pour assurer son bon fonctionnement. Voici les principales dépendances utilisées :

- **bcryptjs**: Cette bibliothèque est utilisée pour le hachage sécurisé des mots de passe des utilisateurs, garantissant ainsi la confidentialité de leurs informations.

- **cookie-parser**: Cette dépendance facilite la gestion des cookies, ce qui est essentiel pour la gestion de session des utilisateurs.

- **cors**: CORS est utilisé pour gérer la politique de sécurité des navigateurs et permettre les requêtes HTTP entre différents domaines.

- **express**: Express est un framework Node.js qui facilite la création de routes et de gestionnaires pour les demandes HTTP.

- **express-fileupload**: Cette dépendance permet de gérer le téléchargement de fichiers sur le serveur.

- **express-session**: Express-session est utilisé pour la gestion des sessions utilisateur, assurant ainsi l'authentification et la sécurité des données.

- **jsonwebtoken**: Jsonwebtoken est utilisé pour la génération de tokens d'authentification, ce qui est essentiel pour sécuriser les communications entre le frontend et le backend.

- **multer**: Multer est utilisé pour gérer les téléchargements de fichiers et les stocker sur le serveur.

- **mysql**: MySQL est la base de données utilisée pour stocker les informations des utilisateurs et les données de l'application.


## Configuration

Avant de démarrer le backend, assurez-vous de configurer correctement les variables d'environnement, y compris les informations de connexion à la base de données, les clés secrètes pour les tokens JWT, etc. 

Auteur
Jules Laroche
