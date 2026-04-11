const User = require('../models/User');
const Otp = require('../models/Otp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// Helper to generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

/**
 * @desc    Get all users with filtering and pagination
 * @route   GET /api/users
 */
exports.getUsers = async (req, res) => {
    try {
        const { status, searchTerm, page = 1, limit = 10 } = req.query;

        const query = {};

        if (status && status !== 'all') {
            query.status = status;
        }

        if (searchTerm) {
            query.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } },
                { phone: { $regex: searchTerm, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;

        const users = await User.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await User.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: users
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get system-wide user statistics
 * @route   GET /api/users/stats
 */
exports.getUserStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ status: 'active' });
        const blockedUsers = await User.countDocuments({ status: 'blocked' });

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const newThisMonth = await User.countDocuments({ createdAt: { $gte: startOfMonth } });

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                activeUsers,
                blockedUsers,
                newThisMonth
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get individual user profile
 * @route   GET /api/users/:id
 */
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Update user status (Block/Unblock)
 * @route   PATCH /api/users/:id/status
 */
exports.updateUserStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['active', 'blocked'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status },
            { returnDocument: 'after', runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: `User status updated to ${status}`,
            data: user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Permanently delete a user
 * @route   DELETE /api/users/:id
 */
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User removed from system' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Send OTP to mobile or email
 * @route   POST /api/users/send-otp
 */
exports.sendOtp = async (req, res) => {
    try {
        const { identifier, type } = req.body;
        if (!identifier) {
            return res.status(400).json({ success: false, message: 'Please provide email or phone' });
        }

        const otp = generateOTP();
        await Otp.findOneAndUpdate(
            { identifier },
            { otp, createdAt: new Date() },
            { upsert: true, returnDocument: 'after' }
        );

        console.log(`OTP for ${identifier}: ${otp}`);

        // If type is email, send actual email
        if (type === 'email' || identifier.includes('@')) {
            try {
                await sendEmail({
                    email: identifier,
                    subject: 'Verification OTP - Acharya Ji Online',
                    message: `
                        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #f0f0f0;">
                            <!-- Header with Gradient -->
                            <div style="background: linear-gradient(135deg, #f97316 0%, #fbbf24 100%); padding: 40px 20px; text-align: center;">
                                <div style="display: inline-block; background: white; padding: 10px; border-radius: 15px; margin-bottom: 15px;">
                                    <h1 style="margin: 0; color: #f97316; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Acharya Ji</h1>
                                </div>
                                <h2 style="color: white; margin: 0; font-size: 18px; font-weight: 400; opacity: 0.9;">Secure Verification Code</h2>
                            </div>
                            
                            <!-- Body -->
                            <div style="padding: 40px 30px; text-align: center;">
                                <p style="color: #64748b; font-size: 14px; margin-top: 0; margin-bottom: 25px;">नमस्ते, </p>
                                <p style="color: #1e293b; font-size: 16px; font-weight: 500; margin-bottom: 30px; line-height: 1.6;">
                                    आपके अकाउंट वेरिफिकेशन के लिए आपका 6-डिजिट का वन-टाइम पासवर्ड (OTP) यहाँ दिया गया है:
                                </p>
                                
                                <div style="background-color: #fff7ed; border: 2px dashed #fdba74; padding: 25px; border-radius: 16px; margin-bottom: 30px;">
                                    <span style="font-size: 36px; font-weight: 800; color: #f97316; letter-spacing: 12px; font-family: 'Courier New', Courier, monospace;">${otp}</span>
                                </div>
                                
                                <p style="color: #94a3b8; font-size: 12px; margin-bottom: 0;">
                                    यह कोड 5 मिनट के लिए मान्य है।<br>
                                    यदि आपने यह रिक्वेस्ट नहीं की है, तो कृपया इस ईमेल को अनदेखा करें।
                                </p>
                            </div>
                            
                            <!-- Footer -->
                            <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #f1f5f9;">
                                <p style="color: #cbd5e1; font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
                                    © 2026 Acharya Ji Online • Securely Protected
                                </p>
                            </div>
                        </div>
                    `
                });
                console.log(`Email successfully sent to ${identifier}`);
            } catch (err) {
                console.error(`FAILED to send email to ${identifier}:`, err.message);
            }
        }

        res.status(200).json({
            success: true,
            message: `OTP sent to your ${type}`,
            debugOtp: process.env.NODE_ENV === 'development' ? otp : undefined
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Verify OTP
 * @route   POST /api/users/verify-otp
 */
exports.verifyOtp = async (req, res) => {
    try {
        const { identifier, otp } = req.body;
        const otpDoc = await Otp.findOne({ identifier, otp });

        if (!otpDoc) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        await Otp.deleteOne({ _id: otpDoc._id });
        res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 */
exports.registerUser = async (req, res) => {
    try {
        const { name, email, phone, password, location } = req.body;

        const userExists = await User.findOne({ $or: [{ email }, { phone }] });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            phone,
            password,
            location,
            role: 'user',
            status: 'active'
        });

        res.status(201).json({ success: true, message: 'Registration successful', data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Auth user & get token
 * @route   POST /api/users/login
 */
exports.loginUser = async (req, res) => {
    try {
        const { email, phone, password, loginType } = req.body;
        let user;
        if (loginType === 'email') {
            user = await User.findOne({ email }).select('+password');
        } else {
            user = await User.findOne({ phone }).select('+password');
        }

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        if (user.status === 'blocked') {
            return res.status(403).json({ success: false, message: 'Your account is blocked' });
        }

        if (password) {
            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '30d'
        });

        res.status(200).json({
            success: true,
            token,
            data: user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get user dashboard data
 * @route   GET /api/users/dashboard
 */
exports.getUserDashboard = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(`Fetching dashboard for User ID: ${userId}`);

        const user = await User.findById(userId);
        if (!user) {
            console.log(`User not found for ID: ${userId}`);
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Dashboard Metrics (Aggregated or mock for now)
        const summary = [
            { id: 1, label: 'Total Orders', value: user.totalOrders || 0, growth: '+2', type: 'order' },
            { id: 2, label: 'Pending Payments', value: '₹1,200', growth: '2 items', type: 'payment' },
            { id: 3, label: 'History Records', value: '18', growth: '+5', type: 'history' },
            { id: 4, label: 'Wallet Balance', value: `₹${user.walletBalance || 0}`, growth: '+₹0', type: 'wallet' },
            { id: 5, label: 'Membership Status', value: user.membershipType || 'Free', growth: 'Active', type: 'membership' }
        ];

        const recentOrders = [
            { id: 'ORD001', service: 'Satyanarayan Puja', date: '25 June 2024', status: 'completed', amount: '₹3,500' },
            { id: 'ORD002', service: 'Kundli Report', date: '22 June 2024', status: 'pending', amount: '₹599' },
            { id: 'ORD003', service: 'Gemstone', date: '23 June 2024', status: 'confirmed', amount: '₹2,499' },
            { id: 'ORD004', service: 'Consultation', date: '24 June 2024', status: 'completed', amount: '₹299' },
            { id: 'ORD005', service: 'Ganesh Abhishek', date: '20 June 2024', status: 'cancelled', amount: '₹2,500' }
        ];

        const notifications = [
            { id: 1, message: 'Welcome to your new dashboard!', time: '1 hour ago', unread: true, type: 'reminder' },
            { id: 2, message: 'Please complete your profile for better experience', time: '2 hours ago', unread: true, type: 'alert' },
            { id: 3, message: 'Special discount on Rudrabhishek - 20% off', time: '5 hours ago', unread: false, type: 'offer' }
        ];

        console.log(`Sending dashboard data for: ${user.name}`);
        res.status(200).json({
            success: true,
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                    membershipType: user.membershipType || 'Free Member',
                    lastLogin: user.lastActive || 'Just now',
                    memberSince: user.createdAt ? new Date(user.createdAt).getFullYear() : '2026'
                },
                summary,
                recentOrders,
                notifications,
                latestPayment: {
                    status: 'success',
                    amount: '₹3,500',
                    method: 'Razorpay',
                    date: '25 June 2024',
                    time: '10:00 AM'
                }
            }
        });
    } catch (error) {
        console.error("DASHBOARD ERROR:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
