const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
// POST /service
router.post('/', serviceController.createService);

// GET /service/:id
router.get('/:id', serviceController.getServiceById);

// GET /service
router.get('/', serviceController.getAllServices);

// PUT /service/:id
router.put('/:id', serviceController.updateService);

// DELETE /service/:id
router.delete('/:id', serviceController.deleteService);

// GET /service/user/:userId
router.get('/user/:userId', serviceController.getServicesByUserId);

// GET /service/edit/:id
router.get('/edit/:id', serviceController.getServiceForEdit);



module.exports = router;
