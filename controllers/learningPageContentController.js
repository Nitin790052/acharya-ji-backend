const LearningPageContent = require('../models/LearningPageContent');

// Seed Initial Data
exports.seedLearningHub = async (req, res) => {
    try {
        await LearningPageContent.deleteMany();

        const data = [
            {
                slug: "astrology",
                pageName: "Astrology Courses",
                isActive: true,
                introSection: {
                    badge: "Ancient Cosmic Science",
                    title: "Why Learn Jyotish Shastra?",
                    subtitle: "Jyotish Shastra is the ancient Indian science of light and planetary influence. It helps decode your destiny, relationships, and life path through cosmic alignment.",
                    highlightText: "Our structured courses help you master Vedic Astrology with live mentorship, practical case studies, and recognized certification.",
                    features: [
                        { icon: "Shield", label: "Vedic Basis" },
                        { icon: "Award", label: "Certification" },
                        { icon: "Users", label: "10,000+ Students" },
                        { icon: "PlayCircle", label: "Live Classes" }
                    ]
                },
                categories: [
                    { key: "beginner", label: "Beginner", icon: "Sprout", color: "from-orange-500 to-amber-500", items: ["Basic Astrology", "Numerology", "Palmistry Basics"] },
                    { key: "professional", label: "Professional", icon: "GraduationCap", color: "from-purple-600 to-indigo-600", items: ["Advanced Astrology", "Kundli Reading", "Muhurta Astrology"] },
                    { key: "spiritual", label: "Spiritual", icon: "Compass", color: "from-emerald-500 to-teal-500", items: ["Tarot Reading", "Advanced Palmistry", "Vastu Shastra"] }
                ],
                items: [
                    {
                        id: 1, slug: 'basic-astrology-course', title: 'Basic Astrology Foundation', duration: '8 Weeks', price: 4999, level: 'Beginner', rating: 4, students: 1234, category: 'beginner',
                        description: 'Start your cosmic journey with a solid grasp of Vedic astrology fundamentals.', modules: ['Introduction to Astrology', 'Zodiac Signs', 'Planets Meaning', 'Houses', 'Kundli Analysis']
                    },
                    {
                        id: 2, slug: 'numerology-essentials', title: 'Numerology Essentials', duration: '6 Weeks', price: 3999, level: 'Beginner', rating: 5, students: 892, category: 'beginner',
                        description: 'Master the cosmic science of numbers and decode your life path.', modules: ['Number Meanings', 'Life Path', 'Name Numerology', 'Predictions']
                    },
                    {
                        id: 3, slug: 'palmistry-beginners', title: 'Palmistry for Beginners', duration: '4 Weeks', price: 2999, level: 'Beginner', rating: 4, students: 567, category: 'beginner',
                        description: 'Learn to read palm lines and reveal hidden life secrets.', modules: ['Life Line', 'Heart Line', 'Fate Line', 'Mounts Analysis']
                    },
                    {
                        id: 4, slug: 'advanced-astrology-mastery', title: 'Advanced Astrology Mastery', duration: '12 Weeks', price: 12999, level: 'Professional', rating: 5, students: 445, category: 'professional', isFeatured: true,
                        description: 'Deep dive into complex Vedic astrology with expert-level techniques.', modules: ['Advanced Kundli', 'Dasha System', 'Transit Analysis', 'Predictive Methods']
                    },
                    {
                        id: 5, slug: 'kundli-reading', title: 'Professional Kundli Reading', duration: '10 Weeks', price: 9999, level: 'Professional', rating: 4, students: 678, category: 'professional',
                        description: 'Master the art of birth chart analysis for a professional practice.', modules: ['Birth Chart Analysis', 'Planetary Positions', 'Dosh Nivaran', 'Remedies']
                    },
                    {
                        id: 6, slug: 'muhurta-astrology', title: 'Muhurta Electional Astrology', duration: '8 Weeks', price: 7999, level: 'Professional', rating: 4, students: 334, category: 'professional',
                        description: 'Choose the most auspicious timing for life events using Vedic muhurta.', modules: ['Muhurta Calculation', 'Panchang Reading', 'Event Timing', 'Auspicious Days']
                    },
                    {
                        id: 7, slug: 'tarot-reading-mastery', title: 'Tarot Reading Mastery', duration: '6 Weeks', price: 5999, level: 'Spiritual', rating: 5, students: 789, category: 'spiritual',
                        description: 'Connect with divine guidance through the sacred art of Tarot reading.', modules: ['Major Arcana', 'Minor Arcana', 'Card Spreads', 'Intuitive Reading']
                    },
                    {
                        id: 8, slug: 'advanced-palmistry', title: 'Advanced Palmistry', duration: '8 Weeks', price: 6999, level: 'Spiritual', rating: 4, students: 456, category: 'spiritual',
                        description: 'Deepen your palm reading with advanced spiritual and esoteric techniques.', modules: ['Advanced Lines', 'Special Markings', 'Health Indicators', 'Career Lines']
                    },
                    {
                        id: 9, slug: 'vastu-shastra-fundamentals', title: 'Vastu Shastra Fundamentals', duration: '6 Weeks', price: 5499, level: 'Spiritual', rating: 4, students: 567, category: 'spiritual',
                        description: 'Harmonize your living spaces with ancient Vedic architectural wisdom.', modules: ['Five Elements', 'Direction Science', 'Energy Mapping', 'Remedies']
                    },
                    {
                        id: 10, slug: 'medical-astrology', title: 'Medical Astrology Expert', duration: '10 Weeks', price: 8499, level: 'Professional', rating: 5, students: 312, category: 'professional',
                        description: 'Understand the connection between planetary positions and physical health.', modules: ['Anatomy in Astrology', 'Disease Indicators', 'Planetary Health Remedies', 'Ayurvedic Connection']
                    },
                    {
                        id: 11, slug: 'financial-astrology', title: 'Wealth & Financial Astrology', duration: '8 Weeks', price: 8999, level: 'Professional', rating: 4, students: 245, category: 'professional',
                        description: 'Decode the timing of wealth, investment cycles, and financial growth.', modules: ['Wealth Houses', 'Stock Market Timing', 'Dhana Yogas', 'Debt Analysis']
                    }
                ],
                benefits: [
                    { icon: 'TrendingUp', title: 'Self Discovery', description: "Understand your true nature, strengths, and life purpose through the cosmic map of your birth chart." },
                    { icon: 'Briefcase', title: 'Career Guidance', description: "Make informed career decisions by understanding your planetary influences and cosmic timing." },
                    { icon: 'Heart', title: 'Relationship Insights', description: "Improve relationships by understanding compatibility, karmic connections, and synastry." },
                    { icon: 'IndianRupee', title: 'Financial Planning', description: "Time your investments and business decisions with proven astrological wisdom." },
                    { icon: 'Sun', title: 'Spiritual Growth', description: "Deepen your spiritual practice and understand your soul's karmic journey." },
                    { icon: 'Award', title: 'Professional Path', description: "Launch a rewarding career as a certified professional astrologer or consultant." },
                    { icon: 'Shield', title: 'Karmic Wisdom', description: "Learn how your past actions shape your current reality and how to navigate challenges with grace." }
                ],
                testimonials: [
                    { quote: "Acharya Ji's course completely transformed my understanding of astrology. Now I practice professionally and help hundreds of people.", author: 'Priya Sharma', role: 'Professional Astrologer' },
                    { quote: "The perfect blend of ancient wisdom and modern teaching. The live classes and personal attention from Acharya Ji are outstanding.", author: 'Rajesh Kumar', role: 'Software Engineer' },
                    { quote: "The spiritual courses deepened my practice immensely. I now incorporate astrological insights into my yoga classes daily.", author: 'Meera Patel', role: 'Yoga Teacher' },
                    { quote: "As a student of science, I was skeptical, but the logical depth of Vedic astrology taught here is mind-blowing.", author: 'Dr. Vivek Menon', role: 'Research Scientist' }
                ],
                faqs: [
                    { question: 'Do I need any prior knowledge of astrology?', answer: 'No, our beginner courses are designed for absolute beginners. We start from the basics and gradually build up to advanced concepts.' },
                    { question: 'How long are the courses?', answer: 'Course durations vary from 4 weeks for introductory courses to 12 weeks for advanced programs. Each course includes video lessons, PDF notes, and live sessions.' },
                    { question: 'Will I get a certificate after completion?', answer: 'Yes! All our courses come with a recognized certificate of completion that you can add to your professional profile.' },
                    { question: 'Are there live classes or are they pre-recorded?', answer: 'We offer both. Each course includes pre-recorded lessons for self-study, plus weekly live Q&A sessions with Acharya Ji.' },
                    { question: 'Can I become a professional astrologer after these courses?', answer: 'Absolutely. Our professional track courses prepare you for a successful astrology career with practical training and real case studies.' },
                    { question: 'Do you provide course materials?', answer: 'Yes, comprehensive PDF notes, worksheets, and study guides are provided for every module in all courses.' }
                ],
                ctaSection: {
                    badge: "Begin Your Cosmic Journey",
                    title: "Ready to Master Your Destiny?",
                    description: "Join thousands of students who have transformed their lives through ancient Vedic wisdom under Acharya Ji's guidance.",
                    primaryBtnText: "Explore Courses",
                    secondaryBtnText: "Free Consultation",
                    trustBadges: ["30-Day Money-Back Guarantee", "Lifetime Access", "Expert Certification"]
                }
            },
            {
                slug: "puja-vidhi",
                pageName: "Puja Vidhi Guides",
                isActive: true,
                introSection: {
                    badge: "Sacred Ritual Guidance",
                    title: "The Art of Vedic Worship",
                    subtitle: "Learn the precise method of performing sacred rituals and invocations. Understand the profound impact of connecting with the Divine daily.",
                    highlightText: "Master the traditional sequences, mudras, and mantras for authentic spiritual connection.",
                    features: [
                        { icon: "BookOpen", label: "Step-by-Step" },
                        { icon: "Award", label: "Precise Vidhi" },
                        { icon: "Sun", label: "Spiritual Purity" },
                        { icon: "CheckCircle", label: "Daily Rituals" }
                    ]
                },
                categories: [
                    { key: "beginner", label: "Daily Puja", icon: "Sprout", color: "from-amber-400 to-orange-400", items: ["Deepam Vidhi", "Ganesh Stuti", "Sandhya Vandanam"] },
                    { key: "professional", label: "Special Rituals", icon: "GraduationCap", color: "from-red-500 to-orange-600", items: ["Satyanarayan Vidhi", "Rudrabhishek", "Mritunjoy Havan"] },
                    { key: "spiritual", label: "Vedic Samskaras", icon: "Compass", color: "from-emerald-500 to-teal-500", items: ["Home Sanskar", "Naming Ceremony", "Annaprashan"] }
                ],
                items: [
                    {
                        id: 101, slug: 'daily-puja-essentials', title: 'Daily Puja Essentials', duration: '2 Weeks', price: 1999, level: 'Beginner', rating: 5, students: 500, category: 'beginner',
                        description: 'Transform your daily worship with correct mudras and chanting sequences.', modules: ['Sankalpa', 'Viniyoga', 'Nyasa', 'Panchopchar']
                    },
                    {
                        id: 102, slug: 'rudrabhishek-vidhi', title: 'Rudrabhishek Mastery', duration: '4 Weeks', price: 3499, level: 'Professional', rating: 5, students: 250, category: 'professional', isFeatured: true,
                        description: 'Step-by-step guidance on offering the most sacred ablution to Lord Shiva.', modules: ['Panchamrit Snan', 'Rudra Ashtadhyayi', 'Mantra Corrections']
                    },
                    {
                        id: 103, slug: 'ganesh-stuti-guide', title: 'Ganesh Chaturthi Vidhi', duration: '1 Week', price: 999, level: 'Beginner', rating: 4, students: 1200, category: 'beginner',
                        description: 'Comprehensive guide for performing Ganesh Sthapana and Visarjan rituals.', modules: ['Prana Pratishtha', 'Shodashopachara', 'Aarti Vidhi', 'Bhog Offering']
                    },
                    {
                        id: 104, slug: 'satyanarayan-katha-mastery', title: 'Satyanarayan Katha Vidhi', duration: '3 Weeks', price: 2499, level: 'Professional', rating: 5, students: 450, category: 'professional',
                        description: 'Learn to conduct the full Satyanarayan Puja including Katha recitation.', modules: ['Kalash Sthapana', 'Stories Learning', 'Havan Basics', 'Conclusion Rituals']
                    },
                    {
                        id: 105, slug: 'lakshmi-pujan-deepawali', title: 'Diwali Lakshmi Pujan', duration: '2 Weeks', price: 1499, level: 'Beginner', rating: 5, students: 2000, category: 'beginner',
                        description: 'Correct Vedic procedure for inviting wealth and prosperity during Diwali.', modules: ['Cleanliness Science', 'Laxmi Invocations', 'Kuber Puja', 'Deep Daan']
                    },
                    {
                        id: 106, slug: 'sandhya-vandanam-basics', title: 'Vedic Sandhya Vandanam', duration: '6 Weeks', price: 2999, level: 'Spiritual', rating: 5, students: 340, category: 'spiritual',
                        description: 'Master the ancient twilight ritual for mental clarity and spiritual power.', modules: ['Achamanam', 'Pranayama', 'Arghyam', 'Gayatri Japam']
                    }
                ],
                benefits: [
                    { icon: 'Sun', title: 'Ritual Precision', description: 'Learn the exact science behind every ritualistic action according to Shastras.' },
                    { icon: 'Heart', title: 'Devotional Bliss', description: 'Elevate your soul with pure devotion and exact execution.' },
                    { icon: 'Shield', title: 'Environmental Purity', description: 'Understand how Havans and Mantras cleanse the energy of your living space.' },
                    { icon: 'Sprout', title: 'Spiritual Discipline', description: 'Build a solid foundation of daily spiritual discipline for long-term growth.' },
                    { icon: 'Users', title: 'Family Harmony', description: 'Foster unity and divine vibration in your household through joint worship.' }
                ],
                testimonials: [
                    { quote: "Now my daily puja feels deeper and more meaningful thanks to these guides.", author: 'Aman Verma', role: 'Spiritual Seeker' },
                    { quote: "Finally learned the correct method for Rudrabhishek right from home.", author: 'Ankita Saxena', role: 'Devotee' },
                    { quote: "The step-by-step videos made it so easy to learn the complex Satyanarayan Vidhi.", author: 'Suresh Raina', role: 'Home Maker' },
                    { quote: "Vedic rituals used to intimidate me, but Acharya Ji explains them with such simplicity.", author: 'Kavita Joshi', role: 'Business Owner' }
                ],
                faqs: [
                    { question: 'What is included in the guide?', answer: 'Detailed videos, PDF manuals with Sanskrit verses and meanings.' },
                    { question: 'Do I need a physical priest to start?', answer: 'Our guides empower you to do your personal daily devotion independently.' },
                    { question: 'Can women learn these rituals?', answer: 'Yes, Vedic worship is open to all seekers based on devotion and purity of intent.' },
                    { question: 'What samagri do I need?', answer: 'A list of essential puja items is provided with every guide, along with modern alternatives if traditional items are unavailable.' }
                ],
                ctaSection: {
                    badge: "Transform Your Daily Life",
                    title: "Master the Art of Vedic Rituals",
                    description: "Bring divine vibrations into your home with step-by-step authentic puja guidance from certified experts.",
                    primaryBtnText: "View All Guides",
                    secondaryBtnText: "Schedule Puja",
                    trustBadges: ["Shastra Verified", "Step-by-Step Videos", "Ritual Checklist"]
                }
            },
            {
                slug: "mantra",
                pageName: "Mantra Chanting",
                isActive: true,
                introSection: {
                    badge: "Cosmic Sound Science",
                    title: "Mantra Sidhhi & Resonance",
                    subtitle: "Unlock the vibrational power of ancient Sanskrit Beej Mantras. Sound represents the primal forces of cosmic creation.",
                    highlightText: "Learn the correct pronunciation, breath control, and visualization for mantra power.",
                    features: [
                        { icon: "MessageSquare", label: "Pure Sanskrit" },
                        { icon: "TrendingUp", label: "High Vibration" },
                        { icon: "Shield", label: "Protective Sounds" },
                        { icon: "Award", label: "Mantra Diksha" }
                    ]
                },
                categories: [
                    { key: "beginner", label: "Shanti Mantras", icon: "Sprout", color: "from-blue-400 to-teal-400", items: ["Gayatri Mantra", "Maha Mrityunjaya", "Shanti Path"] },
                    { key: "spiritual", label: "Beej Mantras", icon: "Compass", color: "from-purple-500 to-pink-500", items: ["Shreem", "Hreem", "Kleem", "Aim"] },
                    { key: "professional", label: "Siddha Mantras", icon: "GraduationCap", color: "from-red-500 to-rose-500", items: ["Hanuman Chalisa", "Durga Saptashati", "Laxmi Stotram"] }
                ],
                items: [
                    {
                        id: 201, slug: 'gayatri-mantra-science', title: 'Science of Gayatri Mantra', duration: '4 Weeks', price: 2999, level: 'Spiritual', rating: 5, students: 780, category: 'beginner',
                        description: 'Understand the solar science and 24 syllables of the Gayatri Mantra.', modules: ['History', 'Pronunciation', 'Visualization', 'Prana-Pratistha']
                    },
                    {
                        id: 202, slug: 'maha-mrityunjaya-diksha', title: 'Maha Mrityunjaya Mastery', duration: '5 Weeks', price: 3999, level: 'Spiritual', rating: 5, students: 950, category: 'spiritual', isFeatured: true,
                        description: 'Learn the supreme healing mantra for vitality, protection, and longevity.', modules: ['Syllable Breakdown', 'Resonance Intonation', 'Protective Shielding']
                    },
                    {
                        id: 203, slug: 'hanuman-chalisa-vibration', title: 'Hanuman Chalisa Science', duration: '3 Weeks', price: 1599, level: 'Beginner', rating: 5, students: 3000, category: 'beginner',
                        description: 'Decode the energy points and protective vibrations of each verse.', modules: ['Meaning of Verses', 'Rhythmic Chanting', 'Sankat Mochan Power']
                    },
                    {
                        id: 204, slug: 'beej-mantra-sadhana', title: 'The Power of Beej Mantras', duration: '8 Weeks', price: 5999, level: 'Spiritual', rating: 5, students: 420, category: 'spiritual',
                        description: 'Master the single-syllable cosmic sounds that activate specific chakras.', modules: ['Root Meanings', 'Chakra Mapping', 'Internal Resonance', 'Mantra Writing']
                    },
                    {
                        id: 205, slug: 'durga-saptashati-mantras', title: 'Durga Saptashati Essentials', duration: '10 Weeks', price: 7499, level: 'Professional', rating: 4, students: 280, category: 'professional',
                        description: 'Learn the powerful protective mantras from the sacred text of Goddess Durga.', modules: ['Devi Kavacham', 'Argala Stotram', 'Keelakam', 'Navarna Mantra']
                    },
                    {
                        id: 206, slug: 'om-chanting-advanced', title: 'Advanced Om Chanting', duration: '4 Weeks', price: 1999, level: 'Spiritual', rating: 5, students: 1500, category: 'beginner',
                        description: 'Connect with the primal sound of the universe through A-U-M resonance.', modules: ['Breath Control', 'Sound Placement', 'Silent Chanting', 'Alpha State']
                    }
                ],
                benefits: [
                    { icon: 'Heart', title: 'Mental Peace', description: 'Harness the calming vibrations of sacred sounds to reduce stress and anxiety.' },
                    { icon: 'TrendingUp', title: 'Auric Protection', description: 'Build an energetic shield around your aura through constant resonance.' },
                    { icon: 'Sun', title: 'Chakra Activation', description: 'Specific mantras target and balance the energy centers in your subtle body.' },
                    { icon: 'Award', title: 'Intellectual Clarity', description: 'Mantra practice sharpens memory, enhances focus, and brings mental clarity.' },
                    { icon: 'Compass', title: 'Vibrational Healing', description: 'Sound frequencies interact with your nervous system for deep physical healing.' }
                ],
                testimonials: [
                    { quote: "The pronunciation guides are excellent. I finally feel the vibration properly.", author: 'Sita Ram', role: 'Meditation Teacher' },
                    { quote: "Om chanting has become my daily medicine. I feel much more centered now.", author: 'Dr. Rahul Gupta', role: 'Cardiologist' },
                    { quote: "Learning the Beej Mantras changed how I experience energy during yoga.", author: 'Elena Rossi', role: 'Yoga Practitioner' },
                    { quote: "Acharya Ji's voice guidance makes it so easy to catch the right intonation.", author: 'Vikram Seth', role: 'Artist' }
                ],
                faqs: [
                    { question: 'Is pronunciation important?', answer: 'Yes, in Mantra Shastra, the sound (varna) is as important as the intention.' },
                    { question: 'How many times should I chant?', answer: 'Traditionally, mantras are chanted 108 times (one Mala) per session.' },
                    { question: 'Can I chant mentally?', answer: 'Yes, mental chanting (Manasika Japa) is actually considered more powerful in advanced practice.' },
                    { question: 'Do I need a Rosary (Mala)?', answer: 'While helpful for counting and grounding, devotion and focus are the primary requirements.' },
                    { question: 'Are there any restrictions for chanting?', answer: 'Most mantras are for universal benefit, though a few specific Tantric mantras require Guru initiation.' }
                ],
                ctaSection: {
                    badge: "Resonate With the Universe",
                    title: "Unlock the Power of Sound",
                    description: "Experience absolute mental clarity and spiritual awakening through the ancient science of mantra chanting.",
                    primaryBtnText: "Start Chanting",
                    secondaryBtnText: "Mantra Diksha",
                    trustBadges: ["Authentic Pronunciation", "Audio Guides Included", "Spiritual Support"]
                }
            }
        ];

        for (const item of data) {
            await new LearningPageContent(item).save();
        }
        res.json({ message: 'Learning Hub seeded successfully' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// Get Overview for Admin
exports.getOverview = async (req, res) => {
    try {
        const slugs = ['astrology', 'puja-vidhi', 'mantra'];
        const overview = await Promise.all(slugs.map(async (slug) => {
            const page = await LearningPageContent.findOne({ slug });
            return {
                slug,
                itemCount: page?.items?.length || 0,
                benefitsCount: page?.benefits?.length || 0,
                testimonialsCount: page?.testimonials?.length || 0,
                faqsCount: page?.faqs?.length || 0,
                image: page?.introSection?.image || null,
                hasBranding: !!(page?.introSection?.title || page?.introSection?.badge || page?.introSection?.image),
                isActive: page ? page.isActive : true,
                updatedAt: page?.updatedAt
            };
        }));
        res.status(200).json({ success: true, data: overview });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Single Page by Slug (for frontend)
exports.getLearningPageBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = await LearningPageContent.findOne({ slug });
        if (!page) return res.status(404).json({ message: 'Page not found' });
        res.json(page);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// Update Portal Status
exports.updateStatus = async (req, res) => {
    try {
        const { slug } = req.params;
        const { isActive } = req.body;
        await LearningPageContent.findOneAndUpdate(
            { slug },
            { isActive },
            { new: true, upsert: true }
        );
        res.status(200).json({ success: true, message: `Portal ${isActive ? 'activated' : 'deactivated'}` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create Item (Course/Guide)
exports.createItem = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = await LearningPageContent.findOne({ slug });
        if (!page) return res.status(404).json({ message: 'Page not found' });

        const itemData = { ...req.body };
        if (req.file) {
            itemData.image = `/uploads/${req.file.filename}`;
        }
        if (itemData.modules && typeof itemData.modules === 'string') {
            itemData.modules = itemData.modules.split(',').map(m => m.trim());
        }

        // Auto-generate slug if missing
        if (!itemData.slug && itemData.title) {
            itemData.slug = itemData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }

        page.items.push(itemData);
        await page.save();
        res.status(201).json(page);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

// Update Item
exports.updateItem = async (req, res) => {
    try {
        const { slug, itemId } = req.params;
        const page = await LearningPageContent.findOne({ slug });
        if (!page) return res.status(404).json({ message: 'Page not found' });

        const itemIndex = page.items.findIndex(i => i._id.toString() === itemId);
        if (itemIndex === -1) return res.status(404).json({ message: 'Item not found' });

        const itemData = { ...req.body };
        if (req.file) {
            itemData.image = `/uploads/${req.file.filename}`;
        }
        if (itemData.modules && typeof itemData.modules === 'string') {
            itemData.modules = itemData.modules.split(',').map(m => m.trim());
        }

        page.items[itemIndex] = { ...page.items[itemIndex].toObject(), ...itemData };
        await page.save();
        res.json(page);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

// Delete Item
exports.deleteItem = async (req, res) => {
    try {
        const { slug, itemId } = req.params;
        const page = await LearningPageContent.findOne({ slug });
        if (!page) return res.status(404).json({ message: 'Page not found' });

        page.items = page.items.filter(i => i._id.toString() !== itemId);
        await page.save();
        res.json({ message: 'Item deleted successfully' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// Delete Media File
exports.deleteMedia = async (req, res) => {
    try {
        const { filePath } = req.body;
        if (!filePath) return res.status(400).json({ message: 'No file path provided' });

        const fs = require('fs');
        const path = require('path');
        const absolutePath = path.join(__dirname, '..', filePath);

        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
            res.json({ message: 'Media file purged from vessel' });
        } else {
            res.status(404).json({ message: 'File not found in archives' });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

// Update Page Settings
exports.updatePageSettings = async (req, res) => {
    try {
        const { slug } = req.params;
        const updated = await LearningPageContent.findOneAndUpdate({ slug }, req.body, { new: true });
        res.json(updated);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

exports.getAllPages = async (req, res) => {
    try {
        const pages = await LearningPageContent.find();
        res.json(pages);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
