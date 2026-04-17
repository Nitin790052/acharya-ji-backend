const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/kundliController');
const { uploadSingle } = require('../middleware/cloudinaryUpload');

router.get('/settings', ctrl.getSettings);
router.put('/settings', ctrl.updateSettings);
router.get('/active', ctrl.getActive);
router.get('/', ctrl.getAll);
router.post('/seed', ctrl.seed);
router.post('/', uploadSingle('image', 'kundli'), ctrl.create);
router.put('/:id', uploadSingle('image', 'kundli'), ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
