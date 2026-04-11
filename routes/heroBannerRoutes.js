const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const heroBannerController = require('../controllers/heroBannerController');
const { validateBanner } = require('../middleware/validate');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'carousels');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Append extension
    }
});

const upload = multer({ storage: storage });

router.get('/', heroBannerController.getAllBanners);
router.get('/active', heroBannerController.getActiveBanners);
router.post('/', upload.single('image'), heroBannerController.createBanner);
router.put('/:id', upload.single('image'), heroBannerController.updateBanner);
router.delete('/:id', heroBannerController.deleteBanner);
router.post('/seed', heroBannerController.seedBanners);

module.exports = router;
