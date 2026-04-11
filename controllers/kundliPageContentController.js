const KundliPageContent = require('../models/KundliPageContent');

const BASE_TEMPLATE = {
    hero: { badge: 'DIVINE SERVICES', title: 'Unlock Your', highlightedTitle: 'Destiny', subtitle: 'Discover the cosmic blueprint of your life.', imageUrl: '', buttonText: 'Explore Now', buttonLink: '/astrologer' },
    featuresTitle: 'Celestial Benefits',
    features: [
        { title: 'Vedic Accuracy', description: 'Calculations based on precise mathematical algorithms from ancient texts.' },
        { title: 'Personalized Insights', description: 'Detailed analysis of planetary positions at the time of your birth.' },
        { title: 'Expert Guidance', description: 'Connect with seasoned astrologers for deeper clarity.' }
    ],
    formSection: { badge: 'Enter Your Details', title: 'Birth Information', nameLabel: 'Full Name', namePlaceholder: 'Enter your full name', dobLabel: 'Date of Birth', timeLabel: 'Time of Birth', placeLabel: 'Birth Place', placePlaceholder: 'e.g., Delhi, India', buttonText: 'Generate Report' },
    resultsSection: { badge: 'Generated Insights', title: 'Your Analysis Report' },
    doshasSection: { badge: 'Dosha Analysis', title: 'Planetary Influences' },
    remediesSection: { badge: 'Spiritual Solutions', title: 'Divine Remedies' },
    cta: { title: 'Need Deeper Analysis?', subtitle: 'Connect with our master astrologers for deeper clarity on your cosmic blueprint.', buttonText: 'Consult with Expert', buttonLink: '/astrologer' },
    faqsTitle: 'Divine Clarification',
    faqs: [
        { question: 'Is this analysis accurate?', answer: 'Yes, calculations are based on accurate Vedic algorithms.' },
        { question: 'What details are required?', answer: 'Exact Date, Time, and Place of Birth are required for precision.' }
    ],
    activeSections: { features: true, form: true, results: true, doshas: true, remedies: true, cta: true, faqs: true }
};

const SPECIFIC_DATA = {
    'get-your-kundli': {
        pageName: 'Get Your Kundli',
        hero: { badge: 'FREE JANAM KUNDLI', title: 'Unlock Your True', highlightedTitle: 'Celestial Map', subtitle: 'Your Kundli is a map of your soul\'s journey across the stars. Generate your accurate Vedic birth chart instantly.', buttonText: 'Generate Kundli' },
        featuresTitle: 'Why Get Your Kundli?',
        features: [
            { title: 'Life Predictions', description: 'Know about your career, marriage, and health.' },
            { title: 'Dosha Identification', description: 'Check for Manglik, Kaal Sarp and other major planetary flaws.' },
            { title: 'Favorable Timing', description: 'Find the best muhurats for your important life events.' }
        ]
    },
    'kundli-matching': {
        pageName: 'Kundli Matching',
        hero: { badge: 'MARRIAGE COMPATIBILITY', title: 'Accurate Kundli', highlightedTitle: 'Matching', subtitle: 'Check your 36 Guna milaan for a prosperous and happy married life.', buttonText: 'Match Now' },
        featuresTitle: 'Matching Benefits',
        features: [
            { title: 'Ashtakoot System', description: 'Based on the traditional 8-point compatibility test.' },
            { title: 'Nadi & Bhakoot Check', description: 'Deep analysis of critical points for relationship harmony.' },
            { title: 'Manglik Compatibility', description: 'Checking Mars placement balance between both partners.' }
        ],
        formSection: { title: 'Partner Details', buttonText: 'Check Compatibility' }
    },
    'manglik-dosh-check': {
        pageName: 'Manglik Dosh Check',
        hero: { badge: 'DOSHA ANALYSIS', title: 'Deeper Manglik', highlightedTitle: 'Analysis', subtitle: 'Is Mars delaying your marriage? Get a detailed Manglik dosha report and proven remedies.', buttonText: 'Check Dosha' },
        featuresTitle: 'Understanding Mangal Dosh',
        features: [
            { title: 'Placement Analysis', description: 'Checking Mars in 1st, 4th, 7th, 8th or 12th house.' },
            { title: 'Cancellation Rules', description: 'Checking if your dosha gets automatically cancelled.' },
            { title: 'Effective Remedies', description: 'Vedic rituals to pacify the fiery planetary effects.' }
        ]
    },
    'kaal-sarp-dosh': {
        pageName: 'Kaal Sarp Dosh',
        hero: { badge: 'KARMIC OBSTACLES', title: 'Kaal Sarp', highlightedTitle: 'Remedies', subtitle: 'Are all your planets trapped between Rahu and Ketu? Discover and cure Kaal Sarp Dosh.', buttonText: 'Check Kaal Sarp' },
        featuresTitle: 'Signs & Solutions',
        features: [
            { title: '12 Types of Dosh', description: 'Find out which specific Kaal Sarp dosh affects your chart.' },
            { title: 'Life Impact', description: 'Understand delays in success and recurring struggles.' },
            { title: 'Pooja Remedies', description: 'Powerful remedies like Trimbakeshwar pooja guidance.' }
        ]
    },
    'pitru-dosh': {
        pageName: 'Pitru Dosh',
        hero: { badge: 'ANCESTRAL KARMA', title: 'Identify Pitru', highlightedTitle: 'Dosh', subtitle: 'Clear ancestral karmic debts causing blockages in family peace and financial growth.', buttonText: 'Find Pitru Dosh' },
        featuresTitle: 'Ancestral Healing',
        features: [
            { title: 'Karmic Debts', description: 'Analysis of Sun and Rahu conjunctions in the chart.' },
            { title: 'Family Prosperity', description: 'Remedies to restore peace and harmony in the family.' },
            { title: 'Tarpan Guidance', description: 'Learn about Shradh and Tarpan rituals to appease ancestors.' }
        ]
    },
    'shani-sade-sati': {
        pageName: 'Shani Sade Sati',
        hero: { badge: 'SATURN TRANSIT', title: 'Navigate Shani', highlightedTitle: 'Periods', subtitle: 'Prepare for the 7.5 years of Saturn\'s transformational transit with our detailed breakdown.', buttonText: 'Check Sade Sati' },
        featuresTitle: 'Sade Sati Phases',
        features: [
            { title: 'Current Phase', description: 'Know exactly which of the 3 phases you are running.' },
            { title: 'Life Lessons', description: 'Understand what Saturn is trying to teach you right now.' },
            { title: 'Karmic Remedies', description: 'Simple daily rituals to pacify the Lord of Karma.' }
        ]
    },
    'dasha-analysis': {
        pageName: 'Dasha Analysis',
        hero: { badge: 'TIMELINE OF LIFE', title: 'Decode Planetary', highlightedTitle: 'Dasha', subtitle: 'Discover which planet rules your current life period and what results it promises.', buttonText: 'View Dasha' },
        featuresTitle: 'Vimshottari Dasha Insights',
        features: [
            { title: 'Mahadasha & Antardasha', description: 'Detailed timeline of major and minor planetary periods.' },
            { title: 'Event Timing', description: 'Predicting marriage, career jumps, and wealth.' },
            { title: 'Planetary Strength', description: 'How the ruling planet behaves based on your specific chart.' }
        ]
    },
    'kundli-remedies': {
        pageName: 'Kundli Remedies',
        hero: { badge: 'VEDIC HEALING', title: 'Divine Vedic', highlightedTitle: 'Remedies', subtitle: 'Balance your planetary energies through authentic mantras, gemstones, and rituals.', buttonText: 'Explore Remedies' },
        featuresTitle: 'Path to Harmony',
        features: [
            { title: 'Gemstone Suggestion', description: 'Find your lucky stone based on the ascendant.' },
            { title: 'Mantra Jaap', description: 'Specific mantras to strengthen weak beneficial planets.' },
            { title: 'Charity & Rituals', description: 'Simple everyday karmic actions to reduce hardships.' }
        ]
    }
};

const DEFAULT_SLUGS = Object.keys(SPECIFIC_DATA);

// Helper to generate a rich template by deep merging override data with BASE_TEMPLATE
const getTemplate = (slug, name) => {
    const defaultName = name || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const specific = SPECIFIC_DATA[slug] || { pageName: defaultName };
    
    return {
        pageSlug: slug,
        pageName: specific.pageName || defaultName,
        hero: { ...BASE_TEMPLATE.hero, ...specific.hero },
        featuresTitle: specific.featuresTitle || BASE_TEMPLATE.featuresTitle,
        features: specific.features || BASE_TEMPLATE.features,
        formSection: { ...BASE_TEMPLATE.formSection, ...specific.formSection },
        resultsSection: { ...BASE_TEMPLATE.resultsSection, ...specific.resultsSection },
        doshasSection: { ...BASE_TEMPLATE.doshasSection, ...specific.doshasSection },
        remediesSection: { ...BASE_TEMPLATE.remediesSection, ...specific.remediesSection },
        cta: { ...BASE_TEMPLATE.cta, ...specific.cta },
        faqsTitle: specific.faqsTitle || BASE_TEMPLATE.faqsTitle,
        faqs: specific.faqs || BASE_TEMPLATE.faqs,
        activeSections: { ...BASE_TEMPLATE.activeSections, ...specific.activeSections }
    };
};

const kundliPageContentController = {
    getAll: async (req, res) => {
        try {
            const pages = await KundliPageContent.find().sort({ order: 1 });
            res.json(pages);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getBySlug: async (req, res) => {
        try {
            const page = await KundliPageContent.findOne({ pageSlug: req.params.slug });
            if (!page) return res.status(404).json({ message: 'Page not found' });
            res.json(page);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    upsertPage: async (req, res) => {
        try {
            let data = req.body;

            // Handle strings from FormData if necessary
            const jsonFields = ['hero', 'features', 'formSection', 'resultsSection', 'doshasSection', 'remediesSection', 'cta', 'faqs', 'activeSections'];
            jsonFields.forEach(field => {
                if (typeof data[field] === 'string') {
                    try {
                        data[field] = JSON.parse(data[field]);
                    } catch (e) {
                        console.error(`Error parsing ${field}:`, e);
                    }
                }
            });

            // Handle Hero Image Upload
            if (req.files && req.files.heroImage) {
                if (!data.hero) data.hero = {};
                data.hero.imageUrl = `/uploads/kundli/${req.files.heroImage[0].filename}`;
            }

            const page = await KundliPageContent.findOneAndUpdate(
                { pageSlug: data.pageSlug },
                data,
                { upsert: true, runValidators: true, returnDocument: 'after' }
            );
            res.json(page);
        } catch (error) {
            console.error('Upsert Error:', error);
            res.status(400).json({ message: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const deleted = await KundliPageContent.findOneAndDelete({ pageSlug: req.params.id });
            if (!deleted) return res.status(404).json({ message: 'Page not found' });
            res.json({ message: 'Page deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateStatus: async (req, res) => {
        try {
            const page = await KundliPageContent.findOneAndUpdate(
                { pageSlug: req.params.id },
                { isActive: req.body.isActive },
                { new: true }
            );
            res.json(page);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    seedData: async (req, res) => {
        try {
            const { slugs } = req.body; // slugs: [{slug, label}, ...]
            const results = [];

            if (slugs && slugs.length > 0) {
                for (const item of slugs) {
                    const existing = await KundliPageContent.findOne({ pageSlug: item.slug });
                    if (!existing) {
                        const seedItem = getTemplate(item.slug, item.label);
                        await KundliPageContent.create(seedItem);
                        results.push({ slug: item.slug, status: 'created' });
                    } else {
                        results.push({ slug: item.slug, status: 'already_exists' });
                    }
                }
            } else {
                // Default fallback to predefined slugs
                for (const defaultSlug of DEFAULT_SLUGS) {
                    const existing = await KundliPageContent.findOne({ pageSlug: defaultSlug });
                    if (!existing) {
                        const seedItem = getTemplate(defaultSlug);
                        await KundliPageContent.create(seedItem);
                        results.push({ slug: defaultSlug, status: 'created' });
                    }
                }
            }
            res.json({ message: 'Seed completed', results });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    forceSeed: async (req, res) => {
        try {
            const { slugs } = req.body;
            const toSeed = slugs && slugs.length > 0 ? slugs : DEFAULT_SLUGS.map(s => ({ slug: s, label: SPECIFIC_DATA[s]?.pageName }));

            for (const item of toSeed) {
                const seedItem = getTemplate(item.slug, item.label);
                
                await KundliPageContent.findOneAndUpdate(
                    { pageSlug: item.slug },
                    seedItem,
                    { upsert: true, returnDocument: 'after' }
                );
            }
            res.json({ message: 'Force seed completed' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = kundliPageContentController;

