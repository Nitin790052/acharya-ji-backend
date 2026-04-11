const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CareerContent = require('../models/CareerContent');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const seedData = [
  // Eligibility
  {
    type: 'eligibility',
    title: 'PANDIT / ACHARYA',
    icon: 'Star',
    items: ['Puja performing skills', 'Vedic knowledge', 'Excellence in shastra', '3+ years exp'],
    order: 1,
    isActive: true
  },
  {
    type: 'eligibility',
    title: 'VEDIC ASTROLOGER',
    icon: 'Star',
    items: ['Kundli analysis', 'Horoscope matching', 'Remedial guidance', 'Scientific approach'],
    order: 2,
    isActive: true
  },
  {
    type: 'eligibility',
    title: 'VASTU CONSULTANT',
    icon: 'Star',
    items: ['Residential vastu', 'Commercial analysis', 'Map reading', 'Practical remedies'],
    order: 3,
    isActive: true
  },
  {
    type: 'eligibility',
    title: 'HEALING EXPERT',
    icon: 'Star',
    items: ['Reiki practitioners', 'Energy healers', 'Chakra cleansing', 'Wellness guidance'],
    order: 4,
    isActive: true
  },

  // Benefits
  {
    type: 'benefit',
    title: 'Regular Bookings',
    icon: 'Users',
    description: 'Get consistent leads from verified global devotees.',
    order: 1,
    isActive: true
  },
  {
    type: 'benefit',
    title: 'Flexible Income',
    icon: 'TrendingUp',
    description: 'Set your own schedule and earn as per your commitment.',
    order: 2,
    isActive: true
  },
  {
    type: 'benefit',
    title: 'Growth & Support',
    icon: 'Clock',
    description: 'Dedicated technical team to support your online sessions.',
    order: 3,
    isActive: true
  },
  {
    type: 'benefit',
    title: 'Trust & Reputation',
    icon: 'Shield',
    description: "Be part of India's most trusted spiritual platform.",
    order: 4,
    isActive: true
  },
  {
    type: 'benefit',
    title: 'Vedic Community',
    icon: 'BookOpen',
    description: 'Collaborate with fellow learned experts and scholars.',
    order: 5,
    isActive: true
  },
  {
    type: 'benefit',
    title: 'Global Exposure',
    icon: 'Globe',
    description: 'Reach clients in India and internationally without travel.',
    order: 6,
    isActive: true
  },

  // Roles
  {
    type: 'role',
    title: 'Ritual Acharya',
    icon: 'GraduationCap',
    description: 'Expert in various Shanti Pujas, Havans, and festive rituals.',
    order: 1,
    isActive: true
  },
  {
    type: 'role',
    title: 'Spiritual Guru',
    icon: 'Award',
    description: 'Guiding seekers through astrology and spiritual consultations.',
    order: 2,
    isActive: true
  },
  {
    type: 'role',
    title: 'Healing Master',
    icon: 'Heart',
    description: 'Spreading positivity through Reiki and energy healing.',
    order: 3,
    isActive: true
  },

  // Testimonials
  {
    type: 'testimonial',
    name: 'Pandit S. Jha',
    location: 'Varanasi, India',
    description: 'Acharya Ji Online gave me a platform to reach devotees worldwide while maintaining the sanctity of Vedic rituals.',
    order: 1,
    isActive: true
  },
  {
    type: 'testimonial',
    name: 'Acharya R. Sharma',
    location: 'Haridwar, India',
    description: 'The most professional and respectful platform for spiritual experts. Timely payments and great support.',
    order: 2,
    isActive: true
  },
  {
    type: 'testimonial',
    name: 'Dr. A. Verma',
    location: 'Delhi, India',
    description: 'Joining this network expanded my astrology practice significantly. Truly a divine bridge to modern devotees.',
    order: 3,
    isActive: true
  }
];

const seedDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://localhost:27017/acharya_ji';
    await mongoose.connect(connStr);
    console.log('MongoDB Connected...');

    // Clear existing content
    await CareerContent.deleteMany({ type: { $in: ['eligibility', 'benefit', 'role', 'testimonial'] } });
    console.log('Existing Career content cleared.');

    // Seed data
    await CareerContent.insertMany(seedData);
    console.log('Career Content Seeded Successfully!');

    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
