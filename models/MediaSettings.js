const mongoose = require('mongoose');

const mediaSettingsSchema = new mongoose.Schema({
    stats: [
        {
            value: String,
            label: String,
            iconType: {
                type: String,
                enum: ['youtube', 'instagram', 'newspaper', 'users'],
                default: 'youtube'
            }
        }
    ],
    cta: {
        badge: { type: String, default: 'SPIRITUAL CONNECTION' },
        title: { type: String, default: 'EXPERIENCE THE' },
        titleHighlight: { type: String, default: 'DIVINE GRACE' },
        description: { type: String, default: "Join Acharya Ji's spiritual family and discover the profound impact of authentic Vedic rituals and divine guidance in your life." },
        primaryBtnText: { type: String, default: 'Book Sacred Puja' },
        primaryBtnLink: { type: String, default: '/puja/online' },
        secondaryBtnText: { type: String, default: 'Professional Consultation' },
        secondaryBtnLink: { type: String, default: '/talk-to-astrologer' }
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('MediaSettings', mediaSettingsSchema);
