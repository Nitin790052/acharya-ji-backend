const mongoose = require('mongoose');

const kundliServiceSchema = new mongoose.Schema({
    iconName: { type: String, default: 'Book' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    price: { type: String, required: true },
    cta: { type: String, default: 'Learn More' },
    popular: { type: Boolean, default: false },
    imageUrl: { type: String, required: true },
    gradient: { type: String, default: 'from-saffron to-orange-600' },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('KundliService', kundliServiceSchema);
