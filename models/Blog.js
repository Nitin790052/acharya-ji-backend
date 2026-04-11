const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    readTime: { type: String, required: true },
    date: { type: String, required: true },
    author: { type: String },
    imageUrl: { type: String },
    imageAlt: { type: String, default: 'Divine Astrology Blog' },
    url: { type: String, required: true },
    slug: { type: String, unique: true },
    metaTitle: { type: String, maxLength: 70 },
    metaDescription: { type: String, maxLength: 165 },
    metaKeywords: { type: String },
    canonicalUrl: { type: String },
    rating: { type: Number, default: 4.8 },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
