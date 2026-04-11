const mongoose = require('mongoose');

const astrologerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    experience: { type: String, required: true },
    rating: { type: Number, default: 5.0 },
    reviews: { type: Number, default: 0 },
    specialization: { type: [String], default: [] },
    languages: { type: [String], default: [] },
    online: { type: Boolean, default: false },
    consultations: { type: String, default: '0+' },
    expertise: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Astrologer', astrologerSchema);
