const mongoose = require('mongoose');
const Vendor = require('./models/Vendor');

async function checkVendors() {
    try {
        await mongoose.connect('mongodb+srv://nitinkumar79005205_db_user:QE0o6sPJ9U9TYYwg@cluster0.askiz4p.mongodb.net/acharya_ji');
        console.log('Connected to DB');
        
        const categories = await Vendor.distinct('category');
        console.log('Existing Categories in DB:', categories);
        
        const templeVendors = await Vendor.find({ category: 'Temple Services' });
        console.log('Temple Services Vendors Count:', templeVendors.length);
        
        const allVendors = await Vendor.find({}).limit(5);
        console.log('Sample Vendors:', allVendors.map(v => ({ name: v.name, category: v.category })));
        
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

checkVendors();
