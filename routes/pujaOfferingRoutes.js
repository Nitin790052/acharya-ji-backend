const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pujaOfferingController = require('../controllers/pujaOfferingController');

// Multer Setup
const uploadDir = path.join(__dirname, '..', 'uploads', 'puja-offerings');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.get('/', pujaOfferingController.getAllOfferings);
router.get('/:slug', pujaOfferingController.getOfferingBySlug);
router.post('/', upload.any(), pujaOfferingController.createOffering);
router.put('/:id', upload.any(), pujaOfferingController.updateOffering);
router.delete('/:id', pujaOfferingController.deleteOffering);
router.post('/seed', pujaOfferingController.seedOfferings);

module.exports = router;
