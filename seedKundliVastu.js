const mongoose = require('mongoose');
const dotenv = require('dotenv');
const KundliService = require('./models/KundliService');
const VastuService = require('./models/VastuService');
const KundliSettings = require('./models/KundliSettings');
const VastuSettings = require('./models/VastuSettings');
const connectDB = require('./config/db');

dotenv.config();

const kundliServices = [
    { iconName: 'Book', title: 'Get Free Kundli', description: 'Complete birth chart analysis with detailed planetary positions', features: ['Detailed Birth Chart', 'Planetary Positions', 'Dasha Predictions', 'Life Insights'], price: 'FREE', cta: 'Generate Free Kundli', popular: true, imageUrl: '/uploads/kundli/GetFreeKundli.webp', gradient: 'from-saffron to-orange-600', isActive: true, order: 1 },
    { iconName: 'Heart', title: 'Kundli Matching', description: 'Check compatibility for marriage with detailed Guna Milan analysis', features: ['36 Gunas Analysis', 'Manglik Check', 'Compatibility Score', 'Marriage Timing'], price: '₹500', cta: 'Match Kundli Now', popular: true, imageUrl: '/uploads/kundli/KundliMatching.webp', gradient: 'from-maroon to-red-700', isActive: true, order: 2 },
    { iconName: 'AlertCircle', title: 'Manglik Dosh Check', description: 'Identify Manglik Dosha and get personalized remedies', features: ['Manglik Analysis', 'Dosha Strength', 'Remedy Solutions', 'Expert Guidance'], price: '₹299', cta: 'Check Manglik Dosh', popular: false, imageUrl: '/uploads/kundli/ManglikDoshCheck.webp', gradient: 'from-red-600 to-red-800', isActive: true, order: 3 },
];

const vastuServices = [
    { iconName: 'Home', title: 'Home Vastu', description: 'Transform your home into a sanctuary of positive energy and prosperity', features: ['Direction Analysis', 'Room Placement', 'Energy Flow', 'Remedies'], benefits: ['Harmony', 'Prosperity', 'Health'], price: '₹2,999', popular: true, imageUrl: '/uploads/vastu/HomeVastu.webp', gradient: 'from-saffron to-orange-600', isActive: true, order: 1 },
    { iconName: 'Building2', title: 'Office Vastu', description: 'Enhance productivity and business growth with optimal office energy', features: ['Desk Placement', 'Cash Counter', 'Staff Seating', 'Success Zone'], benefits: ['Growth', 'Wealth', 'Success'], price: '₹4,999', popular: true, imageUrl: '/uploads/vastu/OfficeVastu.webp', gradient: 'from-maroon to-red-800', isActive: true, order: 2 },
    { iconName: 'Gem', title: 'Gemstones', description: 'Certified gemstones to strengthen planetary positions and bring luck', features: ['Personalized Selection', 'Certified Stones', 'Energized', 'Wearing Guide'], benefits: ['Protection', 'Fortune', 'Power'], price: 'From ₹1,500', popular: false, imageUrl: '/uploads/vastu/Gemstones.webp', gradient: 'from-pink-600 to-rose-700', isActive: true, order: 3 },
];

const seedData = async () => {
    try {
        await connectDB();

        await KundliService.deleteMany();
        await KundliService.insertMany(kundliServices);
        console.log('Kundli Services Seeded');

        await VastuService.deleteMany();
        await VastuService.insertMany(vastuServices);
        console.log('Vastu Services Seeded');

        // Seed default settings if not exists
        const ks = await KundliSettings.findOne();
        if(!ks) await KundliSettings.create({
            badge: "Accurate Vedic Astrology",
            title: "Kundli Services",
            subtitle: "Get detailed astrological insights with authentic Vedic calculations"
        });

        const vs = await VastuSettings.findOne();
        if(!vs) await VastuSettings.create({
            badge: "Transform Your Life",
            title: "Vastu, Remedies & Healing",
            subtitle: "Ancient wisdom meets modern solutions for holistic well-being and prosperity"
        });

        console.log('Settings Seeded');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
