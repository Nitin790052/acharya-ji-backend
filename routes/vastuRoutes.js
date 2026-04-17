const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/vastuController');
const { uploadSingle } = require('../middleware/cloudinaryUpload');

router.get('/settings', ctrl.getSettings);
router.put('/settings', ctrl.updateSettings);
router.get('/active', ctrl.getActive);
router.get('/', ctrl.getAll);
router.post('/seed', ctrl.seed);
router.post('/', uploadSingle('image', 'vastu'), ctrl.create);
router.put('/:id', uploadSingle('image', 'vastu'), ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
