// creditsModel.js

const connection = require('../config/database');

const addCredits = (user_id, amount, callback) => {
  const query = 'INSERT INTO credits (user_id, amount) VALUES (?, ?)';
  connection.query(query, [user_id, amount], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getUserCredits = (user_id, callback) => {
  const query = 'SELECT * FROM credits WHERE user_id = ?';
  connection.query(query, [user_id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  addCredits,
  getUserCredits,
};
