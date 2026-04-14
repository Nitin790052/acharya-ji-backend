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
        cb(null, `user-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
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
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/send-otp', userController.sendOtp);
router.post('/verify-otp', userController.verifyOtp);
router.get('/dashboard', protect, userController.getUserDashboard);
router.get('/orders', protect, userController.getUserOrders);
router.patch('/orders/:id/cancel', protect, userController.cancelOrder);
router.get('/history', protect, userController.getUserHistory);
router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateProfile);
router.put('/change-password', protect, userController.updatePassword);
router.post('/upload-avatar', protect, upload.single('avatar'), userController.uploadAvatar);

// Standard user management routes
router.get('/', userController.getUsers);
router.get('/stats', userController.getUserStats);
router.get('/:id', userController.getUserById);
router.patch('/:id/status', userController.updateUserStatus);
router.delete('/:id', userController.deleteUser);

module.exports = router;
