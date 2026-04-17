const express = require('express');
const router = express.Router();
const pujaOfferingController = require('../controllers/pujaOfferingController');
const { uploadAny } = require('../middleware/cloudinaryUpload');

// Routes
router.get('/', pujaOfferingController.getAllOfferings);
router.get('/:slug', pujaOfferingController.getOfferingBySlug);
router.post('/', uploadAny('puja-offerings'), pujaOfferingController.createOffering);
router.put('/:id', uploadAny('puja-offerings'), pujaOfferingController.updateOffering);
router.delete('/:id', pujaOfferingController.deleteOffering);
router.post('/seed', pujaOfferingController.seedOfferings);

module.exports = router;
