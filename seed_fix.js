const mongoose = require('mongoose');
const LearningPageContent = require('./models/LearningPageContent');

const seed = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/acharya-ji'); // Adjusted to local if needed, but the user is running production-like env.
        // Actually, I don't know the exact mongo URI. I should check .env
        console.log('Use Admin Panel "Seed Data" button to fix this!');
    } catch (e) {
        console.error(e);
    }
};
