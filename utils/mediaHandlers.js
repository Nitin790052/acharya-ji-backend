const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

/**
 * Extracts Cloudinary Public ID from a URL.
 * URL format: https://res.cloudinary.com/[cloud_name]/image/upload/v12345678/acharya-ji/folder/name.jpg
 * Public ID should be: acharya-ji/folder/name
 */
const getPublicIdFromUrl = (url) => {
    try {
        if (!url || !url.includes('cloudinary.com')) return null;
        
        // Remove the base part of the URL
        const parts = url.split('/');
        const uploadIndex = parts.indexOf('upload');
        if (uploadIndex === -1) return null;
        
        // Skip 'upload' and the version (e.g., 'v1713337966')
        const publicIdWithExt = parts.slice(uploadIndex + 2).join('/');
        
        // Remove file extension
        const publicId = publicIdWithExt.split('.').slice(0, -1).join('.');
        return publicId;
    } catch (error) {
        console.error('Error extracting public_id:', error);
        return null;
    }
};

/**
 * Deletes media from Cloudinary or local storage.
 * @param {string} filePath - The URL or local path of the file to delete.
 */
const deleteMedia = async (filePath) => {
    if (!filePath) return;

    try {
        if (filePath.startsWith('http') && filePath.includes('cloudinary.com')) {
            // Cloudinary deletion
            const publicId = getPublicIdFromUrl(filePath);
            if (publicId) {
                // Determine resource type based on extension or URL
                const isVideo = filePath.match(/\.(mp4|webm|ogg|mov|avi)$/i);
                await cloudinary.uploader.destroy(publicId, { 
                    resource_type: isVideo ? 'video' : 'image' 
                });
                console.log(`Successfully deleted Cloudinary asset: ${publicId}`);
            }
        } else if (filePath.startsWith('/uploads/')) {
            // Local file deletion
            const absolutePath = path.join(process.cwd(), filePath);
            if (fs.existsSync(absolutePath)) {
                fs.unlinkSync(absolutePath);
                console.log(`Successfully deleted local file: ${absolutePath}`);
            }
        }
    } catch (error) {
        console.error(`Error deleting media (${filePath}):`, error);
    }
};

module.exports = { deleteMedia, getPublicIdFromUrl };
