const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const connection = require("../config/database");
const verifyToken = require('../middleware/verifyToken');

const secretKey = "jules"; // Remplacez par votre clé secrète




router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  const values = [email];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.log("test 6");
      console.error("Erreur lors de la recherche de l'utilisateur :", err);
      res.status(500).json({ error: "Erreur serveur" });
      return;
    }

    if (results.length === 0) {
      console.log("test 7");
      res.status(401).json({ error: "Identifiants invalides" });
      return;
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, passwordMatch) => {
      if (err) {
        console.log("test 8");
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
        return;
      }

      if (!passwordMatch) {
        console.log("test 9");
        res.status(401).json({ error: "Identifiants invalides" });
        return;
      }

      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1h",
      });
      console.log("test 10-2");
      // Définir le token comme un cookie avec une durée de validité de 1 heure
      res.cookie("token", token, {
        httpOnly: true, // Pour sécuriser le cookie contre les attaques XSS
        maxAge: 3600000, // Durée de validité du cookie en millisecondes (1 heure ici)
      });
      console.log("test 11-2");
      res.status(200).json({ message: "Connexion réussie", userId: user.id });
    });
  });
});





module.exports = router;
