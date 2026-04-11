const mongoose = require('mongoose');

const kundliPageContentSchema = new mongoose.Schema({
    pageSlug: {
        type: String,
        required: true,
        unique: true
    },
    pageName: { type: String, required: true },
    category: { type: String, default: 'Kundli' },
    hero: {
        badge: { type: String, default: 'DIVINE KUNDLI SERVICES' },
        title: { type: String, default: '' },
        highlightedTitle: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        imageUrl: { type: String, default: '' },
        imageAlt: { type: String, default: '' },
        buttonText: { type: String, default: 'Get Your Kundli Now' },
        buttonLink: { type: String, default: '/astrologers' }
    },
    featuresTitle: { type: String, default: 'Celestial Benefits' },
    features: [{
        title: { type: String, default: '' },
        description: { type: String, default: '' }
    }],
    formSection: {
        badge: { type: String, default: 'Enter Your Details' },
        title: { type: String, default: 'Birth Information' },
        nameLabel: { type: String, default: 'Your Full Name' },
        namePlaceholder: { type: String, default: 'Enter your full name' },
        dobLabel: { type: String, default: 'Date of Birth' },
        timeLabel: { type: String, default: 'Time of Birth' },
        placeLabel: { type: String, default: 'Birth Place' },
        placePlaceholder: { type: String, default: 'e.g., Delhi, India' },
        buttonText: { type: String, default: 'Generate Kundli' }
    },
    resultsSection: {
        badge: { type: String, default: 'Generated Insights' },
        title: { type: String, default: 'Your Janam Kundli' }
    },
    doshasSection: {
        badge: { type: String, default: 'Dosha Analysis' },
        title: { type: String, default: 'Planetary Influences' }
    },
    remediesSection: {
        badge: { type: String, default: 'Spiritual Solutions' },
        title: { type: String, default: 'Divine Remedies' }
    },
    cta: {
        title: { type: String, default: 'Need Deeper Analysis?' },
        subtitle: { type: String, default: 'Connect with our master astrologers for deeper clarity on your cosmic blueprint.' },
        buttonText: { type: String, default: 'Consult with Expert' },
        buttonLink: { type: String, default: '/astrologer' }
    },
    faqsTitle: { type: String, default: 'Divine Clarification' },
    faqs: [{
        question: { type: String, default: '' },
        answer: { type: String, default: '' }
    }],
    isActive: { type: Boolean, default: true },
    activeSections: {
        features: { type: Boolean, default: true },
        form: { type: Boolean, default: true },
        results: { type: Boolean, default: true },
        doshas: { type: Boolean, default: true },
        remedies: { type: Boolean, default: true },
        cta: { type: Boolean, default: true },
        faqs: { type: Boolean, default: true }
    },
    order: { type: Number, default: 0 }
}, { timestamps: true, minimize: false });

module.exports = mongoose.model('KundliPageContent', kundliPageContentSchema);
