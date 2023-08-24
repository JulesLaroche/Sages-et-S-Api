const Chat = require('../models/chatModel');
const connection = require('../config/database');

const ajouterMessage = (req, res) => {
  const { user_id, creator_id, message } = req.body;
  const service_id = req.params.service_id; // Récupérer l'ID du service depuis les paramètres d'URL
  const created_at = new Date();

  Chat.ajouterMessage(user_id, creator_id, service_id, message, created_at, (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'ajout du message :', err);
      res.status(500).json({ error: 'Erreur lors de l\'ajout du message' });
    } else {
      console.log('Message ajouté avec succès');
      res.sendStatus(200); // Répondre avec le statut 200 OK
    }
  });
};


const obtenirTousLesMessages = (req, res) => {
  const service_id = req.params.service_id; // Récupérer le service_id depuis les paramètres d'URL
  const query = 'SELECT * FROM chat WHERE service_id = ?'; // Ajouter une clause WHERE pour filtrer par service_id
  connection.query(query, [service_id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des messages :', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
    } else {
      console.log('Messages récupérés avec succès');
      res.json(results);
    }
  });
};

const obtenirConversationsUtilisateur = (req, res) => {
  const user_id = req.params.user_id;

  const query = `
    SELECT * FROM chat
    WHERE user_id = ? OR creator_id = ?
  `;

  connection.query(query, [user_id, user_id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des conversations :', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des conversations' });
    } else {
      console.log('Conversations récupérées avec succès');
      res.json(results);
    }
  });
};



module.exports = {
  ajouterMessage,
  obtenirTousLesMessages,
  obtenirConversationsUtilisateur, // Ajout de la nouvelle fonction
};