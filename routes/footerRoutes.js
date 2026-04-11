const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/footerController');

router.get('/', ctrl.getSettings);
router.put('/', ctrl.updateSettings);
router.post('/seed', ctrl.seed);

module.exports = router;
