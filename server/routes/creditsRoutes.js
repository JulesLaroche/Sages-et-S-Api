// creditsRoutes.js

const express = require('express');
const router = express.Router();
const creditsController = require('../controllers/creditsController');
const verifyToken = require('../middleware/verifyToken');

// POST /credits
router.post('/', creditsController.addCredits);

// GET /credits/:user_id
router.get('/:user_id', creditsController.getUserCredits);

module.exports = router;
