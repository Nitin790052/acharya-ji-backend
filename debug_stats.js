const mongoose = require("mongoose");
const User = require("./models/User");
const Booking = require("./models/Booking");

async function debugStats() {
    try {
        await mongoose.connect("mongodb+srv://nitinkumar79005205_db_user:QE0o6sPJ9U9TYYwg@cluster0.askiz4p.mongodb.net/acharya_ji");
        console.log("Connected to MongoDB");

        const user = await User.findOne({ name: /Nitin/i });
        if (!user) {
            console.log("User 'Nitin' not found");
            return;
        }

        console.log("Found User:", {
            id: user._id,
            name: user.name,
            phone: user.phone
        });

        const bookings = await Booking.find({
            $or: [
                { user: user._id },
                { mobile: user.phone }
            ]
        });

        console.log(`Found ${bookings.length} bookings for this user.`);
        bookings.forEach((b, i) => {
            console.log(`Booking ${i + 1}:`, {
                id: b._id,
                pujaType: b.pujaType,
                amount: b.amount,
                amountType: typeof b.amount,
                status: b.status,
                paymentStatus: b.paymentStatus
            });
        });

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
    }
}

debugStats();
