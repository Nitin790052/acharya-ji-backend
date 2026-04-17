const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const { uploadFields } = require('../middleware/cloudinaryUpload');

const galleryUpload = uploadFields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
], 'gallery', { maxFileSize: 50 * 1024 * 1024 });

router.get('/settings', galleryController.getSettings);
router.put('/settings', galleryController.updateSettings);

router.get('/', galleryController.getAllGallery);
router.get('/categories', galleryController.getCategories);
router.get('/category/:category', galleryController.getGalleryByCategory);
router.post('/', galleryUpload, galleryController.createGallery);
router.put('/:id', galleryUpload, galleryController.updateGallery);
router.delete('/:id', galleryController.deleteGallery);
router.post('/seed', galleryController.seedGallery);

module.exports = router;
