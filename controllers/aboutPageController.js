const AboutPageSettings = require('../models/AboutPageSettings');
const AboutPageItem = require('../models/AboutPageItem');

// Settings
exports.getSettings = async (req, res) => {
    try {
        let s = await AboutPageSettings.findOne();
        if (!s) s = await AboutPageSettings.create({});
        res.json(s);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

const fs = require('fs');
const path = require('path');

exports.updateSettings = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) updateData.journeyImage = `/uploads/about/${req.file.filename}`;
        
        let s = await AboutPageSettings.findOne();
        if (!s) s = await AboutPageSettings.create(updateData);
        else {
            if (req.file && s.journeyImage && s.journeyImage.startsWith('/uploads')) {
                const oldPath = path.join(__dirname, '..', s.journeyImage);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            s = await AboutPageSettings.findOneAndUpdate({}, updateData, { new: true });
        }
        res.json(s);
    } catch (e) { res.status(400).json({ message: e.message }); }
};

// Items (Services, Why Choose Us, Values)
exports.getItemsByTag = async (req, res) => {
    try {
        const { tag } = req.params;
        const q = { tag };
        if (req.query.active === 'true') q.isActive = true;
        const items = await AboutPageItem.find(q).sort({ order: 1 });
        res.json(items);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getAllItems = async (req, res) => {
    try {
        const items = await AboutPageItem.find().sort({ order: 1 });
        res.json(items);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.createItem = async (req, res) => {
    try {
        const itemData = { ...req.body };
        if (req.file) itemData.image = `/uploads/about/${req.file.filename}`;
        const doc = await AboutPageItem.create(itemData);
        res.status(201).json(doc);
    } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.updateItem = async (req, res) => {
    try {
        const itemData = { ...req.body };
        if (req.file) itemData.image = `/uploads/about/${req.file.filename}`;
        
        const oldDoc = await AboutPageItem.findById(req.params.id);
        if (req.file && oldDoc && oldDoc.image && oldDoc.image.startsWith('/uploads')) {
            const oldPath = path.join(__dirname, '..', oldDoc.image);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        
        const doc = await AboutPageItem.findByIdAndUpdate(req.params.id, itemData, { new: true });
        res.json(doc);
    } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.removeItem = async (req, res) => {
    try {
        const doc = await AboutPageItem.findById(req.params.id);
        if (doc && doc.image && doc.image.startsWith('/uploads')) {
            const oldPath = path.join(__dirname, '..', doc.image);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        await AboutPageItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

// Seed
exports.seed = async (req, res) => {
    try {
        await AboutPageSettings.deleteMany();
        const settings = await AboutPageSettings.create({});

        await AboutPageItem.deleteMany();
        const initialItems = [
            { tag: 'service', title: 'Puja Services', image: 'PujaServices1.webp', items: ['Griha Pravesh Puja', 'Satyanarayan Katha', 'Rudrabhishek', 'Navgraha Shanti', 'Marriage & Vivah Puja', 'Pitru Dosh Puja', 'Havan & Yagya'], color: 'from-orange-500 to-red-600', order: 1 },
            { tag: 'service', title: 'Astrology Services', image: 'AstrologyServices.webp', items: ['Kundli Making & Matching', 'Manglik / Kaal Sarp / Pitru Dosh', 'Career, Marriage & Business', 'Numerology & Tarot', 'Shani Sade Sati Analysis'], color: 'from-purple-500 to-indigo-600', order: 2 },
            { tag: 'service', title: 'Vastu & Spiritual Products', image: 'Vastu.webp', items: ['Home & Office Vastu', 'Feng Shui', 'Gemstones & Rudraksha', 'Yantra', 'Energized Spiritual Products'], color: 'from-blue-500 to-cyan-600', order: 3 },
            { tag: 'service', title: 'Healing & Wellness', image: 'Healing&Wellness.webp', items: ['Reiki Healing', 'Crystal Healing', 'Chakra & Aura Cleansing', 'Meditation Guidance'], color: 'from-green-500 to-emerald-600', order: 4 },

            { tag: 'whyChoose', icon: 'Sparkles', title: '100% Authentic Vedic Rituals', description: 'Traditional vidhi followed', order: 1 },
            { tag: 'whyChoose', icon: 'Users', title: 'Verified Acharyas', description: 'Experienced spiritual experts', order: 2 },
            { tag: 'whyChoose', icon: 'MapPin', title: 'At-home & Online Services', description: 'Convenience at your doorstep', order: 3 },
            { tag: 'whyChoose', icon: 'BookOpen', title: 'Proper Mantra & Vidhi', description: 'Shastra-based procedures', order: 4 },
            { tag: 'whyChoose', icon: 'Phone', title: 'Transparent Consultation', description: 'Clear pricing & guidance', order: 5 },
            { tag: 'whyChoose', icon: 'Heart', title: 'Thousands Satisfied', description: 'Trusted by devotees nationwide', order: 6 },

            { tag: 'value', icon: 'Heart', title: 'Devotion', description: 'Every ritual is performed with utmost devotion and sincerity following proper Vedic traditions.', order: 1 },
            { tag: 'value', icon: 'Award', title: 'Authenticity', description: 'We preserve ancient traditions and authentic shastra-based practices.', order: 2 },
            { tag: 'value', icon: 'Users', title: 'Service', description: 'Dedicated to serving devotees with humility, transparency and care.', order: 3 }
        ];

        const docs = await AboutPageItem.insertMany(initialItems);
        res.json({ settings, items: docs });
    } catch (e) { res.status(500).json({ message: e.message }); }
};
