const mongoose = require('mongoose');

const popularPujaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    popular: {
        type: Boolean,
        default: false,
    },
    iconName: {
        type: String,
        default: 'Home',
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    order: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('PopularPuja', popularPujaSchema);
