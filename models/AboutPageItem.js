const mongoose = require('mongoose');

const AboutPageItemSchema = new mongoose.Schema({
    tag: { type: String, enum: ['service', 'whyChoose', 'value'], required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    icon: { type: String, default: 'Star' },
    image: { type: String, default: '' },
    color: { type: String, default: '' },
    items: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('AboutPageItem', AboutPageItemSchema);
