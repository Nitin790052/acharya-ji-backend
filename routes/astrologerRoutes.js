const express = require('express');
const router = express.Router();
const astrologerController = require('../controllers/astrologerController');
const { uploadSingle } = require('../middleware/cloudinaryUpload');

// Settings Routes
router.get('/settings', astrologerController.getSettings);
router.put('/settings', astrologerController.updateSettings);

// Record Routes
router.get('/active', astrologerController.getActiveAstrologers);
router.get('/', astrologerController.getAllAstrologers);
router.post('/seed', astrologerController.seedAstrologers);
router.post('/', uploadSingle('image', 'astrologers'), astrologerController.createAstrologer);
router.put('/:id', uploadSingle('image', 'astrologers'), astrologerController.updateAstrologer);
router.delete('/:id', astrologerController.deleteAstrologer);

module.exports = router;
