// App.js fait appel aux différentes fonctions implémentées dans l'API

// Import des modules npm - Ajout des plugins externes
const express = require('express'); // Importation d'express => Framework basé sur node.js

// On importe mongoose pour pouvoir utiliser la base de données
const mongoose = require('mongoose'); // Plugin Mongoose pour se connecter à la data base Mongo Db

// On donne accès au chemin de notre système de fichier
const path = require('path'); // Plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier

// Déclaration des routes
// On importe la route dédiée aux sauces
const saucesRoutes = require('./routes/sauces');
// On importe la route dédiée aux utilisateurs
const userRoutes = require('./routes/user');

// Connection à la base de données MongoDB
mongoose.connect('mongodb+srv://mlle-didi:i9L9mRmAsRfHev2G@cluster0.lfwodbx.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// Création d'une application express
const app = express(); // L'application utilise le framework express

// Analyse le corps de la requête
app.use(express.json());

// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
    // on indique que les ressources peuvent être partagées depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // on indique les méthodes autorisées pour les requêtes HTTP
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Gestion de la ressource image de façon statique
// Midleware qui permet de charger les fichiers qui sont dans le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes pour la gestion de toute les ressources de l'API attendues - Routage
// Middleware qui va transmettre les requêtes vers ces url vers les routes correspondantes

// Va servir les routes dédiées aux sauces
app.use('/api/sauces', saucesRoutes);

// Va servir les routes dédiées aux utilisateurs
app.use('/api/auth', userRoutes);

module.exports = app;