const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });
const User = require('./models/User');

async function debugLocation() {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({}, 'name address location').lean();
    console.log(JSON.stringify(users, null, 2));
    process.exit();
}
debugLocation();
