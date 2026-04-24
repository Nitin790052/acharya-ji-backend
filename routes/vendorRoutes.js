const express = require('express');
const router = express.Router();
const { registerVendor, getVendors, updateVendorStatus, loginVendor, sendVendorOtp, verifyVendorOtp } = require('../controllers/vendorController');
const { uploadFields } = require('../middleware/cloudinaryUpload');

// Define fields for file uploads
const vendorUploadFields = [
    { name: 'aadharFile', maxCount: 1 },
    { name: 'panFile', maxCount: 1 },
    { name: 'bankFile', maxCount: 1 },
    { name: 'qualificationFile', maxCount: 1 },
    { name: 'pastEventPhotos', maxCount: 5 }
];

// Public Registration & Login
router.post('/register', uploadFields(vendorUploadFields, 'vendors'), registerVendor);
router.post('/login', loginVendor);
router.post('/send-otp', sendVendorOtp);
router.post('/verify-otp', verifyVendorOtp);

// Admin Routes (Add protect/admin middleware if available)
router.get('/', getVendors);
router.patch('/:id/status', updateVendorStatus);

module.exports = router;
