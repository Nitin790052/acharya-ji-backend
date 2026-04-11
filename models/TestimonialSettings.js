const mongoose = require('mongoose');

const testimonialSettingsSchema = new mongoose.Schema({
    badge: { type: String, default: 'Testimonials' },
    title: { type: String, default: 'What Our Clients Say' },
    subtitle: { type: String, default: 'Real experiences from people who have transformed their lives with our spiritual services' }
}, { timestamps: true });

module.exports = mongoose.model('TestimonialSettings', testimonialSettingsSchema);
