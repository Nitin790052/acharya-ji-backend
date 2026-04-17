const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learningPageContentController');
const { uploadSingle } = require('../middleware/cloudinaryUpload');

router.get('/overview', learningController.getOverview);
router.get('/', learningController.getAllPages);
router.get('/:slug', learningController.getLearningPageBySlug);
router.post('/seed', learningController.seedLearningHub);
router.patch('/status/:slug', learningController.updateStatus);
router.put('/settings/:slug', learningController.updatePageSettings);

// Item routes (image or video)
router.post('/item/:slug', uploadSingle('image', 'learning', { maxFileSize: 50 * 1024 * 1024 }), learningController.createItem);
router.put('/item/:slug/:itemId', uploadSingle('image', 'learning', { maxFileSize: 50 * 1024 * 1024 }), learningController.updateItem);
router.delete('/item/:slug/:itemId', learningController.deleteItem);

// Media Upload route for generic setting images/videos
router.post('/upload-image', uploadSingle('image', 'learning', { maxFileSize: 50 * 1024 * 1024 }), (req, res) => {
    if (req.file) {
        res.json({ imageUrl: req.file.path });
    } else {
        res.status(400).json({ message: 'No file uploaded' });
    }
});

router.delete('/delete-media', learningController.deleteMedia);

module.exports = router;
