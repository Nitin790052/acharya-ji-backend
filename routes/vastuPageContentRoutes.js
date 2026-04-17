const express = require('express');
const router = express.Router();
const vastuPageContentController = require('../controllers/vastuPageContentController');
const { uploadAny } = require('../middleware/cloudinaryUpload');

router.get('/all', vastuPageContentController.getAll);
router.get('/slug/:slug', vastuPageContentController.getBySlug);
router.post('/upsert', uploadAny('vastu'), vastuPageContentController.upsertPage);
router.delete('/:id', vastuPageContentController.remove);
router.patch('/status/:id', vastuPageContentController.updateStatus);
router.post('/seed', vastuPageContentController.seedData);
router.post('/force-seed', vastuPageContentController.forceSeed);

module.exports = router;
