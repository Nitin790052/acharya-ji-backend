const mongoose = require('mongoose');

const navbarSchema = new mongoose.Schema({
    label: { type: String, required: true },
    href: { type: String, default: '#' },
    type: { type: String, enum: ['link', 'dropdown'], default: 'link' },
    children: [
        {
            label: { type: String, required: true },
            href: { type: String, required: true }
        }
    ],
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Navbar', navbarSchema);
