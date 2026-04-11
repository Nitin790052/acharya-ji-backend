const Course = require('../models/Course');
const CourseSettings = require('../models/CourseSettings');

exports.getAllCourses = async (req, res) => {
    try {
        const { type } = req.query;
        const filter = type ? { type } : {};
        const courses = await Course.find(filter).sort({ order: 1 });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCourseSettings = async (req, res) => {
    try {
        const { type } = req.params;
        const settings = await CourseSettings.findOne({ type });
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const courseData = { ...req.body };
        if (req.file) {
            courseData.imageUrl = `/uploads/${req.file.filename}`;
        }
        const newCourse = new Course(courseData);
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const courseData = { ...req.body };
        if (req.file) {
            courseData.imageUrl = `/uploads/${req.file.filename}`;
        }
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, courseData, { new: true });
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCourseSettings = async (req, res) => {
    try {
        const { type } = req.params;
        const settings = await CourseSettings.findOneAndUpdate(
            { type },
            req.body,
            { new: true, upsert: true }
        );
        res.status(200).json(settings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.seedCourses = async (req, res) => {
    try {
        const { type } = req.params;
        
        // Default data for Astrology
        if (type === 'astrology') {
            await Course.deleteMany({ type: 'astrology' });
            const sampleCourses = [
                {
                    title: 'Basic Astrology Foundation', slug: 'basic-astrology-course',
                    duration: '8 Weeks', price: 4999, level: 'Beginner', rating: 4, students: 1234,
                    category: 'beginner', description: 'Start your cosmic journey with a solid grasp of Vedic astrology fundamentals.',
                    modules: ['Introduction to Astrology', 'Zodiac Signs', 'Planets Meaning', 'Houses', 'Kundli Analysis'],
                    type: 'astrology', order: 1
                },
                {
                    title: 'Advanced Astrology Mastery', slug: 'advanced-astrology-mastery',
                    duration: '12 Weeks', price: 12999, level: 'Professional', rating: 5, students: 445,
                    category: 'professional', description: 'Deep dive into complex Vedic astrology with expert-level techniques.',
                    modules: ['Shadbala Analysis', 'Varga Charts', 'Dashas', 'Transit Predictions'],
                    type: 'astrology', order: 2
                }
            ];
            await Course.insertMany(sampleCourses);

            await CourseSettings.findOneAndUpdate(
                { type: 'astrology' },
                {
                    type: 'astrology',
                    badge: 'CELESTIAL WISDOM',
                    title: 'Master the Ancient',
                    titleHighlight: 'Science of Vedic Astrology',
                    subtitle: 'Embark on a transformative journey through the stars and planets.',
                    whyLearnItems: [
                        { icon: 'TrendingUp', title: 'Self Discovery', desc: 'Understand your life purpose through the cosmic map of your birth chart.' },
                        { icon: 'Briefcase', title: 'Career Guidance', desc: 'Make informed career decisions by understanding your planetary influences.' }
                    ],
                    testimonials: [
                        { quote: "Acharya Ji's course completely transformed my understanding. Now I practice professionally.", author: 'Priya Sharma', role: 'Professional Astrologer' }
                    ],
                    faqs: [
                        { q: 'Do I need prior knowledge?', a: 'No, our courses are designed for absolute beginners.' }
                    ]
                },
                { upsert: true }
            );
            return res.status(200).json({ message: 'Astrology courses seeded successfully' });
        }

        // Default data for Puja Vidhi
        if (type === 'puja-vidhi') {
            await Course.deleteMany({ type: 'puja-vidhi' });
            const sampleCourses = [
                {
                    title: 'Daily Sandhya Vandanam', slug: 'daily-sandhya-vidhi',
                    duration: '4 Weeks', price: 1999, level: 'Beginner', rating: 5, students: 560,
                    category: 'beginner', description: 'Learn the sacred daily rituals for spiritual purification and mental peace.',
                    modules: ['Achaman Vidhi', 'Pranayama', 'Arghya Danam', 'Gayatri Japam'],
                    type: 'puja-vidhi', order: 1
                },
                {
                    title: 'Satyanarayan Puja Vidhi', slug: 'satyanarayan-puja-mastery',
                    duration: '6 Weeks', price: 3499, level: 'Spiritual', rating: 5, students: 320,
                    category: 'spiritual', description: 'Complete step-by-step guide to performing Shree Satyanarayan Swami Vrat Katha.',
                    modules: ['Sankalp Vidhi', 'Kalash Sthapana', 'Katha Path', 'Havan Basics'],
                    type: 'puja-vidhi', order: 2
                }
            ];
            await Course.insertMany(sampleCourses);

            await CourseSettings.findOneAndUpdate(
                { type: 'puja-vidhi' },
                {
                    type: 'puja-vidhi',
                    badge: 'DIVINE RITUALS',
                    title: 'Unlock the Power of',
                    titleHighlight: 'Sacred Vedic Puja Vidhi',
                    subtitle: 'Learn to perform ancient rituals with precision and deep spiritual meaning.',
                    whyLearnItems: [
                        { icon: 'Shield', title: 'Home Purification', desc: 'Transform your living space with powerful Vedic energies and mantras.' },
                        { icon: 'Heart', title: 'Spiritual Discipline', desc: 'Develop a strong daily spiritual practice for long-term well-being.' }
                    ]
                },
                { upsert: true }
            );
            return res.status(200).json({ message: 'Puja Vidhi guides seeded successfully' });
        }

        // Default data for Mantra
        if (type === 'mantra') {
            await Course.deleteMany({ type: 'mantra' });
            const sampleCourses = [
                {
                    title: 'Bija Mantra Fundamentals', slug: 'bija-mantra-basics',
                    duration: '3 Weeks', price: 1499, level: 'Beginner', rating: 5, students: 890,
                    category: 'beginner', description: 'Master the core sounds of the universe to activate your chakras and energy centers.',
                    modules: ['Sound Science', 'Vowel Resonance', 'Chakra Bija Mantras', 'Mantra Japa Rules'],
                    type: 'mantra', order: 1
                },
                {
                    title: 'Mahamrityunjaya Mastery', slug: 'mahamrityunjaya-sadhana',
                    duration: '5 Weeks', price: 2999, level: 'Spiritual', rating: 5, students: 410,
                    category: 'spiritual', description: 'Intensive sadhana course on the great death-conquering mantra of Lord Shiva.',
                    modules: ['Mantra Origin', 'Correct Pronunciation', 'Anushthana Vidhi', 'Healing Effects'],
                    type: 'mantra', order: 2
                }
            ];
            await Course.insertMany(sampleCourses);

            await CourseSettings.findOneAndUpdate(
                { type: 'mantra' },
                {
                    type: 'mantra',
                    badge: 'SACRED SOUNDS',
                    title: 'Experience the Vibrations of',
                    titleHighlight: 'Divine Vedic Mantra Chanting',
                    subtitle: 'Master the art of sacred chanting to resonate with the frequencies of the universe.',
                    whyLearnItems: [
                        { icon: 'Sun', title: 'Mental Clarity', desc: 'Mantra chanting reduces stress and significantly improves focus and memory.' },
                        { icon: 'Zap', title: 'Vibrational Healing', desc: 'Use sound frequencies to balance your bio-field and physical body.' }
                    ]
                },
                { upsert: true }
            );
            return res.status(200).json({ message: 'Mantra courses seeded successfully' });
        }

        res.status(400).json({ message: 'Invalid course type for seeding' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOverview = async (req, res) => {
    try {
        const types = ['astrology', 'puja-vidhi', 'mantra'];
        const overview = await Promise.all(types.map(async (type) => {
            const courseCount = await Course.countDocuments({ type });
            const settings = await CourseSettings.findOne({ type });
            return {
                type,
                courseCount,
                whyLearnCount: settings?.whyLearnItems?.length || 0,
                testimonialsCount: settings?.testimonials?.length || 0,
                faqsCount: settings?.faqs?.length || 0,
                hasBranding: !!(settings?.title || settings?.badge),
                isActive: settings ? settings.isActive : true,
                updatedAt: settings?.updatedAt
            };
        }));
        res.status(200).json({ success: true, data: overview });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { type } = req.params;
        const { isActive } = req.body;
        let settings = await CourseSettings.findOne({ type });
        if (!settings) {
            settings = new CourseSettings({ type, isActive });
        } else {
            settings.isActive = isActive;
        }
        await settings.save();
        res.status(200).json({ success: true, message: `Portal ${isActive ? 'activated' : 'deactivated'}` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
