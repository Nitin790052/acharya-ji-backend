const HeroBanner = require('../models/HeroBanner');
const fs = require('fs');
const path = require('path');

exports.getAllBanners = async (req, res) => {
    try {
        const banners = await HeroBanner.find().sort({ createdAt: -1 });
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching banners', error: error.message });
    }
};

exports.getActiveBanners = async (req, res) => {
    try {
        const banners = await HeroBanner.find({ isActive: true }).sort({ createdAt: -1 });
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching active banners', error: error.message });
    }
};

exports.createBanner = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const imageUrl = `/uploads/carousels/${req.file.filename}`;
        const bannerData = { ...req.body, imageUrl };

        // Handle buttons array if passed as JSON string
        if (typeof bannerData.buttons === 'string') {
            try {
                bannerData.buttons = JSON.parse(bannerData.buttons);
            } catch (e) {
                bannerData.buttons = [];
            }
        }

        // Ensure proper boolean conversion for isActive
        if (bannerData.isActive !== undefined) {
            bannerData.isActive = bannerData.isActive === 'true' || bannerData.isActive === true;
        }

        const newBanner = new HeroBanner(bannerData);
        await newBanner.save();
        res.status(201).json({ message: 'Banner created successfully', banner: newBanner });
    } catch (error) {
        res.status(500).json({ message: 'Error creating banner', error: error.message });
    }
};

exports.updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        // Handle buttons array if passed as JSON string
        if (typeof updates.buttons === 'string') {
            try {
                updates.buttons = JSON.parse(updates.buttons);
            } catch (e) {
                updates.buttons = [];
            }
        }

        if (updates.isActive !== undefined) {
            updates.isActive = updates.isActive === 'true' || updates.isActive === true;
        }

        if (req.file) {
            updates.imageUrl = `/uploads/carousels/${req.file.filename}`;

            // Try to delete old image
            const existingBanner = await HeroBanner.findById(id);
            if (existingBanner && existingBanner.imageUrl) {
                const oldImagePath = path.join(__dirname, '..', existingBanner.imageUrl);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const updatedBanner = await HeroBanner.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedBanner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        res.status(200).json({ message: 'Banner updated successfully', banner: updatedBanner });
    } catch (error) {
        res.status(500).json({ message: 'Error updating banner', error: error.message });
    }
};

exports.deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await HeroBanner.findById(id);

        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        if (banner.imageUrl) {
            const imagePath = path.join(__dirname, '..', banner.imageUrl);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await HeroBanner.findByIdAndDelete(id);
        res.status(200).json({ message: 'Banner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting banner', error: error.message });
    }
};

exports.seedBanners = async (req, res) => {
    try {
        await HeroBanner.deleteMany();
        const sampleBanners = [
            {
                badge: 'AUTHENTIC VEDIC SERVICES',
                titleHighlight1: 'Experience',
                titleHighlight2: 'Divine',
                titleHighlight3: 'Blessings',
                titleEnd: 'At Your Doorstep',
                subtitle: 'Connect with sacred traditions through authentic rituals, expert consultations, and premium spiritual essentials delivered with devotion.',
                linkText: 'Explore Services',
                linkUrl: '/services',
                imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200',
                pagePath: '/',
                isActive: true
            },
            {
                badge: 'EXPERT GUIDANCE',
                titleHighlight1: 'Unlock',
                titleHighlight2: 'Your',
                titleHighlight3: 'Destiny',
                titleEnd: 'With Experts',
                subtitle: 'Get personalized astrology consultations and deep insights into your life path with our certified experts.',
                linkText: 'Consult Now',
                linkUrl: '/astrology',
                imageUrl: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=1200',
                pagePath: '/astrology',
                isActive: true
            },
            {
                badge: 'SACRED RITUALS',
                titleHighlight1: 'Book',
                titleHighlight2: 'Authentic',
                titleHighlight3: 'Pujas',
                titleEnd: 'Online',
                subtitle: 'Experience powerful Vedic ceremonies performed by experienced priests from the comfort of your home.',
                linkText: 'Book Puja',
                linkUrl: '/puja',
                imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200',
                pagePath: '/puja',
                isActive: true
            },
            {
                badge: 'DIVINE SERVICES HUB',
                titleHighlight1: 'Explore Sacred',
                titleHighlight2: 'Spiritual',
                titleHighlight3: 'Insights',
                titleEnd: '',
                subtitle: 'Authentic insights on Puja, Astrology & Vedic traditions curated for your spiritual growth.',
                buttons: [{ text: 'Read Latest', link: '/blog' }],
                imageUrl: 'https://images.unsplash.com/photo-1490730141103-6ca27d92471?w=1200',
                pagePath: '/blog',
                isActive: true
            }
        ];
        await HeroBanner.insertMany(sampleBanners);
        res.status(201).json({ message: 'Hero Banners seeded successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding banners', error: error.message });
    }
};
