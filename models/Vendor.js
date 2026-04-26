const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const VendorSchema = new mongoose.Schema({
    // Initial Information (from CommonInfo)
    name: { 
        type: String, 
        required: [true, 'Please add a name'] 
    },
    email: { 
        type: String, 
        required: [true, 'Please add an email'], 
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    phone: { 
        type: String, 
        required: [true, 'Please add a phone number'],
        unique: true
    },
    password: { 
        type: String, 
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false 
    },
    role: { 
        type: String, 
        default: 'vendor' 
    },
    category: { 
        type: String, 
        required: [true, 'Please specify a category'] 
    },
    businessName: {
        type: String,
        trim: true
    },
    isOnline: {
        type: Boolean,
        default: true
    },
    
    // Document Details (from DocumentUploadSection)
    aadharNumber: { type: String },
    panNumber: { type: String },
    aadharFile: { type: String }, // Cloudinary URL
    panFile: { type: String },    // Cloudinary URL
    qualificationFile: { type: String }, // Cloudinary URL
    
    // Bank Details
    bankName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    bankFile: { type: String },   // Cloudinary URL
    
    // Category Specific Data (The rest of the form)
    categoryData: { type: mongoose.Schema.Types.Mixed },
    
    // Status & Approval
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    rejectionReason: String,
    
    // Profile Fields (Auto-populated or filled later)
    isVerified: { type: Boolean, default: false },
    rating: { type: Number, default: 5.0 },
    avatar: { type: String, default: '' },
    logo: { type: String, default: '' },
    registrationDate: { type: Date, default: Date.now }
}, { timestamps: true });

// Encrypt password
VendorSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match password
VendorSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Vendor', VendorSchema);
