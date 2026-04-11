const mongoose = require('mongoose');

const dynamicShopCategorySchema = new mongoose.Schema({
    shopType: { type: String, required: true, index: true }, // e.g., 'puja-samagri', 'gemstones'
    name: { type: String, required: true },
    slug: { type: String, required: true },
    icon: { type: String, default: 'Package' },
    color: { type: String, default: '#orange' },
    image: { type: String }, // Optional category image
    imageAlt: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('DynamicShopCategory', dynamicShopCategorySchema);
