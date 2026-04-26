const mongoose = require('mongoose');

const VendorServiceSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        default: 0
    },
    duration: {
        type: String,
        default: '1 hour'
    },
    image: {
        type: String, // Service Image URL
        default: ''
    },
    imageAlt: {
        type: String, // SEO Alt Tag
        default: ''
    },
    slots: {
        type: Number,
        default: 10 // Max bookings per day
    },
    category: {
        type: String,
        required: true,
        enum: ['puja', 'donation', 'katha', 'special', 'other'],
        default: 'puja'
    },
    type: {
        type: String, // Seva, Puja, Katha, Special
        default: 'Seva'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    rejectionReason: {
        type: String,
        default: ''
    },
    isRead: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Create service slug from the title
VendorServiceSchema.pre('save', function() {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .split(' ')
            .join('-')
            .replace(/[^\w-]+/g, '');
    }
});

module.exports = mongoose.model('VendorService', VendorServiceSchema);
