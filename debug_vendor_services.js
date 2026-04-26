const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const VendorService = require('./models/VendorService');

dotenv.config({ path: path.join(__dirname, '.env') });

const checkVendorServices = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const services = await VendorService.find({});
        console.log('Total Vendor Services:', services.length);
        services.forEach(s => {
            console.log(`ID: ${s._id}, Title: ${s.title}, Slug: ${s.slug}`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkVendorServices();
