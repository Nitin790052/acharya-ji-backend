const Gallery = require('../models/Gallery');
const GallerySettings = require('../models/GallerySettings');
const fs = require('fs');
const path = require('path');

// Get all gallery items
exports.getAllGallery = async (req, res) => {
    try {
        const items = await Gallery.find().sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching gallery', error: error.message });
    }
};

// Get gallery by category
exports.getGalleryByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const items = await Gallery.find({ category, isActive: true }).sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching gallery by category', error: error.message });
    }
};

// Get unique categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Gallery.distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

// Create gallery item
exports.createGallery = async (req, res) => {
    try {
        const data = { ...req.body };

        // Parse tags if sent as string
        if (typeof data.tags === 'string') {
            data.tags = data.tags.split(',').map(t => t.trim()).filter(Boolean);
        }

        // Check for duplicate item (same title, category, and type)
        const duplicate = await Gallery.findOne({ 
            title: { $regex: new RegExp(`^${data.title}$`, 'i') }, 
            category: data.category, 
            type: data.type 
        });

        if (duplicate) {
            // Delete uploaded files if any, to avoid orphan files
            if (req.files) {
                if (req.files.image && req.files.image[0]) {
                    fs.unlinkSync(req.files.image[0].path);
                }
                if (req.files.video && req.files.video[0]) {
                    fs.unlinkSync(req.files.video[0].path);
                }
            }
            return res.status(400).json({ message: 'An item with this exact title, category, and Media Type already exists.' });
        }

        if (req.files) {
            if (req.files.image && req.files.image[0]) {
                data.image = `/uploads/gallery/${req.files.image[0].filename}`;
            }
            if (req.files.video && req.files.video[0]) {
                data.video = `/uploads/gallery/${req.files.video[0].filename}`;
                data.videoLink = ''; // Clear link when file is uploaded
            }
        }

        // If videoLink is provided, clear any video file path
        if (data.videoLink) {
            data.video = '';
        }

        const item = new Gallery(data);
        await item.save();
        res.status(201).json({ message: 'Gallery item created', data: item });
    } catch (error) {
        res.status(500).json({ message: 'Error creating gallery item', error: error.message });
    }
};

// Update gallery item
exports.updateGallery = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        // Parse tags if sent as string
        if (typeof updates.tags === 'string') {
            updates.tags = updates.tags.split(',').map(t => t.trim()).filter(Boolean);
        }

        const existing = await Gallery.findById(id);
        if (!existing) return res.status(404).json({ message: 'Gallery item not found' });

        // Check for duplicate item when updating (same title, category, and type, but excluding the current item)
        const duplicate = await Gallery.findOne({ 
            _id: { $ne: id },
            title: { $regex: new RegExp(`^${updates.title || existing.title}$`, 'i') }, 
            category: updates.category || existing.category, 
            type: updates.type || existing.type 
        });

        if (duplicate) {
            // Delete newly uploaded files if any
            if (req.files) {
                if (req.files.image && req.files.image[0]) {
                    fs.unlinkSync(req.files.image[0].path);
                }
                if (req.files.video && req.files.video[0]) {
                    fs.unlinkSync(req.files.video[0].path);
                }
            }
            return res.status(400).json({ message: 'An item with this exact title, category, and Media Type already exists.' });
        }

        if (req.files) {
            if (req.files.image && req.files.image[0]) {
                updates.image = `/uploads/gallery/${req.files.image[0].filename}`;
                if (existing.image && existing.image.startsWith('/uploads/')) {
                    const oldPath = path.join(__dirname, '..', existing.image);
                    if (fs.existsSync(oldPath)) {
                        try { fs.unlinkSync(oldPath); } catch (e) {}
                    }
                }
            }
            if (req.files.video && req.files.video[0]) {
                updates.video = `/uploads/gallery/${req.files.video[0].filename}`;
                updates.videoLink = ''; // Clear link when file is uploaded
                if (existing.video && existing.video.startsWith('/uploads/')) {
                    const oldPath = path.join(__dirname, '..', existing.video);
                    if (fs.existsSync(oldPath)) {
                        try { fs.unlinkSync(oldPath); } catch (e) {}
                    }
                }
            }
        }

        // If videoLink is provided, clear any video file path
        if (updates.videoLink) {
            if (existing.video && existing.video.startsWith('/uploads/')) {
                const oldPath = path.join(__dirname, '..', existing.video);
                if (fs.existsSync(oldPath)) {
                    try { fs.unlinkSync(oldPath); } catch (e) {}
                }
            }
            updates.video = '';
        }

        const updated = await Gallery.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({ message: 'Gallery item updated', data: updated });
    } catch (error) {
        res.status(500).json({ message: 'Error updating gallery item', error: error.message });
    }
};

// Delete gallery item
exports.deleteGallery = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Gallery.findById(id);
        if (!item) return res.status(404).json({ message: 'Gallery item not found' });

        if (item.image && item.image.startsWith('/uploads/')) {
            const filePath = path.join(__dirname, '..', item.image);
            if (fs.existsSync(filePath)) {
                try { fs.unlinkSync(filePath); } catch (e) {}
            }
        }
        if (item.video && item.video.startsWith('/uploads/')) {
            const filePath = path.join(__dirname, '..', item.video);
            if (fs.existsSync(filePath)) {
                try { fs.unlinkSync(filePath); } catch (e) {}
            }
        }

        await Gallery.findByIdAndDelete(id);
        res.status(200).json({ message: 'Gallery item deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting gallery item', error: error.message });
    }
};

// Seed gallery data
exports.seedGallery = async (req, res) => {
    try {
        const seedData = [
            { title: 'Griha Pravesh Puja', caption: 'Complete Griha Pravesh ceremony with all Vedic rituals', category: 'Puja Rituals', type: 'image', location: 'South Delhi', date: 'Jan 15, 2026', tags: ['griha pravesh', 'new home', 'puja'] },
            { title: 'Satyanarayan Katha', caption: 'Traditional Satyanarayan Puja performed with pure devotion', category: 'Puja Rituals', type: 'image', location: 'Noida', date: 'Jan 12, 2026', tags: ['satyanarayan', 'katha'] },
            { title: 'Rudrabhishek Puja Live', caption: 'Powerful Rudrabhishek ceremony for Lord Shiva', category: 'Puja Rituals', type: 'video', location: 'Gurugram', date: 'Jan 10, 2026', tags: ['rudrabhishek', 'shiva'] },
            { title: 'Family Puja at Home', caption: 'Acharya ji conducting puja with entire family', category: 'Home Puja', type: 'image', location: 'Dwarka, Delhi', date: 'Jan 14, 2026', tags: ['family puja', 'home'] },
            { title: 'Virtual Satyanarayan Puja', caption: 'Client joining live online puja from USA', category: 'Online Puja', type: 'video', location: 'Online Session', date: 'Jan 13, 2026', tags: ['online puja', 'virtual'] },
            { title: 'Hanuman Temple Puja', caption: 'Special puja performed at ancient Hanuman temple', category: 'Temple Puja', type: 'image', location: 'Connaught Place', date: 'Jan 7, 2026', tags: ['hanuman', 'temple'] },
            { title: 'Diwali Lakshmi Puja', caption: 'Grand Diwali celebration with traditional rituals', category: 'Festival Puja', type: 'video', location: 'Multiple Homes', date: 'Nov 1, 2025', tags: ['diwali', 'lakshmi'] },
            { title: 'Kundli Reading Session', caption: 'Detailed horoscope analysis and guidance', category: 'Astrology Sessions', type: 'image', location: 'Office', date: 'Jan 16, 2026', tags: ['kundli', 'astrology'] },
            { title: 'Home Vastu Inspection', caption: 'Complete vastu analysis of new apartment', category: 'Vastu Visits', type: 'image', location: 'Greater Noida', date: 'Jan 13, 2026', tags: ['vastu', 'home'] },
            { title: 'Reiki Healing Session', caption: 'Energy healing and chakra balancing', category: 'Healing Sessions', type: 'image', location: 'Healing Center', date: 'Jan 15, 2026', tags: ['reiki', 'healing'] },
            { title: 'Happy Client Family', caption: 'After successful Griha Pravesh puja', category: 'Client Moments', type: 'image', location: 'Noida', date: 'Jan 16, 2026', tags: ['client', 'happy'] },
            { title: 'Puja Preparation', caption: 'Arranging samagri before ceremony', category: 'Behind the Scenes', type: 'image', location: 'Office', date: 'Jan 15, 2026', tags: ['preparation', 'samagri'] },
        ];

        await Gallery.deleteMany({});
        await Gallery.insertMany(seedData);
        res.status(200).json({ message: 'Gallery seeded successfully', count: seedData.length });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding gallery', error: error.message });
    }
};

// Get Settings
exports.getSettings = async (req, res) => {
    try {
        let settings = await GallerySettings.findOne();
        if (!settings) {
            settings = await GallerySettings.create({});
        }
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching gallery settings', error: error.message });
    }
};

// Update Settings
exports.updateSettings = async (req, res) => {
    try {
        let settings = await GallerySettings.findOne();
        if (!settings) {
            settings = new GallerySettings();
        }
        
        if (req.body.cta) {
            settings.cta = { ...settings.cta, ...req.body.cta };
        }
        
        await settings.save();
        res.status(200).json({ message: 'Gallery settings updated successfully', data: settings });
    } catch (error) {
        res.status(500).json({ message: 'Error updating gallery settings', error: error.message });
    }
};
