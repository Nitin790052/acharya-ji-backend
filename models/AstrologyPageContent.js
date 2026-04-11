const mongoose = require('mongoose');

const astrologyPageContentSchema = new mongoose.Schema({
    pageSlug: {
        type: String,
        required: true,
        unique: true,
        enum: [
            'career-astrology',
            'marriage-astrology',
            'business-astrology',
            'health-astrology',
            'numerology',
            'tarot-reading',
            'palmistry',
            'gemstone-suggestion'
        ]
    },
    pageName: { type: String, required: true },
    hero: {
        badge: { type: String, default: '' },
        title: { type: String, default: '' },
        highlightedTitle: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        imageUrl: { type: String, default: '' },
        imageAlt: { type: String, default: '' },
        buttonText: { type: String, default: 'Consult Expert Now' },
        buttonLink: { type: String, default: '/astrologer' }
    },
    features: [{
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        iconName: { type: String, default: 'Star' }
    }],
    deepDive: {
        badge: { type: String, default: '' },
        title: { type: String, default: '' },
        highlightedTitle: { type: String, default: '' },
        description: { type: String, default: '' },
        imageUrl: { type: String, default: '' },
        imageAlt: { type: String, default: '' },
        checklist: [{ type: String }],
        statLabel: { type: String, default: '' },
        statValue: { type: String, default: '' },
        buttonText: { type: String, default: '' },
        buttonLink: { type: String, default: '/astrologer' }
    },
    steps: [{
        number: { type: String, default: '' },
        title: { type: String, default: '' },
        description: { type: String, default: '' }
    }],
    cta: {
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        buttonText: { type: String, default: 'Book Your Session Now' },
        buttonLink: { type: String, default: '/astrologer' }
    },
    faqs: [{
        question: { type: String, default: '' },
        answer: { type: String, default: '' }
    }],
    isActive: { type: Boolean, default: true }
}, { timestamps: true, minimize: false });

module.exports = mongoose.model('AstrologyPageContent', astrologyPageContentSchema);
