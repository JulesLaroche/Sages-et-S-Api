const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken'); // Importez le middleware
const serviceController = require('../controllers/serviceController');

// POST /service
router.post('/', verifyToken, serviceController.createService);

// GET /service/:id
router.get('/:id',verifyToken,  serviceController.getServiceById);

// GET /service
router.get('/', verifyToken, serviceController.getAllServices);

// PUT /service/:id
router.put('/:id',verifyToken,  serviceController.updateService);

// DELETE /service/:id
router.delete('/:id',verifyToken,  serviceController.deleteService);

// GET /service/user/:userId
router.get('/user/:userId',verifyToken, serviceController.getServicesByUserId);

// GET /service/edit/:id
router.get('/edit/:id',verifyToken,  serviceController.getServiceForEdit);

module.exports = router;