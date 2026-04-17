const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { uploadSingle } = require('../middleware/cloudinaryUpload');

// Routes
router.get('/', serviceController.getAllServices);
router.get('/active', serviceController.getActiveServices);
router.post('/', uploadSingle('image', 'services'), serviceController.createService);
router.put('/:id', uploadSingle('image', 'services'), serviceController.updateService);
router.post('/toggle-active/:id', serviceController.toggleActiveService);
router.delete('/:id', serviceController.deleteService);
router.post('/seed', serviceController.seedServices);

module.exports = router;
