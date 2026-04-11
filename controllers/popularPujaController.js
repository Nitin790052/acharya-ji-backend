const PopularPuja = require('../models/PopularPuja');
const PopularPujaSettings = require('../models/PopularPujaSettings');
const fs = require('fs');
const path = require('path');

exports.getSettings = async (req, res) => {
    try {
        let settings = await PopularPujaSettings.findOne();
        if (!settings) {
            settings = await PopularPujaSettings.create({});
        }
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching settings', error: error.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        let settings = await PopularPujaSettings.findOne();
        if (!settings) {
            settings = await PopularPujaSettings.create(req.body);
        } else {
            settings = await PopularPujaSettings.findOneAndUpdate({}, req.body, { new: true });
        }
        res.status(200).json({ message: 'Settings updated successfully', settings });
    } catch (error) {
        res.status(500).json({ message: 'Error updating settings', error: error.message });
    }
};

exports.getAllPujas = async (req, res) => {
    try {
        const pujas = await PopularPuja.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json(pujas);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching popular pujas', error: error.message });
    }
};

exports.getActivePujas = async (req, res) => {
    try {
        const pujas = await PopularPuja.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        res.status(200).json(pujas);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching active popular pujas', error: error.message });
    }
};

exports.createPuja = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const imageUrl = `/uploads/popularServices/${req.file.filename}`;
        const pujaData = { ...req.body, imageUrl };

        if (pujaData.popular !== undefined) {
            pujaData.popular = pujaData.popular === 'true' || pujaData.popular === true;
        }
        if (pujaData.isActive !== undefined) {
            pujaData.isActive = pujaData.isActive === 'true' || pujaData.isActive === true;
        }

        const newPuja = new PopularPuja(pujaData);
        await newPuja.save();
        res.status(201).json({ message: 'Popular Puja created successfully', puja: newPuja });
    } catch (error) {
        res.status(500).json({ message: 'Error creating popular puja', error: error.message });
    }
};

exports.updatePuja = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        if (updates.popular !== undefined) {
            updates.popular = updates.popular === 'true' || updates.popular === true;
        }
        if (updates.isActive !== undefined) {
            updates.isActive = updates.isActive === 'true' || updates.isActive === true;
        }

        if (req.file) {
            updates.imageUrl = `/uploads/popularServices/${req.file.filename}`;
            
            const existingPuja = await PopularPuja.findById(id);
            if (existingPuja && existingPuja.imageUrl) {
                const oldImagePath = path.join(__dirname, '..', existingPuja.imageUrl);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const updatedPuja = await PopularPuja.findByIdAndUpdate(id, updates, { new: true });
        
        if (!updatedPuja) {
            return res.status(404).json({ message: 'Popular Puja not found' });
        }

        res.status(200).json({ message: 'Popular Puja updated successfully', puja: updatedPuja });
    } catch (error) {
        res.status(500).json({ message: 'Error updating popular puja', error: error.message });
    }
};

exports.deletePuja = async (req, res) => {
    try {
        const { id } = req.params;
        const puja = await PopularPuja.findById(id);
        
        if (!puja) {
            return res.status(404).json({ message: 'Popular Puja not found' });
        }

        if (puja.imageUrl) {
            const imagePath = path.join(__dirname, '..', puja.imageUrl);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await PopularPuja.findByIdAndDelete(id);
        res.status(200).json({ message: 'Popular Puja deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting popular puja', error: error.message });
    }
};

exports.seedPujas = async (req, res) => {
    // Initial data matching the user's frontend code
    const initialData = [
        { name: 'Griha Pravesh', iconName: 'Home', description: 'Invoke divine blessings for your new home', duration: '2-3 hrs', price: '₹5,100', popular: true, imageUrl: '/uploads/popularServices/placeholder.jpg', isActive: true, order: 1 },
        { name: 'Satyanarayan Katha', iconName: 'Book', description: 'Sacred storytelling for prosperity and harmony', duration: '1.5-2 hrs', price: '₹3,100', popular: true, imageUrl: '/uploads/popularServices/placeholder.jpg', isActive: true, order: 2 },
        { name: 'Rudrabhishek', iconName: 'Droplets', description: 'Sacred bathing ritual of Lord Shiva for peace', duration: '1-1.5 hrs', price: '₹2,100', popular: true, imageUrl: '/uploads/popularServices/placeholder.jpg', isActive: true, order: 3 },
        { name: 'Navgraha Shanti', iconName: 'Star', description: 'Planetary peace ritual to harmonize influences', duration: '2-2.5 hrs', price: '₹4,100', popular: false, imageUrl: '/uploads/popularServices/placeholder.jpg', isActive: true, order: 4 },
        { name: 'Pitru Dosh Puja', iconName: 'Users', description: 'Ancestral peace ritual for family harmony', duration: '2-3 hrs', price: '₹5,500', popular: false, imageUrl: '/uploads/popularServices/placeholder.jpg', isActive: true, order: 5 },
        { name: 'Lakshmi Puja', iconName: 'Sparkles', description: 'Invoke goddess of wealth for abundance', duration: '1.5-2 hrs', price: '₹3,500', popular: false, imageUrl: '/uploads/popularServices/placeholder.jpg', isActive: true, order: 6 },
    ];

    try {
        await PopularPuja.deleteMany();
        await PopularPuja.insertMany(initialData);
        res.status(201).json({ message: 'Popular Pujas seeded successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
