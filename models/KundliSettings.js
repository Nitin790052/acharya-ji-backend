const mongoose = require('mongoose');

const kundliSettingsSchema = new mongoose.Schema({
    badge: { type: String, default: 'Accurate Vedic Astrology' },
    title: { type: String, default: 'Kundli Services' },
    subtitle: { type: String, default: 'Get detailed astrological insights with authentic Vedic calculations' }
}, { timestamps: true });

module.exports = mongoose.model('KundliSettings', kundliSettingsSchema);
