const mongoose = require('mongoose');

const contactSettingsSchema = new mongoose.Schema({
    quickContacts: [
        {
            title: String,
            desc: String,
            iconType: { type: String, enum: ['phone', 'message', 'award', 'mail'], default: 'phone' },
            action: String
        }
    ],
    supportInfo: {
        location: { type: String, default: 'Delhi NCR, India' },
        supportHours1: { type: String, default: 'Monday - Sunday' },
        supportHours2: { type: String, default: '8 AM - 10 PM' },
        serviceArea: { type: String, default: 'Pan-India & International (Online)' }
    },
    commitments: [
        { type: String }
    ],
    mapEmbedUrl: { type: String, default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754720782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1709999999999!5m2!1sen!2sin' }
}, {
    timestamps: true,
});

module.exports = mongoose.model('ContactSettings', contactSettingsSchema);
