const mongoose = require('mongoose');

const PageSEOSchema = new mongoose.Schema({
    pageName: {
        type: String,
        required: true,
        unique: true, // One SEO config per page/route
        trim: true
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    keywords: {
        type: String,
        default: ''
    },
    canonical: {
        type: String,
        default: ''
    },
    ogImage: {
        type: String,
        default: ''
    },
    ogType: {
        type: String,
        default: 'website'
    },
    structuredData: {
        type: Object, // For custom JSON-LD schema
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('PageSEO', PageSEOSchema);
