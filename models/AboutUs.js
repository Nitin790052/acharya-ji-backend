const mongoose = require('mongoose');

const AboutUsSchema = new mongoose.Schema({
    badge: { type: String, default: 'About Acharya Ji' },
    title: { type: String, required: true },
    highlightTitle: { type: String, default: '' },
    description1: { type: String, default: '' },
    description2: { type: String, default: '' },
    features: { type: [String], default: [] },
    imageUrl: { type: String, default: '' },
    buttonText: { type: String, default: 'Learn More About Us' },
    buttonLink: { type: String, default: '/about' },
    button2Text: { type: String, default: 'Get in Touch' },
    button2Link: { type: String, default: '/contact' },
    isActive: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('AboutUs', AboutUsSchema);
