const mongoose = require('mongoose');
const AstrologyPageContent = require('./models/AstrologyPageContent');
require('dotenv').config();

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/acharya_ji');
        const page = await AstrologyPageContent.findOne({ pageSlug: 'marriage-astrology' }, 'pageName pageSlug hero deepDive');
        console.log(JSON.stringify(page, null, 2));
        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

checkData();
