const VastuService = require('../models/VastuService');
const VastuSettings = require('../models/VastuSettings');
const fs = require('fs');
const path = require('path');

const parseArr = (val) => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') return val.split(',').map(s => s.trim()).filter(Boolean);
    return [];
};

exports.getSettings = async (req, res) => {
    try {
        let s = await VastuSettings.findOne();
        if (!s) s = await VastuSettings.create({});
        res.json(s);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.updateSettings = async (req, res) => {
    try {
        let s = await VastuSettings.findOne();
        if (!s) s = await VastuSettings.create(req.body);
        else s = await VastuSettings.findOneAndUpdate({}, req.body, { new: true });
        res.json({ message: 'Updated', settings: s });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getAll = async (req, res) => {
    try {
        const data = await VastuService.find().sort({ order: 1, createdAt: -1 });
        res.json(data);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getActive = async (req, res) => {
    try {
        const data = await VastuService.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        res.json(data);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.create = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Image required' });
        const data = { ...req.body };
        if (data.features) data.features = parseArr(data.features);
        if (data.benefits) data.benefits = parseArr(data.benefits);
        data.popular = req.body.popular === 'true' || req.body.popular === true;
        data.isActive = req.body.isActive !== 'false' && req.body.isActive !== false;
        data.order = Number(req.body.order) || 0;
        const doc = await VastuService.create({
            ...data,
            imageUrl: `/uploads/vastu/${req.file.filename}`,
        });
        res.status(201).json({ message: 'Created', service: doc });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.update = async (req, res) => {
    try {
        const doc = await VastuService.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Not found' });

        const fields = ['title', 'description', 'price', 'iconName', 'gradient', 'order'];
        fields.forEach(f => { if (req.body[f] !== undefined) doc[f] = req.body[f]; });

        if (req.body.features !== undefined) doc.features = parseArr(req.body.features);
        if (req.body.benefits !== undefined) doc.benefits = parseArr(req.body.benefits);
        if (req.body.popular !== undefined) doc.popular = req.body.popular === 'true' || req.body.popular === true;
        if (req.body.isActive !== undefined) doc.isActive = req.body.isActive !== 'false' && req.body.isActive !== false;

        if (req.file) {
            if (doc.imageUrl) {
                const p = path.join(__dirname, '..', doc.imageUrl);
                if (fs.existsSync(p)) fs.unlinkSync(p);
            }
            doc.imageUrl = `/uploads/vastu/${req.file.filename}`;
        }

        await doc.save();
        res.json({ message: 'Updated', service: doc });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.remove = async (req, res) => {
    try {
        const doc = await VastuService.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Not found' });
        if (doc.imageUrl) { const p = path.join(__dirname, '..', doc.imageUrl); if (fs.existsSync(p)) fs.unlinkSync(p); }
        await VastuService.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.seed = async (req, res) => {
    try {
        await VastuService.deleteMany();
        await VastuService.insertMany([
            { iconName: 'Home', title: 'Home Vastu', description: 'Transform your home into a sanctuary of positive energy and prosperity', features: ['Direction Analysis', 'Room Placement', 'Energy Flow', 'Remedies'], benefits: ['Harmony', 'Prosperity', 'Health'], price: '₹2,999', popular: true, imageUrl: '/uploads/vastu/HomeVastu.webp', gradient: 'from-saffron to-orange-600', isActive: true, order: 1 },
            { iconName: 'Building2', title: 'Office Vastu', description: 'Enhance productivity and business growth with optimal office energy', features: ['Desk Placement', 'Cash Counter', 'Staff Seating', 'Success Zone'], benefits: ['Growth', 'Wealth', 'Success'], price: '₹4,999', popular: true, imageUrl: '/uploads/vastu/OfficeVastu.webp', gradient: 'from-maroon to-red-800', isActive: true, order: 2 },
            { iconName: 'Gem', title: 'Gemstones', description: 'Certified gemstones to strengthen planetary positions and bring luck', features: ['Personalized Selection', 'Certified Stones', 'Energized', 'Wearing Guide'], benefits: ['Protection', 'Fortune', 'Power'], price: 'From ₹1,500', popular: false, imageUrl: '/uploads/vastu/Gemstones.webp', gradient: 'from-pink-600 to-rose-700', isActive: true, order: 3 },
        ]);
        res.status(201).json({ message: 'Seeded!' });
    } catch (e) { res.status(500).json({ message: e.message }); }
};
