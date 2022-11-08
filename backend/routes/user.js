// On a besoin d'Express
const express = require('express');

// On crée un router avec la méthode mise à disposition par Express
const router = express.Router();

// On associe les fonctions aux différentes routes, on importe le controller
const userCtrl = require('../controllers/user');

// Création des routes Inscription et Connexion de l'API avec les middlewares
// et les controllers d'authentification et de sécurité qui leur sont appliquée

// Chiffre le mot de passe de l'utilisateur, ajoute l'utilisateur à la base dedonnées
router.post('/signup', userCtrl.signup); // Crée un nouvel utilisateur
// Vérifie les informations d'identification de l'utilisateur, enrenvoyant l'identifiant userID depuis la base de données et un TokenWeb JSON signé(contenant également l'identifiant userID)
router.post('/login', userCtrl.login); // Connecte un utilisateur

module.exports = router;