const CareerContent = require('../models/CareerContent');
const fs = require('fs');
const path = require('path');

const SEED_DATA = {
    eligibility: [
        { title: 'PANDIT / ACHARYA', icon: 'Star', items: ['Puja performing skills', 'Vedic knowledge', 'Excellence in shastra', '3+ years exp'], order: 1, isActive: true },
        { title: 'VEDIC ASTROLOGER', icon: 'Star', items: ['Kundli analysis', 'Horoscope matching', 'Remedial guidance', 'Scientific approach'], order: 2, isActive: true },
        { title: 'VASTU CONSULTANT', icon: 'Star', items: ['Residential vastu', 'Commercial analysis', 'Map reading', 'Practical remedies'], order: 3, isActive: true },
        { title: 'HEALING EXPERT', icon: 'Star', items: ['Reiki practitioners', 'Energy healers', 'Chakra cleansing', 'Wellness guidance'], order: 4, isActive: true }
    ],
    benefit: [
        { title: 'Regular Bookings', icon: 'Users', description: 'Get consistent leads from verified global devotees.', order: 1, isActive: true },
        { title: 'Flexible Income', icon: 'TrendingUp', description: 'Set your own schedule and earn as per your commitment.', order: 2, isActive: true },
        { title: 'Growth & Support', icon: 'Clock', description: 'Dedicated technical team to support your online sessions.', order: 3, isActive: true },
        { title: 'Trust & Reputation', icon: 'Shield', description: "Be part of India's most trusted spiritual platform.", order: 4, isActive: true }
    ],
    role: [
        { title: 'Ritual Acharya', icon: 'GraduationCap', description: 'Expert in various Shanti Pujas, Havans, and festive rituals.', order: 1, isActive: true },
        { title: 'Spiritual Guru', icon: 'Award', description: 'Guiding seekers through astrology and spiritual consultations.', order: 2, isActive: true },
        { title: 'Healing Master', icon: 'Heart', description: 'Spreading positivity through Reiki and energy healing.', order: 3, isActive: true }
    ],
    testimonial: [
        { name: 'Pandit S. Jha', location: 'Varanasi, India', description: 'Acharya Ji Online gave me a platform to reach devotees worldwide while maintaining the sanctity of Vedic rituals.', order: 1, isActive: true },
        { name: 'Acharya R. Sharma', location: 'Haridwar, India', description: 'The most professional and respectful platform for spiritual experts. Timely payments and great support.', order: 2, isActive: true },
        { name: 'Dr. A. Verma', location: 'Delhi, India', description: 'Joining this network expanded my astrology practice significantly. Truly a divine bridge to modern devotees.', order: 3, isActive: true }
    ]
};

// @desc    Seed specific type of career content
// @route   POST /api/career-content/seed/:type
exports.seedByType = async (req, res) => {
    try {
        const { type } = req.params;
        if (!SEED_DATA[type]) return res.status(400).json({ message: 'Invalid type for seeding' });

        // Check if data already exists for this type to avoid duplicates (optional, user might want to clear first)
        // For convenience, we'll just insert
        const dataToInsert = SEED_DATA[type].map(item => ({ ...item, type }));
        
        // Remove existing of this type to "reset"
        await CareerContent.deleteMany({ type });
        
        const seeded = await CareerContent.insertMany(dataToInsert);
        res.status(201).json({ message: `${type} seeded successfully`, count: seeded.length });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get all career content
// @route   GET /api/career-content
exports.getAllCareerContent = async (req, res) => {
    try {
        const content = await CareerContent.find().sort({ type: 1, order: 1 });
        res.status(200).json(content);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get career content by type
// @route   GET /api/career-content/type/:type
exports.getCareerByType = async (req, res) => {
    try {
        const content = await CareerContent.find({ type: req.params.type, isActive: true }).sort({ order: 1 });
        res.status(200).json(content);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create career content
exports.createCareerContent = async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) {
            data.image = `/uploads/career/${req.file.filename}`;
        }
        
        if (typeof data.items === 'string') {
            data.items = data.items.split(',')
                .map(i => i.trim())
                .filter(i => i !== '');
        }

        if (data.isActive !== undefined) {
            data.isActive = data.isActive === 'true' || data.isActive === true;
        }

        const newContent = new CareerContent(data);
        await newContent.save();
        res.status(201).json(newContent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update career content
exports.updateCareerContent = async (req, res) => {
    try {
        const data = { ...req.body };
        const content = await CareerContent.findById(req.params.id);
        
        if (!content) return res.status(404).json({ message: 'Content not found' });

        if (req.file) {
            if (content.image) {
                const oldPath = path.join(__dirname, '..', content.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            data.image = `/uploads/career/${req.file.filename}`;
        }

        if (typeof data.items === 'string') {
            data.items = data.items.split(',')
                .map(i => i.trim())
                .filter(i => i !== '');
        }

        if (data.isActive !== undefined) {
            data.isActive = data.isActive === 'true' || data.isActive === true;
        }

        const updatedContent = await CareerContent.findByIdAndUpdate(req.params.id, data, { new: true });
        res.status(200).json(updatedContent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete career content
exports.deleteCareerContent = async (req, res) => {
    try {
        const content = await CareerContent.findById(req.params.id);
        if (!content) return res.status(404).json({ message: 'Content not found' });

        if (content.image) {
            const imgPath = path.join(__dirname, '..', content.image);
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }

        await CareerContent.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Content deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
