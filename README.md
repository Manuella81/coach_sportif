**COACH-SPORTIF**

Bienvenue sur le projet coach sportif. Il s'agit d'un site fictif de mise en relation de coach et de personne cherchant un coach pour des activités spotives diverses.
Le code respecte l'architecture MVC.
Utilisation de react.js en front et de node.js pour le back.
Connection à une base de données mysql.

**ORGANISATION DU CODE :**

Le dossier api-back gère le backend:
- Le serveur Express est configuré dans le fichier **server.js**. Il permet de démarrer le serveur et configurer les routes et les middlewares nécessaires pour répondre aux requêtes des clients.
- Le **dossier models** contient les fichiers qui gèrent toutes les interactions avec la base de données. Ces fichiers encapsulent les logiques d'accès aux données. Manipulation des données avec le CRUD (Create, Read, Update, Delete)
- Le **dossier routes** contient toutes les routes qui va permettre à mon API de répondre à mes requêtes HTTP. Ces routes définissent quelles actions doivent être prises en réponse à différentes méthodes HTTP telles que GET, POST, PUT, DELETE, etc. Elles définissent donc les points d'entrée de l'API et spécifient comment les requêtes HTTP entrantes doivent être gérées par le serveur.
- Utilisation du middlewares **withAuth.js** et **withAuthUser.js** pour les routes protégées, c'est à dire lorsque le coach ou l'utilisateur doivent être connecté. Elles permettent donc de définir et gérer les routes liées à la gestion des coachs administrateurs et utilisateurs de l'API.
- Dans **config.js** et **config.exemple** sont stockés les variables de configuration de la base de données.


Le dossier coachme-admin-18 gère le front côté coach:
- **dossier api**: récupération des routes de l'api-back. Permet de communiquer avec le serveur back-end afin d'accéder et de manipuler les données.
- **dossier components**: utilisé pour organiser et regrouper les différents composants réutilisables de l'interface administrateur. Chaque composant représente généralement une partie de l'interface administrateur.
**addLesson.jsx** permet d'afficher le formulaire d'ajout d'une leçon.
**calendar.jsx** permet d'afficher le calendrier qui va permettre d'enregistrer les dates des cours par le coach. Utilisation de la bibliothèque Moment.js qui va permettre de manipuler, valider et formater des dates et des heures. 
- **dossier containers**: regroupe les composants qui sont chargés de la logique d'interaction avec les données via des appels à l'API ou à un état global (Redux).
- **dossier helpers**: regroupe les fonctions utilitaires communes à différentes parties de l'application. On y retrouve le fichier **require-auth-data.jsx** qui est utilisée pour vérifier si un admin est authentifié avant de lui permettre l'accès à certaines parties de l'application. Elle encapsule donc la logique d'authentification. Et **sport.jsx** contient la liste de tous les sports que pourra sélectionner le coach.
- **dossier slices**: regroupe les "slices" ou les tranches de l'état global de l'application géré par Redux et le **store.jsx** qui centralise et gére l'état global de l'application.
**coachSlice.jsx** permet de gérer les informations sur le coach administrateur connecté, y compris les actions pour se connecter, se déconnecter, mettre à jour les informations administrateur, etc.
**beerSlice.jsx** permet de gérer les lessons du coach.
- **config.js**: stocke l'URL de base de l'API 
- **App.js**: c'est le point d'entrée principal de l'application. On y retrouve la structure de base de l'application, y compris les routes.

Le dossier coach-web-user gère le front côté utilisateur du service:
- **dossier api**: récupération des routes de l'api-back. Permet de communiquer avec le serveur back-end afin d'accéder et de manipuler les données.
- **dossier components**: utilisé pour organiser et regrouper les différents composants réutilisables de l'interface utilisateur. Chaque composant représente généralement une partie de l'interface utilisateur.
**checkout-form.jsx** stocke la fonction de gestion du paiement via stripe.
- **dossier containers**: regroupe les composants qui sont chargés de la logique d'interaction avec les données via des appels à l'API ou à un état global (Redux).
- **dossier helpers**: regroupe les fonctions utilitaires communes à différentes parties de l'application. On y retrouve le fichier **require-auth-data.jsx** qui est utilisée pour vérifier si un utilisateur est authentifié avant de lui permettre l'accès à certaines parties de l'application. Elle encapsule donc la logique d'authentification.
- **dossier slices**: regroupe les "slices" ou les tranches de l'état global de l'application géré par Redux et le **store.jsx** qui centralise et gére l'état global de l'application.
**userSlice.jsx** permet de gérer les informations sur l'utilisateur connecté, y compris les actions pour se connecter, se déconnecter, mettre à jour les informations utilisateur, etc.
**basketSlice** gère l'état global spécifique au panier. Ce fichier est ensuite importé dans le store Redux de l'application pour être inclus dans l'état global et utilisé par les composants pour gérer l'état du panier. Le fichier basketSlice.jsx va être utilisé pour le panier et dans le Header (pour afficher le nombre de cours sélectionné) 
- **config.js**: stocke l'URL de base de l'API
- **App.js**: c'est le point d'entrée principal de l'application. On y retrouve la structure de base de l'application, y compris les routes.

**ORGANISATION DU SITE :**

**Espace utilisateur :**

- Home: la page d'accueil avec un formulaire qui va permettre de taper une adresse pour trouver un coach en fonction du sport saisit et dans un rayon définit. Le nom des coach s'affichent ensuite sur une map afin de visualiser où ils se trouvent exactement.
Le composant React CloudinaryContext est utilisé pour envelopper les marqueurs de coachs sur la carte Google Maps afin de charger et d'afficher les images des coachs à partir de Cloudinary.
Le composant React GoogleMapReact est utilisé pour afficher la carte Google Maps. Il est configuré avec une clé API Google Maps (API_KEY) et reçoit les coordonnées de position (position) et le niveau de zoom (zoom) en tant que props. Les marqueurs des coachs sont créés et affichés sur la carte à l'aide de createMarkers().
Nominatim est utilisé pour géocoder l'adresse fournie par l'utilisateur. 
- Panier: liste des cours choisis par l'utilisateur
- Profil: affiche le profil de l'utilisateur
- Se connecter ou se déconnecter

**Espace administrateur du site :**  

- Profil: affiche le profil du coach.
CloudinaryContext est utilisé pour envelopper les images de profil des coachs. Cela permet d'utiliser les fonctionnalités de Cloudinary, notamment le chargement et l'affichage des images.
Nominatim est utilisé pour géocoder l'adresse fournie par le coach. 
- Espace administrateur: va permettre à l'admistrateur d'ajouter un cours. Et possibilité de voir tous les cours, les cours avenir et les cours passés.

**QUELQUES CAPTURES D'ECRAN**

ADMIN HOMEPAGE
![admin_home](https://github.com/Manuella81/coach_sportif/assets/101250152/55c0bf90-f4ec-4f6c-a212-a7ec91bc27a9)

ADMIN LOGIN
![admin_login](https://github.com/Manuella81/coach_sportif/assets/101250152/f640fc38-8c6b-49c9-a314-bc11065ec697)

ADMIN PROFIL
![admin_profil](https://github.com/Manuella81/coach_sportif/assets/101250152/bc6ba6bb-a6f1-4d68-a31c-fe329e5f9bf4)

ADMIN AJOUT PHOTO DE PROFIL
![admin_photoProfil](https://github.com/Manuella81/coach_sportif/assets/101250152/c493884b-0430-4800-95be-cf8619f76537)

ADMIN AJOUT D'UNE LECON
![admin_add_lesson](https://github.com/Manuella81/coach_sportif/assets/101250152/2742980a-71e8-4555-a98d-b06a9472864f)

USER HOMEPAGE
![user_home](https://github.com/Manuella81/coach_sportif/assets/101250152/095e5f65-cec5-47cf-86ed-851bac066521)

USER AJOUT D'UN COURS
![user_add](https://github.com/Manuella81/coach_sportif/assets/101250152/7788d960-6186-4ba7-82e2-e5430c73f8af)

USER PANIER
![user_basket](https://github.com/Manuella81/coach_sportif/assets/101250152/44e9d7ca-fa78-495f-86d5-e21bd896f0be)

USER PAIEMENT
![user_payment](https://github.com/Manuella81/coach_sportif/assets/101250152/d5b05fb2-c2b7-4cbf-ae05-56c105e397d6)
