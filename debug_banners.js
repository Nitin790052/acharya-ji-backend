const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const checkBanners = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const HeroBanner = mongoose.model('HeroBanner', new mongoose.Schema({
            pagePath: String,
            imageUrl: String,
            titleHighlight1: String
        }));
        const banners = await HeroBanner.find({});
        console.log('All Banners:', JSON.stringify(banners, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkBanners();
