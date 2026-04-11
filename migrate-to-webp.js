const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { convertToWebp } = require('./utils/imageUtils');
const dotenv = require('dotenv');

dotenv.config();

// Import Models
const DynamicShopProduct = require('./models/DynamicShopProduct');
const Media = require('./models/Media');
const DynamicShopContent = require('./models/DynamicShopContent');
const Service = require('./models/Service');
const Astrologer = require('./models/Astrologer');
const Gallery = require('./models/Gallery');
const Blog = require('./models/Blog');
// Add other models as needed

const uploadsDir = path.join(__dirname, 'uploads');

async function migrate() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/acharya-ji');
        console.log('Connected to MongoDB for migration...');

        const processDirectory = async (dir) => {
            const entries = fs.readdirSync(dir, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                if (entry.isDirectory()) {
                    await processDirectory(fullPath);
                } else if (entry.isFile()) {
                    const ext = path.extname(entry.name).toLowerCase();
                    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                        console.log(`Converting existing file: ${entry.name}`);
                        const newPath = await convertToWebp(fullPath, false); // Keep original for safely "bina hataye"
                        
                        const oldRelativePath = '/' + path.relative(__dirname, fullPath).replace(/\\/g, '/');
                        const newRelativePath = '/' + path.relative(__dirname, newPath).replace(/\\/g, '/');

                        if (oldRelativePath !== newRelativePath) {
                            await updateDatabaseReferences(oldRelativePath, newRelativePath);
                        }
                    }
                }
            }
        };

        const updateDatabaseReferences = async (oldPath, newPath) => {
            // 1. DynamicShopProduct
            const shopProdsRes = await DynamicShopProduct.updateMany({ image: oldPath }, { $set: { image: newPath } });
            if (shopProdsRes.modifiedCount > 0) console.log(`Updated ${shopProdsRes.modifiedCount} DynamicShopProduct entries`);

            // 2. Media
            const mediaRes = await Media.updateMany({ image: oldPath }, { $set: { image: newPath } });
            if (mediaRes.modifiedCount > 0) console.log(`Updated ${mediaRes.modifiedCount} Media entries`);

            // 3. Service
            const serviceRes = await Service.updateMany({ imageUrl: oldPath }, { $set: { imageUrl: newPath } });
            if (serviceRes.modifiedCount > 0) console.log(`Updated ${serviceRes.modifiedCount} Service entries`);

            // 4. Astrologer
            const astroRes = await Astrologer.updateMany({ imageUrl: oldPath }, { $set: { imageUrl: newPath } });
            if (astroRes.modifiedCount > 0) console.log(`Updated ${astroRes.modifiedCount} Astrologer entries`);

            // 5. Gallery
            const galleryRes = await Gallery.updateMany({ image: oldPath }, { $set: { image: newPath } });
            if (galleryRes.modifiedCount > 0) console.log(`Updated ${galleryRes.modifiedCount} Gallery entries`);
            
            // 6. Blog
            const blogRes = await Blog.updateMany({ image: oldPath }, { $set: { image: newPath } });
            if (blogRes.modifiedCount > 0) console.log(`Updated ${blogRes.modifiedCount} Blog entries`);

            // 7. DynamicShopContent (Sub-documents)
            const shopContents = await DynamicShopContent.find({ "pujaKits.image": oldPath });
            for (const doc of shopContents) {
                doc.pujaKits.forEach(kit => {
                    if (kit.image === oldPath) kit.image = newPath;
                });
                await doc.save();
                console.log(`Updated pujaKits in DynamicShopContent: ${doc.shopType}`);
            }
        };

        if (fs.existsSync(uploadsDir)) {
            console.log('Starting directory scan...');
            await processDirectory(uploadsDir);
        }

        console.log('Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
