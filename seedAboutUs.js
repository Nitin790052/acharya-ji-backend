const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const AboutUs = require('./models/AboutUs');

const seedData = {
    badge: 'About Acharya Ji',
    title: 'Bringing Divine Blessings to Your Home',
    highlightTitle: 'Home',
    description1: 'Acharya Ji is a trusted platform for authentic spiritual services, connecting devotees with experienced priests and religious scholars. We believe in preserving ancient traditions while making them accessible to modern families.',
    description2: 'Whether you seek blessings for a new beginning, wish to perform ancestral rites, or want to celebrate festivals with proper rituals, our team ensures every ceremony is conducted with devotion and authenticity.',
    features: [
        'Experienced & Certified Pandits',
        'Authentic Vedic Rituals',
        'Services across all faiths',
        'Home Visit & Online Options',
        'Premium Puja Materials',
        '24/7 Customer Support',
    ],
    imageUrl: '',  // will use the static local image as fallback in frontend
    buttonText: 'Learn More About Us',
    buttonLink: '/about',
    button2Text: 'Get in Touch',
    button2Link: '/contact',
    isActive: true,
};

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existing = await AboutUs.findOne();
        if (existing) {
            console.log('About Us record already exists. Skipping seed.');
        } else {
            const record = new AboutUs(seedData);
            await record.save();
            console.log('✅ Seeded About Us data successfully!');
        }

        await mongoose.disconnect();
        console.log('Done.');
    } catch (err) {
        console.error('Seed failed:', err);
        process.exit(1);
    }
}

seed();
