const mongoose = require('mongoose');
const AstrologyPageContent = require('./models/AstrologyPageContent');
require('dotenv').config();

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/acharya_ji');
        const pages = await AstrologyPageContent.find({}, 'pageSlug hero deepDive');
        console.log(JSON.stringify(pages, null, 2));
        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

checkData();
