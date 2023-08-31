const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const verifyToken = require('../middleware/verifyToken');

router.use(express.json());

// POST /chat/:service_id
router.post('/:service_id',
 chatController.ajouterMessage);

// GET /chat/:service_id
router.get('/:service_id',
  chatController.obtenirTousLesMessages);

// Nouvelle route pour obtenir toutes les conversations de l'utilisateur connecté
router.get('/user/:user_id',
  chatController.obtenirConversationsUtilisateur);

module.exports = router;