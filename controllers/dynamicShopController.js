const Product = require('../models/DynamicShopProduct');
const DynamicShopCategory = require('../models/DynamicShopCategory');
const DynamicShopContent = require('../models/DynamicShopContent');
const { deleteMedia } = require('../utils/mediaHandlers');

// Public: Get all data for a specific shop
exports.getShopData = async (req, res) => {
    try {
        const { shopType } = req.params;
        
        const content = await DynamicShopContent.findOne({ shopType }) || {};
        const categories = await DynamicShopCategory.find({ shopType, isActive: true }).sort({ order: 1 });
        const products = await DynamicShopProduct.find({ shopType, isActive: true }).sort({ order: 1 });

        res.status(200).json({
            success: true,
            data: {
                content,
                categories,
                products
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllShopsOverview = async (req, res) => {
    try {
        const SHOP_TYPES = ['puja-samagri', 'gemstones', 'yantra', 'rudraksha', 'spiritual-items'];
        const overview = await Promise.all(SHOP_TYPES.map(async (type) => {
            const content = await DynamicShopContent.findOne({ shopType: type });
            const categories = await DynamicShopCategory.countDocuments({ shopType: type });
            const products = await DynamicShopProduct.countDocuments({ shopType: type });
            return {
                shopType: type,
                isActive: content ? content.isActive : false,
                content: content || null,
                categoriesCount: categories,
                productsCount: products,
                faqsCount: content?.faqs?.length || 0
            };
        }));
        res.status(200).json({ success: true, data: overview });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin: Update Page Content
exports.updateShopContent = async (req, res) => {
    try {
        const { shopType } = req.params;
        let content = await DynamicShopContent.findOneAndUpdate(
            { shopType },
            req.body,
            { returnDocument: 'after', upsert: true }
        );
        res.status(200).json({ success: true, data: content });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin: Manage Categories
exports.addCategory = async (req, res) => {
    try {
        const category = await DynamicShopCategory.create({ ...req.body, shopType: req.params.shopType });
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await DynamicShopCategory.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Category removed' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { shopType, isActive } = req.body;
        const content = await DynamicShopContent.findOneAndUpdate(
            { shopType },
            { $set: { isActive } },
            { returnDocument: 'after', upsert: true }
        );
        res.status(200).json({ success: true, data: content });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Admin: Manage Products
exports.addProduct = async (req, res) => {
    try {
        const body = { ...req.body };
        if (req.file) {
            body.image = req.file.path;
        }
        const product = await DynamicShopProduct.create({ ...body, shopType: req.params.shopType });
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const body = { ...req.body };
        if (req.file) {
            const existing = await DynamicShopProduct.findById(req.params.id);
            if (existing && existing.image) {
                await deleteMedia(existing.image);
            }
            body.image = req.file.path;
        }
        const product = await DynamicShopProduct.findByIdAndUpdate(req.params.id, body, { returnDocument: 'after' });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const product = await DynamicShopProduct.findById(req.params.id);
        if (product && product.image) {
            await deleteMedia(product.image);
        }
        await DynamicShopProduct.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Product removed' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Seed Data Helper
exports.seedShopData = async (req, res) => {
    try {
        const { shopType } = req.params;
        await seedIndividualShop(shopType);
        res.status(200).json({ success: true, message: `${shopType} seeded successfully` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.seedAllShops = async (req, res) => {
    try {
        const SHOP_TYPES = ['puja-samagri', 'gemstones', 'yantra', 'rudraksha', 'spiritual-items'];
        for (const type of SHOP_TYPES) {
            await seedIndividualShop(type);
        }
        res.status(200).json({ success: true, message: "All shop portals seeded successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

async function seedIndividualShop(shopType) {
    const shopDefaults = {
        'puja-samagri': {
            title1: "Divine", titleEnd: "Puja Samagri", 
            sub: "Authentic, high-quality puja essentials for your daily spiritual practices.",
            cats: [
                { name: "Puja Thali", icon: "Flame", color: "orange" },
                { name: "Rudraksha", icon: "Package", color: "amber" },
                { name: "Gemstones", icon: "Gem", color: "blue" },
                { name: "Yantra", icon: "Zap", color: "yellow" },
                { name: "Spiritual Bracelets", icon: "Heart", color: "rose" },
                { name: "Incense & Dhoop", icon: "Sparkles", color: "purple" },
                { name: "Idols & Murti", icon: "Church", color: "red" },
                { name: "Puja Kits", icon: "ShoppingBag", color: "green" },
            ],
            items: [
                { name: "Premium Copper Puja Thali", price: 1299, desc: "Handcrafted pure copper thali with essential bowls and diya.", cat: "Puja Thali", rating: 4.8, reviews: 45 },
                { name: "Panchdhatu Navgraha Yantra", price: 899, desc: "Energized Navgraha Yantra for planetary peace and prosperity.", cat: "Yantra", rating: 4.9, reviews: 128 },
                { name: "7 Mukhi Nepal Rudraksha", price: 2499, desc: "Authentic 7 Mukhi Rudraksha for financial stability and Mahalakshmi blessing.", cat: "Rudraksha", rating: 5.0, reviews: 89 },
                { name: "Handcrafted Sandalwood Mala", price: 599, desc: "Pure sandalwood beads for meditation and daily chanting.", cat: "Idols & Murti", rating: 4.7, reviews: 156 },
                { name: "Crystal Shree Yantra", price: 1599, desc: "Precise cut crystal Shree Yantra for abundance and positive energy.", cat: "Yantra", rating: 4.9, reviews: 210 },
                { name: "Shuddh Guggul & Loban Dhoop", price: 349, desc: "Natural aromatic resin for purifying home environment.", cat: "Incense & Dhoop", rating: 4.6, reviews: 320 }
            ],
            kits: [
                { name: "Griha Pravesh Puja Kit", price: 3499, items: ["Hawan Kund", "Ganga Jal", "Kalash", "Panch-mewa", "Vastu Yantra"], image: "/uploads/shop/default-kit.webp" },
                { name: "Satyanarayan Puja Kit", price: 1999, items: ["Puja Cloth", "Janeu", "Chunri", "Supari", "Yellow Mustard"], image: "/uploads/shop/default-kit.webp" },
                { name: "Navgraha Shanti Kit", price: 2799, items: ["9 Grains", "Colored Cloths", "Navgraha Yantra", "Samidha Wood"], image: "/uploads/shop/default-kit.webp" }
            ],
            badges: [
                { iconName: "CheckCircle", title: "Authentic Products", desc: "100% Pure & Lab Tested" },
                { iconName: "Award", title: "Energized By Acharya", desc: "Vedic Mantra Activation" },
                { iconName: "Truck", title: "Pan India Delivery", desc: "Safe & Fast Shipping" },
                { iconName: "ShieldCheck", title: "Secure Payment", desc: "100% Secure Checkout" }
            ],
            testimonials: [
                { name: "Rajesh Sharma", text: "The Rudraksha I ordered was authentic and lab-tested. Felt a positive surge in energy within days of wearing it energized by Acharya Ji.", date: "12 Mar 2024" },
                { name: "Priya Mishra", text: "The Griha Pravesh kit is a lifesaver. Each item was high quality and carefully packed. Saved us hours of market hunting.", date: "05 Mar 2024" }
            ]
        },
        'gemstones': {
            title1: "Energized", titleEnd: "Gemstones", 
            sub: "Laboratory certified precious and semi-precious stones for astrological remedies.",
            cats: [
                { name: "Precious", icon: "Gem", color: "blue" },
                { name: "Semi-Precious", icon: "Sparkles", color: "purple" },
                { name: "Bracelets", icon: "Heart", color: "rose" },
                { name: "Rings", icon: "CheckCircle", color: "amber" }
            ],
            items: [
                { name: "Natural Blue Sapphire (Neelam)", price: 15500, desc: "Certified 4.5ct Natural Ceylon Sapphire for Saturn remedies.", cat: "Precious", rating: 5.0, reviews: 23 },
                { name: "Energized Citrine Bracelet", price: 1200, desc: "Natural citrine beads for wealth and success.", cat: "Bracelets", rating: 4.8, reviews: 56 }
            ],
            kits: [],
            badges: [
                { iconName: "CheckCircle", title: "Lab Certified", desc: "Govt. Approved Certificates" },
                { iconName: "Award", title: "Energized By Acharya", desc: "Chitra Nakshatra Activation" },
                { iconName: "Truck", title: "Insured Delivery", desc: "100% Safe Transit" },
                { iconName: "ShieldCheck", title: "Secure Payment", desc: "Verified Transactions" }
            ],
            testimonials: [
                { name: "Anita K.", text: "Real Neelam. Changed my career trajectory within 45 days. Fully satisfied with the lab certification provided.", date: "24 Feb 2024" }
            ]
        },
        'yantra': {
            title1: "Sacred", titleEnd: "Yantras", 
            sub: "Mathematically precise geometric diagrams to invite positive energy and protection.",
            cats: [
                { name: "Copper Yantras", icon: "Zap", color: "orange" },
                { name: "Gold Plated", icon: "Award", color: "yellow" },
                { name: "Shree Yantras", icon: "Flame", color: "red" }
            ],
            items: [
                { name: "Panchdhatu Navgraha Yantra", price: 899, desc: "Energized Navgraha Yantra for planetary peace.", cat: "Copper Yantras", rating: 4.9, reviews: 102 },
                { name: "Crystal Shree Yantra", price: 1599, desc: "Precise cut crystal Shree Yantra for abundance.", cat: "Shree Yantras", rating: 5.0, reviews: 88 }
            ],
            kits: [],
            badges: [
                { iconName: "CheckCircle", title: "Perfect Geometry", desc: "Accurate Vedic Dimensions" },
                { iconName: "Award", title: "Pran Pratishtha", desc: "Fully Activated" },
                { iconName: "Truck", title: "Pan India Delivery", desc: "Safe Delivery" },
                { iconName: "ShieldCheck", title: "Secure Payment", desc: "100% Encrypted" }
            ],
            testimonials: [
                { name: "Suresh P.", text: "The Shree Yantra geometry is flawless. Truly feeling the vibrations in my meditation room.", date: "10 Jan 2024" }
            ]
        },
        'rudraksha': {
            title1: "Original", titleEnd: "Rudraksha", 
            sub: "Sacred Himalayan beads verified for authenticity and spiritual potency.",
            cats: [
                { name: "Nepal Variety", icon: "Package", color: "amber" },
                { name: "Indonesian Variety", icon: "CheckCircle", color: "green" },
                { name: "Malas", icon: "Heart", color: "rose" }
            ],
            items: [
                { name: "7 Mukhi Nepal Rudraksha", price: 2499, desc: "Authentic 7 Mukhi for Mahalakshmi blessing.", cat: "Nepal Variety", rating: 5.0, reviews: 145 },
                { name: "5 Mukhi Siddh Mala", price: 5500, desc: "Power combination of 108+1 beads for meditation.", cat: "Malas", rating: 4.9, reviews: 80 }
            ],
            kits: [],
            badges: [
                { iconName: "CheckCircle", title: "X-Ray Tested", desc: "Guaranteed Inner Compartments" },
                { iconName: "Award", title: "Energized By Acharya", desc: "Maha Shivratri Activation" },
                { iconName: "Truck", title: "Pan India Delivery", desc: "Safe & Fast Shipping" },
                { iconName: "ShieldCheck", title: "Secure Payment", desc: "100% Secure Checkout" }
            ],
            testimonials: [
                { name: "Vijay D.", text: "Genuine Nepal bead. The lines are clear and it feels deeply resonant.", date: "02 Apr 2024" }
            ]
        },
        'spiritual-items': {
            title1: "Spiritual", titleEnd: "Treasures", 
            sub: "Curated collection of spiritual accessories to enhance your mindfulness journey.",
            cats: [
                { name: "Japa Malas", icon: "Church", color: "red" },
                { name: "Meditation Cushions", icon: "Heart", color: "rose" },
                { name: "Singing Bowls", icon: "Zap", color: "yellow" }
            ],
            items: [
                { name: "Handcrafted Sandalwood Mala", price: 599, desc: "Pure sandalwood beads for daily chanting.", cat: "Japa Malas", rating: 4.8, reviews: 40 },
                { name: "Tibetan Singing Bowl", price: 2800, desc: "Hand-hammered brass bowl for sound healing.", cat: "Singing Bowls", rating: 4.9, reviews: 12 }
            ],
            kits: [],
            badges: [
                { iconName: "CheckCircle", title: "Ethically Sourced", desc: "Sustainable Materials" },
                { iconName: "Award", title: "Blessed", desc: "Vedic Cleansing" },
                { iconName: "Truck", title: "Pan India Delivery", desc: "Safe Shipping" },
                { iconName: "ShieldCheck", title: "Secure Payment", desc: "100% Secure" }
            ],
            testimonials: [
                { name: "Elena G.", text: "The singing bowl has a tone that lingers for minutes. Exceptional craftsmanship.", date: "15 Mar 2024" }
            ]
        }
    };

    const def = shopDefaults[shopType] || shopDefaults['puja-samagri'];

    // 1. Content & Kits Seed
    await DynamicShopContent.findOneAndUpdate(
        { shopType },
        {
            heroBadge: "DIVINE SERVICES HUB",
            heroTitleHighlight1: def.title1,
            heroTitleEnd: def.titleEnd,
            heroSubtitle: def.sub,
            isActive: true,
            pujaKits: def.kits || [],
            trustBadges: def.badges || [],
            testimonials: def.testimonials || [],
            faqHeading: "Ancient Wisdom, Modern Support",
            faqs: [
                { question: "Are these items energized?", answer: "Yes, every item is personally energized by Acharya Ji through Vedic rituals before dispatch." },
                { question: "How to use these items?", answer: "We provide a specific vidhi (ritual guide) with every purchase." }
            ],
            ctaHeading: "Need Guidance For Sacred Choices?",
            ctaBadge: "Expert Vedic Consultation",
            ctaSubtitle: "Don't pick spiritual items at random. Let the ancient wisdom of Astrology guide your choice. Consult Acharya Ji to find exactly what aligns with your birth chart and energy nodes.",
            ctaButton1Text: "Talk To Expert",
            ctaButton1Link: "/astrologer",
            ctaButton2Text: "Need Assistance?",
            ctaButton2Link: `/contact`
        },
        { upsert: true, returnDocument: 'after' }
    );

    // 2. Categories Seed
    for (let i = 0; i < def.cats.length; i++) {
        const catObj = def.cats[i];
        const slug = catObj.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and');
        await DynamicShopCategory.findOneAndUpdate(
            { shopType, slug },
            { name: catObj.name, order: i + 1, isActive: true, icon: catObj.icon, color: catObj.color },
            { upsert: true, returnDocument: 'after' }
        );
    }

    // 3. Products Seed
    if (def.items) {
        for (const item of def.items) {
            const slug = `${shopType}-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
            await DynamicShopProduct.findOneAndUpdate(
                { shopType, slug },
                { 
                    name: item.name, 
                    price: item.price, 
                    description: item.desc, 
                    category: item.cat,
                    isActive: true,
                    rating: item.rating || 5.0,
                    reviewsCount: item.reviews || Math.floor(Math.random() * 100) + 10,
                    image: `/uploads/shop/default-${shopType}.webp` // Needs replacement post-upload in admin
                },
                { upsert: true, returnDocument: 'after' }
            );
        }
    }
}
