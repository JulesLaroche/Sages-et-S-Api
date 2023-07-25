const connection = require('../config/database');

const getServiceById = (id, callback) => {
  const sql = 'SELECT * FROM services WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      if (result.length > 0) {
        callback(null, result[0]);
      } else {
        callback(null, null);
      }
    }
  });
};

const getAllServices = (callback) => {
  const query = `SELECT id, title, type, category, description, price, disponibilite, address, postal_code, img_name, city, user_id FROM services`;
  connection.query(query, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const createService = (title, type, category, description, price, disponibilite, address, postal_code, img_name, city, user_id, callback) => {
  const query = `INSERT INTO services (title, type, category, description, price, disponibilite, address, postal_code, img_name, city, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [title, type, category, description, price, disponibilite, address, postal_code, img_name, city, user_id];
  connection.query(query, values, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const deleteService = (id, callback) => {
  const query = `DELETE FROM services WHERE id = ?`;
  const values = [id];
  connection.query(query, values, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getServicesByUserId = (userId, callback) => {
  const query = `SELECT id, title, type, category, description, price, disponibilite, address, postal_code, img_name, city FROM services WHERE user_id = ?`;
  const values = [userId];
  connection.query(query, values, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getServiceForEdit = (id, callback) => {
  const query = `SELECT id, title, type, category, description, price, disponibilite, address, postal_code, img_name, city FROM services WHERE id = ?`;
  const values = [id];
  connection.query(query, values, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result[0]);
    }
  });
};

const updateService = (id, title, type, category, description, price, disponibilite, address, postal_code, img_name, city, callback) => {
  const query = `UPDATE services SET title = ?, type = ?, category = ?, description = ?, price = ?, disponibilite = ?, address = ?, postal_code = ?, img_name = ?, city = ? WHERE id = ?`;
  const values = [title, type, category, description, price, disponibilite, address, postal_code, img_name, city, id];
  connection.query(query, values, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = {
  getServiceById,
  getAllServices,
  createService,
  deleteService,
  getServicesByUserId,
  getServiceForEdit,
  updateService
};
