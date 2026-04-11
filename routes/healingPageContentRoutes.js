const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/healingPageContentController');

router.get('/', ctrl.getAll);
router.get('/:slug', ctrl.getBySlug);
router.post('/', ctrl.upsertPage);
router.delete('/:id', ctrl.remove);
router.patch('/:id/status', ctrl.updateStatus);
router.post('/seed', ctrl.seedData);
router.post('/force-seed', ctrl.forceSeed);

module.exports = router;
