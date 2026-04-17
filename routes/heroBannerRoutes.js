const express = require('express');
const router = express.Router();
const heroBannerController = require('../controllers/heroBannerController');
const { validateBanner } = require('../middleware/validate');
const { uploadSingle } = require('../middleware/cloudinaryUpload');

router.get('/', heroBannerController.getAllBanners);
router.get('/active', heroBannerController.getActiveBanners);
router.post('/', uploadSingle('image', 'carousels'), heroBannerController.createBanner);
router.put('/:id', uploadSingle('image', 'carousels'), heroBannerController.updateBanner);
router.delete('/:id', heroBannerController.deleteBanner);
router.post('/seed', heroBannerController.seedBanners);

module.exports = router;
