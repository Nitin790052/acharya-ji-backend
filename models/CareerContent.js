const mongoose = require('mongoose');

const careerContentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['eligibility', 'benefit', 'role', 'testimonial']
    },
    title: {
        type: String,
        trim: true
    },
    subtitle: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    icon: {
        type: String, // Lucide icon name or image path
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    items: [{
        type: String // For eligibility bullet points
    }],
    location: {
        type: String // For testimonials
    },
    name: {
        type: String // For testimonials
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('CareerContent', careerContentSchema);
