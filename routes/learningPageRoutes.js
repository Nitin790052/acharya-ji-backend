const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learningPageContentController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg|mp4|webm|ogg|mov|avi/;
    const extValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeValid = /^(image|video)\//.test(file.mimetype);
    cb(null, extValid && mimeValid);
};
const upload = multer({ storage, fileFilter, limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB max

router.get('/overview', learningController.getOverview);
router.get('/', learningController.getAllPages);
router.get('/:slug', learningController.getLearningPageBySlug);
router.post('/seed', learningController.seedLearningHub);
router.patch('/status/:slug', learningController.updateStatus);
router.put('/settings/:slug', learningController.updatePageSettings);

// Item routes (image or video)
router.post('/item/:slug', upload.single('image'), learningController.createItem);
router.put('/item/:slug/:itemId', upload.single('image'), learningController.updateItem);
router.delete('/item/:slug/:itemId', learningController.deleteItem);

// Media Upload route for generic setting images/videos
router.post('/upload-image', upload.single('image'), (req, res) => {
    if (req.file) {
        res.json({ imageUrl: `/uploads/${req.file.filename}` });
    } else {
        res.status(400).json({ message: 'No file uploaded' });
    }
});

router.delete('/delete-media', learningController.deleteMedia);

module.exports = router;
