const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const { uploadFields } = require('../middleware/cloudinaryUpload');

const mediaUpload = uploadFields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
], 'media', { maxFileSize: 150 * 1024 * 1024 });

// Media Settings (Stats)
router.get('/settings', mediaController.getMediaSettings);
router.put('/settings', mediaController.updateMediaSettings);

router.get('/', mediaController.getAllMedia);
router.get('/type/:type', mediaController.getMediaByType);
router.post('/', mediaUpload, mediaController.createMedia);
router.put('/:id', mediaUpload, mediaController.updateMedia);
router.delete('/:id', mediaController.deleteMedia);
router.get('/fetch-yt-metadata/:id', mediaController.fetchYTMetadata);
router.post('/seed', mediaController.seedMedia);

module.exports = router;
