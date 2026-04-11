const express = require('express');
const router = express.Router();
const vastuPageContentController = require('../controllers/vastuPageContentController');
const multer = require('multer');
const path = require('path');

const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads', 'vastu');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/all', vastuPageContentController.getAll);
router.get('/slug/:slug', vastuPageContentController.getBySlug);
router.post('/upsert', upload.any(), vastuPageContentController.upsertPage);
router.delete('/:id', vastuPageContentController.remove);
router.patch('/status/:id', vastuPageContentController.updateStatus);
router.post('/seed', vastuPageContentController.seedData);
router.post('/force-seed', vastuPageContentController.forceSeed);

module.exports = router;
