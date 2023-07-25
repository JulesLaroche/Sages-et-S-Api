const connection = require('../config/database');

const ajouterMessage = (user_id, creator_id, message, created_at, callback) => {
  const query = 'INSERT INTO chat (user_id, creator_id, message, created_at) VALUES (?, ?, ?, ?)';
  connection.query(query, [user_id, creator_id, message, created_at], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const obtenirTousLesMessages = (callback) => {
  const query = 'SELECT * FROM chat';
  connection.query(query, (err, results) => {
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