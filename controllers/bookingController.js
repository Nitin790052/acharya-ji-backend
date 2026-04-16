const Booking = require('../models/Booking');

// @desc    Get all bookings
// @route   GET /api/bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
exports.getSingleBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
    try {
        console.log('Incoming Booking Request:', JSON.stringify(req.body, null, 2));
        
        const bookingData = { ...req.body };

        // Attach user if logged in
        if (req.user && req.user.id) {
            bookingData.user = req.user.id;
        }

        // If amount is missing, try to fetch it from the offering
        if (!bookingData.amount) {
            const PujaOffering = require('../models/PujaOffering');
            const offering = await PujaOffering.findOne({ title: bookingData.pujaType });
            if (offering) {
                bookingData.amount = offering.price;
            }
        }

        const newBooking = new Booking(bookingData);
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        console.error('Booking Validation Error:', error.message);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a booking
// @route   PUT /api/bookings/:id
exports.updateBooking = async (req, res) => {
    try {
        // Auto-confirm if payment status is changed to paid
        if (req.body.paymentStatus === 'paid' && (!req.body.status || req.body.status === 'Pending')) {
            const booking = await Booking.findById(req.params.id);
            if (booking && booking.status === 'Pending') {
                req.body.status = 'Confirmed';
            }
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle booking active status
// @route   POST /api/bookings/toggle-active/:id
exports.toggleActiveBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        
        booking.isActive = !booking.isActive;
        await booking.save();
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
