const express = require('express');
const router = express.Router();
const careerContentController = require('../controllers/careerContentController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure directory exists
const dir = './uploads/career';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/career');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', careerContentController.getAllCareerContent);
router.get('/type/:type', careerContentController.getCareerByType);
router.post('/', upload.single('image'), careerContentController.createCareerContent);
router.put('/:id', upload.single('image'), careerContentController.updateCareerContent);
router.delete('/:id', careerContentController.deleteCareerContent);
router.post('/seed/:type', careerContentController.seedByType);

module.exports = router;
