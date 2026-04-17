const express = require('express');
const router = express.Router();
const controller = require('../controllers/astrologyPageContentController');
const { uploadFields } = require('../middleware/cloudinaryUpload');

const astrologyUpload = uploadFields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'deepDiveImage', maxCount: 1 }
], 'astrology');

// Seed routes
router.post('/seed', controller.seedData);
router.post('/force-seed', controller.forceSeed);

router.get('/', controller.getAllPages);
router.post('/', astrologyUpload, controller.upsertPage);
router.get('/:slug', controller.getPageBySlug);
router.delete('/:slug', controller.deletePage);

module.exports = router;
