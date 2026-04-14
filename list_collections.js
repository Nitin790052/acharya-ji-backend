const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const listCollections = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/acharya_ji');
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections in DB:');
        collections.forEach(c => console.log(` - ${c.name}`));
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

listCollections();
