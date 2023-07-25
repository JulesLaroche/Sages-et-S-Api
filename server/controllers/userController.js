// controllers/userController.js
const bcrypt = require('bcryptjs');
const User = require('../models/user');

class UserController {
  static async createUser(req, res) {
    try {
      const { id, firstname, lastname, email, category, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        id,
        firstname,
        lastname,
        email,
        category,
        password: hashedPassword
      };

      await User.createUser(newUser);

      res.status(200).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  static async deleteUser(req, res) {
    const userId = req.params.id;

    try {
      await User.deleteUser(userId);

      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  static async getUserById(req, res) {
    const userId = req.params.id;

    try {
      const user = await User.getUserById(userId);

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.getAllUsers();

      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  static async updateUser(req, res) {
    const userId = req.params.id;
    const updatedFields = req.body;

    try {
      await User.updateUser(userId, updatedFields);

      res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
  
  // ...
}

module.exports = UserController;
