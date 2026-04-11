const VastuPageContent = require('../models/VastuPageContent');

const SEED_DATA = [
    {
        pageSlug: 'vastu-consultation',
        pageName: 'Vastu Consultation',
        hero: {
            badge: 'DIVINE VASTU SERVICES',
            titleHighlight1: 'Ancient',
            titleEnd: 'Architecture',
            titleHighlight2: 'Vedic',
            titleHighlight3: 'Consultation',
            subtitle: 'Balance the five natural elements to bring peace, prosperity, and success to your life through divine Vastu guidance.',
            imageUrl: '',
            buttons: [
                { text: 'Book Consultation', link: '#appointment-section', iconName: 'Calendar' },
                { text: 'WhatsApp Now', link: 'https://wa.me/911234567890', iconName: 'Phone' }
            ]
        },
        about: {
            badge: 'Ancient Science',
            title: 'What is',
            titleColored: 'Vastu Shastra?',
            subtitle: 'Energy Harmony',
            description: 'Vastu Shastra is the ancient Indian science of architecture and energy alignment. It helps balance the five natural elements to bring peace, prosperity, and success.',
            descriptionBold: 'Our Vastu consultation helps identify energy imbalances in your home or office and provides remedies to correct them.',
            image: '',
            imageOverlayBadge: 'Energy Harmony',
            imageOverlayText: '"Balancing Elements, Enhancing Life"',
            points: [
                { title: 'Scientific Basis', iconName: 'Shield' },
                { title: 'Peace of Mind', iconName: 'Heart' }
            ]
        },
        servicesSection: {
            badge: 'Expert Services',
            title: 'Our',
            titleColored: 'Vastu Services',
            services: [
                { title: 'Home Vastu', iconName: 'Home', desc: 'Bring peace and prosperity to your living space.', features: ['Energy Balance', 'Room Placement', 'Direction Correction'] },
                { title: 'Office Vastu', iconName: 'Building2', desc: 'Boost productivity and success in your professional life.', features: ['Workflow Optimization', 'Cubicle Placement', 'Entry Direction'] },
                { title: 'Plot Vastu', iconName: 'MapPin', desc: 'Select and prepare the perfect foundation for your dreams.', features: ['Land Analysis', 'Shape Correction', 'Boundary Setup'] },
                { title: 'Factory Vastu', iconName: 'Factory', desc: 'Optimize industrial layouts for maximum output.', features: ['Production Flow', 'Machine Placement', 'Warehouse Zoning'] },
                { title: 'Commercial Vastu', iconName: 'Store', desc: 'Attract customers and increase retail profitability.', features: ['Customer Flow', 'Cash Counter', 'Display Areas'] },
                { title: 'Apartment Vastu', iconName: 'Building', desc: 'Expert guidance for choosing the right urban home.', features: ['Flat Selection', 'Room Alignment', 'Main Door Direction'] }
            ]
        },
        processSection: {
            badge: 'The Journey',
            title: 'How We',
            titleColored: 'Consult',
            steps: [
                { number: '1', title: 'Submit Details', subtitle: 'Property Information', description: 'Submit Property Details', iconName: 'FileText' },
                { number: '2', title: 'Upload Map', subtitle: 'Layout Plan', description: 'Upload House Map / Layout', iconName: 'Upload' },
                { number: '3', title: 'Analysis', subtitle: 'Expert Review', description: 'Get Vastu Analysis', iconName: 'Search' },
                { number: '4', title: 'Solutions', subtitle: 'Final Report', description: 'Receive Remedies & Report', iconName: 'FileCheck' }
            ]
        },
        benefitsSection: {
            badge: 'Life Changing Impact',
            title: 'Benefits Of',
            titleColored: 'Vastu Alignment',
            benefits: [
                { title: 'Financial Growth', iconName: 'TrendingUp', desc: 'Attract wealth and prosperity through proper direction alignment.' },
                { title: 'Better Health', iconName: 'Heart', desc: 'Improve physical and mental well-being with natural energy flow.' },
                { title: 'Peaceful Relationships', iconName: 'Users', desc: 'Foster harmony and love among family members and colleagues.' },
                { title: 'Business Success', iconName: 'Briefcase', desc: 'Optimize your workplace for productivity and market growth.' },
                { title: 'Positive Energy', iconName: 'Sun', desc: 'Clear negative vibrations and welcome divine positivity.' },
                { title: 'Career Growth', iconName: 'Star', desc: 'Unlock new opportunities and achieve professional excellence.' }
            ]
        },
        pricingSection: {
            badge: 'Our Plans',
            title: 'Consultation',
            titleColored: 'Pricing',
            plans: [
                { name: 'Online Consultation', price: '999', duration: '30 minute consultation', iconName: 'MessageCircle', desc: 'Quick video/call guidance for minor issues.' },
                { name: 'Home Vastu Report', price: '2500', duration: 'Detailed report with remedies', iconName: 'FileText', desc: 'In-depth analysis and written solution guide.' },
                { name: 'On-Site Consultation', price: '7000', duration: 'Acharya Ji visits your property', iconName: 'User', desc: 'Personal visit for complete energy scanning.' }
            ]
        },
        testimonialsSection: {
            badge: 'Success Stories',
            title: 'Client',
            titleColored: 'Reviews',
            reviews: [
                { quote: 'After Vastu consultation my business improved significantly. The remedies were simple yet effective.', author: 'Rajesh Kumar', role: 'Business Owner' },
                { quote: 'Very accurate guidance by Acharya Ji. Our home feels more peaceful and harmonious now.', author: 'Priya Sharma', role: 'Homemaker' },
                { quote: 'The team was professional and provided detailed analysis. Highly recommended for anyone seeking balance.', author: 'Amit Patel', role: 'Architect' }
            ]
        },
        ctaSection: {
            badge: 'Preserving Tradition',
            title: 'Balance Your',
            titleColored: 'Divine Energy',
            subtitle: 'Preservation of ancient Vedic architecture for modern success. Contact Acharya Ji today for a detailed scanning of your property.',
            buttons: [
                { text: 'Professional Consultation', link: '#', iconName: 'Users' },
                { text: 'Inquire More', link: '/contact', iconName: 'MessageSquare' }
            ]
        }
    },
    {
        pageSlug: 'home-office-vastu',
        pageName: 'Home / Office Vastu',
        hero: {
            badge: 'PROFESSIONAL ARCHITECTURE',
            titleHighlight1: 'Sacred',
            titleEnd: 'Spaces',
            titleHighlight2: 'Residential',
            titleHighlight3: 'Commercial',
            subtitle: 'Customized Vastu solutions for your homes and workplaces to manifest abundance and mental clarity.',
            imageUrl: '',
            buttons: [
                { text: 'Scan My Property', link: '#', iconName: 'Search' },
                { text: 'Talk to Acharya', link: '/astrologer', iconName: 'Phone' }
            ]
        },
        about: {
            badge: 'Space Optimization',
            title: 'Harmonize',
            titleColored: 'Living & Working',
            description: 'Whether it is your sanctuary at home or your powerhouse at the office, energy flow dictates your success and well-being.',
            descriptionBold: 'We specialize in non-demolition Vastu remedies that align your space with cosmic energy without structural changes.',
            image: '',
            points: [
                { title: 'No Demolition', iconName: 'Shield' },
                { title: 'Effective Remedies', iconName: 'Sparkles' }
            ]
        },
        servicesSection: {
            badge: 'Spatial Mastery',
            title: 'Specialized',
            titleColored: 'Vastu Solutions',
            services: [
                { title: 'House Entry', iconName: 'MapPin', desc: 'Correct the main gate energy for wealth.', features: ['Directional Analysis', 'Entry Gate Remedy', 'Obstacle Removal'] },
                { title: 'Bedroom Setup', iconName: 'Heart', desc: 'Ensure restful sleep and intimacy.', features: ['Bed Placement', 'Color Choice', 'Mirror Alignment'] },
                { title: 'Office Cabin', iconName: 'Briefcase', desc: 'Boost authority and decision making.', features: ['Seating Order', 'Table Orientation', 'File Placement'] }
            ]
        },
        processSection: {
            badge: 'Strategic Approach',
            title: 'Audit',
            titleColored: 'Mechanism',
            steps: [
                { number: '1', title: 'Property Scan', description: 'Comprehensive site analysis.', iconName: 'Search' },
                { number: '2', title: 'Energy Mapping', description: 'Plotting 16 zones of Vastu.', iconName: 'MapPin' },
                { number: '3', title: 'Remedy Design', description: 'Scientific Vedic solutions.', iconName: 'Sparkle' }
            ]
        }
    },
    {
        pageSlug: 'feng-shui',
        pageName: 'Feng Shui',
        hero: {
            badge: 'EASTERN WISDOM',
            titleHighlight1: 'Flow of',
            titleEnd: 'Chi',
            titleHighlight2: 'Classical',
            titleHighlight3: 'Feng Shui',
            subtitle: 'Harness the power of Yin and Yang to create a balanced environment that supports your highest aspirations.',
            imageUrl: '',
            buttons: [
                { text: 'Audit My Space', link: '#', iconName: 'Search' },
                { text: 'Buy Feng Shui Items', link: '/shop', iconName: 'Store' }
            ]
        },
        about: {
            badge: 'Ancient Arts',
            title: 'Ancient Art of',
            titleColored: 'Placement',
            description: 'Feng Shui is about living in harmony with the environment. It focuses on the flow of energy (Chi) to improve wealth, health, and romance.',
            descriptionBold: 'Our audits combine classical Bagua mapping with modern interior insights.',
            image: '',
            points: [
                { title: 'Bagua Analysis', iconName: 'MapPin' },
                { title: 'Five Elements', iconName: 'Sun' }
            ]
        },
        servicesSection: {
            badge: 'Cures & Enhancers',
            title: 'Feng Shui',
            titleColored: 'Mastery',
            services: [
                { title: 'Home Audit', iconName: 'Home', desc: 'Identify blocked energy in your home.', features: ['Sector Analysis', 'Flying Stars', 'Color Therapy'] },
                { title: 'Cure Suggestion', iconName: 'Shield', desc: 'Effective cures for poison arrows.', features: ['Product Recommendations', 'Placement Guide', 'Amulets'] }
            ]
        }
    },
    {
        pageSlug: 'gemstones',
        pageName: 'Gemstones',
        hero: {
            badge: 'PLANETARY ENERGIES',
            titleHighlight1: 'Vedic',
            titleEnd: 'Gems',
            titleHighlight2: 'Authentic',
            titleHighlight3: 'Gemstones',
            subtitle: 'Unlock the cosmic vibrational power of natural gemstones matched perfectly to your birth chart.',
            imageUrl: '',
            buttons: [
                { text: 'Get Recommendation', link: '/astrologer', iconName: 'Star' },
                { text: 'Browse Inventory', link: '/shop', iconName: 'Store' }
            ]
        },
        about: {
            badge: 'Crystal Power',
            title: 'Astrological',
            titleColored: 'Gemstone Therapy',
            description: 'Gemstones act as filters for planetary rays. Wearing the right gem can strengthen weak planets and protect against malefic influences.',
            descriptionBold: 'We provide only Lab-Certified, Unheated, and Untreated gemstones for maximum botanical efficacy.',
            image: '',
            points: [
                { title: 'Lab Certified', iconName: 'Award' },
                { title: 'Vedic Energized', iconName: 'Sparkles' }
            ]
        },
        servicesSection: {
            badge: 'Gem Varieties',
            title: 'Divine',
            titleColored: 'Gemstones',
            services: [
                { title: 'Blue Sapphire', iconName: 'Shield', desc: 'Strengthen Saturn for discipline.', features: ['Neelam', ' शनि ग्रह', 'Discipline'] },
                { title: 'Ruby', iconName: 'Sun', desc: 'Boost Vitality and Name-Fame.', features: ['Manik', 'सूर्य ग्रह', 'Vitality'] },
                { title: 'Yellow Sapphire', iconName: 'Award', desc: 'Attract Wisdom and Wealth.', features: ['Pukhraj', 'बृहस्पति ग्रह', 'Knowledge'] }
            ]
        },
        pricingSection: {
            badge: 'Gem Pricing',
            title: 'Gemstone',
            titleColored: 'Pricing',
            plans: [
                { name: 'Basic Report', price: '499', duration: 'PDF Recommendation', iconName: 'FileText', desc: 'Know which gem suits your rashi.' },
                { name: 'Expert Consult', price: '1100', duration: 'Personal Call', iconName: 'Phone', desc: 'Deep analysis of D-charts for gems.' }
            ]
        }
    },
    {
        pageSlug: 'rudraksha',
        pageName: 'Rudraksha',
        hero: {
            badge: 'TEARS OF LORD SHIVA',
            titleHighlight1: 'Shiva\'s',
            titleEnd: 'Grace',
            titleHighlight2: 'Sacred',
            titleHighlight3: 'Rudraksha',
            subtitle: 'Divine beads from the Himalayas to protect your soul, improve health, and provide spiritual awakening.',
            imageUrl: '',
            buttons: [
                { text: 'Consult Mukhi', link: '#', iconName: 'User' },
                { text: 'Buy Rudraksha', link: '/shop', iconName: 'ShoppingBag' }
            ]
        },
        about: {
            badge: 'Spiritual Beads',
            title: 'The Power of',
            titleColored: 'Rudraksha',
            description: 'Rudraksha beads are known for their electromagnetic properties that regulate heart rate and blood pressure while providing spiritual protection.',
            descriptionBold: 'Acharya Ji personally selects and energizes each bead through Vedic Pran-Pratishtha.',
            image: '',
            points: [
                { title: 'Authentic Origin', iconName: 'MapPin' },
                { title: 'Pran Pratishtha', iconName: 'Sparkles' }
            ]
        },
        servicesSection: {
            badge: 'Mukhi Varieties',
            title: 'Sacred',
            titleColored: 'Beads',
            services: [
                { title: '1-21 Mukhi', iconName: 'Star', desc: 'Complete range of authentic beads.', features: ['Individual Beads', 'Combinations', 'Siddha Mala'] },
                { title: 'Health Beads', iconName: 'Heart', desc: 'Special beads for physiological relief.', features: ['BP Control', 'Stress Relief', 'Focus'] }
            ]
        }
    },
    {
        pageSlug: 'yantra',
        pageName: 'Yantra',
        hero: {
            badge: 'GEOMETRIC DIVINITY',
            titleHighlight1: 'Sacred',
            titleEnd: 'Geometry',
            titleHighlight2: 'Vedic',
            titleHighlight3: 'Yantras',
            subtitle: 'Mathematical diagrams that act as energy antennas to attract divine cosmic vibrations into your premises.',
            imageUrl: '',
            buttons: [
                { text: 'Enquire for Yantra', link: '#', iconName: 'MessageSquare' },
                { text: 'Shop Collections', link: '/shop', iconName: 'Store' }
            ]
        },
        about: {
            badge: 'Machine of Energy',
            title: 'Mechanical',
            titleColored: 'Divinity',
            description: 'Yantras are the physical representations of Mantras. They store energy in geometric patterns that creates a shield of protection.',
            descriptionBold: 'We offer copper, gold-plated, and silver Yantras accurately etched according to Shastras.',
            image: '',
            points: [
                { title: 'Perfect Etching', iconName: 'Award' },
                { title: 'Shastra Compliant', iconName: 'BookOpen' }
            ]
        },
        servicesSection: {
            badge: 'Powerful Icons',
            title: 'Select',
            titleColored: 'Yantras',
            services: [
                { title: 'Shree Yantra', iconName: 'Star', desc: 'The most powerful Yantra for wealth.', features: ['Maha Meru', 'Prosperity', 'Lakshmi Grace'] },
                { title: 'Kuber Yantra', iconName: 'IndianRupee', desc: 'For accumulation of wealth.', features: ['Accounts', 'Safe Placement', 'Business'] }
            ]
        }
    },
    {
        pageSlug: 'energized-products',
        pageName: 'Energized Products',
        hero: {
            badge: 'DIVINE CURATIONS',
            titleHighlight1: 'Blessed',
            titleEnd: 'Collections',
            titleHighlight2: 'Energized',
            titleHighlight3: 'Spiritual Items',
            subtitle: 'Hand-picked spiritual products infused with positive mantras and divine vibrations to enhance your aura.',
            imageUrl: '',
            buttons: [
                { text: 'View Products', link: '/shop', iconName: 'ShoppingBag' },
                { text: 'Contact Us', link: '/contact', iconName: 'Phone' }
            ]
        },
        about: {
            badge: 'Pran Pratishtha',
            title: 'Vedic',
            titleColored: 'Energization',
            description: 'Every product you buy here undergoes a rigorous process of cleansing and Pran-Pratishtha to ensure it carries maximum positive energy.',
            descriptionBold: 'From Mala to Statues, everything is blessed for your prosperity.',
            image: '',
            points: [
                { title: 'Hand-picked', iconName: 'CheckCircle' },
                { title: 'Blessed Items', iconName: 'Sparkles' }
            ]
        },
        servicesSection: {
            badge: 'Blessings',
            title: 'Available',
            titleColored: 'Curations',
            services: [
                { title: 'Spiritual Mala', iconName: 'Sun', desc: 'Japa and wearing malis.', features: ['Tulsi', 'Sandalwood', 'Lotus Seed'] },
                { title: 'Vastu Pyramids', iconName: 'Home', desc: 'For energy neutralization.', features: ['Copper Pyramids', 'Crystal Pyramids', 'Lead Cures'] }
            ]
        }
    }
];

const getTemplate = (slug, name) => {
    const defaultName = name || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const base = JSON.parse(JSON.stringify(SEED_DATA[0]));
    return {
        ...base,
        pageSlug: slug,
        pageName: defaultName,
        _id: undefined
    };
};

const vastuPageContentController = {
    getAll: async (req, res) => {
        try {
            const pages = await VastuPageContent.find().sort({ createdAt: 1 });
            res.json(pages);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getBySlug: async (req, res) => {
        try {
            const page = await VastuPageContent.findOne({ pageSlug: req.params.slug });
            if (!page) return res.status(404).json({ message: 'Page not found' });
            res.json(page);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    upsertPage: async (req, res) => {
        console.log('UPSERT REQUEST RECEIVED FOR:', req.body.pageSlug);
        try {
            let data = req.body;
            const jsonFields = ['hero', 'about', 'servicesSection', 'processSection', 'benefitsSection', 'pricingSection', 'testimonialsSection', 'ctaSection', 'activeSections'];
            
            jsonFields.forEach(field => {
                if (typeof data[field] === 'string') {
                    try {
                        data[field] = JSON.parse(data[field]);
                    } catch (e) {}
                }
            });

            if (req.files && Array.isArray(req.files)) {
                req.files.forEach(file => {
                    if (file.fieldname === 'heroImage') data.hero = { ...data.hero, imageUrl: `/uploads/vastu/${file.filename}` };
                    if (file.fieldname === 'aboutImage') data.about = { ...data.about, image: `/uploads/vastu/${file.filename}` };
                    if (file.fieldname.startsWith('serviceImage_')) {
                        const idx = parseInt(file.fieldname.split('_')[1]);
                        if (data.servicesSection && data.servicesSection.services && data.servicesSection.services[idx]) {
                            data.servicesSection.services[idx].image = `/uploads/vastu/${file.filename}`;
                        }
                    }
                });
            }

            const page = await VastuPageContent.findOneAndUpdate(
                { pageSlug: data.pageSlug },
                data,
                { upsert: true, runValidators: true, new: true }
            );
            res.json(page);
        } catch (error) {
            console.error('VASTU UPSERT ERROR:', error);
            res.status(400).json({ message: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const deleted = await VastuPageContent.findOneAndDelete({ pageSlug: req.params.id });
            if (!deleted) return res.status(404).json({ message: 'Page not found' });
            res.json({ message: 'Page deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateStatus: async (req, res) => {
        try {
            const page = await VastuPageContent.findOneAndUpdate(
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
                    const existing = await VastuPageContent.findOne({ pageSlug: item.slug });
                    if (!existing) {
                        const predefined = SEED_DATA.find(s => s.pageSlug === item.slug);
                        const seedItem = predefined || getTemplate(item.slug, item.label);
                        await VastuPageContent.create(seedItem);
                        results.push({ slug: item.slug, status: 'created' });
                    }
                }
            } else {
                // Seed all predefined SEED_DATA if no slugs provided
                for (const item of SEED_DATA) {
                    const existing = await VastuPageContent.findOne({ pageSlug: item.pageSlug });
                    if (!existing) {
                        await VastuPageContent.create(item);
                        results.push({ slug: item.pageSlug, status: 'created' });
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
            const toSeed = slugs && slugs.length > 0 ? slugs : SEED_DATA.map(d => ({ slug: d.pageSlug, label: d.pageName }));

            for (const item of toSeed) {
                const predefined = SEED_DATA.find(s => s.pageSlug === item.slug);
                const seedItem = predefined || getTemplate(item.slug, item.label);
                await VastuPageContent.findOneAndUpdate({ pageSlug: item.slug }, seedItem, { upsert: true });
            }
            res.json({ message: 'Force seed completed' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = vastuPageContentController;
