const mongoose = require('mongoose');

const vastuSettingsSchema = new mongoose.Schema({
    badge: { type: String, default: 'Transform Your Life' },
    title: { type: String, default: 'Vastu, Remedies & Healing' },
    subtitle: { type: String, default: 'Ancient wisdom meets modern solutions for holistic well-being and prosperity' }
}, { timestamps: true });

module.exports = mongoose.model('VastuSettings', vastuSettingsSchema);
