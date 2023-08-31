// routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/',verifyToken, UserController.createUser);
router.delete('/:id',verifyToken, UserController.deleteUser);
router.get('/:id',verifyToken, UserController.getUserById);
router.get('/',verifyToken, UserController.getAllUsers);
router.put('/:id',verifyToken, UserController.updateUser);

module.exports = router;
