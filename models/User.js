const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please add a name'] 
  },
  email: { 
    type: String, 
    required: [true, 'Please add an email'], 
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: { 
    type: String,
    required: [true, 'Please add a phone number']
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  password: { 
    type: String, 
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false 
  },
  status: {
    type: String,
    enum: ['active', 'blocked', 'pending'],
    default: 'active'
  },
  membershipType: { type: String, default: 'Free Member' },
  walletBalance: { type: Number, default: 0 },
  avatar: String,
  address: String,
  notificationSettings: {
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: true },
    whatsAppUpdates: { type: Boolean, default: false },
    promotionalEmails: { type: Boolean, default: true },
    bookingReminders: { type: Boolean, default: true },
    paymentAlerts: { type: Boolean, default: true },
    newsletter: { type: Boolean, default: false }
  },
  language: { type: String, default: 'English (India)' },
  theme: { type: String, default: 'light' },
  lastActive: { type: Date, default: Date.now },
  loginHistory: [{
    device: String,
    location: String,
    ip: String,
    timestamp: { type: Date, default: Date.now }
  }],
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
