import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../../models/Admin/Admin.model.js';

dotenv.config();

const seedAdminUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(' Connected to MongoDB');

        const admins = [
            {
                name: 'Admin One',
                email: 'admin@gmail.com',
                password: 'Admin123',
            },
        ];

        for (let admin of admins) {
            const exists = await Admin.findOne({ email: admin.email });
            if (exists) {
                console.log(` Admin already exists: ${admin.email}`);
                continue;
            }

            const newAdmin = new Admin(admin);
            console.log("🚀 ~ seedAdminUsers ~ newAdmin:", newAdmin)
            await newAdmin.save(); // ✅ use .save() to trigger pre-save middleware
            console.log(`✅ Admin created: ${admin.email}`);
        }

        process.exit();
    } catch (error) {
        console.error('❌ Error seeding admins:', error.message);
        process.exit(1);
    }
};

seedAdminUsers();
