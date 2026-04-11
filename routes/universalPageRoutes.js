const express = require('express');
const router = express.Router();
console.log('Universal Page Routes Loading...');
const universalController = require('../controllers/universalPageController');
const multer = require('multer');
const path = require('path');

// Multer storage for media
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg|mp4|webm|ogg|mov|avi/;
    const extValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeValid = /^(image|video)\//.test(file.mimetype);
    cb(null, extValid && mimeValid);
};

const upload = multer({ 
    storage, 
    fileFilter, 
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB for video support
});

// Public Routes
router.get('/overview', universalController.getPagesOverview);
router.get('/:slug', universalController.getPageBySlug);

// Admin Routes (Protection middleware can be added here)
router.post('/update/:slug', universalController.updatePageContent);
router.delete('/:slug', universalController.deletePage);
router.post('/upload-media', upload.single('media'), universalController.uploadMedia);
router.post('/purge-media', universalController.deleteMedia);

module.exports = router;
