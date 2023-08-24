const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const verifyToken = require('../middleware/verifyToken');

// Route POST pour le formulaire de contact
router.post('/', contactController.createContact);

module.exports = router;