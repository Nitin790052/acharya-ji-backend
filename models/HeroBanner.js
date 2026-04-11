const mongoose = require('mongoose');

const heroBannerSchema = new mongoose.Schema({
    badge: {
        type: String,
        default: 'Authentic Vedic Services',
    },
    titleHighlight1: {
        type: String,
        default: 'Experience',
    },
    titleHighlight2: {
        type: String,
        default: 'Divine',
    },
    titleHighlight3: {
        type: String,
        default: 'Blessings',
    },
    titleEnd: {
        type: String,
        default: '',
    },
    subtitle: {
        type: String,
        default: 'Connect with sacred traditions through authentic rituals, expert consultations, and premium spiritual essentials delivered with devotion.',
    },
    buttons: [
        {
            text: String,
            link: String
        }
    ],
    imageUrl: {
        type: String,
        required: true,
    },
    imageAlt: { type: String, default: 'Devotional Hero Banner' },
    pagePath: {
        type: String,
        default: '/', // default to home page
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    metaTitle: { type: String, maxLength: 70 },
    metaDescription: { type: String, maxLength: 165 },
    metaKeywords: { type: String },
    canonicalUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('HeroBanner', heroBannerSchema);
