const Navbar = require('../models/Navbar');
const KundliPageContent = require('../models/KundliPageContent');
const AstrologyPageContent = require('../models/AstrologyPageContent');
const VastuPageContent = require('../models/VastuPageContent');
const HealingPageContent = require('../models/HealingPageContent');
const LearningPageContent = require('../models/LearningPageContent');

// Get all navbar items
const getNavbarItems = async (req, res) => {
    try {
        const items = await Navbar.find().sort({ order: 1 }).lean();
        // Dynamically fetch active pages from various modules
        const activeKundliPages = await KundliPageContent.find({ isActive: true }).sort('order').lean();
        const activeAstrologyPages = await AstrologyPageContent.find({ isActive: true }).sort('order').lean();
        const activeVastuPages = await VastuPageContent.find({ isActive: true }).sort('order').lean();
        const activeHealingPages = await HealingPageContent.find({ isActive: true }).sort('createdAt').lean();
        const activeLearningPages = await LearningPageContent.find({ isActive: true }).sort('createdAt').lean();

        const dynamicItems = items.map(item => {

            let dynamicChildren = [];

            // Normalize label for matching
            const label = (item.label || '').trim();

            if (label === 'Kundli') {
                dynamicChildren = activeKundliPages.map(page => ({
                    label: page.pageName,
                    href: `/kundli/${page.pageSlug}`,
                    isDynamic: true
                }));
            } else if (label === 'Astrology Services') {
                dynamicChildren = activeAstrologyPages.map(page => ({
                    label: page.pageName,
                    href: `/astrology/${page.pageSlug}`,
                    isDynamic: true
                }));
            } else if (label === 'Vastu') {
                dynamicChildren = activeVastuPages.map(page => ({
                    label: page.pageName,
                    href: `/vastu/${page.pageSlug}`,
                    isDynamic: true
                }));
            } else if (label === 'Healing') {
                dynamicChildren = activeHealingPages.map(page => ({
                    label: page.pageName,
                    href: `/healing/${page.pageSlug}`,
                    isDynamic: true
                }));
            } else if (label === 'Learn') {
                dynamicChildren = activeLearningPages
                    .filter(page => page.slug) // Must have slug
                    .map(page => ({
                        label: page.pageName,
                        href: `/learn/${page.slug}`,
                        isDynamic: true
                    }));
            }
            if (dynamicChildren.length > 0) {
                // Smart Merge: Update manual children with dynamic hrefs, then append new dynamic ones
                const manualChildren = item.children || [];
                const manualLabels = new Set(manualChildren.map(c => (c.label || '').toLowerCase().trim()));

                const dynamicLabelMap = new Map(dynamicChildren.map(dc => [(dc.label || '').toLowerCase().trim(), dc]));
                const updatedManualChildren = manualChildren.map(mc => {
                    const labelLower = (mc.label || '').toLowerCase().trim();
                    if (labelLower && dynamicLabelMap.has(labelLower)) {
                        // If there's a dynamic slug available, overwrite the placeholder href
                        return { ...mc, href: dynamicLabelMap.get(labelLower).href };
                    }
                    return mc;
                });

                const uniqueDynamic = dynamicChildren.filter(dc => {
                    return !manualLabels.has((dc.label || '').toLowerCase().trim());
                });

                return {
                    ...item,
                    children: [...updatedManualChildren, ...uniqueDynamic]
                };
            }

            return item;
        });

        res.status(200).json(dynamicItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Seed initial data
const seedNavbarItems = async (req, res) => {
    const initialItems = [
        { label: 'Home', href: '/', order: 1 },
        { label: 'About Us', href: '/about', order: 2 },
        {
            label: 'Puja Services',
            type: 'dropdown',
            order: 3,
            children: [
                { label: 'Book Puja', href: '/pujaServices/bookPuja' },
                { label: 'Griha Pravesh Puja', href: '/puja/griha-pravesh-puja' },
                { label: 'Satyanarayan Katha', href: '/puja/satyanarayan-puja' },
                { label: 'Rudrabhishek', href: '/puja/rudrabhishek-puja' },
                { label: 'Navgraha Shanti Puja', href: '/puja/navgraha-shanti-puja' },
                { label: 'Vastu Shanti Puja', href: '/puja/vastu-shanti-puja' },
                { label: 'Marriage / Vivah Puja', href: '/puja/marriage-puja' },
                { label: 'Pitru Dosh Puja', href: '/puja/pitru-dosh-puja' },
                { label: 'Havan & Yagya', href: '/puja/havan-yagya' },
                { label: 'All Puja Services', href: '/pujaServices' }
            ]
        },
        {
            label: 'Astrology Services',
            href: '#',
            type: 'dropdown',
            order: 4,
            children: [
                { label: 'Talk to Astrologer', href: '/astrologer' },
                { label: 'Career Astrology', href: '/career-astrology' },
                { label: 'Marriage Astrology', href: '/marriage-astrology' },
                { label: 'Business Astrology', href: '/business-astrology' },
                { label: 'Health Astrology', href: '/health-astrology' },
                { label: 'Numerology', href: '/numerology' },
                { label: 'Tarot Reading', href: '/tarot-reading' },
                { label: 'Palmistry', href: '/palmistry' },
                { label: 'Gemstone Suggestion', href: '/gemstone-suggestion' }
            ]
        },
        {
            label: 'Kundli',
            href: '#',
            type: 'dropdown',
            order: 5,
            children: [
                { label: 'Get Your Kundli', href: '/kundli' },
                { label: 'Kundli Matching', href: '/kundli/kundli-matching' },
                { label: 'Manglik Dosh Check', href: '/kundli/manglik-dosh-check' },
                { label: 'Kaal Sarp Dosh', href: '/kundli/kaal-sarp-dosh' },
                { label: 'Pitru Dosh', href: '/kundli/pitru-dosh' },
                { label: 'Shani Sade Sati', href: '/kundli/shani-sade-sati' },
                { label: 'Dasha Analysis', href: '/kundli/dasha-analysis' },
                { label: 'Kundli Remedies', href: '/kundli/kundli-remedies' }
            ]
        },
        {
            label: 'Vastu',
            href: '/vastu',
            type: 'dropdown',
            order: 6,
            children: [
                { label: 'Vastu Consultation', href: '/vastu/vastu-consultation' },
                { label: 'Home / Office Vastu', href: '/vastu/home-office-vastu' },
                { label: 'Feng Shui', href: '/vastu/feng-shui' },
                { label: 'Gemstones', href: '/vastu/gemstones' },
                { label: 'Rudraksha', href: '/vastu/rudraksha' },
                { label: 'Yantra', href: '/vastu/yantra' },
                { label: 'Energized Products', href: '/vastu/energized-products' }
            ]
        },
        {
            label: 'Healing',
            href: '/healing',
            type: 'dropdown',
            order: 7,
            children: [
                { label: 'Reiki Healing', href: '/healing/reiki-healing' },
                { label: 'Crystal Healing', href: '/healing/crystal-healing' },
                { label: 'Chakra Balancing', href: '/healing/chakra-balancing' },
                { label: 'Aura Cleansing', href: '/healing/aura-cleansing' },
                { label: 'Meditation Guidance', href: '/healing/meditation-guidance' }
            ]
        },


        {
            label: 'Shop',
            href: '/shop-puja-samagri',
            type: 'dropdown',
            order: 8,
            children: [
                { label: 'Puja Samagri', href: '/shop-puja-samagri' },
                { label: 'Gemstones', href: '/gemstones' },
                { label: 'Yantra', href: '/yantra' }
            ]
        },
        {
            label: 'Learn',
            href: '/learn/astrology',
            type: 'dropdown',
            order: 9,
            children: [
                { label: 'Astrology Courses', href: '/learn/astrology' },
                { label: 'Puja Vidhi Guides', href: '/learn/puja-vidhi' },
                { label: 'Mantra Chanting', href: '/learn/mantra' },
                { label: 'Blogs & Articles', href: '/blog' }
            ]
        },
        { label: 'Career', href: '/career', order: 10 },
        { label: 'Media', href: '/media', order: 11 },
        { label: 'Gallery', href: '/gallery', order: 12 },
        { label: 'Blog', href: '/blog', order: 13 },
        { label: 'Contact', href: '/contact', order: 14 }
    ];

    try {
        await Navbar.deleteMany();
        await Navbar.insertMany(initialItems);
        res.status(201).json({ message: 'Navbar items seeded successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new navbar item
const createNavbarItem = async (req, res) => {
    try {
        const newItem = new Navbar(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update navbar item
const updateNavbarItem = async (req, res) => {
    try {
        const updatedItem = await Navbar.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete navbar item
const deleteNavbarItem = async (req, res) => {
    try {
        await Navbar.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getNavbarItems,
    seedNavbarItems,
    createNavbarItem,
    updateNavbarItem,
    deleteNavbarItem
};
