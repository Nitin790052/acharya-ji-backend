const mongoose = require('mongoose');
const Booking = require('./models/Booking');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/acharya_ji');
        
        const bookingCount = await Booking.countDocuments({});
        console.log('Total Bookings:', bookingCount);
        
        const bookingsWithUser = await Booking.countDocuments({ user: { $exists: true, $ne: null } });
        console.log('Bookings with linked User:', bookingsWithUser);
        
        const bookingsWithoutUser = await Booking.find({ user: { $exists: false } }).limit(5);
        console.log('Sample Bookings without User Field:');
        console.log(JSON.stringify(bookingsWithoutUser, null, 2));
        
        const users = await User.find({}).limit(10);
        console.log('Users (Mobile Numbers):');
        users.forEach(u => console.log(` - ${u.name}: ${u.phone || u.mobile}`));
        
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkData();
