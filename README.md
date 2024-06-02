# Mon API Node.js avec Express et MySQL

Ce projet est une API construite avec Node.js, Express.js et MySQL. Ce guide vous aidera à installer et configurer l'API sur votre machine locale.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) (version 6 ou supérieure)
- [MySQL](https://www.mysql.com/) (version 5.7 ou supérieure)

## Installation

Suivez les étapes ci-dessous pour installer et configurer le projet :

### 1. Cloner le dépôt

git clone https://github.com/votre-utilisateur/jobBoard_backend.git

2. Installer les dépendances

npm install

3. Configurer la base de données

Créez une base de données MySQL et importez le schéma de base de données fourni (si disponible).
4. Configurer les variables d'environnement

Créez un fichier .env à la racine du projet et ajoutez les variables suivantes :

DB_USER="root"
DB_PASSWORD="123456"
SECRET_KEY="secretpasswordsecret"

5. Lancer l'application

npm start

L'application devrait maintenant être en cours d'exécution sur http://localhost:3020.
