import TeacherTraining from '../../models/User/TeacherTraining.model.js';

export const allTeacherApplications = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // default page 1
        const limit = parseInt(req.query.limit) || 20; // default limit 10
        const skip = (page - 1) * limit;

        const total = await TeacherTraining.countDocuments(); // total documents

        const applications = await TeacherTraining.find()
            .sort({ createdAt: -1 }) // most recent first
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            success: true,
            message: 'Teacher training applications fetched successfully',
            applications,
            count: applications.length,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error('Error fetching teacher applications:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch teacher applications',
            error: error.message,
        });
    }
};

