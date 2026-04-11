const express = require('express');
const router = express.Router();
const seoController = require('../controllers/seoController');

router.get('/', seoController.getAllSEOConfigs);
router.get('/:pageName', seoController.getSEOByPageName);
router.post('/update', seoController.updatePageSEO);
router.delete('/:id', seoController.deletePageSEO);

module.exports = router;
