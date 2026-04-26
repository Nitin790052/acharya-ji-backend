const express = require('express');
const router = express.Router();
const { registerVendor, getVendors, getVendorById, updateVendorStatus, updateVendor, loginVendor, sendVendorOtp, verifyVendorOtp, deleteVendor } = require('../controllers/vendorController');
const { uploadFields, uploadSingle } = require('../middleware/cloudinaryUpload');

// Define fields for file uploads
const vendorUploadFields = [
    { name: 'aadharFile', maxCount: 1 },
    { name: 'panFile', maxCount: 1 },
    { name: 'bankFile', maxCount: 1 },
    { name: 'qualificationFile', maxCount: 1 },
    { name: 'pastEventPhotos', maxCount: 5 },
    { name: 'avatar', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
];

// Public Registration & Login
router.post('/register', uploadFields(vendorUploadFields, 'vendors'), registerVendor);
router.post('/login', loginVendor);
router.post('/send-otp', sendVendorOtp);
router.post('/verify-otp', verifyVendorOtp);

// Admin Routes (Add protect/admin middleware if available)
router.get('/', getVendors);
router.get('/:id', getVendorById);
router.patch('/:id/status', updateVendorStatus);
router.patch('/:id', uploadFields([{ name: 'avatar', maxCount: 1 }, { name: 'logo', maxCount: 1 }], 'vendors'), updateVendor);
router.delete('/:id', deleteVendor);

// Vendor Dashboard Stats
router.get('/dashboard-stats/:id', require('../controllers/vendorController').getVendorDashboardStats);

// Vendor Services CRUD
const { addVendorService, getVendorServices, updateVendorService, deleteVendorService, getAllVendorServices, updateVendorServiceApproval } = require('../controllers/vendorController');
router.post('/services', addVendorService);
router.get('/services/:vendorId', getVendorServices);
router.patch('/services/:id', updateVendorService);
router.delete('/services/:id', deleteVendorService);

// Admin Service Management
router.get('/admin/services', getAllVendorServices);
router.patch('/admin/services/:id/approval', updateVendorServiceApproval);

// Vendor Bookings
const {
    getVendorBookings,
    updateBooking,
    getVendorDonations,
    getVendorEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    getVendorStaff,
    addStaff,
    updateStaff,
    deleteStaff,
    getVendorTransactions,
    addTransaction
} = require('../controllers/vendorController');
router.get('/bookings/:vendorId', getVendorBookings);
router.patch('/bookings/:id', updateBooking);
router.get('/donations/:vendorId', getVendorDonations);

// Vendor Events
router.get('/events/:vendorId', getVendorEvents);
router.post('/events', addEvent);
router.patch('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

// Vendor Staff
router.get('/staff/:vendorId', getVendorStaff);
router.post('/staff', addStaff);
router.patch('/staff/:id', updateStaff);
router.delete('/staff/:id', deleteStaff);

// Vendor Transactions
router.get('/transactions/:vendorId', getVendorTransactions);
router.post('/transactions', addTransaction);

// Public Routes (For Website)
router.get('/public/services', async (req, res) => {
    try {
        const VendorService = require('../models/VendorService');
        const services = await VendorService.find({
            status: 'active',
            approvalStatus: 'approved'
        }).populate('vendor', 'businessName logo');
        res.status(200).json({ success: true, count: services.length, data: services });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/public/services/:idOrSlug', async (req, res) => {
    try {
        const VendorService = require('../models/VendorService');
        const { idOrSlug } = req.params;
        
        let query;
        // Check if it's a valid ObjectId
        if (idOrSlug.match(/^[0-9a-fA-H]{24}$/)) {
            query = { _id: idOrSlug };
        } else {
            // It's a slug, remove prefix if exists
            const slug = idOrSlug.startsWith('vendor-service-') 
                ? idOrSlug.replace('vendor-service-', '') 
                : idOrSlug;
            query = { slug };
        }

        const service = await VendorService.findOne(query).populate('vendor', 'businessName logo');
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.status(200).json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// File Upload Route
router.post('/upload', uploadSingle('file', 'vendor-services'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        // If using Cloudinary, req.file.path is the URL. If local, we need to prepend the server URL.
        const imageUrl = req.file.path.startsWith('http')
            ? req.file.path
            : `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`;

        res.status(200).json({ success: true, url: imageUrl });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
