const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mediaController = require('../controllers/mediaController');
const webpConvertMiddleware = require('../middleware/webpConvert');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'media');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 150 * 1024 * 1024 } // 150MB limit
});

// Media Settings (Stats)
router.get('/settings', mediaController.getMediaSettings);
router.put('/settings', mediaController.updateMediaSettings);

router.get('/', mediaController.getAllMedia);
router.get('/type/:type', mediaController.getMediaByType);
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), webpConvertMiddleware, mediaController.createMedia);
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), webpConvertMiddleware, mediaController.updateMedia);
router.delete('/:id', mediaController.deleteMedia);
router.get('/fetch-yt-metadata/:id', mediaController.fetchYTMetadata);
router.post('/seed', mediaController.seedMedia);

module.exports = router;
