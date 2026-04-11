const { convertToWebp } = require('../utils/imageUtils');
const path = require('path');

const webpConvertMiddleware = async (req, res, next) => {
    try {
        if (req.file) {
            const originalPath = req.file.path;
            const newPath = await convertToWebp(originalPath, true);
            req.file.path = newPath;
            req.file.filename = path.basename(newPath);
            req.file.mimetype = 'image/webp';
        }

        if (req.files) {
            // Handle array of files (upload.array) or fields (upload.fields)
            const fileFields = Object.keys(req.files);
            
            for (const field of fileFields) {
                const files = Array.isArray(req.files[field]) ? req.files[field] : [req.files[field]];
                
                for (const file of files) {
                    // Only convert images
                    if (file.mimetype.startsWith('image/') && !file.mimetype.includes('webp')) {
                        const originalPath = file.path;
                        const newPath = await convertToWebp(originalPath, true);
                        file.path = newPath;
                        file.filename = path.basename(newPath);
                        file.mimetype = 'image/webp';
                    }
                }
            }
        }
        
        next();
    } catch (error) {
        console.error('WebP conversion middleware error:', error);
        next();
    }
};

module.exports = webpConvertMiddleware;
