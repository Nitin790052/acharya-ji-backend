const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const serviceController = require('../controllers/serviceController');

// Multer Setup
const uploadDir = path.join(__dirname, '..', 'uploads', 'services');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.get('/', serviceController.getAllServices);
router.get('/active', serviceController.getActiveServices);
router.post('/', upload.single('image'), serviceController.createService);
router.put('/:id', upload.single('image'), serviceController.updateService);
router.post('/toggle-active/:id', serviceController.toggleActiveService);
router.delete('/:id', serviceController.deleteService);
router.post('/seed', serviceController.seedServices);

module.exports = router;
