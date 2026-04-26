const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const VendorService = require('./models/VendorService');

dotenv.config({ path: path.join(__dirname, '.env') });

const fixSlugs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const services = await VendorService.find({ slug: { $exists: false } });
        console.log(`Found ${services.length} services without slugs.`);
        
        for (const s of services) {
            if (s.title) {
                s.slug = s.title
                    .toLowerCase()
                    .split(' ')
                    .join('-')
                    .replace(/[^\w-]+/g, '');
                await s.save();
                console.log(`Fixed slug for: ${s.title} -> ${s.slug}`);
            }
        }
        
        // Also fix services where slug might be empty string
        const emptyServices = await VendorService.find({ slug: "" });
        console.log(`Found ${emptyServices.length} services with empty slugs.`);
        for (const s of emptyServices) {
            if (s.title) {
                s.slug = s.title
                    .toLowerCase()
                    .split(' ')
                    .join('-')
                    .replace(/[^\w-]+/g, '');
                await s.save();
                console.log(`Fixed empty slug for: ${s.title} -> ${s.slug}`);
            }
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixSlugs();
