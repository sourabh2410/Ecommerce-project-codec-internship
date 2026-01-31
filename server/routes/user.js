const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            wishlist: user.wishlist,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            wishlist: updatedUser.wishlist,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// @desc    Toggle wishlist item
// @route   POST /api/users/wishlist/:id
// @access  Private
router.post('/wishlist/:id', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            // Ensure wishlist is an array
            if (!Array.isArray(user.wishlist)) {
                user.wishlist = [];
            }

            // Safe finding logic (handles nulls/corrupt data)
            const productExists = user.wishlist.find(id => id && id.toString() === req.params.id);

            if (productExists) {
                // Safe filtering
                user.wishlist = user.wishlist.filter(id => id && id.toString() !== req.params.id);
                await user.save();
                res.json({ message: 'Removed from wishlist', wishlist: user.wishlist });
            } else {
                user.wishlist.push(req.params.id);
                await user.save();
                res.json({ message: 'Added to wishlist', wishlist: user.wishlist });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Wishlist Error:', error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
router.get('/wishlist', protect, async (req, res) => {
    const user = await User.findById(req.user._id).populate('wishlist');

    if (user) {
        res.json(user.wishlist);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
