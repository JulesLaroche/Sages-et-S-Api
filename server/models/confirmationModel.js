const connection = require('../config/database');

const addConfirmation = (formData, callback) => {
  const {
    adress,
    tel,
    date,
    id_apprenti,
    id_sage,
    id_service
  } = formData;
  const query = 'INSERT INTO confirmation (adress, tel, date, id_apprenti, id_sage, id_service) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [adress, tel, date, id_apprenti, id_sage, id_service], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getConfirmation = (service_id, user_id, Id, callback) => {
  const query = 'SELECT * FROM confirmation WHERE id_service = ? AND id_apprenti = ? AND id_sage = ?';
  connection.query(query, [service_id, user_id, Id], (err, results) => {
      if (err) {
          callback(err, null);
      } else {
          callback(null, results);
      }
  });
};
  
  module.exports = {
    addConfirmation,
    getConfirmation,
  };