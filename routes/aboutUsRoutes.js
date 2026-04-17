const express = require('express');
const router = express.Router();
const aboutUsController = require('../controllers/aboutUsController');
const { uploadSingle } = require('../middleware/cloudinaryUpload');

router.get('/', aboutUsController.getAllAboutUs);
router.get('/active', aboutUsController.getActiveAboutUs);
router.post('/', uploadSingle('image', 'about'), aboutUsController.createAboutUs);
router.put('/activate/:id', aboutUsController.activateAboutUs);
router.put('/:id', uploadSingle('image', 'about'), aboutUsController.updateAboutUs);
router.delete('/:id', aboutUsController.deleteAboutUs);

module.exports = router;
