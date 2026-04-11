const mongoose = require('mongoose');

const appDownloadSettingsSchema = new mongoose.Schema({
    badge: { type: String, default: 'Download Our App Now' },
    title: { type: String, default: 'Book Puja Anytime, Anywhere' },
    subtitle: { type: String, default: 'Experience divine services at your fingertips. Book pandits and consultations with ease.' },
    features: [
        { icon: { type: String, default: 'Zap' }, text: { type: String, default: 'Instant Booking' } },
        { icon: { type: String, default: 'Clock' }, text: { type: String, default: '24/7 Support' } },
        { icon: { type: String, default: 'Shield' }, text: { type: String, default: 'Secure Payments' } },
        { icon: { type: String, default: 'Star' }, text: { type: String, default: 'Expert Pandits' } }
    ],
    stats: [
        { number: { type: String, default: '50K+' }, label: { type: String, default: 'Downloads' } },
        { number: { type: String, default: '4.8★' }, label: { type: String, default: 'App Rating' } },
        { number: { type: String, default: '10K+' }, label: { type: String, default: 'Reviews' } }
    ],
    googlePlayUrl: { type: String, default: '#' },
    appStoreUrl: { type: String, default: '#' },
    offerTitle: { type: String, default: 'Special App-Only Offer!' },
    offerDescription: { type: String, default: 'Get ₹100 OFF on your first booking through the app' },
    offerButtonText: { type: String, default: 'Get App Now' }
}, { timestamps: true });

module.exports = mongoose.model('AppDownloadSettings', appDownloadSettingsSchema);
