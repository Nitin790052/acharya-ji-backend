const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Booking = require('./models/Booking');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const sampleBookings = [
    {
        name: "Yogesh Sharma",
        mobile: "9876543210",
        city: "New Delhi",
        pujaType: "Mahalakshmi Puja",
        date: "2024-04-15",
        mode: "Home Visit",
        message: "Need morning slot if possible.",
        status: "Confirmed"
    },
    {
        name: "Priyanka Verma",
        mobile: "8765432109",
        city: "Mumbai",
        pujaType: "Ganesh Puja",
        date: "2024-04-20",
        mode: "Online",
        message: "Standard online setup required.",
        status: "Pending"
    },
    {
        name: "Amit Patel",
        mobile: "7654321098",
        city: "Ahmedabad",
        pujaType: "Satyanarayan Katha",
        date: "2024-04-10",
        mode: "Home Visit",
        message: "Family event.",
        status: "Completed"
    }
];

const seedData = async () => {
    try {
        await Booking.deleteMany();
        await Booking.insertMany(sampleBookings);
        console.log('Sample bookings seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
