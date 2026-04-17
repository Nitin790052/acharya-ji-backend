const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/aboutPageController');
const { uploadSingle } = require('../middleware/cloudinaryUpload');

// Settings
router.get('/settings', ctrl.getSettings);
router.put('/settings', uploadSingle('journeyImage', 'about'), ctrl.updateSettings);

// Items
router.get('/items', ctrl.getAllItems);
router.get('/items/:tag', ctrl.getItemsByTag);
router.post('/items', uploadSingle('image', 'about'), ctrl.createItem);
router.put('/items/:id', uploadSingle('image', 'about'), ctrl.updateItem);
router.delete('/items/:id', ctrl.removeItem);

// Seed
router.post('/seed', ctrl.seed);

module.exports = router;
