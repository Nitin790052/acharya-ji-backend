const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');

dotenv.config({ path: './backend/.env' });

const coreServices = [
  { title: 'Puja Services', description: 'Online & Offline Puja', href: '/puja', icon: 'Flame', category: 'core', order: 1 },
  { title: 'Astrology Consultation', description: 'Expert Astrologers', href: '/astrology', icon: 'Moon', category: 'core', order: 2 },
  { title: 'Kundli Services', description: 'Birth Chart Analysis', href: '/kundli', icon: 'ScrollText', category: 'core', order: 3 },
  { title: 'Vastu & Remedies', description: 'Space Harmonization', href: '/vastu', icon: 'Shield', category: 'core', order: 4 },
  { title: 'Healing & Spiritual', description: 'Energy Cleansing', href: '/spiritual', icon: 'Leaf', category: 'core', order: 5 },
  { title: 'Shop', description: 'Samagri & Gemstones', href: '/shop', icon: 'ShoppingCart', category: 'core', order: 6 },
];

const detailedServices = [
  { title: 'Online Puja', description: 'Live virtual ceremonies conducted by experienced priests from sacred locations.', href: '/puja/online', icon: 'Video', category: 'detailed', order: 1 },
  { title: 'Home Visit Puja', description: 'Authentic rituals performed at your home by our certified pandits.', href: '/puja/offline', icon: 'Home', category: 'detailed', order: 2 },
  { title: 'Special Anushthan', description: 'Elaborate multi-day ceremonies for major life events and wishes.', href: '/puja/anushthan', icon: 'Star', category: 'detailed', order: 3 },
  { title: 'Puja Samagri', description: 'Premium quality puja items sourced from authentic suppliers.', href: '/samagri/essentials', icon: 'Package', category: 'detailed', order: 4 },
  { title: 'Prasad Delivery', description: 'Sacred offerings delivered fresh to your doorstep from temples.', href: '/products/prasad', icon: 'Truck', category: 'detailed', order: 5 },
  { title: 'Festival Specials', description: 'Curated packages for festivals with all essential items.', href: '/products/festival', icon: 'Gift', category: 'detailed', order: 6 },
];

const seedServices = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // Clear existing services
        await Service.deleteMany();
        
        // Add all services
        const allServices = [...coreServices, ...detailedServices];
        await Service.insertMany(allServices);
        
        console.log('Services seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding services:', error);
        process.exit(1);
    }
};

seedServices();
