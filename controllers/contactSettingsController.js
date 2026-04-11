const ContactSettings = require('../models/ContactSettings');

// Get Settings
exports.getSettings = async (req, res) => {
    try {
        let settings = await ContactSettings.findOne();
        if (!settings) {
            settings = await ContactSettings.findOneAndUpdate(
                {},
                {
                    quickContacts: [
                        { title: 'Call / WhatsApp', desc: 'Talk to our support team directly.', iconType: 'phone', action: '+91 98765 43210' },
                        { title: 'Talk to Astrologer', desc: 'Instant or scheduled consultation.', iconType: 'message', action: 'Book Now' },
                        { title: 'Book Puja', desc: 'Online or home-visit puja booking.', iconType: 'award', action: 'Book Puja' },
                        { title: 'Email Support', desc: 'Detailed queries & documents.', iconType: 'mail', action: 'support@acharyajionline.com' }
                    ],
                    commitments: [
                        "100% Confidentiality",
                        "No spam calls",
                        "Authentic Guidance",
                        "Transparent pricing"
                    ]
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
        }
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contact settings', error: error.message });
    }
};

// Update Settings
exports.updateSettings = async (req, res) => {
    try {
        const updateData = {};
        if (req.body.quickContacts) updateData.quickContacts = req.body.quickContacts;
        if (req.body.supportInfo) updateData.supportInfo = req.body.supportInfo;
        if (req.body.commitments) updateData.commitments = req.body.commitments;
        if (req.body.mapEmbedUrl) updateData.mapEmbedUrl = req.body.mapEmbedUrl;

        const settings = await ContactSettings.findOneAndUpdate(
            {},
            { $set: updateData },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        
        res.status(200).json({ message: 'Contact settings updated successfully', data: settings });
    } catch (error) {
        res.status(500).json({ message: 'Error updating contact settings', error: error.message });
    }
};

// Seed Settings
exports.seedSettings = async (req, res) => {
    try {
        await ContactSettings.deleteMany();
        const settings = await ContactSettings.create({
            quickContacts: [
                { title: 'Call / WhatsApp', desc: 'Talk to our support team directly.', iconType: 'phone', action: '+91 98765 43210' },
                { title: 'Talk to Astrologer', desc: 'Instant or scheduled consultation.', iconType: 'message', action: 'Book Now' },
                { title: 'Book Puja', desc: 'Online or home-visit puja booking.', iconType: 'award', action: 'Book Puja' },
                { title: 'Email Support', desc: 'Detailed queries & documents.', iconType: 'mail', action: 'support@acharyajionline.com' }
            ],
            supportInfo: {
                location: 'Delhi NCR, India',
                supportHours1: 'Monday - Sunday',
                supportHours2: '8 AM - 10 PM',
                serviceArea: 'Pan-India & International (Online)'
            },
            commitments: [
                "100% Confidentiality",
                "No spam calls",
                "Authentic Guidance",
                "Transparent pricing"
            ],
            mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754720782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1709999999999!5m2!1sen!2sin'
        });
        res.status(201).json({ message: 'Contact settings seeded successfully', settings });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding contact settings', error: error.message });
    }
};
