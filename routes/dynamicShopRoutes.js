const express = require('express');
const router = express.Router();
const dynamicShopController = require('../controllers/dynamicShopController');
const webpConvertMiddleware = require('../middleware/webpConvert');
const multer = require('multer');

const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads', 'shop');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// All routes use :shopType parameter
router.get('/overview', dynamicShopController.getAllShopsOverview);
router.get('/:shopType/data', dynamicShopController.getShopData);

// Generic Image Upload
router.post('/upload-image', upload.single('image'), webpConvertMiddleware, (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file provided' });
    res.json({ success: true, imageUrl: `/uploads/shop/${req.file.filename}` });
});

// Admin Routes
router.post('/:shopType/content', dynamicShopController.updateShopContent);
router.post('/:shopType/categories', dynamicShopController.addCategory);
router.delete('/categories/:id', dynamicShopController.deleteCategory);

router.patch('/status', dynamicShopController.updateStatus);

router.post('/:shopType/products', upload.single('image'), webpConvertMiddleware, dynamicShopController.addProduct);
router.put('/products/:id', upload.single('image'), webpConvertMiddleware, dynamicShopController.updateProduct);
router.delete('/products/:id', dynamicShopController.deleteProduct);

router.post('/seed-all', dynamicShopController.seedAllShops);
router.post('/:shopType/seed', dynamicShopController.seedShopData);

module.exports = router;

