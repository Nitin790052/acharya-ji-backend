const express = require('express');
const router = express.Router();
console.log('Universal Page Routes Loading...');
const universalController = require('../controllers/universalPageController');
const { uploadSingle } = require('../middleware/cloudinaryUpload');

// Public Routes
router.get('/overview', universalController.getPagesOverview);
router.get('/:slug', universalController.getPageBySlug);

// Admin Routes (Protection middleware can be added here)
router.post('/update/:slug', universalController.updatePageContent);
router.delete('/:slug', universalController.deletePage);
router.post('/upload-media', uploadSingle('media', 'universal', { maxFileSize: 100 * 1024 * 1024 }), universalController.uploadMedia);
router.post('/purge-media', universalController.deleteMedia);

module.exports = router;
