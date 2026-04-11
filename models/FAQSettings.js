const mongoose = require('mongoose');

const faqSettingsSchema = new mongoose.Schema({
    badge: { type: String, default: 'Common Questions' },
    title: { type: String, default: 'Frequently Asked Questions' },
    subtitle: { type: String, default: 'Quick solutions to common queries about our divine services and process' },
    ctaText: { type: String, default: 'Still have questions? ' },
    ctaLinkText: { type: String, default: 'Contact our support team' },
    ctaLink: { type: String, default: '#' }
}, { timestamps: true });

module.exports = mongoose.model('FAQSettings', faqSettingsSchema);
