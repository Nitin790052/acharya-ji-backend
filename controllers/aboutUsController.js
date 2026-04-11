const AboutUs = require('../models/AboutUs');
const fs = require('fs');
const path = require('path');

const parseFeatures = (raw) => {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.filter(Boolean);
    try { return JSON.parse(raw); } catch { return raw.split('\n').filter(Boolean); }
};

exports.getAllAboutUs = async (req, res) => {
    try {
        const records = await AboutUs.find().sort({ createdAt: -1 });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving about us data' });
    }
};

exports.getActiveAboutUs = async (req, res) => {
    try {
        const record = await AboutUs.findOne({ isActive: true });
        res.status(200).json(record || null);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving active about us data' });
    }
};

exports.createAboutUs = async (req, res) => {
    try {
        const { badge, title, highlightTitle, description1, description2, features, buttonText, buttonLink, button2Text, button2Link } = req.body;
        const newRecord = new AboutUs({
            badge, title, highlightTitle, description1, description2,
            features: parseFeatures(features),
            buttonText, buttonLink, button2Text, button2Link,
            imageUrl: req.file ? `/uploads/about/${req.file.filename}` : ''
        });
        await newRecord.save();
        res.status(201).json({ message: 'About Us record created', data: newRecord });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating about us record' });
    }
};

exports.updateAboutUs = async (req, res) => {
    try {
        const { id } = req.params;
        const { badge, title, highlightTitle, description1, description2, features, buttonText, buttonLink, button2Text, button2Link } = req.body;

        const existing = await AboutUs.findById(id);
        if (!existing) return res.status(404).json({ message: 'Record not found' });

        if (req.file) {
            if (existing.imageUrl) {
                const oldImagePath = path.join(__dirname, '..', existing.imageUrl);
                if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
            }
            existing.imageUrl = `/uploads/about/${req.file.filename}`;
        }

        if (badge !== undefined) existing.badge = badge;
        if (title !== undefined) existing.title = title;
        if (highlightTitle !== undefined) existing.highlightTitle = highlightTitle;
        if (description1 !== undefined) existing.description1 = description1;
        if (description2 !== undefined) existing.description2 = description2;
        if (features !== undefined) existing.features = parseFeatures(features);
        if (buttonText !== undefined) existing.buttonText = buttonText;
        if (buttonLink !== undefined) existing.buttonLink = buttonLink;
        if (button2Text !== undefined) existing.button2Text = button2Text;
        if (button2Link !== undefined) existing.button2Link = button2Link;

        await existing.save();
        res.status(200).json({ message: 'About Us updated', data: existing });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating about us record' });
    }
};

exports.activateAboutUs = async (req, res) => {
    console.log('Toggling active status for record:', req.params.id);
    try {
        const { id } = req.params;
        const currentRecord = await AboutUs.findById(id);
        if (!currentRecord) return res.status(404).json({ message: 'Record not found' });

        const newActiveStatus = !currentRecord.isActive;

        // If we are setting to true, deactivate others.
        if (newActiveStatus) {
            await AboutUs.updateMany({}, { isActive: false });
        }

        currentRecord.isActive = newActiveStatus;
        await currentRecord.save();

        console.log(`Record ${id} is now ${newActiveStatus ? 'Active' : 'Inactive'}`);
        res.status(200).json({ message: `Record set to ${newActiveStatus ? 'Active' : 'Inactive'}`, data: currentRecord });
    } catch (error) {
        console.error('Toggle Error:', error);
        res.status(500).json({ message: 'Error toggling record status' });
    }
};

exports.deleteAboutUs = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await AboutUs.findById(id);
        if (!record) return res.status(404).json({ message: 'Record not found' });

        if (record.imageUrl) {
            const imgPath = path.join(__dirname, '..', record.imageUrl);
            if (fs.existsSync(imgPath)) {
                try { fs.unlinkSync(imgPath); } catch (e) { console.error('Image delete error:', e); }
            }
        }
        await AboutUs.findByIdAndDelete(id);
        res.status(200).json({ message: 'About Us record deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting record' });
    }
};
