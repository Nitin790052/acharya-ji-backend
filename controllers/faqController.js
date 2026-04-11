const FAQ = require('../models/FAQ');
const FAQSettings = require('../models/FAQSettings');

// FAQ CRUD
exports.getAll = async (req, res) => {
    try {
        const faqs = await FAQ.find().sort({ order: 1 });
        res.json(faqs);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getActive = async (req, res) => {
    try {
        const faqs = await FAQ.find({ isActive: true }).sort({ order: 1 });
        res.json(faqs);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.create = async (req, res) => {
    try {
        const faqs = await FAQ.create(req.body);
        res.status(201).json(faqs);
    } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.update = async (req, res) => {
    try {
        const faqs = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(faqs);
    } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.remove = async (req, res) => {
    try {
        await FAQ.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

// Settings
exports.getSettings = async (req, res) => {
    try {
        let s = await FAQSettings.findOne();
        if (!s) s = await FAQSettings.create({});
        res.json(s);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.updateSettings = async (req, res) => {
    try {
        let s = await FAQSettings.findOne();
        if (!s) s = await FAQSettings.create(req.body);
        else s = await FAQSettings.findOneAndUpdate({}, req.body, { new: true });
        res.json(s);
    } catch (e) { res.status(400).json({ message: e.message }); }
};

// Seed
exports.seed = async (req, res) => {
    try {
        const initial = [
            { question: "How do I book a puja service?", answer: "You can book a puja service through our website by selecting the type of puja, choosing a date/time, and making the payment. Our team will verify and assign an experienced priest.", order: 1 },
            { question: "Are your priests verified and experienced?", answer: "Absolutely. All our priests undergo a thorough verification process including background checks and Vedic knowledge assessment to ensure authentic rituals.", order: 2 },
            { question: "How does the online puja work?", answer: "The puja is conducted via secure video call where our priests perform rituals at our sacred facility. You can witness the entire ceremony live and participate from home.", order: 3 },
            { question: "Will I receive prasad for online pujas?", answer: "Yes, we courier the blessed prasad to your address within 3-5 business days after the puja completion, packed hygienically and with divine care.", order: 4 },
            { question: "What payment methods do you accept?", answer: "We accept all major payment methods including credit/debit cards, UPI, net banking, and digital wallets. All transactions are 100% secure and encrypted.", order: 5 },
            { question: "Can I consult with a priest before booking?", answer: "Yes! We offer free 15-minute consultations with our experienced priests to help you choose the right puja and understand the auspicious timings.", order: 6 }
        ];
        await FAQ.deleteMany();
        const data = await FAQ.insertMany(initial);
        res.json(data);
    } catch (e) { res.status(500).json({ message: e.message }); }
};
