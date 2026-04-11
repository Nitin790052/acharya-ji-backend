const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    rating: { type: Number, default: 5 },
    feedback: { type: String, required: true },
    service: { type: String, required: true },
    imageUrl: { type: String }, // For uploaded images
    designation: { type: String, required: true },
    date: { type: String, default: 'Recently' },
    readTime: { type: String, default: '2 min' },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
