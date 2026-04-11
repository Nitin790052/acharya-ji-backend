const KundliService = require('../models/KundliService');
const KundliSettings = require('../models/KundliSettings');
const fs = require('fs');
const path = require('path');

const parseArr = (val) => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') return val.split(',').map(s => s.trim()).filter(Boolean);
    return [];
};

exports.getSettings = async (req, res) => {
    try {
        let s = await KundliSettings.findOne();
        if (!s) s = await KundliSettings.create({});
        res.json(s);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.updateSettings = async (req, res) => {
    try {
        let s = await KundliSettings.findOne();
        if (!s) s = await KundliSettings.create(req.body);
        else s = await KundliSettings.findOneAndUpdate({}, req.body, { new: true });
        res.json({ message: 'Updated', settings: s });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getAll = async (req, res) => {
    try {
        const data = await KundliService.find().sort({ order: 1, createdAt: -1 });
        res.json(data);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getActive = async (req, res) => {
    try {
        const data = await KundliService.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        res.json(data);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.create = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Image required' });
        const data = { ...req.body };
        if (data.features) data.features = parseArr(data.features);
        data.popular = req.body.popular === 'true' || req.body.popular === true;
        data.isActive = req.body.isActive !== 'false' && req.body.isActive !== false;
        data.order = Number(req.body.order) || 0;
        const doc = await KundliService.create({
            ...data,
            imageUrl: `/uploads/kundli/${req.file.filename}`,
        });
        res.status(201).json({ message: 'Created', service: doc });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.update = async (req, res) => {
    try {
        const doc = await KundliService.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Not found' });

        const fields = ['title', 'description', 'price', 'cta', 'iconName', 'gradient', 'order'];
        fields.forEach(f => { if (req.body[f] !== undefined) doc[f] = req.body[f]; });

        if (req.body.features !== undefined) doc.features = parseArr(req.body.features);
        if (req.body.popular !== undefined) doc.popular = req.body.popular === 'true' || req.body.popular === true;
        if (req.body.isActive !== undefined) doc.isActive = req.body.isActive !== 'false' && req.body.isActive !== false;

        if (req.file) {
            if (doc.imageUrl) {
                const p = path.join(__dirname, '..', doc.imageUrl);
                if (fs.existsSync(p)) fs.unlinkSync(p);
            }
            doc.imageUrl = `/uploads/kundli/${req.file.filename}`;
        }

        await doc.save();
        res.json({ message: 'Updated', service: doc });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.remove = async (req, res) => {
    try {
        const doc = await KundliService.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Not found' });
        if (doc.imageUrl) { const p = path.join(__dirname, '..', doc.imageUrl); if (fs.existsSync(p)) fs.unlinkSync(p); }
        await KundliService.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.seed = async (req, res) => {
    try {
        await KundliService.deleteMany();
        await KundliService.insertMany([
            { iconName: 'Book', title: 'Get Free Kundli', description: 'Complete birth chart analysis with detailed planetary positions', features: ['Detailed Birth Chart', 'Planetary Positions', 'Dasha Predictions', 'Life Insights'], price: 'FREE', cta: 'Generate Free Kundli', popular: true, imageUrl: '/uploads/kundli/GetFreeKundli.webp', gradient: 'from-saffron to-orange-600', isActive: true, order: 1 },
            { iconName: 'Heart', title: 'Kundli Matching', description: 'Check compatibility for marriage with detailed Guna Milan analysis', features: ['36 Gunas Analysis', 'Manglik Check', 'Compatibility Score', 'Marriage Timing'], price: '₹500', cta: 'Match Kundli Now', popular: true, imageUrl: '/uploads/kundli/KundliMatching.webp', gradient: 'from-maroon to-red-700', isActive: true, order: 2 },
            { iconName: 'AlertCircle', title: 'Manglik Dosh Check', description: 'Identify Manglik Dosha and get personalized remedies', features: ['Manglik Analysis', 'Dosha Strength', 'Remedy Solutions', 'Expert Guidance'], price: '₹299', cta: 'Check Manglik Dosh', popular: false, imageUrl: '/uploads/kundli/ManglikDoshCheck.webp', gradient: 'from-red-600 to-red-800', isActive: true, order: 3 },
        ]);
        res.status(201).json({ message: 'Seeded!' });
    } catch (e) { res.status(500).json({ message: e.message }); }
};
