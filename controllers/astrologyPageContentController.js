const AstrologyPageContent = require('../models/AstrologyPageContent');
const { deleteMedia } = require('../utils/mediaHandlers');

// Default seed data for all 8 astrology pages
const SEED_DATA = [
    {
        pageSlug: 'career-astrology',
        pageName: 'Career Astrology',
        hero: {
            badge: 'EXPERT CAREER ASTROLOGY',
            title: 'Unlock Your True',
            highlightedTitle: 'Professional Destiny',
            subtitle: 'Stop guessing your next career move. Let the ancient wisdom of Vedic Astrology guide you toward the success, wealth, and fulfillment you deserve.',
            imageUrl: 'https://images.unsplash.com/photo-1454165833741-9795d4071b51?w=1600&q=80',
            buttonText: 'Consult Expert Now',
            buttonLink: '/astrologer'
        },
        features: [
            { title: 'Path Discovery', description: 'Find the career path that aligns perfectly with your cosmic blueprint and natural talents.', iconName: 'Target' },
            { title: 'Timing & Progression', description: 'Know the exact planetary periods for job changes, promotions, and starting new ventures.', iconName: 'TrendingUp' },
            { title: 'Overcoming Obstacles', description: 'Identify hidden blockages in your professional life and get powerful Vedic remedies.', iconName: 'Shield' },
            { title: 'Business vs Job', description: 'Detailed analysis of your chart to determine if you are destined for entrepreneurship or corporate success.', iconName: 'Navigation' }
        ],
        deepDive: {
            badge: 'Vedic Accuracy',
            title: 'Is it the Right Time to',
            highlightedTitle: 'Change Jobs?',
            description: 'Your astrological birth chart contains an exact timing map (Dasha system) that reveals when cosmic forces are supporting your growth and when you should stay put.',
            imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
            checklist: ['Detailed analysis of your Dashamsha (D-10) Chart', 'Identification of favorable planetary transits', 'Remedies for continuous career growth', 'Guidance on foreign opportunities & settling abroad'],
            statLabel: 'Success Rate',
            statValue: '98%',
            buttonText: 'Connect with Career Specialist',
            buttonLink: '/astrologer'
        },
        steps: [
            { number: '01', title: 'Share Birth Details', description: 'Provide your exact date, time, and place of birth.' },
            { number: '02', title: 'Expert Analysis', description: 'Our astrologers analyze your 10th house (Career) and D-10 chart.' },
            { number: '03', title: 'Get Clarity', description: 'Receive a detailed roadmap, timelines, and powerful remedies.' }
        ],
        cta: {
            title: 'Take Control of Your Career Today',
            subtitle: 'Join thousands of professionals who have successfully transformed their careers using our astrological guidance.',
            buttonText: 'Book Your Session Now',
            buttonLink: '/astrologer'
        },
        faqs: [
            { question: 'How does career astrology work?', answer: 'Career astrology analyzes your birth chart, especially the 10th house and the Dashamsha (D-10) chart, to identify suitable career paths and favorable timings.' },
            { question: 'Can astrology predict the right career for me?', answer: 'Yes. By analyzing planetary positions in your 10th house and the Dasha periods, an astrologer can identify the industries and roles best suited for you.' },
            { question: 'When is the best time to change my job?', answer: 'The best time depends on your Mahadasha and Antardasha. Transit of Jupiter and Saturn over your 10th house plays a key role.' }
        ]
    },
    {
        pageSlug: 'marriage-astrology',
        pageName: 'Marriage Astrology',
        hero: {
            badge: 'MARRIAGE & COMPATIBILITY',
            title: 'Find Your Perfect',
            highlightedTitle: 'Life Partner',
            subtitle: 'Discover deep compatibility insights, auspicious wedding dates, and remedies for marital bliss through Vedic astrology.',
            imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80',
            buttonText: 'Consult Marriage Expert',
            buttonLink: '/astrologer'
        },
        features: [
            { title: 'Kundli Matching', description: 'Comprehensive Gun Milan (36 Guna) matching for perfect compatibility analysis.', iconName: 'Heart' },
            { title: 'Marriage Timing', description: 'Identify the most auspicious planetary periods for getting married using Dasha analysis.', iconName: 'Clock' },
            { title: 'Manglik Dosha', description: 'Accurate Manglik Dosha detection and powerful remedies to neutralize its effects.', iconName: 'Shield' },
            { title: 'Relationship Harmony', description: 'Vedic remedies to strengthen love, trust, and emotional bonding between partners.', iconName: 'Users' }
        ],
        deepDive: {
            badge: 'Ancient Wisdom',
            title: 'Is Your Partner Truly',
            highlightedTitle: 'Compatible?',
            description: 'Vedic astrology goes beyond surface-level compatibility. We analyze the 7th house, Venus placement, and Navamsha chart to reveal the deepest truths about your relationship.',
            imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
            checklist: ['Complete 36 Guna Milan analysis', 'Navamsha (D-9) chart compatibility check', 'Manglik & NPA Dosha verification', 'Post-marriage harmony remedies'],
            statLabel: 'Happy Couples',
            statValue: '5000+',
            buttonText: 'Get Compatibility Report',
            buttonLink: '/astrologer'
        },
        steps: [
            { number: '01', title: 'Share Both Charts', description: 'Provide birth details of both partners for analysis.' },
            { number: '02', title: 'Deep Matching', description: 'Our experts perform 36 Guna Milan and Navamsha analysis.' },
            { number: '03', title: 'Get Your Report', description: 'Receive compatibility score, predictions, and remedies.' }
        ],
        cta: {
            title: 'Begin Your Journey to Marital Bliss',
            subtitle: 'Let the stars guide you to a harmonious and fulfilling married life.',
            buttonText: 'Consult Marriage Astrologer',
            buttonLink: '/astrologer'
        },
        faqs: [
            { question: 'What is Kundli matching?', answer: 'Kundli matching (Gun Milan) compares 36 Gunas between two charts to determine compatibility for marriage.' },
            { question: 'What if Gunas are low?', answer: 'Low Guna score does not mean the marriage cannot happen. Our astrologers provide powerful Vedic remedies to overcome doshas.' },
            { question: 'Can astrology predict divorce?', answer: 'Astrology can identify challenging periods in marriage and provide remedies to strengthen the bond during difficult times.' }
        ]
    },
    {
        pageSlug: 'business-astrology',
        pageName: 'Business Astrology',
        hero: {
            badge: 'BUSINESS & WEALTH',
            title: 'Grow Your',
            highlightedTitle: 'Business Empire',
            subtitle: 'Leverage ancient Vedic wisdom to make smarter business decisions, find the perfect timing for ventures, and maximize your wealth potential.',
            imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
            buttonText: 'Consult Business Expert',
            buttonLink: '/astrologer'
        },
        features: [
            { title: 'Business Launch', description: 'Find the most auspicious Muhurta for starting your new business venture.', iconName: 'Rocket' },
            { title: 'Partnership Analysis', description: 'Analyze compatibility with potential business partners using their birth charts.', iconName: 'Users' },
            { title: 'Financial Growth', description: 'Understand your wealth houses (2nd, 11th) to maximize income and profits.', iconName: 'TrendingUp' },
            { title: 'Risk Assessment', description: 'Identify unfavorable planetary periods to avoid major financial decisions.', iconName: 'Shield' }
        ],
        deepDive: {
            badge: 'Strategic Insights',
            title: 'When Should You',
            highlightedTitle: 'Expand Your Business?',
            description: 'Your birth chart reveals the exact planetary windows when expansion, investment, and new partnerships will bring the highest returns.',
            imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
            checklist: ['Auspicious Muhurta for business registration', 'Analysis of 7th house for partnerships', 'Dasha-based financial forecasting', 'Vastu recommendations for office/shop'],
            statLabel: 'Business Success',
            statValue: '95%',
            buttonText: 'Get Business Consultation',
            buttonLink: '/astrologer'
        },
        steps: [
            { number: '01', title: 'Share Your Details', description: 'Provide your birth details and business type.' },
            { number: '02', title: 'Chart Analysis', description: 'Expert analysis of your wealth houses and Dasha periods.' },
            { number: '03', title: 'Growth Plan', description: 'Receive a strategic astrological roadmap for your business.' }
        ],
        cta: {
            title: 'Unlock Your Business Potential Today',
            subtitle: 'Make every business decision backed by the cosmic intelligence of Vedic astrology.',
            buttonText: 'Book Business Consultation',
            buttonLink: '/astrologer'
        },
        faqs: [
            { question: 'Can astrology help my business grow?', answer: 'Yes. By analyzing your 10th and 11th houses, astrologers can identify growth periods and recommend powerful remedies.' },
            { question: 'What is a business Muhurta?', answer: 'Muhurta is an auspicious time calculated using planetary positions, ideal for launching businesses, signing contracts, or starting new ventures.' },
            { question: 'Should I check partner compatibility?', answer: 'Absolutely. Analyzing the 7th house of both charts reveals partnership dynamics and potential challenges.' }
        ]
    },
    {
        pageSlug: 'health-astrology',
        pageName: 'Health Astrology',
        hero: {
            badge: 'HEALTH & WELLNESS',
            title: 'Discover Your',
            highlightedTitle: 'Health Blueprint',
            subtitle: 'Your birth chart reveals potential health vulnerabilities, the best healing approaches, and optimal times for medical procedures.',
            imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=80',
            buttonText: 'Consult Health Expert',
            buttonLink: '/astrologer'
        },
        features: [
            { title: 'Health Vulnerabilities', description: 'Identify potential health issues indicated by planetary positions in your birth chart.', iconName: 'Activity' },
            { title: 'Medical Timing', description: 'Find auspicious dates for surgeries, treatments, and medical procedures.', iconName: 'Calendar' },
            { title: 'Healing Remedies', description: 'Personalized Vedic remedies including mantras, gemstones, and lifestyle changes.', iconName: 'Leaf' },
            { title: 'Mental Wellness', description: 'Understand planetary effects on mental health and get remedies for stress and anxiety.', iconName: 'Brain' }
        ],
        deepDive: {
            badge: 'Vedic Health Science',
            title: 'What Does Your Chart Say About',
            highlightedTitle: 'Your Health?',
            description: 'The 6th house in your chart governs diseases, the 8th house longevity, and the 1st house overall vitality. Our experts analyze all three for a complete health picture.',
            imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
            checklist: ['6th, 8th, and 12th house health analysis', 'Planet-based body part vulnerability mapping', 'Favorable times for medical procedures', 'Ayurvedic and Vedic remedy recommendations'],
            statLabel: 'Wellness Score',
            statValue: '96%',
            buttonText: 'Get Health Analysis',
            buttonLink: '/astrologer'
        },
        steps: [
            { number: '01', title: 'Birth Details', description: 'Share your exact birth date, time, and place.' },
            { number: '02', title: 'Health Mapping', description: 'Expert analysis of health-related houses and planets.' },
            { number: '03', title: 'Wellness Plan', description: 'Receive preventive insights and healing remedies.' }
        ],
        cta: {
            title: 'Take Charge of Your Health Destiny',
            subtitle: 'Prevention is better than cure. Let astrology reveal your health roadmap before issues arise.',
            buttonText: 'Book Health Consultation',
            buttonLink: '/astrologer'
        },
        faqs: [
            { question: 'Can astrology predict health issues?', answer: 'Astrology can identify potential health vulnerabilities based on planetary positions, helping you take preventive measures.' },
            { question: 'Is this a replacement for medical advice?', answer: 'No. Astrological health analysis is complementary to medical science and should be used alongside professional medical care.' }
        ]
    },
    {
        pageSlug: 'numerology',
        pageName: 'Numerology',
        hero: {
            badge: 'SACRED NUMBERS',
            title: 'Decode the Power of',
            highlightedTitle: 'Your Numbers',
            subtitle: 'Every number in your life carries a vibration. Unlock the hidden meanings behind your birth date, name, and life path number.',
            imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1600&q=80',
            buttonText: 'Get Numerology Reading',
            buttonLink: '/astrologer'
        },
        features: [
            { title: 'Life Path Number', description: 'Discover your core purpose and the path your soul is meant to walk in this lifetime.', iconName: 'Hash' },
            { title: 'Name Correction', description: 'Align your name vibration with your destiny number for maximum success and harmony.', iconName: 'Edit' },
            { title: 'Lucky Numbers', description: 'Know your personal lucky numbers for important decisions, dates, and investments.', iconName: 'Star' },
            { title: 'Compatibility', description: 'Check numerical compatibility with your partner, business, or career choices.', iconName: 'Users' }
        ],
        deepDive: {
            badge: 'Number Science',
            title: 'What Does Your Birth Date',
            highlightedTitle: 'Reveal?',
            description: 'Your birth date is not random. It carries a specific numerical vibration that influences your personality, relationships, career, and even your health throughout life.',
            imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
            checklist: ['Life Path & Destiny Number calculation', 'Name numerology and correction suggestions', 'Personal year and month predictions', 'Business name numerology analysis'],
            statLabel: 'Readings Done',
            statValue: '10K+',
            buttonText: 'Get Your Numbers Decoded',
            buttonLink: '/astrologer'
        },
        steps: [
            { number: '01', title: 'Share Your Details', description: 'Provide your full name and date of birth.' },
            { number: '02', title: 'Number Analysis', description: 'Expert calculation of all your core numbers.' },
            { number: '03', title: 'Get Insights', description: 'Receive predictions and name correction suggestions.' }
        ],
        cta: {
            title: 'Discover the Magic of Your Numbers',
            subtitle: 'Numbers never lie. Unlock the secrets hidden in your birth date and name today.',
            buttonText: 'Start Numerology Reading',
            buttonLink: '/astrologer'
        },
        faqs: [
            { question: 'What is numerology?', answer: 'Numerology is the study of numbers and their influence on human life. It uses your birth date and name to calculate core numbers that reveal your life purpose.' },
            { question: 'Can changing my name help?', answer: 'Yes. Name correction aligns your name vibration with your destiny number, which can positively impact your career, relationships, and overall success.' }
        ]
    },
    {
        pageSlug: 'tarot-reading',
        pageName: 'Tarot Reading',
        hero: {
            badge: 'DIVINE TAROT',
            title: 'Unveil Your Future with',
            highlightedTitle: 'Tarot Cards',
            subtitle: 'Each card holds a message from the universe. Let our expert readers guide you through life decisions with clarity and wisdom.',
            imageUrl: 'https://images.unsplash.com/photo-1600429991827-5e15eed7649d?w=1600&q=80',
            buttonText: 'Get Tarot Reading',
            buttonLink: '/astrologer'
        },
        features: [
            { title: 'Love & Relationships', description: 'Understand the dynamics of your relationships and what the future holds for your love life.', iconName: 'Heart' },
            { title: 'Career Guidance', description: 'Get clarity on career decisions, job changes, and professional growth paths.', iconName: 'Briefcase' },
            { title: 'Yes or No', description: 'Quick single-card readings for immediate answers to your pressing questions.', iconName: 'HelpCircle' },
            { title: 'Spiritual Growth', description: 'Deep readings for spiritual awakening, past life insights, and soul purpose.', iconName: 'Sparkles' }
        ],
        deepDive: {
            badge: 'Ancient Cards',
            title: 'What Are the Cards',
            highlightedTitle: 'Saying About You?',
            description: 'Tarot is a mirror of your subconscious. Our certified readers use Major and Minor Arcana to provide deep insights into your past, present, and future.',
            imageUrl: 'https://images.unsplash.com/photo-1600429991827-5e15eed7649d?w=800&q=80',
            checklist: ['3-Card Spread (Past, Present, Future)', 'Celtic Cross for deep life analysis', 'Love spread for relationship clarity', 'Career-specific card reading'],
            statLabel: 'Accuracy',
            statValue: '97%',
            buttonText: 'Book Tarot Session',
            buttonLink: '/astrologer'
        },
        steps: [
            { number: '01', title: 'Choose Your Spread', description: 'Select from 3-card, Celtic Cross, or custom spreads.' },
            { number: '02', title: 'Focus Your Question', description: 'Concentrate on what you need guidance about.' },
            { number: '03', title: 'Receive Guidance', description: 'Get detailed interpretation and actionable advice.' }
        ],
        cta: {
            title: 'Let the Cards Speak to You',
            subtitle: 'Every card drawn carries a divine message meant just for you. Start your tarot journey today.',
            buttonText: 'Book Tarot Reading Now',
            buttonLink: '/astrologer'
        },
        faqs: [
            { question: 'How accurate is tarot reading?', answer: 'Tarot reading accuracy depends on the reader and your openness. Our certified readers consistently achieve 95%+ accuracy ratings.' },
            { question: 'Can tarot predict the future?', answer: 'Tarot reveals likely outcomes based on your current path. It empowers you to make informed decisions rather than rigid predictions.' }
        ]
    },
    {
        pageSlug: 'palmistry',
        pageName: 'Palmistry',
        hero: {
            badge: 'PALM READING',
            title: 'Your Hands Hold the Map to',
            highlightedTitle: 'Your Destiny',
            subtitle: 'The lines on your palm are unique to you. Discover what they reveal about your personality, love life, career, and health.',
            imageUrl: 'https://images.unsplash.com/photo-1611244419377-b0a760c19719?w=1600&q=80',
            buttonText: 'Get Palm Reading',
            buttonLink: '/astrologer'
        },
        features: [
            { title: 'Life Line', description: 'Understand your vitality, health trajectory, and major life transitions from your life line.', iconName: 'Activity' },
            { title: 'Heart Line', description: 'Decode your emotional nature, relationship patterns, and love destiny.', iconName: 'Heart' },
            { title: 'Head Line', description: 'Discover your intellectual capabilities, thinking style, and decision-making patterns.', iconName: 'Brain' },
            { title: 'Fate Line', description: 'Reveal your career path, fortune timing, and destiny changes throughout life.', iconName: 'TrendingUp' }
        ],
        deepDive: {
            badge: 'Hand Analysis',
            title: 'What Do Your Palm Lines',
            highlightedTitle: 'Reveal?',
            description: 'Palmistry (Hasta Rekha Shastra) is an ancient Vedic science. Your palm contains lines, mounts, and markings that form a unique blueprint of your entire life journey.',
            imageUrl: 'https://images.unsplash.com/photo-1611244419377-b0a760c19719?w=800&q=80',
            checklist: ['Major line analysis (Life, Heart, Head, Fate)', 'Mount analysis for personality traits', 'Marriage lines and children indicators', 'Wealth signs and lucky markings'],
            statLabel: 'Palm Readings',
            statValue: '8000+',
            buttonText: 'Consult Palm Reader',
            buttonLink: '/astrologer'
        },
        steps: [
            { number: '01', title: 'Share Palm Photos', description: 'Send clear photos of both your palms.' },
            { number: '02', title: 'Expert Analysis', description: 'Our palmist studies all lines, mounts, and markings.' },
            { number: '03', title: 'Get Your Reading', description: 'Receive comprehensive personality and life predictions.' }
        ],
        cta: {
            title: 'Read the Story Written on Your Palm',
            subtitle: 'Your palms are an open book. Let our experts read the chapters of your life.',
            buttonText: 'Start Palm Reading',
            buttonLink: '/astrologer'
        },
        faqs: [
            { question: 'Which hand should I show?', answer: 'Both hands are analyzed. The dominant hand shows your current path, while the non-dominant hand reveals your innate potential.' },
            { question: 'Do palm lines change?', answer: 'Yes, palm lines can change over time based on your actions, thoughts, and life experiences. This is why periodic readings are valuable.' }
        ]
    },
    {
        pageSlug: 'gemstone-suggestion',
        pageName: 'Gemstone Suggestion',
        hero: {
            badge: 'VEDIC GEMSTONES',
            title: 'Harness the Power of',
            highlightedTitle: 'Sacred Gemstones',
            subtitle: 'Each gemstone carries the energy of a specific planet. Wearing the right gem can transform your luck, health, relationships, and wealth.',
            imageUrl: 'https://images.unsplash.com/photo-1551122089-4e3e72477432?w=1600&q=80',
            buttonText: 'Get Gemstone Advice',
            buttonLink: '/astrologer'
        },
        features: [
            { title: 'Chart-Based Selection', description: 'Gemstone recommendations based on your unique birth chart and planetary positions.', iconName: 'Gem' },
            { title: 'Dosha Remedies', description: 'Neutralize Manglik, Sade Sati, and other doshas with the right planetary gemstones.', iconName: 'Shield' },
            { title: 'Wealth & Success', description: 'Activate your wealth houses and attract prosperity with carefully chosen stones.', iconName: 'TrendingUp' },
            { title: 'Quality Guidance', description: 'Expert advice on carat weight, quality parameters, and wearing instructions.', iconName: 'CheckCircle' }
        ],
        deepDive: {
            badge: 'Gem Science',
            title: 'Which Gemstone is',
            highlightedTitle: 'Right for You?',
            description: 'Wearing the wrong gemstone can cause harm. Our certified gemologists analyze your Lagna, Moon sign, and running Dasha to recommend the perfect stone.',
            imageUrl: 'https://images.unsplash.com/photo-1551122089-4e3e72477432?w=800&q=80',
            checklist: ['Birth chart-based gemstone selection', 'Carat weight and quality recommendations', 'Ring metal and wearing finger guidance', 'Energization (Pran Pratishtha) instructions'],
            statLabel: 'Gems Recommended',
            statValue: '15K+',
            buttonText: 'Get Gemstone Report',
            buttonLink: '/astrologer'
        },
        steps: [
            { number: '01', title: 'Birth Chart Analysis', description: 'Share your birth details for chart preparation.' },
            { number: '02', title: 'Gem Identification', description: 'Expert identifies the most beneficial gemstone for you.' },
            { number: '03', title: 'Wearing Guide', description: 'Receive detailed wearing instructions and energization rituals.' }
        ],
        cta: {
            title: 'Find Your Power Stone Today',
            subtitle: 'The right gemstone can change the course of your life. Get expert recommendations now.',
            buttonText: 'Consult Gemstone Expert',
            buttonLink: '/astrologer'
        },
        faqs: [
            { question: 'Can anyone wear any gemstone?', answer: 'No. Gemstones must be recommended based on your birth chart. Wearing the wrong stone can have adverse effects.' },
            { question: 'How long does a gemstone take to show results?', answer: 'Typically, you can feel the effects within 30-45 days of wearing a properly energized gemstone.' }
        ]
    }
];

const astrologyPageContentController = {
    // Get all pages
    getAllPages: async (req, res) => {
        try {
            const pages = await AstrologyPageContent.find().sort({ pageName: 1 });
            res.json(pages);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get single page by slug
    getPageBySlug: async (req, res) => {
        try {
            const page = await AstrologyPageContent.findOne({ pageSlug: req.params.slug });
            if (!page) return res.status(404).json({ message: 'Page not found' });
            res.json(page);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create or update a page
    upsertPage: async (req, res) => {
        try {
            let data = req.body;

            // If sent via FormData, sub-objects will be strings
            const jsonFields = ['hero', 'features', 'deepDive', 'steps', 'cta', 'faqs'];
            jsonFields.forEach(field => {
                if (typeof data[field] === 'string') {
                    try {
                        data[field] = JSON.parse(data[field]);
                    } catch (e) {
                        console.error(`Error parsing ${field}:`, e);
                    }
                }
            });

            // Handle Hero Image Upload or Fallback
            if (req.files && req.files.heroImage) {
                if (!data.hero) data.hero = {};
                // Cleanup old hero image
                const oldPage = await AstrologyPageContent.findOne({ pageSlug: data.pageSlug });
                if (oldPage?.hero?.imageUrl) await deleteMedia(oldPage.hero.imageUrl);
                
                data.hero.imageUrl = req.files.heroImage[0].path;
            } else if (!data.hero?.imageUrl) {
                const defaultSeed = SEED_DATA.find(s => s.pageSlug === data.pageSlug);
                if (defaultSeed?.hero?.imageUrl) {
                    if (!data.hero) data.hero = {};
                    data.hero.imageUrl = defaultSeed.hero.imageUrl;
                } else {
                    // Final generic fallback for brand new categories
                    if (!data.hero) data.hero = {};
                    data.hero.imageUrl = 'https://images.unsplash.com/photo-1532983330958-4b32bc9bb07d?w=1600&q=80';
                }
            }

            // Handle Deep Dive Image Upload or Fallback
            if (req.files && req.files.deepDiveImage) {
                if (!data.deepDive) data.deepDive = {};
                // Cleanup old deep dive image
                const oldPage = await AstrologyPageContent.findOne({ pageSlug: data.pageSlug });
                if (oldPage?.deepDive?.imageUrl) await deleteMedia(oldPage.deepDive.imageUrl);
                
                data.deepDive.imageUrl = req.files.deepDiveImage[0].path;
            } else if (!data.deepDive?.imageUrl) {
                const defaultSeed = SEED_DATA.find(s => s.pageSlug === data.pageSlug);
                if (defaultSeed?.deepDive?.imageUrl) {
                    if (!data.deepDive) data.deepDive = {};
                    data.deepDive.imageUrl = defaultSeed.deepDive.imageUrl;
                } else {
                    // Final generic fallback for brand new categories
                    if (!data.deepDive) data.deepDive = {};
                    data.deepDive.imageUrl = 'https://images.unsplash.com/photo-1532983330958-4b32bc9bb07d?w=800&q=80';
                }
            }

            const page = await AstrologyPageContent.findOneAndUpdate(
                { pageSlug: data.pageSlug },
                data,
                { upsert: true, runValidators: true, returnDocument: 'after' }
            );
            res.json(page);
        } catch (error) {
            console.error('Upsert Error:', error);
            res.status(400).json({ message: error.message });
        }
    },

    // Delete a page
    deletePage: async (req, res) => {
        try {
            const page = await AstrologyPageContent.findOne({ pageSlug: req.params.slug });
            if (!page) return res.status(404).json({ message: 'Page not found' });

            if (page.hero?.imageUrl) await deleteMedia(page.hero.imageUrl);
            if (page.deepDive?.imageUrl) await deleteMedia(page.deepDive.imageUrl);

            await AstrologyPageContent.findOneAndDelete({ pageSlug: req.params.slug });
            res.json({ message: 'Page deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Seed default data (recovers all pages)
    seedData: async (req, res) => {
        try {
            const { slugs } = req.body; // optional: array of specific slugs to seed
            let toSeed = SEED_DATA;
            if (slugs && slugs.length > 0) {
                toSeed = SEED_DATA.filter(s => slugs.includes(s.pageSlug));
            }

            const results = [];
            for (const seedItem of toSeed) {
                const existing = await AstrologyPageContent.findOne({ pageSlug: seedItem.pageSlug });
                if (!existing) {
                    const created = await AstrologyPageContent.create(seedItem);
                    results.push({ slug: seedItem.pageSlug, status: 'created' });
                } else {
                    results.push({ slug: seedItem.pageSlug, status: 'already_exists' });
                }
            }
            res.json({ message: 'Seed completed', results });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Force seed (overwrites existing data)
    forceSeed: async (req, res) => {
        try {
            const { slugs } = req.body;
            let toSeed = SEED_DATA;
            if (slugs && slugs.length > 0) {
                toSeed = SEED_DATA.filter(s => slugs.includes(s.pageSlug));
            }

            for (const seedItem of toSeed) {
                await AstrologyPageContent.findOneAndUpdate(
                    { pageSlug: seedItem.pageSlug },
                    seedItem,
                    { upsert: true, returnDocument: 'after' }
                );
            }
            res.json({ message: 'Force seed completed. All selected pages restored to defaults.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = astrologyPageContentController;
