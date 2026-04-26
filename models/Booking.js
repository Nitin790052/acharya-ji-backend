const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Optional for anonymous bookings, but required for user history
    },
    name: {
        type: String,
        trim: true
    },
    mobile: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    pujaType: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true,
        enum: ['Online', 'Home Visit', 'Muhurat']
    },
    message: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        default: 0
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: false
    },
    pandit: {
        type: String,
        trim: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    receiptNo: {
        type: String,
        unique: true,
        sparse: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true, strict: false });

module.exports = mongoose.model('Booking', bookingSchema);
