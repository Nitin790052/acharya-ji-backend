const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function check() {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/acharya_ji');
    const db = mongoose.connection.db;
    
    // Check Users collection
    const users = await db.collection('users').find({ phone: '7983060387' }).toArray();
    console.log('\n=== USERS with phone 7983060387 ===');
    users.forEach(u => console.log(`  Name: ${u.name}, Email: ${u.email}, Phone: ${u.phone}, Role: ${u.role || 'user'}`));
    
    // Check Vendors collection  
    const vendors = await db.collection('vendors').find({ phone: '7983060387' }).toArray();
    console.log('\n=== VENDORS with phone 7983060387 ===');
    if (vendors.length === 0) console.log('  (none found)');
    vendors.forEach(v => console.log(`  Name: ${v.name}, Email: ${v.email}, Phone: ${v.phone}, Role: ${v.role}`));

    // Check by name
    const usersByName = await db.collection('users').find({ name: /vansh/i }).toArray();
    console.log('\n=== ALL USERS with "vansh" in name ===');
    usersByName.forEach(u => console.log(`  Name: ${u.name}, Email: ${u.email}, Phone: ${u.phone}, Role: ${u.role || 'user'}`));
    
    const vendorsByName = await db.collection('vendors').find({ name: /vansh/i }).toArray();
    console.log('\n=== ALL VENDORS with "vansh" in name ===');
    if (vendorsByName.length === 0) console.log('  (none found)');
    vendorsByName.forEach(v => console.log(`  Name: ${v.name}, Email: ${v.email}, Phone: ${v.phone}, Category: ${v.category}, Status: ${v.status}`));
    
    process.exit(0);
}
check();
