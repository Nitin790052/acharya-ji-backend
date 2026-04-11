const mongoose = require('mongoose');

const pujaStepSchema = new mongoose.Schema({
    number: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    hindiTitle: { type: String, required: true },
    fields: [{
        name: String,
        label: String,
        placeholder: String,
        type: { type: String, default: 'text' },
        required: { type: Boolean, default: false }
    }],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('PujaStep', pujaStepSchema);
