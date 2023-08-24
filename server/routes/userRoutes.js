// routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/',  UserController.createUser);
router.delete('/:id',  UserController.deleteUser);
router.get('/:id',  UserController.getUserById);
router.get('/',  UserController.getAllUsers);
router.put('/:id',  UserController.updateUser);

module.exports = router;
