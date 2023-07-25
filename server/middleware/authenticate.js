const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const connection = require("../config/database");

const secretKey = "jules"; // Remplacez par votre clé secrète

// Middleware pour vérifier le token
const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Token manquant, accès non autorisé." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token invalide, accès non autorisé." });
    }

    req.userId = decoded.userId;
    next();
  });
};

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
      console.log("test 10");
      // Définir le token comme un cookie avec une durée de validité de 1 heure
      res.cookie("token", token, {
        httpOnly: true, // Pour sécuriser le cookie contre les attaques XSS
        maxAge: 3600000, // Durée de validité du cookie en millisecondes (1 heure ici)
      });
      console.log("test 11");
      res.status(200).json({ message: "Connexion réussie", userId: user.id, token: token });
    });
  });
});

// Ajoutez une route pour déconnecter l'utilisateur (effacer le cookie)
router.post("/logout", (req, res) => {
  console.log("test 12");
  // Effacer le cookie en définissant une date d'expiration passée
  res.cookie("token", "", { expires: new Date(0) });
  res.status(200).json({ message: "Déconnexion réussie" });
});

// Nouvelle route pour vérifier le token
router.get("/verify-token", authenticate, (req, res) => {
  // Si le token est valide, l'utilisateur est authentifié
  res.status(200).json({ message: "Token valide, accès autorisé.", userId: req.userId });
});

module.exports = router;
