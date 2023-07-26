const express = require('express');
const router = express.Router();
const validateController = require('../controllers/validateController');

// POST /validate
router.post('/', validateController.addValidation);

// GET /validate/:service_id
router.get('/:service_id', validateController.getServiceValidations);

module.exports = router;
