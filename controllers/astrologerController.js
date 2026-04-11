const Astrologer = require('../models/Astrologer');
const AstrologerSettings = require('../models/AstrologerSettings');
const fs = require('fs');
const path = require('path');

exports.getSettings = async (req, res) => {
    try {
        let settings = await AstrologerSettings.findOne();
        if (!settings) settings = await AstrologerSettings.create({});
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching settings', error: error.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        let settings = await AstrologerSettings.findOne();
        if (!settings) {
            settings = await AstrologerSettings.create(req.body);
        } else {
            settings = await AstrologerSettings.findOneAndUpdate({}, req.body, { new: true });
        }
        res.status(200).json({ message: 'Settings updated successfully', settings });
    } catch (error) {
        res.status(500).json({ message: 'Error updating settings', error: error.message });
    }
};

exports.getAllAstrologers = async (req, res) => {
    try {
        const astrologers = await Astrologer.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json(astrologers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching astrologers', error: error.message });
    }
};

exports.getActiveAstrologers = async (req, res) => {
    try {
        const astrologers = await Astrologer.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        res.status(200).json(astrologers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching active astrologers', error: error.message });
    }
};

exports.createAstrologer = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Image is required' });
        const imageUrl = `/uploads/astrologers/${req.file.filename}`;
        const data = { ...req.body, imageUrl };

        // Parse array fields that come as comma-separated strings
        if (typeof data.specialization === 'string') data.specialization = data.specialization.split(',').map(s => s.trim());
        if (typeof data.languages === 'string') data.languages = data.languages.split(',').map(s => s.trim());
        if (typeof data.expertise === 'string') data.expertise = data.expertise.split(',').map(s => s.trim());
        if (data.online !== undefined) data.online = data.online === 'true' || data.online === true;
        if (data.isActive !== undefined) data.isActive = data.isActive === 'true' || data.isActive === true;

        const record = new Astrologer(data);
        await record.save();
        res.status(201).json({ message: 'Created successfully', astrologer: record });
    } catch (error) {
        res.status(500).json({ message: 'Error creating record', error: error.message });
    }
};

exports.updateAstrologer = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        if (typeof updates.specialization === 'string') updates.specialization = updates.specialization.split(',').map(s => s.trim());
        if (typeof updates.languages === 'string') updates.languages = updates.languages.split(',').map(s => s.trim());
        if (typeof updates.expertise === 'string') updates.expertise = updates.expertise.split(',').map(s => s.trim());
        if (updates.online !== undefined) updates.online = updates.online === 'true' || updates.online === true;
        if (updates.isActive !== undefined) updates.isActive = updates.isActive === 'true' || updates.isActive === true;

        if (req.file) {
            updates.imageUrl = `/uploads/astrologers/${req.file.filename}`;
            const existing = await Astrologer.findById(id);
            if (existing && existing.imageUrl) {
                const oldImagePath = path.join(__dirname, '..', existing.imageUrl);
                if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
            }
        }

        const updated = await Astrologer.findByIdAndUpdate(id, updates, { new: true });
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.status(200).json({ message: 'Updated successfully', astrologer: updated });
    } catch (error) {
        res.status(500).json({ message: 'Error updating', error: error.message });
    }
};

exports.deleteAstrologer = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await Astrologer.findById(id);
        if (!record) return res.status(404).json({ message: 'Not found' });
        
        if (record.imageUrl) {
            const imagePath = path.join(__dirname, '..', record.imageUrl);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }
        await Astrologer.findByIdAndDelete(id);
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting', error: error.message });
    }
};

exports.seedAstrologers = async (req, res) => {
    const initialData = [
        { name: 'Pandit Rajesh Sharma', imageUrl: '/uploads/astrologers/placeholder.jpg', experience: '15+ Years', rating: 4.9, reviews: 2847, specialization: ['Vedic Astrology', 'Kundli Analysis', 'Gemstone Consultation'], languages: ['Hindi', 'English', 'Sanskrit'], online: true, consultations: '5000+', expertise: ['Career', 'Marriage', 'Business'], isActive: true, order: 1 },
        { name: 'Dr. Priya Mishra', imageUrl: '/uploads/astrologers/placeholder.jpg', experience: '12+ Years', rating: 4.8, reviews: 1923, specialization: ['Tarot Reading', 'Numerology', 'Palmistry'], languages: ['Hindi', 'English', 'Marathi'], online: true, consultations: '3500+', expertise: ['Career', 'Marriage', 'Health'], isActive: true, order: 2 },
        { name: 'Acharya Vikram Joshi', imageUrl: '/uploads/astrologers/placeholder.jpg', experience: '20+ Years', rating: 5.0, reviews: 3421, specialization: ['KP Astrology', 'Prashna Kundali', 'Vastu'], languages: ['Hindi', 'English', 'Gujarati'], online: true, consultations: '7500+', expertise: ['Business', 'Career', 'Finance'], isActive: true, order: 3 },
    ];

    try {
        await Astrologer.deleteMany();
        await Astrologer.insertMany(initialData);
        res.status(201).json({ message: 'Seeded successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
