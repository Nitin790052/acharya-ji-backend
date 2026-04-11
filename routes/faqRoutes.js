const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/faqController');

router.get('/', ctrl.getAll);
router.get('/active', ctrl.getActive);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

router.get('/settings', ctrl.getSettings);
router.put('/settings', ctrl.updateSettings);
router.post('/seed', ctrl.seed);

module.exports = router;
