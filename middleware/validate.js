const { body, validationResult } = require('express-validator');

// Error checker middleware (run after rules)
const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(err => ({ field: err.path, message: err.msg }))
        });
    }
    next();
};

// Banner validation rules
const validateBanner = [
    body('badge').optional({ checkFalsy: true }).trim(),
    body('titleHighlight1').optional({ checkFalsy: true }).trim(),
    body('titleHighlight2').optional({ checkFalsy: true }).trim(),
    body('titleHighlight3').optional({ checkFalsy: true }).trim(),
    body('titleEnd').optional({ checkFalsy: true }).trim(),
    body('subtitle').optional({ checkFalsy: true }).trim(),
    body('linkText').optional({ checkFalsy: true }).trim(),
    body('linkUrl').optional({ checkFalsy: true }).trim(),
    body('pagePath').optional({ checkFalsy: true }).trim(),
    validateResult
];

// Navbar item validation
const validateNavbar = [
    body('label').trim().notEmpty().withMessage('Label is required'),
    body('href').trim().notEmpty().withMessage('Link (href) is required'),
    body('type').isIn(['link', 'dropdown']).withMessage('Type must be link or dropdown'),
    validateResult
];

// Popular Puja validation
const validatePopularPuja = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('duration').trim().notEmpty().withMessage('Duration is required'),
    body('price').trim().notEmpty().withMessage('Price is required'),
    validateResult
];

module.exports = {
    validateBanner,
    validateNavbar,
    validatePopularPuja
};
