const mongoose = require('mongoose');

const healingPageContentSchema = new mongoose.Schema({
    pageSlug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    pageName: { type: String, required: true },
    isActive: { type: Boolean, default: true },

    whatIsSection: {
        badge: { type: String, default: 'Understanding Healing' },
        title: { type: String, default: 'What is' },
        titleColored: { type: String, default: 'Healing' },
        description: { type: String, default: 'Healing is based on the idea that energy flows through the body. When energy is blocked, it leads to stress, illness, and emotional problems.' },
        items: [{
            iconName: { type: String, default: 'Zap' },
            title: { type: String, default: '' },
            desc: { type: String, default: '' }
        }]
    },

    benefitsSection: {
        badge: { type: String, default: 'Benefits' },
        title: { type: String, default: 'Benefits of' },
        titleColored: { type: String, default: 'Healing' },
        benefits: [{
            iconName: { type: String, default: 'Brain' },
            title: { type: String, default: '' },
            desc: { type: String, default: '' },
            colorClass: { type: String, default: 'from-orange-500 to-red-600' }
        }]
    },

    sessionsSection: {
        badge: { type: String, default: 'Sessions' },
        title: { type: String, default: 'Types of' },
        titleColored: { type: String, default: 'Healing Sessions' },
        sessions: [{
            iconName: { type: String, default: 'Globe' },
            title: { type: String, default: '' },
            duration: { type: String, default: '30 minutes' },
            price: { type: String, default: '₹999' },
            desc: { type: String, default: '' },
            features: [{ type: String }],
            colorClass: { type: String, default: 'from-orange-500 to-red-600' }
        }]
    },

    processSection: {
        badge: { type: String, default: 'Process' },
        title: { type: String, default: 'How It' },
        titleColored: { type: String, default: 'Works' },
        steps: [{
            number: { type: String, default: '01' },
            iconName: { type: String, default: 'Calendar' },
            title: { type: String, default: '' },
            desc: { type: String, default: '' }
        }]
    },

    testimonialsSection: {
        badge: { type: String, default: 'Testimonials' },
        title: { type: String, default: 'What Our' },
        titleColored: { type: String, default: 'Clients Say' },
        reviews: [{
            name: { type: String, default: '' },
            location: { type: String, default: '' },
            text: { type: String, default: '' },
            rating: { type: Number, default: 5 }
        }]
    },

    faqSection: {
        badge: { type: String, default: 'FAQ' },
        title: { type: String, default: 'Frequently Asked' },
        titleColored: { type: String, default: 'Questions' },
        faqs: [{
            question: { type: String, default: '' },
            answer: { type: String, default: '' }
        }]
    },

    ctaSection: {
        title: { type: String, default: 'Begin Your' },
        titleColored: { type: String, default: 'Healing Journey Today' },
        subtitle: { type: String, default: 'Join thousands who have experienced the transformative power of healing.' },
        buttons: [{
            text: { type: String, default: 'Start Healing' },
            link: { type: String, default: '/book-healing' },
            iconName: { type: String, default: 'Zap' },
            btnClass: { type: String, default: 'bg-[#E8453C]' }
        }]
    }
}, { timestamps: true });

module.exports = mongoose.model('HealingPageContent', healingPageContentSchema);
