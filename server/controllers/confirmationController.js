const Confirmation = require('../models/confirmationModel');

const addConfirmation = (req, res) => {
  const formData = req.body;

  Confirmation.addConfirmation(formData, (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de la confirmation :', err);
      res.status(500).json({ error: 'Erreur lors de l\'ajout de la confirmation' });
    } else {
      console.log('Confirmation ajoutée avec succès');
      res.json({});
    }
  });
};

const getConfirmation = (req, res) => {
  const { service_id, user_id, Id } = req.params;

  Confirmation.getConfirmation(service_id, user_id, Id, (err, results) => {
      if (err) {
          console.error('Erreur lors de la récupération de la confirmation :', err);
          res.status(500).json({ error: 'Erreur lors de la récupération de la confirmation' });
      } else {
          console.log('Confirmation récupérée avec succès');
          res.json(results);
      }
  });
};
  
  module.exports = {
    addConfirmation,
    getConfirmation,
  };