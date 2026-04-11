const mongoose = require('mongoose');

const CourseSettingsSchema = new mongoose.Schema({
    type: { type: String, required: true, unique: true }, // 'astrology', 'puja-vidhi', 'mantra'
    whyLearnItems: [{
        icon: { type: String },
        title: { type: String },
        desc: { type: String }
    }],
    testimonials: [{
        quote: { type: String },
        author: { type: String },
        role: { type: String }
    }],
    faqs: [{
        q: { type: String },
        a: { type: String }
    }],
    // Optional banner overrides if we don't use usePageBanner
    badge: { type: String },
    title: { type: String },
    titleHighlight: { type: String },
    subtitle: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('CourseSettings', CourseSettingsSchema);
