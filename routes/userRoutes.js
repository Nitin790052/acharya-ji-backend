const express = require('express');
const router = express.Router();
console.log('User Management Routes Loading...');
const userController = require('../controllers/userController');

// Standard user management routes
router.get('/', userController.getUsers);
router.get('/stats', userController.getUserStats);
router.get('/:id', userController.getUserById);
router.patch('/:id/status', userController.updateUserStatus);
router.delete('/:id', userController.deleteUser);

module.exports = router;
