const UniversalPageContent = require('../models/UniversalPageContent');
const path = require('path');
const fs = require('fs');
const { deleteMedia: cleanupMedia } = require('../utils/mediaHandlers');

/**
 * @desc    Get all universal pages overview
 */
exports.getPagesOverview = async (req, res) => {
    console.log('Fetching Universal Pages Overview...');
    try {
        const pages = await UniversalPageContent.find({}, 'slug category isActive updatedAt metadata.title');
        res.status(200).json({
            success: true,
            count: pages.length,
            data: pages
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get single page by slug
 */
exports.getPageBySlug = async (req, res) => {
    try {
        const page = await UniversalPageContent.findOne({ slug: req.params.slug });
        if (!page) {
            return res.status(404).json({ success: false, message: 'Page not found' });
        }
        res.status(200).json({ success: true, data: page });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Update or create page content
 */
exports.updatePageContent = async (req, res) => {
    try {
        const { slug } = req.params;
        const updateData = req.body;

        let page = await UniversalPageContent.findOneAndUpdate(
            { slug },
            { $set: updateData },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Page architecture updated successfully',
            data: page
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Delete a universal page
 */
exports.deletePage = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = await UniversalPageContent.findOneAndDelete({ slug });
        
        if (!page) {
            return res.status(404).json({ success: false, message: 'Page not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Page removed from existence'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Upload media for universal pages
 */
exports.uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        const imageUrl = req.file.path;
        res.status(200).json({
            success: true,
            imageUrl
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Delete media physical file
 */
exports.deleteMedia = async (req, res) => {
    try {
        const { filePath } = req.body;
        if (!filePath) return res.status(400).json({ success: false, message: 'No path provided' });

        await cleanupMedia(filePath);
        res.status(200).json({ success: true, message: 'Media purged from storage' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
