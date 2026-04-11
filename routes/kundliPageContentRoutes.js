const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ctrl = require('../controllers/kundliPageContentController');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'kundli');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `kundli_${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

router.get('/', ctrl.getAll);
router.get('/:slug', ctrl.getBySlug);
router.post('/', upload.fields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'deepDiveImage', maxCount: 1 }
]), ctrl.upsertPage);
router.delete('/:id', ctrl.remove);
router.patch('/:id/status', ctrl.updateStatus);
router.post('/seed', ctrl.seedData);
router.post('/force-seed', ctrl.forceSeed);

module.exports = router;

