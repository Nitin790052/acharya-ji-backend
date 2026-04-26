const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Head Pandit', 'Pandit', 'Temple Manager', 'Accountant', 'Other'],
        default: 'Pandit'
    },
    department: {
        type: String,
        enum: ['Puja', 'Administration', 'Finance', 'Other'],
        default: 'Puja'
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    experience: {
        type: String
    },
    status: {
        type: String,
        enum: ['available', 'busy', 'on-leave'],
        default: 'available'
    },
    rating: {
        type: Number,
        default: 5.0
    },
    assignedBookings: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);
