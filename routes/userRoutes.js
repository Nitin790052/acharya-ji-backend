const express = require('express');
const router = express.Router();
console.log('User Management Routes Loading...');
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { uploadSingle } = require('../middleware/cloudinaryUpload');

// Auth and Specific Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/send-otp', userController.sendOtp);
router.post('/verify-otp', userController.verifyOtp);
router.get('/dashboard', protect, userController.getUserDashboard);
router.get('/orders', protect, userController.getUserOrders);
router.patch('/orders/:id/cancel', protect, userController.cancelOrder);
router.delete('/orders/:id', protect, userController.deleteOrder);
router.post('/orders/:id/pay', protect, userController.payOrder);
router.get('/history', protect, userController.getUserHistory);
router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateProfile);
router.put('/change-password', protect, userController.updatePassword);
router.post('/upload-avatar', protect, uploadSingle('avatar', 'users'), userController.uploadAvatar);
router.post('/add-money', protect, userController.addMoney);
router.post('/pay-all-pending', protect, userController.payAllPending);

// Standard user management routes
router.get('/', userController.getUsers);
router.get('/stats', userController.getUserStats);
router.get('/:id', userController.getUserById);
router.patch('/:id/status', userController.updateUserStatus);
router.delete('/:id', userController.deleteUser);

module.exports = router;
