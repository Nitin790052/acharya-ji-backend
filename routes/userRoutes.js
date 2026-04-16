const express = require('express');
const router = express.Router();
console.log('User Management Routes Loading...');
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer Config for User Avatars
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/users/';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const prefix = req.user ? `user-${req.user.id}` : 'reg';
        cb(null, `${prefix}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Not an image! Please upload an image.'), false);
    }
});

// Auth and Specific Routes
router.post('/register', upload.single('avatar'), userController.registerUser);
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
router.post('/upload-avatar', protect, upload.single('avatar'), userController.uploadAvatar);
router.post('/add-money', protect, userController.addMoney);
router.post('/pay-all-pending', protect, userController.payAllPending);

// Standard user management routes
router.get('/', userController.getUsers);
router.get('/stats', userController.getUserStats);
router.get('/:id', userController.getUserById);
router.patch('/:id/status', userController.updateUserStatus);
router.delete('/:id', userController.deleteUser);

module.exports = router;
