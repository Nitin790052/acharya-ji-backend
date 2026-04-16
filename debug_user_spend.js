const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Booking = require('./models/Booking');
const User = require('./models/User');

async function debugSpend() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    const user = await User.findOne({ name: /Nitin kumar/i });
    if (!user) {
        console.log('User not found');
        process.exit();
    }

    console.log('User found:', user.name, user._id, user.phone);

    const bookings = await Booking.find({
        $or: [
            { user: user._id },
            { mobile: user.phone || user.mobile }
        ]
    });

    console.log(`Found ${bookings.length} bookings`);

    let totalSum = 0;
    let nonCancelledSum = 0;

    bookings.forEach(b => {
        const amt = Number(b.amount) || 0;
        totalSum += amt;
        if (b.status !== 'Cancelled') {
            nonCancelledSum += amt;
        }
        console.log(`Booking ID: ${b._id}, status: ${b.status}, amount: ${b.amount}, parsed: ${amt}`);
    });

    console.log('Total Sum (All):', totalSum);
    console.log('Non-Cancelled Sum:', nonCancelledSum);

    process.exit();
}

debugSpend();
