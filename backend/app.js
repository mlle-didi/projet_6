// App.js fait appel aux différentes fonctions implémentées dans l'API

// Import des modules npm - Ajout des plugins externes
const express = require('express'); // Importation d'express => Framework basé sur node.js

// Connection à la base de données MongoDB
const mongoose = require('mongoose');

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

// app.use (middleware) est un bloc de code qui traite les requêtes et réponses de votre application
app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = app;