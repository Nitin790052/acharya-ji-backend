const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Converts an image to WebP format and replaces the original or saves to a new path.
 * @param {string} inputPath - Path to the original image
 * @param {boolean} deleteOriginal - Whether to delete the original file after conversion
 * @returns {Promise<string>} - The path to the new WebP image
 */
const convertToWebp = async (inputPath, deleteOriginal = true) => {
    try {
        const ext = path.extname(inputPath).toLowerCase();
        if (ext === '.webp') return inputPath;

        const outputPath = inputPath.replace(ext, '.webp');
        
        await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath);

        if (deleteOriginal && inputPath !== outputPath) {
            fs.unlinkSync(inputPath);
        }

        return outputPath;
    } catch (error) {
        console.error('Error converting to WebP:', error);
        return inputPath; // Return original path if conversion fails
    }
};

module.exports = { convertToWebp };
