const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const popularPujaController = require('../controllers/popularPujaController');
const { validatePopularPuja } = require('../middleware/validate');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'popularServices');
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

router.get('/', popularPujaController.getAllPujas);
router.get('/settings', popularPujaController.getSettings);
router.put('/settings', popularPujaController.updateSettings);

router.get('/active', popularPujaController.getActivePujas);
router.post('/seed', popularPujaController.seedPujas);
router.post('/', upload.single('image'), validatePopularPuja, popularPujaController.createPuja);
router.put('/:id', upload.single('image'), validatePopularPuja, popularPujaController.updatePuja);
router.delete('/:id', popularPujaController.deletePuja);

module.exports = router;
