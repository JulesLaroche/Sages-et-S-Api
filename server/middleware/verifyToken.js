// middleware/verifyToken.js

const jwt = require("jsonwebtoken");

const secretKey = "jules"; // Clé secrète pour décoder le token

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Essaye de récupérer le token depuis les cookies ou les en-têtes

  if (!token) {
    return res.status(401).json({ error: "Token manquant, accès non autorisé." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error("Erreur lors de la vérification du token:", err);
      return res.status(403).json({ error: "Token invalide, accès non autorisé." });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;