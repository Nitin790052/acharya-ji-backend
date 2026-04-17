const express = require('express');
const router = express.Router();
const careerContentController = require('../controllers/careerContentController');
const { uploadSingle } = require('../middleware/cloudinaryUpload');

router.get('/', careerContentController.getAllCareerContent);
router.get('/type/:type', careerContentController.getCareerByType);
router.post('/', uploadSingle('image', 'career'), careerContentController.createCareerContent);
router.put('/:id', uploadSingle('image', 'career'), careerContentController.updateCareerContent);
router.delete('/:id', careerContentController.deleteCareerContent);
router.post('/seed/:type', careerContentController.seedByType);

module.exports = router;
