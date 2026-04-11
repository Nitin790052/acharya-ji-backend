const PujaOffering = require('../models/PujaOffering');
const fs = require('fs');
const path = require('path');

// @desc    Get all offerings
// @route   GET /api/puja-offerings
exports.getAllOfferings = async (req, res) => {
    try {
        const offerings = await PujaOffering.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json(offerings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching offerings' });
    }
};

// @desc    Get single offering by slug
// @route   GET /api/puja-offerings/:slug
exports.getOfferingBySlug = async (req, res) => {
    try {
        const offering = await PujaOffering.findOne({ slug: req.params.slug, isActive: true });
        if (!offering) return res.status(404).json({ message: 'Offering not found' });
        res.status(200).json(offering);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching offering' });
    }
};

// @desc    Update offering
exports.updateOffering = async (req, res) => {
    try {
        const offering = await PujaOffering.findById(req.params.id);
        if (!offering) return res.status(404).json({ message: 'Offering not found' });

        const data = { ...req.body };
        if (typeof data.serviceModes === 'string') data.serviceModes = JSON.parse(data.serviceModes);
        if (typeof data.benefits === 'string') data.benefits = JSON.parse(data.benefits);
        if (typeof data.faqs === 'string') data.faqs = JSON.parse(data.faqs);

        // Handle Main Image
        const mainImage = req.files?.find(f => f.fieldname === 'image');
        if (mainImage) {
            if (offering.imageUrl && !offering.imageUrl.startsWith('http')) {
                const oldPath = path.join(__dirname, '..', offering.imageUrl);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            data.imageUrl = `/uploads/puja-offerings/${mainImage.filename}`;
        }

        // Handle Service Mode Images
        if (data.serviceModes) {
            data.serviceModes = data.serviceModes.map((mode, idx) => {
                const modeImg = req.files?.find(f => f.fieldname === `serviceModeImage_${idx}`);
                if (modeImg) {
                    // Update image path
                    return { ...mode, imageUrl: `/uploads/puja-offerings/${modeImg.filename}` };
                }
                return mode;
            });
        }

        const updated = await PujaOffering.findByIdAndUpdate(req.params.id, data, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create offering
exports.createOffering = async (req, res) => {
    try {
        const data = { ...req.body };
        if (typeof data.serviceModes === 'string') data.serviceModes = JSON.parse(data.serviceModes);
        if (typeof data.benefits === 'string') data.benefits = JSON.parse(data.benefits);
        if (typeof data.faqs === 'string') data.faqs = JSON.parse(data.faqs);

        // Main Image
        const mainImage = req.files?.find(f => f.fieldname === 'image');
        data.imageUrl = mainImage ? `/uploads/puja-offerings/${mainImage.filename}` : '';

        // Service Mode Images
        if (data.serviceModes) {
            data.serviceModes = data.serviceModes.map((mode, idx) => {
                const modeImg = req.files?.find(f => f.fieldname === `serviceModeImage_${idx}`);
                if (modeImg) {
                    return { ...mode, imageUrl: `/uploads/puja-offerings/${modeImg.filename}` };
                }
                return mode;
            });
        }

        const offering = await PujaOffering.create(data);
        res.status(201).json(offering);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Seed offerings
// @route   POST /api/puja-offerings/seed
exports.seedOfferings = async (req, res) => {
    try {
        await PujaOffering.deleteMany({});
        const sampleOfferings = [
            {
                slug: 'satyanarayan-puja',
                title: 'Shree Satyanarayan Puja',
                shortDescription: 'Invite divine blessings and prosperity with the sacred Satyanarayan Puja.',
                longDescription: 'Shree Satyanarayan Puja is dedicated to Lord Vishnu. Performing this puja brings peace, happiness, and prosperity to the family. It is usually performed on Purnima (full moon day) or special occasions.',
                price: 2100,
                duration: '2 Hours',
                benefits: ['Wealth & Prosperity', 'Family Peace', 'Success in New Ventures', 'Mental Peace & Harmony'],
                serviceModes: [
                    { mode: 'Home Visit', title: 'Home Visit Puja', description: 'Experienced Pandit visits your home', price: 2100, points: ['Experienced Acharya', 'Full Samagri Included', 'Traditional Mantra Vidhi', 'Personal Connection'] },
                    { mode: 'Online', title: 'Online Video Puja', description: 'Live interactive session via video call', price: 1500, points: ['Live Interactive Session', 'Step-by-Step Guidance', 'Global Accessibility', 'Perfect for Busy Schedules'] },
                    { mode: 'Muhurat', title: 'Muhurat Consultation', description: 'Find the most auspicious time', price: 501, points: ['Personalized Kundli Check', 'Nakshatra Alignment', 'Exact Timing Guidance', 'Family Shanti Analysis'] }
                ],
                faqs: [
                    { question: 'When is the best time?', answer: 'It is most auspicious on Purnima or Ekadashi.' },
                    { question: 'What is required?', answer: 'Basic samagri and a peaceful environment.' }
                ],
                imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200',
                isActive: true, order: 1
            },
            {
                slug: 'griha-pravesh-puja',
                title: 'Authentic Griha Pravesh',
                shortDescription: 'Purify your new space and ensure a peaceful new beginning for your family.',
                longDescription: 'Ghar Pravesh is not just a ceremony; its a spiritual purification process that removes negative energy and invites divine protection. According to Vastu Shastra, performing this ritual on a shubh muhurat ensures that the residents live in harmony, health, and abundance.',
                price: 5100,
                duration: '3-4 Hours',
                benefits: ['Cleanses negative energy', 'Vastu Dosh correction', 'Invites Lakshmi ji', 'Family Happiness & Health'],
                faqs: [
                    { question: 'Why perform Griha Pravesh?', answer: 'It removes negative energy and invites divine protection for residents.' },
                    { question: 'Is Muhurat consultation included?', answer: 'Yes, our Acharyas will find the most auspicious time for your entry.' }
                ],
                imageUrl: 'https://images.unsplash.com/photo-1605146764387-e17b13c7bb14?w=1200',
                isActive: true, order: 2
            },
            {
                slug: 'rudrabhishek-puja',
                title: 'Maha Rudrabhishek Puja',
                shortDescription: 'Invoke the powerful blessings of Lord Shiva for health and well-being.',
                longDescription: 'Rudrabhishek is a ritual where various offerings are poured over the Shiva Lingam. It is known to cleanse sins and remove obstacles.',
                price: 4500,
                duration: '3 Hours',
                benefits: ['Health & Longevity', 'Removal of Negativity', 'Emotional Balance', 'Spiritual Awakening'],
                faqs: [{ question: 'Where is it performed?', answer: 'At home or in a temple.' }],
                imageUrl: 'https://images.unsplash.com/photo-1620313885637-23fbe2ccb552?w=1200',
                isActive: true, order: 3
            },
            {
                slug: 'ganesh-puja',
                title: 'Shree Ganesh Puja',
                shortDescription: 'Remove obstacles and start new beginnings with Lord Ganeshas blessings.',
                longDescription: 'Lord Ganesha is the Vighnaharta (remover of obstacles). This puja is essential before starting any new work, business, or ceremony.',
                price: 2500,
                duration: '1.5 Hours',
                benefits: ['Removes Obstacles', 'Success in Work', 'Wisdom & Knowledge', 'Protection from Evil'],
                faqs: [{ question: 'Who should do this?', answer: 'Anyone starting something new.' }],
                imageUrl: 'https://images.unsplash.com/photo-1567591974584-f1832dfdeb5c?w=1200',
                isActive: true, order: 4
            },
            {
                slug: 'laxmi-puja',
                title: 'Maha Laxmi Puja',
                shortDescription: 'Invite wealth, luck, and abundance with the Goddess of Fortune.',
                longDescription: 'Laxmi Puja is performed to welcome Goddess Laxmi into the home. It is most famous during Diwali but can be done for business growth anytime.',
                price: 3500,
                duration: '2 Hours',
                benefits: ['Financial Growth', 'Good Fortune', 'Business Success', 'Material Comforts'],
                faqs: [{ question: 'Best time?', answer: 'Friday or Diwali evening.' }],
                imageUrl: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?w=1200',
                isActive: true, order: 5
            },
            {
                slug: 'navgraha-shanti-puja',
                title: 'Navgraha Shanti Puja',
                shortDescription: 'Balance the celestial energies for a life of harmony and success.',
                longDescription: 'Navgraha Shanti is performed to appease the nine planets. This puja helps in removing the negative impacts of planets in your horoscope.',
                price: 4100,
                duration: '2.5 Hours',
                benefits: ['Celestial Harmony', 'Obstacle Removal', 'Peace of Mind', 'Career Stability'],
                faqs: [{ question: 'When to perform?', answer: 'As suggested by an astrologer after checking your kundli.' }],
                imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200',
                isActive: true, order: 6
            },
            {
                slug: 'vastu-shanti-puja',
                title: 'Vastu Shanti Puja',
                shortDescription: 'Ensure flow of positive energy in your home or office space.',
                longDescription: 'Vastu Shanti Puja is a Vedic ritual performed to fix any Vastu imbalances in a premises. It brings positive energy and prosperity to the residents.',
                price: 4500,
                duration: '3 Hours',
                benefits: ['Corrects Vastu Doshas', 'Family Health', 'Inner Peace', 'Environmental Harmony'],
                faqs: [{ question: 'Is it only for new homes?', answer: 'No, it can be done for old homes to refresh energy as well.' }],
                imageUrl: 'https://images.unsplash.com/photo-1605146764387-e17b13c7bb14?w=1200',
                isActive: true, order: 7
            },
            {
                slug: 'marriage-puja',
                title: 'Vedic Vivah Sanskar',
                shortDescription: 'A sacred union performed with complete Vedic rituals and blessings.',
                longDescription: 'The Hindu Vivah is a sacred union for life. We perform all steps including Kanyadaan, Saptapadi, and Sindoor rituals with deep devotion.',
                price: 11000,
                duration: '4-5 Hours',
                benefits: ['Soulful Union', 'Ancestral Blessings', 'Societal Bond', 'Dharmic Foundation'],
                faqs: [{ question: 'Do you provide Samagri?', answer: 'Yes, complete samagri is provided.' }],
                imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200',
                isActive: true, order: 8
            },
            {
                slug: 'pitru-dosh-puja',
                title: 'Pitru Dosh Nivaran',
                shortDescription: 'Seek forgiveness and blessings from your ancestors for lineage peace.',
                longDescription: 'Pitru Dosh Puja is dedicated to satisfying the spirits of ancestors. It is crucial for clearing obstacles in progeny and family growth.',
                price: 3500,
                duration: '2 Hours',
                benefits: ['Clears Lineage Obstacles', 'Success in Kids', 'Family Peace', 'Karmic Cleansing'],
                faqs: [{ question: 'Best place?', answer: 'Can be done at home or sacred locations like Haridwar/Gaya.' }],
                imageUrl: 'https://images.unsplash.com/photo-1567591974584-f1832dfdeb5c?w=1200',
                isActive: true, order: 9
            },
            {
                slug: 'havan-yagya',
                title: 'Maha Yagya & Havan',
                shortDescription: 'Purify the environment and self with the power of the Agni Devta.',
                longDescription: 'Havan is a sacred fire ritual where special herbs and ghee are offered to Agni. It purifies the air and provides divine protection to the participants.',
                price: 2500,
                duration: '1.5 Hours',
                benefits: ['Environment Purification', 'Stress Removal', 'Spiritual Energy', 'Protection from Evil'],
                faqs: [{ question: 'What samagri is needed?', answer: 'We provide pure desi ghee and specialized herbs (jadi-booti).' }],
                imageUrl: 'https://images.unsplash.com/photo-1620313885637-23fbe2ccb552?w=1200',
                isActive: true, order: 10
            }
        ];
        const created = await PujaOffering.insertMany(sampleOfferings);
        res.status(201).json({ message: 'Seeded successfully', count: created.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete offering
// @route   DELETE /api/puja-offerings/:id
exports.deleteOffering = async (req, res) => {
    try {
        const offering = await PujaOffering.findById(req.params.id);
        if (!offering) return res.status(404).json({ message: 'Offering not found' });

        if (offering.imageUrl && !offering.imageUrl.startsWith('http')) {
            const oldPath = path.join(__dirname, '..', offering.imageUrl);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        await PujaOffering.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Offering deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
