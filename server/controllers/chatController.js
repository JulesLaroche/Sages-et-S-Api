const Chat = require('../models/chatModel');

const ajouterMessage = (req, res) => {
  const { user_id, creator_id, message } = req.body;
  const created_at = new Date();

  Chat.ajouterMessage(user_id, creator_id, message, created_at, (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'ajout du message :', err);
      res.status(500).json({ error: 'Erreur lors de l\'ajout du message' });
    } else {
      console.log('Message ajouté avec succès');
      res.sendStatus(200);
    }
  });
};

const obtenirTousLesMessages = (req, res) => {
  Chat.obtenirTousLesMessages((err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des messages :', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
    } else {
      console.log('Messages récupérés avec succès');
      res.json(results);
    }
  });
};

module.exports = {
  ajouterMessage,
  obtenirTousLesMessages,
};
