const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ctrl = require('../controllers/aboutPageController');

const uploadDir = path.join(__dirname, '..', 'uploads', 'about');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Settings
router.get('/settings', ctrl.getSettings);
router.put('/settings', upload.single('journeyImage'), ctrl.updateSettings);

// Items
router.get('/items', ctrl.getAllItems);
router.get('/items/:tag', ctrl.getItemsByTag);
router.post('/items', upload.single('image'), ctrl.createItem);
router.put('/items/:id', upload.single('image'), ctrl.updateItem);
router.delete('/items/:id', ctrl.removeItem);

// Seed
router.post('/seed', ctrl.seed);

module.exports = router;
