const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ctrl = require('../controllers/testimonialController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/testimonials/';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => cb(null, `testimonial-${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ 
    storage, 
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Not an image')) 
});

router.get('/settings', ctrl.getSettings);
router.put('/settings', ctrl.updateSettings);
router.get('/active', ctrl.getActive);
router.get('/', ctrl.getAll);
router.post('/seed', ctrl.seed);
router.post('/', upload.single('image'), ctrl.create);
router.put('/:id', upload.single('image'), ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
