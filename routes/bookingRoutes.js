const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Routes for Bookings
router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getSingleBooking);
router.post('/', bookingController.createBooking);
router.put('/:id', bookingController.updateBooking);
router.post('/toggle-active/:id', bookingController.toggleActiveBooking);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
