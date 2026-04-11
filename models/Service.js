const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    href: {
        type: String,
        required: [true, 'Link (href) is required'],
        trim: true
    },
    category: {
        type: String,
        enum: ['core', 'detailed'],
        default: 'core'
    },
    icon: {
        type: String,
        default: 'Sparkles'
    },
    imageUrl: {
        type: String,
        default: ''
    },
    imageAlt: { type: String, default: 'Divine Spiritual Service' },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    },
    slug: { type: String, lowercase: true, trim: true },
    metaTitle: { type: String, maxLength: 70 },
    metaDescription: { type: String, maxLength: 165 },
    metaKeywords: { type: String },
    canonicalUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
