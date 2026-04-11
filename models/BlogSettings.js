const mongoose = require('mongoose');

const blogSettingsSchema = new mongoose.Schema({
    badge: { type: String, default: 'Knowledge Hub' },
    title: { type: String, default: 'Discover Ancient Wisdom for Modern Life' },
    subtitle: { type: String, default: 'Curated spiritual knowledge blending timeless traditions with contemporary insights' }
}, { timestamps: true });

module.exports = mongoose.model('BlogSettings', blogSettingsSchema);
