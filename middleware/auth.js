const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            console.log('Token received, verifying...');

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            console.log('Token verified for User ID:', decoded.id);

            // Add user ID to request
            req.user = { id: decoded.id };

            next();
        } catch (error) {
            console.error('AUTH ERROR:', error.message);
            return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        console.log('No token found in headers');
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
