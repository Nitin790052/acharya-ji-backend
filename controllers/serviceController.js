const Service = require('../models/Service');
const fs = require('fs');
const path = require('path');

// @desc    Get all services
// @route   GET /api/services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services' });
    }
};

// @desc    Get active services (separated by category)
// @route   GET /api/services/active
exports.getActiveServices = async (req, res) => {
    try {
        const services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        const coreServices = services.filter(s => s.category === 'core');
        const detailedServices = services.filter(s => s.category === 'detailed');
        res.status(200).json({ coreServices, detailedServices });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching active services' });
    }
};

// @desc    Create new service
// @route   POST /api/services
exports.createService = async (req, res) => {
    try {
        const imageUrl = req.file ? `/uploads/services/${req.file.filename}` : '';
        const { title, description, href, category, icon, order } = req.body;

        const service = await Service.create({
            title,
            description,
            href,
            category,
            icon: icon || 'Sparkles',
            imageUrl,
            order: parseInt(order) || 0,
            isActive: true
        });

        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error creating service' });
    }
};

// @desc    Update service
// @route   PUT /api/services/:id
exports.updateService = async (req, res) => {
    try {
        const { title, description, href, category, icon, order, isActive } = req.body;
        const service = await Service.findById(req.params.id);

        if (!service) return res.status(404).json({ message: 'Service not found' });

        let imageUrl = service.imageUrl;
        if (req.file) {
            // Delete old image
            if (service.imageUrl) {
                const oldPath = path.join(__dirname, '..', service.imageUrl);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            imageUrl = `/uploads/services/${req.file.filename}`;
        }

        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                href,
                category,
                icon,
                imageUrl,
                order: parseInt(order) || 0,
                isActive: isActive === 'true' || isActive === true
            },
            { new: true }
        );

        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ message: 'Error updating service' });
    }
};

// @desc    Toggle active status
// @route   POST /api/services/toggle-active/:id
exports.toggleActiveService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });

        service.isActive = !service.isActive;
        await service.save();

        res.status(200).json({ message: `Service ${service.isActive ? 'activated' : 'deactivated'}`, data: service });
    } catch (error) {
        res.status(500).json({ message: 'Error toggling service status' });
    }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });

        if (service.imageUrl) {
            const oldPath = path.join(__dirname, '..', service.imageUrl);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Service deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service' });
    }
};

// @desc    Seed services
// @route   POST /api/services/seed
exports.seedServices = async (req, res) => {
    try {
        await Service.deleteMany({}); // Optional: clear existing
        
        const sampleServices = [
            // Core Services
            { title: 'Puja Services', description: 'Online & Offline Puja', href: '/puja', icon: 'Flame', category: 'core', order: 1, isActive: true, imageUrl: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=800' },
            { title: 'Astrology Consultation', description: 'Expert Astrologers', href: '/astrology', icon: 'Moon', category: 'core', order: 2, isActive: true, imageUrl: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=800' },
            { title: 'Kundli Services', description: 'Birth Chart Analysis', href: '/kundli', icon: 'ScrollText', category: 'core', order: 3, isActive: true, imageUrl: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=800' },
            { title: 'Vastu & Remedies', description: 'Space Harmonization', href: '/vastu', icon: 'Shield', category: 'core', order: 4, isActive: true, imageUrl: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=800' },
            { title: 'Healing & Spiritual', description: 'Energy Cleansing', href: '/spiritual', icon: 'Leaf', category: 'core', order: 5, isActive: true, imageUrl: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=800' },
            { title: 'Shop', description: 'Samagri & Gemstones', href: '/shop', icon: 'ShoppingCart', category: 'core', order: 6, isActive: true, imageUrl: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=800' },

            // Detailed Services
            { title: 'Online Puja', description: 'Live virtual ceremonies conducted by experienced priests from sacred locations.', href: '/puja/online', icon: 'Video', category: 'detailed', order: 1, isActive: true, imageUrl: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=800' },
            { title: 'Home Visit Puja', description: 'Authentic rituals performed at your home by our certified pandits.', href: '/puja/offline', icon: 'Home', category: 'detailed', order: 2, isActive: true, imageUrl: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=800' },
            { title: 'Special Anushthan', description: 'Elaborate multi-day ceremonies for major life events and wishes.', href: '/puja/anushthan', icon: 'Star', category: 'detailed', order: 3, isActive: true, imageUrl: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=800' },
            { title: 'Puja Samagri', description: 'Premium quality puja items sourced from authentic suppliers.', href: '/samagri/essentials', icon: 'Package', category: 'detailed', order: 4, isActive: true, imageUrl: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=800' },
            { title: 'Prasad Delivery', description: 'Sacred offerings delivered fresh to your doorstep from temples.', href: '/products/prasad', icon: 'Truck', category: 'detailed', order: 5, isActive: true, imageUrl: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=800' },
            { title: 'Festival Specials', description: 'Curated packages for festivals with all essential items.', href: '/products/festival', icon: 'Gift', category: 'detailed', order: 6, isActive: true, imageUrl: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=800' }
        ];

        const createdServices = await Service.insertMany(sampleServices);
        res.status(201).json({ message: 'Services seeded successfully', count: createdServices.length });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding services', error: error.message });
    }
};
