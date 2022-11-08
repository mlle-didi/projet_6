// Création d'un model user avec mongoose, on importe donc mongoose
const mongoose = require('mongoose');

// On rajoute ce validateur comme plugin
const uniqueValidator = require('mongoose-unique-validator'); // package qui valide l'unicité de l'email

// On crée notre schéma de données dédié à l'utilisateur
const userSchema = mongoose.Schema({
  // L'email doit être unique
  email: {
    type: String,
    unique: true,
    required: [true, "Veuillez entrer votre adresse email"],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte"]
  },
  // enregistrement du mot de passe
  password: {
    type: String,
    required: [true, "Veuillez choisir un mot de passe"]
  }
});

// Plugin pour garantir un email unique
// On applique ce validateur au schéma avant d'en faire un modèle et on appelle la méthode plugin et on lui passe uniqueValidator
userSchema.plugin(uniqueValidator);

// On exporte ce schéma sous forme de modèle : le modèle s'appellera user et on lui passe le shéma de données
module.exports = mongoose.model('User', userSchema);