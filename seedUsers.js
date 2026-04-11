const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding users...');

        // Clear existing users
        await User.deleteMany();
        console.log('Existing users cleared.');

        const testUsers = [
            {
                name: 'Rahul Sharma',
                email: 'rahul@example.com',
                phone: '9876543210',
                password: 'password123',
                status: 'active',
                role: 'user',
                location: 'Delhi, India',
                totalBookings: 12,
                totalOrders: 5,
                totalSpend: 15400,
                avatar: 'RS'
            },
            {
                name: 'Priya Patel',
                email: 'priya@example.com',
                phone: '9876543211',
                password: 'password123',
                status: 'active',
                role: 'user',
                location: 'Mumbai, India',
                totalBookings: 8,
                totalOrders: 3,
                totalSpend: 8200,
                avatar: 'PP'
            },
            {
                name: 'Amit Kumar',
                email: 'amit@example.com',
                phone: '9876543212',
                password: 'password123',
                status: 'blocked',
                role: 'user',
                location: 'Bangalore, India',
                totalBookings: 2,
                totalOrders: 1,
                totalSpend: 1200,
                avatar: 'AK'
            },
            {
                name: 'Sneha Gupta',
                email: 'sneha@example.com',
                phone: '9876543213',
                password: 'password123',
                status: 'active',
                role: 'user',
                location: 'Jaipur, India',
                totalBookings: 25,
                totalOrders: 10,
                totalSpend: 45000,
                avatar: 'SG'
            },
            {
                name: 'Vikram Singh',
                email: 'vikram@example.com',
                phone: '9876543214',
                password: 'password123',
                status: 'active',
                role: 'user',
                location: 'Chandigarh, India',
                totalBookings: 0,
                totalOrders: 0,
                totalSpend: 0,
                avatar: 'VS'
            }
        ];

        for (const userData of testUsers) {
            await User.create(userData);
            console.log(`User created: ${userData.name}`);
        }

        console.log('Seeding completed successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
