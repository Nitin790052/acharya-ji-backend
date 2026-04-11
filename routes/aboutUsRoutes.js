const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const aboutUsController = require('../controllers/aboutUsController');

const uploadDir = path.join(__dirname, '..', 'uploads', 'about');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/', aboutUsController.getAllAboutUs);
router.get('/active', aboutUsController.getActiveAboutUs);
router.post('/', upload.single('image'), aboutUsController.createAboutUs);
router.put('/activate/:id', aboutUsController.activateAboutUs);
router.put('/:id', upload.single('image'), aboutUsController.updateAboutUs);
router.delete('/:id', aboutUsController.deleteAboutUs);

module.exports = router;
