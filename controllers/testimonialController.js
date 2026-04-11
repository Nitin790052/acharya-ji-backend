const Testimonial = require('../models/Testimonial');
const TestimonialSettings = require('../models/TestimonialSettings');
const fs = require('fs');
const path = require('path');

exports.getSettings = async (req, res) => {
    try {
        let s = await TestimonialSettings.findOne();
        if (!s) s = await TestimonialSettings.create({});
        res.json(s);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.updateSettings = async (req, res) => {
    try {
        let s = await TestimonialSettings.findOne();
        if (!s) s = await TestimonialSettings.create(req.body);
        else s = await TestimonialSettings.findOneAndUpdate({}, req.body, { new: true });
        res.json({ message: 'Updated', settings: s });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getAll = async (req, res) => {
    try {
        const data = await Testimonial.find().sort({ order: 1, createdAt: -1 });
        res.json(data);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getActive = async (req, res) => {
    try {
        const data = await Testimonial.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        res.json(data);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.create = async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.imageUrl = `/uploads/testimonials/${req.file.filename}`;
        
        data.rating = Number(req.body.rating) || 5;
        data.order = Number(req.body.order) || 0;
        data.isActive = req.body.isActive !== 'false' && req.body.isActive !== false;

        const doc = await Testimonial.create(data);
        res.status(201).json({ message: 'Created', testimonial: doc });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.update = async (req, res) => {
    try {
        const doc = await Testimonial.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Not found' });

        const fields = ['name', 'city', 'feedback', 'service', 'designation', 'date', 'readTime', 'order'];
        fields.forEach(f => { if (req.body[f] !== undefined) doc[f] = req.body[f]; });

        if (req.body.rating !== undefined) doc.rating = Number(req.body.rating);
        if (req.body.isActive !== undefined) doc.isActive = req.body.isActive !== 'false' && req.body.isActive !== false;

        if (req.file) {
            if (doc.imageUrl && doc.imageUrl.startsWith('/uploads/')) {
                const p = path.join(__dirname, '..', doc.imageUrl);
                if (fs.existsSync(p)) fs.unlinkSync(p);
            }
            doc.imageUrl = `/uploads/testimonials/${req.file.filename}`;
        }

        await doc.save();
        res.json({ message: 'Updated', testimonial: doc });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.remove = async (req, res) => {
    try {
        const doc = await Testimonial.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Not found' });
        if (doc.imageUrl && doc.imageUrl.startsWith('/uploads/')) {
            const p = path.join(__dirname, '..', doc.imageUrl);
            if (fs.existsSync(p)) fs.unlinkSync(p);
        }
        await Testimonial.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.seed = async (req, res) => {
    try {
        await Testimonial.deleteMany();
        const data = [
            { id: 1, name: 'Priya Sharma', city: 'Mumbai', rating: 5, feedback: 'The Griha Pravesh puja was performed beautifully. The pandit ji was very knowledgeable and explained everything clearly. Highly recommended!', service: 'Griha Pravesh Puja', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face', designation: 'Homeowner', date: '2 weeks ago', readTime: '2 min', order: 1 },
            { id: 2, name: 'Rajesh Kumar', city: 'Delhi', rating: 5, feedback: 'Excellent astrology consultation! The predictions were spot on and the remedies suggested really worked for my career growth.', service: 'Astrology Consultation', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face', designation: 'Professional', date: '3 weeks ago', readTime: '3 min', order: 2 },
            { id: 3, name: 'Anita Desai', city: 'Bangalore', rating: 5, feedback: 'Amazing Vastu consultation for our new office. Within 3 months we saw significant improvement in business.', service: 'Office Vastu', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face', designation: 'Entrepreneur', date: '1 month ago', readTime: '4 min', order: 3 },
            { id: 4, name: 'Vikram Singh', city: 'Jaipur', rating: 5, feedback: 'The kundli matching service was very detailed and accurate. It helped us make the right decision for our son\'s marriage.', service: 'Kundli Matching', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face', designation: 'Parent', date: '2 weeks ago', readTime: '5 min', order: 4 },
            { id: 5, name: 'Meera Patel', city: 'Ahmedabad', rating: 5, feedback: 'Very professional service. The Satyanarayan Katha was performed with complete authenticity. All family members were satisfied.', service: 'Satyanarayan Katha', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face', designation: 'Homemaker', date: '3 days ago', readTime: '3 min', order: 5 },
            { id: 6, name: 'Amit Verma', city: 'Pune', rating: 5, feedback: 'The gemstone recommendation was perfect for my Rashi. Noticed positive changes within weeks. Great consultation!', service: 'Gemstone Consultation', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face', designation: 'Executive', date: '1 week ago', readTime: '4 min', order: 6 }
        ];
        await Testimonial.insertMany(data);
        res.status(201).json({ message: 'Seeded!' });
    } catch (e) { res.status(500).json({ message: e.message }); }
};
