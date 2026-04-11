const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const controller = require('../controllers/astrologyPageContentController');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'astrology');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `astrology_${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

// Seed routes
router.post('/seed', controller.seedData);
router.post('/force-seed', controller.forceSeed);

router.get('/', controller.getAllPages);
router.post('/', upload.fields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'deepDiveImage', maxCount: 1 }
]), controller.upsertPage);
router.get('/:slug', controller.getPageBySlug);
router.delete('/:slug', controller.deletePage);

module.exports = router;
