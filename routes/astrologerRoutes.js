const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const astrologerController = require('../controllers/astrologerController');

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/astrologers/';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `astrologer-${Date.now()}${path.extname(file.originalname)}`);
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

// Settings Routes
router.get('/settings', astrologerController.getSettings);
router.put('/settings', astrologerController.updateSettings);

// Record Routes
router.get('/active', astrologerController.getActiveAstrologers);
router.get('/', astrologerController.getAllAstrologers);
router.post('/seed', astrologerController.seedAstrologers);
router.post('/', upload.single('image'), astrologerController.createAstrologer);
router.put('/:id', upload.single('image'), astrologerController.updateAstrologer);
router.delete('/:id', astrologerController.deleteAstrologer);

module.exports = router;
