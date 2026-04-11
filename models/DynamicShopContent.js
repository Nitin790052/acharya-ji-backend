const mongoose = require('mongoose');

const dynamicShopContentSchema = new mongoose.Schema({
    shopType: { type: String, required: true, unique: true }, // 'puja-samagri', 'gemstones', 'yantra', etc.
    
    // Hero Section
    heroBadge: { type: String, default: "DIVINE SERVICES HUB" },
    heroTitleHighlight1: { type: String },
    heroTitleEnd: { type: String },
    heroTitleHighlight2: { type: String },
    heroTitleHighlight3: { type: String },
    heroSubtitle: { type: String },
    isActive: { type: Boolean, default: true },
    
    // Festival Strip
    festivalActive: { type: Boolean, default: false },
    festivalBadge: { type: String },
    festivalTitle: { type: String },
    festivalSubtitle: { type: String },
    festivalCtaText: { type: String },
    festivalCtaLink: { type: String },
    
    // Collections Heading
    collectionsBadge: { type: String, default: "Ritual Collections" },
    collectionsTitle: { type: String, default: "Browse By Category" },
    
    // Trust Badges
    trustBadges: [{
        iconName: String, // Lucide icon name
        title: String,
        desc: String
    }],
    
    // FAQ Section
    faqHeading: { type: String, default: "Sacred Questions" },
    faqs: [{
        question: String,
        answer: String
    }],
    
    // CTA Section
    ctaBadge: { type: String, default: "Expert Vedic Consultation" },
    ctaHeading: { type: String },
    ctaSubtitle: { type: String },
    ctaButton1Text: { type: String },
    ctaButton1Link: { type: String },
    ctaButton2Text: { type: String, default: "Need Assistance?" },
    ctaButton2Link: { type: String, default: "/contact" },
    
    // Kits Section
    pujaKits: [{
        name: String,
        price: Number,
        items: [String],
        image: String
    }],

    // Additional Hero Buttons (Optional override)
    buttons: [{
        text: String,
        link: String
    }],
    
    // Testimonials / Reviews
    testimonials: [{
        name: String,
        text: String,
        date: String
    }]

}, { timestamps: true });

module.exports = mongoose.model('DynamicShopContent', dynamicShopContentSchema);

