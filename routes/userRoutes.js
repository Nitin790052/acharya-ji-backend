const express = require('express');
const router = express.Router();
console.log('User Management Routes Loading...');
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Auth and Specific Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/send-otp', userController.sendOtp);
router.post('/verify-otp', userController.verifyOtp);
router.get('/dashboard', protect, userController.getUserDashboard);

// Standard user management routes
router.get('/', userController.getUsers);
router.get('/stats', userController.getUserStats);
router.get('/:id', userController.getUserById);
router.patch('/:id/status', userController.updateUserStatus);
router.delete('/:id', userController.deleteUser);

module.exports = router;
