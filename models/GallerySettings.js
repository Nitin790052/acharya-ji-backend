const mongoose = require('mongoose');

const gallerySettingsSchema = new mongoose.Schema({
    cta: {
        badge: { type: String, default: 'Sacred Connections' },
        title: { type: String, default: 'Begin Your' },
        titleHighlight: { type: String, default: 'Divine Journey' },
        description: { type: String, default: 'Book your personalized Vedic rituals and experience the profound impact of authentic spiritual ceremonies performed with devotion.' },
        primaryBtnText: { type: String, default: 'Book Puja Now' },
        secondaryBtnText: { type: String, default: 'Consult Expert' }
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('GallerySettings', gallerySettingsSchema);
