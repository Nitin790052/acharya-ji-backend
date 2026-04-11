const mongoose = require('mongoose');

const pujaOfferingSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    title: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
    },
    duration: {
        type: String,
        default: '2-3 Hours'
    },
    benefits: [String],
    faqs: [{
        question: String,
        answer: String
    }],
    serviceModes: [{
        mode: String,
        title: String,
        description: String,
        price: Number,
        points: [String],
        imageUrl: String
    }],
    imageUrl: {
        type: String,
        required: true
    },
    imageAlt: { type: String, default: 'Sacred Puja Ritual' },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    },
    metaTitle: { type: String, maxLength: 70 },
    metaDescription: { type: String, maxLength: 165 },
    metaKeywords: { type: String },
    canonicalUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('PujaOffering', pujaOfferingSchema);
