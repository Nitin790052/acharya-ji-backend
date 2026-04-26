const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    type: {
        type: String,
        enum: ['donation', 'seva', 'withdrawal', 'refund', 'credit'],
        required: true
    },
    category: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['success', 'pending', 'processing', 'failed', 'completed'],
        default: 'success'
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String
    },
    devotee: {
        type: String
    },
    paymentMode: {
        type: String
    },
    reference: {
        type: String
    },
    receiptNo: {
        type: String
    },
    bank: {
        type: String
    },
    accountNo: {
        type: String
    },
    utr: {
        type: String
    },
    processedOn: {
        type: String
    },
    balance: {
        type: Number
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
