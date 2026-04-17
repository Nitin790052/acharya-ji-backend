const express = require('express');
const router = express.Router();
const dynamicShopController = require('../controllers/dynamicShopController');
const { uploadSingle } = require('../middleware/cloudinaryUpload');

// All routes use :shopType parameter
router.get('/overview', dynamicShopController.getAllShopsOverview);
router.get('/:shopType/data', dynamicShopController.getShopData);

// Generic Image Upload
router.post('/upload-image', uploadSingle('image', 'shop'), (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file provided' });
    res.json({ success: true, imageUrl: req.file.path });
});

// Admin Routes
router.post('/:shopType/content', dynamicShopController.updateShopContent);
router.post('/:shopType/categories', dynamicShopController.addCategory);
router.delete('/categories/:id', dynamicShopController.deleteCategory);

router.patch('/status', dynamicShopController.updateStatus);

router.post('/:shopType/products', uploadSingle('image', 'shop'), dynamicShopController.addProduct);
router.put('/products/:id', uploadSingle('image', 'shop'), dynamicShopController.updateProduct);
router.delete('/products/:id', dynamicShopController.deleteProduct);

router.post('/seed-all', dynamicShopController.seedAllShops);
router.post('/:shopType/seed', dynamicShopController.seedShopData);

module.exports = router;
