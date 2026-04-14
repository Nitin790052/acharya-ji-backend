const mongoose = require('mongoose');
const Booking = require('./models/Booking');
const User = require('./models/User');
require('dotenv').config();

const linkNitin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const nitin = await User.findOne({ name: /Nitin/i });
        if (!nitin) {
            console.log('User Nitin not found');
            process.exit(1);
        }

        console.log(`Linking bookings for ${nitin.name} (_id: ${nitin._id}, phone: ${nitin.phone})`);

        // Update all bookings that have 'Nitin' in the name
        const result = await Booking.updateMany(
            { name: /Nitin/i },
            { 
                $set: { 
                    user: nitin._id,
                    mobile: nitin.phone,
                    status: 'Completed' // Make some completed so they show in All/Completed
                } 
            }
        );

        console.log(`Successfully updated ${result.modifiedCount} bookings.`);
        
        // Also update one to 'Pending' so it shows there
        const oneBooking = await Booking.findOne({ user: nitin._id });
        if (oneBooking) {
            oneBooking.status = 'Pending';
            await oneBooking.save();
            console.log('Updated one booking to Pending status.');
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

linkNitin();
