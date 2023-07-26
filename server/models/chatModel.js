const connection = require('../config/database');

const ajouterMessage = (user_id, creator_id, service_id, message, created_at, callback) => {
  const query = 'INSERT INTO chat (user_id, creator_id, service_id, message, created_at) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [user_id, creator_id, service_id, message, created_at], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const obtenirTousLesMessages = (service_id, callback) => {
  const query = 'SELECT * FROM chat WHERE service_id = ?'; // Utiliser le paramètre service_id dans la requête SQL pour filtrer les messages
  connection.query(query, [service_id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};



module.exports = {
  ajouterMessage,
  obtenirTousLesMessages,
};
