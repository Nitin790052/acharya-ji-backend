const mongoose = require('mongoose');

const pujaExpertSchema = new mongoose.Schema({
    name: { type: String, required: true },
    experience: { type: String, required: true },
    expertise: { type: String, required: true },
    rating: { type: Number, default: 4.9 },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('PujaExpert', pujaExpertSchema);
