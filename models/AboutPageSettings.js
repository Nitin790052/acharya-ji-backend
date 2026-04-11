const mongoose = require('mongoose');

const AboutPageSettingsSchema = new mongoose.Schema({
    journeyBadge: { type: String, default: 'Our Sacred Journey' },
    journeyTitle: { type: String, default: 'Bridging Ancient Tradition with Modern Convenience' },
    journeyDesc1: { type: String, default: 'Acharya Ji Online is a digital bridge to spiritual fulfillment, bringing the sanctity of Vedic rituals directly to your home.' },
    journeyDesc2: { type: String, default: 'Our journey began with a simple vision: to preserve the authenticity of Sanatan Dharma while embracing the ease of technology.' },
    journeyFeatures: { type: [String], default: ['Authentic Vedic rituals', 'Verified Acharyas', 'Transparent Pricing', 'Personalized Guidance'] },
    journeyExpYears: { type: String, default: '20+' },
    journeyImage: { type: String, default: 'acharyaji.webp' },
    
    offerBadge: { type: String, default: 'Our Offerings' },
    offerTitle: { type: String, default: 'What We Offer' },
    
    whyChooseBadge: { type: String, default: 'The Acharya Ji Standard' },
    whyChooseTitle: { type: String, default: 'Why Choose Us' },
    
    valuesTitle: { type: String, default: 'Our Core Values' },
    
    beliefTitle: { type: String, default: 'Our Belief' },
    beliefText: { type: String, default: 'We believe that spirituality is not superstition — it is science rooted in ancient wisdom. Every puja, mantra, and ritual follows proper shastra-based vidhi to bring peace, prosperity, and positivity.' },
    
    testimonialBadge: { type: String, default: 'Devotee Experiences' },
    testimonialTitle: { type: String, default: 'Hear From Our Yajamans' },
    
    ctaTitle1: { type: String, default: 'Begin Your' },
    ctaHighlight: { type: String, default: 'Spiritual Journey' },
    ctaTitle2: { type: String, default: 'With Us' },
    ctaDesc: { type: String, default: 'Join thousands of satisfied families who trust Acharya Ji Online for their sacred rituals and divine spiritual guidance.' },
}, { timestamps: true });

module.exports = mongoose.model('AboutPageSettings', AboutPageSettingsSchema);
