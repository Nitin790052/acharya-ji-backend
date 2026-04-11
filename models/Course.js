const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    duration: { type: String, default: '8 Weeks' },
    price: { type: Number, default: 0 },
    level: { type: String, enum: ['Beginner', 'Professional', 'Spiritual'], default: 'Beginner' },
    rating: { type: Number, default: 5 },
    students: { type: Number, default: 0 },
    imageUrl: { type: String },
    imageAlt: { type: String },
    isFeatured: { type: Boolean, default: false },
    category: { type: String, default: 'beginner' }, // For inner filtering (Beginner, Professional, etc.)
    description: { type: String },
    modules: [{ type: String }],
    type: { type: String, required: true }, // The page type: 'astrology', 'puja-vidhi', 'mantra'
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
