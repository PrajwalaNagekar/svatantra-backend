// controllers/adminLoginController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../../models/Admin/Admin.model.js';
export const adminLogin = async (req, res) => {

    try {
        console.log("🔐 Login hit", req.body); // log incoming request

        const { email, password } = req.body;

        // 1. Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        console.log("🚀 ~ adminLogin ~ admin:", admin)
        console.log("🚀 ~ adminLogin ~ admin:", admin)

        // 2. Compare hashed passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // 3. Generate JWT token
        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email,
                role: 'admin',
            },
            process.env.JWT_SECRET,

        );

        // 4. Send response
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            admin: {
                name: admin.name,
                email: admin.email,
                phoneNumber: admin.phoneNumber,
            },
        });
    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
