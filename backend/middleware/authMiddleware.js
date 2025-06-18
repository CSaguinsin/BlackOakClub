const jwt = require('jsonwebtoken');

// JWT Secret (should match the one in authController)
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ 
            error: 'Access token required. Please login first.' 
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Add user information to request object
        req.user = {
            userId: decoded.userId,
            email: decoded.email
        };
        
        // Continue to next middleware/route handler
        next();
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                error: 'Token expired. Please login again.' 
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                error: 'Invalid token. Please login again.' 
            });
        }
        
        return res.status(500).json({ 
            error: 'Token verification failed.' 
        });
    }
};

module.exports = {
    authenticateToken
}; 