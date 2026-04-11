const mongoose = require('mongoose');

const footerSettingsSchema = new mongoose.Schema({
    description: { type: String, default: 'Bringing authentic Vedic traditions and sacred rituals to your doorstep with pure devotion and ancient wisdom.' },
    facebookUrl: { type: String, default: '#' },
    instagramUrl: { type: String, default: '#' },
    twitterUrl: { type: String, default: '#' },
    youtubeUrl: { type: String, default: '#' },
    
    address: { type: String, default: 'Varanasi, India - 221001' },
    phone: { type: String, default: '+91 98765 43210' },
    email: { type: String, default: 'guidance@acharyaji.com' },

    serviceLinks: [
        { label: { type: String }, href: { type: String } }
    ],
    astrologyLinks: [
        { label: { type: String }, href: { type: String } }
    ],
    companyLinks: [
        { label: { type: String }, href: { type: String } }
    ],
    productLinks: [
        { label: { type: String }, href: { type: String } }
    ],

    privacyPolicyUrl: { type: String, default: '/privacy' },
    termsOfServiceUrl: { type: String, default: '/terms' },
    refundPolicyUrl: { type: String, default: '/refund' }
}, { timestamps: true });

module.exports = mongoose.model('FooterSettings', footerSettingsSchema);
