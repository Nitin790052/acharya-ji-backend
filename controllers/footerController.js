const FooterSettings = require('../models/FooterSettings');

exports.getSettings = async (req, res) => {
    try {
        let s = await FooterSettings.findOne();
        if (!s) s = await FooterSettings.create({
            serviceLinks: [
                { label: 'Book Your Puja', href: '/pujaServices/bookPuja' },
                { label: 'Online Consultations', href: '/astrologer' },
                { label: 'Two Bidders Ceremony', href: '/bidders' },
                { label: 'All Puja Services', href: '/pujaServices' }
            ],
            astrologyLinks: [
                { label: 'Free Kundli Generation', href: '/kundli' },
                { label: 'Kundli Matching', href: '/kundli' },
                { label: 'Talk to Astrologer', href: '/astrologer' },
                { label: 'Gemstone Suggestion', href: '/gemstone-suggestion' }
            ],
            companyLinks: [
                { label: 'About Acharya Ji', href: '/about' },
                { label: 'Divine Insights Blog', href: '/blog' },
                { label: 'Sacred Gallery', href: '/gallery' },
                { label: 'Contact for Guidance', href: '/contact' }
            ],
            productLinks: [
                { label: 'Sacred Puja Essentials', href: '/shop-puja-samagri' },
                { label: 'Gemstones & Crystals', href: '/gemstones' },
                { label: 'Blessed Yantra', href: '/yantra' },
                { label: 'Complete Puja Kits', href: '/shop-puja-samagri' }
            ]
        });
        res.json(s);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.updateSettings = async (req, res) => {
    try {
        let s = await FooterSettings.findOne();
        if (!s) s = await FooterSettings.create(req.body);
        else s = await FooterSettings.findOneAndUpdate({}, req.body, { new: true });
        res.json(s);
    } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.seed = async (req, res) => {
    try {
        await FooterSettings.deleteMany();
        const s = await FooterSettings.create({
            description: 'Bringing authentic Vedic traditions and sacred rituals to your doorstep with pure devotion and ancient wisdom.',
            facebookUrl: 'https://facebook.com',
            instagramUrl: 'https://instagram.com',
            twitterUrl: 'https://twitter.com',
            youtubeUrl: 'https://youtube.com',
            address: 'Varanasi, India - 221001',
            phone: '+91 98765 43210',
            email: 'guidance@acharyaji.com',
            serviceLinks: [
                { label: 'Book Your Puja', href: '/pujaServices/bookPuja' },
                { label: 'Online Consultations', href: '/astrologer' },
                { label: 'Two Bidders Ceremony', href: '/bidders' },
                { label: 'All Puja Services', href: '/pujaServices' }
            ],
            astrologyLinks: [
                { label: 'Free Kundli Generation', href: '/kundli' },
                { label: 'Kundli Matching', href: '/kundli' },
                { label: 'Talk to Astrologer', href: '/astrologer' },
                { label: 'Gemstone Suggestion', href: '/gemstone-suggestion' }
            ],
            companyLinks: [
                { label: 'About Acharya Ji', href: '/about' },
                { label: 'Divine Insights Blog', href: '/blog' },
                { label: 'Sacred Gallery', href: '/gallery' },
                { label: 'Contact for Guidance', href: '/contact' }
            ],
            productLinks: [
                { label: 'Sacred Puja Essentials', href: '/shop-puja-samagri' },
                { label: 'Gemstones & Crystals', href: '/gemstones' },
                { label: 'Blessed Yantra', href: '/yantra' },
                { label: 'Complete Puja Kits', href: '/shop-puja-samagri' }
            ]
        });
        res.json(s);
    } catch (e) { res.status(500).json({ message: e.message }); }
};
