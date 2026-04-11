const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const galleryController = require('../controllers/galleryController');
const webpConvertMiddleware = require('../middleware/webpConvert');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'gallery');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit for gallery images
});

const uploadFields = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]);

router.get('/settings', galleryController.getSettings);
router.put('/settings', galleryController.updateSettings);

router.get('/', galleryController.getAllGallery);
router.get('/categories', galleryController.getCategories);
router.get('/category/:category', galleryController.getGalleryByCategory);
router.post('/', uploadFields, webpConvertMiddleware, galleryController.createGallery);
router.put('/:id', uploadFields, webpConvertMiddleware, galleryController.updateGallery);
router.delete('/:id', galleryController.deleteGallery);
router.post('/seed', galleryController.seedGallery);

module.exports = router;
