const express = require('express');
const router = express.Router();
const popularPujaController = require('../controllers/popularPujaController');
const { validatePopularPuja } = require('../middleware/validate');
const { uploadSingle } = require('../middleware/cloudinaryUpload');

router.get('/', popularPujaController.getAllPujas);
router.get('/settings', popularPujaController.getSettings);
router.put('/settings', popularPujaController.updateSettings);

router.get('/active', popularPujaController.getActivePujas);
router.post('/seed', popularPujaController.seedPujas);
router.post('/', uploadSingle('image', 'popularServices'), validatePopularPuja, popularPujaController.createPuja);
router.put('/:id', uploadSingle('image', 'popularServices'), validatePopularPuja, popularPujaController.updatePuja);
router.delete('/:id', popularPujaController.deletePuja);

module.exports = router;
