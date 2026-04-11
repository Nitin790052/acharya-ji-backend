const User = require('../models/User');

/**
 * @desc    Get all users with filtering and pagination
 * @route   GET /api/users
 */
exports.getUsers = async (req, res) => {
    try {
        const { status, searchTerm, page = 1, limit = 10 } = req.query;
        
        const query = {};
        
        // Filter by status if provided
        if (status && status !== 'all') {
            query.status = status;
        }

        // Search by name, email or phone
        if (searchTerm) {
            query.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } },
                { phone: { $regex: searchTerm, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;
        
        const users = await User.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await User.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: users
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get system-wide user statistics
 * @route   GET /api/users/stats
 */
exports.getUserStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ status: 'active' });
        const blockedUsers = await User.countDocuments({ status: 'blocked' });
        
        // New this month (example logic)
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const newThisMonth = await User.countDocuments({ createdAt: { $gte: startOfMonth } });

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                activeUsers,
                blockedUsers,
                newThisMonth
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get individual user profile
 * @route   GET /api/users/:id
 */
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Update user status (Block/Unblock)
 * @route   PATCH /api/users/:id/status
 */
exports.updateUserStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['active', 'blocked'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: `User status updated to ${status}`,
            data: user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Permanently delete a user
 * @route   DELETE /api/users/:id
 */
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User removed from system' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
