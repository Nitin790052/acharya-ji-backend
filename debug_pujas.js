const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const PujaOffering = require('./models/PujaOffering');

dotenv.config({ path: path.join(__dirname, '.env') });

const checkPujas = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const pujas = await PujaOffering.find({});
        console.log('Total Pujas:', pujas.length);
        pujas.forEach(p => {
            console.log(`ID: ${p._id}, Title: ${p.title}, Slug: ${p.slug}, Image: ${p.imageUrl}`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkPujas();
