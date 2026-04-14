const mongoose = require('mongoose');
const Booking = require('./models/Booking');
const User = require('./models/User');
require('dotenv').config();

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const count = await Booking.countDocuments({ user: { $exists: true, $ne: null } });
        console.log('Bookings with user ID:', count);
        
        const bookings = await Booking.find({}).limit(10);
        console.log('First 10 bookings overview:');
        bookings.forEach(b => console.log(` - ${b.pujaType} (User: ${b.user}, Mobile: ${b.mobile})`));
        
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

check();
