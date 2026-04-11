const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const multer = require('multer');
const path = require('path');
const webpConvertMiddleware = require('../middleware/webpConvert');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/', courseController.getAllCourses);
router.get('/settings/:type', courseController.getCourseSettings);
router.post('/', upload.single('image'), webpConvertMiddleware, courseController.createCourse);
router.put('/:id', upload.single('image'), webpConvertMiddleware, courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);
router.put('/settings/:type', courseController.updateCourseSettings);
router.post('/seed/:type', courseController.seedCourses);

router.get('/overview', courseController.getOverview);
router.patch('/status/:type', courseController.updateStatus);

module.exports = router;
