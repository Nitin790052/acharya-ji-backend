const express = require('express');
const router = express.Router();
const contactSettingsController = require('../controllers/contactSettingsController');

router.get('/', contactSettingsController.getSettings);
router.put('/', contactSettingsController.updateSettings);
router.post('/seed', contactSettingsController.seedSettings);

module.exports = router;
