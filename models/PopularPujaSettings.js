const mongoose = require('mongoose');

const popularPujaSettingsSchema = new mongoose.Schema({
    badge: {
        type: String,
        default: 'Most Booked Services',
    },
    title: {
        type: String,
        default: 'Popular Puja Services',
    },
    subtitle: {
        type: String,
        default: 'Traditional rituals performed by experienced priests with authentic Vedic mantras',
    },
    buttonText: {
        type: String,
        default: 'View All Puja Services',
    },
    buttonLink: {
        type: String,
        default: '/pujaServices',
    }
}, { timestamps: true });

module.exports = mongoose.model('PopularPujaSettings', popularPujaSettingsSchema);
