const cloudinary = require('../config/cloudinary');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);

const testUpload = async () => {
    try {
        console.log('Configuring Cloudinary...');
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        
        console.log('Attempting upload...');
        const result = await cloudinary.uploader.upload('https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png', {
            folder: 'test'
        });
        console.log('Upload successful:', result.secure_url);
    } catch (error) {
        console.error('Upload failed:', error);
    }
};

testUpload();
