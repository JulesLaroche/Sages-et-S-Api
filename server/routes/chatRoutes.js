const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// POST /chat
router.post('/', chatController.ajouterMessage);

// GET /chat
router.get('/', chatController.obtenirTousLesMessages);

module.exports = router;