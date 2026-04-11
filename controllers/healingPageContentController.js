const HealingPageContent = require('../models/HealingPageContent');

const BASE_TEMPLATE = {
    whatIsSection: {
        badge: 'Understanding Healing',
        title: 'What is',
        titleColored: 'Healing',
        description: 'Healing is based on the idea that energy flows through the body. When energy is blocked, it leads to stress, illness, and emotional problems. Healing helps restore natural energy balance.',
        items: [
            { iconName: 'Zap', title: 'Energy Flows', desc: 'Life force energy flows through every cell of your body' },
            { iconName: 'Shield', title: 'Blockages Cause Issues', desc: 'When energy is blocked → stress, illness, emotional problems' },
            { iconName: 'Heart', title: 'Restores Balance', desc: 'Healing helps restore natural energy balance and harmony' }
        ]
    },
    benefitsSection: {
        badge: 'Benefits',
        title: 'Benefits of',
        titleColored: 'Healing',
        benefits: [
            { iconName: 'Brain', title: 'Stress Reduction', desc: 'Releases negative energy and deeply relaxes the mind', colorClass: 'from-orange-500 to-red-600' },
            { iconName: 'Heart', title: 'Emotional Healing', desc: 'Helps overcome anxiety, trauma and emotional blockages', colorClass: 'from-purple-500 to-pink-600' },
            { iconName: 'Moon', title: 'Better Sleep', desc: 'Improves sleep patterns and cures insomnia naturally', colorClass: 'from-blue-500 to-indigo-600' },
            { iconName: 'Brain', title: 'Mental Clarity', desc: 'Clears mental fog and enhances focus and decision making', colorClass: 'from-amber-500 to-orange-600' },
            { iconName: 'Sun', title: 'Spiritual Peace', desc: 'Deepens meditation and connects you with higher consciousness', colorClass: 'from-yellow-500 to-amber-600' },
            { iconName: 'Activity', title: 'Physical Healing', desc: 'Accelerates recovery and boosts immune system', colorClass: 'from-green-500 to-emerald-600' }
        ]
    },
    sessionsSection: {
        badge: 'Sessions',
        title: 'Types of',
        titleColored: 'Healing Sessions',
        sessions: [
            {
                iconName: 'Globe', title: 'Distance Healing', duration: '30 minutes', price: '₹999',
                desc: 'Healing energy transmitted remotely across any distance',
                features: ['No geographical limits', 'Same energy as in-person', 'Flexible scheduling'],
                colorClass: 'from-orange-500 to-red-600'
            },
            {
                iconName: 'Sun', title: 'Chakra Healing', duration: '45 minutes', price: '₹1,499',
                desc: 'Balance all 7 chakras for complete energy alignment',
                features: ['Chakra scanning', 'Blockage removal', 'Chakra balancing'],
                colorClass: 'from-purple-500 to-indigo-600'
            },
            {
                iconName: 'Wind', title: 'Aura Cleansing', duration: '30 minutes', price: '₹999',
                desc: 'Remove negative energies from your auric field',
                features: ['Aura scanning', 'Negative energy removal', 'Protection shield'],
                colorClass: 'from-blue-500 to-cyan-600'
            },
            {
                iconName: 'Feather', title: 'Emotional Healing', duration: '45 minutes', price: '₹1,499',
                desc: 'Deep healing for emotional trauma and blockages',
                features: ['Trauma release', 'Emotional balance', 'Inner peace'],
                colorClass: 'from-pink-500 to-rose-600'
            }
        ]
    },
    processSection: {
        badge: 'Process',
        title: 'How It',
        titleColored: 'Works',
        steps: [
            { number: '01', iconName: 'Calendar', title: 'Book a Session', desc: 'Choose your preferred session type and time slot' },
            { number: '02', iconName: 'MessageSquare', title: 'Share Your Concern', desc: 'Tell us about your health issues or emotional concerns' },
            { number: '03', iconName: 'Zap', title: 'Receive Healing', desc: 'Practitioner performs healing and transmits healing energy' },
            { number: '04', iconName: 'Heart', title: 'Feel Transformed', desc: 'Experience deep relaxation and restored energy balance' }
        ]
    },
    testimonialsSection: {
        badge: 'Testimonials',
        title: 'What Our',
        titleColored: 'Clients Say',
        reviews: [
            { name: 'Priya Sharma', text: 'After just three sessions, my chronic anxiety has significantly reduced. The energy work is truly transformative.', location: 'Mumbai, India', rating: 5 },
            { name: 'Rahul Verma', text: 'The distance healing session was incredibly powerful. I felt a deep sense of peace and relaxation throughout.', location: 'Delhi, India', rating: 5 },
            { name: 'Anjali Patel', text: 'My sleep has improved dramatically. The healer was compassionate and explained every step of the process.', location: 'Bangalore, India', rating: 5 }
        ]
    },
    faqSection: {
        badge: 'FAQ',
        title: 'Frequently Asked',
        titleColored: 'Questions',
        faqs: [
            { question: 'Is this healing safe?', answer: 'Yes, it is a gentle and natural healing practice. It is non-invasive and works in harmony with all other medical or therapeutic techniques.' },
            { question: 'Can healing be done remotely?', answer: 'Yes, distance healing sessions are common and highly effective. Energy is not limited by physical distance.' },
            { question: 'How long does a session take?', answer: 'Usually 20–45 minutes. The duration depends on your specific needs and the intensity of the healing required.' },
            { question: 'How many sessions will I need?', answer: 'It varies per person. Some feel benefits after 1 session, while others with chronic issues may need 3-5 sessions.' }
        ]
    },
    ctaSection: {
        title: 'Begin Your',
        titleColored: 'Healing Journey Today',
        subtitle: 'Join thousands who have experienced the transformative power of healing.',
        buttons: [
            { text: 'Start Healing', link: '/book-healing', iconName: 'Zap', btnClass: 'bg-[#E8453C]' },
            { text: 'Contact Us', link: '/contact', iconName: 'MessageSquare', btnClass: 'bg-[#F59E0B]' }
        ]
    }
};

const SPECIFIC_DATA = {
    'reiki-healing': {
        pageName: 'Reiki Healing',
        whatIsSection: {
            badge: 'Understanding Reiki',
            title: 'What is', titleColored: 'Reiki Healing',
            description: 'Reiki is a Japanese technique for stress reduction and relaxation that also promotes healing. It is based on the idea that an unseen "life force energy" flows through us and is what causes us to be alive.',
            items: [
                { iconName: 'Zap', title: 'Energy Alignment', desc: 'Restores the natural flow of life force energy' },
                { iconName: 'Shield', title: 'Stress Relief', desc: 'Deeply relaxes the nervous system and mind' },
                { iconName: 'Heart', title: 'Holistic Recovery', desc: 'Supports physical and emotional self-healing' }
            ]
        },
        benefitsSection: { title: 'Benefits of', titleColored: 'Reiki' },
        sessionsSection: { title: 'Types of', titleColored: 'Reiki Sessions' },
        ctaSection: {
            title: 'Begin Your', titleColored: 'Reiki Journey',
            subtitle: 'Experience the flow of universal healing energy today.',
            buttons: [
                { text: 'Book Reiki Session', link: '/book-reiki', iconName: 'Zap', btnClass: 'bg-[#E8453C]' }
            ]
        }
    },
    'crystal-healing': {
        pageName: 'Crystal Healing',
        whatIsSection: {
            badge: 'Crystal Therapy',
            title: 'What is', titleColored: 'Crystal Healing',
            description: 'Crystal Healing uses the natural vibrational energy of semi-precious stones to restore balance to the body, mind, and spirit. Each crystal carries a unique energetic frequency.',
            items: [
                { iconName: 'Sparkles', title: 'Vibrational Frequency', desc: 'Uses natural stones to target specific energy imbalances' },
                { iconName: 'Shield', title: 'Protective Energy', desc: 'Shields your aura from negative external influences' },
                { iconName: 'Heart', title: 'Deep Grounding', desc: 'Helps connect your spirit with Earth\'s rooting energy' }
            ]
        },
        benefitsSection: { title: 'Benefits of', titleColored: 'Crystal Healing' },
        sessionsSection: {
            title: 'Types of', titleColored: 'Crystal Sessions',
            sessions: [
                {
                    iconName: 'Globe', title: 'Full Crystal Alignment', duration: '45 minutes', price: '₹1,499',
                    desc: 'A comprehensive session using multiple crystals',
                    features: ['Body grid placement', 'Chakra scanning', 'Negative energy removal'],
                    colorClass: 'from-purple-500 to-indigo-600'
                }
            ]
        },
        ctaSection: {
            title: 'Unlock Your', titleColored: 'Crystal Power',
            subtitle: 'Transform your energy with the power of sacred stones.',
            buttons: [
                { text: 'Start Crystal Therapy', link: '/book-crystal', iconName: 'Zap', btnClass: 'bg-[#E8453C]' }
            ]
        }
    },
    'chakra-balancing': {
        pageName: 'Chakra Balancing',
        whatIsSection: {
            badge: 'Energy Centers',
            title: 'What is', titleColored: 'Chakra Balancing',
            description: 'Chakra Balancing focuses on the seven main energy centers of the body. When these centers are open and balanced, energy flows freely, leading to optimal health and vitality.',
            items: [
                { iconName: 'Target', title: '7 Main Chakras', desc: 'Targets Root, Sacral, Solar Plexus, Heart, Throat, 3rd Eye, and Crown' },
                { iconName: 'Activity', title: 'Energy Flow', desc: 'Identifies and removes blockages in specific energy centers' },
                { iconName: 'RefreshCw', title: 'Complete Renewal', desc: 'Restores the spin and vibrancy of each chakra' }
            ]
        },
        benefitsSection: { title: 'Benefits of', titleColored: 'Chakra Balancing' },
        sessionsSection: {
            title: 'Types of', titleColored: 'Chakra Sessions',
            sessions: [
                {
                    iconName: 'Sun', title: 'Deep Chakra Scan', duration: '40 minutes', price: '₹1,299',
                    desc: 'In-depth analysis and balancing of all seven chakras',
                    features: ['Blockage identification', 'Color therapy', 'Sound resonance'],
                    colorClass: 'from-amber-500 to-orange-600'
                }
            ]
        },
        ctaSection: {
            title: 'Balance Your', titleColored: 'Inner Energy',
            subtitle: 'Align your chakras for better mental and physical well-being.',
            buttons: [
                { text: 'Balance My Chakras', link: '/book-chakra', iconName: 'Zap', btnClass: 'bg-[#E8453C]' }
            ]
        }
    },
    'aura-cleansing': {
        pageName: 'Aura Cleansing',
        whatIsSection: {
            badge: 'Energetic Shield',
            title: 'What is', titleColored: 'Aura Cleansing',
            description: 'Your aura is the energetic field surrounding your body. Aura Cleansing removes toxic energies, psychic debris, and external negativity that often attach to this field.',
            items: [
                { iconName: 'Wind', title: 'Aura Scrubbing', desc: 'Cleanses the external layers of your energy field' },
                { iconName: 'Shield', title: 'Energy Sheeting', desc: 'Creates a protective barrier around your personal space' },
                { iconName: 'Sun', title: 'Radiance Boost', desc: 'Restores the natural brightness and color of your aura' }
            ]
        },
        benefitsSection: { title: 'Benefits of', titleColored: 'Aura Cleansing' },
        sessionsSection: {
            title: 'Types of', titleColored: 'Aura Sessions',
            sessions: [
                {
                    iconName: 'Wind', title: 'Negative Energy Purge', duration: '30 minutes', price: '₹999',
                    desc: 'Quick removal of heavy or toxic external energies',
                    features: ['Salt spray ritual', 'Smudging', 'Aura smoothing'],
                    colorClass: 'from-blue-500 to-cyan-600'
                }
            ]
        },
        ctaSection: {
            title: 'Cleanse Your', titleColored: 'Energetic Field',
            subtitle: 'Feel lighter and more protected by purifying your aura.',
            buttons: [
                { text: 'Cleanse My Aura', link: '/book-aura', iconName: 'Zap', btnClass: 'bg-[#E8453C]' }
            ]
        }
    },
    'meditation-guidance': {
        pageName: 'Meditation Guidance',
        whatIsSection: {
            badge: 'Mental Peace',
            title: 'What is', titleColored: 'Meditation Guidance',
            description: 'Meditation is the practice of training your mind to focus and redirect your thoughts. Our guidance helps beginners and experts achieve deeper states of consciousness.',
            items: [
                { iconName: 'Moon', title: 'Mindfulness', desc: 'Learn to stay present and calm in high-stress situations' },
                { iconName: 'Brain', title: 'Cognitive Focus', desc: 'Improves concentration, memory, and mental sharpness' },
                { iconName: 'Sun', title: 'Spiritual Growth', desc: 'Connects you with your higher self and inner wisdom' }
            ]
        },
        benefitsSection: { title: 'Benefits of', titleColored: 'Guided Meditation' },
        sessionsSection: {
            title: 'Types of', titleColored: 'Meditation Sessions',
            sessions: [
                {
                    iconName: 'Feather', title: 'Focused Breathwork', duration: '30 minutes', price: '₹799',
                    desc: 'Guided session focusing on prana and breath control',
                    features: ['Alpha wave focus', 'Stress release', 'Inner silence'],
                    colorClass: 'from-green-500 to-emerald-600'
                }
            ]
        },
        ctaSection: {
            title: 'Achieve Inner', titleColored: 'Stillness',
            subtitle: 'Master your mind and find peace in a chaotic world.',
            buttons: [
                { text: 'Start Meditation', link: '/book-meditation', iconName: 'Zap', btnClass: 'bg-[#E8453C]' }
            ]
        }
    }
};

const DEFAULT_SLUGS = Object.keys(SPECIFIC_DATA);

// Deep merge helper
const deepMerge = (base, override) => {
    const result = { ...base };
    for (const key in override) {
        if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key]) && base[key]) {
            result[key] = deepMerge(base[key], override[key]);
        } else {
            result[key] = override[key];
        }
    }
    return result;
};

const getTemplate = (slug, name) => {
    const defaultName = name || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const specific = SPECIFIC_DATA[slug] || { pageName: defaultName };

    return {
        pageSlug: slug,
        pageName: specific.pageName || defaultName,
        isActive: true,
        whatIsSection: deepMerge(BASE_TEMPLATE.whatIsSection, specific.whatIsSection || {}),
        benefitsSection: deepMerge(BASE_TEMPLATE.benefitsSection, specific.benefitsSection || {}),
        sessionsSection: deepMerge(BASE_TEMPLATE.sessionsSection, specific.sessionsSection || {}),
        processSection: deepMerge(BASE_TEMPLATE.processSection, specific.processSection || {}),
        testimonialsSection: deepMerge(BASE_TEMPLATE.testimonialsSection, specific.testimonialsSection || {}),
        faqSection: deepMerge(BASE_TEMPLATE.faqSection, specific.faqSection || {}),
        ctaSection: deepMerge(BASE_TEMPLATE.ctaSection, specific.ctaSection || {})
    };
};

const healingPageContentController = {
    getAll: async (req, res) => {
        try {
            const pages = await HealingPageContent.find().sort({ createdAt: 1 });
            res.json(pages);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getBySlug: async (req, res) => {
        try {
            const page = await HealingPageContent.findOne({ pageSlug: req.params.slug });
            if (!page) return res.status(404).json({ message: 'Page not found' });
            res.json(page);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    upsertPage: async (req, res) => {
        try {
            let data = req.body;

            // Parse JSON string fields from FormData
            const jsonFields = ['whatIsSection', 'benefitsSection', 'sessionsSection', 'processSection', 'testimonialsSection', 'faqSection', 'ctaSection'];
            jsonFields.forEach(field => {
                if (typeof data[field] === 'string') {
                    try { data[field] = JSON.parse(data[field]); } catch (e) { console.error(`Error parsing ${field}:`, e); }
                }
            });

            const page = await HealingPageContent.findOneAndUpdate(
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
            const deleted = await HealingPageContent.findOneAndDelete({ pageSlug: req.params.id });
            if (!deleted) return res.status(404).json({ message: 'Page not found' });
            res.json({ message: 'Page deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateStatus: async (req, res) => {
        try {
            const page = await HealingPageContent.findOneAndUpdate(
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
            const { slugs } = req.body;
            const results = [];

            if (slugs && slugs.length > 0) {
                for (const item of slugs) {
                    const existing = await HealingPageContent.findOne({ pageSlug: item.slug });
                    if (!existing) {
                        const seedItem = getTemplate(item.slug, item.label);
                        await HealingPageContent.create(seedItem);
                        results.push({ slug: item.slug, status: 'created' });
                    } else {
                        results.push({ slug: item.slug, status: 'already_exists' });
                    }
                }
            } else {
                for (const defaultSlug of DEFAULT_SLUGS) {
                    const existing = await HealingPageContent.findOne({ pageSlug: defaultSlug });
                    if (!existing) {
                        const seedItem = getTemplate(defaultSlug);
                        await HealingPageContent.create(seedItem);
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
                await HealingPageContent.findOneAndUpdate(
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

module.exports = healingPageContentController;
