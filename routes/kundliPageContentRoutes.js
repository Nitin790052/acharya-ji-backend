const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/kundliPageContentController');
const { uploadFields } = require('../middleware/cloudinaryUpload');

const kundliUpload = uploadFields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'deepDiveImage', maxCount: 1 }
], 'kundli');

router.get('/', ctrl.getAll);
router.get('/:slug', ctrl.getBySlug);
router.post('/', kundliUpload, ctrl.upsertPage);
router.delete('/:id', ctrl.remove);
router.patch('/:id/status', ctrl.updateStatus);
router.post('/seed', ctrl.seedData);
router.post('/force-seed', ctrl.forceSeed);

module.exports = router;
