const mongoose = require('mongoose');

const LearningPageContentSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    pageName: { type: String, required: true },
    isActive: { type: Boolean, default: true },

    // Why Learn Section (Intro)
    introSection: {
        badge: { type: String, default: 'Ancient Cosmic Science' },
        title: { type: String, default: 'Why Learn Jyotish Shastra?' },
        subtitle: { type: String },
        description: { type: String },
        highlightText: { type: String },
        image: { type: String },
        imageAlt: { type: String },
        features: [{
            icon: { type: String },
            label: { type: String }
        }]
    },

    // Course Categories (for filtering)
    categories: [{
        key: { type: String },
        label: { type: String },
        icon: { type: String },
        color: { type: String },
        description: { type: String },
        items: [String]
    }],

    // Items (Courses / Guides / Mantras)
    items: [{
        id: { type: Number },
        slug: { type: String, required: true },
        title: { type: String, required: true },
        duration: { type: String },
        price: { type: Number },
        level: { type: String }, // Beginner, Professional, Spiritual
        rating: { type: Number, default: 5 },
        students: { type: Number, default: 0 },
        category: { type: String },
        image: { type: String },
        imageAlt: { type: String },
        isFeatured: { type: Boolean, default: false },
        description: { type: String },
        modules: [String]
    }],

    // Benefits Section (Grid)
    benefits: [{
        icon: { type: String },
        title: { type: String },
        description: { type: String }
    }],

    // Testimonials
    testimonials: [{
        quote: { type: String },
        author: { type: String },
        role: { type: String }
    }],

    // FAQs
    faqs: [{
        question: { type: String },
        answer: { type: String }
    }],

    // Final CTA Section
    ctaSection: {
        badge: { type: String, default: 'BEGIN YOUR COSMIC JOURNEY' },
        title: { type: String, default: 'Ready to Begin Your Journey?' },
        description: { type: String },
        primaryBtnText: { type: String, default: 'Browse All Courses' },
        secondaryBtnText: { type: String, default: 'Free Consultation' },
        trustBadges: [String]
    },

    seo: {
        title: String,
        description: String,
        keywords: [String]
    }
}, { timestamps: true });

module.exports = mongoose.model('LearningPageContent', LearningPageContentSchema);
