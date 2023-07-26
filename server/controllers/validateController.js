const Validate = require('../models/validateModel');

const addValidation = (req, res) => {
    const { service_id, user_id, participant_id } = req.body;

    Validate.addValidation(service_id, user_id, participant_id, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de la validation :', err);
            res.status(500).json({ error: 'Erreur lors de l\'ajout de la validation' });
        } else {
            console.log('Validation ajoutée avec succès');
            res.json({});
        }
    });
};

const getServiceValidations = (req, res) => {
    const { service_id } = req.params;

    Validate.getServiceValidations(service_id, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des validations :', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des validations' });
        } else {
            console.log('Validations récupérées avec succès');
            res.json(results);
        }
    });
};

module.exports = {
    addValidation,
    getServiceValidations,
};
