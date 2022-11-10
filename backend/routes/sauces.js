// Création du router qui contient les fonctions qui s'appliquent aux différentes routes pour les sauces
// Dans le routeur on ne veut QUE la logique de routing, ainsi la logique métier sera enregistrée dans le controller sauce.js

// Ajout de plugin externe nécessaire pour utiliser le router d'Express
const express = require('express');
// Appel du routeur avec la méthode mise à disposition par Express
const router = express.Router();

// Ajout des middleweares
// On importe le middleware auth pour sécuriser les routes
const auth = require('../middleware/auth'); // Récupère la configuration d'authentification JsonWebToken
//On importe le middleware multer pour la gestion des images
const multer = require('../middleware/multer-config');

// On associe les fonctions aux différentes routes, on importe le controller
const saucesCtrl = require('../controllers/sauces');

// Création des différentes ROUTES de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers

// Route qui permet de récupérer toutes les sauces
// Renvoie le tableau de toutes les sauces dans la base de données
router.get('/', auth, saucesCtrl.getAllSauce);

// Route qui permet de créer "une sauce"
/* Capture et enregistre l'image, analyse la sauce en utilisant une chaîne de caractères et l'enregistre dans la base de données, en définissant correctement son image URL. 
Remet les sauces aimées et celles détestées à 0, et les sauces usersliked et celles usersdisliked aux tableaux vides.*/
router.post('/', auth, multer, saucesCtrl.createSauce);

// Route qui permet de cliquer sur une des sauces précise
// Renvoie la sauce avec l'ID fourni
router.get('/:id', auth, saucesCtrl.getOneSauce);

// Route qui permet de modifier "une sauce"
/* Met à jour la sauce avec l'_id fourni. 
Si une image est téléchargée, elle est capturée et l’imageUrl de la sauce est mise à jour. 
Si aucun fichier n'est fourni, les informations sur la sauce se trouvent directement dans le corps de la requête (req.body.name, req.body.heat, etc.).
Si un fichier est fourni, la sauce transformée en chaîne de caractères se trouve dans req.body.sauce. */
router.put('/:id', auth, multer, saucesCtrl.modifySauce);

// Route qui permet de supprimer "une sauce"
// Supprime la sauce avec l'ID fourni.
router.delete('/:id', auth, saucesCtrl.deleteSauce);

module.exports = router;