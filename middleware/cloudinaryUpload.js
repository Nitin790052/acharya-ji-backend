const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const path = require('path');
const fs = require('fs');

/**
 * Enhanced storage creator that falls back to local storage if Cloudinary is not configured.
 */
const getStorage = (folder = 'general', options = {}) => {
    const useCloudinary = !!process.env.CLOUDINARY_CLOUD_NAME;

    if (useCloudinary) {
        return new CloudinaryStorage({
            cloudinary,
            params: async (req, file) => {
                const isVideo = file.mimetype.startsWith('video/');
                const isPdf = file.mimetype === 'application/pdf';
                let resourceType = options.resourceType || 'auto';
                if (isVideo) resourceType = 'video';
                if (isPdf) resourceType = 'raw';
                return {
                    folder: `acharya-ji/${folder}`,
                    resource_type: resourceType,
                    allowed_formats: options.allowedFormats || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'mp4', 'webm', 'ogg', 'mov', 'avi', 'pdf'],
                    transformation: (isVideo || isPdf) ? [] : [{ quality: 'auto', fetch_format: 'webp' }],
                    public_id: `${folder}-${Date.now()}-${Math.round(Math.random() * 1E9)}`
                };
            }
        });
    }

    // Fallback: Local Storage
    const uploadDir = path.join(process.cwd(), 'uploads', folder);
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${folder}`);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = path.extname(file.originalname) || '.webp';
            cb(null, `${folder}-${uniqueSuffix}${ext}`);
        }
    });
};

/**
 * Upload a single file. (req.file.path will be Cloudinary URL OR local path)
 */
const uploadSingle = (fieldName = 'image', folder = 'general', options = {}) => {
    const storage = getStorage(folder, options);
    return multer({
        storage,
        limits: { fileSize: options.maxFileSize || 10 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/') || file.mimetype === 'application/pdf') {
                cb(null, true);
            } else {
                cb(new Error('Only image and video files are allowed!'), false);
            }
        }
    }).single(fieldName);
};

/**
 * Upload multiple fields.
 */
const uploadFields = (fields, folder = 'general', options = {}) => {
    const storage = getStorage(folder, options);
    return multer({
        storage,
        limits: { fileSize: options.maxFileSize || 50 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/') || file.mimetype === 'application/pdf') {
                cb(null, true);
            } else {
                cb(new Error('Only image and video files are allowed!'), false);
            }
        }
    }).fields(fields);
};

/**
 * Upload any files.
 */
const uploadAny = (folder = 'general', options = {}) => {
    const storage = getStorage(folder, options);
    return multer({
        storage,
        limits: { fileSize: options.maxFileSize || 10 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/') || file.mimetype === 'application/pdf') {
                cb(null, true);
            } else {
                cb(new Error('Only image and video files are allowed!'), false);
            }
        }
    }).any();
};

module.exports = { uploadSingle, uploadFields, uploadAny, cloudinary };

