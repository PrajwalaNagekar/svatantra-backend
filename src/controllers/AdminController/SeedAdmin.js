import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../../models/Admin/Admin.model.js';

dotenv.config();

const ADMIN_NAME = process.env.ADMIN_NAME;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

console.log("🚀 ~ ADMIN_NAME:", ADMIN_NAME);
console.log("🚀 ~ ADMIN_EMAIL:", ADMIN_EMAIL);
console.log("🚀 ~ ADMIN_PASSWORD:", ADMIN_PASSWORD);

const seedAdminUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const admin = {
            name: ADMIN_NAME,
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
        };

        console.log("🚀 ~ Admin Object:", admin);

        const exists = await Admin.findOne({ email: admin.email });
        if (exists) {
            console.log(`⚠️ Admin already exists: ${admin.email}`);
        } else {
            const newAdmin = new Admin(admin);
            await newAdmin.save();
            console.log(`✅ Admin created: ${admin.email}`);
        }

        process.exit();
    } catch (error) {
        console.error('❌ Error seeding admin:', error.message);
        process.exit(1);
    }
};

seedAdminUsers();
