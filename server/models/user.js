// models/user.js

const connection = require('../config/database');

class User {
  // ...

  static createUser(user) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (id, firstname, lastname, email, category, password) VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [user.id, user.firstname, user.lastname, user.email, user.category, user.password];

      connection.query(query, values, (err, result) => {
        if (err) {
          console.error('Erreur lors de la création d\'un nouvel utilisateur :', err);
          reject(err);
        } else {
          console.log('Nouvel utilisateur créé avec succès');
          resolve(result);
        }
      });
    });
  }

  static deleteUser(userId) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM users WHERE id = ?';

      connection.query(query, userId, (err, result) => {
        if (err) {
          console.error('Erreur lors de la suppression de l\'utilisateur :', err);
          reject(err);
        } else {
          console.log('Utilisateur supprimé avec succès');
          resolve(result);
        }
      });
    });
  }

  static getUserById(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?';

      connection.query(query, userId, (err, result) => {
        if (err) {
          console.error('Erreur lors de la récupération de l\'utilisateur :', err);
          reject(err);
        } else {
          if (result.length > 0) {
            const user = result[0];
            resolve(user);
          } else {
            reject(new Error('Utilisateur non trouvé'));
          }
        }
      });
    });
  }

  static getAllUsers() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users';

      connection.query(query, (err, results) => {
        if (err) {
          console.error('Erreur lors de la récupération des utilisateurs :', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static updateUser(userId, updatedFields) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE users
        SET firstname = ?, lastname = ?, address = ?, postal_code = ?, city = ?, category = ?, content = ?, img_name = ?
        WHERE id = ?
      `;
      const values = [
        updatedFields.firstname,
        updatedFields.lastname,
        updatedFields.address,
        updatedFields.postal_code,
        updatedFields.city,
        updatedFields.category,
        updatedFields.content,
        updatedFields.img_name,
        userId
      ];

      connection.query(query, values, (err, result) => {
        if (err) {
          console.error('Erreur lors de la mise à jour de l\'utilisateur :', err);
          reject(err);
        } else {
          console.log('Utilisateur mis à jour avec succès');
          resolve(result);
        }
      });
    });
  }
  
  // ...
}

module.exports = User;
