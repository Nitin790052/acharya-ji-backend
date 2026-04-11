const mongoose = require('mongoose');

const dynamicShopProductSchema = new mongoose.Schema({
    shopType: { type: String, required: true, index: true }, // e.g., 'puja-samagri', 'gemstones'
    category: { type: String, required: true }, // Name or Slug of DynamicShopCategory
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    image: { type: String, required: true },
    imageAlt: { type: String, default: '' },
    description: { type: String },
    shortDescription: { type: String },
    rating: { type: Number, default: 5 },
    reviewsCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    
    // SEO Fields
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: String },
    
    // Specifications (Flexible)
    specs: [{
        label: String,
        value: String
    }],
    
    // Inventory
    stock: { type: Number, default: 100 }
}, { timestamps: true });

module.exports = mongoose.model('DynamicShopProduct', dynamicShopProductSchema);
