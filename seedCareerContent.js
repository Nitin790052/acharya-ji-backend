const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CareerContent = require('./models/CareerContent');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedData = [
  // Eligibility
  { type: 'eligibility', title: 'Pandit / Acharya', items: ["Puja performing skills", "Vedic knowledge", "Excellence in shastra", "3+ years exp"], order: 1 },
  { type: 'eligibility', title: 'Vedic Astrologer', items: ["Kundli analysis", "Horoscope matching", "Remedial guidance", "Scientific approach"], order: 2 },
  { type: 'eligibility', title: 'Vastu Consultant', items: ["Residential vastu", "Commercial analysis", "Map reading", "Practical remedies"], order: 3 },
  { type: 'eligibility', title: 'Healing Expert', items: ["Reiki practitioners", "Energy healers", "Chakra cleansing", "Wellness guidance"], order: 4 },

  // Benefits
  { type: 'benefit', icon: 'Users', title: 'Regular Bookings', description: 'Get consistent leads from verified global devotees.', order: 1 },
  { type: 'benefit', icon: 'TrendingUp', title: 'Flexible Income', description: 'Set your own schedule and earn as per your commitment.', order: 2 },
  { type: 'benefit', icon: 'Clock', title: 'Growth & Support', description: 'Dedicated technical team to support your online sessions.', order: 3 },
  { type: 'benefit', icon: 'Shield', title: 'Trust & Reputation', description: "Be part of India's most trusted spiritual platform.", order: 4 },
  { type: 'benefit', icon: 'BookOpen', title: 'Vedic Community', description: 'Collaborate with fellow learned experts and scholars.', order: 5 },
  { type: 'benefit', icon: 'Globe', title: 'Global Exposure', description: 'Reach clients in India and internationally without travel.', order: 6 },

  // Roles
  { type: 'role', icon: 'GraduationCap', title: 'Ritual Acharya', description: 'Expert in various Shanti Pujas, Havans, and festive rituals.', order: 1 },
  { type: 'role', icon: 'Award', title: 'Spiritual Guru', description: 'Guiding seekers through astrology and spiritual consultations.', order: 2 },
  { type: 'role', icon: 'Heart', title: 'Healing Master', description: 'Spreading positivity through Reiki and energy healing.', order: 3 },

  // Testimonials
  { type: 'testimonial', name: 'Pandit S. Jha', description: 'Acharya Ji Online gave me a platform to reach devotees worldwide while maintaining the sanctity of Vedic rituals.', location: 'Varanasi, India', order: 1 },
  { type: 'testimonial', name: 'Acharya R. Sharma', description: 'The most professional and respectful platform for spiritual experts. Timely payments and great support.', location: 'Haridwar, India', order: 2 },
  { type: 'testimonial', name: 'Dr. A. Verma', description: 'Joining this network expanded my astrology practice significantly. Truly a divine bridge to modern devotees.', location: 'Delhi, India', order: 3 }
];

const seedDB = async () => {
  try {
    await CareerContent.deleteMany({});
    await CareerContent.insertMany(seedData);
    console.log('Career Content Seeded Successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
