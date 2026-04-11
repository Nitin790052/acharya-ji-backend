const mongoose = require('mongoose');

const UniversalPageContentSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        default: 'general'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    // SEO Infrastructure
    metadata: {
        title: String,
        description: String,
        keywords: String,
        canonicalUrl: String,
        imageAlt: String
    },
    // Visual Identity (Hero)
    heroSection: {
        badge: String,
        title: String,
        subtitle: String,
        highlightText: String,
        image: String, // URL/Path to image or video
        imageAlt: String
    },
    // Dynamic Content Blocks
    sections: [{
        title: String,
        subtitle: String,
        content: String, // Rich text or HTML
        image: String,
        imageAlt: String,
        layout: {
            type: String,
            enum: ['text-left', 'text-right', 'full-width', 'two-column'],
            default: 'text-left'
        },
        order: { type: Number, default: 0 }
    }],
    // Common Engagement Features
    features: [{
        title: String,
        description: String,
        icon: String, // Lucide icon name
        order: Number
    }],
    faqs: [{
        question: String,
        answer: String,
        order: Number
    }],
    // Conversion Infrastructure
    ctaSection: {
        badge: String,
        title: String,
        description: String,
        primaryBtnText: String,
        primaryBtnLink: String,
        secondaryBtnText: String,
        secondaryBtnLink: String,
        trustBadges: [String]
    }
}, { timestamps: true });

module.exports = mongoose.model('UniversalPageContent', UniversalPageContentSchema);
