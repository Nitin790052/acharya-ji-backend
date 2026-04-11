const mongoose = require('mongoose');

const astrologerSettingsSchema = new mongoose.Schema({
    badge: {
        type: String,
        default: 'Live Consultation Available'
    },
    title: {
        type: String,
        default: 'Talk to Expert Astrologers'
    },
    subtitle: {
        type: String,
        default: 'Get personalized guidance from verified astrologers available 24/7'
    }
}, { timestamps: true });

module.exports = mongoose.model('AstrologerSettings', astrologerSettingsSchema);
