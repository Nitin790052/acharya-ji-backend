const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
    description: {
        type: String
    },
    date: {
        type: String, // Or Date
        required: true
    },
    time: {
        type: String
    },
    duration: {
        type: String
    },
    venue: {
        type: String
    },
    address: {
        type: String
    },
    category: {
        type: String,
        enum: ['festival', 'utsav', 'spiritual', 'regular'],
        default: 'festival'
    },
    status: {
        type: String,
        enum: ['planning', 'upcoming', 'ongoing', 'completed'],
        default: 'upcoming'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    capacity: {
        type: Number,
        default: 100
    },
    registeredCount: {
        type: Number,
        default: 0
    },
    price: {
        type: String,
        default: 'Free'
    },
    organizers: [String],
    contact: {
        type: String
    },
    email: {
        type: String
    },
    image: {
        type: String
    },
    featured: {
        type: Boolean,
        default: false
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
