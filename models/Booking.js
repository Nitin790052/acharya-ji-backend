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
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true, strict: false });

module.exports = mongoose.model('Booking', bookingSchema);
