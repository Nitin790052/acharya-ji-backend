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
            // TODO: Remove debugOtp before going live — temporary for testing
            debugOtp: otp
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
        const { email, phone, password, loginType, identifier } = req.body;
        
        // Robust identifier selection
        const loginId = identifier || email || phone;
        
        if (!loginId) {
            return res.status(400).json({ success: false, message: 'Please provide email or phone' });
        }

        // Search by both email and phone for maximum flexibility
        const user = await User.findOne({
            $or: [
                { email: loginId.toLowerCase() },
                { phone: loginId }
            ]
        }).select('+password');

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

        // Update last active and login history
        const userAgent = req.headers['user-agent'] || 'Unknown Device';
        let device = 'Desktop';
        if (/mobile/i.test(userAgent)) device = 'Mobile';
        if (/tablet/i.test(userAgent)) device = 'Tablet';
        
        user.lastActive = new Date();
        if (!user.loginHistory) user.loginHistory = [];
        
        user.loginHistory.unshift({
            device: `${device} (${userAgent.split(' ')[0]})`,
            location: 'Noida, India', 
            ip: req.ip,
            timestamp: new Date()
        });

        if (user.loginHistory.length > 10) user.loginHistory.pop();
        await user.save();

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

        const Booking = require('../models/Booking');
        
        // Flexible query: User ID OR matching Mobile Number
        const query = {
            $or: [
                { user: userId },
                { mobile: user.phone || user.mobile }
            ]
        };

        const userBookings = await Booking.find(query).sort({ createdAt: -1 }).limit(10);
        const totalBookings = await Booking.countDocuments(query);
        const pendingBookings = await Booking.countDocuments({ ...query, status: 'Pending' });
        
        // Calculate Total Spending
        const allBookings = await Booking.find(query);
        const totalSpent = allBookings.reduce((sum, b) => sum + (Number(b.amount) || 0), 0);

        // Calculate total pending amount with fallback for older bookings
        const PujaOffering = require('../models/PujaOffering');
        const offerings = await PujaOffering.find({}, 'title price');
        const priceMap = offerings.reduce((map, o) => ({ ...map, [o.title]: o.price }), {});

        const pendingAmount = allBookings
            .filter(b => {
                const isStatusPending = b.paymentStatus === 'pending' || !b.paymentStatus;
                const isJobActive = ['Pending', 'Confirmed'].includes(b.status);
                return isStatusPending && isJobActive && b.status !== 'Cancelled';
            })
            .reduce((sum, b) => {
                const amount = Number(b.amount) || priceMap[b.pujaType] || 0;
                return sum + amount;
            }, 0);
        
        // Find latest successful payment
        const lastPaidBooking = await Booking.findOne({ ...query, paymentStatus: 'paid' }).sort({ createdAt: -1 });
        
        const latestPayment = lastPaidBooking ? {
            status: 'success',
            amount: `₹${lastPaidBooking.amount || 0}`,
            method: lastPaidBooking.paymentMethod || 'Razorpay',
            date: new Date(lastPaidBooking.createdAt).toLocaleDateString('en-GB'),
            time: new Date(lastPaidBooking.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        } : {
            status: 'pending',
            amount: '₹0',
            method: 'N/A',
            date: 'N/A',
            time: 'N/A'
        };

        // Dashboard Metrics
        const summary = [
            { id: 1, label: 'Total Orders', value: totalBookings, growth: '+0', type: 'order' },
            { id: 2, label: 'Pending Bookings', value: pendingBookings, growth: `${pendingBookings} items`, type: 'history' },
            { id: 3, label: 'Total Spending', value: `₹${totalSpent}`, growth: '+₹0', type: 'payment' },
            { id: 4, label: 'Wallet Balance', value: `₹${user.walletBalance || 0}`, growth: '+₹0', type: 'wallet' },
            { id: 5, label: 'Membership Status', value: user.membershipType || 'Free', growth: 'Active', type: 'membership' }
        ];

        const recentOrders = userBookings.map(b => ({
            id: b._id.toString().substring(0, 8).toUpperCase(),
            originalId: b._id,
            service: b.pujaType,
            date: new Date(b.createdAt).toLocaleDateString('en-GB'),
            status: b.status.toLowerCase(),
            amount: b.amount ? `₹${b.amount}` : '₹0'
        }));

        res.status(200).json({
            success: true,
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                    membershipType: user.membershipType || 'Free Member',
                    lastLogin: user.loginHistory && user.loginHistory.length > 1 
                        ? user.loginHistory[1] 
                        : (user.createdAt ? { timestamp: user.createdAt, device: 'First Login', location: 'Account created' } : 'Just now'),
                    memberSince: user.createdAt ? new Date(user.createdAt).getFullYear() : '2023',
                    walletBalance: user.walletBalance || 0
                },
                summary,
                recentOrders,
                notifications: [
                    { id: 1, message: 'Welcome to your new dashboard!', time: 'Recently', unread: true, type: 'reminder' },
                    { id: 2, message: 'Your spiritual journey begins here.', time: 'Always', unread: false, type: 'offer' }
                ],
                latestPayment,
                totalPendingAmount: pendingAmount
            }
        });
    } catch (error) {
        console.error("DASHBOARD ERROR:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get all orders/bookings for current user
 * @route   GET /api/users/orders
 */
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const { status } = req.query;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const Booking = require('../models/Booking');
        
        // Build flexible query (match by user ID OR phone number)
        const query = {
            $or: [
                { user: userId },
                { mobile: user.phone || user.mobile }
            ]
        };

        // Apply status filter if provided
        if (status && status !== 'all') {
            query.status = { $regex: new RegExp(`^${status}$`, 'i') };
        }

        const bookings = await Booking.find(query).sort({ createdAt: -1 });
        console.log(`ORDERS: Found ${bookings.length} bookings for status: ${status || 'all'}. Query:`, JSON.stringify(query));

        const PujaOffering = require('../models/PujaOffering');
        const offerings = await PujaOffering.find({}, 'title price');
        const priceMap = offerings.reduce((map, o) => ({ ...map, [o.title]: o.price }), {});

        // Map to frontend structure
        const formattedOrders = bookings.map(b => ({
            id: b._id.toString().substring(0, 8).toUpperCase(),
            dbId: b._id,
            date: new Date(b.createdAt).toLocaleDateString('en-GB'),
            time: new Date(b.createdAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            serviceName: b.pujaType || 'Service',
            customerName: b.name || user.name,
            customerMobile: b.mobile || user.phone || user.mobile || 'N/A',
            status: b.status.toLowerCase(),
            paymentStatus: b.paymentStatus || 'pending',
            amount: Number(b.amount) || priceMap[b.pujaType] || 0,
            paymentMethod: b.paymentMethod || 'Razorpay',
            priest: b.priest || 'Assigned Soon',
            location: b.city || b.location || 'N/A',
            type: b.mode ? (b.mode === 'Online' ? 'online' : 'offline') : 'online',
            transactionId: b.transactionId || `TXN${b._id.toString().substring(18).toUpperCase()}`
        }));

        res.status(200).json({
            success: true,
            count: formattedOrders.length,
            data: formattedOrders
        });
    } catch (error) {
        console.error("ORDERS ERROR:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/users/profile
 */
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 */
exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, address, avatar, notificationSettings, language, theme } = req.body;
        
        const updateData = {};
        if (name) updateData.name = name;
        if (phone) updateData.phone = phone;
        if (address) updateData.address = address;
        if (avatar) updateData.avatar = avatar;
        if (notificationSettings) updateData.notificationSettings = notificationSettings;
        if (language) updateData.language = language;
        if (theme) updateData.theme = theme;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Change user password
 * @route   PUT /api/users/change-password
 */
exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id).select('+password');

        if (!(await user.matchPassword(currentPassword))) {
            return res.status(401).json({ success: false, message: 'Current password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Upload user avatar
 * @route   POST /api/users/upload-avatar
 */
exports.uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a file' });
        }

        const { convertToWebp } = require('../utils/imageUtils');
        const webpPath = await convertToWebp(req.file.path);
        const relativePath = `/${webpPath.replace(/\\/g, '/')}`;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { avatar: relativePath },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Profile picture updated',
            data: user.avatar
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Cancel a pending order
 * @route   PATCH /api/users/orders/:id/cancel
 */
exports.cancelOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const Booking = require('../models/Booking');
        const booking = await Booking.findById(orderId);

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Verify ownership (Check by user ID or mobile)
        const isOwner = booking.user?.toString() === userId || booking.mobile === (user.phone || user.mobile);
        if (!isOwner) {
            return res.status(403).json({ success: false, message: 'You are not authorized to cancel this order' });
        }

        // Only allow cancellation of 'Pending' orders
        if (booking.status.toLowerCase() !== 'pending') {
            return res.status(400).json({ success: false, message: `Cannot cancel an order that is already ${booking.status}` });
        }

        booking.status = 'Cancelled';
        await booking.save();

        res.status(200).json({
            success: true,
            message: 'Order cancelled successfully',
            data: booking
        });
    } catch (error) {
        console.error("CANCEL ORDER ERROR:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get unified activity history for user
 * @route   GET /api/users/history
 */
exports.getUserHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const Booking = require('../models/Booking');
        
        // Fetch real data
        const query = {
            $or: [
                { user: userId },
                { mobile: user.phone || user.mobile }
            ]
        };
        const bookings = await Booking.find(query).sort({ createdAt: -1 });

        const history = [];

        // 1. Process Bookings as Orders and Payments
        bookings.forEach(b => {
            const dateStr = new Date(b.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
            const timeStr = new Date(b.createdAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });

            // Add as Order record
            history.push({
                id: `ORD${b._id.toString().substring(18)}`.toUpperCase(),
                dbId: b._id,
                type: 'order',
                action: `Order ${b.status}`,
                description: b.pujaType || 'Booking',
                date: dateStr,
                time: timeStr,
                status: b.status.toLowerCase(),
                amount: b.amount || 0,
                details: {
                    orderId: b._id.toString().substring(0, 8).toUpperCase(),
                    location: b.city || 'N/A',
                    paymentMethod: b.paymentMethod || 'Razorpay'
                },
                timestamp: b.createdAt
            });

            // Add as Payment record if successful
            if (b.paymentStatus === 'paid' || b.status !== 'Pending') {
                history.push({
                    id: `PAY${b._id.toString().substring(18)}`.toUpperCase(),
                    dbId: b._id,
                    type: 'payment',
                    action: b.status === 'Cancelled' ? 'Refund Processed' : 'Payment Success',
                    description: b.pujaType || 'Service Payment',
                    date: dateStr,
                    time: timeStr,
                    status: b.status === 'Cancelled' ? 'refunded' : 'success',
                    amount: b.amount || 0,
                    details: {
                        transactionId: `TXN${b._id.toString().substring(15)}`.toUpperCase(),
                        method: b.paymentMethod || 'Razorpay',
                    },
                    timestamp: new Date(b.createdAt.getTime() + 1000) // Slight offset for sorting
                });
            }
        });

        // 2. Process Login History
        if (user.loginHistory && user.loginHistory.length > 0) {
            user.loginHistory.forEach((login, idx) => {
                const loginDate = new Date(login.timestamp);
                const dateStr = loginDate.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                });
                const timeStr = loginDate.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                });

                history.push({
                    id: `LOG${idx}${userId.substring(20)}`.toUpperCase(),
                    type: 'login',
                    action: idx === 0 ? 'Current Session' : 'Login Activity',
                    description: login.device || 'Unknown Device',
                    date: dateStr,
                    time: timeStr,
                    status: idx === 0 ? 'current' : 'completed',
                    details: {
                        device: login.device,
                        location: login.location || 'India',
                        ip: login.ip || '0.0.0.0'
                    },
                    timestamp: login.timestamp
                });
            });
        }

        // 3. Add Account Creation (Profile type)
        history.push({
            id: `ACC${userId.substring(20)}`.toUpperCase(),
            type: 'profile',
            action: 'Account Created',
            description: 'Joined Acharya Ji',
            date: new Date(user.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }),
            time: new Date(user.createdAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            status: 'completed',
            details: {
                message: 'Welcome to the spiritual journey!'
            },
            timestamp: user.createdAt
        });

        // Sort entire history by timestamp descending
        const sortedHistory = history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        res.status(200).json({
            success: true,
            data: sortedHistory
        });
    } catch (error) {
        console.error("HISTORY ERROR:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Add money to user wallet
 * @route   POST /api/users/add-money
 * @access  Private
 */
exports.addMoney = async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user.id;

        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.walletBalance = (user.walletBalance || 0) + Number(amount);
        await user.save();

        res.status(200).json({
            success: true,
            message: `₹${amount} added successfully to your wallet!`,
            walletBalance: user.walletBalance
        });
    } catch (error) {
        console.error("ADD MONEY ERROR:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Pay all pending bookings
 * @route   POST /api/users/pay-all-pending
 * @access  Private
 */
exports.payAllPending = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const Booking = require('../models/Booking');
        const query = {
            $and: [
                { $or: [{ user: userId }, { mobile: user.phone || user.mobile }] },
                { $or: [{ paymentStatus: 'pending' }, { paymentStatus: { $exists: false } }] }
            ],
            status: { $ne: 'Cancelled' }
        };

        // Determine the total pending amount to deduct from wallet
        const bookingsToPay = await Booking.find(query);
        let amountToDeduct = 0;
        
        if (bookingsToPay.length > 0) {
            const PujaOffering = require('../models/PujaOffering');
            const offerings = await PujaOffering.find({}, 'title price');
            const priceMap = offerings.reduce((map, o) => ({ ...map, [o.title]: o.price }), {});

            bookingsToPay.forEach(b => {
                // Ignore bookings that are not active jobs
                const isJobActive = ['Pending', 'Confirmed'].includes(b.status);
                if (isJobActive) {
                    const amt = Number(b.amount) || priceMap[b.pujaType] || 0;
                    amountToDeduct += amt;
                }
            });
        }

        // Prevent wallet deducting if there isn't actually anything to pay or it's free
        if (amountToDeduct > 0) {
            // Check if user has sufficient wallet balance (optional, but ensures they don't go negative if we strictly enforce wallet)
            // If the app allows negative wallet balance or overrides it, we simply deduct.
            user.walletBalance = Math.max(0, (user.walletBalance || 0) - amountToDeduct);
            await user.save();
        }

        // 1. Update orders that are currently Pending to Confirmed and their payment status to Paid
        const result1 = await Booking.updateMany(
            { ...query, status: 'Pending' }, 
            { paymentStatus: 'paid', status: 'Confirmed' }
        );

        // 2. Update orders that are already Confirmed or Completed to simply Paid
        const result2 = await Booking.updateMany(
            { ...query, status: { $ne: 'Pending' } }, 
            { paymentStatus: 'paid' }
        );

        const totalModified = result1.modifiedCount + result2.modifiedCount;

        res.status(200).json({
            success: true,
            message: `✅ Successfully paid and confirmed for ${totalModified} pending bookings!`,
            modifiedCount: totalModified
        });
    } catch (error) {
        console.error("PAY PENDING ERROR:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
