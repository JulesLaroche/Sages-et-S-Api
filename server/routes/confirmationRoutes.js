const express = require('express');
const router = express.Router();
const confirmationController = require('../controllers/confirmationController');

// POST /confirmation
router.post('/', confirmationController.addConfirmation);

// GET /confirmation/:service_id/:user_id/:Id
router.get('/:service_id/:user_id/:Id', confirmationController.getConfirmation);

module.exports = router;
