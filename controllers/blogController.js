const Blog = require('../models/Blog');
const BlogSettings = require('../models/BlogSettings');
const fs = require('fs');
const path = require('path');

exports.getSettings = async (req, res) => {
    try {
        let s = await BlogSettings.findOne();
        if (!s) s = await BlogSettings.create({});
        res.json(s);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.updateSettings = async (req, res) => {
    try {
        let s = await BlogSettings.findOne();
        if (!s) s = await BlogSettings.create(req.body);
        else s = await BlogSettings.findOneAndUpdate({}, req.body, { new: true });
        res.json({ message: 'Updated', settings: s });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getAll = async (req, res) => {
    try {
        const data = await Blog.find().sort({ order: 1, createdAt: -1 });
        res.json(data);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getActive = async (req, res) => {
    try {
        const data = await Blog.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        res.json(data);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.create = async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.imageUrl = `/uploads/blogs/${req.file.filename}`;
        
        data.rating = Number(req.body.rating) || 4.8;
        data.order = Number(req.body.order) || 0;
        data.isActive = req.body.isActive !== 'false' && req.body.isActive !== false;

        const doc = await Blog.create(data);
        res.status(201).json({ message: 'Created', blog: doc });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.update = async (req, res) => {
    try {
        const doc = await Blog.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Not found' });

        const fields = ['title', 'excerpt', 'category', 'readTime', 'date', 'author', 'url', 'order'];
        fields.forEach(f => { if (req.body[f] !== undefined) doc[f] = req.body[f]; });

        if (req.body.rating !== undefined) doc.rating = Number(req.body.rating);
        if (req.body.isActive !== undefined) doc.isActive = req.body.isActive !== 'false' && req.body.isActive !== false;

        if (req.file) {
            if (doc.imageUrl && doc.imageUrl.startsWith('/uploads/')) {
                const p = path.join(__dirname, '..', doc.imageUrl);
                if (fs.existsSync(p)) fs.unlinkSync(p);
            }
            doc.imageUrl = `/uploads/blogs/${req.file.filename}`;
        }

        await doc.save();
        res.json({ message: 'Updated', blog: doc });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.remove = async (req, res) => {
    try {
        const doc = await Blog.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Not found' });
        if (doc.imageUrl && doc.imageUrl.startsWith('/uploads/')) {
            const p = path.join(__dirname, '..', doc.imageUrl);
            if (fs.existsSync(p)) fs.unlinkSync(p);
        }
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.seed = async (req, res) => {
    try {
        await Blog.deleteMany();
        const data = [
            { title: 'Astrology vs Horoscope: Complete Guide', excerpt: 'A comprehensive analysis distinguishing Vedic astrology from Western horoscope predictions with scientific perspectives.', category: 'Astrology Knowledge', readTime: '6 min', date: 'Jan 12, 2026', author: 'Dr. Priya Mishra', imageUrl: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=600', url: '/blog/astrology-vs-horoscope', rating: 4.9, order: 1 },
            { title: 'Griha Pravesh Puja: Ultimate Guide', excerpt: 'Step-by-step guide to performing house warming ceremonies with authentic rituals and modern adaptations.', category: 'Puja Masterclass', readTime: '8 min', date: 'Jan 14, 2026', author: 'Acharya Vikram', imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600', url: '/blog/griha-pravesh-puja', rating: 4.8, order: 2 },
            { title: 'Navgraha Shanti: Planetary Harmony', excerpt: 'Deep dive into nine planetary influences and powerful remedies for balancing cosmic energies in daily life.', category: 'Advanced Rituals', readTime: '7 min', date: 'Jan 08, 2026', author: 'Suresh Pandit', imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600', url: '/blog/navgraha-shanti-puja', rating: 4.9, order: 3 },
            { title: 'Vastu Shastra: Modern Applications', excerpt: 'Integrating ancient architectural science with contemporary living spaces for enhanced prosperity and wellbeing.', category: 'Vastu Science', readTime: '9 min', date: 'Jan 05, 2026', author: 'Dr. Ramesh Bose', imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600', url: '/blog/vastu-shastra', rating: 4.7, order: 4 },
            { title: 'Gemstones: Celestial Healing', excerpt: 'Scientific exploration of gemstones and their profound impact on physical, emotional, and spiritual wellbeing.', category: 'Healing Remedies', readTime: '7 min', date: 'Jan 03, 2026', author: 'Meera Patel', imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600', url: '/blog/gemstones-powers', rating: 4.8, order: 5 },
            { title: 'Meditation Techniques: Ancient to Modern', excerpt: 'Blending traditional meditation practices with neuroscience-backed techniques for optimal mental clarity.', category: 'Mind & Spirit', readTime: '5 min', date: 'Jan 18, 2026', author: 'Ankita Reddy', imageUrl: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=600', url: '/blog/meditation-techniques', rating: 4.9, order: 6 }
        ];
        await Blog.insertMany(data);
        res.status(201).json({ message: 'Seeded!' });
    } catch (e) { res.status(500).json({ message: e.message }); }
};
