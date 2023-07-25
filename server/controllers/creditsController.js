// creditsController.js

const Credits = require('../models/creditsModel');

const addCredits = (req, res) => {
  const { user_id, amount } = req.body;

  Credits.addCredits(user_id, amount, (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'ajout des crédits :', err);
      res.status(500).json({ error: 'Erreur lors de l\'ajout des crédits' });
    } else {
      console.log('Crédits ajoutés avec succès');
      res.json({});
    }
  });
};

const getUserCredits = (req, res) => {
  const { user_id } = req.params;

  Credits.getUserCredits(user_id, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des crédits :', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des crédits' });
    } else {
      console.log('Crédits récupérés avec succès');
      res.json(results);
    }
  });
};

module.exports = {
  addCredits,
  getUserCredits,
};
