const mongoose = require('mongoose');

const pujaSamagriSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('PujaSamagri', pujaSamagriSchema);
