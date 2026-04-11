const PujaStep = require('../models/PujaStep');
const PujaExpert = require('../models/PujaExpert');
const PujaSamagri = require('../models/PujaSamagri');
const FAQ = require('../models/FAQ');

// Generic function to handle data fetch
const getAll = (Model) => async (req, res) => {
    try {
        const items = await Model.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const create = (Model) => async (req, res) => {
    try {
        const item = await Model.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const update = (Model) => async (req, res) => {
    try {
        const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const remove = (Model) => async (req, res) => {
    try {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const toggleActive = (Model) => async (req, res) => {
    try {
        const item = await Model.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        item.isActive = !item.isActive;
        await item.save();
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Exports for Steps
exports.getAllSteps = getAll(PujaStep);
exports.createStep = create(PujaStep);
exports.updateStep = update(PujaStep);
exports.deleteStep = remove(PujaStep);
exports.toggleStep = toggleActive(PujaStep);

// Exports for Experts
exports.getAllExperts = getAll(PujaExpert);
exports.createExpert = create(PujaExpert);
exports.updateExpert = update(PujaExpert);
exports.deleteExpert = remove(PujaExpert);
exports.toggleExpert = toggleActive(PujaExpert);

// Exports for Samagri
exports.getAllSamagri = getAll(PujaSamagri);
exports.createSamagri = create(PujaSamagri);
exports.updateSamagri = update(PujaSamagri);
exports.deleteSamagri = remove(PujaSamagri);
exports.toggleSamagri = toggleActive(PujaSamagri);

// Exports for FAQ (specific to this page)
exports.getAllFAQs = getAll(FAQ);
exports.createFAQ = create(FAQ);
exports.updateFAQ = update(FAQ);
exports.deleteFAQ = remove(FAQ);
exports.toggleFAQ = toggleActive(FAQ);

// Seed Data
exports.seedBookPujaContent = async (req, res) => {
    try {
        // Steps
        await PujaStep.deleteMany({});
        await PujaStep.insertMany([
            { number: "1", title: "Select Puja", subtitle: "Browse catalog", hindiTitle: "अपनी पूजा चुनें", order: 1, fields: [] },
            { number: "2", title: "Date & Time", subtitle: "Pick a slot", hindiTitle: "तारीख और समय", order: 2, fields: [] },
            { number: "3", title: "Provide Info", subtitle: "Fill detail form", hindiTitle: "जानकारी दें", order: 3, fields: [
                { name: "name", label: "Full Name", placeholder: "Karan Singh", type: "text", required: true },
                { name: "mobile", label: "Mobile Number", placeholder: "98XXXXXXXX", type: "tel", required: true },
                { name: "city", label: "City / Location", placeholder: "Mumbai", type: "text", required: true },
                { name: "message", label: "Personal Message", placeholder: "Any specific requirements for your puja?", type: "textarea", required: false }
            ] },
            { number: "4", title: "Priest Match", subtitle: "Expert assigned", hindiTitle: "आचार्य नियुक्ति", order: 4, fields: [] },
            { number: "5", title: "Ritual Done", subtitle: "Divine blessings", hindiTitle: "पूजा संपन्न", order: 5, fields: [] }
        ]);

        // Experts
        await PujaExpert.deleteMany({});
        await PujaExpert.insertMany([
            { name: 'Pandit Raghunath Sharma', experience: '25+ years', expertise: 'Vedic Rituals & Havan', rating: 4.9, order: 1 },
            { name: 'Acharya Vishwanath Joshi', experience: '18+ years', expertise: 'Graha Dosh & Puja', rating: 4.8, order: 2 },
            { name: 'Pandit Hari Om Tiwari', experience: '20+ years', expertise: 'Marriage & Vivah Puja', rating: 4.9, order: 3 }
        ]);

        // Samagri
        await PujaSamagri.deleteMany({});
        await PujaSamagri.insertMany([
            { title: "Samagri Included", subtitle: "सभी आवश्यक सामग्री शामिल", description: "Pure and authenticated samagri provided for every ritual type.", order: 1 },
            { title: "Verified Sources", subtitle: "आचार्य द्वारा व्यवस्था", description: "Directly sourced from trusted Vedic material suppliers.", order: 2 },
            { title: "On-Time Arrival", subtitle: "घर पर उपलब्धता", description: "Materials delivered to your doorstep 1 hour before the puja.", order: 3 }
        ]);

        // FAQ
        await FAQ.deleteMany({});
        await FAQ.insertMany([
            { question: "Online puja kaise hoti hai?", answer: "Online puja में आचार्य जी video call के माध्यम से पूजा करते हैं। आप अपने घर से ही देख सकते हैं और पूजा में शामिल हो सकते हैं।" },
            { question: "Home visit puja में क्या include होता है?", answer: "Home visit में आचार्य जी आपके घर आकर पूजा करते हैं। सभी आवश्यक सामग्री और पूजा की पूर्ण विधि शामिल है।" },
            { question: "Kitne din pehle book karna chahiye?", answer: "सामान्य पूजा के लिए 2-3 दिन पहले और विशेष आयोजनों के लिए 7-10 दिन पहले बुक करना बेहतर है।" },
            { question: "Puja के बाद क्या follow करना होता है?", answer: "आचार्य जी पूजा के बाद आपको प्रसाद और विशेष आशीर्वाद निर्देश देंगे जिनका पालन करना शुभ होता है।" }
        ]);

        res.status(200).json({ message: 'Book Puja content seeded successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
