const mongoose = require('mongoose');

const vastuPageContentSchema = new mongoose.Schema({
    pageSlug: {
        type: String,
        required: true,
        unique: true
    },
    pageName: { type: String, required: true },
    category: { type: String, default: 'Vastu' },
    hero: {
        badge: { type: String, default: 'DIVINE VASTU SERVICES' },
        titleHighlight1: { type: String, default: '' },
        titleEnd: { type: String, default: '' },
        titleHighlight2: { type: String, default: '' },
        titleHighlight3: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        imageUrl: { type: String, default: '' },
        imageAlt: { type: String, default: '' },
        buttons: [{
            text: { type: String, default: '' },
            link: { type: String, default: '' },
            iconName: { type: String, default: '' }
        }]
    },
    about: {
        badge: { type: String, default: 'Ancient Science' },
        title: { type: String, default: 'What is' },
        titleColored: { type: String, default: 'Vastu Shastra?' },
        subtitle: { type: String, default: 'Balancing Elements, Enhancing Life' },
        description: { type: String, default: '' },
        descriptionBold: { type: String, default: '' },
        image: { type: String, default: '' },
        imageAlt: { type: String, default: '' },
        imageOverlayBadge: { type: String, default: 'Energy Harmony' },
        imageOverlayText: { type: String, default: 'Balancing Elements, Enhancing Life' },
        points: [{
            title: { type: String, default: '' },
            iconName: { type: String, default: '' }
        }]
    },
    servicesSection: {
        badge: { type: String, default: 'Expert Services' },
        title: { type: String, default: 'Our' },
        titleColored: { type: String, default: 'Vastu Services' },
        services: [{
            title: { type: String, default: '' },
            desc: { type: String, default: '' },
            iconName: { type: String, default: '' },
            image: { type: String, default: '' },
            imageAlt: { type: String, default: '' },
            features: [String]
        }]
    },
    processSection: {
        badge: { type: String, default: 'The Journey' },
        title: { type: String, default: 'How We' },
        titleColored: { type: String, default: 'Consult' },
        steps: [{
            number: { type: String, default: '' },
            title: { type: String, default: '' },
            subtitle: { type: String, default: '' },
            description: { type: String, default: '' },
            iconName: { type: String, default: '' }
        }]
    },
    benefitsSection: {
        badge: { type: String, default: 'Life Changing Impact' },
        title: { type: String, default: 'Benefits Of' },
        titleColored: { type: String, default: 'Vastu Alignment' },
        benefits: [{
            title: { type: String, default: '' },
            desc: { type: String, default: '' },
            iconName: { type: String, default: '' }
        }]
    },
    pricingSection: {
        badge: { type: String, default: 'Our Plans' },
        title: { type: String, default: 'Consultation' },
        titleColored: { type: String, default: 'Pricing' },
        plans: [{
            name: { type: String, default: '' },
            price: { type: String, default: '' },
            duration: { type: String, default: '' },
            iconName: { type: String, default: '' },
            desc: { type: String, default: '' }
        }]
    },
    testimonialsSection: {
        badge: { type: String, default: 'Success Stories' },
        title: { type: String, default: 'Client' },
        titleColored: { type: String, default: 'Reviews' },
        reviews: [{
            quote: { type: String, default: '' },
            author: { type: String, default: '' },
            role: { type: String, default: '' }
        }]
    },
    ctaSection: {
        badge: { type: String, default: 'Preserving Tradition' },
        title: { type: String, default: 'Balance Your' },
        titleColored: { type: String, default: 'Divine Energy' },
        subtitle: { type: String, default: '' },
        buttons: [{
            text: { type: String, default: '' },
            link: { type: String, default: '' },
            iconName: { type: String, default: '' }
        }]
    },
    isActive: { type: Boolean, default: true },
    activeSections: {
        about: { type: Boolean, default: true },
        services: { type: Boolean, default: true },
        process: { type: Boolean, default: true },
        benefits: { type: Boolean, default: true },
        pricing: { type: Boolean, default: true },
        testimonials: { type: Boolean, default: true },
        cta: { type: Boolean, default: true }
    }
}, { timestamps: true });

module.exports = mongoose.model('VastuPageContent', vastuPageContentSchema);
