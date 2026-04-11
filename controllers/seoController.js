const PageSEO = require('../models/PageSEO');

// Get all SEO configs
exports.getAllSEOConfigs = async (req, res) => {
    try {
        const configs = await PageSEO.find();
        res.status(200).json(configs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get SEO config by page name
exports.getSEOByPageName = async (req, res) => {
    try {
        const { pageName } = req.params;
        const config = await PageSEO.findOne({ pageName });
        if (!config) {
            return res.status(200).json(null); // Return null if none exists yet
        }
        res.status(200).json(config);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create or update SEO config
exports.updatePageSEO = async (req, res) => {
    try {
        const { pageName, title, description, keywords, canonical, ogImage, ogType, structuredData } = req.body;
        
        const config = await PageSEO.findOneAndUpdate(
            { pageName },
            {
                pageName,
                title,
                description,
                keywords,
                canonical,
                ogImage,
                ogType,
                structuredData
            },
            { new: true, upsert: true }
        );
        
        res.status(201).json(config);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete SEO config
exports.deletePageSEO = async (req, res) => {
    try {
        const { id } = req.params;
        await PageSEO.findByIdAndDelete(id);
        res.status(200).json({ message: 'SEO config deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
