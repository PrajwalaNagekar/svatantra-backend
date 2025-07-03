
import jwt from 'jsonwebtoken';

export const verifyAdminToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        req.admin = decoded;

        next(); 
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
};
