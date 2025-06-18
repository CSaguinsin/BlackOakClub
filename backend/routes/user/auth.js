const express = require('express');
const {
    registerNewUser,
    loginUser,
    displayUserData,
    updateUserData,
    logoutUser
} = require('../../controllers/users/authController');
const { authenticateToken } = require('../../middleware/authMiddleware');

const router = express.Router();

// Public routes (no authentication required)
router.post('/api/login', loginUser);
router.post('/api/register', registerNewUser);

// Protected routes (authentication required)
router.get('/api/profile', authenticateToken, displayUserData);
router.put('/api/updateUser/:id', authenticateToken, updateUserData);
router.post('/api/logout', authenticateToken, logoutUser);

module.exports = router;