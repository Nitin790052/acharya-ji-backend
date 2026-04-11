const express = require('express');
const router = express.Router();
const contentController = require('../controllers/bookPujaContentController');

// Steps Routes
router.get('/steps', contentController.getAllSteps);
router.post('/steps', contentController.createStep);
router.put('/steps/:id', contentController.updateStep);
router.delete('/steps/:id', contentController.deleteStep);
router.post('/steps/toggle/:id', contentController.toggleStep);

// Experts Routes
router.get('/experts', contentController.getAllExperts);
router.post('/experts', contentController.createExpert);
router.put('/experts/:id', contentController.updateExpert);
router.delete('/experts/:id', contentController.deleteExpert);
router.post('/experts/toggle/:id', contentController.toggleExpert);

// Samagri Routes
router.get('/samagri', contentController.getAllSamagri);
router.post('/samagri', contentController.createSamagri);
router.put('/samagri/:id', contentController.updateSamagri);
router.delete('/samagri/:id', contentController.deleteSamagri);
router.post('/samagri/toggle/:id', contentController.toggleSamagri);

// FAQ Routes
router.get('/faqs', contentController.getAllFAQs);
router.post('/faqs', contentController.createFAQ);
router.put('/faqs/:id', contentController.updateFAQ);
router.delete('/faqs/:id', contentController.deleteFAQ);
router.post('/faqs/toggle/:id', contentController.toggleFAQ);

// Seed
router.post('/seed', contentController.seedBookPujaContent);

module.exports = router;
