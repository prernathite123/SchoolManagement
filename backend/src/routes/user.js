const express = require('express');
const { protect, authorize, resourceOwnership } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// Get all users (admin only)
router.get('/', authorize('admin', 'superadmin'), (req, res) => {
  res.json({ message: 'Get all users - Coming soon' });
});

// Get user profile
router.get('/profile', (req, res) => {
  res.json({ 
    success: true,
    data: req.user 
  });
});

// Update user profile
router.put('/profile', (req, res) => {
  res.json({ message: 'Update profile - Coming soon' });
});

// Get user by ID
router.get('/:id', resourceOwnership, (req, res) => {
  res.json({ message: 'Get user by ID - Coming soon' });
});

// Update user by ID
router.put('/:id', resourceOwnership, (req, res) => {
  res.json({ message: 'Update user by ID - Coming soon' });
});

// Delete user by ID (admin only)
router.delete('/:id', authorize('admin', 'superadmin'), (req, res) => {
  res.json({ message: 'Delete user - Coming soon' });
});

module.exports = router; 