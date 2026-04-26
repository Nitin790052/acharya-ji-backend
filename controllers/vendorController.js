const mongoose = require('mongoose');
const Vendor = require('../models/Vendor');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Donation = require('../models/Donation');
const Event = require('../models/Event');
const Staff = require('../models/Staff');
const Transaction = require('../models/Transaction');
const VendorService = require('../models/VendorService');
const Otp = require('../models/Otp');
const jwt = require('jsonwebtoken');

// Helper to generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// @desc    Register a new vendor
// @route   POST /api/vendors/register
exports.registerVendor = async (req, res) => {
    try {
        const vendorData = req.body;

        // 1. Validation for uniqueness
        const existingVendor = await Vendor.findOne({
            $or: [
                { email: vendorData.email.toLowerCase() },
                { phone: vendorData.mobile }
            ]
        });

        if (existingVendor) {
            return res.status(400).json({
                success: false,
                message: 'Vendor with this email or phone number is already registered.'
            });
        }

        // 2. Handle Document & Bank Files
        const files = req.files || {};
        const aadharFile = files.aadharFile ? files.aadharFile[0].path : '';
        const panFile = files.panFile ? files.panFile[0].path : '';
        const bankFile = files.bankFile ? files.bankFile[0].path : '';
        const qualificationFile = files.qualificationFile ? files.qualificationFile[0].path : '';
        const avatar = files.avatar ? files.avatar[0].path : '';
        const logo = files.logo ? files.logo[0].path : '';

        // Past Event Photos for Event Organizers
        const pastEventPhotos = files.pastEventPhotos ? files.pastEventPhotos.map(f => f.path) : [];

        // 3. Extract & Separate Fields
        const { name, email, mobile, password, category } = vendorData;
        const { aadharNumber, panNumber, bankName, accountNumber, ifscCode } = vendorData;

        // Collect all extra fields into categoryData
        const excludedFields = [
            'name', 'email', 'mobile', 'password', 'category',
            'aadharNumber', 'panNumber', 'bankName', 'accountNumber', 'ifscCode',
            'aadharFile', 'panFile', 'bankFile', 'qualificationFile', 'pastEventPhotos'
        ];

        const categoryData = {};
        Object.keys(vendorData).forEach(key => {
            if (!excludedFields.includes(key)) {
                let value = vendorData[key];
                // Try to parse if it's stringified JSON (for arrays from mobile forms)
                try {
                    if (typeof value === 'string' && (value.startsWith('[') || value.startsWith('{'))) {
                        value = JSON.parse(value);
                    }
                } catch (e) { }
                categoryData[key] = value;
            }
        });

        if (pastEventPhotos.length > 0) {
            categoryData.pastEventPhotos = pastEventPhotos;
        }

        // 4. Create Vendor Record
        const vendor = await Vendor.create({
            name,
            email: email.toLowerCase(),
            phone: mobile,
            password,
            category,
            aadharNumber,
            panNumber,
            aadharFile,
            panFile,
            qualificationFile,
            bankName,
            accountNumber,
            ifscCode,
            bankFile,
            categoryData,
            avatar: avatar || '',
            logo: logo || '',
            status: req.body.status || 'pending'
        });

        res.status(201).json({
            success: true,
            message: 'Application submitted! Admin will verify your documents.',
            data: {
                id: vendor._id,
                name: vendor.name,
                status: vendor.status
            }
        });

    } catch (error) {
        console.error('VENDOR_REGISTRATION_ERROR:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing registration: ' + error.message
        });
    }
};

// @desc    Get all vendors with filters
// @route   GET /api/vendors
exports.getVendors = async (req, res) => {
    try {
        const { status, category } = req.query;
        const query = {};
        if (status) query.status = status;
        if (category) query.category = category;

        const vendors = await Vendor.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: vendors.length, data: vendors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single vendor
// @route   GET /api/vendors/:id
exports.getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(404).json({ success: false, message: 'Vendor not found' });
        }
        res.status(200).json({ success: true, data: vendor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update vendor
// @route   PATCH /api/vendors/:id
exports.updateVendor = async (req, res) => {
    try {
        let updateData = { ...req.body };
        
        // Parse categoryData if it's a string (FormData sends it as a string)
        if (typeof updateData.categoryData === 'string') {
            try {
                updateData.categoryData = JSON.parse(updateData.categoryData);
            } catch (e) {
                console.error('Error parsing categoryData:', e);
            }
        }

        if (req.files) {
            if (req.files.avatar) updateData.avatar = req.files.avatar[0].path;
            if (req.files.logo) updateData.logo = req.files.logo[0].path;
        }

        // Ensure fields are correctly mapped if they come in different names from frontend
        if (req.body.panNumber) updateData.panNumber = req.body.panNumber;
        if (req.body.businessName) updateData.businessName = req.body.businessName;

        const vendor = await Vendor.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        if (!vendor) {
            return res.status(404).json({ success: false, message: 'Vendor not found' });
        }

        res.status(200).json({ success: true, data: vendor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete vendor
// @route   DELETE /api/vendors/:id
exports.deleteVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndDelete(req.params.id);

        if (!vendor) {
            return res.status(404).json({ success: false, message: 'Vendor not found' });
        }

        res.status(200).json({ success: true, message: 'Vendor deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Auth vendor & get token
// @route   POST /api/vendors/login
exports.loginVendor = async (req, res) => {
    try {
        const { email, phone, password, loginType } = req.body;

        const loginId = phone || email;

        if (!loginId) {
            return res.status(400).json({ success: false, message: 'Please provide email or phone' });
        }

        const vendor = await Vendor.findOne({
            $or: [
                { email: loginId.toLowerCase() },
                { phone: loginId }
            ]
        }).select('+password');

        if (!vendor) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        if (password && loginType === 'email') {
            const isMatch = await vendor.matchPassword(password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        }

        if (vendor.status !== 'approved') {
            return res.status(403).json({ success: false, message: `Your account is ${vendor.status}. Please wait for admin approval.` });
        }

        const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '30d'
        });

        res.status(200).json({
            success: true,
            token,
            data: {
                _id: vendor._id,
                name: vendor.name,
                email: vendor.email,
                phone: vendor.phone,
                role: vendor.role,
                category: vendor.category,
                status: vendor.status,
                isVerified: vendor.isVerified,
                avatar: vendor.avatar || ''
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Send OTP to vendor
// @route   POST /api/vendors/send-otp
exports.sendVendorOtp = async (req, res) => {
    try {
        const { identifier, type } = req.body;
        if (!identifier) {
            return res.status(400).json({ success: false, message: 'Please provide email or phone' });
        }

        const vendor = await Vendor.findOne({
            $or: [{ email: identifier.toLowerCase() }, { phone: identifier }]
        });

        if (!vendor) {
            return res.status(404).json({ success: false, message: 'Vendor not found' });
        }

        const otp = generateOTP();
        await Otp.findOneAndUpdate(
            { identifier },
            { otp, createdAt: new Date() },
            { upsert: true, returnDocument: 'after' }
        );

        console.log(`Vendor OTP for ${identifier}: ${otp}`);

        res.status(200).json({
            success: true,
            message: `OTP sent to your ${type}`,
            debugOtp: otp
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Verify OTP for vendor
// @route   POST /api/vendors/verify-otp
exports.verifyVendorOtp = async (req, res) => {
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

// @desc    Update Vendor Status (Approval/Rejection)
// @route   PATCH /api/vendors/:id/status
exports.updateVendorStatus = async (req, res) => {
    try {
        const { status, rejectionReason } = req.body;
        const vendor = await Vendor.findById(req.params.id).select('+password');

        if (!vendor) {
            return res.status(404).json({ success: false, message: 'Vendor record not found' });
        }

        vendor.status = status;
        if (status === 'rejected') {
            vendor.rejectionReason = rejectionReason;
        }

        if (status === 'approved') {
            vendor.isVerified = true;

            // Sync with User table for login
            let user = await User.findOne({ email: vendor.email });
            if (!user) {
                await User.updateOne(
                    { email: vendor.email },
                    {
                        $setOnInsert: {
                            name: vendor.name,
                            phone: vendor.phone,
                            password: vendor.password,
                            role: 'vendor',
                            status: 'active'
                        }
                    },
                    { upsert: true }
                );
                console.log('Created User account for approved vendor:', vendor.email);
            } else {
                user.role = 'vendor';
                user.status = 'active';
                await user.save();
            }
        }

        await vendor.save();

        res.status(200).json({
            success: true,
            message: `Vendor has been ${status}`,
            data: vendor
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// @desc    Get Vendor Dashboard Stats
// @route   GET /api/vendors/dashboard-stats/:id
exports.getVendorDashboardStats = async (req, res) => {
    try {
        const vendorId = req.params.id;

        // 1. Get Vendor Info (for rating)
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ success: false, message: 'Vendor not found' });
        }

        // 2. Aggregate Stats from Bookings
        const stats = await Booking.aggregate([
            { $match: { vendor: new mongoose.Types.ObjectId(vendorId) } },
            {
                $group: {
                    _id: null,
                    totalRevenue: { 
                        $sum: { 
                            $cond: [{ $eq: ["$paymentStatus", "paid"] }, "$amount", 0] 
                        } 
                    },
                    totalBookings: { $sum: 1 },
                    activeBookings: {
                        $sum: {
                            $cond: [{ $in: ["$status", ["Pending", "Confirmed"]] }, 1, 0]
                        }
                    },
                    totalCustomers: { $addToSet: "$mobile" }
                }
            }
        ]);

        const dashboardData = stats[0] || {
            totalRevenue: 0,
            totalBookings: 0,
            activeBookings: 0,
            totalCustomers: []
        };

        // 3. Get Recent Activity (Last 5 bookings)
        const recentActivity = await Booking.find({ vendor: vendorId })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name mobile pujaType status createdAt amount');

        res.status(200).json({
            success: true,
            data: {
                stats: [
                    { label: 'Total Revenue', value: `₹${dashboardData.totalRevenue.toLocaleString()}`, change: '+0%', isUp: true },
                    { label: 'Active Bookings', value: dashboardData.activeBookings.toString(), change: '+0%', isUp: true },
                    { label: 'Total Customers', value: dashboardData.totalCustomers.length.toString(), change: '+0%', isUp: true },
                    { label: 'Avg. Rating', value: (vendor.rating || 5.0).toString(), change: '0%', isUp: true },
                ],
                recentActivity: recentActivity.map(item => ({
                    id: item._id,
                    title: `Booking for ${item.pujaType}`,
                    customer: item.name || item.mobile,
                    time: item.createdAt,
                    status: item.status,
                    amount: item.amount
                })),
                profileCompletion: calculateProfileCompletion(vendor)
            }
        });

    } catch (error) {
        console.error('VENDOR_DASHBOARD_STATS_ERROR:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Helper to calculate profile completion percentage
function calculateProfileCompletion(vendor) {
    const fields = [
        'aadharNumber', 'panNumber', 'aadharFile', 'panFile', 
        'bankName', 'accountNumber', 'ifscCode', 'bankFile'
    ];
    let completed = 0;
    fields.forEach(f => {
        if (vendor[f]) completed++;
    });
    
    // Add basic info and category data
    if (vendor.name && vendor.email && vendor.phone) completed += 2;
    if (vendor.categoryData && Object.keys(vendor.categoryData).length > 0) completed += 2;
    
    const percentage = Math.round((completed / (fields.length + 4)) * 100);
    return Math.min(percentage, 100);
}

// --- VENDOR SERVICE CRUD ---

// @desc    Add a new service for vendor
// @route   POST /api/vendors/services
exports.addVendorService = async (req, res) => {
    try {
        const { vendorId, ...serviceData } = req.body;
        const service = await VendorService.create({
            vendor: vendorId,
            ...serviceData
        });
        res.status(201).json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all services for a vendor
// @route   GET /api/vendors/services/:vendorId
exports.getVendorServices = async (req, res) => {
    try {
        const services = await VendorService.find({ vendor: req.params.vendorId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: services.length, data: services });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update a vendor service
// @route   PATCH /api/vendors/services/:id
exports.updateVendorService = async (req, res) => {
    try {
        const updateData = { ...req.body };
        // Reset approval status to pending on update to ensure admin review of changes
        updateData.approvalStatus = 'pending';

        const service = await VendorService.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.status(200).json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a vendor service
// @route   DELETE /api/vendors/services/:id
exports.deleteVendorService = async (req, res) => {
    try {
        const service = await VendorService.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.status(200).json({ success: true, message: 'Service deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all vendor services (for Admin)
// @route   GET /api/vendors/admin/services
exports.getAllVendorServices = async (req, res) => {
    try {
        const { approvalStatus } = req.query;
        const query = {};
        if (approvalStatus) query.approvalStatus = approvalStatus;

        const services = await VendorService.find(query)
            .populate('vendor', 'name businessName email phone category')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update vendor service approval status
// @route   PATCH /api/vendors/admin/services/:id/approval
exports.updateVendorServiceApproval = async (req, res) => {
    try {
        const { approvalStatus, rejectionReason } = req.body;
        
        if (!['approved', 'rejected', 'pending'].includes(approvalStatus)) {
            return res.status(400).json({ success: false, message: 'Invalid approval status' });
        }

        const service = await VendorService.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        service.approvalStatus = approvalStatus;
        if (approvalStatus === 'rejected') {
            service.rejectionReason = rejectionReason || '';
        } else {
            service.rejectionReason = '';
        }

        await service.save();

        res.status(200).json({
            success: true,
            message: `Service has been ${approvalStatus}`,
            data: service
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get bookings for a vendor
// @route   GET /api/vendors/bookings/:vendorId
exports.getVendorBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ vendor: req.params.vendorId })
            .populate('user', 'name email mobile')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update booking status/details
// @route   PATCH /api/vendors/bookings/:id
exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get donations for a vendor
// @route   GET /api/vendors/donations/:vendorId
exports.getVendorDonations = async (req, res) => {
    try {
        const donations = await Donation.find({ vendor: req.params.vendorId })
            .populate('devotee', 'name email mobile')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: donations.length, data: donations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get events for a vendor
// @route   GET /api/vendors/events/:vendorId
exports.getVendorEvents = async (req, res) => {
    try {
        const events = await Event.find({ vendor: req.params.vendorId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: events.length, data: events });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add event
// @route   POST /api/vendors/events
exports.addEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update event
// @route   PATCH /api/vendors/events/:id
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete event
// @route   DELETE /api/vendors/events/:id
exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get staff for a vendor
// @route   GET /api/vendors/staff/:vendorId
exports.getVendorStaff = async (req, res) => {
    try {
        const staff = await Staff.find({ vendor: req.params.vendorId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: staff.length, data: staff });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add staff
// @route   POST /api/vendors/staff
exports.addStaff = async (req, res) => {
    try {
        const staff = await Staff.create(req.body);
        res.status(201).json({ success: true, data: staff });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update staff
// @route   PATCH /api/vendors/staff/:id
exports.updateStaff = async (req, res) => {
    try {
        const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: staff });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete staff
// @route   DELETE /api/vendors/staff/:id
exports.deleteStaff = async (req, res) => {
    try {
        await Staff.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Staff deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get transactions for a vendor
// @route   GET /api/vendors/transactions/:vendorId
exports.getVendorTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ vendor: req.params.vendorId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: transactions.length, data: transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add transaction (e.g. withdrawal)
// @route   POST /api/vendors/transactions
exports.addTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.status(201).json({ success: true, data: transaction });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
