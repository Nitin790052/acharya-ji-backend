const Vendor = require('../models/Vendor');
const User = require('../models/User');
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
            status: 'pending'
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
