const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { uploadSingle } = require('../middleware/cloudinaryUpload');

router.get('/', courseController.getAllCourses);
router.get('/settings/:type', courseController.getCourseSettings);
router.post('/', uploadSingle('image', 'courses'), courseController.createCourse);
router.put('/:id', uploadSingle('image', 'courses'), courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);
router.put('/settings/:type', courseController.updateCourseSettings);
router.post('/seed/:type', courseController.seedCourses);

router.get('/overview', courseController.getOverview);
router.patch('/status/:type', courseController.updateStatus);

module.exports = router;
