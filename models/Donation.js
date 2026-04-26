const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    devotee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    mobile: {
        type: String,
        trim: true
    },
    address: {
        type: String
    },
    pan: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    type: {
        type: String,
        default: 'General Donation'
    },
    category: {
        type: String,
        enum: ['general', 'renovation', 'annadanam', 'festival', 'corpus'],
        default: 'general'
    },
    paymentMode: {
        type: String,
        enum: ['UPI', 'Card', 'NetBanking', 'Cash', 'NEFT'],
        default: 'UPI'
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    receiptNo: {
        type: String,
        unique: true
    },
    message: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: false
    },
    receiptSent: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    }
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
